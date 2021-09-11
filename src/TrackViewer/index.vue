<template>
  <div class="page">
    <div id="Viewer" class="page" ref="viewRef"></div>
  </div>
</template>
<script>
import { reactive } from 'vue'
import pixiInitHandler from './pixi-init-handler.js'
import viewPortInitHandler from './viewPort-init-handler.js'
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
    })
    const { viewRef, appRef, onViewResize } = pixiInitHandler(store) //創建PIXI實體
    const { viewPortRef, viewerSetting, pushPoint } = viewPortInitHandler(
      store,
      appRef,
    ) //創建viewport 實體
    settingIosMessageHandler({
      viewerSetting,
      pushPoint,
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
