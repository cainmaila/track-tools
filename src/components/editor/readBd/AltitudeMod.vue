<template>
  <ReadMeMod>
    <template v-slot:top>
      <div class="img-bg flex-center">
        <img src="img/readBd/altitude.png" width="250" />
      </div>
    </template>
    <template v-slot:foot>
      <div class="til">樓層高度</div>
      <div>
        平面圖樓地板與建築模型1樓樓地板的距離
      </div>
    </template>
  </ReadMeMod>
</template>
<script>
import ReadMeMod from './ReadMeMod'
export default {
  name: 'AltitudeMod',
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
