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
    let _suspendTime = 0
    viewport.on('suspend', () => {
      new Audio(`./sound/btn-c.mp3`).play()
      store.suspendAlertShow = true
      clearTimeout(_suspendTime)
      _suspendTime = setTimeout(() => {
        store.suspendAlertShow = false
      }, 2000)
    })
    console.log('2222', viewport)

    viewPortRef.value = viewport
  }

  return {
    viewPortRef,
    viewerSetting, //設定viewer
  }
}

export default viewPortInitHandler
