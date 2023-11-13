<template>
  <div class="a-menu">
    <slot />
  </div>
</template>
<script>
  export default {
    name: 'AMenu'
  }
</script>
<style lang="scss">
.a-menu {
    background: #515a6e;
    & * {
        list-style: none;
    }
    ul {
        padding: 0;
        margin: 0;
    }
}
</style>
