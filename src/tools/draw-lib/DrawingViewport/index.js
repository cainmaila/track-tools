import * as PIXI from 'pixi.js'
import '@pixi/math-extras'
import '@pixi/graphics-extras'
import { Viewport } from 'pixi-viewport'
import Area from './Area'

/**
 * 區與繪製工具 emit
 * select
 * add-area
 * remove-area
 * drawMode
 */
class DrawingViewport extends Viewport {
  /**
   * Creates an instance of DrawingViewport.
   * @param {Object} app - pixi app 實體
   * @param {Object} setting - 設定
   * @memberof DrawingViewport
   */
  constructor(app, setting) {
    super({
      interaction: app.renderer.plugins.interaction, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    })
    this._setting = {
      bg: null, // bg 底圖url
      aeraSetting: null, //區塊設定
    }
    this.setSetting(setting)
    this._state = ''
    this._pointerdown = null
    this._pointerup = null
    this._pointermove = { x: 0, y: 0 }
    this._moveDistance = { x: 0, y: 0 }
    this._drawObj = null
    this._targetObj = null
    this._selectEnable = true
    this._app = app
    app.stage.addChild(this)
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
      this._pointermove = this.toLocal(event.data.global)
      this.state = 'drag'
    })
    this.on('select-end', () => {
      this.state = ''
    })
    this.on('edit', ({ obj, type }) => {
      obj.editType = type
      this.targetObj = obj
      this.state = 'edit'
    })

    //============================================================================
    this._setting.bg && this._loadBg(this._setting.bg) //底圖
  }
  setSetting(_setting) {
    this._setting = { ...this._setting, ..._setting }
  }
  selectItem(_item) {
    if (typeof _item == 'string') {
      _item = this.getChildByName(_item)
    }
    if (_item?.editEnable) {
      this.targetObj = _item
    }
  }
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
  set drawMode(val) {
    this.state = val ? 'drawMode' : ''
  }
  get drawMode() {
    return this._operationLayer.visible
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
  getAllAreas() {
    const _areaArr = []
    this.children.forEach(item => {
      const _type = item.name.split('|')
      _type[0] === 'Area' && _areaArr.push(item.areaOb)
    })
    return _areaArr
  }
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
  zoom(sc) {
    this.scaled += sc
  }
  zoomTofit() {
    this._bg
      ? this.fit(false, this._bg.width, this._bg.height)
      : this.fit(false, this.width, this.height)
    this.x = (this._app.view.clientWidth - this.width) >> 1
    this.y = (this._app.view.clientHeight - this.height) >> 1
  }
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
            tag: item.areaOb.tag,
            userData: item.areaOb.userData,
          })
          break
        default:
      }
    })
    return _map
  }
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
      itemMate.tag && (_area.tag = itemMate.tag)
      _area.userData = itemMate.userData
    })
  }
  async _loadBg(_img) {
    this._bg = new PIXI.Sprite(await PIXI.Texture.fromURL(_img))
    this._bgUrl = _img
    this._bg.name = 'BG|0'
    this.addChildAt(this._bg, 0)
    this.zoomTofit()
  }
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
  ckgOverlapping() {
    const _areaArr = []
    const _returnAreaArr = []
    this.children.forEach(mc => {
      const { type } = getTypeAndKey(mc)
      switch (type) {
        case 'Area':
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
