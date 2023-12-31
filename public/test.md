# vue2基础框架搭建手册(1)

注意：此vue2框架搭建于node版本[18.12.1]npm版本[8.19.2]，在此环境下不会报错，如果在其它node版本下出现问题，大概率是引用的开发依赖版本不兼容导致，需要针对具体报错信息进行处理

## 一、利用vue-cli拉取vue2基础模板

1) 启动项目管理器

cmd中输入以下命令：

```
vue ui
```

2) 选择文件夹创建项目，例如，项目名称：vue2-framework

包管理器选择：npm

初始化git仓库：打开

3) 选择：手动配置项目

Babel：打开

Router：打开

Vuex：打开

CSS Pre-processors(预处理器)：打开

Linter/Formatter：打开

使用配置文件：打开

4) 选择vue版本：2.x

CSS Pre-processors选择：Sass/SCSS(with dart-sass)（项目有多主题切换的需求时建议安装SCSS）

Linter/Formatter：选择ESLint+Standard config

Lint on save：打开

5) 创建项目，不保存预设

以上就获取了一个基于vue2的基础模板

## 二、利用vscode实现代码格式化

要想让vscode编辑器，在保存代码时自动格式化代码，项目里首先需要安装`babel-eslint`，同时需要重新配置项目里的`.eslintrc.js`文件，vscode还需要安装`vetur`和`eslint`拓展插件，同时需要设置vscode的`settings.json`文件（见附录3）

项目里安装开发依赖`babel-eslint`：

```
npm install babel-eslint@7.2.3 --save-dev
```

## 三、新建目录结构

下载下来的模板，需要新建各种目录，以满足实际开发需要，具体参考此基础框架所拥有的结构，也可以针对自己需求调整，不用非要保持一致

新建：

- src/api
- src/assets/img
- src/assets/font
- src/assets/css
- src/directive
- src/lib/tool.js
- src/lib/util.js
- src/config/index.js
- src/errorPage
- src/store/state.js
- src/mock/index.js

需要安装的依赖：

```
cnpm/npm install mockjs -D // 此依赖只作为开发环境使用，所以后缀不是--save 而是-D
```

## 四、配置路由

项目里详细的路由配置见文件[附录5：vue项目配置路由的几种方式.md](附录5：vue项目配置路由的几种方式.md)

api名词：

- 路由跳转组件：`<router-link></router-link>`
- 视图渲染组件：`<router-view/>`，通过`<router-link>`跳转到某个页面时所加载的组件必须在这里面渲染
- 动态路由，形如：`http://localhost:4000/#/task-detail/10000218`，具体配置：
```js
const routes = [
  {
    path: '/task-detail/:taskId',
    name: 'taskDetail',
    component: () => import('../views/task-detail.vue')
  },
]
```
在组件里进行路由跳转：
```
<router-link to="/task-detail/10000218">任务详情10000218</router-link>
```
在跳转到的组件里获取url传递过来的值：
```
{{$route.params.taskId}}
```
- 编程式导航：

路由配置如下：
```
{
  path: '/task-detail',
  name: 'taskDetail',
  component: () => import('../views/task-detail.vue')
}
```
组件里进行跳转和取值
```js
// 2种方式，区别：push会在浏览器浏览历史里新添加一条记录，而replace是替换当前浏览历史

// 第一种
this.$router.push({path: '/task-detail', query: { taskId: 1}})
// 取值
{{$route.query.taskId}}
// url如：http://localhost:4000/#/task-detail?taskId=10000218，，刷新时参数会被清除
// 或
this.$router.push({name: 'task-detail', params: { taskId: 1}})
// 取值
{{$route.params.taskId}}
// url如：http://localhost:4000/#/task-detail，刷新时参数会被清除

// 第二种
this.$router.replace({path: '/task-detail', query: { taskId: 1}})
// 取值
{{$route.query.taskId}}
// 或
this.$router.replace({name: 'task-detail', params: { taskId: 1}})
// 取值
{{$route.params.taskId}}
```
- 嵌套路由：

具体配置见`src/views/prodct`，路由配置见`src/router/index.js`里的`/product`

嵌套路由的要诀：发现index.vue和ele-product.vue页面都有`<router-view/>`这个标签，因为和App.vue页面一样，它们都是父页面，App.vue是根页面，是项目中所有页面的父页面，而index.vue是ele-product.vue页面的父页面，ele-product.vue是phone.vue和computer.vue的父页面，只要这个页面是父页面就需要添加`<router-view/>`这个标签

