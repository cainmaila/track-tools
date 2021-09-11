<template>
  <div id="TrackPlayer" class="page">
    <div id="Viewer" class="page" ref="viewRef"></div>
  </div>
</template>
<script>
import { reactive } from 'vue'
import pixiInitHandler from '@/commonHandlers/pixi-init-handler.js'
import viewPortInitHandler from '@/commonHandlers/drawPathViewport-init-handler.js'
import playerSdkMessageHandler from './playerSdk-message-handler'
export default {
  name: 'TrackPlayer',
  setup() {
    /* Viewer狀態機 */
    const store = reactive({
      state: 'init', //init -> ready -> loaded
    })
    const { viewRef, appRef, onViewResize } = pixiInitHandler(store) //創建PIXI實體
    const { viewPortRef, viewerSetting } = viewPortInitHandler(store, appRef) //創建viewport 實體
    const { postEvent, sdkCommandHandlerSetting } = playerSdkMessageHandler(
      store,
    ) //sdk Message

    sdkCommandHandlerSetting.viewerSetting = viewerSetting //初始化

    window.onresize = () => {
      onViewResize()
      viewPortRef.value.resize()
    }
    return {
      viewRef,
      appRef,
      viewerSetting,
      postEvent,
      sdkCommandHandlerSetting,
    }
  },
}
</script>
<style lang="postcss" scoped></style>
