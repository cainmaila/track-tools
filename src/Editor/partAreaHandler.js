import { ref, reactive, watch } from 'vue'
import { numberToHex, hexToNumber } from '@/tools/colorTools'
function partAreaHandler(scopeAreaData) {
  const selectAreaRef = ref()
  const selectAreaData = reactive({
    tag: '',
    realWidth: 0,
    realHeight: 0,
    color: 0,
  })
  const setBounds = () => {
    if (selectAreaRef.value) {
      const _bound = selectAreaRef.value.getRectangleBounds()
      selectAreaData.realWidth = _bound.width / scopeAreaData.scale
      selectAreaData.realHeight = _bound.height / scopeAreaData.scale
    }
  }
  watch(selectAreaRef, (val, old) => {
    old && old.rectangle.off('edit-resize', setBounds)
    if (val) {
      selectAreaData.tag = val.tag
      selectAreaData.color = numberToHex(val.lineColor)
      setBounds()
      val && val.rectangle.on('edit-resize', setBounds)
    }
  })
  watch(
    () => selectAreaData.tag,
    val => {
      if (selectAreaRef.value) {
        selectAreaRef.value.tag = val
      }
    },
  )
  watch(
    () => selectAreaData.color,
    color => {
      if (selectAreaRef.value) {
        const _colorNum = hexToNumber(color)
        selectAreaRef.value.lineColor = _colorNum
        selectAreaRef.value.fillColor = _colorNum
      }
    },
  )
  watch(() => scopeAreaData.scale, setBounds)
  return {
    selectAreaData,
    selectAreaRef,
  }
}

export default partAreaHandler
