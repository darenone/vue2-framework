<template>
  <div class="canvas-container h-100" />
</template>
<script>
  import * as THREE from 'three'
  // 导入轨道控制器
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
  export default {
    data() {
      return {

      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        // 创建场景
        const scene = new THREE.Scene()

        // 创建透视相机（类似于人眼睛看到的，近的大，远的小）在三维空间，xyz，xy和二维空间坐标系一致，z垂直于xy的平面
        // 透视相机就在z轴上，默认位置（0,0,0）
        const width = document.getElementsByClassName('canvas-container')[0].clientWidth
        const height = document.getElementsByClassName('canvas-container')[0].clientHeight
        const camera = new THREE.PerspectiveCamera(
          45, // 视角远近，设置的越大，看到的东西越多
          width / height, // 相机宽高比
          0.1, // 近平面（相机最近能看到的物体）
          1000 // 远平面（相机最远能看到的物体）
        )
        camera.position.z = 5 // 设置相机位置
        camera.position.y = 2
        camera.position.x = 2
        camera.lookAt(0, 0, 0) // 相机默认看向原点（这个是默认值，不设置也可以）
        // 创建渲染器(负责将物体渲染到canvas画布上)
        const renderer = new THREE.WebGL1Renderer()
        renderer.setSize(width, height) // 需要渲染的最终尺寸
        document.getElementsByClassName('canvas-container')[0].appendChild(renderer.domElement) // 将canvas画布放到body里

        // 创建几何体
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        // 创建材质
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        // 创建网格（创建物体）
        const cube = new THREE.Mesh(geometry, material)

        // 将网格添加到场景中
        scene.add(cube)

        // 添加世界坐标辅助器
        const axesHelper = new THREE.AxesHelper(5)
        scene.add(axesHelper)
        // 添加轨道控制器
        const controls = new OrbitControls(camera, renderer.domElement)
        // 设置带阻尼的惯性（鼠标移动后慢慢的结束）
        controls.enableDamping = true // 开启阻尼
        controls.dampingFactor = 0.05 // 阻尼的大小
        controls.autoRotate = true // 自动旋转

        // 渲染函数
        function animate() {
          controls.update()
          requestAnimationFrame(animate)
          // 旋转
          // cube.rotation.x += 0.01
          // cube.rotation.y += 0.01
          // 旋转完重新渲染
          renderer.render(scene, camera)
        }
        animate()
      }
    }
  }
</script>
<style lang="scss" scoped>
.canvas-container {
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
