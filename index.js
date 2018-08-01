var choo = require('choo')
var css = require('sheetify')

css('tachyons')
css`
  html, body {
    height: 100%;
  }
  input:invalid {
    border: solid 1px red;
  }
`

var app = choo()

if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
}

app.use(require('./stores/ocr'))
app.use(require('./stores/translate'))

app.route('/', require('./views/main'))
app.route('/*', require('./views/404'))
app.mount('body')
