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
      :visible="params.dialogVisible">
      <h-box
        class="mu-dialog-header"
        align-items="center">
        <mu-flex-item class="mu-dialog-title mu-text-ellipsis" size="auto">
          {{ params.title }}
        </mu-flex-item>
        <slot name="header" />
        <icon
          class="mu-dialog_close-btn"
          icon="x"
          @tap="onCloseButtonTap" />
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

  import Icon from '../icon/icon.vue'
  import HBox from '../layout/flex-h-box'
  import VBox from '../layout/flex-v-box'
  import Button from '../button/button.jsx'
  import FlexItem from '../layout/flex-item.vue'

  export default {
    name: 'MusselDialogWrapper',
    components: {
      Icon,
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
        let {
          translateX: tx,
          translateY: ty,
          transitionDuration
        } = this
        ty = dialogVisible ? ty : ty + 200
        return {
          width,
          height,
          transitionDuration,
          transform: `translate3d(${tx}px, ${ty}px, 0)`
        }
      }
    },
    methods: {
      onMaskClick (event) {
        this.dialog.onMaskClick(event)
      },
      onCloseButtonTap () {
        this.dialog.tryHide('$closeButton')
      },
      onButtonTap (btn) {
        this.dialog.onButtonTap(btn)
      }
    }
  }
</script>
