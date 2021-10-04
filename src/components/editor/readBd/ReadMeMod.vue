<template>
  <div class="readme-bd flex-center">
    <div class="bd">
      <div class="top"></div>
      <div class="foot"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ReadMeMod',
  data() {
    return {}
  },
}
</script>
<style lang="postcss" scoped>
.readme-bd {
  position: absolute;
  width: 100%;
  height: 100%;
  & .bd {
    width: 490px;
    height: 420px;
    broad-radius: 7px;
    overflow: hidden;
    & .top {
      width: 100%;
      height: calc(420px - 150px);
    }
    & .foot {
      width: 100%;
      height: 150px;
    }
  }
}
</style>
