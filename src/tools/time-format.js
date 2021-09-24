function msToTime(ms) {
  let _time = ~~(ms / 1000) //to s
  const s = _time % 60
  _time = ~~(_time / 60) //to m
  const m = _time % 60
  const h = ~~(_time / 60)
  return `${h ? h + ':' : ''}${m + ':'}${s}`
}

export { msToTime }
