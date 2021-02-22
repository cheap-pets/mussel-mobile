import Button from './button.jsx'

export default {
  name: 'MusselIconButton',
  extends: Button,
  render (h) {
    return (
      <button
        class="mu-button mu-icon-button"
        button-type={ this.buttonType }
        button-style={ this.buttonStyle }
        button-shape={ this.buttonShape }
        onTap={ this.onTap }>
        <icon icon={ this.icon } icon-class={ this.iconClass } />
      </button>
    )
  }
}
