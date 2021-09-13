<template>
  <div id="TrackPlayer" class="page">
    <div id="Viewer" class="page" ref="viewRef"></div>
  </div>
</template>
<script>
import { reactive, watch } from 'vue'
import pixiInitHandler from '@/commonHandlers/pixi-init-handler.js'
import viewPortInitHandler from '@/commonHandlers/drawPathViewport-init-handler.js'
import playerSdkMessageHandler from './playerSdk-message-handler'
import playerHistoryHandler from './player-history-handler'
export default {
  name: 'TrackPlayer',
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
    const { setHistory, startPlayHistory } = playerHistoryHandler(
      store,
      viewPortRef,
    )
    sdkCommandHandlerSetting.viewerSetting = viewerSetting //初始化
    sdkCommandHandlerSetting.setHistory = setHistory //設定播放紀錄

    window.onresize = () => {
      onViewResize()
      viewPortRef.value.resize()
    }

    watch(
      () => store.state,
      state => {
        switch (state) {
          case 'history-ready':
            startPlayHistory()
            break
        }
      },
    )

    return {
      viewRef,
      appRef,
      viewerSetting,
      postEvent,
    }
  },
}
</script>
<style lang="postcss" scoped></style>
