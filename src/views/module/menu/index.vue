<template>
  <div class="menu-box">
    <a-menu>
      <template v-for="(item, index) in navList">
        <a-menu-item
          v-if="!item.children"
          :key="`menu_item_${index}`"
          :u-id="`menu_${item.title}_${index}`"
          :style="{'padding-left': `${item.level * 20}px`}"
        >{{ item.title }}</a-menu-item>
        <re-submenu v-else :key="`menu_item_${index}`" :parent="item" :index="index" />
      </template>
    </a-menu>
  </div>
</template>
<script>
  import menuComponents from '_c/menu'
  import ReSubmenu from '_c/menu/re-submenu.vue'
  const { AMenu, AMenuItem } = menuComponents
  export default {
    name: 'MenuPage',
    components: {
      AMenu,
      AMenuItem,
      ReSubmenu
    },
    data() {
      return {
        navList: [
          {
            title: '1',
            level: 1 // 为了设置不同级别菜单的padding-left值
          },
          {
            title: '2',
            level: 1
          },
          {
            title: '3',
            level: 1,
            children: [
              {
                title: '3-1',
                level: 2
              },
              {
                title: '3-2',
                level: 2
              },
              {
                title: '3-3',
                level: 2,
                children: [
                  {
                    title: '3-3-1',
                    level: 2
                  },
                  {
                    title: '3-3-2',
                    level: 2
                  },
                  {
                    title: '3-3-3',
                    level: 3,
                    children: [
                      {
                        title: '3-3-3-1',
                        level: 4
                      },
                      {
                        title: '3-3-3-2',
                        level: 4
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  }
</script>
<style lang="scss">
.menu-box {
    width: 200px;
}
</style>
