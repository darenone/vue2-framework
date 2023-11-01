// 兄弟组件1
<template>
  <div class="brother1">
    <h4>兄弟组件1</h4>
    <button @click="sendData">想兄弟组件2传值</button>
    <div>{{ name.name }}</div>
  </div>
</template>
<script>
  export default {
    inject: {
      name: {
        default: () => ({})
      }
    },
    data() {
      return {

      }
    },
    methods: {
      sendData() {
        this.$bus.$emit('sendData', '苏氏布行') // 发送
      }
    }
  }
</script>
