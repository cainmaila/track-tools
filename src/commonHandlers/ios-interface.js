/* 整合了一些 IOS使用工具 */

const HANDLER = 'eventHandler'
const isIOS = !!window.webkit

/* 送出通訊規格 */
function postIOSEvent(event, data = null) {
  _postIOS({
    event,
    data,
  })
}

// eslint-disable-next-line no-unused-vars
function log(data) {
  // const log = document.getElementById('LOG')
  // const mes = document.createElement('div')
  // mes.innerHTML = typeof data === 'object' ? JSON.stringify(data) : data
  // log.appendChild(mes)
}

export {
  log /* Log ，html必須有id LOG*/,
  postIOSEvent /* 送到IOS接口，目前寫死 eventHandler 街口*/,
  isIOS /* 是否有webkit，證明是否為ios所用 */,
}

//============================================================================

function _postIOS(data) {
  if (!isIOS) return
  log(`送出 :` + JSON.stringify(data))
  try {
    window.webkit.messageHandlers[HANDLER].postMessage(
      JSON.stringify(data),
      '*',
    )
  } catch (error) {
    console.warn(error.message || error)
  }
}
