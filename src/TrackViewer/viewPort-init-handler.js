import { ref } from 'vue'
import DrawPathViewport from '@/tools/draw-lib/DrawPathViewport'
function viewPortInitHandler(store, appRef) {
  const viewPortRef = ref()
  const viewerSetting = setting => {
    const viewport = new DrawPathViewport(appRef.value, setting)
    viewport.on('resources-ready', () => {
      //樓板圖面載入
      viewport.floor = setting.floors[0].id
      store.state = 'loaded' /* 狀態機 */
    })
    viewPortRef.value = viewport
  }
  const pushPoint = point => {
    viewPortRef.value.pushPoint({ x: point[0] * 1, y: point[1] * 1 })
  }
  return {
    viewPortRef,
    viewerSetting, //設定viewer
    pushPoint, //推送點
  }
}

export default viewPortInitHandler
