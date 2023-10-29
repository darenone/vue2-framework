const getters = {
  getMenuType1: state => {
    if (state.menuType === 1) {
      return 'ping拨测'
    } else {
      return '网页拨测'
    }
  },
  getMenuType2: state => state.menuType
}

export default getters
