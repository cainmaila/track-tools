<template>
  <div class="file-info-mod">
    <h3>{{ $t('Editor.FileInfoMode.til') }}</h3>
    <Box>
      <LabText :lab="$t('Editor.FileInfoMode.docName')">{{
        info.name
      }}</LabText>
      <LabText :lab="$t('Editor.FileInfoMode.fileName')">{{
        info.file
      }}</LabText>
      <LabText :lab="$t('Editor.FileInfoMode.size')">{{ info.size }}</LabText>
      <LabText :lab="$t('Editor.FileInfoMode.onwer')">{{ info.onwer }}</LabText>
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
