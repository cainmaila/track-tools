/* 處理 總區域 的變化 */
import { hexToNumber } from '@/tools/colorTools'
import { reactive, ref, watch } from 'vue'
function scopeAreaHandler() {
  const scopeArea = ref(null)
  const scopeAreaData = reactive({
    tag: 'Scope Area',
    unit: 'm',
    widthPx: 0,
    heightPx: 0,
    realWidth: 10,
    realHeight: 10,
    scale: 0,
    color: 0xff00ff,
  })

  //取得寬高
  const resizeScopeArea = () => {
    const _bound = scopeArea.value.getRectangleBounds()
    scopeAreaData.widthPx = _bound.width
    scopeAreaData.heightPx = _bound.height
  }

  //圖綁定資料
  watch(scopeArea, () => {
    if (scopeArea.value) {
      scopeArea.value.alpha = 0
      scopeArea.value.tag = scopeAreaData.tag
      resizeScopeArea()
      scopeArea.value.rectangle.on('edit-resize', resizeScopeArea)
    }
  })

  //資料綁定圖
  //改tag
  watch(
    () => scopeAreaData.tag,
    tag => {
      scopeArea.value.tag = tag
    },
  )
  //改色
  watch(
    () => scopeAreaData.color,
    color => {
      scopeArea.value.lineColor =
        typeof color == 'string' ? hexToNumber(color) : color
    },
  )
  //比例變化
  watch([() => scopeAreaData.widthPx, () => scopeAreaData.realWidth], () => {
    scopeAreaData.scale = scopeAreaData.widthPx / scopeAreaData.realWidth
  })

  return { scopeAreaData, scopeArea }
}

export default scopeAreaHandler
