import { ref } from 'vue'
import LocationViewport from '@/tools/draw-lib/DrawPathViewport/LocationViewport'
function viewPortInitHandler(store, appRef) {
  const viewPortRef = ref()
  const viewerSetting = setting => {
    const viewport = new LocationViewport(appRef.value, {
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

  const addLocation = point => {
    viewPortRef.value.addLocation(point)
  }

  return {
    viewPortRef,
    viewerSetting, //設定viewer
    addLocation, //新增其他定位點
  }
}

export default viewPortInitHandler
