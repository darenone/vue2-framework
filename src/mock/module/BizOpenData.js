import Mock from 'mockjs'

const data = Mock.mock({
  'list|22-100': [ // 生成一个 length是 22~100之间的数组
    {
      'bizId': '@integer(3,1000000)', // 生成1-1000000之间的业务id
      'bizName': '@ctitle', // 生成3-50位的业务名称
      'bizLevel|1': ['GENERAL', 'IMPORTANT'], // 生成业务等级
      'useName': '@cname', // 生成用户名
      'createTime': '@datetime(yyyy-MM-dd A HH:mm:ss)', // 创建时间
      'timeInterval|1': '@time(HH:mm)-@time(HH:mm)', // 生效时间段
      'startStationId': '@integer(3,1000000)',
      'startStationName': '@county',
      'startNode': {
        'nodeId': '@integer(3,1000000)',
        'nodeName': '@cword(3, 5)'
      },
      'endStationId': '@integer(3,1000000)',
      'endStationName': '@county',
      'endNode': {
        'nodeId': '@integer(3,1000000)',
        'nodeName': '@cword(3, 5)'
      },
      'isAutoRestore|1': [false, true],
      'isOtdrTest|1': [false, true],
      'backNumber': '@integer(3,1000000)',
      'bizChannelList|1-2': [
        {
          'bizStatus|1': [
            'FAULT',
            'OPEN_FAIL',
            'RESTORE_FAIL',
            'REDUCTION_FAIL',
            'RETURN_FAIL',
            'OPENING',
            'RESTORING',
            'RETURNING',
            'RESTORE',
            'NORMAL'
          ],
          'startPort': {
            'bizName': '@cword(5, 10)'
          },
          'endPort': {
            'bizName': '@cword(5, 10)'
          },
          'lockStatus|1': ['UNLOCKED', 'LOCKED']
        }
      ]
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
