import { numberToHex } from '@/tools/colorTools'
import verifyAreaHandler from './verifyAreaHandler'
import { postEvent } from './sdkMessageHandler'
import { unitToKey, unitToM, pxToM } from '@/tools/unitTools'
function areaLayerHandler(viewportRef, scopeArea, scopeAreaData) {
  const verifyAreaData = verifyAreaHandler(viewportRef, scopeArea)
  const getAreaMeta = () => {
    const {
      scopeAreaMata, //總區域
      roomsMata, //房間
      isSpaceHeightNullArr, //樓板高度有缺
      containsErrorArr, //超出總範圍裡的
      // overlappingErrorArr, //交疊的房間
      correct, //資料正確
    } = verifyAreaData()

    let error = ''
    !scopeAreaMata && (error += ' 請先創建總區域')
    roomsMata.length === 0 && (error += ' 至少創建一個區域')
    isSpaceHeightNullArr.length > 0 && (error += ' 樓板高度必須設置')
    containsErrorArr.length > 0 && (error += ' 部分區域超出範圍')
    // overlappingErrorArr.length > 0 && (error += ' 區域範圍不可重疊') //非必要條件
    if (!correct) {
      postEvent('areaData', { error })
      return
    }

    //準備資料
    const unit = scopeAreaData.unit
    const display_unit = unitToKey(unit)
    const _offsetX = scopeAreaData.offsetX
    const _offsetY = scopeAreaData.offsetY
    const scale = scopeAreaData.scale
    //http://confluence.anchortech.io/display/LEED/AnchorTrack+SA+-+Web
    const outPut = {
      scale,
      total_area: {
        name: scopeAreaData.tag,
        initial_point_offset: {
          x: _offsetX,
          y: _offsetY,
        },
        display_unit,
        length: unitToM(scopeAreaData.realWidth, unit),
        width: unitToM(scopeAreaData.realHeight, unit),
        high: unitToM(scopeAreaData.elevation, unit),
        mn_angle: scopeAreaData.direction,
        frame_color: scopeAreaData.color,
      },
      area: [],
    }

    roomsMata.forEach(room => {
      outPut.area.push({
        name: room.setting.tag,
        pos_left_up: {
          x: pxToM(room.x - _offsetX, scale, unit),
          y: pxToM(room.y - _offsetY, scale, unit),
        },
        display_unit,
        length: pxToM(room.w, scale, unit),
        width: pxToM(room.h, scale, unit),
        high: unitToM(room.userData.spaceHeight, unit),
        frame_color: numberToHex(room.setting.lineColor),
      })
    })
    postEvent('areaData', outPut)
  }

  return {
    getAreaMeta,
  }
}

export default areaLayerHandler
