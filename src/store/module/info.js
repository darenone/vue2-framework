import SystemApi from '@/api/SystemApi'
import config from '@/config'

export default {
  state: {
    info: {
      name: '田耕纪-沈诺-曾舜晞',
      user: {},
      org: {},
      roles: [],
      auths: [],
      apis: []
    }
  },
  getters: {
    getInfo: state => state.info, // 获取登录信息
    getUser: state => state.info.user // 获取用户信息
  },
  mutations: {
    SET_INFO(state, params) {
      state.info = params
    }
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
    }
  }
}
