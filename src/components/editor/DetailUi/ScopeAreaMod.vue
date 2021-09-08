<template>
  <div id="ScopeAreaMod">
    <h3>總識別區域</h3>
    <Box>
      <template v-slot:til>1. 區域名稱 <span class="red">*</span></template>
      <div>
        <At2Input :value="tag" @input="val => $emit('update:tag', val)" />
      </div>
    </Box>
    <Box>
      <template v-slot:til>2. 總面積 <span class="red">*</span></template>
      <div class="flex-between strip">
        <div>單位:</div>
        <select
          class="inp"
          :value="unit"
          @input="e => $emit('update:unit', e.target.value)"
        >
          <option value="m">m</option>
          <option value="cm">cm</option>
          <option value="mm">mm</option>
          <option value="ft">ft</option>
          <option value="in">in</option>
        </select>
      </div>
      <div class="flex-between strip">
        <div>長度：</div>
        <At2Input
          class="inp"
          type="number"
          max="99999999999999"
          step="0.01"
          :value="realWidth"
          @input="val => $emit('update:realWidth', val)"
        />
      </div>
      <div class="flex-between strip">
        <div>寬度：</div>
        <At2Input
          class="inp"
          type="number"
          max="99999999999999"
          step="0.01"
          :value="realHeight.toFixed(2)"
          @input="val => $emit('change-realHeight', val)"
        />
      </div>
      <!-- <div class="flex-between strip">
        <div>比例尺:</div>
        <div class="inp">{{ scale.toFixed(2) }}</div>
      </div> -->
      <div>
        樓層高<At2Input
          type="number"
          max="99999999999999"
          step="0.01"
          :value="elevation"
          @input="val => $emit('update:elevation', val)"
        />
      </div>
    </Box>

    <div class="flex">
      方位角<At2Input
        type="number"
        max="360"
        step="1"
        :value="direction"
        @input="val => $emit('update:direction', val)"
      />
      <div :style="rotateStyle">
        <At2Icon type="packup" width="16" height="16" />
      </div>
    </div>
    <div>Color<At2Input type="color" :value="color" @input="emitColor" /></div>
  </div>
</template>
<script>
import { numberToHex } from '@/tools/colorTools'
import At2Input from '~at2@/components/At2Input'
import At2Icon from '~at2@/components/At2Icon'
import Box from './Box'
export default {
  name: 'ScopeAreaMod',
  components: { At2Input, At2Icon, Box },
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
    rotateStyle() {
      return `transform: rotate(${this.direction}deg);`
    },
  },
  methods: {
    emitColor(_hex) {
      this.$emit('update:color', _hex)
    },
  },
}
</script>
<style lang="postcss" scoped>
h3 {
  font-weight: bold;
  background-color: #fff;
  padding: 14px 20px;
  margin: 0px;
  font-size: 16px;
  line-height: 22px;
}
select {
  height: 36px;
  padding: 0 5px;
  border-radius: 5px;
  border: 1px solid rgb(214, 214, 214);
}
.strip {
  margin: 10px 0;
  & .inp {
    width: 110px;
  }
}
.red {
  color: #f00;
}
</style>
