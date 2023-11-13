<template>
  <div class="content">
    <div class="content-left">
      <a-menu>
        <template v-for="(item, index) in navList">
          <a-menu-item
            v-if="!item.children"
            :key="`menu_item_${index}`"
            :u-id="`menu_${item.title}_${index}`"
            :style="{'padding-left':`${item.level * 20}px`}"
          >
            <router-link :to="item.path">{{ item.title }}</router-link>
          </a-menu-item>
          <re-submenu v-else :key="`menu_item_${index}`" :parent="item" :index="index" />
        </template>
      </a-menu>
    </div>
    <div class="content-right">
      <router-view />
    </div>
  </div>
</template>
<script>
  import menuComponents from '_c/menu'
  const { AMenu, AMenuItem } = menuComponents
  import ReSubmenu from '_c/menu/re-submenu.vue'
  export default {
    components: {
      AMenu,
      AMenuItem,
      ReSubmenu
    },
    data() {
      return {
        navList: []
      }
    },
    mounted() {
      this.navList = this.loopFun(this.$router.options.routes, 0, '')
    },
    methods: {
      loopFun(list, index, path) {
        const arr = []
        index++
        list.forEach(e => {
          const pathUrl = path && e.path ? path + '/' + e.path : e.path
          if (e.name) {
            if (e.children) {
              const children = this.loopFun(e.children, index, pathUrl)
              arr.push({
                path: pathUrl,
                title: e.name,
                children: children,
                level: index
              })
            } else {
              arr.push({
                path: pathUrl,
                title: e.name,
                level: index
              })
            }
          }
        })
        return arr
      }
    }
  }
</script>
<style lang="scss" scoped>
.content {
    width: 100%;
    height: 100%;
    display: flex;
    &-left {
        width: 200px;
        height: 100%;
        background: #42b983;
        overflow: hidden;
        overflow-y: auto;
    }
    &-right {
        flex: 1;
        background: palegoldenrod;
    }
}
</style>
