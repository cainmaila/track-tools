const S = 1000
const M = S * 60
function msToTime(ms) {
  const m = _makeUpZ(~~(ms / M) + '')
  const s = _makeUpZ(~~((ms % M) / S) + '')
  return `${m}:${s}`
}

export { msToTime }

function _makeUpZ(_s) {
  while (_s.length < 2) {
    _s = '0' + _s
  }
  return _s
}
