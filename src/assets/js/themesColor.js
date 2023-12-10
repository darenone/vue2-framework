// 提取主题颜色作为json数据供echart等地方使用
// 提取后颜色格式： dark-theme-mainColor: '#fff'

import themesColors from '@/assets/css/mixin.module.scss'
const themeList = [
  'dark-theme',
  'red-theme',
  'green-theme',
  'blue-theme'
]

const getThemeColor = (key) => {
  const currentTheme = localStorage.currentTheme || themeList[0]
  if (currentTheme && themeList.includes(currentTheme)) {
    return themesColors[currentTheme + '-' + key]
  } else {
    return null
  }
}
export default getThemeColor
