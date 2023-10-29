// 电脑专区
<template>
  <section>
    <h3>我是电脑页</h3>
  </section>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {

      }
    },
    computed: {
      ...mapState([
        'menuType',
        'info'
      ]),
      ...mapState({
          userName: state => state.user.userName
        })
    },
    mounted() {
      console.log(this.$store.state.user.userName)
      console.log(this.$store.getters['user/getUserName'])
      console.log(this.menuType)
      console.log(this.info)
      console.log(this.userName)
    },
    methods: {

    }
  }
</script>
