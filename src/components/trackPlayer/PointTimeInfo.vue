<template>
  <div class="point-time-info flex-center" v-show="time">
    <At2Icon
      type="entityColor"
      width="14"
      height="14"
      color="rgb(0, 145, 255)"
    />當前位置
    {{ dateStr }}
  </div>
</template>
<script>
import At2Icon from '~at2@/components/At2Icon'
import { toDateAndTime } from '@/tools/time-format'
export default {
  name: 'PointTimeInfo',
  props: ['time'],
  components: { At2Icon },
  computed: {
    dateStr() {
      return this.time ? toDateAndTime(this.time * 1) : ''
    },
  },
}
</script>
<style lang="postcss" scoped>
.point-time-info {
  color: rgb(0, 145, 255);
  font-size: 14px;
  height: 20px;
  padding-right: 5px;
  pointer-events: none;
  background: #fffa;
  border-radius: 10px;
}
</style>
