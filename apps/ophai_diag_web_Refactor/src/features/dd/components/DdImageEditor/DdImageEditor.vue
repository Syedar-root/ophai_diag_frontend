<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import {isEdit,editType,editedUrls} from "@/features/dd/store/isEdit.ts";
import {currentEye} from "@/features/dd/store/currentEye.ts";
// import type { CanvasAnnotation, Point } from "./types"; // 建议抽离类型定义

interface CanvasAnnotation  {
  type: string,
  points: any[],
  color: string,
  width: number
}

interface Point  {
  x: number,
  y: number
}

// 常量配置
let LINE_WIDTH = ref(10);
let LINE_COLOR = ref("#ff0000");
const IMAGE_SCALE_FACTOR = 0.9;

// 图片资源
import imgUrl from '@/shared/assets/testimg/PA_42081458290009_吴迪_left.jpg';
const imgSrc = imgUrl
// const imgSrc = editUrl.value;

// Canvas Refs
const container = ref<HTMLDivElement | null>(null);
const imageCanvas = ref<HTMLCanvasElement | null>(null);
const annotationCanvas = ref<HTMLCanvasElement | null>(null);

// 绘图状态
const isDrawing = ref(false);
const annotations = ref<CanvasAnnotation[]>([]);
let currentAnnotation: CanvasAnnotation | null = null;

// 设备像素比
const dpr = window.devicePixelRatio || 1;

/* 初始化 Canvas */
function initCanvases() {
  if (!container.value || !imageCanvas.value || !annotationCanvas.value) return;

  const { clientWidth, clientHeight } = container.value;

  // 设置物理像素尺寸
  [imageCanvas.value, annotationCanvas.value].forEach(canvas => {
    canvas.width = clientWidth * dpr;
    canvas.height = clientHeight * dpr;
  });

  // 获取绘图上下文
  const imageCtx = imageCanvas.value.getContext("2d");
  const annotationCtx = annotationCanvas.value.getContext("2d");

  if (!imageCtx || !annotationCtx) return;

  // 缩放坐标系
  [imageCtx, annotationCtx].forEach(ctx => ctx.scale(dpr, dpr));

  // 加载主图片
  loadBackgroundImage(imageCtx);
}

/* 加载背景图片 */
async function loadBackgroundImage(ctx: CanvasRenderingContext2D) {
  if (!container.value) return;

  try {
    const img = await loadImage(imgSrc);
    const { width, height } = calculateImageSize(img, container.value);
    drawBackgroundImage(ctx, img, width, height);
  } catch (error) {
    console.error("图片加载失败:", error);
    // 可在此处添加 UI 错误提示
  }
}

/* 图片加载器 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

/* 计算图片显示尺寸 */
function calculateImageSize(img: HTMLImageElement, container: HTMLElement) {
  const scale = Math.min(
      container.clientWidth / img.width,
      container.clientHeight / img.height
  ) * IMAGE_SCALE_FACTOR;

  return {
    width: img.width * scale,
    height: img.height * scale
  };
}

/* 绘制背景图片 */
function drawBackgroundImage(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    width: number,
    height: number
) {
  if (!container.value) return;

  ctx.clearRect(0, 0, container.value.clientWidth, container.value.clientHeight);
  const x = (container.value.clientWidth - width) / 2;
  ctx.drawImage(img, x, 0, width, height);
  let y = 0;
  imagePosition.value = { x, y, width, height };
}

/* 坐标转换 */
function getCanvasPosition(e: MouseEvent): Point {
  if (!annotationCanvas.value) return { x: 0, y: 0 };

  const rect = annotationCanvas.value.getBoundingClientRect();
  return {
    x: (e.clientX - rect.left) / dpr,
    y: (e.clientY - rect.top) / dpr
  };
}

/* 绘图事件处理 */
function startAnnotation(e: MouseEvent) {
  if (!annotationCanvas.value) return;

  isDrawing.value = true;
  const { x, y } = getCanvasPosition(e);

  let currentAnnotation : CanvasAnnotation = {
    type: "line",
    points: [[x, y]],
    color: LINE_COLOR.value,
    width: LINE_WIDTH.value,
  } ;

  annotations.value.push(currentAnnotation);
}

function drawAnnotation(e: MouseEvent) {
  if (!isDrawing.value || !currentAnnotation) return;

  const { x, y } = getCanvasPosition(e);
  currentAnnotation.points.push([x, y]);
  redrawAnnotations();
}

function endAnnotation() {
  isDrawing.value = false;
  currentAnnotation = null;
}

/* 重绘标注 */
function redrawAnnotations() {
  const ctx = annotationCanvas.value?.getContext("2d");
  if (!ctx || !container.value) return;

  ctx.clearRect(0, 0, container.value.clientWidth, container.value.clientHeight);

  annotations.value.forEach(annotation => {
    if (annotation.type !== "line") return;

    ctx.beginPath();
    ctx.moveTo(annotation.points[0][0], annotation.points[0][1]);

    annotation.points.forEach(point => {
      ctx.lineTo(point[0], point[1]);
    });

    ctx.strokeStyle = annotation.color;
    ctx.lineWidth = annotation.width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  });
}

/* 清空标注 */
function clearAnnotations() {
  annotations.value = [];
  redrawAnnotations();
}

