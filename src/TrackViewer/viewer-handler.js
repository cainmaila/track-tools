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
    const _po = { x: point[0] * 1, y: point[1] * 1 }
    point.length > 2 && (_po.z = point[2])
    point.length > 3 && (_po.data = point[3] * 1)
    viewPortRef.value.pushPoint(_po)
    viewerStore.mode === 'lock' && viewPortRef.value.lockCenter()
  }
  const suspend = () => {
    viewPortRef.value.suspend()
  }
  const generateHistory = () => {
    return historyToDataTransform(viewPortRef.value.generateHistory())
  }
  return { pushPoint, generateHistory, suspend }
}
