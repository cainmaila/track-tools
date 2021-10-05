<template>
  <div
    id="TeachingMod"
    class="flex-center animate__animated animate__fadeIn animate__faster"
  >
    <At2Dialog class="dialog" @close-dialog="$emit('x')">
      <template v-slot:title>教學 ({{ page + 1 }}/2)</template>
      <div class="content">
        <div class="content-view">
          <P1 :pav="page" @next="page = page == 0 ? 1 : 0" />
        </div>
      </div>
      <template v-slot:footer>
        <At2Btn pill size="32" @on-click="$emit('x')">關閉</At2Btn>
      </template>
    </At2Dialog>
  </div>
</template>
<script>
import At2Dialog from '~at2@/components/At2Dialog'
import At2Btn from '~at2@/components/At2Btn'
import P1 from './P1'
export default {
  name: 'TeachingMod',
  components: {
    At2Dialog,
    At2Btn,
    P1,
  },
  props: ['helpDefault'],
  data() {
    return {
      page: 0,
    }
  },
}
</script>
<style lang="postcss" scoped>
.help-bn {
  position: absolute;
  top: 30px;
  right: 30px;
}
#TeachingMod {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #0008;
  overflow: hidden;
  & .content {
    padding: 65px;
  }
}
& .dialog {
  width: 90%;
  min-width: 650px;
}
</style>
