import { getUserName } from '@/api/app'

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
const actions = {
  async upDateUserName({ commit }) {
    try {
      const { data: { name }} = await getUserName()
      commit('SET_USER_NAME', name)
    } catch (error) {
      console.log(error)
    }
  }
}

export default {
  namespaced: true, // 命名空间默认不开启
  state,
  getters,
  mutations,
  actions
}
