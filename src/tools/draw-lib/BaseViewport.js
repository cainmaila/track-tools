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
    this.scaled += sc
  }
}

export default BaseViewport
