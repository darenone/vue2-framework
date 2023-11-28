<template>
  <transition name="move" mode="out-in">
    <keep-alive exclude="Home">
      <router-view />
    </keep-alive>
  </transition>
</template>
<script>
  export default {
    name: 'Layout'
  }
</script>