/* 生命周期管理 */
onMounted(() => {
  initCanvases();
  annotationCanvas.value?.addEventListener("mousedown", startAnnotation);
  annotationCanvas.value?.addEventListener("mousemove", drawAnnotation);
  annotationCanvas.value?.addEventListener("mouseup", endAnnotation);
  annotationCanvas.value?.addEventListener("mouseleave", endAnnotation);
});

onUnmounted(() => {
  annotationCanvas.value?.removeEventListener("mousedown", startAnnotation);
  annotationCanvas.value?.removeEventListener("mousemove", drawAnnotation);
  annotationCanvas.value?.removeEventListener("mouseup", endAnnotation);
  annotationCanvas.value?.removeEventListener("mouseleave", endAnnotation);
});

const visible = ref<boolean>(false);
const imagePosition = ref({
  x: 0,
  y: 0,
  width: 0,
  height: 0
});

function mergeCanvases(): string {
  // 1. 创建临时 Canvas
  const mergedCanvas = document.createElement("canvas");
  const ctx = mergedCanvas.getContext("2d");

  if (!imageCanvas.value || !annotationCanvas.value || !ctx) return "";

  // 2. 设置合并 Canvas 尺寸（匹配原始尺寸）
  const dpr = window.devicePixelRatio || 1;
  mergedCanvas.width = imagePosition.value.width;
  mergedCanvas.height = imagePosition.value.height;


  // 3. 绘制背景层（保持 DPR 处理）
  ctx.save();
  ctx.scale(1/dpr, 1/dpr); // 反向缩放坐标系
  ctx.drawImage(
      imageCanvas.value,
      imagePosition.value.x * dpr,  // 源X
      imagePosition.value.y * dpr,  // 源Y
      imagePosition.value.width * dpr,  // 源宽度
      imagePosition.value.height * dpr, // 源高度
      0, 0, // 目标X,Y
      mergedCanvas.width,
      mergedCanvas.height
  );
  ctx.restore();

  // 4. 绘制标注层（带半透明效果）
  ctx.globalAlpha = 1; // 可根据需要调整透明度
  ctx.drawImage(
      annotationCanvas.value,
      imagePosition.value.x * dpr,  // 源X
      imagePosition.value.y * dpr,  // 源Y
      imagePosition.value.width * dpr,  // 源宽度
      imagePosition.value.height * dpr, // 源高度
      0, 0, // 目标X,Y
      mergedCanvas.width,
      mergedCanvas.height
  );

  // 5. 导出为 DataURL
  return mergedCanvas.toDataURL("image/png");
}
async function handleSave(){
  try {
    const dataURL = mergeCanvases();

    updateImg(dataURL);

    ElMessage.success("保存成功！");
    isEdit.value = false;
  } catch (error) {
    ElMessage.error("保存失败：" + error);
  }
}
function handleCancel(){
  isEdit.value = false;
}

function updateImg(data:string){

  console.log(currentEye.value,editType.value)
  if (currentEye.value === "left"){
    if (editType.value === "origin"){
      editedUrls.value.set("left_origin",data);
    }else if(editType.value === "vessel"){
      console.log("kk")
      editedUrls.value.set("left_vessels",data);
    }else if(editType.value === "disk"){
      editedUrls.value.set("left_disks",data);
    }
  }else if(currentEye.value === "right"){
    if (editType.value === "origin"){
     editedUrls.value.set("right_origin",data);
    }else if(editType.value === "vessel"){
      editedUrls.value.set("right_vessels",data);
    }else if(editType.value === "disk"){
      editedUrls.value.set("right_disks",data);
    }
  }
  console.log(editedUrls.value);
}
</script>

<template>
  <div class="canvas-container" ref="container">
    <canvas ref="imageCanvas" class="background-layer"></canvas>
    <canvas
        ref="annotationCanvas"
        class="annotation-layer"
        :style="{ cursor: isDrawing ? 'crosshair' : 'default' }"
    ></canvas>

    <div class="toolbar">
      <label class="title">菜单栏</label>
      <el-popover placement="right" width="auto" :visible="visible">
        <template #reference>
          <el-button style="margin-right: 16px" @click="visible = !visible">画笔设置</el-button>
        </template>
        <el-form>
          <el-form-item label="画笔粗细">
            <el-input-number :min="5" :max="15" v-model="LINE_WIDTH"></el-input-number>
          </el-form-item>
          <el-form-item label="画笔颜色">
            <el-color-picker v-model="LINE_COLOR" color-format="hex" size="large" />
          </el-form-item>
        </el-form>
      </el-popover>
      <el-button type="danger" @click="clearAnnotations">
        清空标注
      </el-button>
      <div style="width: 100%; display: flex; gap: 1rem">
        <el-button class="save" type="primary" @click="handleSave">保存</el-button>
        <el-button class="cancel" type="info" @click="handleCancel">取消</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.canvas-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .background-layer {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }

  .annotation-layer {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    touch-action: none;
  }

  .toolbar {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    min-width: 150px;
    height: 100%;
    padding: 1rem 0.5rem 1rem 0.5rem;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 1.5rem;

    .title{
      font-size: 1rem;
      font-weight: bold;
      transform: translateY(50%);
      color: black;
    }

    :deep(button){
      margin: 0 !important;
      outline: none;
    }
  }
}
</style>