import DrawPathPlayHelper from '@/tools/draw-lib/DrawPathViewport/DrawPathPlayHelper'
import { reactive, ref } from 'vue'
function playerHistoryHandler(viewPortRef) {
  const historyHistoryRef = ref(null)
  const historyStore = reactive({
    totaleTime: 0, //總時間ms
  })
  const setHistory = history => {
    const halper = new DrawPathPlayHelper(viewPortRef.value)
    halper.setHistory(history)
    historyStore.totaleTime = halper.totaleTime
    historyHistoryRef.value = halper
  }
  return { historyStore, setHistory }
}

export default playerHistoryHandler
