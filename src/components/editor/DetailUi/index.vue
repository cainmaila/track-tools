<template>
  <div id="DetailUi">
    <ScopeAreaMod v-bind="$attrs" />
  </div>
</template>
<script>
import ScopeAreaMod from './ScopeAreaMod'
export default {
  name: 'DetailUi',
  components: { ScopeAreaMod },
  data() {
    return {}
  },
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
