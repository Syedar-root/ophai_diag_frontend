<script setup lang="ts">
import { onMounted, ref } from 'vue';
import 'animate.css';
import Background from "@/shared/Introduction/scenes/background.vue";
import {Back, Right} from "@element-plus/icons-vue";
const cardShows = ref([false, false, false, false]);
const cardRefs = ref<HTMLElement[]|null>([null, null, null, null]);
const backgroundShow = ref(false);
const contentRef = ref<HTMLElement|null>(null);
let mousePos = {
  x: 0,
  y: 0,
}
const emits = defineEmits(['back', 'next']);
const handleBack =  () => {
  outAnimation();
  contentRef.value.addEventListener('animationend', (e) => {
    emits('back');
  })
}
const handleNext = () => {
  outAnimation();
  contentRef.value.addEventListener('animationend', (e) => {
    console.log('end!')
    emits('next');
  })
}
onMounted(() => {
  setTimeout(() => {
    backgroundShow.value = true;
    for(let i = 0; i < cardShows.value.length; i++) {
      cardShows.value[i] = true;
    }
  }, 300);
  window.addEventListener('mousemove', (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
  })
})

const outAnimation = () => {
  for(let i = 0; i < cardShows.value.length; i++) {
    cardShows.value[i] = false;
  }
  backgroundShow.value = false;
}

const handleMouseMove = (e,el) => {
  e.preventDefault();
  const rect = el.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const mouseX = e.clientX - centerX;
  const mouseY = e.clientY - centerY;

  const maxRotate = 10;
  const rotateY = (mouseX / rect.width) * maxRotate * 2;
  const rotateX = -(mouseY / rect.height) * maxRotate * 2;

  // 计算高光位置 (基于旋转角度)
  const lightPosX = -(rotateY / maxRotate) * 50 + 50; // 映射到50%-100%区间
  const lightPosY = (rotateX / maxRotate) * 50 + 50;

  requestAnimationFrame(() => {
    el.style.transform = `
            perspective(800px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;

    // 通过CSS变量传递高光位置
    el.style.setProperty('--light-x', `${lightPosX}%`);
    el.style.setProperty('--light-y', `${lightPosY}%`);
  });
}
const handleMouseLeave = (el) => {
  el.style.transform = `rotateX(0deg) rotateY(0deg)`;
}
</script>

<template>
  <Background :bg-color="'#fffefb'" :point-color="'#00668c'" :mouse-pos="mousePos" v-if="backgroundShow"></Background>
 <div class="topic1-scene-container">
   <transition
       enter-active-class="animate__animated animate__fadeIn"
       leave-active-class="animate__animated animate__fadeOut">
   </transition>
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
   <div class="topic1-scene-content" ref="contentRef">
     <div class="left-aside">
<!--       卡片1 ================================================================ -->
       <transition
          enter-active-class="animate__animated animate__fadeInLeft"
          leave-active-class="animate__animated animate__fadeOutLeft">
         <div class="card c1"
              v-if="cardShows[0]"
              :ref="el =>cardRefs[0] = el"
              @mousemove="handleMouseMove($event,cardRefs[0])"
              @mouseleave="handleMouseLeave(cardRefs[0])">
           <h2>创新型模型架构</h2>
           <div class="card-content">
             <img src="@/shared/assets/testimg/PA_00321956133278_周云熙_left.jpg" alt="">
             <p>
               融合SE模块与Xception主干网络，采用分阶式动态优化心量框架，通过通道注意力机制实现血管特征动态聚焦。相比传统模型，轻微病症检出率提高20%。
             </p>
           </div>
         </div>
       </transition>

<!--       卡片2 ================================================================ -->
       <transition
           enter-active-class="animate__animated animate__fadeInLeft"
           leave-active-class="animate__animated animate__fadeOutLeft">
         <div class="card c2"
              v-if="cardShows[1]"
              :ref="el =>cardRefs[1] = el"
              @mousemove="handleMouseMove($event,cardRefs[1])"
              @mouseleave="handleMouseLeave(cardRefs[1])">
           <h2>突破性识别精度</h2>
           <div class="card-content">
             <img src="@/shared/assets/testimg/PA_00321956133278_周云熙_left.jpg" alt="">
             <p>
               在ODIR-5K/IDRiD等多个数据集*验证中，关键病症（青光眼/白内障等）AUC超0.99、血管分割Dice系数0.89，在多标签疾病识别上表现稳定。
             </p>
           </div>
         </div>
       </transition>
     </div>
     <div class="right-aside">
<!--       卡片3 ================================================================ -->
       <transition
           enter-active-class="animate__animated animate__fadeInRight"
           leave-active-class="animate__animated animate__fadeOutRight">
         <div class="card c3"
              v-if="cardShows[2]"
              :ref="el =>cardRefs[2] = el"
              @mousemove="handleMouseMove($event,cardRefs[2])"
              @mouseleave="handleMouseLeave(cardRefs[2])">
           <h2>极速推理引擎</h2>
           <div class="card-content">
             <img src="@/shared/assets/testimg/PA_00321956133278_周云熙_left.jpg" alt="">
             <p>
               优化后的轻量化模型在在NVIDIA RTX 4060显卡上实现13FPS吞吐量，达到76ms全流程响应。
             </p>
           </div>
         </div>
       </transition>

<!--       卡片4 ================================================================ -->
       <transition
           enter-active-class="animate__animated animate__fadeInRight"
           leave-active-class="animate__animated animate__fadeOutRight">
         <div class="card c4"
              v-if="cardShows[3]"
              :ref="el =>cardRefs[3] = el"
              @mousemove="handleMouseMove($event,cardRefs[3])"
              @mouseleave="handleMouseLeave(cardRefs[3])">
           <h2>可解释性革命</h2>
           <div class="card-content">
             <img src="@/shared/assets/testimg/PA_00321956133278_周云熙_left.jpg" alt="">
             <p>
               五层梯度融合的LayerCAM技术，辅助医生寻找病灶点，定位精度达像素级*，较传统方法提升50%。
             </p>
             <span>*像素级指误差<10px</span>
           </div>
         </div>
       </transition>
     </div>
   </div>
 </div>
</template>

<style scoped lang="scss">
@use 'styles';
</style>