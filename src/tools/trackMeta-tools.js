const dataVersion = 'v1'
//轉換輸出格式 http://confluence.anchortech.io/display/LEED/AnchorTrack+SA+-+Web
function historyToDataTransform(_history = []) {
  return {
    locations: _history.map(_po => {
      switch (_po.command) {
        case 'suspend':
          return {
            state: 1,
            date: _po.date,
          }
        default:
          return {
            state: 0,
            pos: `${_po.x},${_po.y}`,
            fileId: _po.z,
            date: _po.date,
          }
      }
    }),
    dataVersion,
  }
}

function dataToHistoryTransform({ locations }) {
  let _pos = null
  return locations.map(_po => {
    switch (_po.state) {
      case 0:
        _pos = _po.pos.split(',')
        return {
          x: _pos[0] * 1,
          y: _pos[1] * 1,
          z: _po.fileId,
          date: _po.date,
        }
      case 1:
        return {
          command: 'suspend',
          date: _po.date,
        }
      default:
        console.warn('#未知的點物件', _po)
    }
  })
}

export {
  historyToDataTransform, //歷史紀錄轉API資料
  dataToHistoryTransform, //API資料轉player陣列
}
