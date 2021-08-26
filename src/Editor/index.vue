<template>
  <div id="EditorTool" class="hight_100">
    <div id="Stage" class="hight_100" ref="ViewRef"></div>
    <FootUi @common="onCommon" :mode="original.mode" :step="original.step" />
    <LayerUi :areas="areasRef" @common="onCommon" />
  </div>
</template>

<script>
import { onMounted, ref, reactive, watch } from 'vue'
import { createViewPort } from './viewPortHandler'
import { postEvent, APP_NAME } from './sdkMessageHandler'
import { areaLayerHandler } from './areaLayerHandler'
import FootUi from '@/components/editor/FootUi'
import LayerUi from '@/components/editor/LayerUi'
export default {
  name: 'AppEditor',
  components: { FootUi, LayerUi },
  setup() {
    const original = reactive({
      mode: 'sel',
      step: 1,
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
          viewportRef.value.selectItem(data)
          break
      }
      viewportRef.value.selectEnable = original.mode != 'mov'
    }
    watch(viewportRef, () => {
      areaLayerHandler(viewportRef.value, areasRef)
      viewportRef.value &&
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
        scopeArea.value.editEnable = false
        scopeArea.value.alpha = 0
        original.step = 2
        original.mode = 'sel'
      }
    })
    return { ViewRef, onCommon, original, areasRef }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
.hight_100 {
  height: 100%;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
