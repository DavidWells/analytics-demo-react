
const visualize = store => next => action => {
  if (action.type) {
    const node = document.getElementById('log')
    if (node) {
      node.innerHTML = node.innerHTML + '\n' + `<li>${action.type} - <span class='tiny'>${JSON.stringify(action)}</span></li>`
    }
  }

  let result = next(action)

  return result
}

export default visualize