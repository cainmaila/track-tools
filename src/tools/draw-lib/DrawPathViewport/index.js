import * as PIXI from 'pixi.js'
import BaseViewport from '../BaseViewport'
export const TRACK_COMMAND = {
  suspend: 'suspend',
}
/**
 * 創建樓路徑顯示
 * @event resources-ready 素材準備完成
 * @event change-floor 切換樓層
 * @event push-point 收到位置
 *
 * @class DrawPathViewport
 * @extends {BaseViewport}
 */
class DrawPathViewport extends BaseViewport {
  constructor(app, setting) {
    super(app)
    this._floor = null //樓板ID
    this._floorObj = null //目前樓層物件
    this._pointsHistory = [] //點紀錄
    this._nowPo = null //目前位置
    this._nowPoMc = new PointTag() //目前點物件
    this._startPoMc = new PointTag() //開始點物件
    this._changeFloor = false //樓層切換時告知新線段的旗標
    this._setting = {
      floors: [],
      ...setting,
    }
    this._buildFloorsMap() //圖面載入結束 emit('resources-ready')
  }
  set floor(_id) {
    if (this._floor !== _id) {
      this._changeFloor = true
      this._floorObj?.floorMc && this.removeChild(this._floorObj.floorMc)
      this._floor = _id
      this._floorObj = this._floorsMap.get(_id)
      if (this._floorObj) {
        this.addChildAt(this._floorObj.floorMc, 0)
        this.zoomTofit()
      }
      this.emit('change-floor', _id)
    }
  }
  get floor() {
    return this._floor
  }
  get floorObj() {
    return this._floorObj
  }
  pushPoint({ x, y, z, date }) {
    z && (this.floor = z)
    const _historyPoint = {
      //紀錄
      x,
      y,
      z: this.floor,
      date: date || new Date().getTime(),
    }
    this._pointsHistory.push(_historyPoint)
    const _po = { x, y }
    this._setNowPoint(_po)
    this._floorObj?.lineLayer.pushPoint(_po, this._changeFloor)
    this.emit('push-point', _historyPoint)
    this._changeFloor = false
  }
  suspend() {
    this._changeFloor = true
    const _suspendPoint = {
      command: TRACK_COMMAND.suspend,
      date: new Date().getTime(),
    }
    this._pointsHistory.push(_suspendPoint)
    this.emit('push-point', _suspendPoint)
  }
  generateHistory() {
    return this._pointsHistory
  }
  setHistory(_history) {
    this._restLineLayer()
    this._pointsHistory = []
    _history.forEach(_point => {
      _point.command ? this.suspend() : this.pushPoint(_point) //目前有command只有暫停這種情況
    })
  }
  zoomTofit() {
    this.fit(false, this._floorObj.floorMc.width, this._floorObj.floorMc.height)
    this.x = (this._app.view.clientWidth - this.width) >> 1
    this.y = (this._app.view.clientHeight - this.height) >> 1
  }
  lockCenter() {
    if (!this._nowPo) return //必須要有點
    this.scaled = 1
    const _po = this.toLocal(
      this._floorObj.lineLayer.toGlobal(this._nowPoMc.position),
    )
    this.setTransform(
      -_po.x + this._app.view.clientWidth / 2,
      -_po.y + this._app.view.clientHeight / 2,
    )
  }
  //================================================================
  _buildFloorsMap() {
    const _map = new Map()
    this._floorsMap = _map
    let _len = this._setting.floors.length
    this._setting.floors.forEach(async ({ id, offset, scale, img }) => {
      const floorMc = new PIXI.Sprite(await PIXI.Texture.fromURL(img))
      floorMc.name = id
      offset || (offset = { x: 0, y: 0 })
      _map.set(id, {
        floorMc,
        scale: scale || 1,
        offset,
      })
      this._restLineLayer()
      _len--
      if (!_len) {
        //最後
        this.drag() //拖曳互動
          .pinch()
          .wheel()
        this.emit('resources-ready')
      }
    })
  }
  _restLineLayer() {
    this._nowPo = null
    this._floorsMap.forEach(_floorOb => {
      _floorOb.lineLayer && _floorOb.lineLayer.destroy()
      const _lineLayer = new LineLayer(_floorOb.scale)
      _lineLayer.x = _floorOb.offset.x
      _lineLayer.y = _floorOb.offset.y
      _floorOb.floorMc.addChild(_lineLayer)
      _floorOb.lineLayer = _lineLayer
    })
  }
  _setNowPoint(_po) {
    const _scale = this._floorObj.scale
    this._nowPo || this._addStartPo(_po)
    this._nowPo = _po
    this._floorObj.lineLayer.addChild(this._nowPoMc)
    this._nowPoMc.x = _po.x * _scale
    this._nowPoMc.y = _po.y * _scale
  }
  _addStartPo(_po) {
    const _scale = this._floorObj.scale
    this._floorObj.lineLayer.addChild(this._startPoMc)
    this._startPoMc.x = _po.x * _scale
    this._startPoMc.y = _po.y * _scale
  }
}

class LineLayer extends PIXI.Graphics {
  constructor(scale = 1) {
    super()
    this._scale = scale
    this._lastPoint = null
    this.lineStyle(3, 0x0071ff, 1, 0.5, true)
  }
  pushPoint(_point, isNewLine) {
    _point = this._scalePoint(_point)
    isNewLine && (this._lastPoint = null) /* 切換樓 新線段判定 */
    this._lastPoint
      ? this.moveTo(this._lastPoint.x, this._lastPoint.y)
      : this.moveTo(_point.x, _point.y)
    this.lineTo(_point.x, _point.y)
    this._lastPoint = _point
  }
  heplerDrawLine(line) {
    let _point = this._scalePoint(line.shift())
    this.moveTo(_point.x, _point.y)
    while (line.length > 0) {
      _point = this._scalePoint(line.shift())
      this.lineTo(_point.x, _point.y)
    }
  }
  //================================================================
  _scalePoint(_point) {
    return {
      x: _point.x * this._scale,
      y: _point.y * this._scale,
    }
  }
}

class PointTag extends PIXI.Graphics {
  //TODO:人的相對大小
  constructor(r = 10) {
    super()
    this.beginFill(0x0071ff, 1)
    this.drawCircle(0, 0, r)
  }
}
export default DrawPathViewport
