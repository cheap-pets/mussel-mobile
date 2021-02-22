<template>
  <div
    class="mu-dropdown"
    :expanded="popupParams.visible"
    @tap="onTap"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave">
    <div
      v-if="splitButton"
      class="mu-button-group"
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
      @mouseover.native.stop="clearHoverTimer"
      @mouseleave.native.stop="onMouseLeave"
      @tap.native.stop="onDropdownClick">
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
    }
  }
</script>
