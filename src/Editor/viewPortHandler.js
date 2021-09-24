import * as PIXI from 'pixi.js'
import DrawingViewport from '@/tools/draw-lib/DrawingViewport'
import { ref, reactive } from 'vue'
import { postEvent } from './sdkMessageHandler'
let app = null
function createViewPort(readOnly) {
  const ViewRef = ref(null)
  const viewportRef = ref()
  const info = reactive({
    name: '',
    file: '',
    size: '',
    onwer: '',
  })
  let initOb
  const create = setting => {
    initOb = _drawingViewportInit(ViewRef.value, setting, readOnly) //傳入設定，創建viewport
    viewportRef.value = initOb.viewport
    initOb.viewport.on('loaded', () => {
      viewportRef.value.zoomTofit(100 + 100, 360 + 100)
      postEvent('loaded')
    })
    info.name = setting.info.name
    info.file = setting.info.file
    info.size = setting.info.size
    info.onwer = setting.info.onwer
  }

  return {
    ViewRef,
    viewportRef,
    create,
    info,
  }
}

/* 初始化 pixi 並創建 DrawingViewport 物件 */
function _drawingViewportInit(view, setting, readOnly) {
  app && app.destroy({ removeView: true }) //銷毀舊的
  app = new PIXI.Application({
    antialias: true,
    autoDensity: true,
    resolution: window.devicePixelRatio || 1,
    backgroundColor: setting.bgColor === undefined ? 0xffffff : setting.bgColor,
  })
  resize()
  view.appendChild(app.view)

  const viewport = new DrawingViewport(
    app,
    {
      ...setting,
      devicePixelRatio: window.devicePixelRatio || 1,
    },
    readOnly,
  )

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
