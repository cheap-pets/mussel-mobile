<template>
  <mu-editor-wrapper />
</template>

<script>
  import BaseEditor from './base-editor'

  export default {
    name: 'MusselEditor',
    extends: BaseEditor,
    props: {
      iconTapable: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
