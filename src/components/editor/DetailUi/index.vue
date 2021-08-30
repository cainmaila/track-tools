<template>
  <div id="DetailUi" v-if="mode > 0">
    <ScopeAreaMod v-bind="$attrs" v-if="mode === 1" />
  </div>
</template>
<script>
import ScopeAreaMod from './ScopeAreaMod'
export default {
  name: 'DetailUi',
  components: { ScopeAreaMod },
  props: ['selectArea'],
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
  watch: {
    selectArea(val) {
      console.log('eeee', val)
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
