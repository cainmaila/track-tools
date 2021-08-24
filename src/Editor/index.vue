<template>
  <div id="EditorTool" class="hight_100">
    <div id="Stage" class="hight_100" ref="ViewRef"></div>
    <FootUi @common="onCommon" :mode="original.mode" :step="original.step" />
  </div>
</template>

<script>
import { onMounted, ref, reactive, watchEffect } from 'vue'
import { drawingViewportInit } from './viewPortHandler'
import FootUi from '@/components/editor/FootUi'
const APP_NAME = 'TrackEditorTool'
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
    sdkListener(ViewRef, viewportRef)
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
    }
    watchEffect(() => {
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
    watchEffect(() => {
      if (scopeArea.value) {
        scopeArea.value.editEnable = false
        original.step = 2
        original.mode = 'sel'
      }
    })
    return { ViewRef, onCommon, original }
  },
}

function sdkListener(ViewRef, viewportRef) {
  window.addEventListener('message', ({ data }) => {
    const { target, message } = data || {}
    let initOb
    if (target === APP_NAME) {
      switch (message.type) {
        case 'setting':
          initOb = drawingViewportInit(ViewRef.value, message.data) //傳入設定，創建viewport
          viewportRef.value = initOb.viewport
          break
        default:
          console.warn('未定的type', message)
      }
    }
  })
}

function postEvent(type, data) {
  _postMessage({ type, data })
}

function _postMessage(message) {
  window.postMessage(
    {
      app: APP_NAME,
      message,
    },
    '*',
  )
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
