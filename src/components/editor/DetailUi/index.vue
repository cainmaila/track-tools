<template>
  <div id="DetailUi">
    <h3>總區域</h3>
    <div>
      區域名稱<At2Input
        :value="tagTxt"
        @input="val => $emit('update:tag', val)"
      />
    </div>
    <div>寬<At2Input type="number" value="100" /></div>
    <div>高:100</div>
    <div>比例尺:100</div>
    <div>樓層高<At2Input type="number" value="100" /></div>
    <div>方位角<At2Input type="number" min="0" max="360" value="0" /></div>
    <div>Color<At2Input type="color" /></div>
  </div>
</template>
<script>
import At2Input from '~at2@/components/At2Input'
export default {
  name: 'DetailUi',
  components: { At2Input },
  props: ['tag'],
  emits: ['update:tag'],
  data() {
    return {
      tagTxt: this.tag,
    }
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
