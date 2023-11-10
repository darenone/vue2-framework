# vue里封装axios的思路2

这种搭建方式比第一种更具有实际应用，具体创建步骤如下：

新建`public\conf.js`，接着新建`src\config.js`，然后修改`package.json`启动脚本

在`vue.config.js`修改跨域设置，新建`src\service\axios.js`，然后对axios进行二次封装`src\service\http.js`

将封装好的http请求，放到vue实例里`src\main.js`

接下来对api进行管理，利用clas类创建`src\api\BaseApi.js`和`src\api\SystemApi.js`，接着使用继承创建各个模块的api，例如：`src\api\afs\AfsInfoApi.js`

最后在页面里调用api:`src\views\module\axios\index.vue`







