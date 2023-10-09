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

## 二、改造eslintrc.js

需要先安装开发依赖`babel-eslint`：

```
npm install babel-eslint@7.2.3 --save-dev
```


