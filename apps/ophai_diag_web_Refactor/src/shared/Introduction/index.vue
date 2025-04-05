<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import lottieData from './Animation.json?raw'  // 修改导入方式
import 'animate.css';
import {ref} from "vue";
import {useMainScene} from "./hooks/useMainScene.ts";
// import {Back, Right} from "@element-plus/icons-vue";
import topic1Scene from "./scenes/topic1/index.vue";
import topic2Scene from "./scenes/topic2/index.vue";
import topic3Scene from "./scenes/topic3/index.vue";
import topic4Scene from "./scenes/topic4/index.vue";

const eyeBallShow = ref(false)
const eyeShow = ref(false)
const lightShow = ref(false)
const titleShow = ref(false)

const mainTitle = ref<HTMLElement | null>(null)
const light = ref<HTMLElement | null>(null)
const eyeball = ref<HTMLElement | null>(null)
function showSomething() {
  eyeBallShow.value = true;
  setTimeout(() => {
    lightShow.value = true;
    setTimeout(() => {
      eyeShow.value = true;
      titleShow.value = true;
      setTimeout(() => {
        for (let i = 0; i < topicShows.value.length; i++) {
          topicShows.value[i] = true;
          if (topic1.value && topic2.value && topic3.value && topic4.value)
            initTopics([topic1.value, topic2.value, topic3.value, topic4.value]);
        }
      }, 500)
    },500)
  },500)
}

watch(mainTitle,()=>{
  if (mainTitle.value) {
    titleAnimation();
  }
})

function titleAnimation() {
  if (!mainTitle.value) return;

  // 生成唯一字符容器
  mainTitle.value.innerHTML = mainTitle.value.textContent?.split('').map((char, index) => {
    let br = index === 11? `<br/>` : '';
    return `<span class="char" style="display: inline-block" data-index="${index}">${char}</span>` + br; // 改用 class 替代 id
  }).join('') || '';

  // 先移除旧监听器避免重复
  const handleMouseMove = (e: MouseEvent) => {
    const { clientX } = e;
    if (!mainTitle.value) return;

    // 计算相对位置比例 (更流畅地过渡)
    const ratio = (clientX / window.innerWidth) * 2 - 1; // 范围 [-1, 1]
    const rotateValue = ratio * 50; // 生成 -30deg 到 30deg

    // 为每个字符设置独立动画
    requestAnimationFrame(()=>{
      mainTitle.value!.querySelectorAll('.char').forEach((char) => {
        const element = char as HTMLElement;
        // 添加延迟效果
        element.style.transform = `rotateY(${rotateValue}deg)`;
        element.style.transition = `transform 0.5s ease-out`;
        // element.style.transitionDelay = `${index * 1}ms`;
      });
    })
  };

  // 移除旧监听器
  window.removeEventListener('mousemove', handleMouseMove);
  window.addEventListener('mousemove', handleMouseMove);
}

onMounted(()=>{
  showSomething();
})
// 主场景交互钩子
const { topic1,topic2,topic3,topic4, topicShows,initTopics,mouseOverHandlers } = useMainScene()


// 统一字体大小
const fontSize = ref<string>('3rem');
/**
 * 场景1交互
 * ==========================================================================================================================================
 */
