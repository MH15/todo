import { State } from "./state"
const spinners = require("cli-spinners")
// setup and handle input in the application



export function startSpinner(node) {
    console.log(spinners.dots)
    let i = 0
    node.innerHTML = spinners.dots.frames[i]
    return window.setInterval(() => {
        if (i < spinners.dots.frames.length - 1) {

            i++
        } else {
            i = 0
        }
        node.innerHTML = spinners.dots.frames[i]
    }, 80)
}

export function stopSpinner(node, timer) {
    window.clearInterval(timer)
    node.innerHTML = "✓"
}


/**
 * Get Dom elements from an identifier-string key-value pair.
 * @param {Object} map 
 */
export function getElements(map) {
    let link = {}
    Object.keys(map).forEach((item) => {
        let domNode = <HTMLElement>document.querySelector(map[item])
        link[item] = domNode
    })
    return link
}

/**
 * Populate category selector from state.
 * @param state 
 * @param parent 
 */
export function populateCategories(state: State, parent: HTMLSelectElement) {
    for (let category of state.categories) {
        let option = document.createElement("option")
        option.value = category
        option.text = category
        parent.appendChild(option)
    }
}