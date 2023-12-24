import axios from 'axios'
import config from '@/config'
import vm from '@/main.js'

/**
 * 许可受理接口
 */
export default class {
  /**
     * 获取基础路径
     *
     * @return 基础路径
     */
  static basePath() {
    return (config.services.basebiz || '') + '/userInfo'
  }

  /**
     * 查询可显示列信息
     *
     * @param params 查询参数
     * @return 请求对象
     */
  static getViewConfig(params) {
    return vm.$http.get(`${this.basePath()}/getViewConfig`, { params })
  }

  /**
     * 保存
     *
     * @param data 数据
     * @return 请求对象
     */
  static saveViewConfig(params) {
    return axios.post(`${this.basePath()}/saveViewConfig`, params)
  }

  /**
     * 查询告警配置
     *
     * @param params 查询参数
     * @return 请求对象
     */
  static getAlarmNoticeConfig(params) {
    return axios.get(`${this.basePath()}/getAlarmNoticeConfig`, { params })
  }

  /**
     * 保存告警配置
     *
     * @param params 查询参数
     * @return 请求对象
     */
  static addAlarmNotice(params) {
    return axios.post(`${this.basePath()}/addAlarmNotice`, params)
  }

  /**
     * 保存头像
     *
     * @param params 查询参数
     * @return 请求对象
     */
  static saveUserInfo(params) {
    return axios.post(`${this.basePath()}/saveUserInfo`, params)
  }

  /**
     * 获取头像
     *
     * @param params 查询参数
     * @return 请求对象
     */
  static getUserInfoByUserId(params) {
    return axios.get(`${this.basePath()}/getUserInfoByUserId`, { params })
  }
}
