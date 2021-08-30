import * as PIXI from 'pixi.js'
import DrawingViewport from '@/tools/draw-lib/DrawingViewport'
import { ref } from 'vue'
function createViewPort(APP_NAME) {
  const ViewRef = ref(null)
  const viewportRef = ref()
  window.addEventListener('message', ({ data }) => {
    const { target, message } = data || {}
    let initOb
    if (target === APP_NAME) {
      switch (message.type) {
        case 'setting':
          initOb = _drawingViewportInit(ViewRef.value, message.data) //傳入設定，創建viewport
          viewportRef.value = initOb.viewport
          break
        default:
          console.warn('未定的type', message)
      }
    }
  })
  return {
    ViewRef,
    viewportRef,
  }
}

/* 初始化 pixi 並創建 DrawingViewport 物件 */
function _drawingViewportInit(view, setting) {
  const app = new PIXI.Application({
    antialias: true,
    autoDensity: true,
    resolution: window.devicePixelRatio || 1,
    backgroundColor: setting.bgColor === undefined ? 0xffffff : setting.bgColor,
  })
  resize()
  view.appendChild(app.view)

  const viewport = new DrawingViewport(app, {
    ...setting,
    devicePixelRatio: window.devicePixelRatio || 1,
  })

  window.onresize = () => {
    resize()
    viewport.resize()
  }
  function resize() {
    app.renderer.resize(view.clientWidth, view.clientHeight)
  }
  return { app, viewport }
}

export { createViewPort }
