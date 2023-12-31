# `vue.config.js`整体配置

配置跨域，打包时去掉`console.log`，生成`gzip`文件，合并js，合并css，编译es6，编译scss等

## 一、第一种配置

需要以下几个关键插件

1. terser-webpack-plugin（用来压缩js代码，webpack5自带了此插件，不用另外安装，在vue.config.js里面直接引入即可）
2. compression-webpack-plugin（对css和js进行gzip压缩，另外安装）
3. speed-measure-webpack-plugin（速度分析插件，分析打包耗时和各个插件的耗时，另外安装）
4. thread-loader（多进程打包，加快打包速度，另外安装）

### 1.1 `vue.config.js`整体配置

```js
'use strict'
const webpack = require('webpack')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

const productionGzipExtensions = ['js', 'css']
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  runtimeCompiler: true,
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
    // proxy: {
    //   '/services': {
    //     target: 'http://118.122.119.68:8081/services',
    //     ws: false, // 如果要代理 websockets，配置这个参数
    //     secure: false, // 如果是https接口，需要配置这个参数
    //     changeOrigin: true, // 是否跨域
    //     pathRewrite: {
    //       '^/services': ''
    //     }
    //   }
    // }
  },
  // 解决边缘css告警
  css: {
    extract: process.env.NODE_ENV === 'production' ? {
      ignoreOrder: true
    } : false
  },
  // vue.config.js
  chainWebpack: (config) => {
    config.optimization.minimizer('js')
      .use(new TerserPlugin({
        terserOptions: {
          compress: {
            warnings: false,
            drop_console: true, // 传true就是干掉所有的console.*这些函数的调用.
            drop_debugger: true, // 干掉那些debugger;
            pure_funcs: ['console.log'] // 如果你要干掉特定的函数比如console.info ，又想删掉后保留其参数中的副作用，那用pure_funcs来处理
          }
        }
      }))
  },
  configureWebpack: smp.wrap({
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    // 关闭 webpack 的性能提示
    performance: {
      hints: false
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['thread-loader']
        }
      ]
    },
    plugins: process.env.NODE_ENV === 'production' ? [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      }),
      //   new webpack.optimize.ModuleConcatenationPlugin()
      // 配置compression-webpack-plugin压缩
      new CompressionPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5,
        minChunkSize: 100
      })
    ] : []
  })
}
```

### 1.2 此时`package.json`整体配置

**注意**
1. 以下`node-sass`和`sass-loader`是在`webpack`构建阶段使用，并不是在发布阶段使用，需要装到`devDependencies`里面
2. 注意node版本，这里使用的是`node[v14.17.1]`，`node-sass[v4.14.1]`和`sass-loader[v7.3.1]`必须匹配，不然`npm install`的时候会报错

```json
{
  "name": "afs-iot",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vue-cli-service serve --port 80",
    "test": "vue-cli-service serve --port 80 --mode test",
    "build": "vue-cli-service build"
  },
  "dependencies": {
    "@riophae/vue-treeselect": "^0.4.0",
    "better-scroll": "^2.4.2",
    "cby.assist": "^1.2.5",
    "crypto-js": "^4.1.1",
    "echarts": "^4.9.0",
    "element-ui": "^2.12.0",
    "flv.js": "^1.6.2",
    "highcharts": "^10.1.0",
    "jszip": "^3.10.1",
    "mqtt": "^4.3.6",
    "ol": "^6.3.1",
    "vue": "^2.6.10",
    "vue-cropper": "^0.5.8",
    "vue-i18n": "^8.24.4",
    "vue-router": "^3.0.3",
    "vue-video-player": "^5.0.2",
    "vuex": "^3.1.1",
    "xlsx": "^0.17.5"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "^3.9.0",
    "@vue/cli-service": "^3.9.0",
    "babel-eslint": "^7.2.3",
    "compression-webpack-plugin": "^6.1.1",
    "eslint": "^6.8.0",
    "eslint-plugin-vue": "^6.2.2",
    "less": "^4.1.1",
    "less-loader": "^6.0.0",
    "node-sass": "^4.14.1",
    "sass-loader": "^7.3.1",
    "speed-measure-webpack-plugin": "^1.5.0",
    "thread-loader": "^3.0.4",
    "vue-template-compiler": "^2.6.10"
  },
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "parserOptions": {
      "parser": "babel-eslint"
    },
    "rules": {},
    "overrides": [
      {
        "files": [
          "**/__tests__/*.{j,t}s?(x)",
          "**/tests/unit/**/*.spec.{j,t}s?(x)"
        ],
        "env": {
          "jest": true
        }
      }
    ]
  },
  "main": ".eslintrc.js"
}
```

### 1.3 实际效果

没任何配置前打包出来的效果：

