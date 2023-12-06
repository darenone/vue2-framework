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
}
```

## 二、坐标辅助器和轨道控制器

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

代码如下：

```js
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
  // 创建网格（也叫创建物体）
  const cube = new THREE.Mesh(geometry, material)
  cube.position.x = 2
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
  controls.autoRotate = false // 自动旋转

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
```

效果图如下：

![../图片/three_1.png](../图片/three_2.png)

## 三、物体位移和父子元素

物体的位置由position属性控制，此属性是Vector3对象，为了让物体移动，可以设置它的position属性，相机和立方体都是物体，每个物体就是一个对象

接着上面的代码，设置立方体沿着x轴移动

```js
cube.position.x = 2
// 等效写法
cube.position.set(2, 0, 0)
```
给当前的cube添加一个父元素

```js
const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
cube.position.set(3, 0, 0) // 设置子元素的位置
parentCube.add(cube) // 将子元素添加到父元素中
parentCube.position.set(-3, 0, 0) // 设置父元素的位置
// 将父元素添加到场景中
scene.add(parentCube)
```

实际效果：

![../图片/three_3.png](../图片/three_3.png)

发现子元素仍然在坐标系的原点，是因为父元素在x的-3处，子元素相对于父元素移动3个单位，就正好是原点的位置

## 四、物体的缩放与旋转

设置立方体的放大：

```js
cube.scale.set(2, 2, 2) // 子元素立方体放大2倍
parentCube.scale.set(2, 2, 2) // 父元素立方体放大2倍，子元素也会跟着放大
```

设置立方体旋转：

```js
cube.rotation.x = Math.PI / 4 // 180°除以4=45°，沿着x轴旋转45度
parentCube.rotation.x = Math.PI / 4 // 父元素旋转45度，子元素也会跟着旋转45度，由于子元素已经单独旋转了45，加起来子元素就是旋转了90度
```

## 五、设置响应式画布与全屏控制

当浏览器窗口大小发生变化，需要更新three.js渲染器的viewport和画布canvas的尺寸，确保场景和对象能够正确显示








