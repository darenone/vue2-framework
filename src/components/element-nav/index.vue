<template>
  <div>
    <template v-if="getTabsType == 'breadcrumb-nav'">
      <el-breadcrumb class="breadcrumb-nav flex align-center pl-20 pr-20" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{name:'HOME'}">{{ $t('HOME') }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.meta && $route.meta.parent">{{ $t($route.meta.parent) }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.name && $route.name != 'HOME'">{{ $t($route.name) }}</el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <template v-if="getTabsType == 'tab-nav'">
      <el-tabs v-model="editableTabsValue" class="tabs-nav" type="card" @tab-remove="removeTab" @tab-click="navTo">
        <el-tab-pane
          v-for="item in getActivedTabs"
          :key="item.name"
          :closable="item.name != 'HOME'"
          :label="$t(item.name)"
          :name="item.name"
        />
      </el-tabs>
    </template>
  </div>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        editableTabsValue: this.getCurrentTab,
        curRoute: 'HOME'
      }
    },
    computed: {
      ...mapGetters(['getActivedTabs', 'getCurrentTab', 'getTabsType'])
    },
    watch: {
      getCurrentTab: {
        handler(newval, oldval) {
          this.editableTabsValue = newval
        },
        immediate: true
      },
      $route: {
        handler(newval, oldval) {
          this.curRoute = newval.name
        },
        immediate: true
      }
    },
    methods: {
      ...mapMutations(['DEL_TABS']),
      navTo(val) {
        // console.log(val, this.$route)
        if (val.name !== this.$route.name) {
          this.$router.push({ name: val.name })
        }
      },
      removeTab(targetName) {
        const tabs = this.getActivedTabs
        let activeName = this.editableTabsValue
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              const nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
          this.editableTabsValue = activeName
          this.$router.push({ name: activeName })
        }
        const itemIndex = tabs.findIndex((tab) => tab.name === targetName)
        this.$store.commit('DEL_TABS', itemIndex)
      }
    }
  }
</script>
<style lang="scss" scoped>
@import '@/assets/css/mixin.module.scss';
.breadcrumb-nav{
  height: 41px;
}
.tabs-nav {
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
</style>
