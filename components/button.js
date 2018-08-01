var Component = require('choo/component')
var html = require('choo/html')
var css = require('sheetify')
var Image = require('./image')

var svg = css`
  :host {
    position: absolute;
    left: 1rem;
    top: 0.5rem;
  }
`
class Button extends Component {
  constructor (id, state, emit) {
    super(id)
    this.local = state.components[id] = {}
    this.cache = state.cache
    this.state = state
    this.emit = emit
    
    this.loadImage = this.loadImage.bind(this)
  }

  loadImage (event) {
    var self = this
    var file = event.target.files[0]
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (e) {
      self.state.src = e.target.result
      self.cache(Image, 'image').render(self.state, self.emit)
    }
  }

  createElement (state) {
    this.state = state
    return html`
      <div class="mt5 absolute bottom-2 left-0 right-0">
        <label for="pic" class="f5 relative w-75 tc center pointer no-underline black bg-animate bg-white hover-bg-black hover-white pt4 ph4 ba border-box mr4">
          <svg class="${svg}" id="i-camera" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path d="M2 8 L 9 8 12 4 20 4 23 8 30 8 30 26 2 26 Z" />
            <circle cx="16" cy="16" r="5" />
          </svg>
        </label>
        <input type="file" id="pic" name="pic" accept="image/*" capture class="dn" onchange=${this.loadImage}/>
      </div>
    `
  }

  update (state, emit) {
    this.state = state
    return false
  }
}

module.exports = Button