- 命名路由

路由列表里的name属性就是命名路由，可以用在路由跳转上

```
<router-link to="/product/ele-product/computer">电脑</router-link>

<router-link :to="{name: 'computer'}">电脑</router-link>
```

- 命名视图

形如：

```
<router-view name="apple"/>
<router-view name="huawei"/>
<router-view name="xiaomi"/>
```

具体配置见`route/index.js`的`/product`路由，组件见`src/views/module/product/eleProduct.vue`

- 路由别名

```js
const routes = [
  {
    path: '/task-detail/:taskId',
    alias: '/task-detail',
    name: 'taskDetail',
    component: () => import('../views/task-detail.vue')
  },
]
```

- 路由重定向

```js
{
  path: '/web-task',
  component: Layout,
  redirect: '/web-task/task-list',
  name: 'web-task',
  meta: {
    title: '拨测任务管理',
  },
  children: [
    {
      path: 'task-list',
      component: resolve => require(['@/views/web-task/task-list.vue'], resolve),
      name: 'task-list',
      meta: { 
        title: '拨测任务列表', 
      },
    },
  ]
}
```

- 路由组件传参

`$route.query`和`$route.params`放到组件里，路由和组件之间有着高度的耦合，不能最大程度复用组件，可以使用路由组件传参，将组件和路由解耦

路由组件传参有以下几种方式：

1. 布尔模式

```js
 {
    path: '/task-detail/:taskId',
    name: 'task-detail',
    component: () => import('../views/task-detail.vue'),
    props: true
  }
```
组件里面获取路由传递过来的值
```html
<template>
    <section>
        {{taskId}}
    </section>
</template>
<script>
export default {
    props: {
        taskId: {
            type: [String, Number],
            default: ''
        }
    },
    data () {
        return {
            
        }
    }
}
</script>
```
当需要这个组件复用时，要想给组件传递taskId这个值，只需要调用这个组件即可
```html
<task-detail :taskId="10000218"></task-detail>
```

2. 对象模式

```js
  {
    path: '/task-detail',
    name: 'task-detail',
    component: () => import('../views/task-detail.vue'),
    props: {
      taskId: '10000218'
    }
  }
```
通过路由给组件传值的时候要这样写:
```
<router-link to="/task-detail">任务详情10000217</router-link>
```
页面里获取还是这样写：
```html
<template>
  <div class="about">
    <h1>This is an about page {{taskId}}</h1>
  </div>
</template>
<script>
export default {
    props: {
        taskId: '',
    },
    data () {
        return {

        }
    }
}
</script>
```

3. 函数模式

```js
  {
    path: '/task-detail/:taskId',
    name: 'task-detail',
    component: () => import('../views/task-detail.vue'),
    props: route => {
      if (route.params && route.params.taskId) {
        return {
          taskId: route.params.taskId
        }
      }
    }
  },
```
通过路由给组件传值的时候要这样写:
```html
<router-link to="/task-detail/10000217">任务详情10000217</router-link>
```

- HTML5 History模式

讲这个之前，我先来介绍一个html中锚点的概念，锚点的作用是实现页面内的跳转

```
快速访问页面中的内容，可以这样来写
```html
<a href="#title1">内容1</a>
<a href="#title2">内容2</a>
<a href="#title3">内容3</a>

...

