<template>
  <div class="mu-form-field mu-flex-box">
    <label
      v-if="label"
      class="mu-text-ellipsis"
      :style="labelStyle">
      {{ label }}
    </label>
    <slot>
      <div class="mu-form-field_value" @tap="onValueTap">
        {{ value }}
      </div>
      <mu-icon
        v-if="icon"
        class="mu-form_icon"
        :icon="icon"
        @tap="onValueTap" />
    </slot>
  </div>
</template>

<script>
  import Icon from '../icon/icon.vue'
  import FlexItem from '../layout/flex-item.vue'

  export default {
    name: 'MusselFormField',
    components: {
      'mu-icon': Icon
    },
    extends: FlexItem,
    inject: {
      form: {
        default: null
      }
    },
    props: {
      icon: String,
      iconClass: String,
      label: String,
      labelWidth: String,
      labelAlign: {
        type: String,
        validator (value) {
          return ['right', 'left'].indexOf(value) !== -1
        }
      },
      value: null
    },
    computed: {
      labelStyle () {
        const w = this.labelWidth || this.form?.labelWidth
        return {
          width: w,
          minWidth: w,
          textAlign: this.labelAlign || this.form?.labelAlign || 'left'
        }
      }
    },
    methods: {
      onValueTap (event) {
        this.$emit('valuetap', event)
      }
    }
  }
</script>
