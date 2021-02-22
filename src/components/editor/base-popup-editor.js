import BaseEditor from './base-editor'
import PopupGroupMixin from '@/mixins/mix-popup-group'
import PopupEditorWrapper from './popup-editor-wrapper.vue'

export default {
  name: 'MusselBasePopupEditor',
  components: {
    'mu-popup-editor-wrapper': PopupEditorWrapper
  },
  extends: BaseEditor,
  mixins: [PopupGroupMixin],
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    popupWidth: {
      type: String,
      default: 'inherit'
    }
  },
  methods: {
    onInputClick () {
      if (!this.readonly && !this.params.editable) {
        this.togglePopup()
      }
      this.$emit('inputclick')
    },
    onButtonTap () {
      this.focus()
      this.togglePopup()
      this.$emit('buttonTap')
    },
    onClearClick () {
      this.hidePopup()
      this.clear()
      this.$emit('change', '')
    }
  },
  created () {
    this.params.icon = this.icon || (
      this.iconClass ? undefined : 'dropdown'
    )
  },
  mounted () {
    if (this.autofocus) this.popupParams.visible = true
  }
}
