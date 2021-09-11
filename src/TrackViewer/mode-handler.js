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
  return { pushPoint }
}
