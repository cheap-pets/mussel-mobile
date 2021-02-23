<template>
  <div
    class="mu-dropdown"
    :expanded="popupParams.visible"
    @tap="onTap">
    <slot />
    <mu-dropdown-panel
      v-show="!disabled"
      v-bind="popupParams"
      @change="setPopupVisible"
      @tap.native.stop>
      <slot name="dropdown" />
    </mu-dropdown-panel>
  </div>
</template>

<script>
  import './dropdown.pcss'

  import PopupGroupMixin from '@/mixins/mix-popup-group'
  import DropdownPanel from './dropdown-panel.vue'

  export default {
    name: 'MusselDropdown',
    components: {
      'mu-dropdown-panel': DropdownPanel
    },
    mixins: [PopupGroupMixin],
    provide () {
      return {
        dropdown: this
      }
    },
    props: {
      disabled: Boolean,
      popupStyle: {
        type: String,
        default: 'dropdown'
      }
    },
    mounted () {
      this.triggerElements = Array.from(
        this.$el.querySelectorAll('[dropdown-trigger]')
      )
    },
    methods: {
      findTrigger (target) {
        return this.triggerElements.reduce(
          (result, el) => result || el === target || el.contains(target),
          false
        )
      },
      onTap (event) {
        if (this.disabled) return
        if ((!this.triggerElements.length || this.findTrigger(event.target))) {
          this.togglePopup()
        }
      },
      onItemClick (item) {
        this.hidePopup()
        this.$emit('itemclick', item)
      }
    }
  }
</script>
