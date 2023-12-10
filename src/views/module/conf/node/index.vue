<template>
  <div class="h-100">
    节点管理
    <el-button type="primary" @click="confirm">弹出确认框</el-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      confirm() {
        this.$confirm('element-ui确认框', '提示', {
          type: 'error'
        })
          .then(async() => {

          })
          .catch(() => {

          })
      }
    }
  }
</script>
