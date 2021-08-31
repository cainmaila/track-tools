<template>
  <div id="ScopeAreaMod">
    <h3>總區域</h3>
    <div>
      區域名稱<At2Input :value="tag" @input="val => $emit('update:tag', val)" />
    </div>
    <div>
      長<At2Input
        type="number"
        :value="realWidth"
        @input="val => $emit('update:realWidth', val)"
      />
    </div>
    <div>寬:{{ (heightPx / scale).toFixed(2) }}</div>
    <div>比例尺:{{ scale.toFixed(2) }}</div>
    <div>樓層高<At2Input type="number" value="100" /></div>
    <div>方位角<At2Input type="number" min="0" max="360" value="0" /></div>
    <div>
      Color<At2Input type="color" :value="colorToHex" @input="emitColor" />
    </div>
  </div>
</template>
<script>
import { hexToNumber, numberToHex } from '@/tools/colorTools'
import At2Input from '~at2@/components/At2Input'
export default {
  name: 'ScopeAreaMod',
  components: { At2Input },
  props: ['tag', 'widthPx', 'heightPx', 'realWidth', 'color'],
  emits: ['update:tag', 'update:realWidth', 'scale', 'update:color'],
  data() {
    return {}
  },
  computed: {
    scale() {
      return (this.widthPx || 0) / this.realWidth
    },
    colorToHex() {
      return numberToHex(this.color || 0)
    },
  },
  watch: {
    scale: {
      immediate: true,
      handler(val) {
        this.$emit('scale', val)
      },
    },
  },
  methods: {
    emitColor(_hex) {
      this.$emit('update:color', hexToNumber(_hex))
    },
  },
}
</script>
<style lang="postcss" scoped></style>
