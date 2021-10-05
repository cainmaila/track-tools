<template>
  <div class="create-bn flex-center">
    <div
      class="flex-center fn-bg"
      :class="{ disabled: step === 2, bn: step === 1, acc: isScope }"
      @pointerup.stop="step === 1 && $emit('press', 'scope')"
    >
      <div class="txt">{{ $t('Editor.FoottUi.CreateAreaFnBn.scope') }}</div>
      <AddStateBtn :state="step === 1 ? 'none' : 'ok'" />
    </div>
    <div
      class="flex-center fn-bg"
      :class="{ disabled: step === 1, bn: step === 2, acc: isArea }"
      @pointerup.stop="step === 2 && $emit('press', 'area')"
    >
      <div class="txt">{{ $t('Editor.FoottUi.CreateAreaFnBn.area') }}</div>
      <AddStateBtn v-if="step === 2" />
    </div>
  </div>
</template>
<script>
import AddStateBtn from './AddStateBtn'
export default {
  name: 'CreateAreaFnBn',
  components: { AddStateBtn },
  props: ['step', 'mode'],
  data() {
    return {}
  },
  computed: {
    isScope() {
      return this.mode == 'scope'
    },
    isArea() {
      return this.mode == 'area'
    },
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
.acc {
  background: #5595ef;
}
</style>
