import { hexToNumber } from '@/tools/colorTools'
import { reactive, ref, watch } from 'vue'
function scopeAreaHandler() {
  const scopeArea = ref(null)
  const scopeAreaData = reactive({
    tag: 'Scope Area',
    widthPx: 0,
    heightPx: 0,
    realWidth: 10,
    realHeight: 10,
    scale: 0,
    color: 0xff00ff,
  })

  const resizeScopeArea = () => {
    const _bound = scopeArea.value.getRectangleBounds()
    scopeAreaData.widthPx = _bound.width
    scopeAreaData.heightPx = _bound.height
  }

  watch(scopeArea, () => {
    if (scopeArea.value) {
      scopeArea.value.alpha = 0
      scopeArea.value.tag = scopeAreaData.tag
      resizeScopeArea()
      scopeArea.value.rectangle.on('edit-resize', resizeScopeArea)
    }
  })

  watch(scopeAreaData, val => {
    scopeArea.value.tag = val.tag
    scopeArea.value.lineColor =
      typeof val.color == 'string' ? hexToNumber(val.color) : val.color
  })

  return { scopeAreaData, scopeArea }
}

export default scopeAreaHandler
