const cc = require('c-complexity')
// const fs = require('fs')
const xlsx = require('xlsx')

let list = []
async function test() {
  console.time()
  const result1 = await cc({
    extensions: '**/**/*.vue',
    rootPath: 'src',
    defalutIgnore: 'true',
    ignoreRules: [],
    ignoreFileName: '.gitignore'
  }, 10)
  list = list.concat(result1.result)

  const result2 = await cc({
    extensions: '**/**/*.js',
    rootPath: 'src',
    defalutIgnore: 'true',
    ignoreRules: [],
    ignoreFileName: '.gitignore'
  }, 10)
  list = list.concat(result2.result)
  exportExcel(list, 'iot')
  // fs.writeFile('./complexity.json', JSON.stringify(list), 'utf8', function(err) {
  //   if (err) throw err
  //   console.log('写入成功')
  // })
  console.timeEnd()
}
test()

function exportExcel(res, name) {
  console.log(res)
  var data1 = [] // 存储 excel的数据
  // 创建excel表头
  const top = ['funcType', 'funcName', 'position', 'fileName', 'complexity', 'advice']

  data1.push(top)
  let excel_data = []
  const ww = []
  for (let i = 0; i < res.length; i++) {
    excel_data.push(res[i].funcType)
    excel_data.push(res[i].funcName)
    excel_data.push(res[i].position)
    excel_data.push(res[i].fileName)
    excel_data.push(res[i].complexity)
    excel_data.push(res[i].advice)
    data1.push(excel_data)
    excel_data = []
    Object.values(res[i]).forEach(item => {
      ww.push({ width: item.toString().length ? item.toString().length * 1.5 : 100 })
    })
  }

  // 写入excel
  const arrayWorkSheet1 = xlsx.utils.aoa_to_sheet(data1)
  // let arrayWorkSheet2 = xlsx.utils.aoa_to_sheet(data2);

  const workBook = {
    SheetNames: ['代码复杂度统计'], // 若要多个sheet,添加sheet2名称进数组SheetNames
    Sheets: { // 若多个sheet,sheets中对应添加多个SheetNames跟数据
      '代码复杂度统计': arrayWorkSheet1
    }
  }
  workBook['!cols'] = (ww)

  // 将workBook写入文件
  xlsx.writeFile(workBook, `./${name}-complexity.xlsx`)
}

