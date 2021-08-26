<template>
  <div id="LayerUi">
    <div v-for="area in areas" :key="area.name">
      {{ area.name }} {{ area.isEdit }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'LayerUi',
  props: ['areas'],
  steup() {},
}
</script>
<style lang="postcss" scoped>
#LayerUi {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 200px;
  min-height: 30px;
  background: #000;
  color: #fff;
}
</style>
