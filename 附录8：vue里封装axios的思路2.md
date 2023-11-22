# vue里封装axios的思路2

这种搭建方式比第一种更具有实际应用，具体创建步骤如下：

1. 新建[public\conf.js](public\conf.js)
2. 接着新建新建[src\config.js](src\config.js)
3. 然后修改`package.json`启动脚本
4. 在[vue.config.js](vue.config.js)修改跨域设置
5. 配置axios[src\service\axios.js](src\service\axios.js)
6. 然后对axios进行二次封装[src\service\http.js](src\service\http.js)
7. 将封装好的http请求，放到vue实例里[src\main.js](src\main.js)
8. 接着利用class封装各种api：[src\api\BaseApi.js](src\api\BaseApi.js)、[src\api\SystemApi.js](src\api\SystemApi.js)、[src\api\afs\AfsInfoApi.js](src\api\afs\AfsInfoApi.js)
9. 最后在页面里调用api：[src\views\module\axios\index.vue](src\views\module\axios\index.vue)







