

export default function visualizer (config = {}) {
	return store => next => action => {
	  if (action.type) {
	    const node = document.getElementById(config.nodeId)
	    if (node) {
	      node.innerHTML = `${node.innerHTML}
<li>
	${action.type} - <span class='tiny'>${JSON.stringify(action)}</span>
</li>`
	    }
	  }

	  let result = next(action)

	  return result
	}
}