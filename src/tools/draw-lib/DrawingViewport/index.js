import * as PIXI from 'pixi.js'
import '@pixi/math-extras'
import '@pixi/graphics-extras'
import BaseViewport from '../BaseViewport'
import Area from './Area'

/**
 * 區與繪製工具 emit
 * loaded
 * select
 * add-area
 * remove-area
 * drawMode
 */
class DrawingViewport extends BaseViewport {
  /**
   * Creates an instance of DrawingViewport.
   * @param {Object} app - pixi app 實體
   * @param {Object} setting - 設定
   * @param {string} setting.bg - 底圖
   * @param {object} setting.aeraSetting - 區域繪製預設值
   * @param {boolean} setting.aeraSetting.hasLine - 是否有線框 def true
   * @param {number} setting.aeraSetting.lineColor - 線框色 def 0x000000
   * @param {number} setting.aeraSetting.fillColor - 底色 def 0x000000
   * @param {number} setting.aeraSetting.alpha - 透明度 0~1 def 0.3
   * @param {number} setting.aeraSetting.editColor - 編輯點顏色 def 0x000000
   * @param {number} setting.aeraSetting.editSize - 編輯點大小 def 12
   * @param {string} setting.aeraSetting.tag - tag標籤
   * @param {object} setting.aeraSetting.tagStyle - tag style
   * @param {number} setting.aeraSetting.tagStyle.fill - tag 色 def 0x000000
   * @param {number} setting.aeraSetting.tagStyle.fontSize - tag 大小 def 16
   * @param {number} setting.aeraSetting.tagStyle.letterSpacing - tag letterSpacing def 1
   * @memberof DrawingViewport
   */
  constructor(app, setting, readonly) {
    super(app)
    this._setting = {
      bg: null, // bg 底圖url
      aeraSetting: null, //區塊設定
    }
    this.app = app
    this._readonly = readonly
    this._setSetting(setting)
    this._state = ''
    this._pointerdown = null
    this._pointerup = null
    this._pointermove = { x: 0, y: 0 }
    this._moveDistance = { x: 0, y: 0 }
    this._drawObj = null
    this._targetObj = null
    this._selectEnable = true

    this._createOperationLayer()

    this.drag()
      .pinch()
      .wheel()

    this.on('pointertap', () => {
      this.targetObj = null
    })
    this.on('pointermove', event => {
      this.pointermove = event.data.global
    })
    this.on('pointerupoutside', () => {
      //外面放開例外
      this.state = ''
    })

    this.on('select-start', ({ obj, event }) => {
      this.targetObj = obj
      if (!this._readonly && this.targetObj.editEnable) {
        this._pointermove = this.toLocal(event.data.global)
        this.state = 'drag'
      }
    })
    this.on('select-end', () => {
      this.state = ''
    })
    this.on('edit', ({ obj, type }) => {
      if (!this._readonly && this.targetObj.editEnable) {
        obj.editType = type
        this.targetObj = obj
        this.state = 'edit'
      }
    })
    //縮放時改變點
    this._editPoSize = 8
    this.on('zoomed', () => {
      this._resizeEditPoSize()
    })
    this._setting.bg && this._loadBg(this._setting.bg) //底圖
  }
  /* 選取一個物件 */
  selectItem(_item) {
    if (typeof _item == 'string') {
      _item = this.getChildByName(_item)
    }
    if (_item?.selectEnable) {
      this.targetObj = _item
    }
  }
  /* 目前選取物件，要設定請使用 selectItem 方法 */
  set targetObj(val) {
    this._targetObj && (this._targetObj.isEdit = false)
    this._targetObj = val
    val && this.addChild(val.rectangle) //移到最上層
    this._targetObj && (this._targetObj.isEdit = true)
    this.emit('select', val)
  }
  get targetObj() {
    return this._targetObj
  }
  /* 繪製框模式，一次性，畫完就false */
  set drawMode(val) {
    this.state = val ? 'drawMode' : ''
  }
  get drawMode() {
    return this._operationLayer.visible
  }
  /* 是否可以編輯圖面的物件 */
  set selectEnable(val) {
    if (this._selectEnable === val) return
    if (!val) {
      this.targetObj = null
      this.drawMode = false
    }
    this.getAllAreas().forEach(_area => {
      _area.setStageLock(!val)
    })
    this._selectEnable = !!val
  }
  get selectEnable() {
    return this._selectEnable
  }

