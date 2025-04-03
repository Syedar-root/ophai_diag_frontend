<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import lottieData from './Animation.json'  // 修改导入方式
import 'animate.css';
import {ref} from "vue";

const eyeShow = ref(false)
const lightShow = ref(false)
const titleShow = ref(false)
const topicShow = ref(false)

function showSomething() {
  lightShow.value = true;
  setTimeout(() => {
    eyeShow.value = true;
    titleShow.value = true;
    setTimeout(() => {
      topicShow.value = true;
    }, 1000)
  },1200)
}

const topic1 = ref<HTMLDivElement|null>(null)
const topic2 = ref<HTMLDivElement|null>(null)
const topic3 = ref<HTMLDivElement|null>(null)

function handleMouseOver(event: MouseEvent, el: HTMLDivElement) {
  const { clientX, clientY } = event;
  const { left, top, width, height } = el.getBoundingClientRect();
  const centerX = left + width / 2;
  const centerY = top + height / 2;
  const distanceX = clientX - centerX;
  const distanceY = clientY - centerY;
  const radius = width / 2;
  const mainBall = el.querySelector('.main-ball') as HTMLDivElement;
  console.log(mainBall);
  if (distanceX < radius && distanceY < radius && mainBall) {
    mainBall.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
    console.log(mainBall);
  }else {
    mainBall.style.transform = `translate(0, 0)`;
  }

}


</script>

<template>
  <section class="main-scene">
    <h1
        id="title"
        class="animate__animated animate__rotateInDownLeft"
        v-if="titleShow">ProEyes智慧眼底诊断</h1>
    <div
        id="light"
        class="animate__animated animate__fadeInRightBig"
        v-if="lightShow"></div>
    <div
        class="animate__animated animate__bounceInDown"
        id="eyeball"
        @animationend="showSomething">
          <DotLottieVue
              v-if="eyeShow"
              id="eyeball__inner"
              autoplay
              class="animate__animated animate__fadeInTopRight"
              loop
              :data="lottieData"
          />
    </div>
    <div
        v-if="topicShow"
        id="topic1"
        ref="topic1"
        @mousemove="handleMouseOver($event, topic1)"
        class="animate__animated animate__zoomInLeft">
      <div class="main-ball">
        主题1
      </div>
      <div class="meta-ball"></div>
    </div>
    <div
        v-if="topicShow"
        id="topic2"
        ref="topic2"
        class="animate__animated animate__zoomInRight">
      <div class="main-ball" >
        主题2
      </div>
      <div class="meta-ball"></div>
    </div>
    <div
        v-if="topicShow"
        id="topic3"
        ref="topic3"
        class="animate__animated animate__zoomInRight">
      <div class="main-ball" >
        主题3
      </div>
      <div class="meta-ball"></div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use 'main-scene';
</style>