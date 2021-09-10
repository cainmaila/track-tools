/* 載入區域 */
import { keyToUnit, mToUnit, mToPx, toMsc } from '@/tools/unitTools'
import { hexToNumber } from '@/tools/colorTools'
function metaInSetHeadler(original, scopeAreaData, viewportRef) {
  const setAreaMeta = data => {
    if (!data) {
      return
    }
    const { total_area } = data
    const unit = keyToUnit(total_area.display_unit) //單位
    const scale = data.scale * toMsc(unit)
    const initial_point_offsetX = total_area.initial_point_offset.x
    const initial_point_offsetY = total_area.initial_point_offset.y
    scopeAreaData.tag = total_area.name //tag
    scopeAreaData.color = total_area.frame_color //tag
    scopeAreaData.direction = total_area.mn_angle //方位角
    scopeAreaData.elevation = mToUnit(total_area.high, unit) //標高
    scopeAreaData.unit = unit //單位
    scopeAreaData.realWidth = mToUnit(
      /* 真實寬 */
      total_area.length,
      unit,
    )
    //付現總區域
    original.mode = 'scope'
    viewportRef.value.createArea(
      {
        x: initial_point_offsetX,
        y: initial_point_offsetY,
        w: mToPx(total_area.length, scale, unit),
        h: mToPx(total_area.width, scale, unit),
      },
      {
        tag: total_area.name,
      },
    ).alpha = 0

    //房間區域
    data.area.forEach(area => {
      original.mode = 'area'
      const color = hexToNumber(area.frame_color)
      const roomArea = viewportRef.value.createArea(
        {
          x: mToPx(area.pos_left_up.x, scale, unit) + initial_point_offsetX,
          y: mToPx(area.pos_left_up.y, scale, unit) + initial_point_offsetY,
          w: mToPx(area.length, scale, unit),
          h: mToPx(area.width, scale, unit),
        },
        {
          tag: area.name || '',
          lineColor: color,
          fillColor: color,
        },
      )
      roomArea.userData.spaceHeight = mToUnit(area.high, unit)
    })

    viewportRef.value.targetObj = null
  }
  return {
    setAreaMeta,
  }
}

export default metaInSetHeadler
