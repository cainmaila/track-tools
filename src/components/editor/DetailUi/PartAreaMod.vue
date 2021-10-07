<template>
  <div id="PartAreaMod">
    <h3>{{ $t('Editor.PartAreaMod.til') }}</h3>
    <Box>
      <template v-slot:til
        >1. {{ $t('Editor.PartAreaMod.name') }}
        <span class="red">*</span></template
      >
      <div v-if="!canEdit">{{ selectAreaTag }}</div>
      <div v-else>
        <At2Input
          :value="selectAreaTag"
          @input="val => $emit('update:selectAreaTag', val)"
        />
      </div>
    </Box>
    <Box>
      <template v-slot:til
        >2. {{ $t('Editor.PartAreaMod.size') }}
        <span class="red">*</span></template
      >
      <div class="flex-between strip">
        <div>{{ $t('common.unit') }}:</div>
        <div>{{ unit }}</div>
      </div>
      <div class="flex-between strip">
        <div>{{ $t('common.leng') }}：</div>
        <div>{{ selectAreaW.toFixed(2) }}</div>
      </div>
      <div class="flex-between strip">
        <div>{{ $t('common.width') }}：</div>
        <div>{{ selectAreaH.toFixed(2) }}</div>
      </div>
      <div class="flex-between strip">
        <div class="flex">
          {{ $t('Editor.PartAreaMod.roomHight') }}：
          <div class="bn" @pointerup.stop="$emit('readMe', 'height')">
            <At2Icon
              type="information"
              color="#1a4fbe"
              width="16"
              height="16"
            />
          </div>
        </div>
        <div v-if="!canEdit">{{ spaceHeight }}</div>
        <At2Input
          v-else
          class="inp"
          type="number"
          step="0.01"
          max="99999999999999"
          :value="spaceHeight"
          @input="val => $emit('update:spaceHeight', val)"
          :error="
            spaceHeight == 0 ? $t('Editor.PartAreaMod.roomHightError') : ''
          "
        />
      </div>
    </Box>
    <Box>
      <template v-slot:til>3. {{ $t('Editor.PartAreaMod.roomD') }}</template>
      <div class="flex-between strip">
        <div>{{ $t('Editor.PartAreaMod.offsetX') }}：</div>
        <div>{{ selectRealOffsetX.toFixed(2) }}</div>
      </div>
      <div class="flex-between strip">
        <div>{{ $t('Editor.PartAreaMod.offsetY') }}：</div>
        <div>{{ selectRealOffsetY.toFixed(2) }}</div>
      </div>
    </Box>
    <Box v-if="canEdit">
      <template v-slot:til> 4. {{ $t('common.other') }}</template>
      <div class="flex-between strip">
        <div>{{ $t('Editor.PartAreaMod.color') }}：</div>
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
import At2Icon from '~at2@/components/At2Icon'
import Box from './Box'
export default {
  name: 'PartAreaMod',
  components: {
    At2Input,
    At2Icon,
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
    'selectEditEnable',
    'spaceHeight',
    'readOnly',
  ],
  emits: [
    'readMe',
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
  computed: {
    canEdit() {
      return !this.readOnly && this.selectEditEnable
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
