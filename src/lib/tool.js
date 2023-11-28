// 存放一些与业务无关的工具方法

/**
 * 将空数据显示为--
 * @param {Number/String} val 需要处理的值，可以是数字或字符串
 * @param {String} 数值携带的单位，没有就不传
 * @returns 处理后的值
 * @author 宗强
 * 调用示例：
 * import { handleEmpty } from '@/lib/tool'
 * const a = handleEmpty(200, 'km')
 */
function handleEmpty(val, unit = '') {
  if (val !== 0) {
    if (typeof val === 'undefined' || val === null || val === '' || val === 'null' || val === '--') {
      return '--'
    }
  }
  return val + unit
}

/**
 * 普通数组转树结构
 * @param {Array} source 原数据
 * @param {String} id 键值
 * @param {String} parentId 父级键值
 * @param {String} children 子级键值
 * @returns 树结构
 * 调用示例：
 * import { buildTree } from '@/lib/tool'
 * const funcTree = buildTree(this.funcList, 'funcId', 'parentId', 'children') // 生成登录用户能操作的功能树
 */
const buildTree = (source, id, parentId, children) => {
  const cloneData = JSON.parse(JSON.stringify(source))
  return cloneData.filter(father => {
    const branchArr = cloneData.filter(child => father[id] === child[parentId])
    branchArr.length > 0 ? (father[children] = branchArr) : ''
    return father[parentId] === '0' // 如果第一层不是parentId=0，请自行修改
  })
}

/**
 * 通过关键字深度筛选树结构数据
 * @param {Array} data 原数据
 * @param {String} key 键值
 * @param {String} childKey 子级键值
 * @param {String} keywords 筛选关键字
 * @returns 筛选后的数组
 * 调用示例：
 * import { deepSearch } from '@/lib/tool'
 * const treeData = deepSearch(this.regionTree, 'regionName', 'children', this.keywords)
 */
const deepSearch = (data, key, childKey, keywords) => {
  const baseData = JSON.parse(JSON.stringify(data))
  const newArr = []
  baseData.forEach(item => {
    if (item[childKey] && item[childKey].length > 0) {
      item[childKey] = deepSearch(item[childKey], key, childKey, keywords)
    }
    if (item[key].indexOf(keywords) !== -1 || (item[childKey] && item[childKey].length > 0)) {
      newArr.push(item)
    }
  })
  return newArr
}

/**
 * 格式化时间
 * @param strDate（中国标准时间、时间戳等）
 * @param strFormat（返回格式）
 * @returns 格式化后的日期
 * 调用示例：
 * import { formatDate } from '@/lib/tool'
 * const date = formatDate(strDate, 'yyyy-MM-dd')
 */
const formatDate = (strDate, strFormat = 'yyyy-MM-dd HH:mm:ss') => {
  if (!strDate) return ''
  strDate = new Date(strDate)

  if (strDate instanceof Date) {
    const dict = {
      yyyy: strDate.getFullYear(),
      M: strDate.getMonth() + 1,
      d: strDate.getDate(),
      H: strDate.getHours(),
      m: strDate.getMinutes(),
      s: strDate.getSeconds(),
      MM: ('' + (strDate.getMonth() + 101)).substring(1),
      dd: ('' + (strDate.getDate() + 100)).substring(1),
      HH: ('' + (strDate.getHours() + 100)).substring(1),
      mm: ('' + (strDate.getMinutes() + 100)).substring(1),
      ss: ('' + (strDate.getSeconds() + 100)).substring(1)
    }
    return strFormat.replace(/(yyyy|MM?|dd?|HH?|mm?|ss?)/g, function() {
      return dict[arguments[0]]
    })
  } else {
    return ''
  }
}

/**
 * 下载文件，默认下载Excel文件
 * @param {String} data Blob数据（二进制流）
 * @param {String} fileName 下载保存的文件名
 * @param {String} blobType Blob类型
 * @returns 需要下载的文件
 调用示例：
 * import { downloadFile } from '@/lib/tool'
 * downloadFile(res, this.fileName) // res代表接口返回的二进制流
 */
const downloadFile = (
  data,
  fileName,
  blobType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
) => {
  const blob = new Blob([data], {
    type: blobType
  })
  const downloadElement = document.createElement('a')
  // 创建下载的链接
  const href = window.URL.createObjectURL(blob)
  downloadElement.href = href
  // 下载后文件名
  downloadElement.download = fileName
  document.body.appendChild(downloadElement)
  // 点击下载
  downloadElement.click()
  // 下载完成移除元素
  document.body.removeChild(downloadElement)
  // 释放掉blob对象
  window.URL.revokeObjectURL(href)
}

