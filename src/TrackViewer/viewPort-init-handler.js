import { ref, watch } from 'vue'
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
    store.mode === 'lock' && viewPortRef.value.lockCenter()
  }
  const generateHistory = () => {
    return _historyFormat(viewPortRef.value.generateHistory())
  }

  //mode 變換
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
  return {
    viewPortRef,
    viewerSetting, //設定viewer
    pushPoint, //推送點
    generateHistory, //要求返回紀錄
  }
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

export default viewPortInitHandler
