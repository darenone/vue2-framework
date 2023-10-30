<template>
  <section>
    <h3>苹果</h3>
    <div>{{ $store.state.menuType }}</div>
    <button @click="setMenuType()">修改menuType的值</button>
    <div>{{ $store.state.info.info.name }}</div>
    <button @click="setInfo()">修改info的值</button>
    <div>{{ $store.state.user.userName }}</div>
    <button @click="setUserName()">修改userName的值</button>
  </section>
</template>
<script>
  import { mapMutations } from 'vuex'
  export default {
    data() {
      return {
        num: 1
      }
    },
    methods: {
      ...mapMutations([
        'SET_MENU_TYPE',
        'SET_INFO'
      ]),
      ...mapMutations('user', [
            'SET_USER_NAME'
        ]),
    setMenuType() {
      this.SET_MENU_TYPE(this.num++)
    },
    setInfo() {
      this.SET_INFO({ name: '田耕纪-连蔓儿-田曦薇' })
    },
    setUserName() {
      this.SET_USER_NAME('卿卿日常-李薇-田曦薇')
    }
    }
  }
</script>
