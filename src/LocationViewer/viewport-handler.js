import { ref } from 'vue'
import DrawPathViewport from '@/tools/draw-lib/DrawPathViewport'
function viewPortInitHandler(store, appRef) {
  const viewPortRef = ref()
  const viewerSetting = setting => {
    const viewport = new DrawPathViewport(appRef.value, {
      floors: [setting.floor],
    })
    viewport.on('resources-ready', () => {
      //樓板圖面載入
      viewport.floor = setting.floor.id
      viewport.zoomToArea(setting.area) //設定顯示範圍
      store.state = 'loaded' /* 狀態機 */
    })
    viewPortRef.value = viewport
  }

  return {
    viewPortRef,
    viewerSetting, //設定viewer
  }
}

export default viewPortInitHandler
