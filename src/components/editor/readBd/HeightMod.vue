<template>
  <ReadMeMod>
    <template v-slot:top>
      <div class="img-bg flex-center">
        <img src="img/readBd/height.png" width="250" />
      </div>
    </template>
    <template v-slot:foot>
      <div class="til">房間高度</div>
      <div>
        當前區域的高度 (上圖橘色區域高度)
      </div>
    </template>
  </ReadMeMod>
</template>
<script>
import ReadMeMod from './ReadMeMod'
export default {
  name: 'HeightMod',
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
  background: linear-gradient(
    -225deg,
    rgb(232, 242, 218) 0%,
    rgb(76, 126, 128) 91%,
    rgb(76, 126, 128) 100%
  );
  text-align: center;
}
.til {
  font-size: 18px;
  line-height: 24px;
  font-weight: bold;
  margin-bottom: 13px;
}
</style>
