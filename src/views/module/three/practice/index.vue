<template>
  <div class="canvas-container relative h-100">
    <el-button class="absolute" style="right: 90px;" type="primary" @click="fullScreen">全屏</el-button>
    <el-button class="absolute" style="right: 5px;" type="primary" @click="exitFullScreen">退出全屏</el-button>
  </div>
</template>
<script>
  import * as THREE from 'three'
  // 导入轨道控制器
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
  // 导入lil.gui
  // import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
  // 导入hdr(全景)加载器
  import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
  // 导入gltf加载器
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
  export default {
    data() {
      return {
        scene: null,
        camera: null,
        renderer: null,
        animate: null
      }
    },
    mounted() {
      console.log('three初始化')
      this.init()
    },
    beforeDestroy() {
      console.log('离开了')
      // window.removeEventListener('resize', this.changeSize)
      // window.removeEventListener('dblclick', this.portClick)
      this.animate && cancelAnimationFrame(this.animate)
      this.removeObj(this.scene)
      this.renderer && this.renderer.dispose()
      this.renderer.forceContextLoss()
      this.renderer.domElement = null
      this.renderer.content = null
      this.renderer = null
      THREE.Cache.clear()
    },
    methods: {
      init() {
        // 创建场景
        this.scene = new THREE.Scene()

        // 创建透视相机（类似于人眼睛看到的，近的大，远的小）在三维空间，xyz，xy和二维空间坐标系一致，z垂直于xy的平面
        // 透视相机就在z轴上，默认位置（0,0,0）
        const width = document.getElementsByClassName('canvas-container')[0].clientWidth
        const height = document.getElementsByClassName('canvas-container')[0].clientHeight
        this.camera = new THREE.PerspectiveCamera(
          45, // 视角远近，设置的越大，看到的东西越多
          width / height, // 相机宽高比
          0.1, // 近平面（相机最近能看到的物体）
          1000 // 远平面（相机最远能看到的物体）
        )
        this.camera.position.z = 5 // 设置相机位置
        this.camera.position.y = 2
        this.camera.position.x = 2
        this.camera.lookAt(0, 0, 0) // 相机默认看向原点（这个是默认值，不设置也可以）
        // 创建渲染器(负责将物体渲染到canvas画布上)
        this.renderer = new THREE.WebGL1Renderer()
        this.renderer.setSize(width, height) // 需要渲染的最终尺寸
        document.getElementsByClassName('canvas-container')[0].appendChild(this.renderer.domElement) // 将canvas画布放到body里

        // 实例化加载器
        const gltfLoader = new GLTFLoader()
        // 加载模型
        gltfLoader.load(
          // 模型路径
          './statics/glb/AFS-A-24.glb',
          // 加载完的回调
          (gltf) => {
            console.log(gltf)
            this.scene.add(gltf.scene)
          }
        )
        this.scene.background = new THREE.Color(0x999999)
        // 加载环境贴图
        const rgbeLoader = new RGBELoader()
        rgbeLoader.load('./statics/images/3d/wrestling_gym_1k.hdr', (envMap) => {
          // 设置球形贴图
          envMap.mapping = THREE.EquirectangularReflectionMapping
          // 设置环境贴图
          this.scene.environment = envMap
        })
        // 添加世界坐标辅助器
        const axesHelper = new THREE.AxesHelper(5)
        this.scene.add(axesHelper)
        // 添加轨道控制器
        const controls = new OrbitControls(this.camera, this.renderer.domElement)
        // 设置带阻尼的惯性（鼠标移动后慢慢的结束）
        controls.enableDamping = true // 开启阻尼
        controls.dampingFactor = 0.05 // 阻尼的大小
        controls.autoRotate = false // 自动旋转

        // 渲染函数
        this.animate = () => {
          controls.update()
          requestAnimationFrame(this.animate)
          // 旋转
          // cube.rotation.x += 0.01
          // cube.rotation.y += 0.01
          // 旋转完重新渲染
          this.renderer && this.renderer.render(this.scene, this.camera)
        }
        this.animate()
        // 监听窗口变化
        window.addEventListener('resize', () => {
          const width = document.getElementsByClassName('canvas-container')[0].clientWidth
          const height = document.getElementsByClassName('canvas-container')[0].clientHeight
          // 重置渲染器宽高比
          this.renderer.setSize(width, height)
          // 重置相机宽高比
          this.camera.aspect = width / height
          // 更新相机投影矩阵
          this.camera.updateProjectionMatrix()
        })
      },
      removeObj(obj) {
        let arr = obj.children.filter((x) => x)
        arr.forEach((item) => {
          if (item.children.length) {
            this.removeObj(item)
          } else {
            item.clear()
          }
        })
        obj.clear()
        arr = null
      },
      fullScreen() {
        document.getElementsByClassName('canvas-container')[0].requestFullscreen()
      },
      exitFullScreen() {
        document.exitFullscreen()
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
