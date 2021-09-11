<template>
  <div class="page">
    <div id="Viewer" class="page" ref="viewRef"></div>
  </div>
</template>
<script>
import pixiInitHandler from './pixi-init-handler.js'
import viewPortInitHandler from './viewPort-init-handler.js'
export default {
  name: 'TrackViewer',
  setup() {
    const { viewRef, appRef, onViewResize } = pixiInitHandler() //創建PIXI實體
    const { viewPortRef } = viewPortInitHandler(appRef) //創建viewport 實體
    window.onresize = () => {
      onViewResize()
      viewPortRef.value.resize()
    }
    return {
      viewRef,
      viewPortRef,
    }
  },
}
</script>
<style lang="postcss" scoped></style>
