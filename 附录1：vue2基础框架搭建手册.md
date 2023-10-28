# vue2基础框架搭建手册

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

## 二、利用vscode实现代码自动格式化

要想让vscode编辑器，在保存代码时自动格式化代码，你项目里首先需要安装`babel-eslint`，同时需要重新配置`.eslintrc.js`文件，vscode还需要安装`vetur`和`eslint`拓展插件，同时需要设置`settings.json`文件（见附录3）

需要先安装开发依赖`babel-eslint`：

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

具体配置见`src/views/prodct`，路由配置见`src/router/index.js`里的`/product`，嵌套路由的要诀：发现index.vue和ele-product.vue页面都有`<router-view/>`这个标签，因为和App.vue页面一样，它们都是父页面，App.vue是根页面，是项目中所有页面的父页面，而index.vue是ele-product.vue页面的父页面，ele-product.vue是phone.vue和computer.vue的父页面，只要这个页面是父页面就需要添加`<router-view/>`这个标签
