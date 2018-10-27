const logdown = require('debug')

const reduxLogdown = (name, opts = {}) => {
  const logger = logdown(name)
  const prevLogger = logdown('prev state', { prefixColor: '#999999' })
  const actionLogger = logdown('action', { prefixColor: '#FFCC66' })
  const nextLogger = logdown('next state', { prefixColor: '#6699CC' })
  prevLogger.state = actionLogger.state = nextLogger.state = logger.state
  let prevState
  let recursionLevel = -1
  let accumulator = []

  return store => next => action => {
    ++recursionLevel
    accumulator[recursionLevel] = []

    prevState = store.getState()

    if (opts.diff && typeof logger.groupCollapsed === 'function') {
      accumulator[recursionLevel].push(() => logger.groupCollapsed('*action* `' + action.type + '`'))
    } else {
      accumulator[recursionLevel].push(() => logger('action `' + action.type + '`'))
    }

    if (opts.diff && typeof logger.groupCollapsed === 'function') {
      accumulator[recursionLevel].push(() => prevLogger(prevState))
      accumulator[recursionLevel].push(() => actionLogger(action))
    }

    let result = next(action)

    if (opts.diff && typeof logger.groupCollapsed === 'function') {
      accumulator[recursionLevel].push(() => nextLogger(store.getState()))
      accumulator[recursionLevel].push(() => logger.groupEnd('*action* `' + action.type + '`'))
    }

    if (recursionLevel === 0) {
      for (let i = 0; i < accumulator.length; ++i) {
        accumulator[i].forEach(thunk => thunk())
      }
      accumulator = []
    }

    --recursionLevel

    return result
  }
}

module.exports = reduxLogdown
