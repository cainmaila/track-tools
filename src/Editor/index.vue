<template>
  <div id="EditorTool" class="hight_100">
    <div id="Stage" class="hight_100" ref="ViewRef"></div>
    <FootUi @common="onCommon" :mode="original.mode" :step="original.step" />
    <LayerUi :areas="areasRef" @common="onCommon" />
    <DetailUi v-model:tag="scopeAreaData.tag" />
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
    })
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

    watch(viewportRef, () => {
      areaLayerHandler(viewportRef.value, areasRef)

      viewportRef.value.on('add-area', area => {
        switch (original.mode) {
          case 'scope':
            scopeArea.value = area
            break
          case 'area':
            original.mode = 'sel'
            area.tag = area.name
            break
        }
      })
    })
    watch(scopeArea, () => {
      if (scopeArea.value) {
        scopeArea.value.alpha = 0
        scopeArea.value.isRoot = true
        scopeArea.value.tag = scopeAreaData.tag
        original.step = 2
        original.mode = 'sel'
      }
    })
    watch(scopeAreaData, val => {
      scopeArea.value.tag = val.tag
    })
    return { ViewRef, onCommon, original, areasRef, scopeAreaData }
  },
}
</script>

<style></style>
