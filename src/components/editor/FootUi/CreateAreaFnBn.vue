<template>
  <div class="create-bn flex-center">
    <!-- TODO:流程未完成 -->
    <div @pointerup.stop="$emit('press', 'sope')">01</div>
    <div @pointerup.stop="$emit('press', 'area')">02</div>
  </div>
</template>
<script>
export default {
  name: 'CreateAreaFnBn',
  props: ['step'],
  data() {
    return {}
  },
}
</script>
<style lang="postcss" scoped>
.create-bn {
  width: 340px;
  height: calc(55px + 15px);
  background: #000;
  border-radius: 50px;
  transform: translate3d(-50%, 0, 0);
  justify-content: space-around;
  color: #fff;
}
</style>
