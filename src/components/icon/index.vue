<template>
  <el-dialog
    v-el-drag-dialog
    width="50%"
    title="选择图标"
    :visible="dialogVisible"
    @close="close"
  >
    <el-tabs>
      <el-tab-pane label="基础图标">
        <div style="display: flex; flex-wrap: wrap">
          <div
            v-for="item in baseIcons"
            :key="item.icon"
            :class="`iconfont icon-item${
              item == form.icon ? ' icon-item-active' : ''
            }`"
            style="width: 7%"
            @click="iconClick(item)"
          >
            <i :class="item" style="font-style: normal" />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="更多图标">
        <div style="display: flex; flex-wrap: wrap">
          <div
            v-for="(item, index) in moreIcons"
            :key="index"
            :class="`icon-item${item == form.icon ? ' icon-item-active' : ''}`"
            @click="iconClick(item)"
          >
            <i :class="item" />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div slot="footer" class="flex justify-between align-center">
      <el-input v-model="form.icon" style="width: 30%" />
      <div>
        <el-button @click="close">取消</el-button>
        <el-button @click="close">确认</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
  import { elicons } from '@/assets/js/elementui/icons'
  import { fontawesomeIcons } from '@/assets/js/elementui/fontawesome'
  export default {
    props: {
      dialogVisible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        form: {
          icon: 'el-icon-delete-solid'
        }
      }
    },
    computed: {
      baseIcons() {
        return elicons
      },
      moreIcons() {
        return fontawesomeIcons
      }
    },
    methods: {
      close() {
        this.$emit('update:dialogVisible', false)
      },
      iconClick(icon) {
        console.log(icon)
        this.form.icon = icon
      }
    }
  }
</script>
<style lang="scss" scoped>
.icon-item {
  padding: 20px;
  font-size: 24px;
  cursor: pointer;
}
.icon-item:hover {
  transform: scale(1.5);
  transition: all 0.2s;
}
.icon-item-active {
  transform: scale(1.5);
  color: #409eff;
}
</style>
