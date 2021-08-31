<template>
  <div id="DetailUi" v-if="type > 0">
    <ScopeAreaMod v-bind="$attrs" v-if="type === 1" :scale="scale" />
    <PartAreaMod v-else-if="type === 2" v-bind="$attrs" />
  </div>
</template>
<script>
import ScopeAreaMod from './ScopeAreaMod'
import PartAreaMod from './PartAreaMod'
export default {
  name: 'DetailUi',
  components: { ScopeAreaMod, PartAreaMod },
  props: ['type', 'scale'],
}
</script>
<style lang="postcss" scoped>
#DetailUi {
  box-sizing: border-box;
  width: 200px;
  height: 100%;
  padding: 10px;
  position: absolute;
  left: 0;
  top: 0;
  background: #fff;
}
</style>