<a name="title1">内容1...</a>
<a name="title2">内容2...</a>
<a name="title3">内容3...</a>
<!--或者-->
<div id="title1">内容1...</a>
<div id="title2">内容2...</a>
<div id="title3">内容3...</a>
```
这又和本节内容有什么关系呢？vue-router官方说，vue-router默认hash模式，hash是什么呢？我来介绍一下：

hash属性是一个可读可写的字符串，该字符串是URL的锚部分（从#号开始的部分），#代表网页中的一个位置，其右面的字符就是该位置的标识符（说的就是锚点），例如：
```
http://www.blog.com/index.html#title1
```
就代表网页index.html的title1位置，浏览器读取这个URL后会自动将title1位置滚动至可视区域

#是用来指导浏览器动作的，对服务器端完全无用，所以，HTTP请求中不包括#，比如访问下面的网址：
```
http://www.blog.com/index.html#title1
```
浏览器实际发出的请求是这样的：
```
GET /index.html HTTP/1.1
Host: www.example.com
```
可以看到只请求了index.html，根本没有#title1这部分

所以，在URL中，第一个#后面出现的任何字符，都会被浏览器解读为位置标识符（锚点），这些字符都不会被发送到服务器端，而且改变URL中#后面的部分，只相当于改变了锚点，浏览器只会滚动到相应位置，不会重新加载网页，比如：
```
http://www.blog.com/index.html#title1
到
http://www.blog.com/index.html#title2
```
这种锚点的改变，完全由浏览器控制，而不会重新向服务器请求index.html这个页面

现在我们再回到vue-router官方文档这里，它提到了，vue-router默认hash模式（#后面跟字符串）使用hash来模拟一个完整的URL，于是当URL改变时，页面不会重新加载，如果不想要这种方式展示，还可以用路由的history模式
```js
const router = new VueRouter({
  mode: 'history',
  routes
})
```
这样，路由就变化了:
```
http://localhost:4000/#/task-detail/10000216
变成了
http://localhost:4000/task-detail/10000217
```
但是这种模式也需要后端的支持，因为我们的应用是个单页客户端应用，只有一个index.html页面，当路由变化时，如果采用hash模式，从路由：
```
http://localhost:4000/#/task-detail/10000217
变到
http://localhost:4000/#/about
```
时，不会重新请求页面，至始至终只有一个index.html页面，路由的变化，也可以看成是锚点的改变，相当于浏览器从#/task-detail这个锚点到/about这个锚点，但是如果采用history模式，从路由：
```
http://localhost:4000/task-detail/10000217
变成了
http://localhost:4000/about
```
这个时候浏览器就会认为是需要向服务器请求task-detail.html和about.html这两个html的，但是服务器上根本没有这两个html，就会报404文件未找到错误，所以这个时候就需要后端哥们的支持，未匹配到html页面的时候，就返回index.html这个页面，具体后端怎么配置，可以参考官方文档

- 导航守卫

1. 全局前置守卫

写在router/index.js里面：
```js
// 从本地session拿token看是否已经登录，登录了直接跳转到首页，没有登录，看看当前路由是否在白名单那里，不在直接跳转到登录页登录
router.beforeEach((to, from, next) => {
    // const isLogin = !!sessionStorage.getItem('accessToken');
    const isLogin = true

    if (isLogin) {
        if (to.name === 'login') {
            next({
                name: 'home'
            });
        } else {
            next()
        }
    } else {
        if (whitelist.indexOf(to.name) !== -1) {
            next()
        } else {
            next({
                name: 'login'
            })
        }
    }
});
// next()方法一定要加，不然不能跳转
```

2. 全局后置钩子

和前置守卫不同的是，后置钩子不会接受next函数，也不会改变导航本身：
```
let app;
router.afterEach((to, from) => {
    app = document.querySelector('.app-content-inner')
    app && app.scrollTo(0, 0)
})
```

3. 路由独享的守卫

```js
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    beforeEnter: (to, from, next) => {
      if (from.name === 'Home') {
        console.log('从home页跳转过来')
      } else {
        console.log('不是从home页跳转来的')
      }
      next()
    }
  },
