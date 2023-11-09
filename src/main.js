import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Bus from './bus/index' // 引入总线
import $http from './service/http'
import config from '@/config'
import i18n from '@/i18n'
import '@/assets/js/elementui'

Vue.config.productionTip = false
Vue.prototype.$bus = Bus // 使用总线
Vue.prototype.$config = config
Vue.use($http)

const vue = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

export default vue
