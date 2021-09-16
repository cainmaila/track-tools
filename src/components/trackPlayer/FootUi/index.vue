<template>
  <div class="foot-ui">
    <div class="f1 flex-center">
      <PlayBtn :playIng="playIng" @ck-play="$emit(playIng ? 'stop' : 'play')" />
      <select @input.stop="onVchange" :value="v">
        <option :value="0.25">0.25x</option>
        <option :value="0.5">0.5x</option>
        <option :value="0.75">0.75x</option>
        <option :value="1">1x</option>
        <option :value="1.25">1.25x</option>
        <option :value="1.5">1.5x</option>
        <option :value="1.75">1.75x</option>
        <option :value="2">2x</option>
      </select>
      <div class="bn2 bn flex-center" @pointerup.stop="$emit('zoom', 'in')">
        放大
      </div>
      <div class="bn2 bn flex-center" @pointerup.stop="$emit('zoom', 'out')">
        縮小
      </div>
      <div class="bn2 bn flex-center" @pointerup.stop="$emit('zoom', 'fit')">
        最適
      </div>
    </div>
    <div class="f2 flex-center">
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
import PlayBtn from './PlayBtn'
export default {
  name: 'FootUi',
  components: { PlayBtn },
  props: ['playIng', 'totale', 'time', 'v'],
  emits: ['update:time', 'stop', 'play', 'update:v', 'zoom'],
  data() {
    return {}
  },
  methods: {
    onChange(e) {
      this.$emit('update:time', e.target.value)
    },
    onVchange(e) {
      this.$emit('update:v', e.target.value)
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
    width: 100%;
    height: 45px;
  }
  & .f2 {
    width: 100%;
    max-width: 600px;
    height: 40px;
    margin: 0 auto;
    & input {
      width: 100%;
    }
  }
  & .bn2 {
    width: 55px;
    height: 100%;
    border: solid 1px #fff;
    color: #fff;
    box-sizing: border-box;
  }
}
</style>
