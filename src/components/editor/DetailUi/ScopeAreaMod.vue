<template>
  <div id="ScopeAreaMod">
    <h3>{{ $t('Editor.ScopeAreaMod.til') }}</h3>
    <Box>
      <template v-slot:til
        >1. {{ $t('Editor.ScopeAreaMod.name') }}
        <span class="red">*</span></template
      >
      <div v-if="!canEdit">
        {{ tag }}
      </div>
      <div v-else>
        <At2Input :value="tag" @input="val => $emit('update:tag', val)" />
      </div>
    </Box>
    <Box>
      <template v-slot:til
        >2. {{ $t('Editor.ScopeAreaMod.area') }}
        <span class="red">*</span></template
      >
      <div class="flex-between strip">
        <div>{{ $t('common.unit') }}:</div>
        <div v-if="!canEdit">
          {{ unit }}
        </div>
        <select
          v-else
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
        <div>{{ $t('common.leng') }}：</div>
        <div v-if="!canEdit">
          {{ realWidth }}
        </div>
        <At2Input
          v-else
          class="inp"
          type="number"
          max="99999999999999"
          step="0.01"
          :value="realWidth"
          @input="val => $emit('update:realWidth', val)"
          :error="realWidth > 0 ? '' : $t('Editor.ScopeAreaMod.lengError')"
        />
      </div>
      <div class="flex-between strip">
        <div>{{ $t('common.width') }}：</div>
        <div v-if="!canEdit">
          {{ realHeight.toFixed(2) }}
        </div>
        <At2Input
          v-else
          class="inp"
          type="number"
          max="99999999999999"
          step="0.01"
          :value="realHeight.toFixed(2)"
          @change="val => $emit('change-realHeight', val)"
        />
      </div>
      <!-- <div class="flex-between strip">
        <div>比例尺:</div>
        <div class="inp">{{ scale.toFixed(2) }}</div>
      </div> -->
      <div class="flex-between strip">
        <div class="flex">
          {{ $t('Editor.ScopeAreaMod.buildHight') }}：
          <div class="bn" @pointerup.stop="$emit('readMe', 'altitude')">
            <At2Icon
              type="information"
              color="#1a4fbe"
              width="16"
              height="16"
            />
          </div>
        </div>
        <div v-if="!canEdit">
          {{ elevation }}
        </div>
        <At2Input
          v-else
          class="inp"
          type="number"
          max="99999999999999"
          step="0.01"
          :value="elevation"
          @input="val => $emit('update:elevation', val)"
        />
      </div>
    </Box>

    <Box>
      <template v-slot:til>
        3. {{ $t('Editor.ScopeAreaMod.top') }}
        <span class="red">*</span></template
      >
      <div class="flex-between strip">
        <div class="flex">
          {{ $t('Editor.ScopeAreaMod.degree') }}：
          <div class="bn" @pointerup.stop="$emit('readMe', 'direction')">
            <At2Icon
              type="information"
              color="#1a4fbe"
              width="16"
              height="16"
            />
          </div>
        </div>
        <div v-if="!canEdit">
          {{ direction }}
        </div>
        <At2Input
          v-else
          class="inp"
          type="number"
          max="360"
          step="1"
          :value="direction"
          @input="val => $emit('update:direction', val)"
        />
      </div>
    </Box>
    <Box v-if="canEdit">
      <template v-slot:til> 4. {{ $t('common.other') }}</template>
      <div class="flex-between strip">
        <div>{{ $t('Editor.ScopeAreaMod.color') }}：</div>
        <At2Input class="inp" type="color" :value="color" @input="emitColor" />
      </div>
    </Box>
  </div>
</template>
<script>
import { numberToHex } from '@/tools/colorTools'
import At2Input from '~at2@/components/At2Input'
import At2Icon from '~at2@/components/At2Icon'
import Box from './Box'
export default {
  name: 'ScopeAreaMod',
  components: { At2Input, Box, At2Icon },
  props: [
    'tag',
    'realWidth',
    'realHeight',
    'color',
    'scale',
    'unit',
    'elevation',
    'direction',
    'readOnly',
    'scopeAreaEditEnable',
  ],
  emits: [
    'readMe',
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
    canEdit() {
      return !this.readOnly && this.scopeAreaEditEnable
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
