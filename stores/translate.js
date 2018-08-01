var Config = require('../components/config')

module.exports = store

store.storeName = 'translate'
function store (state, emitter) {
  var config = state.cache(Config, 'config')
  emitter.on('translate:translate', function (text) {
    fetch('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180724T203851Z.d5ea8b1018c495fe.cf05ff3d9733d6c5b890288eb9331ce1931b1404&text='+text+'&lang='+(state.currentLanguage || 'es')+'-'+(state.translateLanguage || 'en')+'&format=plain')
      .then(response => response.json())
      .then(({ text }) => {
        state.translation = text[0]
        emitter.emit('render')
      })
  })
  emitter.on('DOMContentLoaded', function () {
    fetch('https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en&key=trnsl.1.1.20180724T203851Z.d5ea8b1018c495fe.cf05ff3d9733d6c5b890288eb9331ce1931b1404')
      .then(response => response.json())
      .then(({ langs }) => {
        config.local.langs = langs
        config.render(state, emitter.emit)
      })
  })
}
