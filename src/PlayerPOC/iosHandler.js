/* 通訊至 IOS callbackHandler  */
function postIOS(data, handler) {
  try {
    window.webkit.messageHandlers[handler].postMessage(
      JSON.stringify(data),
      '*',
    )
  } catch (error) {
    window.alert(error.message || error)
  }
}
let _iosPushPoHandler = xy => {
  window.alert('初始化尚未完成!', xy)
}
function setIosPushPoHandler(handler) {
  _iosPushPoHandler = handler
}

window.pushPo = poStr => {
  const arr = poStr.split(',')
  _iosPushPoHandler(arr)
}
window.iosLog = data => {
  window.alert(data)
}

export { postIOS, setIosPushPoHandler }
