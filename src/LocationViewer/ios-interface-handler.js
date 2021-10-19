/* 通訊至 IOS callbackHandler  */
import { log, postIOSEvent } from '@/commonHandlers/ios-interface'

/* 給 IOS 的事件定義 */
const TO_IOS_EVENT = {
  readyToSetting: 'readyToSetting', //viewer onReady
  resourcesLoaded: 'resourcesLoaded', //告知素材載入完成
  selectLocation: 'selectLocation', //選取了一個位置
  error: 'error', //錯誤
}

let _ios_message_handler = {
  viewerSetting: () => {}, //viewer 初始化
  // {
  //   floor: {
  //     id: '1f',
  //     img: './img/aaa.jpg',
  //     offset: { x: 200, y: 90 },
  //     scale: 10, //比例尺 px/m
  //   },
  //   area: {
  //     pos_left_up: { x: 0, y: 0 },
  //     width: 10,
  //     height: 10,
  //   },
  // }
  addLocation: () => {}, //設定位置
  // {
  //   x:0,
  //   y:0,
  //   id:'id'
  // }
  restPosition: () => {}, //重至畫面
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
    if (!_setting.floor) {
      throw new Error({ message: '沒有 floor' })
    } else if (!_setting.area) {
      throw new Error({ message: '沒有 area' })
    }
    _ios_message_handler.viewerSetting(_setting)
  } catch (error) {
    postIOSEvent(TO_IOS_EVENT.error, error.message)
  }
}

/* 傳入點 */
window.addLocation = point => {
  log('#addLocation', point)
  try {
    _ios_message_handler.addLocation(
      typeof point === 'object' ? point : JSON.parse(point),
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