```

4. 组件内守卫

`beforeRouteEnter`

我曾经做过的项目遇到一个问题：

有一个创建任务的页面，路由为：（http://localhost:8082/#/web-task/task-create），分别可以从两个页面：监测任务列表（http://localhost:8082/#/web-task/web-list）和监测任务管理（http://localhost:8082/#/web-task/task-list）跳转过来，需求是，从哪个页面跳转过来的，当任务创建完毕还回到哪个页面

这个需求就可以用组件内守卫来实现
```js
beforeRouteEnter (to, from, next) {
    console.log(to) // 当前路由对象
    console.log(from) // 上个路由对象
    console.log(this) // undefined
    next()
}
```
但是我发现在里面拿不到this这个vue实例，解释原因是因为：走这一步的时候，当前组件还没有渲染完成，vue实例还未创建完成，那怎么在`beforeRouteEnter`内按到vue实例呢？

解决方法就是给next函数传一个回调函数，完美解决这个问题
```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    if (from.name === 'web_list') {
      vm.from_router = '/web-task/web-list'
    } else if (from.name === 'task_list') {
      vm.from_router = '/web-task/task-list'
    }
  })
}
```
`beforeRouteLeave`

关于这个的用法，比如用户在当前页面进行编辑操作，还没有保存就要跳转到其它页面，那么你就可以在这个钩子函数里面提醒用户，编辑还未完成，是否取消编辑，这里提示一下：在这个方法里可以直接用this
```vue
<script>
export default {
    props: {
        taskId: {
            type: [String, Number],
            default: ''
        }
    },
    data () {
        return {
            
        }
    },
    methods: {
        
    },
    beforeRouteLeave (to, from, next) {
        const leave = confirm('确定离开吗？')
        if (leave) {
            next()
        } else {
            next(false); // 不会跳转
        }
        // next(vm => {
        //     console.log(vm) // vue实例
        // })
    },
    beforeRouteUpdate (to, from, next) {
        console.log('组件被复用')
        next()
    }
}
</script>
```
`beforeRouteUpdate`
```js
// 在当前路由改变，但是该组件被复用时调用
// 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
// 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
// 可以访问组件实例 `this`
beforeRouteUpdate (to, from, next) {
  console.log('组件被复用')
  next()
}
```

完整的导航（路由）解析流程：
```js
/*
1. 导航被触发
2. 在失活的组件（即将离开的页面组件）里调用离开守卫 beforeRouteLeave
3. 调用全局的前置守卫 beforeEach
4. 在复用的组件里调用 beforeRouterUpdate
5. 调用路由独享的守卫 beforeEnter
6. 解析异步路由组件
7. 在被激活的组件（即将进入的的页面组件）里调用 beforeRouterEnter
8. 调用全局的解析守卫 beforeResolve
9. 导航被确认
10. 调用全局的后置钩子 afterEach
11. 触发DOM更新
*/
```

- 路由元信息

```js
{
  path: '/',
  name: 'Home',
  component: Home,
  meta: {
    title: '首页',
    requiresAuth: ['admin', 'user']
  }
},
```
这里的meta就是元信息，可以在这里给每个路由对象配一个title或者打一个标志，用来区别哪些用户可以访问这个路由

也可以利用前置守卫和路由元信息，修改`window.document.title`的值

首先找到咱们在第二节新建的src/lib/util.js，当时说了这个文件用来存放和业务相关的方法，接下来咱们就新建一个和业务有关联的方法
```js
// util.js
export const setTitle = (title) => {
  window.document.title = title ? title + '-拨测管理平台' : '拨测管理平台'
}
```
然后在src/router/index.js里面引入，并且在前置守卫里增加一行代码
```js
// router/index.js
import {setTitle} from '@/lib/util'

router.beforeEach((to, from, next) => {
  to.meta && setTitle(to.meta.title)
})
```
- 路由切换过渡效果

路由切换的时候，在`<router-view/>`里面加载页面，我们可以利用`<transition>`组件给它添加一些过渡效果
```vue
<transition>
  <router-view></router-view>
</transition>
```
如果是多个视图，需要用`<transition-group>`包裹
```vue
<transition-group>
  <router-view></router-view>
  <router-view name="phone"></router-view>
</transition-group>
```
我来写一个过渡效果的例子：
```vue
<transition name="router">
  <router-view/>
</transition>

