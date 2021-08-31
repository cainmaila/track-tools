<template>
  <div id="ScopeAreaMod">
    <div>區域名稱<At2Input :value="tag" @input="onInput" /></div>
    <div>長:{{ (bounds.width / scale).toFixed(2) }}</div>
    <div>寬:{{ (bounds.height / scale).toFixed(2) }}</div>
    <div>
      Color<At2Input
        type="color"
        :value="color"
        @input="val => (color = val)"
      />
    </div>
  </div>
</template>
<script>
import { hexToNumber, numberToHex } from '@/tools/colorTools'
import At2Input from '~at2@/components/At2Input'
export default {
  name: 'ScopeAreaMod',
  components: {
    At2Input,
  },
  props: ['selectArea', 'scale'],
  data() {
    return {
      tag: '',
      color: '',
      bounds: null,
    }
  },
  watch: {
    selectArea: {
      immediate: true,
      handler(val, old) {
        old && old.rectangle.off('edit-resize', this.setBounds)
        this.tag = val.tag
        this.color = numberToHex(val.lineColor)
        this.setBounds()
        val && val.rectangle.on('edit-resize', this.setBounds)
      },
    },
    tag(val) {
      // eslint-disable-next-line vue/no-mutating-props
      this.selectArea.tag = val
    },
    color(val) {
      const _colorNum = hexToNumber(val)
      // eslint-disable-next-line vue/no-mutating-props
      this.selectArea.lineColor = _colorNum
      // eslint-disable-next-line vue/no-mutating-props
      this.selectArea.fillColor = _colorNum
    },
  },
  methods: {
    onInput(val) {
      this.tag = val
    },
    setBounds() {
      this.bounds = this.selectArea.getRectangleBounds()
    },
  },
  beforeUnmount() {
    this.selectArea &&
      this.selectArea.rectangle.off('edit-resize', this.setBounds)
  },
}
</script>
<style lang="postcss" scoped></style>
