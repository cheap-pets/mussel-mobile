<template>
  <mu-dialog-wrapper class="mu-message-box">
    <div v-html="$options.message" />
  </mu-dialog-wrapper>
</template>

<script>
  import delay from '@/utils/delay'
  import BaseDialog from '../dialog/base-dialog.vue'

  export default {
    name: 'MusselMessageBox',
    extends: BaseDialog,
    methods: {
      tryHide (trigger) {
        this.hide(trigger)

        delay(500).then(() => {
          this.$el.parentNode?.removeChild(this.$el)
          this.$destroy()
        })
      },
      onButtonTap (button) {
        this.tryHide(button.id || button)
      }
    }
  }
</script>
