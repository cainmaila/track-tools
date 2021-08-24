<template>
  <div id="FootUi">
    <div
      class="bn flex-center"
      :class="{ acc: props.mode === 'sel' }"
      @click="emitCommon('sel')"
    >
      選取
    </div>
    <div class="bn flex-center" @click="emitCommon('fit')">
      最適
    </div>
    <div class="bn flex-center" @click="emitCommon('zoom', 0.1)">
      放大
    </div>
    <div class="bn flex-center" @click="emitCommon('zoom', -0.1)">縮小</div>
    <div
      class="bn flex-center"
      :class="{ acc: props.mode === 'mov' }"
      @click="emitCommon('mov')"
    >
      移動
    </div>
    <div
      class="bn flex-center"
      :class="{ disabled: props.step === 2, acc: props.mode === 'scope' }"
      @click="props.step === 1 && emitCommon('scope')"
    >
      01
    </div>
    <div
      class="bn flex-center"
      :class="{ disabled: props.step === 1, acc: props.mode === 'area' }"
      @click="props.step === 2 && emitCommon('area')"
    >
      02
    </div>
  </div>
</template>
<script>
export default {
  name: 'FootUi',
  props: ['mode', 'step'],
  setup(props, content) {
    const emitCommon = (common, data) => {
      content.emit('common', { common, data })
    }
    return {
      props,
      emitCommon,
    }
  },
}
</script>
<style lang="postcss" scoped>
#FootUi {
  width: 100%;
  height: 55px;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(0, 0, 0);
}
.bn {
  width: 55px;
  min-width: 55px;
  height: 50px;
  border: 1px solid;
  color: #fff;
  &.acc {
    color: #f0f;
  }
  &.disabled {
    opacity: 0.3;
  }
}
</style>
