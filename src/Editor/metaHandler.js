import { numberToHex } from '@/tools/colorTools'
import verifyAreaHandler from './verifyAreaHandler'
import { postEvent } from './sdkMessageHandler'
import { unitToKey, unitToM, pxToM, toMsc } from '@/tools/unitTools'
import { useI18n } from 'vue-i18n'
function areaLayerHandler(viewportRef, scopeArea, scopeAreaData) {
  const { t } = useI18n()
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
    !scopeAreaMata && (error += ` ${t('errorMessage.area')}`)
    roomsMata.length === 0 && (error += ` ${t('errorMessage.part')}`)
    isSpaceHeightNullArr.length > 0 &&
      (error += ` ${t('errorMessage.hight')}(${
        isSpaceHeightNullArr.length
      }${'errorMessage.num'})`)
    containsErrorArr.length > 0 && (error += ` ${t('errorMessage.max')}`)
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
      scale: scale / toMsc(unit),
      total_area: {
        name: scopeAreaData.tag,
        initial_point_offset: {
          x: _offsetX,
          y: _offsetY,
        },
        display_unit,
        length: unitToM(scopeAreaData.realWidth, unit),
        width: unitToM(scopeAreaData.realHeight, unit),
        height: unitToM(scopeAreaData.elevation, unit),
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
        height: unitToM(room.userData.spaceHeight, unit),
        frame_color: numberToHex(room.setting.lineColor),
      })
    })
    postEvent('areaData', JSON.parse(JSON.stringify(outPut)))
  }
  return {
    getAreaMeta,
  }
}

export default areaLayerHandler
