<template>
  <div id="EditorTool" class="hight_100">
    <div id="Stage" class="hight_100" ref="ViewRef"></div>
    <FootUi @common="onCommon" :mode="original.mode" :step="original.step" />
  </div>
</template>

<script>
import { onMounted, ref, reactive, watch } from 'vue'
import { createViewPort } from './viewPortHandler'
import { postEvent, APP_NAME } from './sdkMessageHandler'
import FootUi from '@/components/editor/FootUi'
export default {
  name: 'AppEditor',
  components: { FootUi },
  setup() {
    const original = reactive({
      mode: 'sel',
      step: 1,
    })
    const ViewRef = ref(null)
    const viewportRef = ref()
    const scopeArea = ref(null)
    createViewPort(ViewRef, viewportRef, APP_NAME)
    onMounted(() => {
      postEvent('ready')
    })
    const onCommon = ({ common, data }) => {
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
      }
      viewportRef.value.selectEnable = original.mode != 'mov'
    }
    watch(viewportRef, () => {
      viewportRef.value &&
        viewportRef.value.on('add-area', area => {
          switch (original.mode) {
            case 'scope':
              scopeArea.value = area
              break
            case 'area':
              original.mode = 'sel'
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

    return { ViewRef, onCommon, original }
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
</style>
