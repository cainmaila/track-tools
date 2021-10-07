<template>
  <div v-if="rest">
    <div class="p1" v-if="pav == 0">
      <div class="txt-center">
        <img src="img/teachingMod/p1.png" alt="" />
      </div>
      <div class="txt">
        <div>{{ $t('readMe.TeachingMod.txt1') }}</div>
        <div>{{ $t('readMe.TeachingMod.txt2') }}</div>
        <div>{{ $t('readMe.TeachingMod.txt3') }}</div>
        <div>{{ $t('readMe.TeachingMod.txt4') }}</div>
        <div class="t2">{{ $t('readMe.TeachingMod.txt5') }}</div>
      </div>
      <div class="next flex-center bn" @pointerup.stop="$emit('next')">
        {{ $t('common.next') }}
      </div>
    </div>
    <div class="p1" v-else>
      <div class="txt-center">
        <img src="img/teachingMod/setp2.png" alt="" />
      </div>
      <div class="txt">
        <div>{{ $t('readMe.TeachingMod.p2Txt1') }}</div>
        <div>{{ $t('readMe.TeachingMod.p2Txt2') }}</div>
        <div>{{ $t('readMe.TeachingMod.p2Txt3') }}</div>
        <div class="t2">
          {{ $t('readMe.TeachingMod.p2Txt4') }}
        </div>
      </div>
      <div class="next flex-center bn" @pointerup.stop="$emit('next')">
        {{ $t('common.back') }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'P1',
  props: ['pav'],
  data() {
    return {
      rest: true,
    }
  },
  watch: {
    pav() {
      this.rest = false
      setTimeout(() => {
        this.rest = true
      })
    },
  },
}
</script>
<style lang="postcss" scoped>
.txt-center {
  text-align: center;
}
img {
  width: 80%;
  height: auto;
}
.txt {
  margin: 30px 0 0 0;
  color: rgb(0, 0, 0);
  font-size: 14px;
  font-weight: bold;
  line-height: 23px;
  & div {
    margin-bottom: 10px;
  }
  & .t2 {
    color: rgb(72, 107, 128);
    margin-bottom: 0px;
  }
}
.next {
  margin-top: 40px;
  font-size: 14px;
  width: 100%;
  color: rgb(2, 74, 230);
  font-weight: bold;
}
</style>
