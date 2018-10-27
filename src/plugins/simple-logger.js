const logger = store => next => action => {
  if (action.type) {
    console.log(`>> dispatching ${action.type}`, JSON.stringify(action))
  }
  //console.log(chalk.blue(JSON.stringify(action, null, 3)))
  let result = next(action)
  //console.log(chalk.yellow(`next state`))
  //console.log(chalk.yellow(JSON.stringify(store.getState(), null, 3)))
  return result
}

export default logger