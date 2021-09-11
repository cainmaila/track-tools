<template>
  <div id="TrackPlayer" class="page">
    <div id="Viewer" class="page" ref="viewRef"></div>
  </div>
</template>
<script>
import { reactive, watch } from 'vue'
import pixiInitHandler from '@/commonHandlers/pixi-init-handler.js'
import viewPortInitHandler from '@/commonHandlers/drawPathViewport-init-handler.js'
export default {
  name: 'TrackPlayer',
  setup() {
    /* Viewer狀態機 */
    const store = reactive({
      state: 'init', //init -> ready -> loaded
    })
    const { viewRef, appRef, onViewResize } = pixiInitHandler(store) //創建PIXI實體
    const { viewPortRef, viewerSetting } = viewPortInitHandler(store, appRef) //創建viewport 實體
    window.onresize = () => {
      onViewResize()
      viewPortRef.value.resize()
    }
    watch(appRef, () => {
      viewerSetting({
        floors: [
          {
            id: '1f',
            img: './img/aaa.jpg',
            offset: { x: 200, y: 90 },
            scale: 10, //比例尺 px/m
          },
        ],
      })
    })
    return {
      viewRef,
      appRef,
      viewerSetting,
    }
  },
}
</script>
<style lang="postcss" scoped></style>
