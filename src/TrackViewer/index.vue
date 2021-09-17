<template>
  <div class="page">
    <div id="Viewer" class="page" ref="viewRef"></div>
    <At2Alert
      class="animate__animated animate__flipInX"
      text="使用者中斷"
      v-if="store.suspendAlertShow"
    />
  </div>
</template>
<script>
import { reactive } from 'vue'
import pixiInitHandler from '@/commonHandlers/pixi-init-handler.js'
import viewPortInitHandler from '@/commonHandlers/drawPathViewport-init-handler.js'
import viewerHandler from './viewer-handler.js'
import At2Alert from '~at2@/components/At2Alert'
import {
  iosInterfaceHandler,
  settingIosMessageHandler,
} from './ios-interface-handler.js'
export default {
  name: 'TrackViewer',
  components: { At2Alert },
  setup() {
    /* Viewer狀態機 */
    const store = reactive({
      state: 'init', //init -> ready -> loaded
      suspendAlertShow: false,
    })
    const viewerStore = reactive({
      mode: 'mono', //mone lock
    })
    const { viewRef, appRef, onViewResize } = pixiInitHandler(store) //創建PIXI實體
    const { viewPortRef, viewerSetting } = viewPortInitHandler(store, appRef) //創建viewport 實體
    const { pushPoint, suspend, generateHistory } = viewerHandler(
      viewerStore,
      viewPortRef,
    ) //mode變換處理 viewer命令處理
    //設定ios事件處理方法
    settingIosMessageHandler({
      viewerSetting,
      pushPoint,
      suspend,
      generateHistory,
      setMode: mode => {
        viewerStore.mode = mode
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
