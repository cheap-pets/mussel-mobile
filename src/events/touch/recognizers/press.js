import emit from '../../emit'

function check (el, gs, options) {
  const touch = gs.changedTouches?.[0]
  if (gs.activeElement || !touch) return

  const { distance, timespan } = options
  const { totalX, totalY, startTime, state } = touch
  const totalTime = +new Date() - startTime

  if (
    (state === 'end' && totalTime < timespan) ||
    Math.abs(totalX) > distance ||
    Math.abs(totalY) > distance
  ) {
    return false
  } else if (totalTime >= timespan) {
    emit(el, 'press', { gestureState: touch })
    return true
  }
}

export const press = {
  recognize (ctx, gs) {
    const recognized = check(ctx.el, gs, this.options)

    if (recognized === undefined) {
      setTimeout(() => {
        const result = check(ctx.el, gs, this.options)

        if (result) {
          gs.activeElement = ctx.el
          gs.activeGesture = 'press'
        } else if (result === false && ctx.validRecognizers) {
          delete ctx.validRecognizers.press
        }
      }, this.options.timer)
    }
    return recognized
  },
  options: {
    timespan: 1000,
    distance: 10,
    timer: 1000
  },
  eventTypes: ['press']
}
