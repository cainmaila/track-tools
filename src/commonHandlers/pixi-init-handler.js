/* 幫你創建 PIXI 實體的好幫手，包含pixi的resize方法 */
import { ref, onMounted } from 'vue'
import * as PIXI from 'pixi.js'
function pixiInitHandler(store, isAlpha) {
  const viewRef = ref(null) //取得 id Viewer el
  const appRef = ref(null) //pixi app 實體
  const onViewResize = () => {
    appRef.value.renderer.resize(
      viewRef.value.clientWidth,
      viewRef.value.clientHeight,
    )
  }
  onMounted(() => {
    appRef.value && appRef.value.destroy({ removeView: true }) //銷毀舊的
    const view = viewRef.value
    const steeing = {
      antialias: true,
      autoDensity: true,
      resolution: window.devicePixelRatio || 1,
    }
    isAlpha
      ? (steeing.backgroundAlpha = 0)
      : (steeing.backgroundColor = 0xffffff)
    const app = new PIXI.Application(steeing)
    appRef.value = app
    onViewResize()
    view.appendChild(app.view)
    store.state = 'ready' /* 狀態機 */
  })
  return {
    viewRef, //顯示容器
    appRef, //pixi實體
    onViewResize, //要求 pixi resize方法
  }
}

export default pixiInitHandler