const topic1SceneShow = ref<boolean>(false)
const after1Show = ref<boolean>(false)
function handleTopic1Click() {
    titleShow.value = false;
    lightShow.value = false;
    eyeShow.value = false;
    eyeBallShow.value = false;
    topicShows.value = [true,false,false,false]
    topic1.value!.removeEventListener('mousemove', mouseOverHandlers[0]);
    topic1.value!.style.pointerEvents = "none";
    topic1.value!.style.zIndex = '2';
    topic1.value!.style.transition = 'all 0.3s ease-out';
    topic1.value!.style.transform = `translate(10%, -50%)`;
    topic1.value!.style.fontSize = fontSize.value;
    topic1.value!.style.textWrap = 'nowrap';
    topic1.value!.querySelector('.main-ball')!.setAttribute('style', 'opacity: 0');
    topic1SceneShow.value = true;
}
function handleTopic1Leave() {
  showSomething();
  topic1.value!.addEventListener('mousemove', mouseOverHandlers[0]);
  topic1.value!.addEventListener('click', handleTopic1Click);
  topic1.value!.style.pointerEvents = "auto";
  console.log(topic1.value)
  topic1.value!.style.zIndex = '1';
  topic1.value!.style.transition = 'all 0.5s ease-out';
  topic1.value!.style.fontSize =  '';
  topic1.value!.style.textWrap = 'balance';
  topic1.value!.style.transform = `translate(0, 0)`;
  topic1.value!.querySelector('.main-ball')!.setAttribute('style', 'opacity: 1');
  topic1SceneShow.value = false;
}
function handleTopic1Next(){
  topic1.value!.addEventListener('mousemove', mouseOverHandlers[0]);
  topic1.value!.addEventListener('click', handleTopic1Click);
  topic1.value!.style.pointerEvents = "auto";
  console.log(topic1.value)
  topic1.value!.style.zIndex = '1';
  topic1.value!.style.transition = 'all 0.5s ease-out';
  topic1.value!.style.fontSize =  '';
  topic1.value!.style.textWrap = 'balance';
  topic1.value!.style.transform = `translate(0, 0)`;
  topic1.value!.querySelector('.main-ball')!.setAttribute('style', 'opacity: 1');
  topic1SceneShow.value = false;
  handleTopic2Click();
}

/**
 * 场景2交互
 * =================================================================================================================================================
 */
const topic2SceneShow = ref<boolean>(false)
const after2Show = ref<boolean>(false)
function handleTopic2Click() {
  titleShow.value = false;
  lightShow.value = false;
  eyeShow.value = false;
  eyeBallShow.value = false;
  topicShows.value = [false,true,false,false];
  topic2.value!.removeEventListener('mousemove', mouseOverHandlers[1]);
  topic2.value!.style.pointerEvents = "none";
  topic2.value!.style.zIndex = '100';
  topic2.value!.style.fontSize = fontSize.value;
  topic2.value!.style.textWrap = 'nowrap';
  topic2.value!.style.transition = 'all 0.3s ease-out';
  topic2.value!.style.transform = `translate(5%, -40%)`;
  topic2.value!.querySelector('.main-ball')!.setAttribute('style', 'opacity: 0');
  topic2SceneShow.value = true;
}
function handleTopic2Leave() {
  showSomething();
  topic2.value!.addEventListener('mousemove', mouseOverHandlers[1]);
  topic2.value!.addEventListener('click', handleTopic2Click);
  topic2.value!.style.pointerEvents = "auto";
  topic2.value!.style.zIndex = '1';
  topic2.value!.style.fontSize =  '';
  topic2.value!.style.textWrap = 'balance';
  topic2.value!.style.transition = 'all 0.5s ease-out';
  topic2.value!.style.transform = `translate(0, 0)`;
  topic2.value!.querySelector('.main-ball')!.setAttribute('style', 'opacity: 1');
  topic2SceneShow.value = false;
}
function handleTopic2Next(){
  topic2.value!.addEventListener('mousemove', mouseOverHandlers[1]);
  topic2.value!.addEventListener('click', handleTopic2Click);
  topic2.value!.style.pointerEvents = "auto";
  topic2.value!.style.zIndex = '1';
  topic2.value!.style.fontSize =  '';
  topic2.value!.style.textWrap = 'balance';
  topic2.value!.style.transition = 'all 0.5s ease-out';
  topic2.value!.style.transform = `translate(0, 0)`;
  topic2.value!.querySelector('.main-ball')!.setAttribute('style', 'opacity: 1');
  topic2SceneShow.value = false;
  handleTopic3Click();
}

/**
 * 场景3交互
 * =================================================================================================================================================
 */
