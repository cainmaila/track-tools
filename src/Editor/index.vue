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
import { onMounted, ref, reactive, watch } from 'vue'
import { createViewPort } from './viewPortHandler'
import { postEvent, sdkListenerHandler } from './sdkMessageHandler'
import { areaLayerHandler } from './areaLayerHandler'
import scopeAreaHandler from './scopeAreaHandler'
import partAreaHandler from './partAreaHandler'
import metaHandler from './metaHandler'
import FootUi from '@/components/editor/FootUi'
import LayerUi from '@/components/editor/LayerUi'
import DetailUi from '@/components/editor/DetailUi'
import { keyToUnit, mToUnit, mToPx } from '@/tools/unitTools'
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

    const setScopeArea = area => {
      area.userData.isRoot = true
      scopeArea.value = area
    }

    onMounted(() => {
      sdkListenerHandler({
        setting: setting => {
          //收到設定創建viewerPort
          create(setting)
        },
        getAreaMeta,
        setAreaMeta: data => {
          console.log('#setAreaMeta', data)
          scopeAreaData.direction = data.total_area.mn_angle //方位角
          scopeAreaData.elevation = mToUnit(
            data.total_area.high,
            scopeAreaData.unit,
          ) //標高
          scopeAreaData.unit = keyToUnit(data.total_area.unit) //單位
          scopeAreaData.realWidth = mToUnit(
            /* 真實寬 */
            data.total_area.length,
            scopeAreaData.unit,
          )
          original.mode = 'scope'
          viewportRef.value.createArea({
            w: mToPx(data.total_area.length, data.scale, scopeAreaData.unit),
            h: mToPx(data.total_area.width, data.scale, scopeAreaData.unit),
            ...data.total_area.initial_point_offset,
          })
        },
      })
      postEvent('ready')
    })

    watch(viewportRef, () => {
      areaLayerHandler(viewportRef.value, areasRef)
      viewportRef.value.on('add-area', area => {
        switch (original.mode) {
          case 'scope':
            setScopeArea(area)
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

    return {
      ViewRef,
      onCommon,
      original,
      areasRef,
      scopeAreaData,
      selectAreaRef,
      selectAreaData,
      changeAreaRealHeight,
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
