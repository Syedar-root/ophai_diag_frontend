<script setup lang="ts">
  import {useImageLibraryStore} from "@/features/imageLibrary/stores/imageLib.ts";
  import { useRouter } from "vue-router";

  const imageLibraryStore = useImageLibraryStore();
  const router = useRouter();
  const handleImageClick = (caseId:string) => {
    router.push({
      path: '/dd/' + caseId,
    })
  }
  onMounted(()=>{

  })
</script>


<template>
  <div class="imageLib-list-container"  v-if="imageLibraryStore.imageLibrary.items.length > 0">
    <el-card
        v-for="item in imageLibraryStore.imageLibrary.items"
        shadow="hover"
        @click="handleImageClick(item.caseId)"
    >
      <template #header>
        <label>{{item.caseId}}</label>
      </template>
      <div class="image">
        <img :src="item.originImageData.leftImage" />
        <img :src="item.originImageData.rightImage" />
      </div>
    </el-card>
  </div>
  <el-empty v-else description="找不到图像"></el-empty>
</template>

<style scoped lang="scss">
@use 'sass:map';
@use '@/shared/assets/styles/vars' as vars;
.imageLib-list-container{
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto 1fr;
  gap: map.get(vars.$space,'l');
  label{
    font-size: map.get(vars.$font-size,'s');
    margin-bottom: map.get(vars.$space,'s');
  }
  .image{
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: map.get(vars.$space,'m');
    img{
      position: relative;
      width: 45%;
      aspect-ratio: 1/1;
      object-fit: contain;
    }
  }
}
.el-card{
  --el-card-padding: #{map.get(vars.$space,'s')};
  position: relative;
  width: 100%;
  height: fit-content;
  border-radius: 0.5rem;
  &:hover{
    border-color: map.get(vars.$colors, 'primary-light-5');
    cursor: pointer;
  }
  :deep(.el-card__header){
    padding: 0 var(--el-card-padding);
  }
 }
</style>