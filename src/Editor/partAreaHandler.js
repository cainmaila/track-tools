import { ref, reactive, watch } from 'vue'
import { numberToHex, hexToNumber } from '@/tools/colorTools'
function partAreaHandler(scopeAreaData) {
  const selectAreaRef = ref()
  const selectAreaData = reactive({
    tag: '',
    realOffsetX: 0, //根據全區域算出的實際位移點
    realOffsetY: 0,
    realWidth: 0,
    realHeight: 0,
    color: 0,
  })
  const setBounds = () => {
    if (selectAreaRef.value) {
      const _bound = selectAreaRef.value.getRectangleBounds()
      selectAreaData.realWidth = _bound.width / scopeAreaData.scale
      selectAreaData.realHeight = _bound.height / scopeAreaData.scale
      selectAreaData.realOffsetX =
        (_bound.x - scopeAreaData.offsetX) / scopeAreaData.scale
      selectAreaData.realOffsetY =
        (_bound.y - scopeAreaData.offsetY) / scopeAreaData.scale
    }
  }
  watch(selectAreaRef, (val, old) => {
    old && old.rectangle.off('edit-resize', setBounds)
    old && old.rectangle.off('select-end', setBounds)
    if (val) {
      selectAreaData.tag = val.tag
      selectAreaData.color = numberToHex(val.lineColor)
      setBounds()
      val && val.rectangle.on('edit-resize', setBounds)
      val && val.rectangle.on('select-end', setBounds)
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