# 打包时对vue项目进行gzip压缩以及去掉console

## 一、借助`compression-webpack-plugin`对源码进行gzip压缩

目的是压缩js和css文件，压缩后的代码大小是压缩前的30%，能够减少首屏加载时间

**备注：服务器也需要进行gzip配置，不然浏览器访问的还是未压缩的js和css文件**

Nginx配置Gzip:

```
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    #tcp_nopush     on;
    #keepalive_timeout  0;
    keepalive_timeout  65;
    gzip_static on;
    server {
        listen       8462;
        server_name  localhost;
        location / {
            root   dist;
            index  index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```
其中`gzip_static on`这个属性是静态加载本地的gz文件

`package.json`里引入插件：

```json
  "devDependencies": {
    "compression-webpack-plugin": "^6.1.1",
  }
```

`vue.config.js`添加如下代码：

```js
'use strict'
const webpack = require('webpack')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const productionGzipExtensions = ['js', 'css']

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
    configureWebpack: {
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
    // 运行npm run build打包命令，process.env.NODE_ENV为生产环境才会执行此操作
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
      // 将js和css文件合并
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5,
        minChunkSize: 100
      })
    ] : [],
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: true, // 生产环境注释debugger
              pure_funcs: ['console.log'] // 生产环境移出console.log
            }
          }
        })
      ]
    }
  }
}
```

执行`npm run build`后，对js和css进行压缩，除了压缩后的`.js`文件和`.css`文件，还有对应的`.js.gz`文件和`.css.gz`文件

浏览器访问项目时，你就会发现从服务器返回的js和css文件，都是经过压缩的：

gzip压缩比率在5倍左右，Nginx配置了静态gz加载后，浏览器也返回的是gz文件，这样就会请求小文件而不会导致请求卡线程，并且保留了源文件，当请求不到gz文件，浏览器会自动去自动请求原始文件，这里静态加载gz文件主要是依托于下面的请求头：

![图片\请求gzip文件.png](图片\请求gzip文件.png)

以上是通过本地webpack配置生成对应的gz文件，浏览器请求`xx.js`文件时，服务器返回对应的`xxx.js.gz`文件，还有一种实现方式是，浏览器请求`xx.js`文件时，服务器对`xx.js`文件进行gzip压缩，然后再传给浏览器，此时Nginx的配置比较复杂些，如下图：

![图片\服务器进行gzip压缩.png](图片\服务器进行gzip压缩.png)

上图的配置，意思是首选开启gzip，设置缓冲区大小，压缩等级，需要压缩的文件等，此时请求资源时，效果图下图：

![图片\服务器进行gzip压缩时的请求配置.png](图片\服务器进行gzip压缩时的请求配置.png)

响应头中会携带gzip压缩配置，每次请求`xx.js`文件，服务器会进行实时压缩

这两种方案各有优点：

1. webpack本地打包，提前把所有的js和css打包成gz文件，不占用服务器性能，缺点是本地打出来的包比较大

2. 使用Nginx配置gzip，请求的时候，服务器去压缩js或css，需要耗服务区性能，但是本地打包出来的vue文件就比较小

## 借助`terser-webpack-plugin`去掉控制台日志

需要利用插件`terser-webpack-plugin`实现，这个是webpack自带的插件，不必再进行安装，直接引入即可，具体配置代码在上述例子里
