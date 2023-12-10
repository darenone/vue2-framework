# vue里封装axios的思路1

axios并不是vue提供的api，而是一个独立的http库，可以发送get，post请求，进行请求拦截等，它就是对原生ajax的二次封装，这里我演示一下，在vue中如何使用axios

我的项目里没有预装axios，这里首先执行如下命令，安装一下
```
npm/cnpm install axios --save
```
axios是独立于vue的一个插件，除了vue中也可以用之外，在其它框架中也可以使用，具体axios如何封装，请看如下代码

新建`src/config.js`

```js
/** 环境变量 */
const env = process.env.NODE_ENV;
/** 基础配置 */
const expiredays = 1000 * 60 * 60 * 24; // token过期时间
let config = {
    expiredays,
    services: {
        userAccount: 'userAccount',
        task: 'task',
    },
};
/** 开发环境配置 */
let devConfig = {
    baseUrl: 'http://192.168.0.242',
};
/** 测试环境配置 */
let testConfig = {
    baseUrl: 'http://192.168.0.221',
};
/** 测试环境配置北京 */
let testConfigBJ = {
    baseUrl: 'http://192.168.15.101',
};
/** 生产环境配置 */
let prodConfig = {};

if (env == 'dev') {
    Object.assign(config, devConfig);
} else if (env == 'test') {
    Object.assign(config, testConfig);
} else if (env == 'testBJ') {
    Object.assign(config, testConfigBJ);
} else if (env == 'prod') {
    Object.assign(config, prodConfig);
}
module.exports = config;
```
修改`package.json`，更改启动命令
```json {5-11}
{
  "name": "vue2test",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "set NODE_ENV=dev&&vue-cli-service serve",
    "test": "set NODE_ENV=test&&vue-cli-service serve",
    "testBJ": "set NODE_ENV=testBJ&&vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "axios": "^0.21.4",
    "core-js": "^3.6.5",
    "qs": "^6.10.1",
    "vue": "^2.6.11",
    "vue-router": "^3.2.0",
    "vuex": "^3.4.0"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "~4.5.0",
    "@vue/cli-plugin-eslint": "~4.5.0",
    "@vue/cli-plugin-router": "~4.5.0",
    "@vue/cli-plugin-vuex": "~4.5.0",
    "@vue/cli-service": "~4.5.0",
    "@vue/eslint-config-standard": "^5.1.2",
    "babel-eslint": "^10.1.0",
    "eslint": "^6.7.2",
    "eslint-plugin-import": "^2.20.2",
    "eslint-plugin-node": "^11.1.0",
    "eslint-plugin-promise": "^4.2.1",
    "eslint-plugin-standard": "^4.0.0",
    "eslint-plugin-vue": "^6.2.2",
    "less": "^3.0.4",
    "less-loader": "^5.0.0",
    "mockjs": "^1.1.0",
    "vue-template-compiler": "^2.6.11"
  }
}
```
命令修改完毕，启动项目变成了
```
npm run dev
npm run test
npm run testBJ
npm run build
```
修改`vue.config.js`，配置跨域

```js {2,19-24}
const path = require('path');
const config = require('./src/config.js');

const resolve = dir => {
    return path.join(__dirname, dir);
}
module.exports = {
    lintOnSave: false,
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('_c', resolve('src/components'))
    },
    productionSourceMap: false,
    devServer: {
        open: true,
        hot: true,
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: config.baseUrl,
                changeOrigin: true
            }
        },
    }
}
```

新建`src/$http.js`：