const topic3SceneShow = ref<boolean>(false)
const after3Show = ref<boolean>(false)
function handleTopic3Click() {
  titleShow.value = false;
  lightShow.value = false;
  eyeShow.value = false;
  eyeBallShow.value = false;
  topicShows.value = [false,false,true,false];
  topic3.value!.removeEventListener('mousemove', mouseOverHandlers[2]);
  topic3.value!.style.pointerEvents = "none";
  topic3.value!.style.zIndex = '2';
  topic3.value!.style.fontSize =  fontSize.value;
  topic3.value!.style.textWrap = 'nowrap';
  topic3.value!.style.transition = 'all 0.8s ease-out';
  topic3.value!.style.transform = `translate(40%, 60%)`;
  topic3.value!.querySelector('.main-ball')!.setAttribute('style', 'opacity: 0');
  topic3SceneShow.value = true;
}
function handleTopic3Leave() {
  showSomething();
  topic3.value!.addEventListener('mousemove', mouseOverHandlers[2]);
  topic3.value!.addEventListener('click', handleTopic3Click);
  topic3.value!.style.pointerEvents = "auto";
  topic3.value!.style.zIndex = '1';
  topic3.value!.style.fontSize =  '';
  topic3.value!.style.textWrap = 'balance';
  topic3.value!.style.transition = 'all 0.8s ease-out';
  topic3.value!.style.transform = `translate(0, 0)`;
  topic3.value!.querySelector('.main-ball')!.setAttribute('style', 'opacity: 1');
  topic3SceneShow.value = false;
}
function handleTopic3Next(){
  console.log('ddd')
  topic3.value!.addEventListener('mousemove', mouseOverHandlers[2]);
  topic3.value!.addEventListener('click', handleTopic3Click);
  topic3.value!.style.pointerEvents = "auto";
  topic3.value!.style.zIndex = '1';
  topic3.value!.style.fontSize =  '';
  topic3.value!.style.textWrap = 'balance';
  topic3.value!.style.transition = 'all 0.8s ease-out';
  topic3.value!.style.transform = `translate(0, 0)`;
  topic3.value!.querySelector('.main-ball')!.setAttribute('style', 'opacity: 1');
  topic3SceneShow.value = false;
  handleTopic4Click();
}
/**
 * 场景4交互
 * =================================================================================================================================================
 */
const topic4SceneShow = ref<boolean>(false)
const after4Show = ref<boolean>(false)
function handleTopic4Click() {
  titleShow.value = false;
  lightShow.value = false;
  eyeShow.value = false;
  eyeBallShow.value = false;
  topicShows.value = [false,false,false,true];
  topic4.value!.removeEventListener('mousemove', mouseOverHandlers[3]);
  topic4.value!.style.pointerEvents = "none";
  topic4.value!.style.zIndex = '2';
  topic4.value!.style.fontSize =  fontSize.value;
  topic4.value!.style.textWrap = 'nowrap';
  topic4.value!.style.transition = 'all 0.8s ease-out';
  topic4.value!.style.transform = `translate(-70%, 50%)`;
  topic4.value!.querySelector('.main-ball')!.setAttribute('style', 'opacity: 0');
  topic4SceneShow.value = true;
}
function handleTopic4Leave() {
  showSomething();
  topic4.value!.addEventListener('mousemove', mouseOverHandlers[3]);
  topic4.value!.addEventListener('click', handleTopic4Click);
  topic4.value!.style.pointerEvents = "auto";
  topic4.value!.style.zIndex = '1';
  topic4.value!.style.fontSize =  '';
  topic4.value!.style.textWrap = 'balance';
  topic4.value!.style.transition = 'all 0.8s ease-out';
  topic4.value!.style.transform = `translate(0, 0)`;
  topic4.value!.querySelector('.main-ball')!.setAttribute('style', 'opacity: 1');
  topic4SceneShow.value = false;
}

</script>

<template>
  <section class="main-scene">
<!--    标题-->
    <transition
        enter-active-class="animate__animated animate__rotateInDownLeft"
        leave-active-class="animate__animated animate__rotateOutDownLeft">
      <h1
        id="title"
        ref="mainTitle"
        v-if="titleShow">RetiScan Pro<br/>瑞瞳智检</h1>
    </transition>

<!--    灯光-->
    <transition
        enter-active-class="animate__animated animate__fadeInRightBig"
        leave-active-class="animate__animated animate__fadeOutLeftBig">
      <div
        id="light"
        ref="light"
        v-if="lightShow"></div>
    </transition>

