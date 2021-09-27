<template>
  <div class="area-layer-ui flex" :class="{ acc: isEdit }">
    <div class="txt-cont flex" @pointerup.stop="$emit('select', area)">
      {{ area.name }}
    </div>
    <div class="flex" v-if="!readOnly">
      <div
        class="sp btn bn flex-center"
        :class="{ lock: !canSelect }"
        @pointerup.stop="$emit('lock', area)"
      >
        <At2Icon
          :type="!canSelect ? 'lock' : 'unlock'"
          width="12"
          height="12"
          :color="canSelect ? '#fff' : '#fff'"
        />
      </div>
      <At2Btn
        icon="icon_delete"
        icon-width="12"
        icon-height="12"
        icon-btn-size="20"
        circle
        @on-click="$emit('del', area)"
        v-if="!area.userData.isRoot"
      />
      <div v-else class="sp"></div>
    </div>
  </div>
</template>
<script>
import At2Btn from '~at2@/components/At2Btn'
import At2Icon from '~at2@/components/At2Icon'
export default {
  name: 'AreaLayerUi',
  components: { At2Btn, At2Icon },
  props: ['area', 'isEdit', 'canSelect', 'readOnly'],
}
</script>
<style lang="postcss" scoped>
.area-layer-ui {
  justify-content: space-between;
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
.txt-cont {
  height: 100%;
  width: 100%;
}
.at2-btn {
  margin-left: 15px;
}
.btn {
  border-radius: 50%;
  background: #1a4fbe;
  &.lock {
    background: #888888;
  }
}
.sp {
  width: 20px;
  height: 20px;
  margin-left: 15px;
}
</style>
