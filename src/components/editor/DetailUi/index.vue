<template>
  <div id="DetailUi" :class="{ close: !tab }">
    <div class="roll">
      <ScopeAreaMod
        v-bind="$attrs"
        v-if="type === 1"
        :scale="scale"
        :readOnly="readOnly"
        :scopeAreaEditEnable="scopeAreaEditEnable"
      />
      <PartAreaMod
        v-else-if="type === 2"
        v-bind="$attrs"
        :readOnly="readOnly"
        :selectEditEnable="selectEditEnable"
      />
      <FileInfoMod v-else v-bind="$attrs" />
    </div>
    <div class="x flex-center bn" @pointerup.stop="onTab">
      <At2Icon
        class="tab-icon"
        :class="{ on: tab }"
        type="downT"
        width="14"
        height="14"
        color="#000"
      />
    </div>
  </div>
</template>
<script>
import At2Icon from '~at2@/components/At2Icon'
import ScopeAreaMod from './ScopeAreaMod'
import PartAreaMod from './PartAreaMod'
import FileInfoMod from './FileInfoMod'
export default {
  name: 'DetailUi',
  components: { At2Icon, ScopeAreaMod, PartAreaMod, FileInfoMod },
  props: [
    'type',
    'scale',
    'readOnly',
    'selectEditEnable',
    'scopeAreaEditEnable',
  ],
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
  position: absolute;
  left: 0;
  top: 0;
  background: #f5f5f5;
  transform: translate3d(0, 0, 0);
  box-shadow: 0px 9px 24px 0px rgba(0, 0, 0, 0.1);
  transition-property: transform;
  transition-duration: 0.5s;
  &.close {
    transform: translate3d(-300px, 0, 0);
  }
  & .roll {
    height: 100%;
    overflow: hidden auto;
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
