<template>
  <div class="create-bn flex-center">
    <div
      class="flex-center fn-bg-1"
      :class="{ disabled: step === 2, bn: step === 1, acc: isScope }"
      @pointerup.stop="step === 1 && $emit('press', 'scope')"
    >
      <div class="txt">{{ $t('Editor.FoottUi.CreateAreaFnBn.scope') }}</div>
      <AddStateBtn :state="step === 1 ? 'none' : 'ok'" />
    </div>
    <div
      class="flex-center fn-bg-2"
      :class="{ disabled: step === 1, bn: step === 2, acc: isArea }"
      @pointerup.stop="step === 2 && $emit('press', 'area')"
    >
      <div class="txt">{{ $t('Editor.FoottUi.CreateAreaFnBn.area') }}</div>
      <AddStateBtn v-if="step === 2" />
    </div>
    <div class="trd" :class="{ disabled: step === 2, acc: isScope }"></div>
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
  position: relative;
  width: 340px;
  height: calc(55px + 15px);
  background: #000;
  border-radius: 50px;
  overflow: hidden;
  transform: translate3d(-50%, 0, 0);
  justify-content: space-around;
  color: #fff;
}
/* .disabled {
  background: #888;
  & .txt {
    color: #ddd;
  }
} */
.fn-bg-1 {
  width: 47%;
  height: 100%;
  background: #000;
  color: #fff;
  &.disabled {
    background: #6e6d6d;
    color: #969696;
  }
  &.acc {
    background: #5595ef;
  }
}
.fn-bg-2 {
  width: 53%;
  height: 100%;
  background: #444;
  &.acc {
    background: #5595ef;
  }
  &.disabled {
    color: #aaa;
  }
}
.txt {
  width: 60px;
  margin-right: 18px;
  font-size: 12px;
  font-weight: 500;
}
.trd {
  position: absolute;
  transform: translateX(2px);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 35px 0 35px 25px;
  border-color: transparent transparent transparent #000;
  &.disabled {
    border-color: transparent transparent transparent #6e6d6d;
  }
  &.acc {
    border-color: transparent transparent transparent #5595ef;
  }
}
</style>
