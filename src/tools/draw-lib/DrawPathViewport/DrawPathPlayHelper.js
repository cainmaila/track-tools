import { TRACK_COMMAND } from '../DrawPathViewport'
class DrawPathPlayHelper {
  constructor(viewport) {
    this.viewport = viewport
    this._history = [] //要播放的紀錄
    this._lineArr = [] //線段繪製資訊
    this._startTime = 0
    this._endTime = 0
    this._time = 0
    this._timePo = null
    this._floor = ''
    this._commandState = null
  }
  get totaleTime() {
    return this._endTime - this._startTime
  }
  set time(val) {
    val *= 1
    this._time = val > this.totaleTime ? this.totaleTime : val < 0 ? 0 : val //不能超過
    this._filterHistoryByTime()
    this._drawLineByTime()
    switch (this._timePo.command) {
      case TRACK_COMMAND.suspend: //目前時間是暫停
        this._commandState !== TRACK_COMMAND.suspend &&
          this.viewport.emit('suspend')
        this._commandState = TRACK_COMMAND.suspend
        break
      default:
        this._commandState = null
    }
  }
  get time() {
    return this._time
  }
  get floor() {
    return this._floor
  }
  setHistory(_history) {
    this._history = _history
    this._startTime = this._history[0].date * 1
    this._endTime = this._history[this._history.length - 1].date
    this.time = 0
    this.viewport._setNowPoint(this._history[0]) //起點繪製
  }
  //================================================================
  _filterHistoryByTime() {
    const _lines = []
    let _t_line = null
    let _floor = null
    const _date = this._startTime + this._time
    this._history.forEach(_po => {
      if (_po.date * 1 > _date) return
      this._timePo = _po
      //依據樓層分層
      if (_po?.command === TRACK_COMMAND.suspend) {
        _floor = TRACK_COMMAND.suspend //暫停
      } else {
        if (_po.z !== _floor) {
          _t_line = []
          _lines.push(_t_line)
          this._floor = _po.z
          _floor = _po.z
        }
        _t_line.push(_po)
      }
    })
    this._lineArr = _lines
  }
  _drawLineByTime() {
    this.viewport.floor = this.floor
    this.viewport.floorObj.lineLayer.clear()
    this.viewport.floorObj.lineLayer.lineStyle(3, 0x0071ff, 1, 0.5, false)
    let _nowPo = null //目前點位置
    this._lineArr.forEach(line => {
      _nowPo = line[line.length - 1]
      if (line[0].z === this.floor) {
        this.viewport.floorObj.lineLayer.heplerDrawLine(line)
      }
    })
    //目前點移動
    _nowPo = this.viewport.floorObj.lineLayer._scalePoint(_nowPo)
    const _nowPoMc = this.viewport._nowPoMc
    _nowPoMc.x = _nowPo.x
    _nowPoMc.y = _nowPo.y
    this.viewport.floorObj.lineLayer.addChild(_nowPoMc)
  }
}

export default DrawPathPlayHelper
