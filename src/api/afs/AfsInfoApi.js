import axios from 'axios'
import BaseApi from '@/api/BaseApi'
import config from '@/config'
// import vm from '@/main.js'
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
  static baseAfsPath() {
    return (config.services.afs || '')
  }

  /**
     * 查询设备当前升级信息
     *
     * @param params 查询参数
     * @return 请求对象
     */
  static findUpgrade(params) {
    return axios.get(`${this.basePath()}/findUpgrade`, { params })
  }

  /**
     * 统计设备状态
     *
     * @param params 查询参数
     * @return 请求对象
     */
  static deviceOnlineStatus(data) {
    return axios.post(`${this.basePath()}/deviceOnlineStatus`, data)
  }

  /**
     * 统计AFS状态
     *
     * @param params 查询参数
     * @return 请求对象
     */
  static deviceRunStatus(data) {
    return axios.post(`${this.basePath()}/deviceRunStatus`, data)
  }

  /**
     * 查询afs设备
     *
     * @param params 查询参数
     * @return 请求对象
     */
  static AfsFindByDeviceId(params) {
    return axios.get(`${this.basePath()}/find`, { params })
  }

  // 获取自检设备列表
  static allPage(params) {
    return axios.get(`${this.basePath()}/allPage`, { params })
  }

  /**
     * 导入数据
     *
     * @return 请求路径
     */
  static impData() {
    return this.fullPath('/impData')
  }

  static expTpl(params) {
    return axios.get(`${this.basePath()}/expTpl`, { params, responseType: 'blob' })
  }

  static expData(params) {
    return axios.get(`${this.basePath()}/expData`, { params, responseType: 'blob' })
  }

  /**
     * 查询afs设备
     *
     * @param params 查询参数
     * @return 请求对象
     */
  static allPorts(params) {
    return axios.get(`${this.basePath()}/allPorts`, { params })
  }

  /**
     * 根据设备类型afsType和端口数量查询不同类型的afs设备
     *
     * @param params 查询参数
     * @return 请求对象
     */
  static getAFSInfoByPort(params) {
    return axios.get(`${this.basePath()}/getAFSInfoByPort`, { params })
  }
  /**
     * 视频调控获取设备列表
     *
     * @param params 查询参数
     * @return 请求对象
     */
  static baseAfsList(params) {
    return axios.get(`${this.basePath()}/baseAfsList`, { params })
  }

  // 获取可替换设备列表
  static getSwapDevices(params) {
    return axios.get(`${this.basePath()}/getSwapDevices`, { params })
  }

  // 替换设备ID
  static deviceSwap(data) {
    return axios.post(`${this.basePath()}/deviceSwap`, data)
  }

  // 修改设备名称
  static updateInfo(data) {
    return axios.post(`${this.basePath()}/updateInfo`, data)
  }

  // 检修设备列表
  static repairList(params) {
    return axios.get(`${this.baseAfsPath()}/deviceRepair/list`, { params })
  }

  // 阈值配置
  static configRepair(data) {
    return axios.post(`${this.baseAfsPath()}/deviceRepair/config`, data)
  }
  // 阈值配置 启用/禁用
  static alarmSwitch(data) {
    return axios.post(`${this.baseAfsPath()}/deviceRepair/alarmSwitch`, data)
  }
  // 设备检修 设备型号
  static modelList(params) {
    return axios.get(`${this.baseAfsPath()}/deviceRepair/modelList`, { params })
  }
}
