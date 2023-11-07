import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Bus from './bus/index' // 引入总线
import $http from './service/http'
import '@/assets/js/elementui'

Vue.config.productionTip = false
Vue.prototype.$bus = Bus // 使用总线
Vue.use($http)

const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default vue
