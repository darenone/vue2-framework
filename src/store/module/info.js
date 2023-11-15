import SystemApi from '@/api/SystemApi'

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
    async upDateInfo({ commit }) {
      try {
        const data = await SystemApi.info()
        commit('SET_INFO', data)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
