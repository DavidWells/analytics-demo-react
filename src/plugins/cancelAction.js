
const cancelAction = store => next => action => {
  let finalAction = action
  if (action.type === 'trackInit') {
    const state = store.getState()
    if (state.user.userId === 'idxyz') {
      // cancel action
      finalAction = {
        ...action,
        ...{ abort: true },
      }
    }
  }
  return next(finalAction)
}

export default cancelAction
