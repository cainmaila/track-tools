<template>
  <div class="max">
    <div id="Viewer" class="max" ref="viewRef"></div>
  </div>
</template>
<script>
import { reactive } from 'vue'
import pixiInitHandler from '@/commonHandlers/pixi-init-handler.js'
import viewPortInitHandler from './viewport-handler'
import {
  iosInterfaceHandler,
  settingIosMessageHandler,
} from './ios-interface-handler.js'
export default {
  name: 'LocationViewer',
  setup() {
    /* Viewer狀態機 */
    const store = reactive({
      state: 'init', //init -> ready -> loaded -> location
    })
    const { viewRef, appRef, onViewResize } = pixiInitHandler(store) //創建PIXI實體
    const { viewPortRef, viewerSetting } = viewPortInitHandler(store, appRef) //創建viewport 實體
    //設定ios事件處理方法
    settingIosMessageHandler({
      viewerSetting,
      // setLocation,
      // restPosition,
    })
    iosInterfaceHandler(store) /* viewer 狀態通知 IOS */
    window.onresize = () => {
      onViewResize()
      viewPortRef.value && viewPortRef.value.resize()
    }

    return { store, viewRef }
  },
}
</script>
<style lang="postcss" scoped>
#Page {
  width: 100%;
  height: 100%;
}
.max {
  width: 100%;
  height: 100%;
}
</style>
