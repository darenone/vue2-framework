import Vue from 'vue'
import VueRouter from 'vue-router'
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

export default router
