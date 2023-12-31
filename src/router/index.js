import Vue from 'vue'
import VueRouter from 'vue-router'
// import layout from '@/components/layout/index'
import eleLayout from '@/components/element-layout/index.vue'
import HomeView from '../views/HomeView.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'home',
    component: eleLayout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'HOME',
        component: HomeView
      },
      {
        path: '/about',
        name: 'ABOUT',
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/main/Login')
  },
  {
    path: '/screen', // 大屏
    component: () => import('@/views/module/screen/screen'),
    children: [{
      path: '',
      component: () => import('@/views/module/screen/')
    }]
  },
  {
    path: '/prop',
    name: 'prop',
    meta: {
      title: '组件之间传值'
    },
    component: () => import('@/views/module/prop/father')
  },
  {
    path: '/product',
    name: 'product',
    meta: {
      title: '嵌套路由'
    },
    component: () => import('@/views/module/product/index.vue'), // 必须携带<router-view/>
    children: [
      {
        path: 'ele-product', // 子路由需要前面加'/'，只有副路由才有
        name: 'ele-product',
        component: () => import('@/views/module/product/eleProduct.vue'), // 必须携带<router-view/>
        children: [
          {
            path: 'phone', // 子路由需要前面加'/'，只有副路由才有
            name: 'phone',
            components: { // 命名视图设置
              default: () => import('@/views/module/product/phone.vue'),
              apple: () => import('@/views/module/product/apple.vue'),
              xiaomi: () => import('@/views/module/product/xiaomi.vue'),
              huawei: () => import('@/views/module/product/huawei.vue')
            }
          },
          {
            path: 'computer', // 子路由需要前面加'/'，只有副路由才有
            name: 'computer',
            component: () => import('@/views/module/product/computer.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/axios',
    name: 'axios',
    meta: {
      title: '封装axios'
    },
    component: () => import('@/views/module/axios/')
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('../views/module/menu')
  },
  {
    path: '/compatible',
    name: 'compatible',
    meta: { title: '兼容' },
    component: resolve => require(['@/errorPage/browser_check.vue'], resolve)
  },
  {
    path: '/notLogin',
    name: 'notLogin',
    meta: { title: '未登录或超时' },
    component: resolve => require(['@/errorPage/extra_401_option.vue'], resolve)
  },
  {
    path: '/notFound',
    name: '404',
    meta: { title: '页面不存在' },
    component: resolve => require(['@/errorPage/extra_404_option.vue'], resolve)
  },
  {
    path: '/abnormal',
    name: 'abnormal',
    meta: { title: '服务器异常' },
    component: resolve => require(['@/errorPage/extra_500_option.vue'], resolve)
  }
]

const createRouter = (routes) => new VueRouter({
  routes
})

// 白名单，免登录验证
const whitelist = ['login', 'error401', 'error500', 'notFound', 'compatible', 'notLogin', '404', 'abnormal']

let app
const router = createRouter(routes)
router.beforeEach((to, from, next) => {
  // const isLogin = !!sessionStorage.getItem('accessToken');
  const isLogin = true

  if (isLogin) {
    if (to.name === 'login') {
      next({
        name: 'home'
      })
    } else {
      next()
    }
  } else {
    if (whitelist.indexOf(to.name) !== -1) {
      next()
    } else {
      next({
        name: 'login'
      })
    }
  }
})

// 添加tabs
router.beforeEach((to, from, next) => {
  // console.log(to, from)
  if (to.name === 'ERROR404') {
    next()
  } else {
    if (to.name && to.path) {
      const item = {
        label: to.name,
        name: to.name,
        path: to.path
      }
      store.commit('ADD_ACTIVED_TABS', item)
    }
    next()
  }
})

router.afterEach((to, from, next) => {
  app = document.querySelector('.app-content-inner')
  app && app.scrollTo(0, 0)
})

export const resetRouter = () => {
  const newRouter = createRouter(routes)
  router.matcher = newRouter.matcher
}

export default router
