// 左右布局
<template>
  <el-container class="main-layout h-100">
    <el-aside :width="asideWidth" style="background-color: #030f30">
      <e-menu :collapsed="collapsed" :mode="'vertical'">
        <div
          class="main-logo flex justify-center align-center"
          :class="mainLogo"
        />
      </e-menu>
    </el-aside>
    <el-container>
      <el-header
        class="flex justify-between align-center"
        style="background-color: #030f30"
      >
        <i
          :class="triggerClasses"
          style="font-size: 32px; cursor: pointer"
          @click="handleCollapsed"
        />
        <div class="userinfo flex align-center justify-between pb-10" style="min-width: 120px">
          <userInfo />
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import userInfo from './userInfo.vue'
  import eMenu from '_c/element-menu/a-menu.vue'
  export default {
    components: {
      userInfo,
      eMenu
    },
    data() {
      return {
        collapsed: false, // 默认展开
        asideWidth: '200px'
      }
    },
    computed: {
      triggerClasses() {
        return this.collapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold'
      },
      mainLogo() {
        return this.collapsed ? 'main-logo-collapsed' : 'main-logo-uncollapsed'
      }
    },
    mounted() {
      console.log('菜单')
    },
    methods: {
      handleCollapsed() {
        this.collapsed = !this.collapsed
        this.collapsed ? (this.asideWidth = '60px') : (this.asideWidth = '200px')
      }
    }
  }
</script>
<style lang="scss" scoped>
.main-layout {
  .main-logo {
    height: 60px;
    background: url("./../../../assets/img/logo.png") no-repeat;
    background-size: inherit;
  }
  .main-logo-uncollapsed {
    background-position: center center;
  }
  .main-logo-collapsed {
    background-position: 0 center;
  }
}
.el-header {
  background-color: #242f42;
  color: #ffffff;
  line-height: 60px;
  padding: 0;
  overflow: hidden;
}
.el-main {
  flex-basis: 0px;
  padding:0;
  overflow: hidden;
  height: calc(100vh - 78px);
  display: flex;
  flex-direction: column;
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: 100%;
}
</style>
