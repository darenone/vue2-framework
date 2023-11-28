import SystemApi from '@/api/SystemApi'
import elementLayout from '@/components/element-layout/index.vue'
import layout from '@/views/main/Layout'
import router, { resetRouter } from '@/router'

// 路由组件
// const ROUTE_COMP = {
//   template:
//     '<div><transition name="move" mode="out-in"><router-view/></transition></div>'
// }

// 加载视图组件
const loadView = view => () => import(`@/views/module${view}`)

// 创建路由
function createRoute(menu, component) {
  const route = {
    name: '主体',
    path: '',
    component,
    children: []
  }
  menu.map(item => route.children.push(toRoute(item)))
  return route
}

// 增加路由属性
function toRoute(item) {
  item.name = item.enName
  // item.component = item.funcType === 'MENU' ? loadView(item.path) : ROUTE_COMP
  item.component = item.funcType === 'MENU' ? loadView(item.path) : layout
  if (item.children && item.children.length) {
    item.children.forEach(subItem => {
      subItem.meta = {
        parent: item.enName
      }
      toRoute(subItem)
    })
  }
  return item
}

export default {
  state: {
    menu: [],
    navMenuDefaultActive: '', // 当前选中路由
    activedTabs: [ // tab
      {
        label: 'HOME',
        name: 'HOME',
        path: '/index'
      }
    ],
    tabsType: 'tab-nav' // 导航模式
  },
  getters: {
    getMenu: state => state.menu, // 获取菜单信息
    // getMenuItem: state => menuId => Common.recursiveQuery(menuId, state.menu, 'funcId'), // 获取菜单项
    getActivedTabs: state => state.activedTabs,
    getCurrentTab: state => state.navMenuDefaultActive,
    getTabsType: state => state.tabsType
  },
  actions: {
    // 加载菜单数据
    loadMenu: ({ commit }, params) => {
      SystemApi.menu(params).then(menu => {
        if (menu && menu.length) {
          const route = createRoute(menu, elementLayout)
          console.log('route', route)
          resetRouter() // 重置路由
          router.addRoute(route)
          commit('setMenu', menu)
        } else {
          commit('setMenu', [])
        }
      })
    }
  },
  mutations: {
    setMenu: (state, menu) => { // 设置菜单项
      state.menu = menu.filter(i => i.name !== 'HOME') // 不显示首页菜单
      console.log('菜单列表', state.menu)
      // 判断权限 移除tabs
      console.log(state.activedTabs)
      if (state.activedTabs.length > 1) {
        const navs = state.activedTabs
        const menuName = ['HOME']
        const menuFn = (children) => {
          children.forEach(item => {
            menuName.push(item.name)
            if (item.children && item.children.length) {
              menuFn(item.children)
            }
          })
        }
        menuFn(menu)
        state.activedTabs = navs.filter(item => menuName.includes(item.name))
      } else {
        state.navMenuDefaultActive = state.activedTabs[0]['name']
      }
    },
    SET_TABTYPE: (state, tab) => (state.tabsType = tab), // 导航模式
    DEL_TABS: (state, index) => { // 删除tab
      state.activedTabs.splice(index, 1)
    },
    ADD_ACTIVED_TABS: (state, item) => {
      if (router.currentRoute.path !== item.path) {
        const itemIndex = state.activedTabs.findIndex((obj) => obj.name === item.name || obj.label === item.label)
        if (itemIndex < 0) {
          state.activedTabs.push(item)
        }
        state.navMenuDefaultActive = item.name
      } else {
        state.navMenuDefaultActive = item.name
      }
    }
  }
}
