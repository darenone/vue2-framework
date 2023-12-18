<template>
  <div class="cable-name">
    <div v-if="showName.length <= showSize" class="text-color line-height-40">
      {{ showName }}
    </div>
    <el-tooltip v-else placement="top" :content="showName">
      <div class="text-color line-height-40">
        {{ omissionPortName(showName) }}
      </div>
    </el-tooltip>
  </div>
</template>
<script>
  export default {
    props: {
      showName: {
        required: true,
        type: String,
        default: ''
      },
      showSize: {
        type: Number,
        default: 4
      },
      type: {
        type: String,
        default: ''
      }
    },
    data() {
      return {}
    },
    computed: {},
    created() {},
    methods: {
      omissionPortName(bizName) {
        const subStr = bizName.substr(0, this.showSize)
        return bizName.length > this.showSize ? subStr + '...' : subStr
      }
    }
  }
</script>
<style lang="scss" scoped>
  .line-height-40 {
    line-height: 40px;
    white-space: nowrap;
  }
</style>
