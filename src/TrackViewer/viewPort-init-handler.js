import { watch, ref } from 'vue'
import DrawPathViewport from '@/tools/draw-lib/DrawPathViewport'
function viewPortInitHandler(store, appRef) {
  const viewPortRef = ref()
  watch(appRef, app => {
    const viewport = new DrawPathViewport(app, {
      floors: [
        {
          id: '1f',
          img: './img/aaa.jpg',
          offset: { x: 200, y: 90 },
          scale: 10, //比例尺 px/m
        },
      ],
    })
    viewport.on('resources-ready', () => {
      //樓板圖面載入
      viewport.floor = '1f'
      store.state = 'loaded' /* 狀態機 */
    })
    viewPortRef.value = viewport
  })
  return {
    viewPortRef,
  }
}

export default viewPortInitHandler
