<template>
  <div
    class="readme-bd flex-center animate__animated animate__fadeIn animate__faster"
  >
    <div class="bd">
      <div class="top">
        <slot name="top"></slot>
      </div>
      <div class="foot">
        <slot name="foot"></slot>
      </div>
      <div class="close-bn bn" @pointerup.stop="$emit('x')">
        <At2Icon type="close" color="#fff" width="12" height="12" />
      </div>
    </div>
  </div>
</template>
<script>
import At2Icon from '~at2@/components/At2Icon'
export default {
  name: 'ReadMeMod',
  components: { At2Icon },
  data() {
    return {}
  },
}
</script>
<style lang="postcss" scoped>
.readme-bd {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #0008;
  & .bd {
    position: relative;
    width: 90%;
    max-width: 490px;
    height: 420px;
    border-radius: 7px;
    overflow: hidden;
    background-color: #fff;
    & .top {
      width: 100%;
      height: calc(420px - 150px);
      overflow: hidden;
    }
    & .foot {
      width: 100%;
      height: 150px;
      padding: 20px;
      color: black;
      font-size: 13px;
      line-height: 20px;
    }
    & .close-bn {
      position: absolute;
      top: 15px;
      right: 15px;
    }
  }
}
</style>