  /* 取回所有物件 */
  getAllAreas() {
    const _areaArr = []
    this.children.forEach(item => {
      const _type = item.name.split('|')
      _type[0] === 'Area' && _areaArr.push(item.areaOb)
    })
    return _areaArr
  }
  /* 創建一個區域 */
  createArea({ x, y, w, h }, setting = {}) {
    const _area = new Area(
      { x, y },
      { ...this._setting.aeraSetting, ...setting },
      { w, h },
    )
    _area.name = generateUUID('Area')
    _area.createEditPo()
    this.addChild(_area.rectangle)
    this.targetObj = _area
    this.emit('add-area', _area)
    return _area
  }
  /* 移除物件 */
  removeArea(_item) {
    if (typeof _item == 'string') {
      _item = this.getChildByName(_item)
    }
    if (!_item) {
      //沒物件
      if (this._targetObj) {
        //就刪除目前選的
        _item = this._targetObj
        this._targetObj = null
      } else {
        return
      }
    }
    if (_item instanceof Area) {
      this.emit('remove-area', _item.rectangle.name)
      _item.rectangle.destroy()
    } else {
      this.emit('remove-area', _item.name)
      _item.destroy()
    }
  }
  /* 縮放倍數 */
  zoom(sc) {
    this.scaled += sc
    this._resizeEditPoSize()
  }
  /* 最適大小 */
  zoomTofit(paddingW = 0, paddingH = 0) {
    this._bg
      ? this.fit(false, this._bg.width + paddingW, this._bg.height + paddingH)
      : this.fit(false, this.width, this.height)
    this.x = (this._app.view.clientWidth - this.width) >> 1
    this.y = (this._app.view.clientHeight - this.height) >> 1
    this._resizeEditPoSize()
  }
  _resizeEditPoSize() {
    this._editPoSize =
      this.toLocal(
        { x: this._setting.aeraSetting?.editSize || 9, y: 0 },
        this.app.stage,
      ).x - this.toLocal({ x: 0, y: 0 }, this.app.stage).x
    this.resizeEditPo(this._editPoSize)
  }
  /* 取回繪圖資訊 */
  getDrawingMeta() {
    const _map = { items: [] }
    this.children.forEach(item => {
      const _type = item.name.split('|')
      switch (_type[0]) {
        case 'BG':
          _map.bg = {
            url: this._bgUrl,
          }
          break
        case 'Area':
          _map.items.push({
            type: 'Area',
            x: item.x,
            y: item.y,
            w: item.areaOb._dx,
            h: item.areaOb._dy,
            name: item.name,
            setting: item.areaOb.setting,
            userData: item.areaOb.userData,
          })
          break
        default:
      }
    })
    return _map
  }
  /* 設定繪圖資訊 */
  setDrawingMeta(_meta) {
    this.children.forEach(item => {
      item.destroy({ children: true })
    })
    _meta.bg && this._loadBg(_meta.bg.url)
    _meta.items.forEach(itemMate => {
      const _area = new Area({ x: itemMate.x, y: itemMate.y }, itemMate.setting)
      this.addChild(_area.rectangle)
      _area.draw({ x: itemMate.x + itemMate.w, y: itemMate.y + itemMate.h })
      _area.name = itemMate.name
      _area.createEditPo()
      // _area.setEditPoSize(this._editPoSize)
      _area.userData = itemMate.userData
    })
  }
  /* 取回某個物件 */
  getAreaByName(_name) {
    let _mc = null
    this.children.forEach(mc => {
      mc.name === _name && (_mc = mc)
    })
    return _mc.areaOb
  }
  /* 檢查是否都在範圍 */
  ckgContainsRect({ x, y, width, height }) {
    let _rect = null
    const _chgRect = new PIXI.Rectangle(x, y, width, height)
    const _areaArr = []
    this.children.forEach(mc => {
      const { type } = getTypeAndKey(mc)
      switch (type) {
        case 'Area':
          _rect = mc.areaOb.getRectangleBounds()
          _areaArr.push({
            name: mc.name,
            rectangle: _rect,
            contains: _chgRect.containsRect(_rect),
          })
          break
      }
    })
    return _areaArr
  }
  /* 檢查是否交疊 */
  ckgOverlapping(excepts = []) {
    const _areaArr = []
    const _returnAreaArr = []
    this.children.forEach(mc => {
      // getAreaByName
      const { type } = getTypeAndKey(mc)
      let _f = false
      switch (type) {
        case 'Area':
          excepts.forEach(_n => {
            _n === mc.name && (_f = true)
          })
          if (_f) break
          _areaArr.push({
            name: mc.name,
            rectangle: mc.areaOb.getRectangleBounds(),
            overlapping: false,
          })
          break
      }
    })

    let _area = _areaArr.shift()
    _area && _returnAreaArr.push(_area)
    while (_area) {
      _areaArr.forEach(_area2 => {
        _area.overlapping ||
          (_area.overlapping = _area.rectangle.intersects(_area2.rectangle))
        _area.overlapping && (_area2.overlapping = true)
      })
      _area = _areaArr.shift()
      _area && _returnAreaArr.push(_area)
    }
    return _returnAreaArr
  }
  /* 編輯點大小變更 */
  resizeEditPo(_size) {
    this.getAllAreas().forEach(area => {
      area.setEditPoSize(_size)
    })
  }
  _setSetting(_setting) {
    this._setting = { ...this._setting, ..._setting }
  }
  set state(val) {
    this.stateFSM(val, this._state)
    this._state = val
  }
  set pointerdown(val) {
    this._pointerup = null
    this._pointerdown = this.toLocal(val)
    this.state = 'draw'
  }
  set pointerup(val) {
    if (this._pointerdown) {
      this._pointerup = this.toLocal(val)
      this.state = ''
    }
  }
  set pointermove(val) {
    const _new = this.toLocal(val)
    this._moveDistance = {
      x: this._pointermove.x - _new.x,
      y: this._pointermove.y - _new.y,
    }
    this._pointermove = _new
    this.moveHander()
  }
  async _loadBg(_img) {
    this._bg = new PIXI.Sprite(await PIXI.Texture.fromURL(_img))
    this._bgUrl = _img
    this._bg.name = 'BG|0'
    this.addChildAt(this._bg, 0)
    this.zoomTofit()
    this.emit('loaded')
  }

