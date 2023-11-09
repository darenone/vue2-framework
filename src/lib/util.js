// 存放一些与业务结合的工具方法
const setTitle = (sysName, version) => {
  window.document.title = sysName + '-' + version
}

export {
  setTitle
}
