/* 通訊至 IOS callbackHandler  */
import { log, postIOSEvent } from '@/commonHandlers/ios-interface'

/* 給 IOS 的事件定義 */
const TO_IOS_EVENT = {
  readyToSetting: 'readyToSetting', //viewer onReady
  resourcesLoaded: 'resourcesLoaded', //告知素材載入完成
  historyReady: 'historyReady', //歷史紀錄設定完成
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
  setHistory: () => {}, //設定歷史紀錄
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
        case 'history-ready':
          postIOSEvent(TO_IOS_EVENT.historyReady)
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
window.setHistory = points => {
  log('#setHistory', points)
  try {
    _ios_message_handler.setHistory(
      typeof points === 'object' ? points : JSON.parse(points),
    )
  } catch (error) {
    postIOSEvent(TO_IOS_EVENT.error, error.message)
  }
}

export {
  log,
  iosInterfaceHandler /* viewer 狀態通知 */,
  postIOSEvent /* 送出通訊規格 */,
  TO_IOS_EVENT /* 給 IOS 的事件定義 */,
  settingIosMessageHandler /* 設定 ios 傳入的處理程序 */,
}
