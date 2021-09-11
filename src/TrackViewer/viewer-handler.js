/* 顯示 mode 變換 */
import { watch } from 'vue'
export default function(store, viewPortRef) {
  watch(
    () => store.mode,
    mode => {
      switch (mode) {
        case 'mone':
          viewPortRef.value.zoomTofit()
          break
        case 'lock':
          viewPortRef.value.lockCenter()
          break
      }
    },
  )
  const pushPoint = point => {
    viewPortRef.value.pushPoint({ x: point[0] * 1, y: point[1] * 1 })
    store.mode === 'lock' && viewPortRef.value.lockCenter()
  }
  const generateHistory = () => {
    return _historyFormat(viewPortRef.value.generateHistory())
  }
  return { pushPoint, generateHistory }
}

//轉換輸出格式 http://confluence.anchortech.io/display/LEED/AnchorTrack+SA+-+Web
function _historyFormat(_history = []) {
  return {
    locations: _history.map(_po => {
      return {
        pos: `${_po.x},${_po.y}`,
        fileId: _po.z,
        date: _po.date,
      }
    }),
  }
}
