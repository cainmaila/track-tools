import { watch } from 'vue'
const APP_NAME = 'TrackPlayerTool'
function postEvent(type, data) {
  _postMessage({ type, data })
}
function playerSdkMessageHandler(store) {
  let sdkCommandHandlerSetting = {
    viewerSetting: data => {
      console.log('#viewerSetting', data)
    },
  }
  const _commandHandler = data => {
    const { target, message } = data || {}
    if (target === APP_NAME) {
      switch (message.type) {
        case 'viewerSetting':
          sdkCommandHandlerSetting.viewerSetting(message.data)
          break
        default:
          console.warn('未定的type', message)
      }
    }
  }
  const _eventListener = () => {
    window.addEventListener('message', ({ data }) => _commandHandler(data))
  }
  watch(
    () => store.state,
    state => {
      switch (state) {
        case 'ready':
          _eventListener()
          break
        default:
      }
      postEvent('state', state)
    },
  )

  return {
    postEvent,
    sdkCommandHandlerSetting,
  }
}

//============================================================================

function _postMessage(message) {
  window.parent.postMessage(
    {
      app: APP_NAME,
      message,
    },
    '*',
  )
}

export default playerSdkMessageHandler
