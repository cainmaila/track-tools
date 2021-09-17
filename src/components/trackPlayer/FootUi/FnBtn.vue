<template>
  <div class="fn-btn bn flex-center" @pointerup.stop="onCk">
    <At2Icon :type="type" width="16" height="16" color="#fff" />
  </div>
</template>
<script>
import At2Icon from '~at2@/components/At2Icon'
export default {
  name: 'FnBtn',
  props: ['type'],
  components: { At2Icon },
  methods: {
    onCk() {
      new Audio(`./sound/ck.mp3`).play()
      this.$emit('ck')
    },
  },
}
</script>
<style lang="postcss" scoped>
.fn-btn {
  width: 30px;
  height: 30px;
}
</style>
