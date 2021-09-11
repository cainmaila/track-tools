<template>
  <div class="page">
    <div id="Viewer" class="page" ref="viewRef"></div>
  </div>
</template>
<script>
import { reactive } from 'vue'
import pixiInitHandler from '@/commonHandlers/pixi-init-handler.js'
import viewPortInitHandler from './viewPort-init-handler.js'
import modeHandler from './mode-handler.js'
import {
  iosInterfaceHandler,
  settingIosMessageHandler,
} from './ios-interface-handler.js'
export default {
  name: 'TrackViewer',
  setup() {
    /* Viewer狀態機 */
    const store = reactive({
      state: 'init', //init -> ready -> loaded
      mode: 'mono', //mone lock
    })
    const { viewRef, appRef, onViewResize } = pixiInitHandler(store) //創建PIXI實體
    const { viewPortRef, viewerSetting, generateHistory } = viewPortInitHandler(
      store,
      appRef,
    ) //創建viewport 實體
    const { pushPoint } = modeHandler(store, viewPortRef) //mode變換處理
    //設定ios事件處理方法
    settingIosMessageHandler({
      viewerSetting,
      pushPoint,
      generateHistory,
      setMode: mode => {
        store.mode = mode
      },
    })
    iosInterfaceHandler(store) /* viewer 狀態通知 IOS */
    window.onresize = () => {
      onViewResize()
      viewPortRef.value.resize()
    }
    return {
      store,
      viewRef,
      viewPortRef,
    }
  },
}
</script>
<style lang="postcss" scoped></style>
