<template>
  <div id="TrackPlayer" class="page">
    <div id="Viewer" ref="viewRef"></div>
    <FootUi
      id="FootUi"
      :playIng="historyStore.isPlay"
      :totale="historyStore.totaleTime"
      :time="historyStore.time"
      v-model:v="historyStore.v"
      @update:time="setTime"
      @play="startPlayHistory"
      @stop="stopPlayHistory"
      @zoom="setZoom"
    />
  </div>
</template>
<script>
import { reactive } from 'vue'
import pixiInitHandler from '@/commonHandlers/pixi-init-handler.js'
import viewPortInitHandler from '@/commonHandlers/drawPathViewport-init-handler.js'
import playerSdkMessageHandler from './playerSdk-message-handler'
import playerHistoryHandler from './player-history-handler'

import FootUi from '@/components/trackPlayer/FootUi'
export default {
  name: 'TrackPlayer',
  components: { FootUi },
  setup() {
    /* Viewer狀態機 */
    const store = reactive({
      state: 'init', //init -> ready -> loaded -> history-ready
    })
    const { viewRef, appRef, onViewResize } = pixiInitHandler(store) //創建PIXI實體
    const { viewPortRef, viewerSetting } = viewPortInitHandler(store, appRef) //創建viewport 實體
    const { postEvent, sdkCommandHandlerSetting } = playerSdkMessageHandler(
      store,
    ) //sdk Message
    const {
      historyStore,
      setHistory,
      startPlayHistory,
      stopPlayHistory,
      setTime,
    } = playerHistoryHandler(store, viewPortRef)
    sdkCommandHandlerSetting.viewerSetting = viewerSetting //初始化
    sdkCommandHandlerSetting.setHistory = setHistory //設定播放紀錄

    window.onresize = () => {
      onViewResize()
      viewPortRef.value.resize()
    }

    const setZoom = zoomMode => {
      const viewPort = viewPortRef.value
      switch (zoomMode) {
        case 'in':
          viewPort.zoom(0.05)
          break
        case 'out':
          viewPort.zoom(-0.05)
          break
        case 'fit':
          viewPort.zoomTofit()
          break
      }
    }

    return {
      viewRef,
      appRef,
      viewerSetting,
      postEvent,
      startPlayHistory,
      stopPlayHistory,
      historyStore,
      setTime,
      setZoom,
    }
  },
}
</script>
<style lang="postcss" scoped>
#FootUi {
  position: absolute;
  bottom: 0;
  left: 0;
}
#Viewer {
  width: 100%;
  height: calc(100% - 85px);
  overflow: hidden;
}
</style>
