/** 系统配置 */
window.__config__ = {
  // 基础配置
  sysId: 'AFS_OEN', // 系统标识
  sysName: {
    'zh-CN': 'vue2基础框架',
    'en-US': 'vue2 base framework'
  },
  // 系统版本
  systemVersion: 'V 2.6.18.1',
  // 视频地址
  afsVideoUrl: '/res/video/dsfv.mp4',
  // 接口服务配置
  services: {
    authen: '/authen',
    system: '/system',
    basebiz: '/basebiz',
    oen: '/oen',
    afs: '/afs'
  },
  // MQTT服务配置
  mqtt: {
    service: '/message',
    username: 'vrich',
    password: 'dnJpY2hAMDE2Ng=='
  },
  // 后端调试环境配置
  devConf: {
    baseUrl: 'http://192.168.55.221/services',
    resUrl: 'http://192.168.55.221/res',
    // 接口服务配置
    services: {
      authen: '/authen',
      system: '/system',
      basebiz: '/basebiz',
      // basebiz: 'http://192.168.0.29:10002',
      afs: '/afs',
      // afs: 'http://192.168.0.29:10011',
      oen: '/oen',
      // oen: 'http://192.168.0.117:10012',
      pem: '/pem'
    },
    mqtt: {
      service: 'mqtt://192.168.55.221/services/message'
    }
  },
  // 前端调试环境配置
  testConf: {
    baseUrl: 'http://192.168.55.221/services'
  },
  // 构建环境配置
  prodConf: {
    baseUrl: '/services',
    resUrl: '/res',
    // 接口服务配置
    services: {
      authen: '/authen',
      system: '/system',
      basebiz: '/basebiz',
      oen: '/oen',
      afs: '/afs',
      pem: '/pem'
    }
  },
  // 系统版权--更改时需要同步更改英文和阿拉伯语【直接用百度翻译】
  copyright: {
    'zh-CN': 'Copyright © 成都XX技术股份有限公司, All Rights Reserved.',
    'en-US': 'Copyright © Chendu XX Technology Co., Ltd, All Rights Reserved.'
  },
  defaultAccount: ['user_jf', 'user_gl', 'user_wh', 'user_sc']
}
