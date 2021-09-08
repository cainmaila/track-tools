<template>
  <div class="box">
    <div class="til">
      <slot name="til" />
    </div>
    <slot />
  </div>
</template>
<script>
export default {
  name: 'Box',
  data() {
    return {}
  },
}
</script>
<style lang="postcss" scoped>
.box {
  padding: 20px;
  margin-bottom: 8px;
  background: #fff;
  font-size: 13px;
  line-height: 19px;
  & .til {
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
  }
}
</style>
