<template>
  <div id="FootUi">
    <FnBtn
      :title="$t('Editor.FoottUi.select')"
      icon="vernier"
      @press="emitCommon('sel')"
      :state="mode === 'sel'"
    />
    <FnBtn
      :title="$t('Editor.FoottUi.optimal')"
      icon="icon_reduction"
      @press="emitCommon('fit')"
    />
    <FnBtn
      :title="$t('Editor.FoottUi.zoomIn')"
      icon="zoomIn"
      @press="emitCommon('zoom', 0.1)"
    />
    <FnBtn
      :title="$t('Editor.FoottUi.zoomOut')"
      icon="zoomOut"
      @press="emitCommon('zoom', -0.1)"
    />
    <FnBtn
      :title="$t('Editor.FoottUi.move')"
      icon="move"
      @press="emitCommon('mov')"
      :state="mode === 'mov'"
    />
    <template v-if="!readOnly">
      {{ readOnly }}
      <div class="line"></div>
      <FnBtn
        :title="$t('Editor.FoottUi.create')"
        icon="addArea"
        @press="createAreaUiOff = !createAreaUiOff"
        :state="createAreaUiOff"
      />
      <CreateAreaFnBn
        id="CreateAreaFnBn"
        :step="step"
        :mode="mode"
        v-if="createAreaUiOff"
        @press="onPressCreatArea"
      />
    </template>
  </div>
</template>
<script>
import FnBtn from './FnBtn'
import CreateAreaFnBn from './CreateAreaFnBn'
export default {
  name: 'FootUi',
  props: ['mode', 'step', 'readOnly'],
  emits: ['common'],
  components: { FnBtn, CreateAreaFnBn },
  data() {
    return { createAreaUiOff: true }
  },
  methods: {
    emitCommon(common, data) {
      this.$emit('common', { common, data })
    },
    onPressCreatArea(val) {
      this.emitCommon(val)
    },
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
