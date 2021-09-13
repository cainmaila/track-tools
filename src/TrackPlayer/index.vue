<template>
  <div id="TrackPlayer" class="page">
    <div id="Viewer" class="page" ref="viewRef"></div>
    <FootUi
      id="FootUi"
      :playIng="historyStore.isPlay"
      :totale="historyStore.totaleTime"
      :time="historyStore.time"
      @update:time="setTime"
      @play="startPlayHistory"
      @stop="stopPlayHistory"
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

    return {
      viewRef,
      appRef,
      viewerSetting,
      postEvent,
      startPlayHistory,
      stopPlayHistory,
      historyStore,
      setTime,
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
</style>
