// 兄弟组件2
<template>
  <div class="brother2">
    <h4>兄弟组件2</h4>
    <p>{{ value }}</p>
    <div>{{ name3 }}</div>
    <div>{{ name4 }}</div>
  </div>
</template>
<script>
  export default {
    inject: ['name3', 'name4'],
    data() {
      return {
        value: null
      }
    },
    mounted() {
      this.$bus.$on('sendData', val => { // 接收
        console.log(val)
        this.value = val
      })
    },
    methods: {
    }
  }
</script>