<style lang="less">
// 进入效果
.router-enter {
  opacity: 0;
}
.router-enter-active {
  transition: opacity 1s ease;
}
.router-enter-to {
  opacity: 1;
}
// 离开效果
.router-leave {
  opacity: 1;
}
.router-leave-active {
  transition: opacity 1s ease;
}
.router-leave-to {
  opacity: 0;
}
</style>
```

## 五、vue状态管理vuex

### 5.1 state用法

#### 5.1.1 设置/获取state里的值

```js
const state = {
    menuType: 1
}
```
组件里获取：
```js
this.$store.state.menuType
```
#### 5.1.2 设置/获取模块里state里的值

见项目里`src\store\module\user.js`

组件里获取：
```js
this.$store.state.user.userName // 无论命名空间是否开启都要加模块名
```

#### 5.1.3 利用vuex的辅助函数`mapSate`来取值

```html
<script>
export default {
    computed: {
        ...mapState({
          userName: state => state.user.userName // 获取模块里开启了命名空间的参数
        }),
        ...mapState([
            'menuType', // 获取全局state里的参数
            'info' // 获取模块里没有开启命名空间的参数
        ]),
    },
}
</script>
```

### 5.2 getter用法

类似于vue里的computed属性，写法见：`src\store\getter.js`

在组件里获取：
```js
this.$store.getters.menuType
```

写在模块里的getters获取：

见`src\store\module\info.js`

在组件里获取：
```js
this.$store.getters.getInfo
```

如果模块开启了命名空间：

```js
// src\store\module\user.js
export default {
    namespaced: true, // 开启命名空间
    state,
    getters,
    mutations,
    actions
}
```
此时获取模块里的值需要这样写：

```js
this.$store.getters['user/getUserName']
```

也可利用辅助函数`mapGetters`来获取值：

```js
<script>
export defaut {
computed: {
    ...mapGetters([
      'menuType',
      'getInfo' // 获取写在模块里没有开启命名空间的参数
    ]),
    ...mapGetters({
      getUserName: 'user/getUserName', // 获取写在模块里开启了命名空间的参数
    })
  },
}
</script>
```

### 5.3 mutation用法

以上讲解获取vuex里的值，如果想修改vuex里的值，就需要通过commit提交一个mutation来修改

```js
// src\store\mutations.js
const mutations = {
    SET_MENU_TYPE (state, params) {
        state.menuType = params
    }
}

export default mutations
```

然后在组件里调用这个mutation：

`src\views\module\product\apple.vue`

```html
<script>
  export default {
    data() {
      return {
        num: 1
      }
    },
    methods: {
      setMenuType() {
        // 调用全局mutation
        this.$store.commit('SET_MENU_TYPE', this.num++)
      },
      setInfo() {
        // 调用写在模块里的mutation
        this.$store.commit('SET_INFO', { name: '田耕纪-连蔓儿-田曦薇' })
      },
      setUserName() {
        // 调用开启了命名空间的模块里的mutation
        this.$store.commit('user/SET_USER_NAME', '卿卿日常-李薇-田曦薇')
      }
    }
  }
</script>
```

也可利用辅助函数`mapMutations`来设置值：

```html
<script>
  import { mapMutations } from 'vuex'
  export default {
    data() {
      return {
        num: 1
      }
    },
    methods: {
      ...mapMutations([
        'SET_MENU_TYPE', // 调用全局mutation
        'SET_INFO' // 调用写在模块里的mutation
      ]),
      ...mapMutations('user', [
            'SET_USER_NAME' // 调用开启了命名空间的模块里的mutation
        ]),
    setMenuType() {
      this.SET_MENU_TYPE(this.num++)
    },
    setInfo() {
      this.SET_INFO({ name: '田耕纪-连蔓儿-田曦薇' })
    },
    setUserName() {
      this.SET_USER_NAME('卿卿日常-李薇-田曦薇')
    }
    }
  }
</script>
```

### 5.4 action用法

调用mutation来修改vuex里的值，这个是同步操作，如果某个值需要异步操作才能修改，此时就需要调用action

例子在：`src\views\module\product\apple.vue`页面里

```html
<script>
  export default {
    data() {
      return {
        num: 1
      }
    },
    methods: {
      getMenuList() {
        this.$store.dispatch('updateMenuList') // 调用全局的dispatch
      },
      updateUserName() {
        this.$store.dispatch('user/upDateUserName') // 调用启用了命名空间里的dispatch
      },
      updateInfo() {
        this.$store.dispatch('upDateInfo') // 调用模块里的dispatch
      }
    }
  }
</script>
```

同样，vuex也提供了`mapActions`辅助函数来调用action

```html
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  export default {
    data() {
      return {
        num: 1
      }
    },
    methods: {
      ...mapActions([
        'updateMenuList',
        'upDateInfo'
      ]),
      ...mapActions('user', [
        'upDateUserName'
      ]),
      getMenuList() {
        // this.$store.dispatch('updateMenuList')
        this.updateMenuList()
      },
      updateUserName() {
        // this.$store.dispatch('user/upDateUserName')
        this.upDateUserName()
      },
      updateInfo() {
        // this.$store.dispatch('upDateInfo')
        this.upDateInfo()
      }
    }
  }
