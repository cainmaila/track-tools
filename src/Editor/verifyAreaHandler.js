/* 區域檢驗 */

function verifyAreaHandler(viewportRef, scopeArea) {
  return () => verifyArea(viewportRef, scopeArea)
}

function verifyArea(viewportRef, scopeArea) {
  const meta = viewportRef.value.getDrawingMeta()
  const { items } = meta
  const isSpaceHeightNullArr = []
  let scopeAreaMata = null
  const roomsMata = []
  items.forEach(area => {
    if (area.userData.isRoot) {
      scopeAreaMata = area
    } else {
      roomsMata.push(area)
      area.userData.spaceHeight * 1 || isSpaceHeightNullArr.push(area.name)
    }
  })

  //檢驗是否都在再範圍
  const containsErrorArr = []
  if (scopeArea.value) {
    viewportRef.value
      .ckgContainsRect(scopeArea.value.getRectangleBounds())
      .forEach(ob => {
        ob.contains || containsErrorArr.push(ob.name)
      })
  }

  //檢查區域是否交疊
  const overlappingErrorArr = []
  viewportRef.value.ckgOverlapping([scopeArea.value?.name]).forEach(chk => {
    chk.overlapping && overlappingErrorArr.push(chk.name)
  })

  return {
    scopeAreaMata, //總區域
    roomsMata, //房間
    isSpaceHeightNullArr, //樓板高度有缺
    containsErrorArr, //超出總範圍裡的
    overlappingErrorArr, //交疊的房間
    //資料正確
    correct:
      scopeAreaMata &&
      roomsMata.length > 0 &&
      isSpaceHeightNullArr.length === 0 &&
      containsErrorArr.length === 0,
    // && overlappingErrorArr.length === 0, /* 非必要條件 */
  }
}

export default verifyAreaHandler
