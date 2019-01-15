<template>
<transition name="slide">
  <slot></slot>
</transition>
</template>

<script>
  export default {}
</script>

<style lang="stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease-in-out

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)

</style>
