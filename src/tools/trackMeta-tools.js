const dataVersion = 'v1'
//轉換輸出格式 http://confluence.anchortech.io/display/LEED/AnchorTrack+SA+-+Web
function historyToDataTransform(_history = []) {
  return {
    locations: _history.map(_po => {
      return {
        pos: `${_po.x},${_po.y}`,
        fileId: _po.z,
        date: _po.date,
      }
    }),
    dataVersion,
  }
}

function dataToHistoryTransform({ locations }) {
  return locations.map(_po => {
    const _pos = _po.pos.split(',')
    return {
      x: _pos[0] * 1,
      y: _pos[1] * 1,
      z: _po.fileId,
      date: _po.date,
    }
  })
}

export {
  historyToDataTransform, //歷史紀錄轉API資料
  dataToHistoryTransform, //API資料轉player陣列
}
