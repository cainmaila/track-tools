<template>
  <div id="PartAreaMod">
    <h3>識別區域</h3>
    <Box>
      <template v-slot:til>1. 區域名稱 <span class="red">*</span></template>
      <div v-if="readOnly">{{ selectAreaTag }}</div>
      <div v-else>
        <At2Input
          :value="selectAreaTag"
          @input="val => $emit('update:selectAreaTag', val)"
        />
      </div>
    </Box>
    <Box>
      <template v-slot:til>2. 區域大小 <span class="red">*</span></template>
      <div class="flex-between strip">
        <div>單位:</div>
        <div>{{ unit }}</div>
      </div>
      <div class="flex-between strip">
        <div>長度：</div>
        <div>{{ selectAreaW.toFixed(2) }}</div>
      </div>
      <div class="flex-between strip">
        <div>寬度：</div>
        <div>{{ selectAreaH.toFixed(2) }}</div>
      </div>
      <div class="flex-between strip">
        <div>房間高度：</div>
        <div v-if="readOnly">{{ spaceHeight }}</div>
        <At2Input
          v-else
          class="inp"
          type="number"
          step="0.01"
          max="99999999999999"
          :value="spaceHeight"
          @input="val => $emit('update:spaceHeight', val)"
        />
      </div>
    </Box>
    <Box>
      <template v-slot:til>3. 邊距</template>
      <div class="flex-between strip">
        <div>到平面圖左上角的垂直 距離：</div>
        <div>{{ selectRealOffsetX.toFixed(2) }}</div>
      </div>
      <div class="flex-between strip">
        <div>到平面圖左上角的水平 距離：</div>
        <div>{{ selectRealOffsetY.toFixed(2) }}</div>
      </div>
    </Box>
    <Box v-if="!readOnly">
      <template v-slot:til> 4. 其他</template>
      <div class="flex-between strip">
        <div>
          區域顏色：
        </div>
        <At2Input
          class="inp"
          type="color"
          :value="selectAreaColor"
          @input="val => $emit('update:selectAreaColor', val)"
        />
      </div>
    </Box>
  </div>
</template>
<script>
import At2Input from '~at2@/components/At2Input'
import Box from './Box'
export default {
  name: 'PartAreaMod',
  components: {
    At2Input,
    Box,
  },
  props: [
    'unit',
    'selectAreaColor',
    'selectAreaTag',
    'selectAreaW',
    'selectAreaH',
    'selectRealOffsetX',
    'selectRealOffsetY',
    'spaceHeight',
    'readOnly',
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
