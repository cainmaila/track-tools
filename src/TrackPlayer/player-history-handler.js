import DrawPathPlayHelper from '@/tools/draw-lib/DrawPathViewport/DrawPathPlayHelper'
function playerHistoryHandler(viewPortRef) {
  const setHistory = history => {
    const halper = new DrawPathPlayHelper(viewPortRef.value)
    halper.setHistory(history)
  }
  return { setHistory }
}

export default playerHistoryHandler
