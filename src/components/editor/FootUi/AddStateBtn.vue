<template>
  <div class="add-state-btn flex-center" :class="{ ok }">
    <At2Icon v-if="ok" type="tick" width="24" height="24" color="#fff" />
    <At2Icon v-else type="add" width="24" height="24" color="#fff" />
  </div>
</template>
<script>
import At2Icon from '~at2@/components/At2Icon'
export default {
  name: 'AddStateBtn',
  components: { At2Icon },
  props: ['state'],
  data() {
    return {}
  },
  computed: {
    ok() {
      return this.state === 'ok'
    },
  },
}
</script>
<style lang="postcss" scoped>
.add-state-btn {
  width: 26px;
  height: 26px;
  border: 2px solid #fff;
  border-radius: 50%;
  box-sizing: border-box;
  &.ok {
    border: none;
    background: #6eb823;
  }
}
</style>
