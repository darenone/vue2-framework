<template>
  <section class="el-menu-wrapper">
    <slot />
    <el-menu
      router
      :mode="mode"
      :collapse="collapsed"
      :collapse-transition="false"
      background-color="#030F30"
      text-color="#FFFFFF"
      active-text-color="#fff"
    >
      <template v-for="(item, index) in navList">
        <el-menu-item
          v-if="!item.children"
          :key="item.name + index"
          :index="item.path"
        >
          <i :class="item.icon" class="pr-10" />
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
        <e-resubmenu
          v-else
          :key="item.name + index"
          :parent="item"
          :index="item.name + index"
        />
      </template>
    </el-menu>
  </section>
</template>
<script>
  import eResubmenu from '_c/element-menu/re-submenu.vue'
  export default {
    components: { eResubmenu },
    props: {
      collapsed: Boolean,
      mode: String
    },
    data() {
      return {
        navList: [],
        isCollapse: true
      }
    },
    mounted() {
      console.log(this.$router.options.routes)
      this.navList = this.loopFun(this.$router.options.routes[1].children, 0, '')
      console.log(this.navList)
    },
    methods: {
      loopFun(list, index, path) {
        const arr = []
        index++
        list.forEach((e) => {
          const pathUrl = path && e.path ? path + '/' + e.path : e.path
          if (e.name) {
            if (e.children) {
              const children = this.loopFun(e.children, index, pathUrl)
              arr.push({
                path: pathUrl,
                name: e.name,
                title: e.meta && e.meta.title,
                icon: e.meta && e.meta.icon,
                children: children,
                level: index
              })
            } else {
              arr.push({
                path: pathUrl,
                name: e.name,
                title: e.meta && e.meta.title,
                icon: e.meta && e.meta.icon,
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
