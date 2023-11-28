<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">{{ $t('HOME') }}</router-link> |
      <router-link to="/about">{{ $t('ABOUT') }}</router-link>
      <el-button type="primary" @click="langSwitch($i18n.locale === 'zh-CN' ? 'en-US' : 'zh-CN')">切换语言</el-button>
    </nav> -->
    <router-view />
  </div>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import { setTitle } from '@/lib/util'
  export default {
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['getLocale', 'getInfo', 'getThemeList'])
    },
    created() {
      setTitle(this.$config.sysName['zh-CN'], this.$config.systemVersion)
      this.loadLanData() // 加载中英文
      // 设置主题
      const theme = localStorage.currentTheme || ''
      if (theme && this.getThemeList.includes(theme)) {
        this.SET_THEME(theme)
        document.body.setAttribute('data-theme', theme)
      } else {
        localStorage.currentTheme = 'dark-theme'
        this.SET_THEME('dark-theme')
        document.body.setAttribute('data-theme', 'dark-theme')
      }
    },
    mounted() {
      console.log(this.$i18n.locale)
      this.$nextTick(() => {
        this.upDateInfo()
      })
    },
    methods: {
      ...mapMutations(['SET_THEME']),
      ...mapActions(['loadLanData', 'upDateInfo']),
      langSwitch(lang) {
        this.$i18n.locale = lang
        this.$store.commit('SETLOCALE', lang)
        localStorage.setItem('lang', lang)
      }
    }
  }
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
