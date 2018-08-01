var Component = require('choo/component')
var html = require('choo/html')
var css = require('sheetify')

var div = css`
:host {
  text-align: left;
  position: absolute;
  background: rgba(255,255,255, 0.8);
  padding: 0 0.5rem;
}
`

class Progress extends Component {
  constructor (id, state, emit) {
    super(id)
    this.local = state.components[id] = {
      status: '',
      progress: ''
    }
  }

  createElement () {
    return html`
      <div class="${div}">
        <span class="db">${this.local.status ? this.local.status : ''}</span>
        <span>${this.local.progress ? this.local.progress : ''}</span>
      </div>
    `
  }

  update () {
    return true
  }
}

module.exports = Progress