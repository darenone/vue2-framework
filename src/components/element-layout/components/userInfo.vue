<template>
  <div>
    <el-menu
      ref="topNavMenu"
      background-color="#030F30"
      text-color="#FFFFFF"
      active-text-color="#fff"
      mode="horizontal"
      unique-opened
      :default-active="$route.path"
      router
      class="flex justify-end"
    >
      <el-submenu index="user" popper-class="user-menu">
        <template #title>
          <div>
            <el-avatar size="small" :src="require('@/assets/img/default_avatar.png')" />
            <span class="user-name"> admin </span>
          </div>
        </template>
        <el-menu-item @click="iconShow = !iconShow">ICON图标</el-menu-item>
        <el-submenu
          index="menu"
          :popper-append-to-body="true"
          popper-class="user-menu"
        >
          <template #title>布局方式</template>
          <el-menu-item @click="SET_LAYOUT('left')">左右布局</el-menu-item>
          <el-menu-item @click="SET_LAYOUT('top')">上下布局</el-menu-item>
        </el-submenu>
        <el-submenu
          index="tab"
          :popper-append-to-body="true"
          popper-class="user-menu"
        >
          <template #title>导航模式</template>
          <el-menu-item @click="SET_TABTYPE('')">默认隐藏</el-menu-item>
          <el-menu-item @click="SET_TABTYPE('breadcrumb-nav')">面包屑导航</el-menu-item>
          <el-menu-item @click="SET_TABTYPE('tab-nav')">TAB导航</el-menu-item>
        </el-submenu>
        <el-submenu
          index="lang"
          :popper-append-to-body="true"
          popper-class="user-menu"
        >
          <template #title>语言</template>
          <el-menu-item>中文</el-menu-item>
          <el-menu-item>英文</el-menu-item>
        </el-submenu>
        <el-submenu
          index="themes"
          :popper-append-to-body="true"
          popper-class="user-menu"
        >
          <template #title>主题颜色</template>
          <el-menu-item @click="setThemeFn('dark-theme')">默认主题</el-menu-item>
          <el-menu-item @click="setThemeFn('green-theme')">绿色主题</el-menu-item>
          <el-menu-item @click="setThemeFn('blue-theme')">蓝色主题</el-menu-item>
          <el-menu-item @click="setThemeFn('red-theme')">红色主题</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
    <icon v-if="iconShow" :dialog-visible.sync="iconShow" />
  </div>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  import icon from '_c/icon'
  export default {
    components: { icon },
    data() {
      return {
        iconShow: false
      }
    },
    computed: {
    ...mapGetters(['getLayout'])
    },
    mounted() {
      console.log('hello')
    },
    methods: {
      ...mapMutations(['SET_LAYOUT', 'SET_TABTYPE', 'SET_THEME']),
      setThemeFn(themeName) {
        themeName = themeName.toLowerCase().replace('_', '-')
        // console.log(themeName)
        localStorage.currentTheme = themeName
        this.SET_THEME(themeName)
        document.body.setAttribute('data-theme', themeName)
      }
    }
  }
</script>
<style lang="scss" scoped>
.user-name {
  margin-left: 5px;
  display: inline-block;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.license-expires {
  position: absolute;
  color: red;
  top: 25px;
  font-size: 10px;
}
</style>
