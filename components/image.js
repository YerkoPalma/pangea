var Component = require('choo/component')
var html = require('choo/html')

class Image extends Component {
  constructor (id, state, emit) {
    super(id)
    this.local = state.components[id] = {}
    this.emit = emit
    this.state = state
  }

  createElement (state) {
    return html`
      <img onload=${e => this.state.src && this.emit('ocr:recognize')} src="${this.state.src ? this.state.src : ''}" class="${this.state.src ? 'db' : 'dn'} h-100 center mw-100"/>
    `
  }

  update (state) {
    return state.src !== this.element.src
  }
}

module.exports = Image