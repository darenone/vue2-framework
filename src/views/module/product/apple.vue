<template>
  <section>
    <h3>苹果</h3>
    <section>
      <div>{{ $store.state.menuType }}</div>
      <button @click="setMenuType()">修改menuType的值</button>
    </section>
    <section>
      <div>{{ $store.state.info.info.name }}</div>
      <button @click="setInfo()">修改info的值</button>
    </section>
    <section>
      <div>{{ $store.state.user.userName }}</div>
      <button @click="setUserName()">修改userName的值</button>
    </section>
    <section>
      <button @click="getMenuList">异步获取菜单list</button>
      <ul>
        <li v-for="(item, index) in menuList" :key="index">{{ item.name }}</li>
      </ul>
    </section>
    <section>
      <button @click="updateUserName">异步获取userName</button>
      <p>{{ getUserName }}</p>
    </section>
    <section>
      <button @click="updateInfo">异步获取info的值</button>
      <p>{{ getInfo.name }}</p>
    </section>
  </section>
</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  export default {
    data() {
      return {
        num: 1
      }
    },
    computed: {
      ...mapState([
        'menuList'
      ]),
      ...mapGetters([
        'getInfo'
      ]),
      ...mapGetters('user', [
        'getUserName'
      ])
    },
    methods: {
      ...mapMutations([
        'SET_MENU_TYPE',
        'SET_INFO'
      ]),
      ...mapMutations('user', [
            'SET_USER_NAME'
      ]),
      ...mapActions([
        'updateMenuList',
        'upDateInfo'
      ]),
      ...mapActions('user', [
        'upDateUserName'
      ]),
      setMenuType() {
        this.SET_MENU_TYPE(this.num++)
      },
      setInfo() {
        this.SET_INFO({ name: '田耕纪-连蔓儿-田曦薇' })
      },
      setUserName() {
        this.SET_USER_NAME('卿卿日常-李薇-田曦薇')
      },
      getMenuList() {
        // this.$store.dispatch('updateMenuList')
        this.updateMenuList()
      },
      updateUserName() {
        // this.$store.dispatch('user/upDateUserName')
        this.upDateUserName()
      },
      updateInfo() {
        // this.$store.dispatch('upDateInfo')
        this.upDateInfo()
      }
    }
  }
</script>
