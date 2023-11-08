import qs from 'qs'
import axios from './axios'

// const SERVER_URL = '/api/'
const SERVER_URL = ''

const $http = {
  // post请求，参数为字符串
  post: function(url, params) {
    return new Promise(function(resolve, reject) {
      axios.post(SERVER_URL + url, qs.stringify(params || {})).then(function(resp) {
        resolve(resp)
      }).catch(function(error) {
        reject(error)
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
        resolve(resp)
      }).catch(function(error) {
        reject(error)
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
        resolve(resp)
      }).catch(function(error) {
        reject(error)
      })
    })
  },
  get: function(url, params = {}) {
    console.log(url, qs.stringify(params))
    return new Promise(function(resolve, reject) {
      // axios.get(`${SERVER_URL + url}?${qs.stringify(params)}`).then(function(resp) {
      axios.get(SERVER_URL + url, { params: params }).then(function(resp) {
        resolve(resp)
      }).catch(function(error) {
        reject(error)
      })
    })
  },
  postForm: function(url, params) {
    const header = {
      'Content-Type': 'multipart/form-data'
    }
    return new Promise(function(resolve, reject) {
      axios.post(SERVER_URL + url, params || {}, { headers: header }).then(function(resp) {
        resolve(resp)
      }).catch(function(error) {
        reject(error)
      })
    })
  }
}
function install(Vue, options) {
  Vue.prototype.$http = $http
}
export default install
