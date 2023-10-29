const { defineConfig } = require('@vue/cli-service')
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
    // open: true,
    // hot: true, // vue cli3.0 关闭热更新
    // liveReload: false, // webpack liveReload关闭
    /* 设置为0.0.0.0则所有的地址均能访问 */
    // host: '0.0.0.0',
    // port: 4000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 测试环境
        changeOrigin: true
      }
    }
  }
})
