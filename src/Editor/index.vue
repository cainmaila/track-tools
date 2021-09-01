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
    <div class="top-ui flex-center">
      <At2Btn @on-click="onSave">Save</At2Btn>
    </div>
  </div>
</template>

<script>
import { numberToHex } from '@/tools/colorTools'
import { onMounted, ref, reactive, watch } from 'vue'
import { createViewPort } from './viewPortHandler'
import { postEvent, APP_NAME } from './sdkMessageHandler'
import { areaLayerHandler } from './areaLayerHandler'
import scopeAreaHandler from './scopeAreaHandler'
import partAreaHandler from './partAreaHandler'
import FootUi from '@/components/editor/FootUi'
import LayerUi from '@/components/editor/LayerUi'
import DetailUi from '@/components/editor/DetailUi'
import At2Btn from '~at2@/components/At2Btn'
export default {
  name: 'AppEditor',
  components: { FootUi, LayerUi, DetailUi, At2Btn },
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
    const { ViewRef, viewportRef } = createViewPort(APP_NAME)
    onMounted(() => {
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

    const onSave = () => {
      const meta = viewportRef.value.getDrawingMeta()
      // console.log('#meta', meta)
      const { items } = meta
      let isSpaceHeightError = false
      let scopeAreaMata = null
      const roomsMata = []
      items.forEach(area => {
        if (area.userData.isRoot) {
          scopeAreaMata = area
        } else {
          roomsMata.push(area)
          !area.userData.spaceHeight && (isSpaceHeightError = true)
        }
      })
      if (!scopeAreaMata) {
        alert('請先創建總區域')
        return
      }
      if (roomsMata.length === 0) {
        alert('至少創建一個區域')
        return
      }
      if (isSpaceHeightError) {
        alert('樓板高度必須設置')
        return
      }
      //檢驗是否都在再範圍
      let isContainsError = false
      viewportRef.value
        .ckgContainsRect(scopeArea.value.getRectangleBounds())
        .forEach(ob => {
          ob.contains || (isContainsError = true)
        })
      if (isContainsError) {
        alert('部分區域超出範圍')
        return
      }
      //檢查區域是否交疊
      let isOverlappingError = false
      viewportRef.value.ckgOverlapping([scopeArea.value.name]).forEach(chk => {
        chk.overlapping && (isOverlappingError = true)
      })
      if (isOverlappingError) {
        alert('區域範圍不可重疊')
        return
      }

      //準備資料
      const outPut = {
        unit: scopeAreaData.unit,
        scale: scopeAreaData.scale,
        elevation: scopeAreaData.elevation,
        direction: scopeAreaData.direction,
        scopeArea: {
          tag: scopeAreaData.tag,
          offset: { x: scopeAreaData.offsetX, y: scopeAreaData.offsetY },
          size: {
            x: scopeAreaData.realWidth,
            y: scopeAreaData.realHeight,
          },
          color: numberToHex(scopeAreaData.color),
        },
        rooms: [],
      }
      const _offsetX = scopeAreaData.offsetX
      const _offsetY = scopeAreaData.offsetY
      const _scale = scopeAreaData.scale
      const _unitSc = scopeAreaData.unit === 'cm' ? 0.01 : 1
      roomsMata.forEach(room => {
        outPut.rooms.push({
          tag: room.setting.tag,
          offset: {
            x: ((room.x - _offsetX) / _scale) * _unitSc,
            y: ((room.y - _offsetY) / _scale) * _unitSc,
          },
          size: {
            x: (room.w / _scale) * _unitSc,
            y: (room.h / _scale) * _unitSc,
          },
          color: numberToHex(room.setting.lineColor),
          spaceHeight: room.userData.spaceHeight * _unitSc,
        })
      })
      console.log('#outPut', outPut)
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
.top-ui {
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  & .at2-btn {
    padding: 5px;
  }
}
</style>
