<template>
  <div id="TrackPlayer" class="page">
    <div id="Viewer" ref="viewRef"></div>
    <PointTimeInfo id="PointTimeInfo" :time="store.nowPo?.date" />
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
    <At2Alert
      id="SuspendAlert"
      class="animate__animated animate__flipInX"
      :text="$t('Player.userSuspend')"
      v-if="store.suspendAlertShow"
    />
  </div>
</template>
<script>
import { reactive } from 'vue'
import pixiInitHandler from '@/commonHandlers/pixi-init-handler.js'
import viewPortInitHandler from '@/commonHandlers/drawPathViewport-init-handler.js'
import playerSdkMessageHandler from './playerSdk-message-handler'
import playerHistoryHandler from './player-history-handler'
import {
  iosInterfaceHandler,
  settingIosMessageHandler,
} from './ios-interface-handler'

import FootUi from '@/components/trackPlayer/FootUi'
import PointTimeInfo from '@/components/trackPlayer/PointTimeInfo'
import At2Alert from '~at2@/components/At2Alert'
export default {
  name: 'TrackPlayer',
  components: { FootUi, At2Alert, PointTimeInfo },
  setup() {
    /* Viewer狀態機 */
    const store = reactive({
      state: 'init', //init -> ready -> loaded -> history-ready
      suspendAlertShow: false,
      nowPo: null,
    })
    iosInterfaceHandler(store)
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
    } = playerHistoryHandler(store, viewPortRef, po => {
      //點的位置變動觸發
      store.nowPo = po
    })
    sdkCommandHandlerSetting.viewerSetting = viewerSetting //初始化
    sdkCommandHandlerSetting.setHistory = setHistory //設定播放紀錄

    //IOS接口
    settingIosMessageHandler({
      viewerSetting,
      setHistory,
    })

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
      store,
    }
  },
}
</script>
<style lang="postcss" scoped>
#trackPlayer {
  user-select: none;
}
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
#SuspendAlert {
  pointer-events: none;
}
#PointTimeInfo {
  position: absolute;
  top: 50px;
  left: 20px;
}
@media (--s-viewport) {
  #PointTimeInfo {
    top: 85px;
    left: 45px;
  }
}
</style>
