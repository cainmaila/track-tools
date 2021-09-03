<template>
  <div id="PlayerPOC" class="hight_100" ref="ViewRef"></div>
</template>
<script>
import * as PIXI from 'pixi.js'
import { onMounted, ref } from 'vue'
import DrawPathViewport from '@/tools/draw-lib/DrawPathViewport'
import { setIosPushPoHandler } from './iosHandler'
export default {
  name: 'PlayerPOC',
  setup() {
    const ViewRef = ref()
    const viewportRef = ref()

    const app = new PIXI.Application({
      antialias: true,
      autoDensity: true,
      resolution: window.devicePixelRatio || 1,
      backgroundColor: 0x000000,
    })

    onMounted(() => {
      ViewRef.value.appendChild(app.view)
      viewportRef.value = new DrawPathViewport(app, {
        floors: [
          {
            id: 'floor',
            // img: './img/MaFloorPlan.png',
            img: './img/dopulin.jpg',
            offset: { x: 0, y: 0 },
            scale:
              new URLSearchParams(window.location.search)?.get('scale') * 1,
          },
        ],
      })
      viewportRef.value.on('resources-ready', () => {
        viewportRef.value.floor = 'floor'
        setIosPushPoHandler(xy => {
          viewportRef.value.pushPoint({ x: xy[0] * 1, y: xy[1] * 1 })
        })
      })

      resize()
    })

    window.onresize = () => {
      resize()
      viewportRef.value.resize()
    }
    function resize() {
      app.renderer.resize(ViewRef.value.clientWidth, ViewRef.value.clientHeight)
    }

    return {
      ViewRef,
    }
  },
}
</script>
<style lang="postcss" scoped></style>
