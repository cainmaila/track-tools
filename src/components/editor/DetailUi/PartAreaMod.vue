<template>
  <div id="ScopeAreaMod">
    <div>
      區域名稱<At2Input
        :value="selectAreaTag"
        @input="val => $emit('update:selectAreaTag', val)"
      />
    </div>
    <div>長:{{ selectAreaW.toFixed(2) }}</div>
    <div>寬:{{ selectAreaH.toFixed(2) }}</div>
    <div>
      Color<At2Input
        type="color"
        :value="selectAreaColor"
        @input="val => $emit('update:selectAreaColor', val)"
      />
    </div>
    <div>
      隔板高<At2Input
        type="number"
        step="0.01"
        max="99999999999999"
        :value="spaceHeight"
        @input="val => $emit('update:spaceHeight', val)"
      />
    </div>
    <div>
      位移 x:{{ selectRealOffsetX.toFixed(2) }} ,y:{{
        selectRealOffsetY.toFixed(2)
      }}
    </div>
  </div>
</template>
<script>
import At2Input from '~at2@/components/At2Input'
export default {
  name: 'ScopeAreaMod',
  components: {
    At2Input,
  },
  props: [
    'selectAreaColor',
    'selectAreaTag',
    'selectAreaW',
    'selectAreaH',
    'selectRealOffsetX',
    'selectRealOffsetY',
    'spaceHeight',
  ],
  emits: [
    'update:selectAreaColor',
    'update:selectAreaTag',
    'update:spaceHeight',
  ],
  data() {
    return {
      tag: '',
      color: '',
      bounds: null,
    }
  },
}
</script>
<style lang="postcss" scoped></style>
