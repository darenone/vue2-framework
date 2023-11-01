// 孙组件
<template>
  <div class="children">
    <h4>孙组件</h4>
    <div>{{ name1 }}</div>
    <div>{{ name2 }}</div>
    <button @click="sendData">孙组件向父组件传值</button>
  </div>
</template>
<script>
  export default {
    inheritAttrs: true,
    props: ['name1', 'name2'],
    data() {
      return {

      }
    },
    methods: {
      sendData() {
        this.$emit('grandsonToFatherData', '苏家长子-苏伯庸')
      }
    }
  }
</script>
