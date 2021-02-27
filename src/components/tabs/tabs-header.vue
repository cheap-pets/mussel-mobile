<template>
  <div class="mu-tabs-header" :tab-position="tabPosition">
    <slot name="header-prefix" />
    <h-box class="mu-tabs-header_wrapper" size="1">
      <div
        v-for="item in items"
        :key="item.name"
        class="mu-tab-item"
        :disabled="item.disabled"
        :title="item.label || item.name"
        :active="activeName === item.name"
        @tap="onTabClick(item)">
        <span class="mu-tab-label mu-text-ellipsis">
          <mu-icon
            v-if="item.icon || item.iconClass"
            :icon="item.icon"
            :icon-class="item.iconClass" />
          {{ item.label || item.name }}
        </span>
      </div>
    </h-box>
    <slot name="header-suffix" />
  </div>
</template>

<script>
  import isString from 'lodash.isstring'
  import HBox from '../layout/flex-h-box'

  export default {
    name: 'MusselTabsHeader',
    components: {
      HBox
    },
    inject: {
      tabs: {
        default: null
      }
    },
    model: {
      prop: 'activeTab',
      event: 'change'
    },
    props: {
      tabItems: Array,
      tabPosition: {
        type: String,
        default: 'top',
        validator (v) {
          return ['top', 'bottom', 'left', 'right'].indexOf(v) !== -1
        }
      },
      modelControl: {
        type: String,
        default: 'both',
        validator (v) {
          return ['both', 'external'].indexOf(v) !== -1
        }
      },
      activeTab: String
    },
    data () {
      return {
        activeName: ''
      }
    },
    computed: {
      items () {
        return this.tabItems
          ? this.tabItems.map(item => isString(item) ? { name: item } : item)
          : []
      }
    },
    watch: {
      activeTab: {
        handler (value) {
          this.activeName = value
        },
        immediate: true
      }
    },
    methods: {
      onTabClick (item) {
        if (item.disabled) return
        if (this.tabs) {
          this.tabs.select(item.name)
        } else {
          if (this.modelControl !== 'external') {
            this.activeName = item.name
          }
          this.$emit('change', item.name)
        }
      }
    }
  }
</script>
