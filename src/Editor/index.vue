<template>
  <div id="EditorTool" class="hight_100">
    <div id="Stage" class="hight_100" ref="ViewRef"></div>
    <FootUi @common="onCommon" :mode="original.mode" :step="original.step" />
    <LayerUi :areas="areasRef" @common="onCommon" />
    <DetailUi
      v-model:tag="scopeAreaData.tag"
      v-model:realWidth="scopeAreaData.realWidth"
      v-model:color="scopeAreaData.color"
      :widthPx="scopeAreaData.widthPx"
      :heightPx="scopeAreaData.heightPx"
      @scale="val => (scopeAreaData.scale = val)"
    />
  </div>
</template>

<script>
import { onMounted, ref, reactive, watch } from 'vue'
import { createViewPort } from './viewPortHandler'
import { postEvent, APP_NAME } from './sdkMessageHandler'
import { areaLayerHandler } from './areaLayerHandler'
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
    })
    const scopeAreaData = reactive({
      tag: 'Scope Area',
      widthPx: 0,
      heightPx: 0,
      realWidth: 10,
      realHeight: 10,
      scale: 0,
      color: 0xff00ff,
    })
    const selectAreaRef = ref(null)
    const scopeArea = ref(null)
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

    watch(selectAreaRef, val => {
      console.log('555', val?.isRoot)
    })

    watch(viewportRef, () => {
      areaLayerHandler(viewportRef.value, areasRef)
      viewportRef.value.on('add-area', area => {
        switch (original.mode) {
          case 'scope':
            area.isRoot = true
            scopeArea.value = area
            break
          case 'area':
            original.mode = 'sel'
            area.tag = area.name
            break
        }
        selectAreaRef.value = area
      })

      viewportRef.value.on('select', area => {
        selectAreaRef.value = area
      })
    })
    watch(scopeArea, () => {
      if (scopeArea.value) {
        scopeArea.value.alpha = 0
        scopeArea.value.tag = scopeAreaData.tag
        original.step = 2
        original.mode = 'sel'
        setScopeAreaData()
        scopeArea.value.rectangle.on('edit-resize', () => {
          setScopeAreaData()
        })
      }
    })
    watch(scopeAreaData, val => {
      scopeArea.value.tag = val.tag
      scopeArea.value.lineColor =
        typeof val.color == 'string'
          ? ('0x' + val.color.slice(1)) * 1
          : val.color
    })

    function setScopeAreaData() {
      const _bound = scopeArea.value.getRectangleBounds()
      scopeAreaData.widthPx = _bound.width
      scopeAreaData.heightPx = _bound.height
    }

    return { ViewRef, onCommon, original, areasRef, scopeAreaData }
  },
}
</script>

<style></style>
