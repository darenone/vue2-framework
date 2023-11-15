const getters = {
  getMenuType1: state => {
    if (state.menuType === 1) {
      return 'ping拨测'
    } else {
      return '网页拨测'
    }
  },
  getMenuType2: state => state.menuType,
  menuList: state => state.menuList,
  getLayout: state => state.layout,
  getTabType: state => state.tabType
}

export default getters
