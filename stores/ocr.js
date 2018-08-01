var Tesseract = require('tesseract.js')
var Progress = require('../components/progress')

// map yandex langs to tesseract langs
const langs = {
  af:	'afr',
  ar:	'ara',
  az:	'aze',
  be:	'bel',
  bn:	'ben',
  bg:	'bul',
  ca:	'cat',
  cs:	'ces',
  zh:	'chi_tra',
  da:	'dan',
  de:	'deu',
  el:	'ell',
  en:	'eng'	,
  eo:	'epo'	,
  et:	'est',
  eu:	'eus'	,
  fi:	'fin',
  fr:	'fra'	,
  gl:	'glg'	,
  he:	'heb',
  hi:	'hin',
  hr:	'hrv',
  hu:	'hun',
  id:	'ind',
  is:	'isl',
  it:	'ita'	,
  ja:	'jpn',
  kn:	'kan',
  ko:	'kor',
  lv:	'lav',
  lt:	'lit',
  ml:	'mal',
  mk:	'mkd',
  mt:	'mlt',
  ms:	'msa',
  nl:	'nld',
  no:	'nor',
  pl:	'pol',
  pt:	'por',
  ro:	'ron',
  ru:	'rus'	,
  sl:	'slv',
  es:	'spa'	,
  sq:	'sqi'	,
  sw:	'swa',
  sv:	'swe',
  ta:	'tam',
  te:	'tel',
  tl:	'tgl',
  th:	'tha',
  tr:	'tur',
  uk:	'ukr',
  vi:	'vie'
}
module.exports = store

store.storeName = 'ocr'
function store (state, emitter) {
  emitter.on('ocr:detect', function () {
    Tesseract.detect(document.querySelector('img'))
      .progress(function (message){
        var progressComponent = state.cache(Progress, 'progress')
        progressComponent.local = message
        progressComponent.render(state, emitter.emit)
      }).then(function (result){
        console.log(result)
      }).catch(function (error) {
        console.log(error)
      })
  })
  emitter.on('ocr:recognize', function () {
    Tesseract.recognize(document.querySelector('img'), {lang: langs[state.currentLanguage] || 'spa'})
      .progress(function (message){
        var progressComponent = state.cache(Progress, 'progress')
        progressComponent.local = message
        progressComponent.render(state, emitter.emit)
      }).then(function (result){
        emitter.emit('translate:translate', result.text)
        Tesseract.terminate()
      }).catch(function (error) {
        console.log(error)
      })
  })
}