<template>
  <div id="DetailUi" v-if="mode > 0">
    <ScopeAreaMod v-bind="$attrs" v-if="mode === 1" />
    <PartAreaMod
      v-else-if="mode === 2"
      :selectArea="selectArea"
      :scale="scale"
    />
  </div>
</template>
<script>
import ScopeAreaMod from './ScopeAreaMod'
import PartAreaMod from './PartAreaMod'
export default {
  name: 'DetailUi',
  components: { ScopeAreaMod, PartAreaMod },
  props: ['selectArea', 'scale'],
  data() {
    return {}
  },
  computed: {
    mode() {
      if (this.selectArea) {
        if (this.selectArea.isRoot) {
          return 1 //選全區
        }
        return 2
      }
      return 0 //無選取
    },
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
