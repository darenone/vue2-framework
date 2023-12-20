<template>
  <div class="flex-column">
    <div class="flex justify-between flex-row-reverse" />
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
  import TableView from '@/components/element-table/TableView'
  const searchData = {} // 查询参数 只有点了查询有效
  export default {
    components: {
      TableView
    },
    data() {
      const _this = this
      return {
        pageData: {
          page: 1,
          size: 20,
          total: 0
        },
        queryData: {
          keyword: '',
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
              return row.bizLevel
            }
          },
          {
            label: 'SERVICE_STATUS',
            prop: 'bizStatus',
            width: 120,
            configType: 'default',
            formatter(row) {
              return row.bizStatus
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
        rowData: {}
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
      loadData() {
        const queryData = {
          ...searchData,
          ...{ page: this.pageData }
        }
        console.log('queryData', queryData)
        // cableApi.queryPage(queryData).then(res => {
        //   const list = res.list || []
        //   this.reload(list)
        //   console.log('this.tableData', this.tableData)
        //   this.pageData.total = res.total
        // })
      },
      pageChange(data) {
        this.pageData = data
        this.loadData()
      }
    }
  }
</script>
