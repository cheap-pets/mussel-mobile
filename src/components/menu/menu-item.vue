<template>
  <a
    class="mu-menu-item"
    :disabled="disabled"
    :active="selected"
    @tap="onTap">
    <slot>
      <mu-icon
        :icon="icon"
        :icon-class="iconClass" />
      {{ title }}
    </slot>
  </a>
</template>

<script>
  import './menu.pcss'

  export default {
    name: 'MusselMenuItem',
    inject: {
      menu: {
        default: null
      },
      menuGroup: {
        default: null
      }
    },
    model: {
      prop: 'active',
      event: 'change'
    },
    props: {
      icon: String,
      iconClass: String,
      title: String,
      active: Boolean,
      disabled: Boolean,
      data: null
    },
    data () {
      return {
        selected: false
      }
    },
    watch: {
      active: {
        handler (v) {
          if (!v === !this.selected) return
          return v ? this.select() : this.unselect()
        },
        immediate: true
      }
    },
    mounted () {
      if (this.active) {
        const group = this.menuGroup
        if (group?.isExpander) group.expand()
        else if (group?.menuGroup?.isExpander) group.menuGroup.expand()
      }
    },
    methods: {
      onTap (event) {
        if (!this.disabled) {
          this.$emit('tap', event)
          this.$emit('click', event)
          this.select()
        }
      },
      select () {
        this.selected = true
        this.menu?.setActiveItem(this)
        if (!this.active) this.$emit('change', true)
      },
      unselect () {
        this.selected = false
        if (this.active) this.$emit('change', false)
      }
    }
  }
</script>
