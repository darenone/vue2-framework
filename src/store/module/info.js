import { getInfo } from '@/api/app'

export default {
  state: {
    info: {
      name: '田耕纪-沈诺-曾舜晞'
    }
  },
  getters: {
    getInfo: state => state.info
  },
  mutations: {
    SET_INFO(state, params) {
      state.info = params
    }
  },
  actions: {
    async upDateInfo({ commit }) {
      try {
        const { data } = await getInfo()
        commit('SET_INFO', data)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
