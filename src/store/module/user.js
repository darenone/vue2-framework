const state = {
  userName: '张三'
}
const getters = {
  getUserName: state => {
    return 'hello，' + state.userName + '！'
  }
}
const mutations = {}
const actions = {}

export default {
  namespaced: true, // 命名空间默认不开启
  state,
  getters,
  mutations,
  actions
}