```js
import qs from 'qs'
import axios from 'axios'
import { Message, LoadingBar } from 'view-design'

const SERVER_URL = '/api/'
const locat = window.location

// 处理全局错误
const GLOBAL_ERROR_MAP = {
    '0': {
        msg: "数据加载异常，请刷新重试"
    },
    '-1': {
        msg: "程序异常",
        process: function () {
            window.location.href = locat.origin + locat.pathname + '#/login'
        }
    },
    '-2': {
        msg: "没有该地址",
        process: function () {
            window.location.href = locat.origin + locat.pathname + '#/login'
        }
    },
    '401': {
        msg: '你还没有登录，请登录后再操作',
        process: function () {
            window.location.href = locat.origin + locat.pathname + '#/notLogin'
        }
    },
    '404': {
        msg: '你访问的接口不存在',
        process: function () {
            window.location.href = locat.origin + locat.pathname + '#/notFound'
        }
    },
    '500': {
        msg: '服务器错误',
        process: function () {
            window.location.href = locat.origin + locat.pathname + '#/abnormal'
        }
    },
    '504': {
        msg: '服务器错误',
        process: function () {
            window.location.href = locat.origin + locat.pathname + '#/abnormal'
        }
    }
}
// 消息框去重
let latestTime = '';
function isShowPrompt () {
    let flag = false;
    if (!latestTime || new Date() - latestTime > 2000) {
        latestTime = new Date();
        flag = true;
    }
    return flag;
}
// 请求成功
function oSuccess(resp, resolve, reject) {
    // 具体里面如何处理，要根据实际的情况来做，但是思路是一样的
    if (resp.data.status == 1) {
        resolve(resp.data)
    } else {
        let errorProcess = GLOBAL_ERROR_MAP[resp.data.status];
        if(errorProcess) {
            if (isShowPrompt()) {
                if (resp.data.msg) {
                    Message.error(resp.data.msg);
                } else {
                    Message.error('无返回数据')
                }
            }
            reject(resp.data.msg)
            errorProcess.process()
        } else {
            reject(resp.data)
        }
    }
}

// 请求失败
function oFail(error) {
    // 具体里面如何处理，要根据实际的情况来做，但是思路是一样的
    if (error.response) {
        let code = error.response.status;
        let errorProcess = GLOBAL_ERROR_MAP[code];
        errorProcess && errorProcess.process();
    }
}

// 封装axios
axios.defaults.headers.common['token'] = '2c357265966f4901a64cda046c4301f2'; // 请求头添加token
const $http = {
    // post请求，参数为字符串
    post: function (url, params) {
        return new Promise(function(resolve, reject) {
            axios.post(SERVER_URL + url, qs.stringify(params || {})).then(function(resp) {
                oSuccess(resp, resolve, reject)
            }).catch(function(error) {
                oFail(error)
            });
        });
    },
    // post请求，
    postJson: function(url, params) {
        let header = {
            'Content-Type': "application/json",
        }
        return new Promise(function(resolve,reject) {
            axios.post(SERVER_URL + url, params || {}, {headers: header}).then(function(resp) {
                oSuccess(resp, resolve, reject)
            }).catch(function(error) {
                oFail(error)
            });
        });
    },
    // 导出报表
    postJsonBlob: function(url, params) {
        let header = {
            'Content-Type': "application/json",
            'type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
        return new Promise(function(resolve, reject) {
            axios.post(SERVER_URL + url, params || {}, {headers: header, responseType: 'blob'}).then(function(resp) {
                oSuccess(resp, resolve, reject)
            }).catch(function(error) {
                oFail(error)
            });
        });
    },
    get: function(url, params) {
        return new Promise(function(resolve, reject) {
            axios.get(SERVER_URL + url, qs.stringify(params || {})).then(function(resp) {
                oSuccess(resp, resolve, reject);
            }).catch(function(error) {
                oFail(error)
            });
		});
    },
    postForm: function(url, params) {
        let header = {
            'Content-Type': 'multipart/form-data'
        }
        return new Promise(function(resolve, reject) {
            axios.post(SERVER_URL + url, params || {}, {headers: header}).then(function(resp) {
                oSuccess(resp, resolve, reject);
            }).catch(function(error) {
                oFail(error)
            });
        });
    }
}
function install(Vue, options) {
    Vue.prototype.$http = $http;
}
export default install;
```

在`main.js`里引入`$http.js`

