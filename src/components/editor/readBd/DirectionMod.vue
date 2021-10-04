<template>
  <ReadMeMod>
    <template v-slot:top>
      <div class="img-bg flex-center">
        <img src="img/readBd/direction.png" width="250" />
      </div>
    </template>
    <template v-slot:foot>
      <div class="til">方位度數</div>
      <div>
        1. 指定平面圖上方方位
      </div>
      <div>2. 查看指北針角度</div>
      <div>3. 將指北針角度填入 「方位度數」</div>
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
