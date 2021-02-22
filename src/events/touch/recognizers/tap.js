import emit from '../../emit'

export const tap = {
  recognize (ctx, gs, event) {
    const { distance, timespan } = this.options
    const touch = gs.changedTouches[0]
    const { totalX, totalY, totalTime, state } = touch

    if (
      (timespan > 0 && totalTime > timespan) ||
      Math.abs(totalX) > distance ||
      Math.abs(totalY) > distance
    ) {
      return false
    } else if (state === 'end') {
      emit(ctx.el, 'tap', { gestureState: touch })
      return true
    }
  },
  options: {
    timespan: 0,
    distance: 10
  },
  eventTypes: ['tap']
}
