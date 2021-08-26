<template>
  <div id="LayerUi">
    <AreaLayerUi
      v-for="area in areas"
      :key="area.name"
      :area="area"
      :isEdit="area.isEdit"
      @del="onDel"
      @lock="onLock"
      @select="onSelect"
    />
  </div>
</template>
<script>
import AreaLayerUi from './AreaLayerUi'
export default {
  name: 'LayerUi',
  components: { AreaLayerUi },
  props: ['areas'],
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
  },
}
</script>
<style lang="postcss" scoped>
#LayerUi {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 250px;
  min-height: 30px;
  background: #000;
  color: #fff;
}
</style>
