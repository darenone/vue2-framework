import axios from 'axios'
import ElementUI from 'element-ui'
import config from '@/config'
// import router from '@/router'
// import i18n from '@/i18n'
// import addOperateLog from '@/service/log'
import qs from 'qs'

// 处理全局错误
const locat = window.location
const GLOBAL_ERROR_MAP = {
  '0': {
    msg: '数据加载异常，请刷新重试'
  },
  '-1': {
    msg: '程序异常',
    process: function() {
      window.location.href = locat.origin + locat.pathname + '#/login'
    }
  },
  '-2': {
    msg: '没有该地址',
    process: function() {
      window.location.href = locat.origin + locat.pathname + '#/login'
    }
  },
  '401': {
    msg: '你还没有登录，请登录后再操作',
    process: function() {
      window.location.href = locat.origin + locat.pathname + '#/notLogin'
    }
  },
  '404': {
    msg: '你访问的接口不存在',
    process: function() {
      window.location.href = locat.origin + locat.pathname + '#/notFound'
    }
  },
  '500': {
    msg: '服务器错误',
    process: function() {
      window.location.href = locat.origin + locat.pathname + '#/abnormal'
    }
  },
  '504': {
    msg: '服务器错误',
    process: function() {
      window.location.href = locat.origin + locat.pathname + '#/abnormal'
    }
  }
}

// 消息框去重
let latestTime = ''
function isShowPrompt() {
  let flag = false
  if (!latestTime || new Date() - latestTime > 2000) {
    latestTime = new Date()
    flag = true
  }
  return flag
}

// axios默认配置
if (config && config.baseUrl) {
  axios.defaults.baseURL = config.baseUrl
}
axios.defaults.timeout = 10 * 60 * 1000
axios.defaults.validateStatus = status => status >= 200 && status <= 500
axios.defaults.withCredentials = true

let loading = null
const resultKeepSet = new Set()
// 删除get请求里面的空值
const delEmptyValue = data => {
  Object.keys(data).forEach(i => {
    if (data[i] === '' || data[i] === undefined || data[i] === null) {
      delete data[i]
    }
  })
  return data
}

// HTTPrequest拦截
axios.interceptors.request.use(
  request => {
    if (request.method === 'get' && request.params) {
      request.params = delEmptyValue(request.params)
      request.paramsSerializer = params => {
        return qs.stringify(params, { indices: false })
      }
    }
    // 如果设置了要维持返回原样的结果，就缓存URL作为判断依据
    if (request.resultKeep) {
      const url = (request.baseURL || '') + request.url
      resultKeepSet.add(url)
    }
    request.headers.token = localStorage.getItem('token') || 'd21fe9b5fda442f5bfc575137cc3c83b'
    request.headers.sysid = config.sysId
    const lang = localStorage.getItem('lang')
    if (lang) {
      request.headers['Accept-Language'] = lang
    }
    if (loading !== false && request.data && !request.data.hideLoading) {
      loading = ElementUI.Loading.service({
        background: 'rgba(255, 255, 255, 0.1)'
      })
    }
    return request
  },
  error => Promise.reject(error)
)

const whiteList = [
  '/oen/recom/channelRecom'
]

// HTTPresponse拦截
axios.interceptors.response.use(
  response => {
    // console.log(response)
    if (loading) {
      loading.close()
      loading = null
    }
    // 如果HTTP响应状态为异常，就进行错误提示
    // const token = localStorage.getItem('token')
    if (Number(response.status) !== 200) {
      ElementUI.Message.closeAll()
      if (isShowPrompt()) {
        ElementUI.Message({
          showClose: true,
          type: 'error',
          message: GLOBAL_ERROR_MAP[response.status].msg
        })
      }
      // addOperateLog(response, false)
      GLOBAL_ERROR_MAP[response.status].process()
      return Promise.reject(new Error(GLOBAL_ERROR_MAP[response.status].msg))
    }
    const data = response.data
    if (!data || data.code === undefined) {
      if (response.config.params && response.config.params.operateResult || response.config.data && response.config.data.operateResult) {
        // addOperateLog(response, true)
        return data
      }
      // addOperateLog(response, false)
      return data
    }
    // 如果业务响应结果代码为异常，就进行错误提示
    const code = Number(data.code)
    if (code !== 0) {
      if (code === 2 || code === 3) {
        if (window.location.href.indexOf('/login') === -1) {
          ElementUI.Message({
            showClose: true,
            type: 'error',
            message: GLOBAL_ERROR_MAP['401'].msg
          })
          GLOBAL_ERROR_MAP['401'].process()
          // router.push('/login')
        }
        return false
      } else {
        if (whiteList.some(i => response.config.url.includes(i))) {
          return false
        }
        ElementUI.Message.closeAll()
        ElementUI.Message({
          showClose: true,
          type: 'error',
          message: '未知错误'
        })
      }
      // addOperateLog(response, false)
      return Promise.reject(new Error('未知错误'))
    }
    if (code === 0 && !data.data) {
      // addOperateLog(response, false)
      return null // 判断code =0 但data为false的情况
    }
    // 如果当前URL设置了要维持返回原样的结果，就直接返回
    const url = response.config.url
    if (resultKeepSet.has(url)) {
      resultKeepSet.delete(url)
      // addOperateLog(response, true)
      return data
    }
    // addOperateLog(response, true)
    return data.data
  },
  error => {
    // 比如无网络连接Network Error这种错误会走这里
    if (loading) {
      loading.close()
      loading = null
    }
    return Promise.reject(new Error(error))
  }
)

export default axios
