# three.js学习

## 一、初始three.js

官网[three.js](https://threejs.org/)，访问比较慢，我们可以把它部署在本地进行访问，git地址[mrdoob/three.js](https://github.com/mrdoob/three.js/)，把源码下载下来以后，到项目根目录`three.js-dev`执行`npm install`，然后再执行`npm run start`即可启动项目

利用`vite`创建各种模板项目，新建一个文件，cmd运行如下命令：

```
npm init vite@latest

可创建以下模板项目：
- Vanilla(不用任何框架)
- Vue
- React
- Preact
- Lit
- Svelte
- Others
```

选择你需要创建的模板项目，安装即可，我的项目时基于vue来开发的，以下代码是基于vue2环境

首先执行以下命令，安装`three`

```
npm install three@0.153 --save
```

之后，我们先用three渲染一个立方体

```html
<template>
  <div class="canvas-container h-100" />
</template>
<script>
  import * as THREE from 'three'
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
        // 1、创建场景
        const scene = new THREE.Scene()

        // 2、创建透视相机（类似于人眼睛看到的，近的大，远的小）在三维空间，xyz，xy和二维空间坐标系一致，z垂直于xy的平面
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
        camera.lookAt(0, 0, 0) // 相机默认看向原点（这个是默认值，不设置也可以）
        // 3、创建渲染器(负责将物体渲染到canvas画布上)
        const renderer = new THREE.WebGL1Renderer()
        renderer.setSize(width, height) // 需要渲染的最终尺寸
        document.getElementsByClassName('canvas-container')[0].appendChild(renderer.domElement) // 将canvas画布放到body里

        // 4、创建几何体
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        // 5、创建材质
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        // 6、创建网格（创建物体）
        const cube = new THREE.Mesh(geometry, material)

        // 将网格添加到场景中
        scene.add(cube)

        // 渲染
        renderer.render(scene, camera)
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
```

效果图如下：

![../图片/three_1.png](../图片/three_1.png)

此时只看到一个2d的正方形，因为我们的相机设置在z轴，正对着它，所以只能看到一个面，如果想让它动起来，需要写一个渲染函数，在渲染函数里调用`requestAnimationFrame(请求动画帧)`方法，它会一帧一帧调用`animate函数`，这一帧播完，下一帧继续调用

```js
// 渲染函数
function animate() {
  requestAnimationFrame(animate)
  // 旋转
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  // 旋转完重新渲染
  renderer.render(scene, camera)
}
animate()
```

利用坐标辅助器`AxesHelper`，可以在场景中加入xyz坐标系（蓝色是z轴，红色是x轴，绿色是y轴）

利用轨道控制器`OrbitControls`，可以用鼠标左键旋转立方体，用滑轮控制立方体的远近，用左键移动立方体（其实是控制的摄像机，让摄像机旋转，拉进拉远，摄像机移动）

`OrbitControls`的第二个参数是一个元素，用来指定轨道控制器监听哪个元素的事件

```js
const controls = new OrbitControls(camera, renderer.domElement)
```

`renderer.domElement`就是当前canvas画布，相当于监听的是canvas事件，可以换一个元素进行监听，比如监听其父元素`canvas-container`的鼠标滑动，缩放事件，这样写：

```js
const controls = new OrbitControls(camera, document.getElementsByClassName('canvas-container')[0])
```