<!--    眼球-->
    <transition
        enter-active-class="animate__animated animate__bounceInDown"
        leave-active-class="animate__animated animate__fadeOutDown">
      <div
          ref="eyeball"
          id="eyeball"
          v-if="eyeBallShow">
        <transition
          enter-active-class="animate__animated animate__fadeInTopRight"
          leave-active-class="animate__animated animate__fadeOutTopRight">
          <DotLottieVue
              id="eyeball__inner"
              v-if="eyeShow"
              :key="1"
              autoplay
              loop
              render="svg"
              :data="lottieData"/>
        </transition>
      </div>
    </transition>

<!--    主题1-->
    <transition
        enter-active-class="animate__animated animate__zoomInLeft"
        leave-active-class="animate__animated animate__zoomOutLeft">
      <div
          v-show="topicShows[0]"
          id="topic1"
          @click.once="handleTopic1Click"
          ref="topic1">
        <div class="ball-container">
          <div class="main-ball">
          </div>
          <span class="text">顶尖性能 精准诊断</span>
        </div>
      </div>
    </transition>

<!--    主题2-->
    <transition
      enter-active-class="animate__animated animate__zoomInRight"
      leave-active-class="animate__animated animate__zoomOutRight">
      <div
          v-show="topicShows[1]"
          id="topic2"
          @click.once="handleTopic2Click"
          ref="topic2"
          class="animate__animated animate__zoomInRight">
        <div class="ball-container">
          <div class="main-ball" >
          </div>
          <span class="text">多模应用 智辅诊疗</span>
        </div>
      </div>
    </transition>

<!--    主题3-->
    <transition
    enter-active-class="animate__animated animate__zoomInRight"
    leave-active-class="animate__animated animate__zoomOutRight">
      <div
        v-show="topicShows[2]"
        id="topic3"
        @click.once="handleTopic3Click"
        ref="topic3"
        class="animate__animated animate__zoomInRight">
        <div class="ball-container">
          <div class="main-ball" >
          </div>
          <span class="text">单仓智构 质坚远行</span>
        </div>
    </div>
    </transition>

<!--    主题4-->
    <transition
      enter-active-class="animate__animated animate__zoomInLeft"
      leave-active-class="animate__animated animate__zoomOutLeft">
      <div
          v-show="topicShows[3]"
          id="topic4"
          @click.once="handleTopic4Click"
          ref="topic4"
          class="animate__animated animate__zoomInLeft">
        <div class="ball-container">
          <div class="main-ball" >
          </div>
          <span class="text">智护健康 云链协同</span>
        </div>
      </div>
    </transition>
  </section>

<!-- 场景一  ======================================================================================================================-->
  <section class="topic1-scene" v-if="topic1SceneShow" @animationend="()=>{ after1Show = true }">
    <topic1-scene @back="handleTopic1Leave" @next="handleTopic1Next" v-if="after1Show"></topic1-scene>
  </section>

<!--  场景二 =========================================================================================================================-->
  <section class="topic2-scene" v-if="topic2SceneShow" @animationend="()=>{after2Show = true }">
    <topic2-scene @back="handleTopic2Leave" @next="handleTopic2Next" v-if="after2Show"></topic2-scene>
  </section>
<!--  场景三 =========================================================================================================================-->
  <section class="topic3-scene" v-if="topic3SceneShow" @animationend="()=>{ after3Show = true }">
    <topic3-scene @back="handleTopic3Leave" @next="handleTopic3Next" v-if="after3Show"></topic3-scene>
  </section>
<!--  场景四 ==========================================================================================================================-->
  <section class="topic4-scene" v-if="topic4SceneShow" @animationend="()=>{after4Show = true }">
    <topic4-scene @back="handleTopic4Leave" v-if="after4Show"></topic4-scene>
  </section>


  <svg style="display: none">
    <defs>
      <filter id="blob">
        <feGaussianBlur
          in="SourceGraphic"
          stdDeviation="10"
          result="blur">
        </feGaussianBlur>
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="
          1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 18 -7">
        </feColorMatrix>
      </filter>
    </defs>
  </svg>
</template>

<style scoped lang="scss">
@use 'styles/main-scene';
@use 'styles/topic1-scene';
@use 'styles/topic2-scene';
@use 'styles/topic3-scene';
@use 'styles/topic4-scene';
</style>