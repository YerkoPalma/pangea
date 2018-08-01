var Component = require('choo/component')
var html = require('choo/html')

class Config extends Component {
  constructor (id, state, emit) {
    super(id)
    this.local = state.components[id] = {
      langs: {}
    }
    this.state = state
  }

  createElement () {
    return html`
      <div class="fr flex flex-column absolute right-2">
        <label for="input-lang" class="self-start">From</label>
        <input oninput=${e => this.state.currentLanguage = e.target.value} value="es" list="input-lang-lists" name="input-lang" id="input-lang" pattern="${Object.keys(this.local.langs).join('|')}"/>
        <datalist id="input-lang-lists">
          ${Object.keys(this.local.langs).map(lang => {
            return html`<option value=${lang}>${this.local.langs[lang]}</option>`
          })}
        </datalist>

        <label for="output-lang" class="self-start">To</label>
        <input oninput=${e => this.state.translateLanguage = e.target.value} value="en" list="output-lang-lists" name="output-lang" id="input-lang" pattern="${Object.keys(this.local.langs).join('|')}"/>
        <datalist id="output-lang-lists">
          ${Object.keys(this.local.langs).map(lang => {
            return html`<option value=${lang}>${this.local.langs[lang]}</option>`
          })}
        </datalist>
      </div>
    `
  }

  update () {
    return true
  }
}

module.exports = Config