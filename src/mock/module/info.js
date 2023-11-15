export default {
  user: {
    userId: 'admin',
    realName: '系统管理员',
    password: '2605ac8f15124cb92683594cb26559a1',
    enable: true,
    orgId: 'manager_100000',
    gender: '男',
    birthday: '1999-12-31'
  },
  roles: ['admin'],
  org: {
    orgName: '管理平台',
    orgId: 'manager_100000',
    orgType: 'PLATFORM',
    parentId: '0'
  },
  auths: [
    'sys:org:get',
    'afs:info:view',
    'repair:check:get',
    'batch:transfer:add',
    'conf:region:mod',
    'conf:region:del',
    'link:record:saveCurve'
  ],
  apis: []
}
