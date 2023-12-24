import SystemApi from '@/api/SystemApi'
import userInfoApi from '@/api/basebiz/UserInfoApi'
import config from '@/config'
import i18n from '@/i18n'

export default {
  state: {
    info: {
      name: '田耕纪-沈诺-曾舜晞',
      user: {},
      org: {},
      roles: [],
      auths: [],
      apis: []
    },
    themeList: [// 主题列表
      'dark-theme',
      'red-theme',
      'green-theme',
      'blue-theme'
    ],
    currentTheme: null, // 当前主题
    columnsConfigData: []
  },
  getters: {
    getInfo: state => state.info, // 获取登录信息
    getUser: state => state.info.user, // 获取用户信息
    getUserId: state => {
      if (state.info && state.info.user) {
        return state.info.user.userId
      }
      return i18n.t('NOTLOGIN')
    },
    getThemeList: state => state.themeList,
    getTheme: state => state.currentTheme, // 获取当前主题
    columnsConfigData: state => state.columnsConfigData // 获取可显示列信息
  },
  mutations: {
    SET_INFO(state, params) {
      state.info = params
    },
    SET_THEME(state, theme) {
      state.currentTheme = theme
    },
    setColumnsConfigData: (state, data) => (state.columnsConfigData = data)
  },
  actions: {
    async upDateInfo({ dispatch, commit }) {
      try {
        const data = await SystemApi.info()
        commit('SET_INFO', data)
        if (data) {
          dispatch('loadMenu', {
            sysId: config.sysId,
            roleIds: data.roles
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 获取可显示列信息
    getViewConfig({ commit, state }) {
      userInfoApi.getViewConfig({ userId: state.info.user.userId }).then(res => {
        commit('setColumnsConfigData', res)
      })
    }
  }
}
