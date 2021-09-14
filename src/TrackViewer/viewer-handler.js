/* 顯示 mode 變換 */
import { watch } from 'vue'
import { historyToDataTransform } from '@/tools/trackMeta-tools'
export default function(viewerStore, viewPortRef) {
  watch(
    () => viewerStore.mode,
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
    viewerStore.mode === 'lock' && viewPortRef.value.lockCenter()
  }
  const generateHistory = () => {
    return historyToDataTransform(viewPortRef.value.generateHistory())
  }
  return { pushPoint, generateHistory }
}
