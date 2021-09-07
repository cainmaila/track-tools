<template>
  <div class="create-bn flex-center">
    <div
      class="flex-center fn-bg"
      :class="{ disabled: step === 2, bn: step === 1 }"
      @pointerup.stop="step === 1 && $emit('press', 'sope')"
    >
      <div class="txt">1.添加總識別區域</div>
      <At2Icon
        :type="step === 1 ? 'addO' : 'complete'"
        width="26"
        height="26"
        color="#fff"
      />
    </div>
    <div
      class="flex-center fn-bg"
      :class="{ disabled: step === 1, bn: step === 2 }"
      @pointerup.stop="step === 2 && $emit('press', 'area')"
    >
      <div class="txt">2.添加識別區域</div>
      <At2Icon
        :type="step <= 2 ? 'addO' : 'complete'"
        width="26"
        height="26"
        color="#fff"
      />
    </div>
  </div>
</template>
<script>
import At2Icon from '~at2@/components/At2Icon'
export default {
  name: 'CreateAreaFnBn',
  components: { At2Icon },
  props: ['step'],
  data() {
    return {}
  },
}
</script>
<style lang="postcss" scoped>
.create-bn {
  width: 340px;
  height: calc(55px + 15px);
  background: #000;
  border-radius: 50px;
  overflow: hidden;
  transform: translate3d(-50%, 0, 0);
  justify-content: space-around;
  color: #fff;
}
.disabled {
  background: #888;
  & .txt {
    color: #ddd;
  }
}
.fn-bg {
  width: 50%;
  height: 100%;
}
.txt {
  width: 60px;
  margin-right: 18px;
  font-size: 12px;
  font-weight: 500;
}
</style>
