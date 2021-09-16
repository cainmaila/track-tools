<template>
  <div class="foot-ui">
    <div class="f1 md">
      <PlayBtn :playIng="playIng" @ck-play="$emit(playIng ? 'stop' : 'play')" />
      <div class="flex-center">
        <SelectV v-bind="$attrs" />
        <div class="line" />
        <FnBtn type="zoomOut2" @ck="$emit('zoom', 'in')" />
        <FnBtn type="zoomIn" @ck="$emit('zoom', 'out')" />
        <FnBtn type="showall" @ck="$emit('zoom', 'fit')" />
      </div>
    </div>
    <div class="f2 flex-center md">
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
    /* width: 100%; */
    /* max-width: 600px; */
    height: 45px;
    /* margin: 0 auto; */
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & .f2 {
    /* width: 100%; */
    /* max-width: 600px; */
    height: 40px;
    /* margin: 0 auto; */
    & input {
      width: 100%;
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
