<template>
  <div class="inline-block columnsConfigure">
    <!-- 配置列图标 -->
    <i class="el-icon-setting pointer" @click="handelShowPop" />
    <!-- 可显示列配置 -->
    <el-dialog
      :title="$t('COLUMNS_CONFIGURATION')"
      :visible.sync="showPop"
      append-to-body
      width="40vw"
      @close="showPop = false"
    >
      <el-checkbox-group v-model="checkedList" class="table-list pl-10">
        <div v-if="requireList.length" class="mb-40">
          <div class="type-title relative">
            <span class="title-span absolute">
              {{ $t('REQUIRED_OPTION') }}
            </span>
          </div>
          <div class="flex flex-wrap">
            <template v-for="item in requireList">
              <span :key="item.label" class="el-checkbox__label">{{ $t(item.label) }}</span>
            </template>
          </div>
        </div>
        <div>
          <div class="type-title relative">
            <span class="title-span absolute">
              {{ $t('OPTIONAL_COLUMNS') }}
            </span>
          </div>
          <template v-for="item in tableHeader.filter(i => !i.configType)">
            <el-checkbox :key="item.prop" :label="item.prop">
              <NameItem :show-size="10" :show-name="$t(item.label)" />
            </el-checkbox>
          </template>
          <template v-for="item in tableHeader.filter(i => i.configType == 'extend')">
            <el-checkbox :key="item.prop" :label="item.prop">
              <NameItem :show-size="10" :show-name="$t(item.label)" />
            </el-checkbox>
          </template>
        </div>
      </el-checkbox-group>
      <template #footer>
        <el-button size="mini" @click="showPop = false">{{ $t('CANCEL') }}</el-button>
        <el-button size="mini" type="primary" @click="changeTable">{{ $t('CONFIRM') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  // import userInfoApi from '@/api/basebiz/UserInfoApi'
  import NameItem from './NameItem'

  export default {
    components: {
      NameItem
    },
    props: {
      // 页面所有显示列
      tableHeader: {
        require: true,
        type: Array,
        default: () => []
      },
      showOptions: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        showPop: false,
        checkedList: [],
        selectedTables: [],
        savedId: null,
        pageName: '',
        defaultList: [],
        requireList: []
      }
    },
    computed: {
      ...mapGetters(['columnsConfigData', 'getUserId'])
    },
    created() {
      this.pageName = 'OEN_' + this.$route.name
      this.getPageColumn()
      this.$emit('change', [...this.defaultList, ...this.checkedList])
    },
    methods: {
      // 获取当前页面可显示列
      getPageColumn() {
        this.defaultList = this.tableHeader.filter(i => i.configType === 'default').map(i => i.prop)
        // 必选显示列
        this.requireList = this.tableHeader.filter(i => i.configType === 'default')
        this.showOptions.sequence &&
          this.requireList.unshift({
            label: 'SEQUENCE',
            configType: 'default'
          })
        this.showOptions.operate &&
          this.requireList.push({
            label: 'OPERATE',
            configType: 'default'
          })
        console.log(this.columnsConfigData)
        const savedData = this.columnsConfigData.find(i => i.viewId === this.pageName)
        if (savedData) {
          this.checkedList = savedData.columns
          this.savedId = savedData.id
        } else {
          this.checkedList = this.tableHeader.filter(i => !i.configType).map(i => i.prop)
        }
      },
      // 弹出表单选择
      handelShowPop() {
        this.getPageColumn()
        this.showPop = true
      },
      // 表单选择确定按钮点击
      changeTable() {
        // userInfoApi
        //   .saveViewConfig({
        //     id: this.savedId,
        //     userId: this.getUserId,
        //     viewId: this.pageName,
        //     columns: this.checkedList
        //   })
        //   .then(res => {
        //     this.$store.dispatch('getViewConfig')
        //     this.$emit('change', [...this.defaultList, ...this.checkedList])
        //     this.showPop = false
        //   })
        this.$emit('change', [...this.defaultList, ...this.checkedList])
        this.showPop = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/css/mixin.module.scss';
  .el-checkbox__label {
    width: 20%;
    padding: 0;
    margin-bottom: 20px;
  }
  .el-checkbox {
    width: 20%;
    margin-right: 0;
  }

  .table-list > .el-checkbox {
    margin: 0 10px;
    width: 130px;
    font-size: 12px;
  }
  .columnsConfigure {
    float: right;
    line-height: 23px;
  }
  .type-title {
    height: 1px;
    margin: 20px 0 30px;
    @include themeify {
      background-color: themed('columnsConfigureTitleBgColor');
    }
    .title-span {
      top: -16px;
      min-width: 110px;
      padding: 0 20px;
      height: 33px;
      font-size: 14px;
      line-height: 33px;
      color: #fff;
      text-align: center;
      -webkit-clip-path: polygon(0% 0%, 90% 0, 100% 50%, 90% 100%, 0% 100%);
      clip-path: polygon(0% 0%, 90% 0, 100% 50%, 90% 100%, 0% 100%);
      @include themeify {
        background-color: themed('columnsConfigureTitleBgColor');
      }
    }
  }
</style>
