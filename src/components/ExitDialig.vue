<template>
  <At2Mask
    class="exit-dialig flex-center animate__animated animate__fadeIn animate__faster"
  >
    <At2Dialog class="dialog" @close-dialog="$emit('event', 'x')">
      <template v-slot:title>提示</template>
      <div class="content"><slot /></div>
      <template v-slot:footer>
        <At2Btn border pill size="32" @on-click="$emit('event', 'x')"
          >取消</At2Btn
        >
        <At2Btn pill size="32" @on-click="$emit('event', 'exit')">確定</At2Btn>
      </template>
    </At2Dialog>
  </At2Mask>
</template>
<script>
import At2Dialog from '~at2@/components/At2Dialog'
import At2Btn from '~at2@/components/At2Btn'
import At2Mask from '~at2@/components/At2Mask'
export default {
  name: 'ExitDialig',
  components: { At2Dialog, At2Btn, At2Mask },
  data() {
    return {}
  },
}
</script>
<style lang="postcss" scoped>
.exit-dialig {
  position: absolute;
  right: 0px;
  & .dialog {
    width: 90%;
    max-width: 250px;
    & .content {
      padding: 20px;
    }
    & .at2-btn {
      margin-left: 10px;
    }
  }
}
</style>
