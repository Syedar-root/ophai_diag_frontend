<script setup lang="ts">
import { ref } from 'vue'
import {type TagProps, type TagEmits} from "@/features/imageMark/components/Tag/types.ts";
import {Close} from "@element-plus/icons-vue";
const props = defineProps<TagProps>()
const emits = defineEmits<TagEmits>()
const isEditing = ref(false)
const tagInput = ref<HTMLInputElement | null>(null)
const onEdit = () => {
  isEditing.value = true
}
const offEdit = () => {
  isEditing.value = false
  emits('update:modelValue', props.modelValue)
  emits('updateEnd')
}
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emits('update:modelValue', target.value)
}
const handleDblclick = () => {
  onEdit()
}
function cutText(text: string, length: number) {
  if (text.length > length) {
    return text.substring(0, length) + '...'
  }
  return text
}
</script>

<template>
  <div class="tag"
       @dblclick="handleDblclick"
       :style="{'--color': props.color}"
  >
      <span v-show="!isEditing">
        {{cutText(props.modelValue!, 5)}}
        <el-icon>
          <Close @click="props.onClose"></Close>
        </el-icon>
      </span>
      <input v-show="isEditing" type="text"
             :value="props.modelValue"
             @input="handleInput"
             @blur="offEdit"
             @keydown.enter="offEdit"
             ref="tagInput"
      />
  </div>
</template>

<style scoped lang="scss">
.tag{
  position: relative;
  width:10rem;
  height: 2rem;
  padding: 0.1rem;
  border: 1.5px solid var(--color);
  border-radius: 5px;
  background: rgb(from var(--color) r g b / 30%);
  margin: 0.5rem;
  transition: all 0.3s ease;

  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tag span{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
}
.tag input{
  width: 100%;
  height: 100%;
  border: none;
  border-radius: calc(5px - 0.1rem);
  outline: none;
  padding: 0 0.5rem;
}
</style>