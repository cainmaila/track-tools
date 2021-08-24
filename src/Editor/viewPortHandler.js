import * as PIXI from 'pixi.js'
import DrawingViewport from '@/tools/draw-lib/DrawingViewport'

/* 初始化 pixi 並創建 DrawingViewport 物件 */
function drawingViewportInit(view, setting) {
  const app = new PIXI.Application({
    antialias: true,
    autoDensity: true,
    resolution: window.devicePixelRatio || 1,
    backgroundColor: setting.bgColor === undefined ? 0xffffff : setting.bgColo,
  })
  resize()
  view.appendChild(app.view)

  const viewport = new DrawingViewport(app, {
    ...setting,
    devicePixelRatio: window.devicePixelRatio,
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

export { drawingViewportInit }
