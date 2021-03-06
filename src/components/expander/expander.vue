<template>
  <div
    class="mu-expander"
    :expanded="actualExpanded"
    @tap="onTap">
    <slot name="header">
      <div class="mu-expander_header" expand-trigger>
        {{ title }}
        <mu-icon icon="dropdown" :expanded="actualExpanded" />
      </div>
    </slot>
    <div
      v-show="!disabled"
      class="mu-expander_body"
      :style="{ height: wrapperHeight }">
      <div ref="wrapper" @tap.stop>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
  import './expander.pcss'

  export default {
    name: 'MusselExpander',
    model: {
      prop: 'expanded',
      event: 'change'
    },
    props: {
      disabled: Boolean,
      expanded: Boolean,
      title: String
    },
    data () {
      return {
        actualExpanded: false,
        wrapperHeight: this.expanded ? undefined : 0
      }
    },
    watch: {
      expanded: {
        handler (value) {
          if (this.actualExpanded === !value) this.toggleExpand()
        },
        immediate: false
      }
    },
    mounted () {
      this.actualExpanded = this.expanded
      this.triggerElements = Array.from(
        this.$el.querySelectorAll('[expand-trigger]')
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
        if (
          !this.triggerElements.length ||
          this.findTrigger(event.gestureState.target)
        ) {
          this.toggleExpand()
        }
      },
      toggleExpand () {
        this.actualExpanded = !this.actualExpanded

        const wrapperEl = this.$refs.wrapper

        this.wrapperHeight = (this.actualExpanded && wrapperEl)
          ? `${wrapperEl.offsetHeight}px`
          : 0

        this.$emit('change', this.actualExpanded)
      }
    }
  }
</script>
