<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'

const container = ref<HTMLElement>()
type ThreeObjects = {
  scene: THREE.Scene | null
  camera: THREE.PerspectiveCamera | null
  renderer: THREE.WebGLRenderer | null
  cube: THREE.Mesh | null
}

const objects : ThreeObjects = {
  scene: null,
  camera: null,
  renderer: null,
  cube: null
}

function init(){
  if(!container.value) return;
  // 场景
  objects.scene = new THREE.Scene()

  // 相机
  objects.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
  )
  objects.camera.position.z = 5

  // 渲染器
  objects.renderer = new THREE.WebGLRenderer({ antialias: true })
  objects.renderer.setSize(window.innerWidth, window.innerHeight)
  container.value.appendChild(objects.renderer.domElement)

  // 创建立方体
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    metalness: 0.5,    // 金属质感
    roughness: 0.4     // 表面粗糙度
  })
  // 添加环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  objects.scene.add(ambientLight)

  // 添加点光源
  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(2, 2, 2)
  objects.scene.add(pointLight)

  // 启用阴影（可选）
  objects.renderer.shadowMap.enabled = true;

  pointLight.castShadow = true
  objects.cube = new THREE.Mesh(geometry, material)
  objects.cube.castShadow = true
  objects.scene.add(objects.cube)
}

// 动画循环
function animate(){
  requestAnimationFrame(animate);

  if (objects.cube){
    objects.cube.rotation.x += 0.01;
    objects.cube.rotation.y += 0.01;
  }

  if (objects.scene && objects.camera && objects.renderer){
    objects.renderer.render(objects.scene, objects.camera)
  }
}

function onWindowResize(){
  if (objects.camera && objects.renderer){
    objects.camera.aspect = window.innerWidth / window.innerHeight
    objects.camera.updateProjectionMatrix()
    objects.renderer.setSize(window.innerWidth, window.innerHeight)
  }
}

onMounted(() => {
  init()
  animate()
  window.addEventListener('resize', onWindowResize, false)
})
onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize, false)
  if (objects.renderer && container.value) {
    container.value.removeChild(objects.renderer.domElement)
  }

  objects.scene?.clear()
  objects.renderer?.dispose()
  objects.cube?.geometry.dispose()
})
</script>

<template>
  <div class="three-container" ref="container"></div>
</template>

<style scoped lang="scss">

</style>