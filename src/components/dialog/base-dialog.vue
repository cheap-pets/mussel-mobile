<script>
  import isString from 'lodash.isstring'

  import delay from '@/utils/delay'

  import BaseModal from '../modal/base-modal.vue'
  import DialogWrapper from './dialog-wrapper.vue'

  export default {
    name: 'MusselBaseDialog',
    components: {
      'mu-dialog-wrapper': DialogWrapper
    },
    extends: BaseModal,
    provide () {
      return {
        dialog: this,
        params: this.params
      }
    },
    props: {
      title: String,
      width: String,
      height: String,
      buttons: Array,
      danger: Boolean,
      keepAlive: Boolean,
      primaryButton: String,
      footer: {
        type: Boolean,
        default: true
      },
      draggable: {
        type: Boolean,
        default: true
      },
      modelControl: {
        type: String,
        default: 'both',
        validator (v) {
          return ['both', 'external'].indexOf(v) !== -1
        }
      }
    },
    data () {
      const o = this.$options
      return {
        params: {
          modalVisible: false,
          dialogVisible: false,
          btns: this.btns,
          title: this.title || o.title,
          width: this.width || o.width,
          height: this.height || o.height,
          danger: this.danger || o.danger,
          keepAlive: this.keepAlive || o.keepAlive,
          footer: this.footer !== false && o.footer !== false,
          primaryButton: this.primaryButton || o.primaryButton,
          draggable: !(this.draggable === false || o.draggable === false)
        }
      }
    },
    computed: {
      btns () {
        const buttons = this.buttons || this.$options.buttons
        const { primaryButton } = this.params

        return Array.isArray(buttons)
          ? buttons.map(button => {
            const btn = isString(button)
              ? { caption: button, _rawData: button }
              : { ...button }

            if (primaryButton && !btn.buttonType &&
              ([btn.id, btn.caption].indexOf(primaryButton) !== -1)) {
              btn.buttonType = this.params.danger ? 'danger' : 'primary'
            }
            return btn
          })
          : null
      }
    },
    watch: {
      buttons: {
        handler () {
          this.params.buttons = this.btns
        },
        immediate: true
      },
      title (value) {
        this.setTitle(value)
      },
      width (value) {
        this.setWidth(value)
      },
      height (value) {
        this.setHeight(value)
      },
      danger (value) {
        this.setDanger(value)
      },
      primaryButton (value) {
        this.setPrimaryButton(value)
      }
    },
    methods: {
      setTitle (value) {
        this.params.title = value
      },
      setWidth (value) {
        this.params.width = value
      },
      setHeight (value) {
        this.params.height = value
      },
      setDanger (value) {
        this.params.danger = value
        this.params.buttons = this.btns
      },
      setPrimaryButton (value) {
        this.params.primaryButton = value
        this.params.buttons = this.btns
      },
      cancelHide () {
        this.hideDelayer?.stop()
        delete this.hideDelayer
      },
      show () {
        this.cancelHide()

        this.rendered = true
        this.popupVisible = true
        this.params.modalVisible = true
        window.__mussel_modal = this

        if (!this.$el) {
          this.$mount()
          document.body.appendChild(this.$el)
        }

        this.$emit('show')
        this.$emit('change', true)

        delay().then(() => {
          this.params.dialogVisible = true
        })
      },
      hide (trigger) {
        if (this.hideDelayer) return

        if (this.popupVisible !== false) {
          this.$emit('hide', trigger)
          this.$emit('change', false, trigger)
        }

        this.popupVisible = false
        this.params.dialogVisible = false
        this.deactivate()

        this.hideDelayer = delay(200)
        this
          .hideDelayer
          .then(() => {
            this.params.modalVisible = false
            delete this.hideDelayer
          })
          .catch(Function.prototype)
      },
      tryHide (trigger) {
        if (this.modelControl === 'external') {
          this.$emit('change', false, trigger)
        } else if (this.$options.beforeClose?.() !== false) {
          this.hide(trigger)
        }
      },
      onButtonTap (btn) {
        const { action, _rawData } = Object(btn)
        const button = _rawData || btn
        this.$emit('buttonTap', button, this)

        if (['hide', 'close'].indexOf(action) !== -1) {
          this.tryHide(button)
        }
      }
    }
  }
</script>
