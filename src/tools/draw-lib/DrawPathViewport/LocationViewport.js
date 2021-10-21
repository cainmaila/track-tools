import * as PIXI from 'pixi.js'
import DrawPathViewport from './index'

/**
 * event select-location 選取定位點
 */
class LocationViewport extends DrawPathViewport {
  constructor(app, setting) {
    super(app, setting)
    this._locationPoints = []
  }
  /* 縮放到區域 */
  zoomToArea(areaSetting, padding = 10) {
    // area: {
    //   pos_left_up: { x: 0, y: 0 },
    //   width: 10,
    //   height: 10,
    // }
    const { offset, scale } = this._floorObj
    const _areaWidth = areaSetting.width * scale
    const _areaHeight = areaSetting.height * scale
    this.scaled = this.findFit(_areaWidth + padding, _areaHeight + padding)
    this.center = {
      x: offset.x + areaSetting.pos_left_up.x * scale + (_areaWidth >> 1),
      y: offset.y + areaSetting.pos_left_up.y * scale + (_areaHeight >> 1),
    }
  }
  /* 新增特殊定位點 */
  addLocation(point) {
    const { scale } = this._floorObj
    const _pointTag = new PointTag()
    _pointTag.id = point.id
    this._locationPoints.push(_pointTag)
    _pointTag.resize(scale >> 2) //把點轉成跟人一樣 目前抓0.5m
    _pointTag.x = point.x * scale
    _pointTag.y = point.y * scale
    this._floorObj.lineLayer.addChild(_pointTag)
    _pointTag.on('select-location', id => this.selectPointById(id))
  }
  selectPointById(id) {
    this._locationPoints.forEach(_po => {
      _po.mode = _po.id === id ? 'select' : 'none'
    })
    this.emit('select-location', id)
  }
}
export default LocationViewport

class PointTag extends PIXI.Graphics {
  constructor(r = 10, color = 0x0071ff) {
    super()
    this._color = color
    this.resize(r)
    this.interactive = true
    this._mode = null //null select none
    this.on('pointertap', () => {
      this.emit('select-location', this.id)
    })
    this._ticker = PIXI.Ticker.shared
    this._timer = 0
    this._ticker.add(time => {
      this._timer += time
      this.alpha = this._timer % 50 > 25 ? 0.3 : 1
    })
  }
  set mode(value) {
    this._mode = value
    this._ticker.stop()
    switch (value) {
      case 'select':
        this._ticker.stop()
        this.alpha = 1
        break
      case 'none':
        this._ticker.stop()
        this.alpha = 0.3
        break
      default:
        this._ticker.start()
    }
  }
  get mode() {
    return this._mode
  }
  resize(r) {
    this.clear()
    this.beginFill(this._color, 1)
    this.drawTorus(0, 0, r * 0.8, r)
    this.drawCircle(0, 0, r >> 1)
  }
}
