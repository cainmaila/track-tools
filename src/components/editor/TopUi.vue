<template>
  <div class="top-ui">
    <div><slot /></div>
    <div class="btns">
      <At2Btn
        type=""
        @on-click="$emit('ui', 'exit')"
        :border="true"
        :disabled="false"
        pill
        size="26"
      >
        離開
      </At2Btn>
      <At2Btn
        v-if="save"
        @on-click="$emit('ui', 'save')"
        type=""
        :border="false"
        :disabled="step <= 1"
        pill
        size="26"
      >
        儲存
      </At2Btn>
    </div>
  </div>
</template>
<script>
import At2Btn from '~at2@/components/At2Btn'
export default {
  name: 'TopUi',
  components: { At2Btn },
  props: ['save', 'step'],
  data() {
    return {}
  },
}
</script>
<style lang="postcss" scoped>
.top-ui {
  width: 320px;
  height: 40px;
  padding: 0 20px;
  background: rgb(233, 233, 233);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transform: translate3d(-50%, 0, 0);
}
.btns {
  display: flex;
  & .at2-btn {
    margin-left: 15px;
  }
}
</style>
