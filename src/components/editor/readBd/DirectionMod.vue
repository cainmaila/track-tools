<template>
  <ReadMeMod>
    <template v-slot:top>
      <div class="img-bg flex-center">
        <img src="img/readBd/direction.png" width="250" />
      </div>
    </template>
    <template v-slot:foot>
      <div class="til">{{ $t('readMe.DirectionMod.til') }}</div>
      <div>
        {{ $t('readMe.DirectionMod.txt1') }}
      </div>
      <div>
        {{ $t('readMe.DirectionMod.txt2') }}
      </div>
      <div>
        {{ $t('readMe.DirectionMod.txt3') }}
      </div>
    </template>
  </ReadMeMod>
</template>
<script>
import ReadMeMod from './ReadMeMod'
export default {
  name: 'DirectionMod',
  components: { ReadMeMod },
  data() {
    return {}
  },
}
</script>
<style lang="postcss" scoped>
.img-bg {
  width: 100%;
  height: 100%;
  background-color: #005067;
  text-align: center;
}
.til {
  font-size: 18px;
  line-height: 24px;
  font-weight: bold;
  margin-bottom: 13px;
}
</style>
