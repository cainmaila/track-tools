<template>
  <div id="DetailUi" v-if="type > 0" :class="{ close: !tab }">
    <div class="rest">
      <ScopeAreaMod v-bind="$attrs" v-if="type === 1" :scale="scale" />
      <PartAreaMod v-else-if="type === 2" v-bind="$attrs" />
      <div class="x flex-center bn">
        <At2Icon
          class="tab-icon"
          :class="{ on: tab }"
          type="downT"
          width="14"
          height="14"
          color="#000"
          @pointerup.stop="onTab"
        />
      </div>
    </div>
  </div>
</template>
<script>
import At2Icon from '~at2@/components/At2Icon'
import ScopeAreaMod from './ScopeAreaMod'
import PartAreaMod from './PartAreaMod'
export default {
  name: 'DetailUi',
  components: { At2Icon, ScopeAreaMod, PartAreaMod },
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
  width: 300px;
  height: 100%;
  overflow: hidden auto;
  position: absolute;
  left: 0;
  top: 0;
  background: #f5f5f5;
  transform: translate3d(0, 0, 0);
  box-shadow: 0px 9px 24px 0px rgba(0, 0, 0, 0.1);
  &.close {
    transform: translate3d(-300px, 0, 0);
  }
}
.x {
  position: absolute;
  top: 44px;
  right: -20px;
  width: 20px;
  height: 50px;
  background: #fff;
  border-radius: 0px 5px 5px 0px;
  box-shadow: 0px 9px 24px 0px rgba(0, 0, 0, 0.1);
  & .tab-icon {
    transform: rotate(-90deg);
    &.on {
      transform: rotate(90deg);
    }
  }
}
</style>
