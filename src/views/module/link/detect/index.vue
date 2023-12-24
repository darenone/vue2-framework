<template>
  <div class="flex-column">
    <div class="flex justify-between flex-row-reverse">
      <div class="text-right  flex flex-wrap justify-end">
        <el-input
          v-model.trim="queryData.keyword"
          v-filterCharacter
          style="width: 200px"
          class=" mb-10"
          maxlength="32"
          clearable
          :placeholder="$t('SERVICE_NAME') + '/' + $t('SERVICE_CODE')"
          @keyup.enter.native="$debounce(search)"
        />
        <el-button type="primary" class="ml-10 mb-10" @click="$debounce(search)">{{
          $t('QUERY')
        }}</el-button>
      </div>
    </div>
    <TableView
      :table-header="tableHeader"
      :table-data="tableData"
      :page-data="pageData"
      :operate-width="230"
      @operate="operate"
      @pageChange="pageChange"
    />
  </div>
</template>
<script>
  import bizOpenApi from '@/api/oen/BizOpenApi'
  import TableView from '@/components/element-table/TableView'
  const BIZ_LEVEL = {
    'IMPORTANT': '重要',
    'GENERAL': '一般'
  }
  const BIZ_STATUS = {
    'FAULT': '故障',
    'OPEN_FAIL': '开通失败',
    'RESTORE_FAIL': '恢复失败',
    'REDUCTION_FAIL': '还原失败',
    'RETURN_FAIL': '还原失败',
    'OPENING': '开通中',
    'RESTORING': '恢复中',
    'RETURNING': '还原中',
    'RESTORE': '恢复',
    'NORMAL': '正常'
  }
  let searchData = {} // 查询参数 只有点了查询有效
  export default {
    components: {
      TableView
    },
    data() {
      const _this = this
      return {
        pageName: 'manager',
        pageData: {
          page: 1,
          size: 20,
          total: 0
        },
        queryData: {
          keyword: '',
          bizStatus: '',
          startStationIdList: [],
          endStationIdList: [],
          stationIdList: []
        },
        tableHeader: [
          {
            label: 'SERVICE_NAME',
            prop: 'bizName',
            fixed: 'left',
            width: 200,
            configType: 'default'
          },
          {
            label: 'BIZ_LEVEL',
            prop: 'bizLevel',
            sortable: 'custom',
            tips: 'BIZ_LEVEL_TIPS',
            width: 160,
            configType: 'default',
            formatter(row) {
              return BIZ_LEVEL[row.bizLevel]
            }
          },
          {
            label: 'SERVICE_STATUS',
            prop: 'bizStatus',
            width: 120,
            configType: 'default',
            formatter(row) {
              return BIZ_STATUS[row.bizStatus]
            }
          },
          {
            label: 'SERVICE_CODE',
            prop: 'resourceCodeName',
            width: 200,
            tips: 'SERVICE_CODE_TIPS',
            configType: 'extend'
          },
          {
            label: 'A_END_STATION_NAME',
            prop: 'startStationName',
            width: 200
          },
          {
            label: 'ANODE',
            prop: 'startNode.nodeName',
            width: 200
          },
          {
            label: 'A_END_NODE_PORT',
            prop: 'startPortbizName',
            width: 260,
            formatter(row) {
              return row.bizChannelList
                .map(i => (i.startPort ? i.startPort.bizName : ''))
                .join('/')
            }
          },
          {
            label: 'Z_END_STATION',
            prop: 'endStationName',
            width: 200
          },
          {
            label: 'ZNODE',
            prop: 'endNode.nodeName',
            width: 200
          },
          {
            label: 'Z_END_NODE_PORT',
            prop: 'endPortbizName',
            width: 260,
            formatter(row) {
              return row.bizChannelList
                .map(i => (i.endPort ? i.endPort.bizName : ''))
                .join('/')
            }
          },
          {
            label: 'IS_RECOVERY_AUTO',
            prop: 'isAutoRestore',
            width: 150,
            tips: 'IS_RECOVERY_AUTO_TIPS',
            formatter(row) {
              return row.isAutoRestore ? _this.$t('OK_YES') : _this.$t('OK_NO')
            },
            configType: 'extend'
          },
          {
            label: 'LINK_DETECTION',
            prop: 'isOtdrTest',
            width: 170,
            tips: 'LINK_DETECTION_TIPS',
            formatter(row) {
              return row.isOtdrTest ? _this.$t('OK_YES') : _this.$t('OK_NO')
            },
            configType: 'extend'
          },
          {
            label: 'BUCKUP_NUM',
            prop: 'backNumber',
            width: 140,
            tips: 'BUCKUP_NUM_TIPS',
            configType: 'extend'
          },
          {
            label: 'CREATION_TIME',
            prop: 'createTime',
            width: 155,
            sortable: 'custom'
          }
        ],
        tableData: [],
        rowData: {},
        sortData: {
          field: null,
          type: null
        }
      }
    },
    computed: {
      permission() {
        return {
          'open': true,
          'channel': true,
          'mod': true,
          'del': true,
          'restore': true,
          'reduction': true,
          'setFault': true,
          'faultLocation': true,
          'bulkexport': true,
          'allexport': true,
          'otdrtest': true,
          'otdrrecord': true,
          'faultsolved': true
        }
        // return this.$store.getters.getAuthData('biz:manager')
      },
      backupPermission() {
        return {
          'mod': true,
          'bulkexport': true,
          'allexport': true
        }
        // return this.$store.getters.getAuthData('biz:backup')
      }
    },
    methods: {
      operate(data) {
        switch (data.type) {
        case 'view':
          this.operateType = 'view'
          this.rowData = data.data
          this.editShow = true
          break
        case 'editFibre':
          this.rowData = data.data
          this.portInfoVisible = true
          break
        case 'editPath':
          this.rowData = data.data
          this.editCablePathShow = true
          break
        case 'mod':
          this.operateType = 'mod'
          this.rowData = data.data
          this.editShow = true
          break
        case 'del':
          this.del(data.data)
          break
        }
      },
      sortChange(data) {
        this.sortData = data
        this.loadData()
      },
      loadData() {
        const queryData = {
          ...searchData,
          sort: this.sortData.type ? this.sortData : null
        }
        console.log('queryData', queryData)
        queryData.bizStatus = queryData.bizStatus || null
        bizOpenApi.queryPage(queryData, this.pageData).then(res => {
          console.log(res)
          const statusSort = [
            'FAULT',
            'OPEN_FAIL',
            'RESTORE_FAIL',
            'REDUCTION_FAIL',
            'RETURN_FAIL',
            'OPENING',
            'RESTORING',
            'RETURNING',
            'RESTORE',
            'NORMAL'
          ]
          const listData = res.list || []
          listData.forEach(i => {
            const statusIndex = i.bizChannelList.map(z =>
              statusSort.findIndex(j => j === z.bizStatus)
            )
            i.bizStatus = statusSort[Math.min(...statusIndex)]
            i.btns = this.getBtns(i)
          })
          if (!this.sortData.type) {
            // 当前页面数据排序 1根据时间倒序排序2.优先把故障业务排在前面
            listData
              .sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
              .sort((a, b) => {
                a.bizStatus === 'FAULT' ? 1 : 0
                b.bizStatus === 'FAULT' ? 1 : 0
                const aNum = a.bizStatus === 'FAULT' ? 1 : 0
                const bNum = b.bizStatus === 'FAULT' ? 1 : 0
                return bNum - aNum
              })
          }
          this.tableData = listData
          this.pageData.total = res.total
        })
      },
      // 获取操作按钮
      getBtns(row) {
        const unlocked =
          !row.bizChannelList.some(i => i.lockStatus === 'LOCKED')
        this.pageName === 'manager'
        const managerBtn = [
          {
            key: 'channel', // 查看通道
            show: this.pageName === 'manager' && this.permission.channel,
            label: 'CHANNEL'
          },
          {
            key: 'mod', // 修改名称
            show: unlocked && this.permission.mod,
            label: 'MOD'
          },
          {
            key: 'restore', // 恢复
            show:
              unlocked &&
              row.bizChannelList.every(
                i =>
                  i.bizStatus === 'FAULT' ||
                  i.bizStatus === 'REDUCTION_FAIL' ||
                  i.bizStatus === 'RETURN_FAIL'
              ) &&
              this.permission.restore,
            label: 'INTELLIGENCE_RECOVERY'
          },

          {
            key: 'restore', // 重新恢复
            show:
              unlocked &&
              row.bizChannelList.some(i => i.bizStatus === 'RESTORE_FAIL') &&
              this.permission.restore,
            label: 'TO_RESTORE'
          },
          {
            key: 'reduction', // 智能还原
            show:
              unlocked &&
              row.bizChannelList.every(i => i.bizStatus === 'RESTORE') &&
              this.permission.reduction &&
              row.bizLevel === 'IMPORTANT',
            label: 'REDUCTION'
          },
          {
            key: 'otdrTest', // OTDR测试
            show:
              this.pageName === 'manager' &&
              (row.bizChannelList.every(
                i => i.bizStatus === 'RESTORE' || i.bizStatus === 'NORMAL'
              ) ||
                row.bizChannelList.some(i => i.bizStatus === 'FAULT')) &&
              !row.bizChannelList.some(i => i.lockStatus === 'LOCKED') &&
              this.permission.otdrtest,
            label: 'BIZ_FUNC_OTDR_TEST'
          },
          {
            key: 'otdrTestResult', // OTDR测试记录
            show:
              this.pageName === 'manager' &&
              (row.bizChannelList.every(
                i => i.bizStatus === 'RESTORE' || i.bizStatus === 'NORMAL'
              ) ||
                row.bizChannelList.some(i => i.bizStatus === 'FAULT')) &&
              this.permission.otdrrecord,
            label: 'BIZ_FUNC_OTDR_TEST_RESULT'
          },
          {
            key: 'setFault', // 设为故障
            show:
              unlocked &&
              row.bizChannelList.every(
                i => i.bizStatus === 'RESTORE' || i.bizStatus === 'NORMAL'
              ) &&
              this.permission.setFault,
            label: 'SET_FAIL'
          },
          {
            key: 'faultLocation', // 故障定位
            show:
              unlocked &&
              this.permission.faultLocation &&
              row.bizChannelList.every(i => i.bizStatus === 'RESTORE'),
            label: 'FAULT_LOCATION'
          },

          {
            key: 'trouble_solved', // 故障已排除
            show:
              unlocked &&
              row.bizChannelList.every(i => i.bizStatus === 'FAULT') &&
              this.permission.faultsolved,
            label: 'TROUBLE_SOLVED'
          },
          {
            key: 'del', // 删除
            show: unlocked && this.permission.del,
            disabled: row.bizChannelList.some(
              i =>
                i.bizStatus === 'OPENING' ||
                i.bizStatus === 'RESTORING' ||
                i.bizStatus === 'RETURNING' ||
                i.lockStatus === 'LOCKED'
            ),
            label: 'DEL'
          },
          {
            key: 'view', // 查看备用通道
            show: this.pageName === 'backup',
            label: 'VIEW'
          },
          {
            key: 'mod', // 配置备用
            show: this.pageName === 'backup' && this.backupPermission.mod,
            disabled: row.bizChannelList.some(
              i =>
                i.bizStatus === 'OPENING' ||
                i.bizStatus === 'RESTORING' ||
                i.bizStatus === 'RETURNING' ||
                i.bizStatus === 'OPEN_FAIL'
            ),
            label: 'CONFIG'
          }
        ]
        return managerBtn.filter(i => i.show)
      },
      // 关键字搜索
      search() {
        this.pageData.page = 1
        this.queryData.keyword = this.queryData.keyword.trim()
        searchData = { ...this.queryData }
        this.loadData()
      },
      pageChange(data) {
        this.pageData = data
        this.loadData()
      }
    }
  }
</script>
