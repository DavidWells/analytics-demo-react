
let renderQueue = []
export default function visualizer (config = {}) {
	return store => next => action => {
	  if (action.type) {

	    const node = document.getElementById(config.nodeId)
	    if (!node) {
	    	renderQueue.push(action)
	    	return next(action)
	    }

	    // Render queued items
    	if (renderQueue && renderQueue.length) {
    		renderQueue.forEach((a) => {
    			node.innerHTML = render(a, node)
    		})
    		// resete queue
    		renderQueue = []
    	}

	    // Render action
	    node.innerHTML = render(action, node)
	  }

	  return next(action)
	}
}

function render(action, node) {
	return `${node.innerHTML}
<li>
	${action.type} - <span class='tiny'>${JSON.stringify(action)}</span>
</li>`
}