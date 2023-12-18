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
            label: 'CABLE_NAME',
            prop: 'cableName',
            width: '150',
            fixed: 'left',
            configType: 'default'
          },
          {
            label: 'A_END_STATION_NAME',
            prop: 'startStationName',
            width: '150'
          },
          {
            label: 'A_END_ROOM_NAME',
            prop: 'startRoomName',
            configType: 'extend'
          },
          {
            label: 'Z_END_STATION_NAME',
            prop: 'endStationName'
          },
          {
            label: 'Z_END_ROOM_NAME',
            prop: 'endRoomName',
            configType: 'extend'
          },
          {
            label: 'CABLE_LEVEL',
            prop: 'cableLevelText'
          },
          {
            label: 'CABLE_TYPE',
            prop: 'cableTypeText',
            width: '100'
          },
          {
            label: 'CABLE_SPE',
            prop: 'cableNormText'
          },
          {
            label: 'FIBER_CORE_TYPE',
            prop: 'fiberTypeText'
          },
          {
            label: 'RESOURCE_CODE',
            prop: 'resourceCode',
            tips: 'RESOURCE_CODE_TIPS',
            width: '100'
          },
          {
            label: 'VENDOR',
            prop: 'company',
            configType: 'extend'
          },
          {
            label: 'BRAND',
            prop: 'brand',
            configType: 'extend'
          },
          {
            label: 'CABLE_MODEL',
            prop: 'model',
            configType: 'extend'
          },
          {
            label: 'NOMINAL_CAPACITY',
            prop: 'capacity'
          },
          {
            label: 'NUMBER_CONNECTED',
            prop: 'connNum',
            configType: 'extend'
          },
          {
            label: 'NUMBER_TAKEUP',
            prop: 'occupyNum',
            configType: 'extend'
          },
          {
            label: 'NUMBER_IDLE',
            prop: 'idleNum',
            configType: 'extend'
          },
          {
            label: 'CABLE_LENGTH',
            prop: 'cableLength',
            width: '130'
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
