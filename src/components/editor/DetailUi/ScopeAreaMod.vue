<template>
  <div id="ScopeAreaMod">
    <h3>總區域</h3>
    <div>
      區域名稱<At2Input :value="tag" @input="val => $emit('update:tag', val)" />
    </div>
    <div>
      <select :value="unit" @input="e => $emit('update:unit', e.target.value)">
        <option value="m">m</option>
        <option value="cm">cm</option>
      </select>
    </div>
    <div>
      長<At2Input
        type="number"
        max="99999999999999"
        step="0.01"
        :value="realWidth"
        @input="val => $emit('update:realWidth', val)"
      />
    </div>
    <!-- <div>寬:{{ (heightPx / scale).toFixed(2) }}</div> -->
    <div>
      寬<At2Input
        type="number"
        max="99999999999999"
        step="0.01"
        :value="realHeight.toFixed(2)"
        @input="val => $emit('change-realHeight', val)"
      />
    </div>
    <div>比例尺:{{ scale.toFixed(2) }}</div>
    <div>
      樓層高<At2Input
        type="number"
        max="99999999999999"
        step="0.01"
        :value="elevation"
        @input="val => $emit('update:elevation', val)"
      />
    </div>
    <div>
      方位角<At2Input
        type="number"
        max="360"
        step="0.01"
        :value="direction"
        @input="val => $emit('update:direction', val)"
      />
    </div>
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
  props: [
    'tag',
    'realWidth',
    'realHeight',
    'color',
    'scale',
    'unit',
    'elevation',
    'direction',
  ],
  emits: [
    'update:tag',
    'update:realWidth',
    'change-realHeight',
    'update:color',
    'update:unit',
    'update:elevation',
    'update:direction',
  ],
  computed: {
    colorToHex() {
      return numberToHex(this.color || 0)
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
