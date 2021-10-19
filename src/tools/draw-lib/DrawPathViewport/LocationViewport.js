import * as PIXI from 'pixi.js'
import DrawPathViewport from './index'
class LocationViewport extends DrawPathViewport {
  constructor(app, setting) {
    super(app, setting)
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
    _pointTag.resize(scale >> 2) //把點轉成跟人一樣 目前抓0.5m
    _pointTag.x = point.x * scale
    _pointTag.y = point.y * scale
    this._floorObj.lineLayer.addChild(_pointTag)
  }
}
export default LocationViewport

class PointTag extends PIXI.Graphics {
  //TODO:人的相對大小
  constructor(r = 10, color = 0x0071ff) {
    super()
    this._color = color
    this.resize(r)
  }
  resize(r) {
    this.clear()
    this.beginFill(this._color, 1)
    this.drawTorus(0, 0, r * 0.8, r)
    this.drawCircle(0, 0, r >> 1)
  }
}
