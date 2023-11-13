<template>
  <ul class="a-submenu">
    <!-- 显示标题的地方 -->
    <div
      class="a-submenu-title"
      :style="{'padding-left':`${parent.level * 20}px`}"
      @click="handleClick"
    >
      <slot name="title" />
      <i :class="[showChild ? 'el-icon-caret-bottom' : 'el-icon-caret-left', 'a-submenu-icon']" />
    </div>
    <div v-show="showChild" class="a-submenu-child-box">
      <slot />
    </div>
  </ul>
</template>
<script>
  export default {
    name: 'ASubmenu',
    props: {
      parent: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        showChild: false
      }
    },
    methods: {
      handleClick() {
        this.showChild = !this.showChild
      }
    }
  }
</script>
<style lang="scss">
.a-submenu {
    cursor: pointer;
    &-title {
      color: hsla(0,0%,100%,.7);
      height: 45px;
      line-height: 45px;
      text-align: left;
      user-select: none;
      div {
          display: inline-block;
      }
    }
    &-icon {
      color: hsla(0,0%,100%,.7);
      float: right;
      line-height: 45px;
      margin-right: 20px;
    }
    &-child-box {
      overflow: hidden;
    }
}
</style>