```js {6,10}
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Bus from './bus/index' // 引入总线
import $http from './$http'

Vue.config.productionTip = false
Vue.prototype.$bus = Bus // 使用总线
Vue.use($http);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```
然后新建`api/account.js`
```js
import Vue from 'vue';
let vm = new Vue();
const config = require('../config.js');

// 获基本信息接口
export function accountInfo(params) {
    return vm.$http.post(`${config.services.userAccount}/accountInfo`, params);
}
```
新建`src/task.js`
```js
import Vue from 'vue';
let vm = new Vue();
const config = require('../config.js');

// 添加拨测任务接口
export function add(params) {
    return vm.$http.postJson(`${config.services.task}/add`, params);
}
```
最后在具体的组件里调用这两个接口，这两个接口，后端给我们的真实url是这样的：
1. http://192.168.0.242:80/api/userAccount/accountInfo
2. http://192.168.0.242:80/api/task/add
```vue
<script>
import {accountInfo} from '@/api/account'
import {add} from '@/api/add'
export default {
    name: 'Home',
    methods: {
        async accountInfo (params) {
            const {msg, code, data, status} = await accountInfo(params); // 也可以直接返回data，把msg,code,status在$http.js里过滤掉
        },
        async add (params) {
            const {msg, code, data, status} = await add(params);
        }
    },
}
</script>
```
另外axios有请求拦截`interceptors.request`和响应拦截`interceptors.response`，在项目里可以用来配置公共的请求头，并且对请求进行拦截，判断每个接口是否有相应的权限，可以根据项目实际的需求在`$http.js`里配置

## 利用es6封装：`src/$http.js`

这里使用es6的`calss`来创建一个类，并以类的形式封装`axios`，创建`lib/axios.js`文件

```js
// axios.js
import axios from 'axios';
import { Spin } from 'iview';

const SERVER_URL = '/api/';
// 定义一个类，类名是HttpRequest
class HttpRequest {
    // 每个类必须的方法
    constructor (baseUrl = SERVER_URL) {
        this.baseUrl = baseUrl;
        this.queue = {}; // 请求队列
    }
    getInsideConfig () {
        let config = {
            baaseUrl: this.baseUrl,
            headers: {
                'Content-Type': "application/json",
            }
        };
        return config;
    }
    interceptors (instance, url) {
        // 请求拦截
        instance.interceptors.request.use(config => {
            // 在请求的之前做一个拦截处理
            // ...
            if (!Object.keys(this.queue).length) Spin.show();
            this.queue[url] = true;
            return config;
        }, error => {
            return Promise.reject(error);
        })
        // 响应拦截
        instance.interceptors.response.use(res => {
            delete this.queue[url];
            Spin.hide();
            // 后端返回数据格式 {code: 0, message: '', data: {}}
            if (res.data && !res.data.code) {
                return res.data.data;
            }
        }, error => {
            delete this.queue[url];
            Spin.hide();
            return Promise.reject(error);
        })
    }
    request (options) {
        const instance = axios.create(); // 创建axios实例
        options = Object.assign(this.getInsideConfig, options);
        options.url = `${this.baseUrl}${options.url}`;
        this.interceptors(instance, options.url); // 调用请求拦截器
        return instance(options);
    }
}
export default HttpRequest;
```
思路解析：
1. `getInsideConfig`是内部配置，`options = Object.assign(this.getInsideConfig, options)`内部配置和传入的配置组合成新的配置，传入到`instance(options)`
2. `this.queue`记录有哪些请求，类似于请求队列，`if (!Object.keys(this.queue).length) Spin.show()`如果请求队列还有数据，loading就不出现，`this.queue[url] = true`就是新增请求队列，`delete this.queue[url]`请求完毕，在响应阶段就把请求完毕的url从队列里删除
3. 在类`HttpRequest`里面，除了`constructor`是自带的外，`getInsideConfig`，`interceptors`，`request`都是自己创建的方法

在`api/route.js`里面调用封装好的`axios`实例：
```js
import HttpRequest from '@/lib/axios.js';

const config = require('../config.js');
const axios = new HttpRequest();

export function routeList(params) {
    return axios.request({
        url: `${config.services.route}/route/page?${qs.stringify(params || {})}`,
        method: 'get',
    })
}
```
在组件里调用这个接口：
```js
import {routeList} from '@/api/route';
export default {
    methods: {
        async getRouteList (params) {
            try {
                const {total, list} = await routeList(params);
                this.tableData1 = [...list];
            } catch (error) {
                console.log(error);
            }
        }
    }
}
```




