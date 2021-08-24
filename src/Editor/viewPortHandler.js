import * as PIXI from 'pixi.js'
import DrawingViewport from '@/tools/draw-lib/DrawingViewport'

/* 初始化 pixi 並創建 DrawingViewport 物件 */
function createDrawingViewport(view) {
  const app = new PIXI.Application({
    antialias: true,
    autoDensity: true,
    resolution: window.devicePixelRatio || 1,
    backgroundColor: 0xffffff,
  })
  resize()
  view.appendChild(app.view)

  const viewport = new DrawingViewport(app, {
    bg: './img/bg.png',
    aeraSetting: {
      lineColor: 0xff00ff,
      tagStyle: { fill: 0xffffff, bg: 0x000000 },
    },
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

export { createDrawingViewport }
