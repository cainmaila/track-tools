<template>
  <div class="area-layer-ui flex" :class="{ acc: isEdit }">
    <div @click="$emit('select', area)">{{ area.name }}</div>
    <div class="flex">
      <At2IconBtn
        icon="unMoved"
        width="20"
        height="20"
        :color="canSelect ? `#888` : `#fff`"
        @on-click="$emit('lock', area)"
      />
      <At2IconBtn
        icon="icon_delete"
        width="20"
        height="20"
        color="#fff"
        @on-click="$emit('del', area)"
        v-if="!area.userData.isRoot"
      />
    </div>
  </div>
</template>
<script>
import At2IconBtn from '~at2@/components/At2IconBtn'
export default {
  name: 'AreaLayerUi',
  components: { At2IconBtn },
  props: ['area', 'isEdit', 'canSelect'],
}
</script>
<style lang="postcss" scoped>
.area-layer-ui {
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
</style>
