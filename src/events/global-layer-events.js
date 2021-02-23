function callbackIf (name, handler) {
  const popup = window['__mussel_' + name]
  if (popup) handler(popup)
  return popup
}

function hideIf (name, force) {
  return name === 'dropdown'
    ? callbackIf('dropdown', dropdown => dropdown.hide())
    : (
        name === 'modal'
          ? callbackIf(
            'modal',
            modal => {
              const action = modal.$options.maskAction || modal.maskAction
              if (action === 'close') modal.hide()
            }
          )
          : undefined
      )
}

function setPositionIf () {
  callbackIf('dropdown', dropdown => dropdown.setPosition())
}

// window.addEventListener('blur', () => hideIf('dropdown'))

window.addEventListener(
  'keyup',
  event => event.keyCode === 27 && (
    hideIf('dropdown') ||
    hideIf('modal')
  )
)

window.addEventListener(
  'touchstart',
  event => (
    callbackIf('dropdown', dropdown => dropdown.hideIf(event.target)) ||
    callbackIf('drawer', drawer => drawer.hideIf(event.target))
  ),
  true
)

window.addEventListener('popstate', () => {
  hideIf('dropdown')
  hideIf('modal', true)
})

window.addEventListener('resize', setPositionIf)
window.addEventListener('scroll', () => { hideIf('dropdown') })

export {
  hideIf
}
