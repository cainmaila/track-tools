/* 通訊至 IOS callbackHandler  */

const HANDLER = 'TrackViewer'

/* 給 IOS 的事件定義 */
const TO_IOS_EVENT = {
  readyToSetting: 'readyToSetting', //viewer onReady
  resourcesLoaded: 'resourcesLoaded', //告知素材載入完成
  resRecord: 'resRecord', //取回紀錄
  error: 'error', //錯誤
}

/* 送出通訊規格 */
function postIOSEvent(event, data = null) {
  const message = { event }
  data &&
    (message.data = typeof data === 'object' ? JSON.stringify(data) : data)
  _postIOS(
    {
      event,
      data,
    },
    HANDLER,
  )
}

const _ios_message_handler = {
  viewerSetting: () => {}, //viewer 初始化
  pushPoint: () => {}, //送入點
  setMode: () => {}, //設定顯示模式
  generateRecord: () => {}, //要求產生紀錄
}

/* 設定 ios 傳入的處理程序 */
function settingIosMessageHandler(settingHandle) {
  // eslint-disable-next-line no-const-assign
  _ios_message_handler = { ...settingHandle }
}

//============================================================================

function _postIOS(data, handler) {
  try {
    window.webkit.messageHandlers[handler].postMessage(
      JSON.stringify(data),
      '*',
    )
  } catch (error) {
    window.alert(error.message || error)
  }
}

/* viewer 設定 */
window.viewerSetting = setting => {
  try {
    const _setting =
      typeof setting === 'object' ? _setting : JSON.parse(_setting)
    _ios_message_handler.viewerSetting(_setting)
  } catch (error) {
    postIOSEvent(TO_IOS_EVENT.error, error.message)
  }
}

/* 傳入點 */
window.pushPoint = pointsStr => {
  _ios_message_handler.pushPoint(pointsStr.split(','))
}

/* 定位模式 */
window.setMode = mode => {
  _ios_message_handler.setMode(mode)
}

/* 要求取回紀錄 */
window.generateRecord = () => {
  _ios_message_handler.generateRecord()
}

export {
  postIOSEvent /* 送出通訊規格 */,
  TO_IOS_EVENT /* 給 IOS 的事件定義 */,
  settingIosMessageHandler /* 設定 ios 傳入的處理程序 */,
}
