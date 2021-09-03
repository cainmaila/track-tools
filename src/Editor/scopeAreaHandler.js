/* 處理 總區域 的變化 */
import { hexToNumber } from '@/tools/colorTools'
import { reactive, ref, watch } from 'vue'
function scopeAreaHandler() {
  const scopeArea = ref(null)
  const scopeAreaData = reactive({
    tag: 'Scope Area',
    unit: 'm',
    offsetX: 0,
    offsetY: 0,
    widthPx: 0,
    heightPx: 0,
    realWidth: 10,
    realHeight: 10,
    scale: 0,
    color: '#0011ff',
    elevation: 0, //標高
    direction: 0, //方位角 0-360
  })

  //取得寬高
  const resizeScopeArea = () => {
    const _bound = scopeArea.value.getRectangleBounds()
    scopeAreaData.offsetX = _bound.x
    scopeAreaData.offsetY = _bound.y
    scopeAreaData.widthPx = _bound.width
    scopeAreaData.heightPx = _bound.height
  }

  //圖綁定資料
  watch(scopeArea, () => {
    if (scopeArea.value) {
      scopeArea.value.tag = scopeAreaData.tag
      resizeScopeArea()
      scopeArea.value.rectangle.on('edit-resize', resizeScopeArea)
      scopeArea.value.rectangle.on('select-end', resizeScopeArea)
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
      const _c = typeof color == 'string' ? hexToNumber(color) : color
      scopeArea.value.lineColor = _c
      scopeArea.value.fillColor = _c
    },
  )
  //比例變化
  watch([() => scopeAreaData.widthPx, () => scopeAreaData.realWidth], () => {
    scopeAreaData.scale = scopeAreaData.widthPx / scopeAreaData.realWidth
  })

  //計算實際高度
  watch([() => scopeAreaData.scale, () => scopeAreaData.heightPx], () => {
    scopeAreaData.realHeight = scopeAreaData.heightPx / scopeAreaData.scale
  })

  const changeAreaRealHeight = _h => {
    scopeArea.value.height = _h * scopeAreaData.scale
  }

  return { scopeAreaData, scopeArea, changeAreaRealHeight }
}

export default scopeAreaHandler
