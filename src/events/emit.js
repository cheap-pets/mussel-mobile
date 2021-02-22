export default function emitEvent (el, eventName, options = {}) {
  const { canBubble = false, cancelable = true } = options
  delete options.canBubble
  delete options.cancelable

  const event = document.createEvent('CustomEvent')
  Object.assign(event, options)
  event.initCustomEvent(eventName, canBubble, cancelable, null)

  return el.dispatchEvent(event)
}
