// 存放一些与业务结合的工具方法
const setTitle = (title) => {
  window.document.title = title ? title + '-基础框架' : '基础框架'
}

export {
  setTitle
}
