# 第一种

```js
import layout from '@/views/layout/index';

/** 路由组件 */
const ROUTE_COMP = {
  template:
    '<div class="h-100"><transition name="move" mode="out-in"><router-view/></transition></div>',
};


const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/main/Login')
  },
  {
    path: '',
    component: layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home', // 首页（一级路由）
        component: () => import('@/views/module/home')
      },
      {
        path: '/route/topo/station', // 拓扑展示（一级路由）
        name: 'topology',
        component: () => import('@/views/module/route/topo/station')
      },
      {
        path: '',
        name: 'realTimeMonitor', // 查询统计（二级嵌套路由的一级）
        component: ROUTE_COMP,
        children: [
          {
            path: '/afs/alarm/realtime', // 实时告警（二级路由）
            name: 'realtimeAlarm',
            component: () => import('@/views/module/afs/alarm/realtime')
          },
          {
            path: '/afs/device/info', // 设备状态（二级路由）
            name: 'deviceStatus',
            component: () => import('@/views/module/afs/device/info')
          }
        ]
      },
      {
        path: '',
        name: 'networkService', // 组网业务（三级嵌套路由的一级）
        component: ROUTE_COMP,
        children: [
          {
            path: '',
            name: 'serviceManage', // 业务管理（三级嵌套路由的二级）
            component: ROUTE_COMP,
            children: [
              {
                path: '/route/biz/route', // 路由配置（三级路由）
                name: 'routeConfig',
                component: () => import('@/views/module/route/biz/route')
              },
              {
                path: '/route/biz/open', // 智能开通（三级路由）
                name: 'serviceConfig',
                component: () => import('@/views/module/route/biz/open')
              }
            ]
          },
          {
            path: '',
            name: 'OTDRTest', // 链路测试
            component: ROUTE_COMP,
            children: [
              {
                path: '/route/otdr/manual', // 手动测试
                name: 'manualTest',
                component: () => import('@/views/module/route/otdr/manual')
              },
              {
                path: '/route/otdr/timetest', // 例行测试
                name: 'timeTest',
                component: () => import('@/views/module/route/otdr/timetest')
              }
            ]
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes,
});
```
# 第二种

```js
import layout from '@/views/layout/index';

/** 路由组件 */
const ROUTE_COMP = {
  template:
    '<div class="w-100 h-100"><transition name="move" mode="out-in"><router-view/></transition></div>'
}

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/main/Login"),
  },
  {
    path: "/home",
    component: layout,
    name: "home",
    redirect: "/home",
    children: [
      {
        path: "",
        name: "homePage",
        component: () => import("@/views/module/home"),
      },
    ],
  },
  {
    path: "/route",
    name: "topology",
    component: layout,
    children: [
      {
        path: "topo/station",
        name: "topologyPage",
        component: () => import("@/views/module/route/topo/station"),
      },
    ],
  },
  {
    path: "/afs",
    component: layout,
    name: "afs",
    redirect: "/afs/alarm/realtime",
    children: [
      {
        path: "alarm/realtime",
        name: "realtimeAlarm",
        component: () => import("@/views/module/afs/alarm/realtime"),
      },
      {
        path: "device/info",
        name: "deviceStatus",
        component: () => import("@/views/module/afs/device/info"),
      },
    ],
  },
  {
    path: "/route",
    component: layout,
    name: "route",
    redirect: "/afs/alarm/realtime",
    children: [
      {
        path: "biz",
        component: ROUTE_COMP,
        name: "biz",
        children: [
          {
            path: "route",
            name: "routeConfig",
            component: () => import("@/views/module/route/biz/route"),
          },
          {
            path: "open",
            name: "serviceConfig",
            component: () => import("@/views/module/route/biz/open"),
          },
        ],
      },
      {
        path: "otdr",
        component: ROUTE_COMP,
        name: "otdr",
        children: [
          {
            path: "manual",
            name: "manualTest",
            component: () => import("@/views/module/route/otdr/manual"),
          },
          {
            path: "manual",
            name: "timeTest",
            component: () => import("@/views/module/route/otdr/timetest"),
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});
```
