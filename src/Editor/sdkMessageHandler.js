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

export { postEvent, APP_NAME }
