import axios from 'axios'
import vm from '@/main.js'
import BaseApi from '@/api/BaseApi'
import config from '@/config'

/**
 * 业务开通接口
 */
export default class extends BaseApi {
  /**
   * 获取基础路径
   *
   * @return 基础路径
   */
  static basePath() {
    return (config.services.oen || '') + '/biz'
  }

  // 获取推荐路由信息
  static linkRecommend(params) {
    return axios.post(`${this.basePath()}/linkRecommend`, params)
  }

  // 获取推荐路由信息
  static open(params) {
    return axios.post(`${this.basePath()}/open`, params)
  }

  // 获取列表
  static queryPage(data, page) {
    // return axios.post(`${this.basePath()}/queryPage`, data, { params: page })
    return vm.$http.postJson(`${this.basePath()}/queryPage`, data, { params: page })
  }

  // 恢复
  static restore(params) {
    return axios.post(`${this.basePath()}/restore`, params)
  }

  // 还原
  static reduction(params) {
    return axios.post(`${this.basePath()}/reduction`, params)
  }

  // 查询原始通道
  static initialChannel(params) {
    return axios.get(`${this.basePath()}/initialChannel`, { params })
  }

  // 查询还原原始通道
  static reductionInfo(params) {
    return axios.get(`${this.basePath()}/reductionInfo`, { params })
  }

  // 删除还原通道信息
  static delReduction(params) {
    return axios.delete(`${this.basePath()}/delReduction`, { params })
  }

  // 根据站点id获取关联业务
  static queryList(params) {
    return axios.post(`${this.basePath()}/queryList`, params)
  }

  // 业务名称查重
  static bizNameExist(params) {
    return axios.get(`${this.basePath()}/bizNameExist`, { params })
  }

  // 删除业务
  static delByBizId(params) {
    return axios.delete(`${this.basePath()}/delByBizId`, { params })
  }

  // 查询移纤详情
  static cutoverList(params) {
    return axios.post(`${this.basePath()}/cutoverList`, params)
  }

  // 可选链路通道
  static logicChannelSegmentMatrix(params) {
    return axios.post(`${this.basePath()}/logicChannelSegmentMatrix`, params)
  }

  // 一般业务恢复状态查询
  static restoreCacheStatus(params) {
    return axios.get(`${this.basePath()}/restoreCacheStatus`, { params })
  }

  // 还原覆盖设置通道为空闲
  static reductionChannelIdle(params) {
    return axios.get(`${this.basePath()}/reductionChannelIdle`, { params })
  }

  // 设置业务状态为故障
  static bizFault(params) {
    return axios.post(`${this.basePath()}/bizFault`, params)
  }

  // 设置业务故障已恢复
  static bizNormal(params) {
    return axios.post(`${this.basePath()}/bizNormal`, params)
  }

  // 第一步验证
  static firstVerify(params) {
    return axios.get(`${this.basePath()}/firstVerify`, { params })
  }

  // 导出业务信息
  static backupExport(params) {
    return axios.get(`${this.basePath()}/expData`, {
      params,
      responseType: 'blob'
    })
  }

  // 全链测试
  static throughTest(params) {
    return axios.post(`${this.basePath()}/throughTest`, params)
  }

  // 获取测试列表
  static getTestList(params) {
    return axios.get(`${this.basePath()}/getTestList`, { params })
  }

  // 获取测试端口对端
  static getOpposite(params) {
    return axios.get(`${this.basePath()}/getOpposite`, { params })
  }
}
