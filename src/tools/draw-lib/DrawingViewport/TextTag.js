import * as PIXI from 'pixi.js'
class TextTag extends PIXI.Container {
  constructor(txt, location = 5, style = null) {
    super()
    const _defStyle = {
      //https://pixijs.download/release/docs/PIXI.TextStyle.html
      ...{
        fill: 0x000000,
        fontSize: 16,
        letterSpacing: 1,
      },
      ...(style || {}),
    }
    this._txt = null //txt物件
    this.createText(txt, _defStyle)
    _defStyle.bg !== undefined && this.createBg(_defStyle.bg)
    this.setLocation(location)
    this.cacheAsBitmap = true
  }
  createText(txt, style) {
    this._txt = new PIXI.Text(txt, style)
    this._txt.resolution = window.devicePixelRatio
    this.addChild(this._txt)
  }
  createBg(bg) {
    const _padding = 10
    const _bg = new PIXI.Graphics()
    _bg.beginFill(bg, 1)
    _bg.drawFilletRect(
      0,
      0,
      this._txt.width + _padding * 2,
      this._txt.height + _padding * 2,
      10,
    )
    _bg.endFill()
    _bg.x = 0
    _bg.y = 0
    this._txt.x = _padding
    this._txt.y = _padding
    this.addChildAt(_bg, 0)
  }
  setLocation(location) {
    switch (location) {
      case 1:
        break
      case 2:
        this.pivot.x = this.width >> 1
        break
      case 3:
        this.pivot.x = this.width
        break
      case 4:
        this.pivot.y = this.height >> 1
        break
      case 5:
        this.pivot.x = this.width >> 1
        this.pivot.y = this.height >> 1
        break
      case 6:
        this.pivot.x = this.width
        this.pivot.y = this.height >> 1
        break
      case 7:
        this.pivot.y = this.height
        break
      case 8:
        this.pivot.x = this.width >> 1
        this.pivot.y = this.height
        break
      case 9:
        this.pivot.x = this.width
        this.pivot.y = this.height
        break
    }
  }
}
export default TextTag
