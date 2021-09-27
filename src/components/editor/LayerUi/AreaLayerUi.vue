<template>
  <div class="area-layer-ui flex" :class="{ acc: isEdit }">
    <div class="txt-cont flex" @click="$emit('select', area)">
      {{ area.name }}
    </div>
    <div class="flex">
      <At2Btn
        icon="unlock"
        icon-width="12"
        icon-height="12"
        icon-btn-size="20"
        circle
        :type="canSelect ? `default` : `black`"
        @on-click="$emit('lock', area)"
      />
      <At2Btn
        icon="icon_delete"
        icon-width="12"
        icon-height="12"
        icon-btn-size="20"
        circle
        @on-click="$emit('del', area)"
        v-if="!area.userData.isRoot && !readOnly"
      />
    </div>
  </div>
</template>
<script>
import At2Btn from '~at2@/components/At2Btn'
export default {
  name: 'AreaLayerUi',
  components: { At2Btn },
  props: ['area', 'isEdit', 'canSelect', 'readOnly'],
}
</script>
<style lang="postcss" scoped>
.area-layer-ui {
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding: 0 15px;
  box-sizing: border-box;
  font-size: 14px;
  color: #fff;
  &.acc {
    background: #113b93;
  }
}
.txt-cont {
  height: 100%;
  width: 100%;
}
.at2-btn {
  margin-left: 15px;
}
</style>
