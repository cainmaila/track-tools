<template>
  <div class="fn-btn flex-center bn" @pointerup.stop="onPress">
    <At2Icon :type="icon" width="25" height="17" :color="color" />
  </div>
</template>
<script>
import At2Icon from '~at2@/components/At2Icon'
export default {
  name: 'FnBtn',
  props: ['icon', 'state'],
  components: { At2Icon },
  data() {
    return {}
  },
  computed: {
    color() {
      return this.state ? '#5595ef' : '#fff'
    },
  },
  methods: {
    onPress() {
      new Audio(`./sound/ck.mp3`).play()
      this.$emit('press')
    },
  },
}
</script>
<style lang="postcss" scoped>
.fn-btn {
  width: 70px;
  height: 55px;
  &:hover {
    background-color: #fff4;
  }
}
</style>
