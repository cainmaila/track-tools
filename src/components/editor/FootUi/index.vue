<template>
  <div id="FootUi">
    <FnBtn
      title="選取"
      icon="edit"
      @press="emitCommon('sel')"
      :state="mode === 'sel'"
    />
    <FnBtn title="最適" icon="icon_reduction" @press="emitCommon('fit')" />
    <FnBtn title="放大" icon="zoomOut2" @press="emitCommon('zoom', 0.1)" />
    <FnBtn title="縮小" icon="zoomIn" @press="emitCommon('zoom', -0.1)" />
    <FnBtn
      title="移動"
      icon="move3D"
      @press="emitCommon('mov')"
      :state="mode === 'mov'"
    />
    <div class="line"></div>
    <FnBtn
      title="創建"
      icon="screenshot"
      @press="createAreaUiOff = !createAreaUiOff"
      :state="createAreaUiOff"
    />
    <CreateAreaFnBn
      id="CreateAreaFnBn"
      :step="step"
      v-if="createAreaUiOff"
      @press="onPressCreatArea"
    />
    <!-- <div
      class="bn flex-center"
      :class="{ disabled: step === 2, acc: mode === 'scope' }"
      @click="step === 1 && emitCommon('scope')"
    >
      01
    </div>
    <div
      class="bn flex-center"
      :class="{ disabled: step === 1, acc: mode === 'area' }"
      @click="step === 2 && emitCommon('area')"
    >
      02
    </div> -->
  </div>
</template>
<script>
import FnBtn from './FnBtn'
import CreateAreaFnBn from './CreateAreaFnBn'
export default {
  name: 'FootUi',
  props: ['mode', 'step'],
  components: { FnBtn, CreateAreaFnBn },
  data() {
    return { createAreaUiOff: true }
  },
  setup(_, content) {
    const emitCommon = (common, data) => {
      content.emit('common', { common, data })
    }
    const onPressCreatArea = val => {
      emitCommon('scope', val)
    }
    return {
      emitCommon,
      onPressCreatArea,
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
  color: #fff;
}
.line {
  width: 1px;
  height: 30px;
  padding: auto 0px;
  margin: 0px 20px;
  background: #fff;
}
#CreateAreaFnBn {
  position: absolute;
  bottom: 80px;
  left: 50%;
}
</style>
