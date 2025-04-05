<script setup lang="ts">
import {Back, Right} from "@element-plus/icons-vue";
import background from "@/shared/Introduction/scenes/background.vue";
import 'animate.css';

const emits = defineEmits(['back', 'next']);
const handleBack =  async () => {
  await outEvent();
  topic2ContainerRef.value?.addEventListener('animationend', ()=>{
    emits('back');
  });
}
const handleNext = async() => {
  await outEvent();
  topic2ContainerRef.value?.addEventListener('animationend', ()=>{
    emits('next');
  });
}
const topic2ContainerRef = ref<HTMLElement|null>(null);
let mousePos = {
  x: 0,
  y: 0,
}
const outEvent = () => {
  cardShows.value = [false, false, false, false];
  (topic2ContainerRef.value?.querySelectorAll('.card') as NodeListOf<HTMLElement>)?.forEach((card: HTMLElement)=>{
    card.style.pointerEvents = 'none';
  })
}
const cardShows = ref([false, false, false, false]);

onMounted(() => {
  setTimeout(() => {
    cardShows.value = [true, true, true, true];
  },300)
  topic2ContainerRef.value?.addEventListener('mousemove', (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
  })
})
</script>

<template>
  <div class="topic2-scene-container" ref="topic2ContainerRef">
    <background :bg-color="'#fffefb'" :point-color="'#00668c'" :mouse-pos="mousePos"></background>
    <div class="header">
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
    </div>
    <div class="topic2-scene-content">

<!--      2 ============================================================================================== -->
      <div class="top-aside top2">
        <transition
            enter-active-class="animate__animated animate__slideInDown"
            leave-active-class="animate__animated animate__slideOutUp">
          <div class="card c2"
               v-if="cardShows[1]">
            <h2>智慧医疗生态</h2>
            <p>
              集成HMAC-MD5动态签名技术，支持离线扫码生成含13项指标*的可视化报告。
              *包括D、G、C、A、H、M、O的患病概率，原始眼底图，血管分析，视盘分析，临床观察与建议，推荐药物方案。
            </p>
            <img src="@/shared/assets/vue.svg?url" alt="">
          </div>
        </transition>
      </div>

<!--      3 ============================================================================================================ -->
      <div class="top-aside top3">
        <transition
            enter-active-class="animate__animated animate__slideInDown"
            leave-active-class="animate__animated animate__slideOutUp">
          <div class="card c3"
               v-if="cardShows[2]">
            <h2>多模态处理管线</h2>
            <p>
              集成Qwen2.5-VL-72B大模型，构建完整多模态处理管线，支持同时解析眼底图和概率化诊断指标，实现影像特征与病理指标的跨模态注意力融合。
            </p>
          </div>
        </transition>
      </div>

<!--      1 ===================================================================================-->
      <div class="bottom-aside">
        <transition
            enter-active-class="animate__animated animate__slideInUp"
            leave-active-class="animate__animated animate__slideOutDown">
          <div class="card c1"
               v-if="cardShows[0]">
            <h2>智能影像增强</h2>
            <p>
              Unet++赋能的多尺度血管强化及视盘定位，使微血管检出率提升30%。支持自动黑边裁剪与视网膜区域智能锁定。
            </p>
            <img src="@/shared/assets/vue.svg?url" alt="">
          </div>
        </transition>
      </div>

<!--      4 =============================================================================================-->
      <div class="bottom-aside">
        <transition
            enter-active-class="animate__animated animate__slideInUp"
            leave-active-class="animate__animated animate__slideOutDown">
          <div class="card c4"
               v-if="cardShows[3]">
            <h2>全周期病情追踪</h2>
            <p>
              基于AI的自动病程分析系统，可生成个性化复诊计划，减轻医生诊疗压力。
            </p>
            <img src="@/shared/assets/vue.svg?url" alt="">
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'styles';

@keyframes myShakeY {
  0% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(20px);
  }
  60% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}

.c1, .c2, .c3, .c4 {
  &:hover {
    animation: myShakeY;
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
  }
}
</style>