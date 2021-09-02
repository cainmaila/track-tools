import * as PIXI from 'pixi.js'
import DrawingViewport from '@/tools/draw-lib/DrawingViewport'
import { ref } from 'vue'
function createViewPort() {
  const ViewRef = ref(null)
  const viewportRef = ref()
  let initOb
  const create = setting => {
    initOb = _drawingViewportInit(ViewRef.value, setting) //傳入設定，創建viewport
    viewportRef.value = initOb.viewport
  }
  return {
    ViewRef,
    viewportRef,
    create,
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