</script>
```

### 5.5 vuex插件

对于跨组件的传值，使用vuex很方便，但是当刷新浏览器的时候，写在state里的值又都会恢复到初始化状态，所以需要浏览器长期储存的值，会用`localStorage`或`sessionStorage`来存储，如果在项目里使用这两种，除了用vuex还用localStorage等，显得有些混乱

利用vuex里的插件概念实现持久化存储

具体例子见：`src\store\plugin\saveLocal.js`

`localStorage`和`sessionStorage`里面只能存字符串，所以如果需要存对象或者数组，需要通过`JSON.stringify`转换为字符串，获取的时候再通过`JSON.parse`转换回来

## 六、组件之间的传值方式

项目里所有的页面都是一个组件，它有相对独立的作用域，它们之间如果需要进行数据传递，就要符合一定的规则，比如父子组件传值，兄弟组件传值，隔代组件传值（它们之间隔了好几个组件），接下来我就讲解一下这些组件之间如何传值：

### 6.1 父组件给子组件传值（props）

例子见：`src\views\module\prop\father.vue`

### 6.2 子组件给父组件传值（$emit）

例子见：`src\views\module\prop\children.vue`

### 6.3 兄弟组件或隔代组件传值（$emit/$on）

这种方法通过一个空的Vue实例作为中央事件总线（事件中心），用它来触发事件和监听事件,巧妙而轻量地实现了任何组件间的通信，包括父子、兄弟、跨级。但是我们的项目比较大时，可以选择更好的状态管理vuex

例子见：`src\views\module\prop\brother2.vue`

### 6.4 $attrs/$listeners

形如：a引入b，b引入c，这样一个嵌套的关系组件引入，现在有一个需求，需要a组件把值直接传递给c组件，有几种解决方法呢？

1. vuex(大材小用)
2. a先通过props把值传递给b，b再通过props将值传递给c（容易出错）
3. 利用上面讲的事件总线$bus（多人合作开发时，代码维护性较低）

这里建议使用`$attrs/$listeners`

例子见：`src\views\module\prop\grandson.vue`

### 6.5 provide/inject

第四种方式在于a,b,c这三个组件，必须是层层嵌套的关系，通过在b组件里使用`$attrs/$listeners`，让a和c进行隔代通信

`provide/inject`，则更加灵活，它是vue2.2版本新增内容，不论是a,b,c这种嵌套关系，还是a,b,c,d,e...更深层的嵌套关系，a组件通过provide分享数据，b,c,d,e...都可以通过inject拿到a组件分享的数据

例子见：`src\views\module\prop\father.vue`

需要注意：provide 和 inject 绑定并不是可响应的，也就是说，`a组件`里修改一个值，后面的组件并不能拿到修改后的值，需要这样改造：

例子见：`src\views\module\prop\brother1.vue`

### 6.6 $parent/$children/$refs

使用这3种方式都会得到组件实例，然后就可以直接调用组件里的方法或者数据

例子见：`src\views\module\prop\father.vue`

## 七、封装axios

- 详情见[附录7：vue里封装axios的思路1](./附录7：vue里封装axios的思路1.md)
- 详情见[附录8：vue里封装axios的思路2](./附录8：vue里封装axios的思路2.md)

记录`qs`的用法，qs是axios按照的时候自带的，用法就是`qs.stringify`和`qs.parse`

```js
qs.parse('a=1&b=2&c=3') // {a: 1, b: 2, c: 3}
qs.stringify({ a: "1", b: "2", c: "3"}) // a=1&b=2&c=3
qs.stringify({ a: ['b', 'c', 'd'] }) // a[0]=b&a[1]=c&a[2]=d
qs.stringify({ a: ['b', 'c', 'd'] }, { indices: false }) // a=b&a=c&a=d
qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'indices' }) // a[0]=b&a[1]=c
qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'brackets' }) // a[]=b&a[]=c
qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'repeat' }) // a=b&a=c 
```

## 八、在vue里配置国际化

首先需要安装依赖`"vue-i18n": "^8.24.4"`

新建`src\i18n\index.js`

新建`src\store\module\i18n.js`异步加载放在服务端的国际化文件（由于本项目没有接入后端接口，国际化文件放在`src\i18n\lang`），在`App.vue`里触发方法`loadLanData`，之后在`main.js`里引入

项目里安装了`ElementUI`，在`src\assets\js\elementui\index.js`还需要配置i18n融合ElementUI国际化，之后用`langSwitch`方法动态切换国际化

## 九、在项目里引入ElementUI框架

安装依赖`element-ui": "^2.15.14`

新建`src\assets\js\elementui\index.js`，并在`main.js`里面引入

以上elementui就引入成功

## 十、手写一个导航菜单

这里我不利用任何外部UI组件来实现一个导航菜单，帮助学习vue的开发，只要可以手写一个菜单，其它的菜单照着这个思路，也是没有问题的

访问：http://localhost:8080/#/menu

新建[menu/index.vue](src\views\module\menu\index.vue)，在这个页面引入：[components/menu/index.vue](src\components\menu\index.vue)和[components/menu/menu-item.vue](src\components\menu\menu-item.vue)和[components/menu/re-submenu.vue](src\components\menu\re-submenu.vue)，导航菜单代码就在这两个文件里

## 十一、手写一个layout布局

导航菜单+layout布局就实现了一个管理平台常见的布局，借助UI框架比如IView和ElementUI都可实现，这里采用原生写法，方便理解vue的管理平台基本框架是如何搭建的

管理平台基本的布局有2种：

1. 左侧菜单，右侧内容
2. 顶部菜单，中间内容

`App.vue`是整个项目的根组件，所有页面，都包裹在`<div id="app"></div>`里面，不论我们配置怎样的路由：
```js
import {layout} from "_c/layout"; // layout布局
const routes = [
  {
    path: '/login', // 登录页
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/pingTerminal', // 终端详情
    component: resolve => require(['@/views/ping-query/terminal-detail.vue'], resolve),
  },
  {
    path: '',
    component: layout, // 这就是管理平台框架的关键（左侧菜单右侧内容）
    children: [
      {
        path: '/home', // 这里必须添加/
        component: () => import('@/views/module/home'),
      },
    ]
  },
  {
    path: '/task',
    component: layout, // 这就是管理平台框架的关键（左侧菜单右侧内容）
    redirect: '/task/overview',
    children: [
      {
        path: 'overview', // 这里可以不用加/
        component: resolve => require(['@/views/web-query/overview.vue'], resolve),
      }
    ]
  }
]
```
我们通过路由访问以下链接，它们的渲染步骤如下：

1. http://localhost:8081/#/login 直接进入根组件的`<router-view/>`
2. http://localhost:8081/#/pingTerminal 直接进入根组件里的`<router-view/>`
3. http://localhost:8081/#/home  先进入根组件里的`<router-view/>`，再进入layout组件里的`<router-view/>`
4. http://localhost:8081/#/task/overview 先进入根组件里的`<router-view/>`，再进入layout组件里的`<router-view/>`

接下来就是实现`layout`组件，新建[components/layout/index.vue](src\components\layout\index.vue)，将刚才新建的导航菜单引入，同时需要修改[router/index.js](src\router\index.js)

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/components/layout/index'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: layout,
    children: [
      {
        path: '',
        name: 'HomeView',
        component: HomeView
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: layout,
    children: [
      {
        path: '',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
      }
    ]
  }
]
```

