// 父组件
<template>
  <div class="father">
    <h4>父组件</h4>
    {{ name }}
    <children-item
      ref="childrenItem"
      :user-list="userList"
      :name1="name1"
      :name2="name2"
      @childToFatherData="getData1"
      @grandsonToFatherData="getData2"
    />
    <brother1-item />
    <brother2-item />
    <button @click="changeName">provide通知所有子组件</button>
    <div>
      <el-button type="primary" @click="getChildrenItem">通过$refs获取子组件的值</el-button>
    </div>
    <div>
      <button @click="getChildrenItem2">通过$children获取子组件的值</button>
    </div>
  </div>
</template>
<script>
  import childrenItem from './children' // 引入子组件
  import brother1Item from './brother1'
  import brother2Item from './brother2'
  export default {
    components: {
      childrenItem,
      brother1Item,
      brother2Item
    }, // 调用子组件
    provide() {
      return {
        name3: '江宁城-吴启豪',
        name4: '苏家席掌柜',
        name: this // 将这个组件实例提供给后面的子组件
      }
    },
    data() {
      return {
        userList: ['宁毅', '苏檀儿', '耿护院'], // 传值给子组件
        name: '',
        name1: '苏家二房-苏仲堪',
        name2: '苏家二房-苏文兴'
      }
    },
    methods: {
      getData1(val) {
        this.name = val
      },
      getData2(val) {
        this.name = val
      },
      changeName() {
        this.name = '赘婿学院'
      },
      getChildrenItem() {
        alert(this.$refs.childrenItem.name)
      },
      getChildrenItem2() {
        alert(this.$children[0].name)
      }
    }
  }
</script>
