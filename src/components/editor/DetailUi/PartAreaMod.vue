<template>
  <div id="ScopeAreaMod">
    <div>區域名稱<At2Input :value="tag" @input="onInput" /></div>
  </div>
</template>
<script>
import At2Input from '~at2@/components/At2Input'
export default {
  name: 'ScopeAreaMod',
  components: {
    At2Input,
  },
  props: ['selectArea'],
  data() {
    return {
      tag: '',
    }
  },
  watch: {
    selectArea: {
      immediate: true,
      handler(val) {
        this.tag = val.tag
      },
    },
    tag(val) {
      // eslint-disable-next-line vue/no-mutating-props
      this.selectArea.tag = val
    },
  },
  methods: {
    onInput(val) {
      this.tag = val
    },
  },
}
</script>
<style lang="postcss" scoped></style>
