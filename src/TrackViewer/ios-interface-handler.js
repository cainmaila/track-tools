/* 通訊至 IOS callbackHandler  */

import { log, postIOSEvent } from '@/commonHandlers/ios-interface'

/* 給 IOS 的事件定義 */
const TO_IOS_EVENT = {
  readyToSetting: 'readyToSetting', //viewer onReady
  resourcesLoaded: 'resourcesLoaded', //告知素材載入完成
  resHistory: 'resHistory', //取回紀錄
  error: 'error', //錯誤
}

let _ios_message_handler = {
  viewerSetting: () => {}, //viewer 初始化
  // {
  //   floors: [
  //     {
  //       id: '1f',
  //       img: './img/aaa.jpg',
  //       offset: { x: 200, y: 90 },
  //       scale: 10, //比例尺 px/m
  //     },
  //   ],
  // }
  pushPoint: () => {}, //送入點
  suspend: () => {}, //暫停繪製
  setMode: () => {}, //設定顯示模式
  generateHistory: () => {}, //要求產生紀錄
}

/* 設定 ios 傳入的處理程序 */
function settingIosMessageHandler(settingHandle) {
  // eslint-disable-next-line no-const-assign
  _ios_message_handler = { ...settingHandle }
}

import { watch } from 'vue'
function iosInterfaceHandler(store) {
  watch(
    () => store.state,
    state => {
      log(state)
      switch (state) {
        case 'ready':
          postIOSEvent(TO_IOS_EVENT.readyToSetting)
          break
        case 'loaded':
          postIOSEvent(TO_IOS_EVENT.resourcesLoaded)
          break
      }
    },
  )
}

//============================================================================

/* viewer 設定 */
window.viewerSetting = setting => {
  log('#viewerSetting', setting)
  try {
    const _setting = typeof setting === 'object' ? setting : JSON.parse(setting)
    if (!_setting.floors || _setting.floors.length === 0) {
      throw new Error({ message: '沒有 floors' })
    }
    _ios_message_handler.viewerSetting(_setting)
  } catch (error) {
    postIOSEvent(TO_IOS_EVENT.error, error.message)
  }
}
//window.viewerSetting('{"floors":[{"id":"1f","img":"./img/aaa.jpg","offset":{"x":200,"y":90},"scale":10}]}')

/* 傳入點 */
window.pushPoint = pointsStr => {
  log('#pushPoint', pointsStr)
  _ios_message_handler.pushPoint(pointsStr.split(','))
}

/* 暫停繪製 */
window.suspend = () => {
  log('#suspend')
  _ios_message_handler.suspend()
}

/* 定位模式 */
window.setMode = mode => {
  log('#setMode', mode)
  _ios_message_handler.setMode(mode)
}

/* 要求取回紀錄 */
window.generateHistory = () => {
  log('#generateHistory')
  postIOSEvent(TO_IOS_EVENT.resHistory, _ios_message_handler.generateHistory())
}

export {
  log,
  iosInterfaceHandler /* viewer 狀態通知 */,
  postIOSEvent /* 送出通訊規格 */,
  TO_IOS_EVENT /* 給 IOS 的事件定義 */,
  settingIosMessageHandler /* 設定 ios 傳入的處理程序 */,
}
