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
  </div>
</template>
<script>
import At2Input from '~at2@/components/At2Input'
export default {
  name: 'ScopeAreaMod',
  components: {
    At2Input,
  },
  props: ['selectAreaColor', 'selectAreaTag', 'selectAreaW', 'selectAreaH'],
  emits: ['update:selectAreaColor', 'update:selectAreaTag'],
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
