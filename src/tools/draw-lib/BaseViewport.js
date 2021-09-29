import { Viewport } from 'pixi-viewport'
class BaseViewport extends Viewport {
  constructor(app) {
    super({
      interaction: app.renderer.plugins.interaction, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    })
    app.stage.addChild(this)
    this._app = app
  }
  /* 縮放倍數 */
  zoom(sc) {
    const _sc = this.scaled + sc
    if (_sc <= 0) return //縮小例外處理
    this.scaled = _sc
  }
}

export default BaseViewport
