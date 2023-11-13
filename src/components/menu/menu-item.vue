<template>
  <li
    class="a-menu-item"
    :class="{ 'a-menu-item-active': currentNav == uId }"
    @click="handleClick(uId)"
  >
    <slot />
  </li>
</template>
<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'AMenuItem',
    props: {
      uId: {
        type: String
      }
    },
    computed: {
        ...mapState([
            'currentNav'
        ])
    },
    methods: {
        ...mapMutations([
            'SET_CURRENT_NAV'
        ]),
        handleClick(uId) {
            this.SET_CURRENT_NAV(uId)
        }
    }
  }
</script>
<style lang="scss">
.a-menu-item {
    color: hsla(0,0%,100%,.7);
    height: 45px;
    line-height: 45px;
    text-align: left;
    cursor: pointer;
}
.a-menu-item-active {
    background:#363e4f;
    color: #2d8cf0;
    border-right: 2px solid hsla(0,0%,100%,.7);
}
</style>
