<template>
  <div style="width:200px;height:200px;" class="mx-auto">
    <img
      v-if="getTheme === 'dark-theme'"
      class="flex mx-auto"
      :src="require(`@/assets/img/nodata/${imgName}2.png`)"
      alt=""
      style="width: 160px;height:160px;"
      :style="type == 'pie' && {
        'transform':'translateX(12px)'
      }"
    >
    <img
      v-else
      class="flex mx-auto"
      :src="require(`@/assets/img/nodata/${imgName}1.png`)"
      alt=""
      style="width: 160px;height:160px;"
      :style="type == 'pie' && {
        'transform':'translateX(12px)'
      }"
    >
    <div class="text-center nodataText">{{ title || $t('NO_DATA') }}</div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'default'
      }
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters(['getTheme']),
      imgName() {
        switch (this.type) {
        case 'pie':
          return 'pie_nodata'
        case 'line':
          return 'line_nodata'
        case 'bar':
          return 'bar_nodata'
        case 'alarm':
          return 'alarm_nodata'
        default:
          return 'nulldata'
        }
      }
    }

  }

</script>
<style lang='scss' scoped>
@import "@/assets/css/mixin.module.scss";
.nodataText{
  line-height: 20px;
  @include themeify {
    color: themed("nodataText");
  }
}
</style>
