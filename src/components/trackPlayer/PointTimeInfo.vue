<template>
  <div class="point-time-info flex-center" v-show="time">
    <img src="img/po.png" width="14" height="14" /> 當前位置
    {{ dateStr }}
  </div>
</template>
<script>
import { dataFormat } from '@/tools/time-format'
export default {
  name: 'PointTimeInfo',
  props: ['time'],
  computed: {
    dateStr() {
      return this.time ? dataFormat(this.time * 1) : ''
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
