const state = {
  userName: '卿卿日常-尹峥（白敬亭）'
}
const getters = {
  getUserName: state => {
    return 'hello，' + state.userName + '！'
  }
}
const mutations = {
  SET_USER_NAME(state, params) {
    state.userName = params
  }
}
const actions = {}

export default {
  namespaced: true, // 命名空间默认不开启
  state,
  getters,
  mutations,
  actions
}
