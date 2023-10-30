import { getMenuList } from '@/api/app'

const actions = {
  async updateMenuList({ commit }) {
    try {
      const { data: { menuList }} = await getMenuList()
      commit('SET_MENU_LIST', menuList)
    } catch (err) {
      console.log(err)
    }
  }
}
export default actions
