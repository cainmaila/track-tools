<template>
  <div id="EditorTool" class="hight_100">
    <div id="Stage" ref="ViewRef"></div>
    <FootUi @common="onCommon" :mode="original.mode" :step="original.step" />
    <LayerUi :areas="areasRef" @common="onCommon" />
    <DetailUi
      :type="original.selAeeaType"
      v-model:tag="scopeAreaData.tag"
      v-model:realWidth="scopeAreaData.realWidth"
      :realHeight="scopeAreaData.realHeight"
      @change-realHeight="changeAreaRealHeight"
      v-model:color="scopeAreaData.color"
      v-model:unit="scopeAreaData.unit"
      v-model:elevation="scopeAreaData.elevation"
      v-model:direction="scopeAreaData.direction"
      :scale="scopeAreaData.scale"
      v-model:selectAreaTag="selectAreaData.tag"
      v-model:selectAreaColor="selectAreaData.color"
      v-model:spaceHeight="selectAreaData.spaceHeight"
      :selectAreaW="selectAreaData.realWidth"
      :selectAreaH="selectAreaData.realHeight"
      :selectRealOffsetX="selectAreaData.realOffsetX"
      :selectRealOffsetY="selectAreaData.realOffsetY"
    />
  </div>
</template>

<script>
import { numberToHex } from '@/tools/colorTools'
import { onMounted, ref, reactive, watch } from 'vue'
import { createViewPort } from './viewPortHandler'
import { postEvent, sdkListenerHandler } from './sdkMessageHandler'
import { areaLayerHandler } from './areaLayerHandler'
import verifyAreaHandler from './verifyAreaHandler'
import scopeAreaHandler from './scopeAreaHandler'
import partAreaHandler from './partAreaHandler'
import metaHandler from './metaHandler'
import FootUi from '@/components/editor/FootUi'
import LayerUi from '@/components/editor/LayerUi'
import DetailUi from '@/components/editor/DetailUi'
export default {
  name: 'AppEditor',
  components: { FootUi, LayerUi, DetailUi },
  setup() {
    const original = reactive({
      mode: 'sel',
      step: 1,
      selAeeaType: 0,
    })
    const {
      scopeAreaData,
      scopeArea,
      changeAreaRealHeight,
    } = scopeAreaHandler() //處理 總區域 的變化
    const { selectAreaRef, selectAreaData } = partAreaHandler(scopeAreaData)
    const areasRef = ref([])
    const { ViewRef, viewportRef, create } = createViewPort()
    const { getAreaMeta } = metaHandler(viewportRef, scopeArea, scopeAreaData)
    onMounted(() => {
      sdkListenerHandler({
        setting: create, //收到設定創建viewerPort
        getAreaMeta,
      })
      postEvent('ready')
    })
    const onCommon = ({ common, data }) => {
      // console.log('#onCommon', common, data)
      switch (common) {
        case 'sel':
          original.mode = 'sel'
          break
        case 'fit':
          viewportRef.value.zoomTofit()
          break
        case 'zoom':
          viewportRef.value.zoom(data)
          break
        case 'mov':
          original.mode = 'mov'
          break
        case 'scope':
          original.mode = 'scope'
          viewportRef.value.drawMode = true
          break
        case 'area':
          original.mode = 'area'
          viewportRef.value.drawMode = true
          break
        case 'del':
          viewportRef.value.removeArea(data)
          break
        case 'lock':
          data.editEnable = !data.editEnable
          break
        case 'select-area':
          original.mode = 'sel'
          viewportRef.value.selectItem(data)
          break
      }
      viewportRef.value.selectEnable = original.mode != 'mov'
    }

    watch(viewportRef, () => {
      areaLayerHandler(viewportRef.value, areasRef)
      viewportRef.value.on('add-area', area => {
        switch (original.mode) {
          case 'scope':
            area.userData.isRoot = true
            scopeArea.value = area
            original.selAeeaType = 1
            break
          case 'area':
            original.mode = 'sel'
            area.tag = 'Area'
            original.selAeeaType = 2
            break
        }
        selectAreaRef.value = area
      })

      viewportRef.value.on('select', area => {
        if (area?.userData.isRoot) {
          selectAreaRef.value = null
          viewportRef.value.addChildAt(area.rectangle, 1) //選到root層，不上移 0層是底圖
          original.selAeeaType = 1
        } else if (area) {
          selectAreaRef.value = area
          original.selAeeaType = 2
        } else {
          selectAreaRef.value = null
          original.selAeeaType = 0
        }
      })
    })

    watch(scopeArea, () => {
      if (scopeArea.value) {
        original.step = 2
        original.mode = 'sel'
      }
    })

    const verifyCorrect = verifyAreaHandler(viewportRef, scopeArea)

    const onSave = () => {
      const {
        scopeAreaMata, //總區域
        roomsMata, //房間
        isSpaceHeightNullArr, //樓板高度有缺
        containsErrorArr, //超出總範圍裡的
        overlappingErrorArr, //交疊的房間
        correct, //資料正確
      } = verifyCorrect()

      let error = ''
      !scopeAreaMata && (error += ' 請先創建總區域')
      roomsMata.length === 0 && (error += ' 至少創建一個區域')
      isSpaceHeightNullArr.length > 0 && (error += ' 樓板高度必須設置')
      containsErrorArr.length > 0 && (error += ' 部分區域超出範圍')
      overlappingErrorArr.length > 0 && (error += ' 區域範圍不可重疊')
      if (!correct) {
        alert(error)
        postEvent('areaData', { error })
        return
      }

      //準備資料
      let display_unit = 0
      let _unitSc = 1
      switch (scopeAreaData.unit) {
        case 'm':
          display_unit = 0
          _unitSc = 1
          break
        case 'cm':
          display_unit = 1
          _unitSc = 0.01
          break
        case 'mm':
          display_unit = 2
          _unitSc = 0.001
          break
        case 'ft':
          display_unit = 3
          _unitSc = 0.3048
          break
        case 'in':
          display_unit = 4
          _unitSc = 0.0254
          break
      }
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
          display_unit: display_unit,
          length: scopeAreaData.realWidth,
          width: scopeAreaData.realHeight,
          high: scopeAreaData.elevation * _unitSc,
          mn_angle: scopeAreaData.direction,
          frame_color: numberToHex(scopeAreaData.color),
        },
        area: [],
      }

      roomsMata.forEach(room => {
        outPut.area.push({
          name: room.setting.tag,
          pos_left_up: {
            x: ((room.x - _offsetX) / scale) * _unitSc,
            y: ((room.y - _offsetY) / scale) * _unitSc,
          },
          display_unit: display_unit,
          length: (room.w / scale) * _unitSc,
          width: (room.h / scale) * _unitSc,
          high: room.userData.spaceHeight * _unitSc,
          frame_color: numberToHex(room.setting.lineColor),
        })
      })
      postEvent('areaData', outPut)
    }

    return {
      ViewRef,
      onCommon,
      original,
      areasRef,
      scopeAreaData,
      selectAreaRef,
      selectAreaData,
      changeAreaRealHeight,
      onSave,
    }
  },
}
</script>

<style>
#Stage {
  width: 100%;
  height: calc(100% - 55px);
}
</style>
