//播放控制
import DrawPathPlayHelper from '@/tools/draw-lib/DrawPathViewport/DrawPathPlayHelper'
import { reactive, ref, watch } from 'vue'
const TIME_STEP = ~~(1000 / 30) //ms間格
function playerHistoryHandler(store, viewPortRef) {
  const historyHistoryRef = ref(null)
  const historyStore = reactive({
    totaleTime: 0, //總時間ms
    time: 0,
    isPlay: false, //是否播放中
    v: 1, //播放倍率
  })

  const setHistory = history => {
    const halper = new DrawPathPlayHelper(viewPortRef.value)
    halper.setHistory(history)
    historyStore.totaleTime = halper.totaleTime
    historyStore.time = 0
    historyHistoryRef.value = halper
    store.state = 'history-ready'
  }
  const startPlayHistory = () => {
    historyStore.isPlay = true
  }

  const stopPlayHistory = () => {
    historyStore.isPlay = false
  }

  const setTime = time => {
    historyStore.isPlay = false
    _setTime(time)
  }

  let _timeTmp = 0

  watch(
    () => historyStore.isPlay,
    isPlay => {
      clearInterval(_timeTmp)
      if (isPlay) {
        historyStore.time >= historyStore.totaleTime && _setTime(0) //如果已經是結尾，就重頭開始
        _timeTmp = setInterval(() => {
          _setTime(
            historyHistoryRef.value.time + ~~(TIME_STEP * historyStore.v),
          )
          historyStore.time >= historyStore.totaleTime && stopPlayHistory() //時間到底 暫停
        }, TIME_STEP)
      }
    },
  )

  function _setTime(time) {
    historyHistoryRef.value.time = time
    historyStore.time = historyHistoryRef.value.time
  }

  return {
    historyStore,
    setHistory,
    startPlayHistory,
    stopPlayHistory,
    setTime,
  }
}

export default playerHistoryHandler
