<template>
  <div class="file-info-mod">
    <h3>詳情</h3>
    <Box>
      <LabText lab="定位文件名稱">{{ info.name }}</LabText>
      <LabText lab="執行圖紙">{{ info.file }}</LabText>
      <LabText lab="文件大小">{{ info.size }}</LabText>
      <LabText lab="擁有者">{{ info.onwer }}</LabText>
    </Box>
  </div>
</template>
<script>
import Box from './Box'
import LabText from './LabText'
export default {
  name: 'FileInfoMod',
  components: { Box, LabText },
  props: ['info'],
  data() {
    return {}
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
