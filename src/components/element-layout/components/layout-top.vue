// 上下布局
<template>
  <el-container class="main-layout h-100">
    <el-header
      class="flex justify-between align-center"
      style="background-color: #030f30"
    >
      <div
        style="min-width: 200px"
        class="main-logo flex justify-center align-center"
      />
      <div class="top-nav relative pl-20 pr-20 flex-1">
        <span class="arrow-left absolute">
          <i
            v-if="!around"
            class="el-icon-arrow-left arrow"
            @click="arrowLeft"
          />
        </span>
        <span class="arrow-right absolute">
          <i
            v-if="!around"
            class="el-icon-arrow-right arrow"
            @click="arrowRight"
          />
        </span>
        <div class="w-100 overflow-hidden">
          <div
            ref="headerMenu"
            class="main-nav-scroll flex flex-1 justify-center align-center w-100"
          >
            <e-menu ref="topNavMenu" :mode="'horizontal'" />
          </div>
        </div>
      </div>
      <userInfo style="min-width: 200px" />
    </el-header>
    <el-main class="flex flex-column">
      <div>
        <template v-if="getTabType == 'breadcrumb-nav'">
          <el-breadcrumb
            class="breadcrumb-nav flex align-center pl-20 pr-20"
            separator-class="el-icon-arrow-right"
          >
            <el-breadcrumb-item :to="{ name: 'HOME' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="$route.meta && $route.meta.parent">{{
              $route.meta.parent
            }}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="$route.name && $route.name != 'HOME'">{{
              $route.name
            }}</el-breadcrumb-item>
          </el-breadcrumb>
        </template>
        <template v-if="getTabType == 'tab-nav'">
          <el-tabs
            v-model="editableTabsValue"
            class="tabs-nav"
            type="card"
          >
            <el-tab-pane
              v-for="item in getActivedTabs"
              :key="item.name"
              :closable="item.name != 'HOME'"
              :label="item.name"
              :name="item.name"
            />
          </el-tabs>
        </template>
      </div>
      <div class="pl-10 pr-10 pb-10 flex flex-1">
        <keep-alive include="Home">
          <router-view />
        </keep-alive>
      </div>
    </el-main>
  </el-container>
</template>
<script>
  import { mapGetters } from 'vuex'
  import BetterScroll from 'better-scroll'
  import userInfo from './userInfo.vue'
  import eMenu from './../../element-menu/a-menu.vue'
  export default {
    components: {
      userInfo,
      eMenu
    },
    data() {
      return {
        bs: null,
        around: true,
        tmpOffsetWidth: 0,
        editableTabsValue: this.getCurrentTab
      }
    },
    computed: {
    ...mapGetters(['getTabType', 'getActivedTabs'])
    },
    watch: {
      getCurrentTab: {
        handler(newval, oldval) {
          this.editableTabsValue = newval
        },
        immediate: true
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initBs()
      })
      this.Timer = null
      this.getScale()
      window.addEventListener('resize', this.getScale)
    },
    beforeDestroy() {
      if (this.Timer) clearTimeout(this.Timer)
      window.removeEventListener('resize', this.getScale)
    },
    methods: {
      initBs() {
        this.$nextTick(() => {
          this.bs = new BetterScroll(this.$refs.headerMenu, {
            scrollX: true,
            scrollY: false,
            mouseWheel: true
          })
          const menuItems = Array.from(
            this.$refs.topNavMenu.$el.children[0].children
          )
          if (menuItems.length) {
            this.tmpOffsetWidth = menuItems.reduce((curr, next) => {
              return curr + next.offsetWidth
            }, 0)
            this.$refs.topNavMenu.$el.children[0].style.width = `${
              this.tmpOffsetWidth + 10
            }px`
          }
          this.bs.refresh()
        })
      },
      arrowLeft() {
        this.bs.scrollTo(this.bs.minScrollX, 0, 300)
      },
      arrowRight() {
        this.bs.scrollTo(this.bs.maxScrollX, 0, 300)
      },
      getScale() {
        clearTimeout(this.Timer)
        this.Timer = setTimeout(() => {
          const ww = document.querySelector('.main-nav-scroll').offsetWidth
          if (ww < this.tmpOffsetWidth) {
            this.around = false
          } else {
            this.around = true
          }
        }, 500)
      }
    }
  }
</script>
<style lang="scss" scope>
.main-layout {
  .main-logo {
    height: 60px;
    background: url("./../../../assets/img/logo.png") no-repeat;
    background-size: inherit;
    background-position: center center;
  }
}
.top-nav {
  overflow: hidden;
  .arrow-left,
  .arrow-right {
    height: 60px;
    line-height: 60px;
    top: 0;
    z-index: 100;
    .arrow {
      cursor: pointer;
      color: #fff;
    }
  }
  .arrow-left {
    left: 0;
  }
  .arrow-right {
    right: 0;
  }
  .main-nav-scroll {
    .el-menu-wrapper {
      .el-menu--horizontal {
        display: flex;
      }
    }
  }
}
</style>
