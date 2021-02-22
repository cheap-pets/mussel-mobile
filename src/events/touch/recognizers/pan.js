import emit from '../../emit'
import { GESTURE_DIRECTION } from '../constant'

function check (touch, direction, options) {
  const { totalX, totalY, target } = touch
  const { distance } = options

  const x = Math.abs(totalX)
  const y = Math.abs(totalY)

  return (
    (direction === GESTURE_DIRECTION.HORIZONTAL && y > distance) ||
    (direction === GESTURE_DIRECTION.VERTICAL && x > distance) ||
    (
      String(target.tagName).toLowerCase() === 'textarea' &&
      target.scrollHeight > target.clientHeight
    )
  )
    ? false
    : ((x > distance || y > distance) || undefined)
}

const pan = {
  recognize (ctx, gs, event, direction) {
    const eventName = 'pan' + (direction || '')
    const { activeGesture } = gs
    const touch = gs.changedTouches[0]
    if (!activeGesture) {
      const result = check(touch, direction, this.options)
      if (result) emit(ctx.el, eventName + 'start', { gestureState: touch })
      return result
    } else if (touch.state === 'end') {
      emit(ctx.el, eventName + 'end', { gestureState: touch })
      return false
    } else {
      emit(ctx.el, eventName + 'move', { gestureState: touch })
    }
  },
  options: {
    distance: 10
  },
  eventTypes: ['panstart', 'panmove', 'panend']
}

const panx = {
  recognize (ctx, status, event) {
    return pan.recognize(ctx, status, event, GESTURE_DIRECTION.HORIZONTAL)
  },
  eventTypes: ['panxstart', 'panxmove', 'panxend']
}

const pany = {
  recognize (ctx, status, event) {
    return pan.recognize(ctx, status, event, GESTURE_DIRECTION.VERTICAL)
  },
  eventTypes: ['panystart', 'panymove', 'panyend']
}

export { pan, panx, pany }
