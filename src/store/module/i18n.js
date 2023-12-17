// import I18nApi from '@/api/basebiz/I18nApi'
import i18n from '@/i18n'
// import store from '..'
export default {
  state: {
    downloaded: false,
    lanData: {},
    locale: 'zh-CN',
    loading: true
  },
  mutations: {
    SET_LANDATA(state, params) {
      state.downloaded = true
      state.lanData = params
      state.loading = false
    },
    SETLOCALE(state, params) {
      console.log(params)
      console.log(state)
      state.locale = params
    }
  },
  getters: {
    homeLoading: state => state.loading,
    getLocale: state => state.locale
  },
  actions: {
    loadLanData({ commit }) {
      const modulesFiles = require.context('@/i18n/lang', true, /\.js$/)
      const modules = modulesFiles.keys().reduce((modules, modulePath) => {
        const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
        const value = modulesFiles(modulePath)
        modules[moduleName] = value.default
        return modules
      }, {})
      for (const key in modules) {
        if (Object.hasOwnProperty.call(modules, key)) {
          i18n.setLocaleMessage(key, { ...i18n.messages[key], ...modules[key] })
        }
      }
      // 以下是通过接口获取存在服务器上的国际化数据
      // I18nApi.allMap().then(res => {
      //   commit('SET_LANDATA', res)
      //   // console.log(res)
      //   for (const key in res) {
      //     if (Object.hasOwnProperty.call(res, key)) {
      //       i18n.setLocaleMessage(key, { ...i18n.messages[key], ...res[key] })
      //     }
      //   }
      //   store.commit('setDict')
      // })
    }
  }
}
