const saveLocal = store => {
  // 当浏览器刷新的时候执行，也就是store初始化的时候执行
  // 当刷新浏览器时，第一次做的操作就写在这里
  // 也可以用sessionStorage.menuType这种形式
  console.log('store初始化')
  if (localStorage.state) {
    store.replaceState(JSON.parse(localStorage.state)) // 全部保存
    // store.state.menuType = localStorage.menuType // 只保存某个值
  }
  // store.subscribe方法，只要项目里有提交mutation的动作都会触发一次这个方法
  store.subscribe((mutation, state) => {
    console.log('提交了mutation')
    localStorage.state = JSON.stringify(state) // 全部保存
    // localStorage.menuType = state.menuType // 只保存某个值
  })
}

export default saveLocal
