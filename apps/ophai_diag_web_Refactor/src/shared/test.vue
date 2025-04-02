<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';

const items = ref(["dafsdfas",'asdfsdfasd','asdfsdfasd','wqeqwiiiu','oooodfa'])
onMounted(()=>{
  setTimeout(()=>{
    items.value.splice(1,1);
  },2000)
})
</script>

<template>
  <div>
    <TransitionGroup name="list">
      <li v-for="item in items" :key="item">
        {{ item }}
      </li>
    </TransitionGroup>
  </div>

</template>
<style scoped lang="scss">
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}
</style>