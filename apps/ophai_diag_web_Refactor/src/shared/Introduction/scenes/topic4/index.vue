<script setup lang="ts">

import {Back} from "@element-plus/icons-vue";
import 'animate.css';
import background from "@/shared/Introduction/scenes/background.vue";

const emits = defineEmits(['back']);
const handleBack = async () => {
  await outEvent();
  topic4ContainerRef.value?.addEventListener('animationend', async () => {
    emits('back');
  })
}
let mousePos = {
  x: 0,
  y: 0,
}
const cardShows = ref<boolean[]>([false, false, false, false]);
const topic4ContainerRef = ref<HTMLElement|null>(null);
const outEvent = async () => {
  cardShows.value = [false, false, false, false];
}
onMounted(() => {
  cardShows.value = [true, true,true, true];
  topic4ContainerRef.value?.addEventListener('mousemove', (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
  })
})

const titles = ref([
  '多维诊断与数据分析',
  '云端协同处理',
  '安全可信数据管理',
  '模块化扩展架构'
])
const hoverIndex = ref(-1);
function handleMouseEnter(index: number) {
  // if (cardsBlur.value[index-1]) return;
  let c = topic4ContainerRef.value?.querySelector(`.c${index}`) as HTMLElement;
  if (!c) return;
  let p = c.querySelector('p') as HTMLElement;
  p.style.filter = 'blur(0)';
  hoverIndex.value = index-1;
}
function handleMouseLeave(index: number) {
  let c = topic4ContainerRef.value?.querySelector(`.c${index}`) as HTMLElement;
  if (!c) return;
  let p = c.querySelector('p') as HTMLElement;
  p.style.filter = 'blur(10px)';
  hoverIndex.value = -1;
}
</script>

<template>
  <div class="topic4-scene-container" ref="topic4ContainerRef">
    <background :bg-color="'#fffefb'" :point-color="'#00668c'" :mouse-pos="mousePos"></background>
    <div class="header">
      <div id="back" @click="handleBack">
        <el-icon size="40">
          <Back></Back>
        </el-icon>
        Back
      </div>
    </div>
    <div class="topic4-scene-content">
      <div class="desk-container">
        <div class="desk">
          <div class="title-container">
            <transition name="title-fade" mode="out-in">
              <h1 :key="hoverIndex">{{titles[hoverIndex]}}</h1>
            </transition>
          </div>
        </div>
      </div>
      <div class="card-container">
        <transition
          enter-active-class="animate__animated animate__fadeInTopRight"
          leave-active-class="animate__animated animate__fadeOutTopRight">
          <div class="card c1" v-if="cardShows[0]"
               @mousemove="handleMouseEnter(1)"
               @mouseleave="handleMouseLeave(1)">
            <div class="card-body">
              <p>
                AI 驱动眼底病例智能分析系统，融合深度学习算法与多模态影像数据，通过人工与智能协同分析构建多维统计模型，为临床提供精准诊疗决策支持，显著提升诊断效率与准确性。
              </p>
            </div>
          </div>
        </transition>

        <transition
            enter-active-class="animate__animated animate__fadeInTopRight"
            leave-active-class="animate__animated animate__fadeOutTopRight">
          <div class="card c2" v-if="cardShows[1]"
               @mouseenter="handleMouseEnter(2)"
               @mouseleave="handleMouseLeave(2)">
            <div class="card-body">
              <p>
                基于微服务架构与 OSS 云存储构建分布式诊疗协同平台，实现存储资源弹性扩展与数据全生命周期加密，保障诊疗流程高效安全。
              </p>
            </div>
          </div>
        </transition>

        <transition
            enter-active-class="animate__animated animate__fadeInTopLeft"
            leave-active-class="animate__animated animate__fadeOutTopLeft">
          <div class="card c3" v-if="cardShows[2]"
              @mouseenter="handleMouseEnter(3)"
              @mouseleave="handleMouseLeave(3)">
            <div class="card-body">
              <p>
                基于多重加密技术构建数据安全防护体，采用 JWT 令牌实现用户身份验证与权限管理，结合 Redis 内存加密存储敏感数据，实现诊疗数据全链路安全防护，保障患者信息在传输、存储、处理全流程中的机密性与完整性。
              </p>
            </div>
          </div>
        </transition>

        <transition
            enter-active-class="animate__animated animate__fadeInTopLeft"
            leave-active-class="animate__animated animate__fadeOutTopLeft">
          <div class="card c4" v-if="cardShows[3]"
              @mouseenter="handleMouseEnter(4)"
              @mouseleave="handleMouseLeave(4)">
            <div class="card-body">
              <p>
                基于 RESTful API 的松耦合微服务架构，采用容器化部署，，通过异步消息队列RabbitMQ优化跨服务数据传输效率，保障系统弹性扩展能力与业务敏捷性。
              </p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'styles';

// ... existing styles ...

.title-fade-enter-active,
.title-fade-leave-active {
  transition: all 0.2s;
}

.title-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.title-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

</style>