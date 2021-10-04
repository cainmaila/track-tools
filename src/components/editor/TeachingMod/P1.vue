<template>
  <div v-if="rest">
    <div class="p1" v-if="pav == 0">
      <div class="txt-center">
        <img src="/img/teachingMod/p1.png" alt="" />
      </div>
      <div class="txt">
        <div>1. A為「總識別區域」請先點擊A按鈕 “添加 總識別區域”。</div>
        <div>2. 圖面上繪製總識別區域。</div>
        <div>3. 填寫左側面板中相關欄位資料。</div>
        <div>4. A完成設置後，點擊B按鈕可添加個別“識別區域”。</div>
        <div class="t2">提示：總識別區域只需繪製一個。</div>
      </div>
      <div class="next flex-center bn" @pointerup.stop="$emit('next')">
        下一頁
      </div>
    </div>
    <div class="p1" v-else>
      <div class="txt-center">
        <img src="/img/teachingMod/step2.jpg" alt="" />
      </div>
      <div class="txt">
        <div>1. B為「識別區域」請點擊B按鈕 “添加 識別區域”。</div>
        <div>2. 圖面上繪製識別區域。</div>
        <div>3. 填寫左側面板中相關欄位資料。</div>
        <div class="t2">
          提示：識別區域設置與定位精準度有關，建議設置多個識別區域
        </div>
      </div>
      <div class="next flex-center bn" @pointerup.stop="$emit('next')">
        上一頁
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
