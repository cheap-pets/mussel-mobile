<template>
  <div
    class="mu-form-field mu-flex-box"
    :expanded="popupParams.visible"
    @tap="onTap">
    <label
      v-if="label"
      class="mu-text-ellipsis"
      :style="labelStyle">
      {{ label }}
    </label>
    <slot>
      <div class="mu-form-field_value" dropdown-trigger>
        {{ value }}
      </div>
      <mu-icon
        class="mu-form_icon"
        dropdown-trigger
        :icon="icon" />
    </slot>
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
  import FormField from './form-field.vue'
  import Dropdown from '../dropdown/dropdown.vue'

  export default {
    name: 'MusselFormDropdownField',
    extends: Dropdown,
    mixins: [FormField],
    props: {
      icon: {
        type: String,
        default: 'key-right'
      },
      popupStyle: {
        type: String,
        default: 'drawer'
      }
    },
    methods: {
      onTap (event) {
        if (this.disabled) return

        const target = event.gestureState.target
        if ((!this.triggerElements.length || this.findTrigger(target))) {
          this.togglePopup()
        }
      }
    }
  }
</script>
