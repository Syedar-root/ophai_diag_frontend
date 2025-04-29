<script setup lang="ts">
import {Back, Right} from "@element-plus/icons-vue";
import 'animate.css';
import background from "@/shared/Introduction/scenes/background.vue";

const emits = defineEmits(['back', 'next']);
const handleBack = () => {
  if (!topic3ContainerRef.value) return;
  // 提前添加监听器
  const handler = () => {
    emits('back');
    topic3ContainerRef.value?.removeEventListener('animationend', handler);
  }
  topic3ContainerRef.value?.addEventListener('animationend', handler);
  outEvent();
  // 保险机制，防止监听器未添加时就触发事件
  setTimeout(() => {
    if(cardShows.value[0] === false){
      emits('back');
    }
  },1000)
}

const handleNext = () => {
  if (!topic3ContainerRef.value) return;
  // 提前添加监听器
  const handler = () => {
    console.log('next')
    emits('next');
    topic3ContainerRef.value?.removeEventListener('animationend', handler);
  }
  topic3ContainerRef.value?.addEventListener('animationend', handler);
  outEvent();
  // 保险机制，防止监听器未添加时就触发事件
  setTimeout(() => {
    if(cardShows.value[0] === false){
      emits('next');
    }
  },1000)
}
let mousePos = {
  x: 0,
  y: 0,
}
const cardShows = ref<boolean[]>([false, false, false, false]);
const topic3ContainerRef = ref<HTMLElement|null>(null);
onMounted(() => {
  cardShows.value = [true, true,true, true];
  topic3ContainerRef.value?.addEventListener('mousemove', (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
  })
})
function outEvent() {
  cardShows.value = [false, false, false, false];
}

function handleClick(){
  if (!topic3ContainerRef.value) return;
  const contents = topic3ContainerRef.value.querySelectorAll('.item-content');

  contents.forEach((content,index) => {
    if (content instanceof HTMLElement) {
      // 切换翻转状态
      const isFlipped = content.style.transform.includes('180deg');
      content.style.transform = isFlipped ? '' : 'rotateY(180deg)';
      content.style.transitionDelay = `${(0.1 * index)}s`
    }
  });
}

</script>

<template>
<div class="topic3-scene-container" ref="topic3ContainerRef">
  <background :bg-color="'#fffefb'" :point-color="'#00668c'" :mouse-pos="mousePos"></background>
  <div class="header">
    <div id="back" @click="handleBack">
      <el-icon size="40">
        <Back></Back>
      </el-icon>
      Back
    </div>
    <div id="next" @click="handleNext">
      Next
      <el-icon size="40">
        <Right />
      </el-icon>
    </div>
  </div>
  <div class="topic3-scene-content">
<!--    中心 =========================================================================================================-->
    <div class="item-container i1">
      <transition
        enter-active-class="animate__animated animate__zoomInDown"
        leave-active-class="animate__animated animate__zoomOutDown">
        <div class="item-content"
             v-if="cardShows[0]"
             @click="handleClick">
          <div class="T1">
            <span>架构精巧 灵活拓展</span>
          </div>
          <div class="T2">
            <span>规范护航 性能跃升</span>
          </div>
        </div>
      </transition>
    </div>

<!--    111111 ==================================================================================================================-->
    <div class="item-container i2">
      <transition
        enter-active-class="animate__animated animate__zoomInDown"
        leave-active-class="animate__animated animate__zoomOutDown">
        <div class="item-content"
             v-if="cardShows[1]">
          <div class="T1">
            <h3>工程架构一体化</h3>
            <p>
             采用<strong>monorepo</strong>架构，将所有项目汇聚于一个仓库，清晰划分<strong>core、apps、packages</strong>三部分，在apps层的应用中又分成<strong>libs、features、shared</strong>三部分，便于统一管理与维护，提升开发协作效率。
            </p>
            <img src="@/shared/assets/icons/construction-site-59.svg?url" alt="">
          </div>
          <div class="T2">
            <h3>全面代码规范体系</h3>
            <p>
              建立 ESLint、TypeScript、Sass、组件、目录结构和命名规范等<strong>多维度规范</strong>。如 ESLint 分层治理、TypeScript 高类型覆盖率、Sass 科学配色与高复用率等，保障代码质量，提升开发效率。
            </p>
            <img src="@/shared/assets/icons/coding-3-75.svg?url" alt="">
          </div>
        </div>
      </transition>

    </div>

<!--    22222 ========================================================================================================================-->
    <div class="item-container i3">
      <transition
          enter-active-class="animate__animated animate__zoomInDown"
          leave-active-class="animate__animated animate__zoomOutDown">
        <div class="item-content"
             v-if="cardShows[2]">
          <div class="T1">
            <h3>系统架构层次分明</h3>
            <p>
              涵盖视图容器层、核心业务层、Network 层和代理层。核心业务层的路由系统、业务逻辑单元、全局状态管理等协同运作，代理层使用Nginx优化网络性能，保障系统稳定高效运行。
            </p>
            <img src="@/shared/assets/icons/architect-98.svg?url" alt="">
          </div>
          <div class="T2">
            <h3>多维度性能优化策略</h3>
            <p>
              从代码构建、路由、图片加载和样式等方面入手。通过Vite按需加载框架、路由懒加载、图片懒加载和 Sass 样式优化等，显著减少首屏加载时间和资源占用。
            </p>
            <img src="@/shared/assets/icons/team-brainstorming-5-1.svg?url" alt="">
          </div>
        </div>
      </transition>

    </div>

<!--    33333 ========================================================================================================================================= -->
    <div class="item-container i4">
      <transition
          enter-active-class="animate__animated animate__zoomInDown"
          leave-active-class="animate__animated animate__zoomOutDown">
        <div class="item-content"
             v-if="cardShows[3]">
          <div class="T1">
            <h3>未来架构拓展无忧</h3>
            <p>
              可向<strong>微前端架构</strong>改造，让每个feature模块独立部署，支持不同团队并行开发；还能在现有架构基础上分层扩展，如增加数据处理层、引入服务发现和负载均衡机制，适应业务发展需求。
            </p>
            <img src="@/shared/assets/icons/map-1-66.svg?url" alt="">
          </div>
          <div class="T2">
            <h3>显著性能提升成果</h3>
            <p>
              引入lighthouse监控，优化后 <strong>FCP 缩短约 80%，LCP 缩短约 89%，</strong>首屏体积减少约 40%，有效提升用户体验，为业务长期发展奠定坚实基础。
            </p>
            <img src="@/shared/assets/icons/startup-1-60.svg?url" alt="">
          </div>
        </div>
      </transition>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
@use'styles';
</style>