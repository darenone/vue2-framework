// 子组件
<template>
  <div class="children">
    <h4>子组件</h4>
    <ul>
      <li v-for="(item, index) in userList" :key="index">{{ item }}</li>
    </ul>
    <button @click="sendData">子组件向父组件传值</button>
    <grandson-vue v-bind="$attrs" v-on="$listeners" />
    <div>{{ name3 }}</div>
    <div>{{ name4 }}</div>
    <div>
      <button @click="getParentName">通过$parent获取父组件里的值</button>
    </div>
  </div>
</template>
<script>
  import grandsonVue from './grandson.vue'
  export default {
    components: { grandsonVue },
    inject: ['name3', 'name4'],
    inheritAttrs: false, // 子组件的顶层标签元素中不会渲染出父组件传递过来的属性，默认是显示的
    props: {
      userList: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        name: '竹记饭庄'
      }
    },
    methods: {
      sendData() {
        this.$emit('childToFatherData', '<<赘婿>>郭麒麟-宋轶')
      },
      getParentName() {
        alert(this.$parent.name1)
      }
    }
  }
</script>
