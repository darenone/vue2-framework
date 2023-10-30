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

  }
}
