<template>
  <div class="flex-column flex-1 h-1">
    <el-table
      ref="tableBox"
      :data="tableData"
      row-key="id"
      height="100%"
      class="table-view"
      :cell-class-name="cellClass"
      :cell-style="cellStyle"
      :default-expand-all="showOptions.expandAll"
      @sort-change="sortChange"
      @selection-change="selectionChange"
    >
      <template slot="empty">
        <NullData />
      </template>
      <el-table-column v-if="showOptions.seletion" type="selection" width="50" fixed="left" />
      <el-table-column
        v-if="showOptions.sequence"
        type="index"
        :label="$t('SEQUENCE')"
        :width="resetSize(60)"
        align="center"
        fixed="left"
      >
        <template slot-scope="scope">
          {{ pageData.size * (pageData.page - 1) + scope.$index + 1 }}
        </template>
      </el-table-column>
      <template v-for="i in tableHeader">
        <el-table-column
          v-if="
            selectedTables.includes(i.prop) ||
              (!showOptions.configure && i.configType !== 'extend') ||
              !showOptions.operate
          "
          :key="i.prop"
          :label="$t(i.label)"
          :prop="i.prop"
          :min-width="i.width"
          :sortable="i.sortable"
          :formatter="i.formatter"
          :align="i.align || 'left'"
          :fixed="i.fixed"
          show-overflow-tooltip
        >
          <template slot="header">
            <span>{{ $t(i.label) }}</span>
            <el-popover v-if="i.tips" width="200" trigger="hover">
              <div class="text-color" v-html="$t(i.tips)" />
              <i
                slot="reference"
                class="iconfont icon-AFSwenhao text-color ml-5 font-weight-normal"
              />
            </el-popover>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        v-if="showOptions.operate"
        class-name="operate-cell"
        :width="resetSize(operateWidth)"
        :label="$t('OPERATE')"
        fixed="right"
        align="left"
      >
        <template slot="header">
          <span>{{ $t('OPERATE') }}</span>
          <columns-configure
            v-if="showOptions.configure"
            :table-header="tableHeader"
            :show-options="showOptions"
            @change="columnsChange"
          />
        </template>
        <template v-if="scope.row.btns" slot-scope="scope">
          <template v-for="(btn, index) in scope.row.btns">
            <el-button
              v-if="index < 3 || (index === 3 && scope.row.btns.length === 4)"
              :key="btn.label"
              :disabled="btn.disabled"
              type="text"
              size="mini"
              @click="operate(scope.row, btn.key)"
            >{{ $t(btn.label) }}</el-button>
          </template>
          <el-dropdown
            v-if="scope.row.btns.length > 4"
            trigger="click"
            class="el-button el-button--text font-mini"
          >
            <span class="el-dropdown-link">
              {{ $t('MORE_OPERATE') }}<i class="el-icon-arrow-down" />
            </span>
            <el-dropdown-menu slot="dropdown" class="el-select-dropdown">
              <el-dropdown-item v-for="(btn, index) in scope.row.btns" :key="btn.label">
                <el-button
                  v-if="index >= 3"
                  :key="btn.label"
                  :disabled="btn.disabled"
                  type="text"
                  size="mini"
                  @click="operate(scope.row, btn.key)"
                >{{ $t(btn.label) }}</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="showOptions.pagination"
      class="mt-10 text-right"
      layout="total, sizes, prev, pager, next, jumper"
      background
      :current-page="pageData.page"
      :page-size="pageData.size"
      :total="pageData.total"
      @size-change="sizeChange"
      @current-change="currentChange"
    />
  </div>
</template>

<script>
  import { deepClone } from '@/lib/tool'
  import ColumnsConfigure from './ColumnsConfigure'

  export default {
    components: {
      ColumnsConfigure
    },
    props: {
      tableHeader: {
        type: Array,
        default: () => []
      },
      tableData: {
        type: Array,
        default: () => []
      },
      pageData: {
        type: Object,
        default: () => {
          return {
            page: 1,
            size: 20,
            total: 0
          }
        }
      },
      cellClass: {
        type: Function,
        default: null
      },
      cellStyle: {
        type: Function,
        default: null
      },
      operateWidth: {
        type: [String, Number],
        default: '80'
      },
      expandAll: {
        type: Boolean,
        default: false
      },
      options: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        selectedTables: []
      }
    },
    computed: {
      showOptions() {
        const options = {
          configure: true,
          operate: true,
          seletion: false,
          pagination: true,
          sequence: true,
          expandAll: false
        }
        return { ...options, ...this.options }
      }
    },
    created() {
      this.resetSizeFn()
    },
    activated() {
      this.resetSizeFn()
      window.addEventListener('resize', this.resetSizeFn)
    },
    deactivated() {
      window.removeEventListener('resize', this.resetSizeFn)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resetSizeFn)
    },
    methods: {
      sortChange({ prop, order }) {
        const typeEnum = {
          ascending: 'ASC',
          descending: 'DESC'
        }
        const fieldEnum = {
          bizLevel: 'BIZ_LEVEL',
          bizStatus: 'BIZ_STATUS',
          createTime: 'CREATE_TIME',
          gapDay: 'GAP_DAY',
          lastTestTime: 'LAST_TEST_TIME',
          nextTestTime: 'NEXT_TEST_TIME',
          startDate: 'START_DATE',
          endDate: 'END_DATE',
          nodeType: 'NODE_TYPE'
        }
        const sortData = {
          field: fieldEnum[prop] || null,
          type: typeEnum[order] || null
        }
        this.$emit('sortChange', sortData)
      },
      // 按钮操作
      operate(row, type) {
        const operateData = {
          data: deepClone(row),
          type: type
        }
        this.$emit('operate', operateData)
      },
      selectionChange(val) {
        this.$emit('selectionChange', deepClone(val))
      },
      // 显示列更改
      columnsChange(data) {
        this.selectedTables = [...data]
        this.$nextTick(() => {
          this.$refs.tableBox.doLayout()
        })
      },
      sizeChange(size) {
        const pageData = {
          ...this.pageData,
          size: size
        }
        this.$emit('pageChange', pageData)
      },
      currentChange(page) {
        const pageData = {
          ...this.pageData,
          page: page
        }
        this.$emit('pageChange', pageData)
      },
      resetSizeFn() {
        this.$nextTick(() => {
          this.$refs.tableBox && this.$refs.tableBox.doLayout()
        })
      },
      clearSelection() {
        this.$refs.tableBox.clearSelection()
      }
    }
  }
</script>
<style lang="scss">
  @import '@/assets/css/mixin.module.scss';

  .table-view {
    th.operate-cell {
      width: auto !important;
      .cell {
        width: auto;
        // white-space: nowrap;
        overflow: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }

    .color-fault .cell {
      @include themeify {
        color: themed('bizFault');
      }
    }

    .color-doing .cell {
      @include themeify {
        color: themed('bizDoing');
      }
    }

    .color-normal .cell {
      @include themeify {
        color: themed('bizNormal');
      }
    }
  }
</style>
