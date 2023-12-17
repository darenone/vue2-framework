'use strict'
const { defineConfig } = require('@vue/cli-service')
// const config = require('./src/config.js')
/* 如果当前是生产环境production
如果项目部署到域名（www.baidu.com）根目录下，直接'/' : '/',
如果需要部署到（www.baidu.com/iview-admin）目录下，直接'/iview-admin/' : '/'
如果是开发环境，直接'/' : '/' */
const BASE_URL = process.env.NODE_ENV === 'production' ? '/iview-admin/' : '/'
/* 引入webpack */
const webpack = require('webpack')
/* 引入node的path模块 */
const path = require('path')
/* 压缩js webpack5自带的插件 */
const TerserPlugin = require('terser-webpack-plugin')
/* 对css和js进行gzip压缩 */
const CompressionPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
/* 对css和js进行gzip压缩 */
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')// webpack5中移除了nodejs核心模块的polyfill自动引入，所以需要手动引入
/* 自定义方法resolve */
const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  publicPath: './',
  // lintOnSave: false, // 关闭eslint检查
  transpileDependencies: true,
  runtimeCompiler: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // 用@代替src，在项目里你需要引入文件的时候，只需要@/api,@/config,@/mock...即可
      .set('_c', resolve('src/components')) // 用_c代替src/components,我们需要引入组件时，只需要_c/HelloWorld.vue即可
    // config.optimization.minimizer('js')
    //   .use(new TerserPlugin({
    //     terserOptions: {
    //       compress: {
    //         warnings: false,
    //         drop_console: true, // 传true就是干掉所有的console.*这些函数的调用.
    //         drop_debugger: true, // 干掉那些debugger;
    //         pure_funcs: ['console.log'] // 如果你要干掉特定的函数比如console.info ，又想删掉后保留其参数中的副作用，那用pure_funcs来处理
    //       }
    //     }
    //   }))
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
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 测试环境
        // target: config.baseUrl,
        changeOrigin: true
      },
      '/services': {
        target: 'http://192.168.55.221/services',
        ws: false, // 如果要代理 websockets，配置这个参数
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/services': ''
        }
      },
      '/oen/node': {
        target: 'http://192.168.3.154:10012',
        ws: false, // 如果要代理 websockets，配置这个参数
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/oen': ''
        }
      }
    },
    client: {
      overlay: false
    }
  },
  // 解决边缘css告警
  css: {
    extract: process.env.NODE_ENV === 'production' ? {
      ignoreOrder: true
    } : false,
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            require('postcss-pxtorem')({
              // 配置文档：https://www.npmjs.com/package/postcss-pxtorem
              rootValue: 80, // 像素 / 80，比如代码里设置的某元素高度为40px，40 / 80 = 0.5rem
              unitPrecision: 5, // 转换成rem后保留的小数点位数
              propList: ['font', 'font-size', 'height', 'line-height', 'top'], // 匹配CSS中的属性，* 代表启用所有属性
              exclude: /(node_module)/i, // 忽略一些文件，不进行转换，默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
              selectorBlackList: ['.steps-index', '.el-pagination', '.flange-port', '.icon-hold', '.zoom-tools', '.tool-item'], // 要忽略并保留为 px 的选择器
              mediaQuery: false, // （布尔值）允许在媒体查询中转换px
              minPixelValue: 10 // 设置要替换的最小像素值
            })
          ]
        }
      }
    }
  },
  configureWebpack: config => {
    const plugins = [
      new NodePolyfillPlugin()
    ]
    if (process.env.NODE_ENV === 'production') {
      const arr = [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'windows.jQuery': 'jquery'
        }),
        // new webpack.optimize.ModuleConcatenationPlugin()
        // 配置compression-webpack-plugin压缩
        new CompressionPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        }),
        new TerserPlugin({
          terserOptions: {
            compress: {
              warnings: false,
              drop_console: true, // 传true就是干掉所有的console.*这些函数的调用.
              drop_debugger: true, // 干掉那些debugger;
              pure_funcs: ['console.log'] // 如果你要干掉特定的函数比如console.info ，又想删掉后保留其参数中的副作用，那用pure_funcs来处理
            }
          }
        }),
        new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 5 }),
        new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 })
      ]
      plugins.push(...arr)
    }
    return {
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
      plugins: plugins
    }
  }
})
