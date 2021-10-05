<template>
  <div class="top-ui" :class="{ acc: !btnsShow }">
    <div class="txt txt-enter">
      <slot />
      <div
        class="downT-bn bn"
        :class="{ acc: btnsShow }"
        @pointerup.stop="btnsShow = !btnsShow"
      >
        <At2Icon type="downT" width="12" height="12" />
      </div>
    </div>
    <div class="btns" :class="{ acc: btnsShow }">
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
import At2Icon from '~at2@/components/At2Icon'
export default {
  name: 'TopUi',
  components: { At2Btn, At2Icon },
  props: ['save', 'step'],
  data() {
    return {
      btnsShow: false,
    }
  },
}
</script>
<style lang="postcss" scoped>
.top-ui {
  width: 183px;
  min-height: 40px;
  padding: 5px 20px;
  background: rgb(233, 233, 233);
  border-radius: 8px;
  transform: translate3d(-50%, 0, 0);
  &.acc {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  & .downT-bn {
    &.acc {
      transform: rotate(180deg);
    }
  }
}
.txt {
  width: 190px;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  word-break: break-all;
}
.btns {
  display: none;
  margin-top: 5px;
  &.acc {
    display: flex;
  }
  & .at2-btn {
    margin-left: 15px;
  }
}
@media (--s-viewport) {
  .top-ui {
    width: 320px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .txt {
    & .downT-bn {
      display: none;
    }
  }
  .btns {
    margin-top: 0px;
    display: flex;
  }
}
</style>
