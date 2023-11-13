import Vue from 'vue'
import VueRouter from 'vue-router'
// import Layout from '@/views/main/Layout'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
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

const router = new VueRouter({
  routes
})

// 白名单，免登录验证
const whitelist = ['login', 'error401', 'error500', 'notFound', 'compatible', 'notLogin', '404', 'abnormal']

let app
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

router.afterEach((to, from, next) => {
  app = document.querySelector('.app-content-inner')
  app && app.scrollTo(0, 0)
})

export default router
