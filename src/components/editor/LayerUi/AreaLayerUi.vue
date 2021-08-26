<template>
  <div class="area-layer-ui flex">
    {{ area.name }}
    <At2IconBtn
      icon="unMoved"
      width="20"
      height="20"
      color="#fff"
      @on-click="$emit('lock', area)"
    />
    <At2IconBtn
      icon="icon_delete"
      width="20"
      height="20"
      color="#fff"
      @on-click="$emit('del', area)"
    />
  </div>
</template>
<script>
import At2IconBtn from '~at2@/components/At2IconBtn'
export default {
  name: 'AreaLayerUi',
  components: { At2IconBtn },
  props: ['area'],
}
</script>
<style lang="postcss" scoped>
.area-layer-ui {
  width: 100%;
  height: 30px;
  padding: 0 5px;
  box-sizing: border-box;
}
</style>
