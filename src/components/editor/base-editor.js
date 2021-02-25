import DeprecatedCheckMixin from '@/mixins/deprecated-check'
import BaseEditorWrapper from './base-editor-wrapper.vue'

export default {
  name: 'MusselBaseButtonEditor',
  components: {
    'mu-editor-wrapper': BaseEditorWrapper
  },
  mixins: [DeprecatedCheckMixin],
  provide () {
    return {
      editor: this,
      params: this.params
    }
  },
  data () {
    const p = this
    const params = {
      focus: false,
      type: p.type,
      value: p.value,
      icon: p.icon,
      readonly: p.readonly,
      disabled: p.disabled,
      editable: p.editable,
      clearable: p.clearable,
      autofocus: p.autofocus,
      placeholder: p.placeholder,
      iconClass: p.iconClass,
      iconAlign: p.iconPosition || p.iconAlign,
      iconTapable: p.iconTapable !== false
    }
    return { params }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: [String, Number]
    },
    icon: String,
    iconClass: String,
    iconPosition: {
      type: String,
      deprecated: true,
      replacement: 'icon-align'
    },
    iconAlign: {
      type: String,
      default: 'right',
      validator (value) {
        return ['left', 'right'].indexOf(value) !== -1
      }
    },
    iconTapable: null,
    editable: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    autofocus: Boolean
  },
  watch: {
    value: {
      handler (value) {
        if (!this.$options.preventBaseWatch?.value) this.setValue(value)
      },
      immediate: true
    },
    readonly (value) {
      this.params.readonly = value
    },
    disabled (value) {
      this.params.disabled = value
    },
    type (value) {
      this.params.type = value
    },
    icon (value) {
      this.params.icon = value
    },
    iconClass (value) {
      this.params.iconClass = value
    },
    iconAlign (value) {
      this.params.iconAlign = value
    },
    editable (value) {
      this.editable = value
    },
    clearable (value) {
      this.params.clearable = value
    },
    placeholder (value) {
      this.params.placeholder = value
    },
    autofocus (value) {
      this.params.autofocus = value
    }
  },
  methods: {
    setValue (value) {
      this.params.value = value
    },
    onInput (value) {
      if (!this.editable && !value) return
      this.setValue(value)
      this.$emit('input', value)
      this.$emit('change', value)
    },
    onInputClick (event) {
      this.$emit('inputclick', event)
    },
    onClearClick () {
      this.clear()
      this.$emit('change', '')
    },
    onButtonTap (event) {
      this.focus()
      if (this.params.iconTapable) this.$emit('buttontap', event)
    },
    onKeyPress (event) {
      this.$emit('keypress', event)
    },
    onEscKey () {
      this.$emit('esckey', this)
    },
    onEnterKey () {
      this.$emit('enterkey', this)
    },
    onFocus () {
      this.$emit('focus', this)
    },
    onBlur () {
      this.$emit('blur', this)
    },
    clear () {
      this.params.value = ''
      this.focus()
      this.$emit('clear')
    },
    focus () {
      this.$el.querySelector('.mu-input').focus()
    }
  }
}