/**
 * 通过子id，向上逐级查找获取其父级
 * @param {Array} tree 树结构数据
 * @param {String} id 子级id
 * @param {String} key 键值
 * @returns 返回一个包括其所有父级的数组
 调用示例：
 * import { getParentsById } from '@/lib/tool'
 * const arr = getParentsById(this.regionTree, data.regionId, 'regionId')
 */
const getParentsById = (tree, id, key) => {
  for (const i in tree) {
    if (tree[i][key] === id) {
      return [tree[i]]
    }
    if (tree[i].children) {
      const node = getParentsById(tree[i].children, id, key)
      if (node !== undefined) {
        const rsNode = node.concat(tree[i])
        return rsNode
      }
    }
  }
}

/**
 * 对象深拷贝
 * @param {Object/Array} obj 需要深拷贝的数组或对象
 * @returns 返回深拷贝后的数组或对象
 调用示例：
 * import { deepClone } from '@/lib/tool'
 * this.rowData = deepClone(row)
 */
const deepClone = obj => {
  const objClone = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === 'object') {
        objClone[key] = deepClone(obj[key])
      } else {
        objClone[key] = obj[key]
      }
    }
  }
  return objClone
}

/**
 * 保留2位小数（补零）
 * @param {Number/String} value 需要处理的数字或字符串数字
 * @returns 返回带有2位小数的字符串数字
 调用示例：
 * import { toFixed2 } from '@/lib/tool'
 * toFixed2(2) => 2.00
 */
const toFixed2 = (value) => {
  if ((!value && value !== 0) || value === 'null') return null
  if (typeof value === 'number') {
    return handleNumber(value)
  } else if (typeof value === 'string' && isNumber(value)) {
    return handleNumber(value)
  } else {
    return value
  }
}
// 判读是否为字符串数字
function isNumber(val) {
  var regPos = /^\d+(\.\d+)?$/ // 非负浮点数
  var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ // 负浮点数
  if (regPos.test(val) || regNeg.test(val)) {
    return true
  } else {
    return false
  }
}
// 处理成2位小数
function handleNumber(value) {
  var f = parseFloat(value)
  f = Math.round(value * 100) / 100
  var s = f.toString()
  var rs = s.indexOf('.')
  if (rs < 0) {
    rs = s.length
    s += '.'
  }
  while (s.length <= rs + 2) {
    s += '0'
  }
  return s
}

/**
 * @desc 函数防抖
 * 原理：当持续触发一个事件时，在n秒内，事件没有再次触发，此时才会执行回调，如果n秒内，又触发了事件，就重新计时
 * @param {Function} func 需要防抖处理的函数
 * @param {Number} delay 防抖的时间限制
 * @returns 无返回值
 调用示例：
 * import { debounce } from '@/lib/tool'
 * methods: {
    debounceClick: debounce(function(id) {
      console.log(id)
    })
  }
 */
const debounce = (func, delay = 2000) => {
  let timer
  let context, args
  return function() {
    context = this // 记录this，防止在回调函数中丢失
    args = arguments // 存储函数参数
    timer ? clearTimeout(timer) : null // 如果定时器存在，则清除定时器
    const callNow = !timer // 标识是否立即执行
    timer = setTimeout(() => {
      timer = null
    }, delay)
    // callNow为true则立即执行函数
    callNow ? func.apply(context, args) : null
  }
}

/**
 * @desc 函数节流
 * 原理：当频繁触发一个事件，每隔一段儿时间，只会执行一次
 * @param {Function} func 需要节流处理的函数
 * @param {Number} limit 节流的时间限制
 * @returns 无返回值
 * 调用示例：
import { throttle } from '@/lib/tool'
methods： {
  addText: throttle(function(data, mouseStatus) {
    this.textMarker.remove()
  }),
  addMouseOverAndOut() {
    const _this = this
    throttle(() => {
      _this.addText(null, 'LEAVE')
    })
  }
}
 */
const throttle = (func, limit = 2000) => {
  // 上次执行时间
  let previous = 0
  return function() {
    // 当前时间
    const now = Date.now()
    const context = this
    const args = arguments
    // 若上次时间-上次执行时间大于时间限制
    if (now - previous > limit) {
      func.apply(context, args)
      previous = now
    }
  }
}

export {
  handleEmpty,
  buildTree,
  deepSearch,
  formatDate,
  downloadFile,
  getParentsById,
  deepClone,
  toFixed2,
  debounce,
  throttle
}
