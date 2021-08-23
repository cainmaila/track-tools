<template>
  <div id="Stage" ref="View"></div>
</template>

<script>
import * as PIXI from 'pixi.js'
import { onMounted, ref } from 'vue'
export default {
  name: 'AppEditor',
  setup() {
    const View = ref(null)
    let viewport = null
    onMounted(() => {
      viewport = pixiInit(View.value)
    })
    return { View, viewport }
  },
}

import DrawingViewport from '@/tools/draw-lib/DrawingViewport'
function pixiInit(view) {
  const app = new PIXI.Application({
    antialias: true,
    autoDensity: true,
    resolution: window.devicePixelRatio || 1,
    backgroundColor: 0xffffff,
  })
  resize()
  view.appendChild(app.view)

  const viewport = new DrawingViewport(app, {
    bg: './img/bg.png',
    aeraSetting: {
      lineColor: 0xff00ff,
      tagStyle: { fill: 0xffffff, bg: 0x000000 },
    },
    devicePixelRatio: window.devicePixelRatio,
  })

  window.onresize = () => {
    resize()
    viewport.resize()
  }
  function resize() {
    app.renderer.resize(view.clientWidth, view.clientHeight)
  }
  return app
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
#Stage {
  height: 100%;
}
</style>
