import { State } from "./state"
import { getDate } from "./helpers"
import { newNote } from "./list"
import { insertNote, deleteNote } from "./transforms"

// setup and handle input in the application







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