<template>
  <div
    class="mu-dropdown mu-flex-box"
    inline
    :expanded="popupParams.visible"
    @tap="onTap">
    <div
      v-if="splitButton"
      class="mu-button-group"
      size="auto"
      :button-shape="buttonShape">
      <mu-button
        v-bind="buttonParams"
        @tap="onButtonTap">
        <slot />
      </mu-button>
      <mu-icon-button
        dropdown-trigger
        v-bind="splitParams"
        @tap="onSplitButtonTap" />
    </div>
    <mu-button
      v-else
      v-bind="buttonParams"
      :button-shape="buttonShape"
      size="auto"
      @tap="onButtonTap">
      <slot>
        <span>{{ caption }}</span>
        <mu-icon icon="dropdown" />
      </slot>
    </mu-button>
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
  import Button from './button.jsx'
  import Icon from '../icon/icon.vue'
  import SplitButton from './split-button.vue'
  import Dropdown from '../dropdown/dropdown.vue'

  export default {
    name: 'MusselDropdownButton',
    components: {
      'mu-button': Button,
      'mu-icon': Icon
    },
    extends: Dropdown,
    mixins: [SplitButton],
    props: {
      splitButton: Boolean
    },
    methods: {
      onButtonTap (event) {
        if (!this.splitButton) this.onTap(event)
        this.$emit('tap', event)
      }
    }
  }
</script>