  moveHander() {
    switch (this._state) {
      case 'draw': //區域繪製
        this.drawAreaIng()
        break
      case 'drag': //拖曳
        this.dragIng()
        break
      case 'edit': //編輯
        this.editIng()
        break
    }
  }
  stateFSM(val, old) {
    if (val !== old) {
      switch (old) {
        case 'drawMode':
          this.emit('drawMode', false)
          break
      }
      switch (val) {
        case 'drawMode':
          this.targetObj = null
          this._operationLayer.visible = true
          this.emit('drawMode', true)
          break
        case 'draw':
          this.drawArea()
          this._operationLayer.visible = true
          break
        case 'edit':
          this._operationLayer.visible = true
          break
        default:
          old === 'draw' && this.drawAreaEnd()
          this._operationLayer.visible = false
      }
    }
  }
  drawArea() {
    this._drawObj = new Area(this._pointerdown, this._setting.aeraSetting)
    this.addChild(this._drawObj.rectangle)
  }
  drawAreaIng() {
    this._drawObj.draw(this._pointermove)
  }
  drawAreaEnd() {
    this._drawObj.createEditPo()
    this._drawObj.setEditPoSize(this._editPoSize)
    this._drawObj.name = generateUUID('Area')
    this.targetObj = this._drawObj
    this._drawObj = null
    this.emit('add-area', this._targetObj)
  }
  dragIng() {
    this._targetObj.x -= this._moveDistance.x
    this._targetObj.y -= this._moveDistance.y
  }
  editIng() {
    this._targetObj.edit(this._targetObj.editType, this._pointermove)
  }
  _createOperationLayer() {
    const full = new PIXI.Graphics()
    const app = this._app
    full.beginFill(0x000000)
    full.drawRect(0, 0, 10, 10)
    full.endFill()
    full.alpha = 0
    full.width = app.view.clientWidth
    full.height = app.view.clientHeight
    full.interactive = true
    full.visible = false
    full.on('pointerdown', event => {
      event.stopPropagation()
      this.pointerdown = event.data.global
    })
    full.on('pointerup', event => {
      event.stopPropagation()
      this.pointerup = event.data.global
    })
    full.on('pointermove', event => {
      event.stopPropagation()
      this.pointermove = event.data.global
    })
    full.on('pointerupoutside', () => {
      //外面放開例外
      this.state = ''
    })
    this._app.stage.addChild(full)
    this._operationLayer = full
    this._operationLayer.cursor = 'crosshair'
  }
}

function generateUUID(name = 'Obj') {
  return `${name}|${new Date().getTime()}`
}

function getTypeAndKey(mc) {
  const _arr = mc.name.split('|')
  return {
    type: _arr[0],
    key: _arr[1],
  }
}

export default DrawingViewport