![资料\图片\没配置前打包出来的效果.png](资料\图片\没配置前打包出来的效果.png)

配置后打包出来的效果：

![资料\图片\配置后打包出来的效果.png](资料\图片\配置后打包出来的效果.png)

## 二、第二种配置

> 现在项目里的`vue.config.js`就是用的最新的配置

没有配置前的`package.json`如下，这个也是利用`vue ui`命令创建项目模板时的原始样子：

```json
{
  "name": "vue2-framework",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "set NODE_ENV=development&&vue-cli-service serve",
    "test": "set NODE_ENV=test&&vue-cli-service serve",
    "testBJ": "set NODE_ENV=testBJ&&vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "axios": "^1.6.0",
    "better-scroll": "^2.4.2",
    "core-js": "^3.8.3",
    "crypto-js": "^4.1.1",
    "echarts": "^5.4.3",
    "element-ui": "^2.15.14",
    "font-awesome": "^4.7.0",
    "vue": "^2.6.14",
    "vue-i18n": "^8.24.4",
    "vue-router": "^3.5.1",
    "vuex": "^3.6.2"
  },
  "devDependencies": {
    "@babel/core": "^7.12.16",
    "@babel/eslint-parser": "^7.12.16",
    "@vue/cli-plugin-babel": "~5.0.0",
    "@vue/cli-plugin-eslint": "~5.0.0",
    "@vue/cli-plugin-router": "~5.0.0",
    "@vue/cli-plugin-vuex": "~5.0.0",
    "@vue/cli-service": "~5.0.0",
    "babel-eslint": "^7.2.3",
    "eslint": "^7.32.0",
    "eslint-plugin-import": "^2.25.3",
    "eslint-plugin-node": "^11.1.0",
    "eslint-plugin-promise": "^5.1.0",
    "eslint-plugin-vue": "^8.0.3",
    "mockjs": "^1.1.0",
    "sass": "^1.32.7",
    "sass-loader": "^12.0.0",
    "vue-template-compiler": "^2.6.14"
  },
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "parserOptions": {
      "parser": "babel-eslint"
    },
    "rules": {},
    "overrides": [
      {
        "files": [
          "**/__tests__/*.{j,t}s?(x)",
          "**/tests/unit/**/*.spec.{j,t}s?(x)"
        ],
        "env": {
          "jest": true
        }
      }
    ]
  },
  "main": ".eslintrc.js"
}
```
`vue.config.js`原始的样子：

```js
const { defineConfig } = require('@vue/cli-service')
// const config = require('./src/config.js')
/* 如果当前是生产环境production
如果项目部署到域名（www.baidu.com）根目录下，直接'/' : '/',
如果需要部署到（www.baidu.com/iview-admin）目录下，直接'/iview-admin/' : '/'
如果是开发环境，直接'/' : '/' */
const BASE_URL = process.env.NODE_ENV === 'production' ? '/iview-admin/' : '/'
/* 引入node的path模块 */
const path = require('path')
/* 自定义方法resolve */
const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  // lintOnSave: false, // 关闭eslint检查
  transpileDependencies: true,
  runtimeCompiler: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // 用@代替src，在项目里你需要引入文件的时候，只需要@/api,@/config,@/mock...即可
      .set('_c', resolve('src/components')) // 用_c代替src/components,我们需要引入组件时，只需要_c/HelloWorld.vue即可
  },
  // 打包时不生成map文件，这样减少打包的体积，并且加快打包的速度
  productionSourceMap: false,
  // 跨域配置
  devServer: {
    /* 自动打开浏览器 */
    open: true,
    hot: true, // vue cli3.0 关闭热更新
    // liveReload: false, // webpack liveReload关闭
    /* 设置为0.0.0.0则所有的地址均能访问 */
    // host: '0.0.0.0',
    // port: 4000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 测试环境
        // target: config.baseUrl,
        changeOrigin: true
      }
    }
  }
})
```

这种配置比第一种配置多了一个`node-polyfill-webpack-plugin`插件，但是去掉`speed-measure-webpack-plugin`插件

1. `terser-webpack-plugin`
2. `compression-webpack-plugin`
3. `node-polyfill-webpack-plugin`（webpack5移除了nodejs核心模块polyfill自动引入，所以这里需要手动引入）
4. `thread-loader`（多进程打包，加快打包速度，如果项目打包迟迟不能成功，可以引入此插件来加快速度，另外安装）

```
npm install compression-webpack-plugin@6.1.1 -D
npm install node-polyfill-webpack-plugin@2.0.1 -D
npm install thread-loader@3.0.4 -D
```

完整的配置见文件：[vue.config.js](vue.config.js)，按照这样的配置，打包完后的效果如图：

![资料\图片\第二种配置方式打包后的结果.png](资料\图片\第二种配置方式打包后的结果.png)