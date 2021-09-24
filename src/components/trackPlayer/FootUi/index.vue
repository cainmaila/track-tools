<template>
  <div class="foot-ui">
    <div class="f1 md">
      <PlayBtn :playIng="playIng" @ck-play="onPlay" />
      <div class="flex-center">
        <SelectV v-bind="$attrs" />
        <div class="line" />
        <FnBtn type="zoomIn" @ck="$emit('zoom', 'in')" />
        <FnBtn type="zoomOut" @ck="$emit('zoom', 'out')" />
        <FnBtn type="showall" @ck="$emit('zoom', 'fit')" />
      </div>
    </div>
    <div class="f2 md">
      <!-- <div class="time">47:02 / 1:47;22</div> -->
      <div class="time">{{ timeStr }}</div>
      <input
        type="range"
        min="1"
        :max="totale"
        :value="time"
        @input.stop="onChange"
      />
    </div>
  </div>
</template>
<script>
import { msToTime } from '@/tools/time-format'
import PlayBtn from './PlayBtn'
import FnBtn from './FnBtn'
import SelectV from './SelectV'
export default {
  name: 'FootUi',
  components: { PlayBtn, FnBtn, SelectV },
  props: ['playIng', 'totale', 'time'],
  emits: ['update:time', 'stop', 'play', 'zoom'],
  data() {
    return {}
  },
  computed: {
    timeStr() {
      return `${msToTime(this.time)} / ${msToTime(this.totale)}`
    },
  },
  methods: {
    onChange(e) {
      this.$emit('update:time', e.target.value)
    },
    onVchange(e) {
      this.$emit('update:v', e.target.value)
    },
    onPlay() {
      new Audio(`./sound/btn-${this.playIng ? 'b' : 'a'}.mp3`).play()
      this.$emit(this.playIng ? 'stop' : 'play')
    },
  },
}
</script>
<style lang="postcss" scoped>
.foot-ui {
  width: 100%;
  height: 85px;
  box-sizing: border-box;
  padding: 0 10px;
  background: #000;
  & .f1 {
    height: 45px;
    /* margin: 0 auto; */
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & .f2 {
    height: 40px;
    & input {
      width: 100%;
    }
    & .time {
      text-align: right;
      font-size: 12px;
      color: #fff;
    }
  }
  & .md {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }
  & .bn2 {
    width: 55px;
    height: 100%;
    border: solid 1px #fff;
    color: #fff;
    box-sizing: border-box;
  }
}
.line {
  width: 1px;
  height: 20px;
  margin: 0 10px;
  background: #fff;
}
</style>
