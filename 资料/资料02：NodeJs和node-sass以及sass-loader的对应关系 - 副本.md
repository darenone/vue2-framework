# `node`与`node-sass`和`sass-loader`对应关系

less、sass、scss都是css预处理语言，sass 3.0之前的版本后缀是`.sass`，版本3.0之后的后缀是`.scss`,在开发阶段需要引入`node-sass`来编译scss，打包时需要`sass-loader`将scss转为css使用

在实际开发中，经常会因为`node`和`node-sass`版本不对应导致报错，所以在使用时要安装对应版本，常见的版本对应如下：

## 1 - node和node-sass版本对应
```
NodeJS	  Supported node-sass   	Node Module
Node 17   	7.0+	                  102
Node 16   	6.0+	                  93
Node 15   	5.0+, <7.0	            88
Node 14   	4.14+	                  83
Node 13   	4.13+, <5.0	            79
Node 12    	4.12+	                  72
Node 11   	4.10+, <5.0	            67
Node 10	    4.9+, <6.0	            64
Node 8	    4.5.3+, <5.0	          57
Node <8	    <5.0	                  <57
```

## 2 - `node-sass`和`sass-loader`部分版本对应
```
node-sass 4.3.0     sass-loader 4.1.1
node-sass 4.7.2     sass-loader 7.0.3
node-sass 4.7.2     sass-loader 7.3.1
node-sass 4.14.1    sass-loader 7.3.1
node-sass 6.0.1     sass-loader 10.0.1
```
## 3 - 我使用的`node-sass`版本

我项目使用的`node`是14.17.1，对应安装的`sass-loader`是7.3.1，`node-sass`是4.14.1

`package.json`

```
{
  "name": "test-manager",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vue-cli-service serve --port 80",
    "test": "vue-cli-service serve --port 80 --mode test",
    "build": "vue-cli-service build"
  },
  "dependencies": {
    "@jiaminghi/data-view": "^2.9.4",
    "@riophae/vue-treeselect": "^0.4.0",
    "babel-loader": "^8.2.5",
    "better-scroll": "^2.4.2",
    "cby.assist": "^1.2.5",
    "crypto-js": "^4.1.1",
    "echarts": "^4.9.0",
    "element-ui": "^2.15.6",
    "highcharts": "^10.1.0",
    "jsplumb": "^2.15.6",
    "mqtt": "^4.3.6",
    "ol": "^6.3.1",
    "three": "^0.144.0",
    "v-charts": "^1.17.9",
    "vis": "^4.21.0-EOL",
    "vue": "^2.6.10",
    "vue-cropper": "^0.5.8",
    "vue-i18n": "^8.24.4",
    "vue-router": "^3.0.3",
    "vuex": "^3.1.1",
    "xlsx": "^0.17.0"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "^3.9.0",
    "@vue/cli-service": "^3.9.0",
    "babel-eslint": "^7.2.3",
    "compression-webpack-plugin": "^6.1.1",
    "eslint": "^6.8.0",
    "eslint-plugin-vue": "^6.2.2",
    "vue-template-compiler": "^2.6.10",
    "sass-loader": "^7.3.1",
    "node-sass": "^4.14.1"
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

`node-sass`和`sass-loader`是在webpack构建阶段使用，并不是在发布阶段使用，所以要装到`devDependencies`里面，装在`dependencies`里面的库最终会打包成一个js文件（如果采用异步加载，会生成多个js文件），比如我们的代码中并没有用到`node-sass`，但是将`node-sass`写到`dependencies`中，这样会导致我们构建出来的js文件变大，从而导致访问速度变慢

如果你本地使用的node版本很高，比如`node[v18.12.1]`，即使按照上面说的装了对应高版本的`node-sass`和`sass-loader`，在启动项目时可能也会报错，要么`npm install`安装依赖报错，要么`npm run dev`启动项目报错，如果解决不了，这里建议使用`sass`插件替换掉`node-sass`，最终解决报错问题，具体操作如下：

## 4 - 使用`sass`代替`node-sass`

我本地装了`node[v18.12.1]`，需要把上面安装的`sass-loader`和`node-sass`从`package.json`里删除，然后将`"sass": "^1.57.1"`和`"sass-loader": "^13.2.0"`复制到你的`package.json`的`devDependencies`里面，并且删除`node_modules`文件夹和删除`package-lock.json`文件，并且需要把`"@vue/cli-plugin-babel": "~5.0.0"`和`"@vue/cli-service": "~5.0.0"`这两个插件升级到我说的这个版本（否则也有可能报错），重新执行`npm install`安装依赖

具体配置如下：
```
  "devDependencies": {
    "@vue/cli-plugin-babel": "~5.0.0",
    "@vue/cli-service": "~5.0.0",
    "babel-eslint": "^7.2.3",
    "compression-webpack-plugin": "^6.1.1",
    "eslint": "^6.8.0",
    "eslint-plugin-vue": "^6.2.2",
    "node-polyfill-webpack-plugin": "^2.0.1",
    "sass": "^1.57.1",
    "sass-loader": "^13.2.0",
    "vue-loader": "^17.0.1",
    "vue-template-compiler": "^2.7.14"
  }
```

`package-lock.json`一定要删除，因为疏忽我只删除了`node_modules`，保留了`package-lock.json`，我把node切换到`node[v14.17.1]`，执行npm install安装依赖，然后npm run dev 竟然可以正常运行，按道理此时安装的sass-loader已经不兼容低版本的node了，应该会报错才对，这是为什么呢？就是这个package-lock.json文件在搞怪，所以一定要删除`package-lock.json`，为了验证是否是这个文件在搞鬼，你可以把它删除了，然后再用低版本node[v14.17.1]，运行`npm install`然后再运行`npm run dev`就会复现上述问题

安装好以后，就可以正常启动项目了

此时，如果你的项目里，css样式采用了如下写法，不然新安装的sass和sass-loader对此写法不兼容：

```
<style scoped>
.map >>> .ol-measure:before {
  border-top: 6px solid #409eff;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  content: "";
  position: absolute;
  bottom: -6px;
  margin-left: -7px;
  left: 50%;
}
</style>
```

你需要改成如下写法：

```
<style scoped>
.map :deep(.ol-measure:before) {
  border-top: 6px solid #409eff;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  content: "";
  position: absolute;
  bottom: -6px;
  margin-left: -7px;
  left: 50%;
}
</style>
```

5 - 升级`cli-plugin-babel`和`cli-service`

刚才说了这两个插件也要一并升级，，不然，你按照上面步骤，引入了sass和sass-loader，安装完依赖，执行npm run dev，就会报如下错误，错误提示可能如下：

```
TyperError: config.optimization.minimizer(...).use is not a function
```

此时就要检查你的这两个插件的版本`cli-plugin-babel`和`cli-service`

把这两个插件设置成如下版本：

```
  "devDependencies": {
    "@vue/cli-plugin-babel": "~5.0.0",
    "@vue/cli-service": "~5.0.0",
    "babel-eslint": "^7.2.3",
    "compression-webpack-plugin": "^6.1.1",
    "eslint": "^6.8.0",
    "eslint-plugin-vue": "^6.2.2",
    "less": "^4.1.1",
    "less-loader": "^6.0.0",
    "node-polyfill-webpack-plugin": "^2.0.1",
    "sass": "^1.57.1",
    "sass-loader": "^13.2.0",
    "thread-loader": "^3.0.4",
    "vue-template-compiler": "^2.6.10"
  },
```

删除项目根目录的`node-modules`和`package-lock`文件，重新执行`npm install`再运行`npm run dev`项目即可运行成功！