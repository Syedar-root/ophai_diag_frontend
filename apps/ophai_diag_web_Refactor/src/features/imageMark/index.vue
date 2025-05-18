<script setup lang="ts">
  import { ref } from 'vue'
  import { type CtxInstance, cursorResizeType, useCvs } from '@/features/imageMark/hooks'
  import { Shape, type ShapeType } from './shape/Shape'
  import { Rectangle } from '@/features/imageMark/shape/Rectangle.ts'
  import { Pen } from '@/features/imageMark/shape/Pen.ts'
  import useEventListener from '@/libs/utils/useEventListener.ts'
  import { debounce } from 'lodash-es'
  import { Icon } from '@iconify/vue'
  import Tag from './components/Tag/Tag.vue'
  import { deepCloneShape, deepCloneShapes } from './hooks/deepcloneShape'
  import { useRoute, useRouter } from 'vue-router'
  import { useUpdateCase } from '@/features/dd/hooks/useUpdateCase.ts'
  import { getCaseService } from "@/features/dd/api";
  import type { Mark } from '@/features/dd/types'
  import { Circle } from '@/features/imageMark/shape/Circle.ts'

  const main = ref<HTMLDivElement | null>(null)
  const baseCvs = ref<HTMLCanvasElement | null>(null)
  const drawCvs = ref<HTMLCanvasElement | null>(null)
  const tempCvs = ref<HTMLCanvasElement | null>(null)
  const imgUrl = ref<string | null>(null)
  let base: CtxInstance
  let draw: CtxInstance
  let temp: CtxInstance
  let CURRENT_SHAPE = ref<ShapeType>('rectangle')
  let CURRENT_OPT = ref<string>('draw')
  let COLOR = ref<string>('#000000')
  let LINE_WIDTH = ref<number>(2)
  let shapeList = ref<Shape[]>([])
  let historyList = ref<Shape[][]>([])
  let historyIndex = ref<number>(-1)
  let prevTagList = ref<string[]>(['病灶1', '病灶2', '病灶3', '病灶4'])
  let tempTag = ref<string>(prevTagList.value[0])
  let chooseTagVisible = ref<boolean>(false)

  /**
   * 初始化
   */
  function initBaseCanvas(): Promise<boolean> {
    if (!main.value) return Promise.reject(new Error('main is null'))
    base.init(main.value.clientWidth, main.value.clientHeight)
    return Promise.resolve(true)
  }
  function initDrawCvs(width: number, height: number, x: number, y: number): void {
    if (!main.value || !drawCvs.value) return
    draw.init(width, height)
    drawCvs.value.style.left = x + 'px'
    drawCvs.value.style.top = y + 'px'
  }
  function initTempCvs(width: number, height: number, x: number, y: number): void {
    if (!main.value || !tempCvs.value) return
    temp.init(width, height)
    tempCvs.value.style.left = x + 'px'
    tempCvs.value.style.top = y + 'px'
  }
  /**
   * 绘制所有图形
   */
  // 绘制主画布所有图形
  let animationFrameId: number | null = null
  function drawAll() {
    // 取消未执行的绘制请求
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
    }
    // 合并绘制请求到下一帧
    animationFrameId = requestAnimationFrame(() => {
      draw.ctx.value?.clearRect(0, 0, drawCvs.value!.width, drawCvs.value!.height)
      shapeList.value.forEach(item => {
        if (item.ctx !== draw.ctx.value) {
          item.ctx = draw.ctx.value!
        }
        if (item.cvs !== drawCvs.value) {
          item.cvs = drawCvs.value!
        }
        item.draw()
      })
      animationFrameId = null
    })
  }
  // 绘制临时画布
  function drawTemp(shape: Shape) {
    temp.ctx.value!.clearRect(0, 0, tempCvs.value!.width, tempCvs.value!.height)
    shape.draw(temp.ctx.value!)
  }
  // 绘制主画布
  function drawMain(shape: Shape) {
    drawTemp(shape)
    draw.ctx.value!.drawImage(tempCvs.value!, 0, 0)
    temp.ctx.value!.clearRect(0, 0, tempCvs.value!.width, tempCvs.value!.height)
    shape!.ctx = draw.ctx.value!
  }
  const handleDraw = (event: Event) => {
    const e = event as MouseEvent
    let shape: Shape | null = null
    switch (CURRENT_SHAPE.value) {
      case 'rectangle':
        // 添加矩形
        shape = new Rectangle(
          COLOR.value,
          LINE_WIDTH.value,
          e.offsetX / drawCvs.value!.width,
          e.offsetY / drawCvs.value!.height,
          draw.ctx.value!,
          drawCvs.value!
        )
        tempCvs.value!.onmousemove = (event: Event) => {
          const e = event as MouseEvent
          ;(shape as Rectangle).create(e.offsetX, e.offsetY)
          drawTemp(shape!)
        }
        tempCvs.value!.onmouseup = () => {
          chooseTagVisible.value = true
          // 暂时存进shapeList
          shapeList.value.push(shape!)
          shape!.saveTransform()
          tempCvs.value!.onmousemove = null
          tempCvs.value!.onmouseup = null
        }
        break
      case 'pen':
        // 添加画笔
        shape = new Pen(
          COLOR.value,
          LINE_WIDTH.value,
          e.offsetX / drawCvs.value!.width,
          e.offsetY / drawCvs.value!.height,
          draw.ctx.value!,
          drawCvs.value!
        )
        window.onmousemove = (event: Event) => {
          const e = event as MouseEvent
          ;(shape as Pen).addPoint(e.offsetX / drawCvs.value!.width, e.offsetY / drawCvs.value!.height)
          drawTemp(shape!)
        }
        window.onmouseup = () => {
          chooseTagVisible.value = true
          // 暂时存进shapeList
          shapeList.value.push(shape!)
          shape!.saveTransform()
          window.onmousemove = null
          window.onmouseup = null
        }
        break
      case 'circle':
        // 添加圆形
        shape = new Circle(e.offsetX / drawCvs.value!.width, e.offsetY / drawCvs.value!.height, 30, COLOR.value, LINE_WIDTH.value, draw.ctx.value!, drawCvs.value!)
        drawTemp(shape!)
        chooseTagVisible.value = true
        // 暂时存进shapeList
        shapeList.value.push(shape!)
        shape!.saveTransform()

        break
      default:
        break
    }
  }

  function handleChooseTag() {
    console.log('ChooseTag')
    chooseTagVisible.value = false
    shapeList.value[shapeList.value.length - 1].description = tempTag.value
    drawMain(shapeList.value[shapeList.value.length - 1])
    saveHistory()
    // drawAll()
    if (!prevTagList.value.includes(tempTag.value)) {
      prevTagList.value.push(tempTag.value)
    }
  }
  function handleCancelChooseTag() {
    chooseTagVisible.value = false
    shapeList.value.pop()
    temp.ctx.value!.clearRect(0, 0, tempCvs.value!.width, tempCvs.value!.height)
  }
  /**
   * 初始化图片
   */
  let imgInfo = ref<{
    width: number
    height: number
    x: number
    y: number
  }>()
  let img = new Image()
  async function initImage() {
    img.src = '/src/shared/assets/testimg/PA_42028073720002_罗技_left.jpg'
    img.crossOrigin = 'anonymous' // 关键步骤
    img.src =
      imgUrl.value || 'http://firstgogogo.oss-cn-beijing.aliyuncs.com/CA39512522570004/CA_39512522570004_left.jpg'
    img.onload = () => {
      imgInfo.value = drawImage(img)
      base.ctx.value!.drawImage(img, imgInfo.value.x, imgInfo.value.y, imgInfo.value.width, imgInfo.value.height)
      initDrawCvs(imgInfo.value.width, imgInfo.value.height, imgInfo.value.x, imgInfo.value.y)
      initTempCvs(imgInfo.value.width, imgInfo.value.height, imgInfo.value.x, imgInfo.value.y)
      drawAll()
    }
  }
  /**
   * 绘制图片
   * @param img
   */
  function drawImage(img: HTMLImageElement) {
    // 计算缩放比例
    const scale = Math.min(baseCvs.value!.width / img.width, baseCvs.value!.height / img.height)

    // 计算绘制尺寸
    const width = img.width * scale
    const height = img.height * scale

    // 计算居中位置
    const x = (baseCvs.value!.width - width) / 2
    const y = (baseCvs.value!.height - height) / 2

    return {
      width,
      height,
      x,
      y
    }
  }

  /**
   * 缩放
   * @param event
   */
  let scale = 1
  useEventListener(main, 'wheel', (event: Event) => {
    const e = event as WheelEvent
    if (e.deltaY === 0) return
    let step
    if (e.deltaY > 0) {
      step = 0.1
    } else {
      step = -0.1
    }
    if (step + scale < 0.2) return
    else if (step + scale > 3) return
    scale += step
    Array.from(main.value!.children).forEach((item: Element) => {
      if (item instanceof HTMLElement) {
        item.style.transform = `scale(${scale})`
        item.style.transformOrigin = `center center`
      }
    })
  })
  /**
   * 移动
   */
  let sumX = 0
  let sumY = 0
  function handleMove(event: Event) {
    let e = event as MouseEvent
    main.value!.style.cursor = 'move'
    const x = e.clientX
    const y = e.clientY

    let dx = 0
    let dy = 0
    main.value!.onmousemove = (event: MouseEvent) => {
      dx = event.clientX - x
      dy = event.clientY - y
      Array.from(main.value!.children).forEach((item: Element) => {
        if (item instanceof HTMLElement) {
          item.style.transform = `translate(${sumX + dx}px,${sumY + dy}px) scale(${scale})`
        }
      })
    }
    main.value!.onmouseup = () => {
      main.value!.style.cursor = 'default'
      main.value!.onmousemove = null
      main.value!.onmouseup = null
      sumX += dx
      sumY += dy
    }
  }

  /**
   * 激活图形
   * @param event
   */
  function handleActive(event: Event) {
    let e = event as MouseEvent
    let readyActive = false
    for (let i = shapeList.value.length - 1; i >= 0; i--) {
      const shape = shapeList.value[i]
      if (shape.inside(e.offsetX, e.offsetY) && !readyActive) {
        shape.isActive = !shape.isActive
        readyActive = true
      } else {
        shape.isActive = false
      }
    }
    drawAll()
  }
  /**
   * 激活图形后操作
   * @param event
   */
  function handleActiveAfterOpt(event: Event) {
    let e = event as MouseEvent
    let sX = e.offsetX
    let sY = e.offsetY
    for (let i = shapeList.value.length - 1; i >= 0; i--) {
      const shape = shapeList.value[i]
      if (shape.isActive && shape.inside(e.offsetX, e.offsetY)) {
        return handleActiveMove(shape, sX, sY)
      } else if (shape.isActive && shape.onHandlePoint(e.offsetX, e.offsetY) !== null) {
        return handleActiveResize(shape, e.offsetX, e.offsetY)
      }
    }
  }
  /**
   * 激活图形移动
   * @param activeShape
   * @param sX 鼠标初始物理坐标
   * @param sY
   */
  function handleActiveMove(activeShape: Shape, sX: number, sY: number) {
    if (activeShape !== undefined) {
      let tempShape = deepCloneShape(activeShape)
      activeShape.drawable = false
      drawAll()
      drawTemp(tempShape)
      if (tempShape instanceof Rectangle) {
        let shape = tempShape as Rectangle
        tempCvs.value!.onmousemove = (event: MouseEvent) => {
          // 物理坐标
          let dx = event.offsetX - sX
          let dy = event.offsetY - sY
          shape.move(dx, dy)
          drawTemp(shape)
        }
      } else if (tempShape instanceof Pen) {
        let shape = tempShape as Pen
        tempCvs.value!.onmousemove = (event: MouseEvent) => {
          // 物理坐标
          let dx = event.offsetX - sX
          let dy = event.offsetY - sY
          shape.move(dx, dy)
          drawTemp(shape)
        }
      } else if (tempShape instanceof Circle) {
        let shape = tempShape as Circle
        tempCvs.value!.onmousemove = (event: MouseEvent) => {
          // 物理坐标
          let dx = event.offsetX - sX
          let dy = event.offsetY - sY
          shape.move(dx, dy)
          drawTemp(shape)
        }
      }
      tempCvs.value!.onmouseup = () => {
        temp.ctx.value!.clearRect(0, 0, tempCvs.value!.width, tempCvs.value!.height)
        tempShape.saveTransform()
        activeShape.copy(tempShape)
        activeShape.drawable = true
        drawMain(activeShape)
        tempCvs.value!.onmousemove = null
        tempCvs.value!.onmouseup = null
        tempShape = null!
      }
    }
  }
  /**
   * 激活图形缩放
   * @param activeShape
   * @param sX
   * @param sY
   */
  function handleActiveResize(activeShape: Shape, sX: number, sY: number) {
    if (!activeShape) return
    let handlePoint = activeShape.onHandlePoint(sX, sY)!
    // 绘制在临时画布上
    let tempShape = deepCloneShape(activeShape)
    activeShape.drawable = false
    drawAll()
    drawTemp(tempShape)
    let { x: handleX, y: handleY, type: handleType } = handlePoint
    tempCvs.value!.style.cursor = cursorResizeType(handleType)
    if (tempShape instanceof Rectangle) {
      let { x: changeX, y: changeY } = tempShape.getHandlePoint(handleType)
      tempCvs.value!.onmousemove = (event: MouseEvent) => {
        let dx = handleX + event.offsetX - sX
        let dy = handleY + event.offsetY - sY
        ;(tempShape as Rectangle).resize(dx, dy, changeX, changeY)
        drawTemp(tempShape)
      }
    } else if (tempShape instanceof Pen) {
      tempCvs.value!.onmousemove = (event: MouseEvent) => {
        let shape = tempShape as Pen
        let dx = event.offsetX - sX
        let dy = event.offsetY - sY
        shape.resize(dx, dy)
        drawTemp(shape)
      }
    } else if (tempShape instanceof Circle) {
      tempCvs.value!.onmousemove = (event: MouseEvent) => {
        ;(tempShape as Circle).resize(event.offsetX, event.offsetY)
        drawTemp(tempShape)
      }
    }
    tempCvs.value!.onmouseup = () => {
      temp.ctx.value!.clearRect(0, 0, tempCvs.value!.width, tempCvs.value!.height)
      tempShape.saveTransform()
      activeShape.copy(tempShape)
      activeShape.drawable = true
      drawMain(activeShape)
      tempCvs.value!.onmousemove = null
      tempCvs.value!.onmouseup = null
      tempCvs.value!.style.cursor = 'default'
      tempShape = null!
    }
  }

  useEventListener(tempCvs, 'mousedown', handleDraw, false)
  watch(CURRENT_OPT, newValue => {
    tempCvs.value!.removeEventListener('mousedown', handleDraw)
    main.value!.removeEventListener('mousedown', handleMove)
    tempCvs.value!.removeEventListener('dblclick', handleActive)
    tempCvs.value!.removeEventListener('mousedown', handleActiveAfterOpt)
    if (newValue === 'draw') {
      tempCvs.value!.addEventListener('mousedown', handleDraw)
    } else if (newValue === 'move') {
      main.value!.addEventListener('mousedown', handleMove)
    } else if (newValue === 'active') {
      tempCvs.value!.addEventListener('dblclick', handleActive)
      tempCvs.value!.addEventListener('mousedown', handleActiveAfterOpt)
    }
  })

  /**
   * 删除标签
   * @param index
   */
  function removeShape(index: number) {
    shapeList.value.splice(index, 1)
    saveHistory()
    drawAll()
  }
  /**
   * 保存标注图形信息
   */
  // function handleDownload() {
  //   // 合并图层
  //   temp.ctx.value!.drawImage(img, 0, 0, imgInfo.value!.width, imgInfo.value!.height)
  //   temp.ctx.value!.drawImage(drawCvs.value!, 0, 0)
  //   // 保存图片
  //   const imgData = tempCvs.value!.toDataURL('image/webp')
  //   const a = document.createElement('a')
  //   a.href = imgData
  //   a.download = 'image.webp'
  //   a.click()
  //   temp.ctx.value!.clearRect(0, 0, tempCvs.value!.width, tempCvs.value!.height)
  // }

  /**
   * 重置图像位置
   */
  function handleReset() {
    scale = 1
    sumX = 0
    sumY = 0
    Array.from(main.value!.children).forEach((item: Element) => {
      if (item instanceof HTMLElement) {
        item.style.transform = `scale(${scale})`
        item.style.transformOrigin = `center center`
      }
    })
  }
  // 使用防抖处理 resize 事件
  const handleResize = debounce(() => {
    handleReset()
    initBaseCanvas().then(() => {
      initImage()
    })
  }, 1000)

  function saveHistory() {
    // 清除当前索引之后的历史
    historyList.value = historyList.value.slice(0, historyIndex.value + 1)
    // 保存当前状态
    historyList.value.push(deepCloneShapes(shapeList.value))
    if (historyList.value.length > 30) {
      historyList.value.shift()
    }
    historyIndex.value = historyList.value.length - 1
  }
  function undo() {
    if (historyIndex.value > 0) {
      historyIndex.value--
      shapeList.value = deepCloneShapes(historyList.value[historyIndex.value])
      drawAll()
    }
  }
  function redo() {
    if (historyIndex.value < historyList.value.length - 1) {
      historyIndex.value++
      shapeList.value = deepCloneShapes(historyList.value[historyIndex.value])
      drawAll()
    }
  }

  function handleTagUpdate() {
    saveHistory()
    drawAll()
  }

  import {useViewCaseStore} from "@/features/dd/store/viewCaseStore.ts";
  import {useTempIdStore} from "@/features/dd/store/tempId.ts";
  import {deserializationShapes} from "./hooks/deepcloneShape";
  import {Back} from "@element-plus/icons-vue";

  const viewCaseStore = useViewCaseStore()
  const tempIdStore = useTempIdStore()
  let { handleMarkChange } = useUpdateCase()
  function handleSave() {
    let mark: Mark = {
      id: markId.value ? markId.value : '',
      data: JSON.stringify(shapeList.value),
      imageType: imageType.value
    }
    handleMarkChange(mark).then((()=>{
      getCaseService(viewCaseStore.viewCase.caseId).then(res => {
        viewCaseStore.setViewCase(res.data)
        tempIdStore.setTempId(res.data.caseId)
        markId.value = (res.data.marks as Mark[]).find(item => item.imageType === imageType.value)?.id || ''
        // console.log(res)
        // console.log(markId.value)
      })
    }))
  }

  const router = useRouter()
  function handleBack(){
    router.back();
  }

  const route = useRoute()
  const imageType = ref<number>(1)
  const markId = ref<string>('')
  onBeforeMount(() => {
    imgUrl.value = route.query.imageUrl as string
    imageType.value = parseInt(route.query.imageType as string)
    markId.value = route.query.markId as string
    if (markId.value) {
      // console.log(viewCaseStore.viewCase.marks)
      shapeList.value = deserializationShapes(JSON.parse((viewCaseStore.viewCase.marks as Mark[]).find(item => item.id === markId.value)?.data || '[]'));
      // console.log(shapeList.value)
    }
  })

  onMounted(() => {
    if (drawCvs.value && baseCvs.value && tempCvs.value) {
      base = useCvs(baseCvs)
      draw = useCvs(drawCvs)
      temp = useCvs(tempCvs)
      initBaseCanvas().then(async () => {
        await initImage()
      })
    }
    window.addEventListener('resize', handleResize)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
</script>

<template>
  <div class="image-mark-container">
    <aside class="image-mark-toolbar">
      <el-icon @click="handleBack" class="back-icon" size="30">
        <Back></Back>
      </el-icon>
      <section class="toolbar">
        <header>工具栏</header>
        <el-form class="form">
          <el-form-item label="颜色">
            <el-color-picker v-model="COLOR"></el-color-picker>
          </el-form-item>
          <el-form-item label="宽度">
            <el-slider v-model="LINE_WIDTH" :min="1" :max="5"></el-slider>
          </el-form-item>
          <el-form-item label="形状">
            <div class="form-list">
              <div class="form-item">
                <input type="radio" name="shape" checked value="rectangle" v-model="CURRENT_SHAPE" />
                <Icon icon="material-symbols:rectangle-outline" />
              </div>
              <div class="form-item">
                <input type="radio" name="shape" checked value="circle" v-model="CURRENT_SHAPE" />
                <Icon icon="material-symbols:circle-outline" />
              </div>
              <div class="form-item">
                <input type="radio" name="shape" value="pen" v-model="CURRENT_SHAPE" />
                <Icon icon="meteor-icons:pencil" />
              </div>
            </div>
          </el-form-item>
          <el-form-item label="操作">
            <div class="form-list">
              <div class="form-item">
                <input type="radio" name="opt" checked value="draw" v-model="CURRENT_OPT" />
                <Icon icon="material-symbols:draw" />
              </div>
              <div class="form-item">
                <input type="radio" name="opt" value="move" v-model="CURRENT_OPT" />
                <Icon icon="lucide:move" />
              </div>
              <div class="form-item">
                <input type="radio" name="opt" value="active" v-model="CURRENT_OPT" />
                <Icon icon="lucide:eye" />
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="form-list">
              <el-button class="button" type="primary" @click="handleSave">保存</el-button>
              <el-button class="button" type="info" @click="handleReset">重置</el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="form-list">
              <el-button class="button" type="primary" @click="undo">撤销</el-button>
              <el-button class="button" type="info" @click="redo">重做</el-button>
            </div>
          </el-form-item>
        </el-form>
      </section>
      <section class="tagList">
        <header>标签</header>
        <el-scrollbar>
          <transition-group name="list">
            <Tag
              v-for="(item, index) in shapeList"
              v-model="item.description"
              :key="item.id"
              :color="item.color"
              :onClose="() => removeShape(index)"
              @updateEnd="handleTagUpdate" />
          </transition-group>
        </el-scrollbar>
      </section>
    </aside>
    <div class="image-mark-main" ref="main">
      <canvas id="baseCvs" ref="baseCvs"></canvas>
      <canvas id="drawCvs" ref="drawCvs"></canvas>
      <canvas id="tempCvs" ref="tempCvs"></canvas>
    </div>
    <el-dialog v-model="chooseTagVisible" title="标签" width="20%" :close-on-click-modal="false">
      <el-form>
        <el-form-item>
          <el-select v-model="tempTag" placeholder="请选择标签" filterable allow-create default-first-option clearable>
            <el-option v-for="item in prevTagList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="handleChooseTag">确定</el-button>
      <el-button type="danger" @click="handleCancelChooseTag">取消</el-button>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
  @use 'styles';
  .list,
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
  }
  .list-leave-active {
    position: absolute;
  }
</style>