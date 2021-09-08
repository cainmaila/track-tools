<template>
  <div>
    <div id="LayerUi_MIN" class="flex-center bn" @pointerup.stop="onClose">
      <At2Icon type="list" width="24" height="24" color="#fff" />
    </div>
    <At2Panel
      id="LayerUi"
      title="註冊列表"
      mode="box"
      align="viewer-right"
      @on-close="onClose"
      v-if="panelShow"
    >
      <div class="padde"></div>
      <AreaLayerUi
        v-for="area in areas"
        :key="area.name"
        :area="area"
        :isEdit="area.isEdit"
        :canSelect="area.editEnable"
        @del="onDel"
        @lock="onLock"
        @select="onSelect"
      />
      <div class="padde"></div>
    </At2Panel>
  </div>
</template>
<script>
import At2Panel from '~at2@/components/At2Panel'
import AreaLayerUi from './AreaLayerUi'
import At2Icon from '~at2@/components/At2Icon'
export default {
  name: 'LayerUi',
  components: { AreaLayerUi, At2Panel, At2Icon },
  props: ['areas'],
  emits: ['common'],
  data() {
    return {
      panelShow: true,
    }
  },
  methods: {
    onDel(area) {
      this.$emit('common', { common: 'del', data: area })
    },
    onLock(area) {
      this.$emit('common', { common: 'lock', data: area })
    },
    onSelect(area) {
      this.$emit('common', { common: 'select-area', data: area })
    },
    onClose() {
      this.panelShow = !this.panelShow
    },
  },
}
</script>
<style lang="postcss" scoped>
#LayerUi_MIN {
  position: absolute;
  top: calc(80px + 10px);
  right: calc(20px + 10px);
  width: 40px;
  height: 40px;
  border-radius: 5px;
  background: #000;
}
.padde {
  height: 20px;
}
@media (min-width: 600px) {
  #LayerUi {
    top: calc(80px + 10px);
    right: calc(20px + 10px);
  }
}
</style>
