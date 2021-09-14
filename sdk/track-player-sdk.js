import 'regenerator-runtime/runtime.js' //fix babel 7.x-无法解析'core-js/modules/es.array.concat'
const Version = '1.0.0'
console.info(
  ` 🤘%c Hello TrackPlayerSDK Version ${Version} %c`,
  'background: #236D94; color: #fff; border-radius: 10px;',
  '',
)
const VIEWER_ID = 'TrackPlayer'
window.TrackPlayer = window.TrackPlayer || {
  setup: ({ contentId, uri, lang }) => {
    const self = window.TrackPlayer
    self.lang = lang
    self.content = document.getElementById(contentId)
    self.uri = uri
    self.view && self.view.remove() //移除舊的 viewer
    setTimeout(self._addViewer)
  },
  viewerSetting(setting) {
    postToPlayer('viewerSetting', setting)
  },
  setHistory(_history) {
    postToPlayer('setHistory', _history)
  },
  _addViewer() {
    const self = window.TrackPlayer
    self.view = document.createElement('iframe')
    self.view.setAttribute('id', VIEWER_ID)
    self.view.setAttribute('width', '100%')
    self.view.setAttribute('height', '100%')
    self.view.setAttribute(
      'sandbox',
      'allow-popups allow-same-origin allow-scripts allow-downloads allow-forms allow-modals allow-orientation-lock',
    )
    self.view.setAttribute('frameborder', 0)
    self.content.appendChild(self.view)
    self._addEventListener()
    self.view.src = `${self.uri}?lang=${self.lang}`
  },
  onState() {},
  _addEventListener() {
    const self = window.TrackPlayer
    window.addEventListener('message', function(e) {
      var data = e.data
      if (data && data.app === 'TrackPlayerTool') {
        switch (data.message && data.message.type) {
          case 'state':
            self.onState(data.message.data)
            break
        }
      }
    })
  },
}

function postToPlayer(type, data) {
  window.TrackPlayer.view.contentWindow.postMessage(
    {
      target: 'TrackPlayerTool',
      message: {
        type,
        data,
      },
    },
    '*',
  )
}
