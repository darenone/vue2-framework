import Mock from 'mockjs'
export default Mock.mock({
  'list|22-100': [ // 生成一个 length是 22~100之间的数组
    {
      'inspectionId': '@integer(3,1000000)', // 生成1-1000000之间的巡视工单id
      'eleContractNo': '@string(3,50)', // 生成3-50位的产品合同号-梯号
      'mntContractNo': '@string(3,50)', // 生成3-50位的保养合同号
      'customerName': '@cname', // 生成客户名称
      'onsiteEleName': '@string(3,50)', // 生成3-50位的现场客户梯号
      'inspectionType|1': ['ELEVATOR', 'ESCALATOR'], // 生成作业类型
      'userName': '@cname', // 生成保养巡视人员
      'inspectionDate': '@date(yyyy-MM-dd)', // 生成巡视时间
      'h|1': '@time(HH:mm)-@time(HH:mm)', // 生成巡视时间段
      'orderCode|1': ['INITIATED', 'CHANGE_REQUEST', 'INSPECTION_AUDIT', 'COMPLETE'] // 生成订单状态
    }
  ],
  page: 1,
  size: 20,
  total: 7
})
