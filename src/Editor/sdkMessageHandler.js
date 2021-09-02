const APP_NAME = 'TrackEditorTool'
function postEvent(type, data) {
  _postMessage({ type, data })
}

function _postMessage(message) {
  window.postMessage(
    {
      app: APP_NAME,
      message,
    },
    '*',
  )
}

function sdkListenerHandler({ setting, getAreaMeta, setAreaMeta }) {
  window.addEventListener('message', ({ data }) => {
    const { target, message } = data || {}
    if (target === APP_NAME) {
      switch (message.type) {
        case 'setting':
          setting && setting(message.data)
          break
        case 'getAreaMeta':
          getAreaMeta && getAreaMeta()
          break
        case 'setAreaMeta':
          setAreaMeta && setAreaMeta(message.data)
          break
        default:
          console.warn('未定的type', message)
      }
    }
  })
}

export { postEvent, sdkListenerHandler }
