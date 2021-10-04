const S = 1000
const M = S * 60
function msToTime(ms) {
  const m = _makeUpZ(~~(ms / M) + '')
  const s = _makeUpZ(~~((ms % M) / S) + '')
  return `${m}:${s}`
}

/* to 2012-11-04 14:55:45 */
function toDateAndTime(_t) {
  return new Date(_t)
    .toLocaleString()
    .replace(/T/, ' ')
    .replace(/\..+/, '')
}

/**
 * 傳入時間字串 返回格式化時間字串 例如 2018/12/23 13:01
 */
function dataFormat(dateStr, today) {
  const date = new Date(dateStr)
  const yy = date.getFullYear()
  const mm = makeUp0(date.getMonth() + 1)
  const dd = makeUp0(date.getDate())
  const t1 = makeUp0(date.getHours())
  const t2 = makeUp0(date.getMinutes())
  if (today) {
    const now = new Date()
    const n_yy = now.getFullYear()
    const n_mm = makeUp0(now.getMonth() + 1)
    const n_dd = makeUp0(now.getDate())
    if (n_dd === dd && n_mm === mm && n_yy === yy) {
      return `${t1}:${t2}`
    } else {
      return `${yy}/${mm}/${dd} ${t1}:${t2}`
    }
  } else {
    return `${yy}/${mm}/${dd} ${t1}:${t2}`
  }
}

export { msToTime, toDateAndTime, dataFormat }

function _makeUpZ(_s) {
  while (_s.length < 2) {
    _s = '0' + _s
  }
  return _s
}