## 十二、使用ElementUI实现layout布局

手动实现了layout布局，这里借助UI组件来实现layout布局，就会更加方便

新建基于element的导航菜单：[src\components\element-menu\a-menu.vue](src\components\element-menu\a-menu.vue)

新建基于element的layout布局：[src\components\element-layout\index.vue](src\components\element-layout\index.vue)

这里做了两个布局，一个左右布局[src\components\element-layout\components\layout-left.vue](src\components\element-layout\components\layout-left.vue)，一个上下布局[src\components\element-layout\components\layout-top.vue](src\components\element-layout\components\layout-top.vue)，用户可以随意切换

同时利用`elementUI`的`el-menu`组件，封装一个递归菜单[src\components\element-menu\a-menu.vue](src\components\element-menu\a-menu.vue)这个递归菜单的样式在[src\assets\css\element-ui.scss](src\assets\css\element-ui.scss)，定位：`.el-menu--horizontal>.el-submenu .el-submenu__title`即可查看菜单样式

## 十三、从接口获取返回的导航菜单

[附录5：vue项目配置路由的几种方式.md](附录5：vue项目配置路由的几种方式.md)
实际开发项目时，平台菜单不是写死的，而应该有一个`开发者管理`模块，里面有一个功能管理页面专门管理，见图片：![资料\图片\开发者管理-功能管理.png](资料\图片\开发者管理-功能管理.png)

本项目先利用mock数据来模拟下是如何通过接口动态获取菜单，以及如何配置

