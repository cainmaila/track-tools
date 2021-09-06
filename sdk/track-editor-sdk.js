import 'regenerator-runtime/runtime.js' //fix babel 7.x-无法解析'core-js/modules/es.array.concat'
const Version = '1.0.0'
console.info(
  ` 🤘%c Hello TrackEditorSDK Version ${Version} %c`,
  'background: #236D94; color: #fff; border-radius: 10px;',
  '',
)
const VIEWER_ID = 'TrackEditor'

window.TrackEditor = window.TrackEditor || {
  setup: ({ contentId, uri, lang, setting }) => {
    const self = window.TrackEditor
    self.lang = lang
    self.setting = setting
    self.content = document.getElementById(contentId)
    self.uri = uri
    self.view && self.view.remove() //移除舊的 viewer
    setTimeout(self._addViewer)
  },
  getAreaMeta() {
    postToEditor('getAreaMeta')
  },
  setAreaMeta(meta) {
    postToEditor('setAreaMeta', meta)
  },
  _addViewer() {
    const self = window.TrackEditor
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
  _addEventListener() {
    const self = window.TrackEditor
    window.addEventListener('message', function(e) {
      var data = e.data
      var meta
      if (data && data.app === 'TrackEditorTool') {
        switch (data.message && data.message.type) {
          case 'ready':
            postToEditor('setting', self.setting)
            break
          case 'areaData':
            meta = data.message.data
            if (meta.error) {
              alert(meta.error)
            } else {
              sessionStorage.setItem('tree', JSON.stringify(meta))
              alert('存檔成功')
            }
            break
        }
      }
    })
  },
}

function postToEditor(type, data) {
  window.TrackEditor.view.contentWindow.postMessage(
    {
      target: 'TrackEditorTool',
      message: {
        type,
        data,
      },
    },
    '*',
  )
}
