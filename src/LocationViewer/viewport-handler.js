import { ref } from 'vue'
import LocationViewport from '@/tools/draw-lib/DrawPathViewport/LocationViewport'
import { log, postIOSEvent } from '@/commonHandlers/ios-interface'
import { TO_IOS_EVENT } from './ios-interface-handler'
function viewPortInitHandler(store, appRef) {
  const viewPortRef = ref()
  let _setting = null

  const restPosition = () => {
    const { pos_left_up, length, width } = _setting.area
    viewPortRef.value.zoomToArea({
      x: pos_left_up.x,
      y: pos_left_up.y,
      width: length,
      height: width,
    }) //設定顯示範圍
  }
  const viewerSetting = setting => {
    _setting = setting
    const viewport = new LocationViewport(appRef.value, {
      floors: [setting.floor],
    })
    viewport.on('resources-ready', () => {
      //樓板圖面載入
      viewport.floor = setting.floor.id
      restPosition()
      store.state = 'loaded' /* 狀態機 */
    })
    viewPortRef.value = viewport
    viewPortRef.value.on('select-location', id => {
      log('#select-location ' + id)
      postIOSEvent(TO_IOS_EVENT.selectLocation, id)
    })
  }

  const addLocation = point => {
    viewPortRef.value.addLocation(point)
  }

  return {
    viewPortRef,
    viewerSetting, //設定viewer
    addLocation, //新增其他定位點
    restPosition, //設定顯示範圍
  }
}

export default viewPortInitHandler
