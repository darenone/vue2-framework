export default [
  {
    funcName: '首页',
    funcId: '20230925174528',
    funcType: 'MENU',
    display: true,
    enName: 'HOME',
    parentId: '20220309143206',
    path: '/index',
    sysId: 'AFS_OEN',
    icon: 'el-icon-eleme',
    children: null
  },
  {
    funcName: '组网业务',
    funcId: '20220309143456',
    funcType: 'DIR',
    display: true,
    enName: 'MENU_NETWORK_BUSINESS',
    parentId: '20220309143206',
    path: '',
    sysId: 'AFS_OEN',
    icon: 'el-icon-eleme',
    children: [
      {
        funcName: '业务管理',
        funcId: '20220309145127',
        funcType: 'MENU',
        display: true,
        enName: 'MENU_BUSINESS_MANAGER',
        parentId: '20220309143456',
        path: '/business/manager',
        sysId: 'AFS_OEN',
        icon: 'el-icon-eleme',
        children: null
      },
      {
        funcName: '备用通道',
        funcId: '20220309145233',
        funcType: 'MENU',
        display: true,
        enName: 'MENU_BACKUP_MANAGER',
        parentId: '20220309143456',
        path: '/business/backup',
        sysId: 'AFS_OEN',
        icon: 'el-icon-eleme',
        children: null
      }
    ]
  },
  {
    funcName: 'VUE组件封装',
    funcId: '20220309143342',
    funcType: 'DIR',
    display: true,
    enName: 'MENU_VUE_COM',
    parentId: '20220309143206',
    path: '',
    sysId: 'AFS_OEN',
    icon: 'el-icon-eleme',
    children: [
      {
        funcName: 'Table封装',
        funcId: '20220309144535',
        funcType: 'MENU',
        display: true,
        enName: 'MENU_TABLE_COM',
        parentId: '20220309143342',
        path: '/link/detect',
        sysId: 'AFS_OEN',
        icon: 'el-icon-eleme',
        children: null
      },
      {
        funcName: '例行检测',
        funcId: '20220309144712',
        funcType: 'MENU',
        display: true,
        enName: 'MENU_ROUTINE_TEST',
        parentId: '20220309143342',
        path: '/link/routine',
        sysId: 'AFS_OEN',
        icon: 'el-icon-eleme',
        children: null
      }
    ]
  },
  {
    funcName: '查询统计',
    funcId: '20220309143538',
    funcType: 'DIR',
    display: true,
    enName: 'MENU_INFO_QUERY',
    parentId: '20220309143206',
    path: '',
    sysId: 'AFS_OEN',
    icon: 'el-icon-eleme',
    children: [
      {
        funcName: '活动告警',
        funcId: '20220309150147',
        funcType: 'MENU',
        display: true,
        enName: 'MENU_ALARM_RECORD',
        parentId: '20220309143538',
        path: '/info/alarm',
        sysId: 'AFS_OEN',
        icon: 'el-icon-eleme',
        children: null
      },
      {
        funcName: '设备状态',
        funcId: '20220629113127',
        funcType: 'MENU',
        display: true,
        enName: 'MENU_DEVICE_STATE',
        parentId: '20220309143538',
        path: '/info/device',
        sysId: 'AFS_OEN',
        icon: 'el-icon-eleme',
        children: null
      }
    ]
  },
  {
    funcName: '资源配置',
    funcId: '20220309143306',
    funcType: 'DIR',
    display: true,
    enName: 'MENU_CONFIG_MANAGER',
    parentId: '20220309143206',
    path: '',
    sysId: 'AFS_OEN',
    icon: 'el-icon-eleme',
    children: [
      {
        funcName: '区域管理',
        funcId: '20220309143744',
        funcType: 'MENU',
        display: true,
        enName: 'MENU_REGION_MANAGER',
        parentId: '20220309143306',
        path: '/conf/region',
        sysId: 'AFS_OEN',
        icon: 'el-icon-eleme',
        children: null
      },
      {
        funcName: '节点管理',
        funcId: '20220309143821',
        funcType: 'MENU',
        display: true,
        enName: 'MENU_NODE_MANAGER',
        parentId: '20220309143306',
        path: '/conf/node',
        sysId: 'AFS_OEN',
        icon: 'el-icon-eleme',
        children: null
      }
    ]
  },
  {
    funcName: '系统管理',
    funcId: '20220309143618',
    funcType: 'DIR',
    display: true,
    enName: 'MENU_SYSTEM_MANAGER',
    parentId: '20220309143206',
    path: '',
    sysId: 'AFS_OEN',
    icon: 'el-icon-eleme',
    children: [
      {
        funcName: '机构管理',
        funcId: '20220309150405',
        funcType: 'MENU',
        display: true,
        enName: 'MENU_ORG_MANAGER',
        parentId: '20220309143618',
        path: '/system/org',
        sysId: 'AFS_OEN',
        icon: 'el-icon-eleme',
        children: null
      },
      {
        funcName: '用户管理',
        funcId: '20220309150511',
        funcType: 'MENU',
        display: true,
        enName: 'MENU_USER_MANAGER',
        parentId: '20220309143618',
        path: '/system/user',
        sysId: 'AFS_OEN',
        icon: 'el-icon-eleme',
        children: null
      },
      {
        funcName: '角色管理',
        funcId: '20220309150537',
        funcType: 'MENU',
        display: true,
        enName: 'MENU_ROLE_MANAGER',
        parentId: '20220309143618',
        path: '/system/role',
        sysId: 'AFS_OEN',
        icon: 'el-icon-eleme',
        children: null
      }
    ]
  },
  {
    funcName: '开发者管理',
    funcId: '20220629142528',
    funcType: 'DIR',
    display: true,
    enName: 'MENU_DEV_MANAGE',
    parentId: '20220309143206',
    path: '',
    sysId: 'AFS_OEN',
    icon: 'el-icon-eleme',
    children: [
      {
        funcName: '功能管理',
        funcId: '20220629142727',
        funcType: 'MENU',
        display: true,
        enName: 'MENU_FUNCTION_MANAGER',
        parentId: '20220629142528',
        path: '/system/func',
        sysId: 'AFS_OEN',
        icon: 'el-icon-eleme',
        children: null
      },
      {
        funcName: '字典管理',
        funcId: '20220629142946',
        funcType: 'MENU',
        display: true,
        enName: 'MENU_DICT_MANAGER',
        parentId: '20220629142528',
        path: '/system/dict',
        sysId: 'AFS_OEN',
        icon: 'el-icon-eleme',
        children: null
      },
      {
        funcName: '国际化管理',
        funcId: '20220629143140',
        funcType: 'MENU',
        display: true,
        enName: 'MENU_I18N_MANAGER',
        parentId: '20220629142528',
        path: '/system/i18n',
        sysId: 'AFS_OEN',
        icon: 'el-icon-eleme',
        children: null
      }
    ]
  }
]
