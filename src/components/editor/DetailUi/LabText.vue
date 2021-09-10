<template>
  <div class="lab-text">
    <div class="lab" v-if="lab">{{ lab }}</div>
    <div class="text">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'LabText',
  props: ['lab'],
  data() {
    return {}
  },
}
</script>
<style lang="postcss" scoped>
.lab-text {
  margin: 0 0 20px 0;
  & .lab {
    color: rgb(143, 143, 143);
    font-size: 10px;
    line-height: 14px;
  }
  & .text {
    color: rgb(0, 0, 0);
    font-size: 14px;
    line-height: 20px;
  }
}
</style>
