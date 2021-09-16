<template>
  <div class="play-btn bn flex-center">
    <div class="play flex-center" @pointerup.stop="$emit('ck-play')">
      <At2Icon
        type="pause"
        width="16"
        height="16"
        color="#000"
        v-show="playIng"
      />
      <At2Icon
        type="play"
        width="30"
        height="30"
        color="#000"
        v-show="!playIng"
      />
    </div>
  </div>
</template>
<script>
import At2Icon from '~at2@/components/At2Icon'
export default {
  name: 'PlayBtn',
  components: { At2Icon },
  props: ['playIng'],
  emits: ['ck-play'],
}
</script>
<style lang="postcss" scoped>
.play {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #fff;
}
</style>
