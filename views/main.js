var html = require('choo/html')
var Button = require('../components/button')
var Image = require('../components/image')
var Progress = require('../components/progress')
var Config = require('../components/config')
var css = require('sheetify')

var TITLE = 'welcome - main'

module.exports = view

var result = css`
  :host {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 8rem;
    display: inline-block;
    background: rgba(255, 255, 255, 0.8);
  }
`
function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="code lh-copy">
      <main class="pa3 relative cf tc cover h-100 w-100">
        ${state.cache(Progress, 'progress').render(state, emit)}
        ${state.cache(Config, 'config').render(state, emit)}
        ${state.cache(Image, 'image').render(state, emit)}
        <div class="${result}">${state.translation || ''}</div>
        ${state.cache(Button, 'button').render(state, emit)}
      </main>
    </body>
  `
}
