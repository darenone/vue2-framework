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
  let searchData = {} // 查询参数 只有点了查询有效
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
        rowData: {},
        sortData: {
          field: null,
          type: null
        }
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
        })
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
