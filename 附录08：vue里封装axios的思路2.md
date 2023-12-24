# vue里封装axios的思路2

## 一、封装思路

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

## 二、`get/post/delete/put`请求

1. get请求

常见的几种参数携带方式：

由于在[src\service\axios.js](src\service\axios.js)配置了如下代码：

```js
request.paramsSerializer = params => {
  return qs.stringify(params, { indices: false })
}
```

get请求的参数就会变成如下形式，例如：

```js
// 获取设备状态
static getDeviceStatus(params) {
  return axios.get(`${this.basePath()}/getDeviceStatus`, { params })
}
// 转换后
axios.get('接口地址', {
  params: {
    id: 12,//请求参数
  },
}).then(
  (res) => {
    //执行成功后代码处理
  }
)
// get请求传递对象时：

cont data = {
  page: 1,
  size: 20,
  keyword: '20231008093244093870857'
}
/*
http://192.168.55.117/services/afs/cluster/page?page=1&size=20&keyword=20231008093244093870857
*/ 

// get请求传递数组时：

const data = {
  ids: [1, 2, 3, 4, 5]
}
/*
http://192.168.55.117/services/afs/cluster/page?id=1&id=2&id=3&id=4&id=5
*/

// get请求传递对象时：

const data = {
  ids: '1,2,3,4,5'
}
/*
http://192.168.55.117/services/afs/cluster/page?ids=1,2,3,4,5
*/
```

不同的参数序列化配置就会有不同的结果：

```js
qs.stringify({ a: [1, 2, 3, 4, 5] }) // a[0]=1&a[1]=2&a[2]=3&a[3]=4&a[4]=5

qs.stringify({ a: [1, 2, 3, 4, 5] }, { indices: false }) // a=1&a=2&a=3&a=4&a=5

qs.stringify({ a: [1, 2] }, { arrayFormat: 'indices' }) // a[0]=1&a[1]=2

qs.stringify({ a: [1, 2] }, { arrayFormat: 'brackets' }) // a[]=1&a[]=2


qs.stringify({ a: [1, 2] }, { arrayFormat: 'repeat' }) // a=1&a=2

qs.stringify({ a: [1, 2, 3, 4, 5] }, { arrayFormat: 'comma' }) // a=1,2,3,4,5
```

get请求也可以直接把参数拼在请求路径里，例如：

```js
// 这种方式不建议使用，参数直接暴露在路径里，不安全
// http://192.168.66.117/services/pem/lockRecord/getLocks/123
static getLocks(id) {
  return axios.get(`${this.basePath()}/getLocks/${id}`)
}

```


2. post请求

post请求既可以通过body传参，也可以通过url传参

```js
// 通过body传参时
// http://192.168.66.117/services/afs/deviceCtrl/cmdCtrl
static cmdCtrl(data) {
  return axios.post(`${this.basePath()}/cmdCtrl`, data)
}
// 转换后
axios.post('接口地址', data).then(
  (res) => {
    //执行成功后代码处理
  }
)
// 页面调用
DeviceCtrlApi.cmdCtrl({
  deviceId： '2022101012'
})

// 既通过body又通过url传参时
static batchUpdate(params, data = null) {
  return axios.post(`${this.basePath()}/batchUpdate`, params, { params: data })
}
// 页面调用
cableFiberApi.batchUpdate(requestData, { cableName: this.rowData.cableName }).then((res) => {

})
```

post也可以直接传递一个数组，这种数据格式后端也可以接收到：

```js
const list = [
  {
    "id": 3853,
    "portName": "A-01",
    "portId": "01HB8HB5SGP0FP4HH3AEN9BK59"
  },
  {
    "id": 3854,
    "portName": "A-02",
    "portId": "01HB8HB5SG39X29568A56CD4E5"
  },
  {
    "id": 3856,
    "portName": "A-04",
    "portId": "01HB8HB5SGKV28Y574XME2EHW8"
  }
]
static changeName(data, params) {
  return axios.post(`${this.basePath()}/changeName`, data, { params })
}

ClusterApi.changeName(list, { deviceName: this.params.deviceName }).then(res => {

})

```

批量请求的写法：

```js
// 批量写法1：
static batchConfirm(data) {
  const allReq = []
  data.forEach(item => {
    allReq.push(axios.post(`${this.basePath()}/confirm`, item))
  })
  return axios.all(allReq)
  // return axios.post(`${this.basePath()}/confirm`, data);
}
// 批量写法2：
const promissArr = paramsList.map(i => {
  return CableGeoApi.save(i)
})
Promise.all(promissArr).then(async res => {
  if (res.every(i => i)) {}
})
```
put的post类似，delete和get类似，这里就不做具体举例






