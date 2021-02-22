<template>
  <transition-group name="mu-notifier" tag="div" class="mu-notifier">
    <div
      v-for="item in items"
      :key="item.id"
      :notify-type="item.notifyType"
      :link-style="item.onTapHandler ? '' : false"
      class="mu-text-ellipsis"
      @tap="onItemClick(item)">
      {{ item.message }}
    </div>
  </transition-group>
</template>

<script>
  import isString from 'lodash.isstring'
  import isFunction from 'lodash.isfunction'

  export default {
    name: 'MusselNotifier',
    data () {
      return {
        counter: 0,
        items: []
      }
    },
    methods: {
      notify (notifyType, message, timeout = 3000, onTapHandler) {
        if (isString(notifyType) && !isString(message)) {
          onTapHandler = isFunction(timeout) ? timeout : null
          timeout = isNaN(message) ? 3000 : message
          message = notifyType
          notifyType = null
        }
        const id = ++this.counter
        this.items.unshift({
          id,
          message,
          notifyType,
          onTapHandler
        })
        setTimeout(() => { this.dismiss(id) }, timeout)
      },
      dismiss (id) {
        const idx = this.items.findIndex(el => el.id === id)
        if (idx !== -1) this.items.splice(idx, 1)
      },
      onItemClick (item) {
        item.onTapHandler?.(item)
      }
    }
  }
</script>