mock数据在[src\mock\module\menu.js](src\mock\module\menu.js)，模拟的接口在[src\mock\index.js](src\mock\index.js)，先调用[src\store\module\info.js](src\store\module\info.js)里`upDateInfo`获取当前用户信息，然后再调用[src\store\module\menu.js](src\store\module\menu.js)里的`loadMenu`调用接口获取菜单list，再递归处理成如下形式：

```js
[
  {
    path: '',
    name: '主体',
    component: () => import('@/components/element-layout/index.vue'),
    children: [
      {
        path: '/index',
        name: '首页',
        component: () => import(`@/views/module${'/index'}`),
        children: null
      },
      {
        path: '',
        name: '组网业务',
        component: () => import(`@/views/main/Layout`),
        children: [
          {
            path: '/business/manager',
            name: '业务管理',
            component: () => import(`@/views/module${'/business/manager'}`),
            children: null
          },
          {
            path: '/business/backup',
            name: '备用通道',
            component: () => import(`@/views/module${'/business/backup'}`),
            children: null
          }
        ]
      }
    ]
  }
]
```
再调用vue-router的`router.addRoute`添加到路由列表里，在[src\components\element-menu\a-menu.vue](src\components\element-menu\a-menu.vue)里直接循环遍历`getMenu`，导航菜单就显示出来了

这里还用到一个关键插件`better-scroll`，当顶部菜单过多时，顶部是放不下这么多菜单的，此时需要用户左右滚动鼠标滑轮，放菜单也跟着左右滑动，另外还需要左右箭头，用户点击后，菜单可以跟着左右滑动

**注意：**

由于多级菜单的存在，[src\components\element-menu\re-submenu.vue](src\components\element-menu\re-submenu.vue)采用了递归的写法，导致鼠标移入菜单，会报`Maximum call stack size exceeded`，此时需要在外层包裹一层div，就不会报错，但是这样会导致自带的样式不生效，形如：

```css
.el-menu--horizontal>.el-submenu .el-submenu__title
```

由于中间多了个div，css需要重写一遍，中间记得加div，具体样式见[src\assets\css\element-ui.scss](src\assets\css\element-ui.scss)

```css
.el-menu--horizontal>.el-submenu .el-submenu__title,
.el-menu--horizontal>.el-menu-item,
.el-menu--horizontal>.el-submenu .el-submenu__title i,
.el-menu--horizontal div>.el-submenu .el-submenu__title,
.el-menu--horizontal div>.el-menu-item,
.el-menu--horizontal div>.el-submenu .el-submenu__title i{
  background-color: transparent !important;
  font-size: 16px;
  @include font_color('menuFontColor');
}
```
这个问题搞得我头大，光找问题就找了3个小时，这是个坑

## 十四、利用`mock.js`模拟接口数据

`mock.js`在项目搭建的时候就已经安装

具体配置见：[src\mock\index.js](src\mock\index.js)

然后在`main.js`里引入即可，在组件里发起请求：
例如项目里[src\store\module\info.js](src\store\module\info.js)的`SystemApi.info()`和`SystemApi.menu()`这两个接口就是走的mock逻辑，具体用法可参考这连个写法，记得首先需要配置对应的api[src\api\SystemApi.js](src\api\SystemApi.js)
这个文件下也有示例：
[src\views\module\axios\index.vue](src\views\module\axios\index.vue)
这样如果mock匹配到的接口，就会被拦截，走mock逻辑，没有匹配到的正常发送请求到后台

## 十五、系统登录逻辑

先新建模拟数据[src\mock\module\info.js](src\mock\module\info.js)，接口地址在：[src\api\SystemApi.js](src\api\SystemApi.js)里配置`SystemApi.info()`，利用mock模拟返回数据[src\mock\index.js](src\mock\index.js)，在store里取调用：[src\store\module\info.js](src\store\module\info.js)

平台登录流程：先调用get接口：`http://192.168.55.117/services/authen/isAuthen`，只传递保存在localStorage里的token，后台拿到token，校验是否过期，没过期，直接调用`SystemApi.info()`；过期，跳转到登录页面，重新登录，调用get接口：`http://192.168.55.221/services/authen/login`，输入用户名和密码，校验通过，后台返回新的token，平台更新localStorage里的token，再调用`SystemApi.info()`，以后每个接口都要携带token信息


















