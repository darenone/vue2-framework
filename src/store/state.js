const state = {
  menuType: 1,
  menuList: [],
  currentNav: '',
  layout: 'top',
  tabType: 'tab-nav', // 导航模式
  activedTabs: [ // 记录被打开过的菜单
    {
      label: 'HOME',
      name: 'HOME',
      path: '/index'
    }
  ],
  currentTab: '' // 当前选中的tab
}

export default state
