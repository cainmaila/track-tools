<template>
  <ReadMeMod>
    <template v-slot:top>
      <div class="img-bg flex-center">
        <img src="img/readBd/height.png" width="250" />
      </div>
    </template>
    <template v-slot:foot>
      <div class="til">樓板高度</div>
      <div>
        房間的樓板地板到天花板的高度
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
  background-color: #7ea4b7;
  text-align: center;
}
.til {
  font-size: 18px;
  line-height: 24px;
  font-weight: bold;
  margin-bottom: 13px;
}
</style>
