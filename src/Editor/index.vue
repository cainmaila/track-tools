<template>
  <div id="Stage" ref="View"></div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { createDrawingViewport } from './viewPortHandler'
const APP_NAME = 'TrackEditorTool'
export default {
  name: 'AppEditor',
  setup() {
    const View = ref(null)
    sdkListener(View)
    onMounted(() => {
      postEvent('ready')
    })
    return { View }
  },
}

function sdkListener(View) {
  window.addEventListener('message', ({ data }) => {
    const { target, message } = data || {}
    if (target === APP_NAME) {
      switch (message.type) {
        case 'setting':
          createDrawingViewport(View.value)
          console.log('#setting', message)
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
#Stage {
  height: 100%;
}
</style>
