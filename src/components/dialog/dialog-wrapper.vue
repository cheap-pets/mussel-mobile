<template>
  <v-box
    class="mu-modal-mask"
    flex-center
    :visible="params.modalVisible"
    @tap.native="onMaskClick">
    <v-box
      v-if="params.keepAlive || params.modalVisible"
      v-show="!params.keepAlive || params.modalVisible"
      class="mu-dialog"
      :style="style"
      :danger="params.danger"
      :visible="params.dialogVisible"
      @tap.native.stop>
      <h-box
        class="mu-dialog-header"
        align-items="center">
        <div
          v-if="params.title"
          class="mu-dialog-title mu-text-ellipsis"
          size="auto">
          {{ params.title }}
        </div>
        <slot name="header" />
      </h-box>
      <flex-item
        class="mu-dialog-body"
        :size="params.height ? 'auto' : undefined">
        <slot />
      </flex-item>
      <h-box
        v-if="params.footer"
        class="mu-dialog-footer"
        align-items="center">
        <slot name="footer" />
        <div style="margin-right: auto" />
        <mu-button
          v-for="btn in params.buttons"
          :key="btn.caption || btn.icon || btn.iconClass"
          v-bind="btn"
          @tap="onButtonTap(btn)" />
      </h-box>
    </v-box>
  </v-box>
</template>

<script>
  import './dialog.pcss'

  import HBox from '../layout/flex-h-box'
  import VBox from '../layout/flex-v-box'
  import Button from '../button/button.jsx'
  import FlexItem from '../layout/flex-item.vue'

  export default {
    name: 'MusselDialogWrapper',
    components: {
      HBox,
      VBox,
      FlexItem,
      'mu-button': Button
    },
    inject: ['dialog', 'params'],
    data () {
      return {
        translateX: 0,
        translateY: 0,
        transitionDuration: '.2s'
      }
    },
    computed: {
      style () {
        const { dialogVisible, width, height } = this.params

        return {
          width,
          height,
          transform: `translateY(${dialogVisible ? 0 : -100}px)`
        }
      }
    },
    methods: {
      onMaskClick (event) {
        this.dialog.onMaskClick(event)
      },
      onButtonTap (btn) {
        this.dialog.onButtonTap(btn)
      }
    }
  }
</script>
