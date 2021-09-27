import * as PIXI from 'pixi.js'
import TextTag from './TextTag'

/**
 * 事件 emit
 * created
 * edit-resize
 * select-start
 * select-end
 */

/**
 * 區域選取物件
 */
class Area {
  /**
   * 區域選取物件
   * @param {object} inPoint - 開始點
   * @param {number} inPoint.x
   * @param {number} inPoint.y
   * @param {object} setting - 設定
   * @param {object} wh - 寬高 可選
   * @param {number} wh.w - 寬
   * @param {number} wh.h - 高   */
  constructor(inPoint, setting, wh) {
    const _defSetting = {
      hasLine: true /* 線顯示*/,
      lineColor: 0x000000 /* 線色 */,
      fillColor: 0x000000 /* 填色 */,
      alpha: 0.3 /* 透明 */,
      editColor: 0x000000 /* 編輯點顏色 */,
      editSize: 12 /* 編輯點大小 */,
      tag: '', //tag name
      tagStyle: null, //tag Style
    }
    this._setting = { ..._defSetting, ...(setting || {}) }
    this._rectangle = null //綁定的Rectangle pixi物件
    this._inPoint = inPoint //進入點(左上)
    this._isEdit = false //編輯中，影響九宮編輯顯示
    this._editEnable = true //是否可以編輯狀態
    this._stageLock = false //場景鎖定暫時不能編輯
    this._selectEnable = true //是否可選取，必須可選取才可編輯
    this._userData = {}
    this.create()
    if (wh) {
      wh.x = inPoint.x + wh.w
      wh.y = inPoint.y + wh.h
    }
    this.draw(inPoint, wh)
    this._setting.tag && (this.tag = this._setting.tag)
  }
  /**
   * 顯示名稱tag
   * @memberof Area
   */
  set tag(_text) {
    this._setting.tag = _text
    this.createTextTag(_text, this._setting.tagStyle)
    this.draw()
  }
  get tag() {
    return this._setting.tag
  }
  /**
   * 物件名
   * @memberof Area
   */
  set name(val) {
    this._rectangle.name = val
  }
  get name() {
    return this._rectangle.name
  }
  /**
   * 實際操作的 PIXI.
   * @readonly
   * @memberof Area
   */
  get rectangle() {
    return this._rectangle
  }
  /**
   * viewport中位置
   * @memberof Area
   */
  set x(_x) {
    this._inPoint.x = _x
    this._outPoint.x = _x + this._dx
    this._rectangle.x = _x
  }
  get x() {
    return this._rectangle.x
  }
  /**
   * viewport中位置
   * @memberof Area
   */
  set y(_y) {
    this._inPoint.y = _y
    this._outPoint.y = _y + this._dy
    this._rectangle.y = _y
  }
  get y() {
    return this._rectangle.y
  }
  /**
   * 編輯中，九宮格編輯顯示
   * @memberof Area
   */
  set isEdit(_f) {
    this._isEdit = !!_f
    this._p1.visible = _f
    this._p2.visible = _f
    this._p3.visible = _f
    this._p4.visible = _f
    this._p6.visible = _f
    this._p7.visible = _f
    this._p8.visible = _f
    this._p9.visible = _f
  }
  get isEdit() {
    return this._isEdit
  }
  /**
   * 是否能夠選取編輯，selectEnable要true才能生效
   * @memberof Area
   */
  set editEnable(val) {
    this._editEnable = val
    val || (this.isEdit = false)
  }
  get editEnable() {
    return this._editEnable
  }
  /**
   * 是否能夠選取
   * @memberof Area
   */
  set selectEnable(val) {
    this._selectEnable = val
    this._chkInteractive()
  }
  get selectEnable() {
    return this._selectEnable
  }
  /**
   * userData
   * @memberof Area
   */
  set userData(val) {
    this._userData = val || {}
  }
  get userData() {
    return this._userData
  }
  /**
   * DrawingViewport鎖定，不建議直接使用，要鎖定請使用editEnable
   * @param {*} val
   * @memberof Area
   */
  setStageLock(val) {
    this._stageLock = val
    this._chkInteractive()
  }
  _chkInteractive() {
    this._rectangle.interactive = this._selectEnable && !this._stageLock
    this._rectangle.interactive || (this.isEdit = false)
  }
  /**
   * 區域線條顏色
   * @memberof Area
   */
  set lineColor(_color) {
    this._setting.lineColor = _color
    this.draw()
  }
  get lineColor() {
    return this._setting.lineColor
  }
  /**
   * 區塊顏色
   * @memberof Area
   */
  set fillColor(_color) {
    this._setting.fillColor = _color
    this.draw()
  }
  get fillColor() {
    return this._setting.fillColor
  }
  /**
   * 區塊透明度
   * @memberof Area
   */
  set alpha(val) {
    this._setting.alpha = val
    this.draw()
  }
  get alpha() {
    return this._setting.alpha
  }
  /**
   * 區塊設定值
   * @readonly
   * @memberof Area
   */
  get setting() {
    return this._setting
  }
  /**
   * 寬
   * @memberof Area
   */
  set width(val) {
    this._outPoint.x = this._inPoint.x + val
    this.draw()
    this.restEditPo()
  }
  get width() {
    return this._outPoint.x - this._inPoint.x
  }
  /**
   * 高
   * @memberof Area
   */
  set height(val) {
    this._outPoint.y = this._inPoint.y + val
    this.draw()
    this.restEditPo()
  }
  get height() {
    return this._outPoint.y - this._inPoint.y
  }
  /**
   * 取得圈選區域
   * @return {PIXI.Rectangle} Rectangle
   * @memberof Area
   */
  getRectangleBounds() {
    return new PIXI.Rectangle(
      this._rectangle.x,
      this._rectangle.y,
      this._dx,
      this._dy,
    )
  }
  create() {
    this._rectangle = new PIXI.Graphics()
    this._rectangle.cursor = 'move'
    this._rectangle.beginFill(this._setting.fillColor, this._setting.alpha)
    this._rectangle.interactive = true
    this._rectangle.on('pointerdown', event => {
      event.stopPropagation()
      this._rectangle.emit('select-start')
      this._rectangle.parent.emit('select-start', { event, obj: this })
    })
    this._rectangle.on('pointerup', event => {
      event.stopPropagation()
      this._rectangle.emit('select-end')
      this._rectangle.parent.emit('select-end', { event, obj: this })
    })
    this._rectangle.on('edit', ({ type }) => {
      this._rectangle.parent.emit('edit', { type, obj: this })
    })
    this._rectangle.areaOb = this //綁定 Area 抽象實體物件，由 _rectangle 實體反抓 Area 實體
    this._rectangle.emit('created')
  }
  //create textTag
  createTextTag(_txt, style = {}) {
    this._tag && this._rectangle.removeChild(this._tag) //TODO: 流程需要優化
    this._tag = _txt ? new TextTag(_txt, 5, style) : null
    this._tag && this._rectangle.addChild(this._tag)
  }
  //顯示寬高tag
  setSizeWTag(w) {
    if (this._tagW) {
      this._p2.removeChild(this._tagW)
    }
    this._tagW = new TextTag(w, 2, this._setting?.tagStyle)
    this._tagW.y = 8
    this._p2.addChild(this._tagW)
  }
  setSizeHTag(h) {
    if (this._tagH) {
      this._p6.removeChild(this._tagH)
    }
    this._tagH = new TextTag(h, 6, this._setting?.tagStyle)
    this._tagH.x = -8
    this._p6.addChild(this._tagH)
  }
  draw(outPoint, inPoint) {
    inPoint && (this._inPoint = inPoint)
    outPoint && (this._outPoint = outPoint)
    if (this._inPoint.x < this._outPoint.x) {
      this._minX = this._inPoint.x
      this._dx = this._outPoint.x - this._inPoint.x
    } else {
      this._minX = this._outPoint.x
      this._dx = this._inPoint.x - this._outPoint.x
    }
    if (this._inPoint.y < this._outPoint.y) {
      this._minY = this._inPoint.y
      this._dy = this._outPoint.y - this._inPoint.y
    } else {
      this._minY = this._outPoint.y
      this._dy = this._inPoint.y - this._outPoint.y
    }
    this._drawBox(this._minX, this._minY, this._dx, this._dy)
    //_tag move
    if (this._tag) {
      this._tag.x = this._dx >> 1
      this._tag.y = this._dy >> 1
    }
    this._rectangle.emit('edit-resize')
  }
  _drawBox(x, y, w, h) {
    this._rectangle.clear()
    this._setting.hasLine &&
      this._rectangle.lineStyle(1, this._setting.lineColor, 1, 0.5, true)
    this._rectangle.beginFill(
      this._setting.fillColor,
      this._setting.alpha || 0.000001, //如果是0就不能選
    )
    this._rectangle.drawRect(0, 0, w, h)
    this._rectangle.x = x
    this._rectangle.y = y
    this._rectangle.endFill()
  }
  edit(type, dragPo) {
    switch (type) {
      case 1:
        this._inPoint = dragPo
        break
      case 2:
        this._inPoint.y = dragPo.y
        break
      case 3:
        this._inPoint.y = dragPo.y
        this._outPoint.x = dragPo.x
        break
      case 4:
        this._inPoint.x = dragPo.x
        break
      case 6:
        this._outPoint.x = dragPo.x
        break
      case 7:
        this._inPoint.x = dragPo.x
        this._outPoint.y = dragPo.y
        break
      case 8:
        this._outPoint.y = dragPo.y
        break
      case 9:
        this._outPoint = dragPo
        break
      default:
    }
    this.draw()
    this.restEditPo()
  }
  createEditPo() {
    const _setting = {
      color: this._setting.editColor,
      size: this._setting.editSize,
    }
    this._p1 = new AreaEditPoint(1, _setting)
    this._p1.cursor = 'nw-resize'
    this._rectangle.addChild(this._p1)
    this._p2 = new AreaEditPoint(2, _setting)
    this._p2.cursor = 'n-resize'
    this._rectangle.addChild(this._p2)
    this._p3 = new AreaEditPoint(3, _setting)
    this._p3.cursor = 'ne-resize'
    this._rectangle.addChild(this._p3)
    this._p4 = new AreaEditPoint(4, _setting)
    this._p4.cursor = 'e-resize'
    this._rectangle.addChild(this._p4)
    this._p6 = new AreaEditPoint(6, _setting)
    this._p6.cursor = 'e-resize'
    this._rectangle.addChild(this._p6)
    this._p7 = new AreaEditPoint(7, _setting)
    this._p7.cursor = 'ne-resize'
    this._rectangle.addChild(this._p7)
    this._p8 = new AreaEditPoint(8, _setting)
    this._p8.cursor = 'n-resize'
    this._rectangle.addChild(this._p8)
    this._p9 = new AreaEditPoint(9, _setting)
    this._p9.cursor = 'nw-resize'
    this._rectangle.addChild(this._p9)
    this.restEditPo()
    this.isEdit = false
  }
  restEditPo() {
    const _w = this._dx
    const _h = this._dy
    this._p2.x = _w >> 1
    this._p3.x = _w
    this._p4.y = _h >> 1
    this._p6.x = _w
    this._p6.y = _h >> 1
    this._p7.y = _h
    this._p8.x = _w >> 1
    this._p8.y = _h
    this._p9.x = _w
    this._p9.y = _h
  }
}

class AreaEditPoint extends PIXI.Graphics {
  constructor(type, setting) {
    super()
    const { color, size } = setting || {}
    this._color = color || 0x000000
    this._size = size || 12
    this._type = type
    this.create()
  }
  get type() {
    return this._type
  }
  create() {
    this.beginFill(this._color)
    this.drawRect(-this._size >> 1, -this._size >> 1, this._size, this._size)
    this.endFill()
    this.interactive = true
    this.on('pointerdown', event => {
      event.stopPropagation()
      this.parent.emit('edit', { event, type: this.type })
    })
  }
}

export default Area
