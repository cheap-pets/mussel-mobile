<template>
  <h-box class="mu-bar mu-paging-bar" align-items="center">
    <mu-icon-button
      icon="key-left"
      :disabled="disabled || !pageIndex"
      @tap="goPrev" />
    <label>{{ currentPageCaption }}</label>
    <mu-icon-button
      icon="key-right"
      :disabled="disabled || eof"
      @tap="goNext" />
    <mu-space />
    <mu-icon-button
      v-if="reload"
      icon="refresh"
      :disabled="disabled"
      @tap="doReload" />
  </h-box>
</template>

<script>
  import './paging-bar.pcss'

  import lang from '@/lang'

  import HBox from '../layout/flex-h-box'
  import Space from '../layout/space.vue'
  import IconButton from '../button/icon-button.jsx'

  export default {
    components: {
      HBox,
      'mu-space': Space,
      'mu-icon-button': IconButton
    },
    props: {
      pageIndex: {
        type: Number,
        default: 0
      },
      eof: Boolean,
      reload: Boolean,
      disabled: Boolean
    },
    computed: {
      currentPageCaption () {
        return lang.Bar.CURRENT_PAGE.replace('%s', this.pageIndex + 1)
      }
    },
    methods: {
      goPrev () {
        this.$emit('prev')
      },
      goNext () {
        this.$emit('next')
      },
      doReload () {
        this.$emit('reload')
      }
    }
  }
</script>
