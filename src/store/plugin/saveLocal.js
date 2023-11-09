const saveLocal = store => {
  // 当浏览器刷新的时候执行，也就是store初始化的时候执行
  // 当刷新浏览器时，第一次做的操作就写在这里
  // 也可以用localStorage.menuType这种形式
  console.log('store初始化', sessionStorage.state)
  if (sessionStorage.state) {
    store.replaceState(JSON.parse(sessionStorage.state)) // 全部保存
    // store.state.menuType = localStorage.menuType // 只保存某个值
  }
  // store.subscribe方法，只要项目里有提交mutation的动作都会触发一次这个方法
  store.subscribe((mutation, state) => {
    console.log('提交了mutation')
    sessionStorage.state = JSON.stringify(state) // 全部保存
    // sessionStorage.menuType = state.menuType // 只保存某个值
  })
}

export default saveLocal
