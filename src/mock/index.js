import Mock from 'mockjs'
import qs from 'qs'

// http://192.168.55.221/services/afs/afsInfo/find?deviceId=2023091802&deviceName=afs
Mock.mock(/\/afs\/afsInfo\/find/, 'get', options => {
  console.log(qs.parse(options.url))
  return {
    code: 0,
    data: {
      afsId: '2023091802'
    },
    exception: null,
    message: '请求成功！'
  }
})
// http://192.168.55.221/services/afs/afsInfo/deviceOnlineStatus
Mock.mock(/\/afs\/afsInfo\/deviceOnlineStatus/, 'post', options => {
  console.log(JSON.parse(options.body))
  return {
    code: 0,
    data: {
      online: 4,
      offline: 8
    },
    exception: null,
    message: '请求成功！'
  }
})

Mock.setup({
  timeout: '100-600'
}) // 配置Ajax请求的时间

export default Mock
