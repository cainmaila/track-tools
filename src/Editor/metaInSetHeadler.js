/* 載入區域 */
import { keyToUnit, mToUnit, mToPx } from '@/tools/unitTools'
import { hexToNumber } from '@/tools/colorTools'
function metaInSetHeadler(original, scopeAreaData, viewportRef) {
  const setAreaMeta = data => {
    scopeAreaData.tag = data.total_area.name //tag
    scopeAreaData.color = data.total_area.frame_color //tag
    scopeAreaData.direction = data.total_area.mn_angle //方位角
    scopeAreaData.elevation = mToUnit(data.total_area.high, scopeAreaData.unit) //標高
    scopeAreaData.unit = keyToUnit(data.total_area.display_unit) //單位
    scopeAreaData.realWidth = mToUnit(
      /* 真實寬 */
      data.total_area.length,
      scopeAreaData.unit,
    )
    //付現總區域
    original.mode = 'scope'
    viewportRef.value.createArea(
      {
        x: data.total_area.initial_point_offset.x,
        y: data.total_area.initial_point_offset.y,
        w: mToPx(data.total_area.length, data.scale, scopeAreaData.unit),
        h: mToPx(data.total_area.width, data.scale, scopeAreaData.unit),
      },
      {
        tag: data.total_area.name,
      },
    )

    //房間區域
    data.area.forEach(area => {
      original.mode = 'area'
      const roomArea = viewportRef.value.createArea(
        {
          x:
            mToPx(area.pos_left_up.x, data.scale, scopeAreaData.unit) +
            data.total_area.initial_point_offset.x,
          y:
            mToPx(area.pos_left_up.y, data.scale, scopeAreaData.unit) +
            data.total_area.initial_point_offset.y,
          w: mToPx(area.length, data.scale, scopeAreaData.unit),
          h: mToPx(area.width, data.scale, scopeAreaData.unit),
        },
        {
          tag: area.name || '',
          lineColor: hexToNumber(area.frame_color),
          fillColor: hexToNumber(area.frame_color),
        },
      )
      roomArea.userData.spaceHeight = mToUnit(area.high, scopeAreaData.unit)
    })

    viewportRef.value.targetObj = null
  }
  return {
    setAreaMeta,
  }
}

export default metaInSetHeadler
