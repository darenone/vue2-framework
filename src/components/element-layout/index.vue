<template>
  <content class="main-content h-100">
    <layout-left v-if="getLayout === 'left'" />
    <layout-top v-if="getLayout === 'top'" />
  </content>
</template>
<script>
  import { mapGetters } from 'vuex'
  import layoutLeft from './components/layout-left.vue'
  import layoutTop from './components/layout-top.vue'
  export default {
    components: {
      layoutLeft,
      layoutTop
    },
    computed: {
    ...mapGetters(['getLayout'])
    },
    data() {
      return {}
    },
    mounted() {
      console.log('宗强')
    },
    methods: {
    }
  }
</script>
