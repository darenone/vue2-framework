export const getMenuList = () => {
  return new Promise((resolve, reject) => {
    const err = null
    setTimeout(() => {
      if (!err) {
        resolve({
          code: 200,
          data: {
            menuList: [
              { name: '创建任务' },
              { name: '任务列表' }
            ]
          }
        })
      } else {
        reject(err)
      }
    })
  })
}

export const getUserName = () => {
  return new Promise((resolve, reject) => {
    const err = null
    setTimeout(() => {
      if (!err) {
        resolve({
          code: 200,
          data: {
            name: '卿卿日常-上官靖'
          }
        })
      } else {
        reject(err)
      }
    })
  })
}

export const getInfo = () => {
  return new Promise((resolve, reject) => {
    const err = null
    setTimeout(() => {
      if (!err) {
        resolve({
          code: 200,
          data: {
            name: '田耕纪-连花儿（李墨之）'
          }
        })
      } else {
        reject(err)
      }
    })
  })
}
