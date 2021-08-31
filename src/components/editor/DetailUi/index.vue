<template>
  <div id="DetailUi" v-if="type > 0" :class="{ close: !tab }">
    <ScopeAreaMod v-bind="$attrs" v-if="type === 1" :scale="scale" />
    <PartAreaMod v-else-if="type === 2" v-bind="$attrs" />
    <div class="x">
      <At2IconBtn
        icon="close"
        width="20"
        height="20"
        color="#000"
        @on-click="onTab"
      />
    </div>
  </div>
</template>
<script>
import At2IconBtn from '~at2@/components/At2IconBtn'
import ScopeAreaMod from './ScopeAreaMod'
import PartAreaMod from './PartAreaMod'
export default {
  name: 'DetailUi',
  components: { At2IconBtn, ScopeAreaMod, PartAreaMod },
  props: ['type', 'scale'],
  data() {
    return {
      tab: true,
    }
  },
  methods: {
    onTab() {
      this.tab = !this.tab
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
  transform: translate3d(0, 0, 0);
  &.close {
    transform: translate3d(-200px, 0, 0);
  }
}
.x {
  position: absolute;
  top: 0px;
  right: -20px;
}
</style>
