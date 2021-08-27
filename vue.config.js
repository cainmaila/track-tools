const fs = require('fs')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const devServer = process.env.BUILD
  ? {}
  : {
      host: 'localhost',
      port: 8080,
      https: true,
      cert: fs.readFileSync(
        path.resolve(process.env.SSL_CERT_FILE || 'localhost.pem'),
      ),
      key: fs.readFileSync(
        path.resolve(process.env.SSL_KEY_FILE || 'localhost-key.pem'),
      ),
    }

module.exports = {
  publicPath: './',
  // productionSourceMap: false /* 不需要生产环境的 source map */,
  devServer,
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
    },
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
  },
  chainWebpack: config => {
    config.resolve.alias.set('~at2@', resolve('story-book'))
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
    },
    editor: {
      entry: 'src/main-editor.js',
      template: 'public/index.html',
    },
    iospoc: {
      entry: 'src/main-player-poc.js',
      template: 'public/index.html',
    },
  },
}
