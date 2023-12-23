import Mock from 'mockjs'

const data = Mock.mock({
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
  ]
  // page: 1,
  // size: 20,
  // total: 7
})

const handleTableData = function(options) {
  const url = options.url
  const querys = url.substring(url.indexOf('?') + 1).split('&')
  var result = {} // 获取url里传递过来的参数(存储请求参数--键值对)
  for (var i = 0; i < querys.length; i++) {
    var temp = querys[i].split('=')
    if (temp.length < 2) {
      result[temp[0]] = ''
    } else {
      result[temp[0]] = temp[1]
    }
  }
  if (result.orderCode === 'CHANGE_REQUEST') { // 待修改表单orderCode状态
    const { ...modifyArr } = data // 对象深拷贝
    modifyArr.list = modifyArr.list.filter(function(val) {
      return val.orderCode === result.orderCode
    })
    return modifyArr
  } else if (result.orderCode === 'INSPECTION_AUDIT') { // 待审核表单orderCode状态
    const { ...passingArr } = data
    passingArr.list = passingArr.list.filter(function(val) {
      return val.orderCode === result.orderCode
    })
    return passingArr
  } else {
    var { ...startArr } = data
    const total = startArr.list.length
    changePageAndSize(startArr, result)
    return {
      list: startArr.list, // 调用此方法实现分页功能,
      total: total,
      page: result.page || 1,
      size: result.size || 20
    }
  }
}

// 根据参数pageNum与pageSize实现分页功能
function changePageAndSize(selfArr, result) {
  var totalPage = []
  var pageAllNum = Math.ceil(selfArr.list.length / result.size) || 1
  for (let i = 0; i < pageAllNum; i++) {
    totalPage[i] = selfArr.list.slice(result.size * i, result.size * (i + 1))
  }
  selfArr.list = totalPage[result.page - 1]
  return selfArr
}

export default handleTableData
