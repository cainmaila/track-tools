<template>
  <div id="TrackPlayer" class="page">
    <div id="Viewer" class="page" ref="viewRef"></div>
  </div>
</template>
<script>
import { reactive } from 'vue'
import pixiInitHandler from '@/commonHandlers/pixi-init-handler.js'
export default {
  name: 'TrackPlayer',
  setup() {
    /* Viewer狀態機 */
    const store = reactive({
      state: 'init', //init -> ready -> loaded
      mode: 'mono', //TODO: ?? mone lock
    })
    const { viewRef, appRef, onViewResize } = pixiInitHandler(store) //創建PIXI實體
    window.onresize = () => {
      onViewResize()
    }
    return {
      viewRef,
      appRef,
    }
  },
}
</script>
<style lang="postcss" scoped></style>
