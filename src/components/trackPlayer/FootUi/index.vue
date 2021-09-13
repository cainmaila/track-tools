<template>
  <div class="foot-ui flex-center">
    <div
      class="bn flex-center"
      @pointerup.stop="$emit(playIng ? 'stop' : 'play')"
    >
      {{ playIng ? '暫停' : '播放' }}
    </div>
    <input
      type="range"
      min="1"
      :max="totale"
      :value="time"
      @input.stop="onChange"
    />
  </div>
</template>
<script>
export default {
  name: 'FootUi',
  props: ['playIng', 'totale', 'time'],
  emits: ['update:time', 'stop', 'play'],
  data() {
    return {}
  },
  methods: {
    onChange(e) {
      this.$emit('update:time', e.target.value)
    },
  },
}
</script>
<style lang="postcss" scoped>
.foot-ui {
  width: 100%;
  height: 55px;
  background: #000;
  & .bn {
    width: 55px;
    height: 100%;
    border: solid 1px #fff;
    color: #fff;
  }
}
</style>
