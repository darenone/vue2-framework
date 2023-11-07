import axios from 'axios'
import FuncApi from '@/api/system/FuncApi'
import DictApi from '@/api/system/DictApi'
import config from '@/config'

/**
 * 系统接口
 */
export default class {
  /**
     * 获取基础路径
     *
     * @return 基础路径
     */
  static basePath() {
    return (config.services.authen || '')
  }

  /**
     * 当前会话是否在线
     *
     * @return 请求对象
     */
  static isAuthen() {
    return axios.get(`${this.basePath()}/isAuthen`)
  }

  /**
     * 用户登录服务
     *
     * @param data
     *            登录信息
     * @return 请求对象
     */
  static login(data) {
    return axios.post(`${this.basePath()}/login`, data)
  }

  /**
     * 退出当前会话登录
     *
     * @return 请求对象
     */
  static logout() {
    return axios.delete(`${this.basePath()}/logout`)
  }

  /**
     * 获取当前会话认证信息
     *
     * @return 请求对象
     */
  static info() {
    return axios.get(`${this.basePath()}/info`)
  }

  /**
     * 用户密码修改
     *
     * @param data
     *            密码修改信息
     * @return 请求对象
     */
  static modPwd(data) {
    return axios.put(`${this.basePath()}/modPwd`, data)
  }

  /**
     * 反向代理
     *
     * @param option
     *            代理请求项
     * @return 请求对象
     */
  static proxy(option) {
    option.url = `${config.services.system || ''}/proxy/${option.url}`
    return axios(option)
  }

  /**
     * 根据条件获取功能菜单树
     *
     * @param params
     *            查询参数
     * @return 请求对象
     */
  static menu(params) {
    return FuncApi.menu(params)
  }

  /**
     * 查询业务字典全集
     *
     * @return 请求对象
     */
  static dict() {
    return DictApi.tree()
  }
}
