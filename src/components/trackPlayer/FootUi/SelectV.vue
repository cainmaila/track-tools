<template>
  <div class="select-v">
    <select @input.stop="onVchange" :value="v">
      <option :value="0.25">0.25x</option>
      <option :value="0.5">0.5x</option>
      <option :value="0.75">0.75x</option>
      <option :value="1">1x</option>
      <option :value="1.25">1.25x</option>
      <option :value="1.5">1.5x</option>
      <option :value="1.75">1.75x</option>
      <option :value="2">2x</option>
      <option :value="4">4x</option>
      <option :value="8">8x</option>
    </select>
  </div>
</template>
<script>
export default {
  name: 'SelectV',
  props: ['v'],
  emits: ['update:v'],
  methods: {
    onVchange(e) {
      this.$emit('update:v', e.target.value)
    },
  },
}
</script>
<style lang="postcss" scoped>
select {
  background-color: #000;
  color: #fff;
  border: none;
  font-size: 12px;
  &:focus-visible {
    outline-style: none;
  }
}
</style>
