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
  import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
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

        // 创建几何体
        // const geometry = new THREE.BoxGeometry(1, 1, 1)
        const geometry = new THREE.BufferGeometry()
        // 创建顶点数据，一个几何体有32个顶点，顶点是有顺序的(逆时针方向)，每3个为一个顶点，逆时针为正面
        const vertices = new Float32Array([
          -1.0, -1.0, 0.0, // 一个顶点的xyz坐标
          1.0, -1.0, 0.0,
          1.0, 1.0, 0.0,

          1.0, 1.0, 0,
          -1.0, 1.0, 0,
          -1.0, -1.0, 0

        ])
        // 创建顶点属性
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
        console.log('几何体', geometry)
        // 创建材质
        // const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
        // 设置父元素材质为线框模式
        // parentMaterial.wireframe = true
        const material = new THREE.MeshBasicMaterial({
          color: 0x00ff00,
          side: THREE.DoubleSide // 正反面都可以看到
        })
        // 创建网格（也叫创建物体）
        // const parentCube = new THREE.Mesh(geometry, parentMaterial)
        const cube = new THREE.Mesh(geometry, material)
        cube.position.set(0, 0, 0)
        // cube.scale.set(2, 2, 2)
        // cube.rotation.x = Math.PI / 4
        // parentCube.add(cube)
        // parentCube.position.set(-3, 0, 0)
        // parentCube.scale.set(2, 2, 2)
        // parentCube.rotation.x = Math.PI / 4
        // 将父元素添加到场景中
        this.scene.add(cube)

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

        const eventObj = {
          Fullscreen: function() {
            document.getElementsByClassName('canvas-container')[0].requestFullscreen()
          },
          ExitFullscreen: function() {
            document.exitFullscreen()
          }
        }
        const gui = new GUI()
        gui.domElement.style.position = 'absolute'
        gui.domElement.style.top = '120'
        gui.domElement.style.left = '5'
        gui.add(eventObj, 'Fullscreen').name('全屏')
        gui.add(eventObj, 'ExitFullscreen').name('退出全屏')
        // 控制立方体的位置
        const folder = gui.addFolder('立方体位置')
        folder.add(cube.position, 'x', -5, 5).name('立方体x轴位置').onChange(val => {
          console.log('立方体x轴位置', val)
        })
        folder.add(cube.position, 'x').min(-10).max(10).step(1).name('立方体x轴位置').onFinishChange(val => {
          console.log('立方体x轴位置', val)
        })
        folder.add(cube.position, 'y').min(-10).max(10).step(1).name('立方体y轴位置')
        folder.add(cube.position, 'z').min(-10).max(10).step(1).name('立方体z轴位置')
        // gui.add(parentMaterial, 'wireframe').name('父元素线框模式')
        const colorParams = {
          cubeColor: '#ff0000'
        }
        gui.addColor(colorParams, 'cubeColor').name('立方体颜色').onChange(val => {
          cube.material.color.set(val)
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
