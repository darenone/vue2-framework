import qs from 'qs'
import axios from './axios'
// import { Message, LoadingBar } from 'view-design'

// const SERVER_URL = '/api/'
const SERVER_URL = ''
const locat = window.location

// 处理全局错误
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
// 请求成功
function oSuccess(resp, resolve, reject) {
  // 具体里面如何处理，要根据实际的情况来做，但是思路是一样的
  if (resp.data.status === 1) {
    resolve(resp.data)
  } else {
    const errorProcess = GLOBAL_ERROR_MAP[resp.data.status]
    if (errorProcess) {
      if (isShowPrompt()) {
        if (resp.data.msg) {
          // Message.error(resp.data.msg);
        } else {
          // Message.error('无返回数据')
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
    const code = error.response.status
    const errorProcess = GLOBAL_ERROR_MAP[code]
    errorProcess && errorProcess.process()
  }
}

// 封装axios
axios.defaults.headers.common['token'] = 'b8eb3322337c4522a43fdf21badc25f5' // 请求头添加token
const $http = {
  // post请求，参数为字符串
  post: function(url, params) {
    return new Promise(function(resolve, reject) {
      axios.post(SERVER_URL + url, qs.stringify(params || {})).then(function(resp) {
        oSuccess(resp, resolve, reject)
      }).catch(function(error) {
        oFail(error)
      })
    })
  },
  // post请求，
  postJson: function(url, params) {
    const header = {
      'Content-Type': 'application/json'
    }
    return new Promise(function(resolve, reject) {
      axios.post(SERVER_URL + url, params || {}, { headers: header }).then(function(resp) {
        oSuccess(resp, resolve, reject)
      }).catch(function(error) {
        oFail(error)
      })
    })
  },
  // 导出报表
  postJsonBlob: function(url, params) {
    const header = {
      'Content-Type': 'application/json',
      'type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }
    return new Promise(function(resolve, reject) {
      axios.post(SERVER_URL + url, params || {}, { headers: header, responseType: 'blob' }).then(function(resp) {
        oSuccess(resp, resolve, reject)
      }).catch(function(error) {
        oFail(error)
      })
    })
  },
  get: function(url, params) {
    console.log(url, qs.stringify(params))
    return new Promise(function(resolve, reject) {
      axios.get(SERVER_URL + url, qs.stringify(params || {})).then(function(resp) {
        oSuccess(resp, resolve, reject)
      }).catch(function(error) {
        oFail(error)
      })
    })
  },
  postForm: function(url, params) {
    const header = {
      'Content-Type': 'multipart/form-data'
    }
    return new Promise(function(resolve, reject) {
      axios.post(SERVER_URL + url, params || {}, { headers: header }).then(function(resp) {
        oSuccess(resp, resolve, reject)
      }).catch(function(error) {
        oFail(error)
      })
    })
  }
}
function install(Vue, options) {
  Vue.prototype.$http = $http
}
export default install
