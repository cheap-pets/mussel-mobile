<template>
  <div
    class="mu-list-item"
    :disabled="disabled"
    :active="actualActive"
    :selected="actualSelected"
    :icon-indent="actualIconIndent"
    @tap="onTap">
    <mu-icon
      v-if="actualIcon || actualIconClass || actualIconIndent"
      :icon="actualIcon"
      :icon-class="actualIconClass"
      @tap="onIconTap" />
    <slot>{{ actualLabel }}</slot>
  </div>
</template>

<script>
  import './list.pcss'

  import Icon from '../icon/icon.vue'

  import { unsetOrFalse } from '@/utils/prop'

  export default {
    name: 'MusselListItem',
    components: {
      'mu-icon': Icon
    },
    props: {
      value: null,
      icon: String,
      iconClass: String,
      iconIndent: null,
      label: String,
      selected: null,
      active: Boolean,
      disabled: Boolean,
      triggerIcon: String
    },
    computed: {
      actualLabel () {
        return this.label
      },
      actualIcon () {
        return this.icon
      },
      actualIconClass () {
        return this.iconClass
      },
      actualIconIndent () {
        return !unsetOrFalse(this.iconIndent)
      },
      actualActive () {
        return this.active
      },
      actualSelected () {
        return !unsetOrFalse(this.selected)
      },
      actualTriggerIcon () {
        return this.triggerIcon
      }
    },
    methods: {
      onTap () {
        if (!this.disabled) {
          this.$emit('tap', event)
          this.$emit('click')
        }
      },
      onIconTap (event) {
        if (!this.disabled) {
          this.$emit('icontap', event)
          this.$emit('iconclick', event)
        }
      }
    }
  }
</script>
