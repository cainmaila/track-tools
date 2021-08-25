function areaLayerHandler(viewport, areasRef) {
  if (!viewport) return
  const areaMap = new Map()
  viewport.on('add-area', area => {
    areaMap.set(area.name, area)
    generateAreasArr()
  })
  viewport.on('select', () => {
    generateAreasArr()
  })

  function generateAreasArr() {
    areasRef.value = Array.from(areaMap, item => {
      return item[1]
    }).reverse()
  }
}

export { areaLayerHandler }
