import BaseApi from '@/api/BaseApi'
import config from '@/config'
import vm from '@/main.js'
/**
 * AFS信息接口
 */
export default class extends BaseApi {
  /**
     * 获取基础路径
     *
     * @return 基础路径
     */
  static basePath() {
    return (config.services.afs || '') + '/afsInfo'
  }
  /**
     * 统计AFS状态
     *
     * @param params 查询参数
     * @return 请求对象
     */
  static deviceOnlineStatus(data) {
    return vm.$http.postJson(`${this.basePath()}/deviceOnlineStatus`, data)
  }

  // 获取自检设备列表
  static allPage(params) {
    return vm.$http.get(`${this.basePath()}/allPage`, { params })
  }

  /**
     * 导入数据
     *
     * @return 请求路径
     */
  static impData() {
    return this.fullPath('/impData')
  }
  /**
     * 导出数据
     *
     * @return
     */
  static expTpl(params) {
    return vm.$http.get(`${this.basePath()}/expTpl`, { params, responseType: 'blob' })
  }
}
