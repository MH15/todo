import { StateType } from "./state"
const spinners = require("cli-spinners")


/**
 * Confirm a user's action using the native dialogs.
 * @param text 
 */
export function confirm(text) {
    return window.confirm(text)
};

/**
 * Get object from Local Storage.
 * @param {string} item 
 */
export function getLocalStorageItem(item) {
    return JSON.parse(window.localStorage.getItem(item))
}

/**
 * Set item from Local Storage to JSON value.
 * @param {string} item
 */
export function setLocalStorageItem(item, value) {
    return window.localStorage.setItem(`${item}`, JSON.stringify(value))
};

/**
 * Set item from Local Storage to JSON value.
 * @param {string} item
 */
export function localStorageExists(item) {
    return !(window.localStorage.getItem(item) === null)
};

/**
 * Get current date in YYYY-MM-DD format.
 */
export function getDate() {
    let date = new Date()
    let year = date.getFullYear()
    let month = (date.getMonth() + 1).toString().padStart(2, '0')
    let day = (date.getDate()).toString().padStart(2, '0')
    let dateString = `${year}-${month}-${day}`

    return dateString
}

/**
 * Get date in MM-DD format given a YYYY-MM-DD date string.
 * @param dateString 
 */
export function dateMMDD(dateString) {
    let date = new Date(dateString)
    let month = (date.getMonth() + 1).toString()
    let day = (date.getDate() + 1).toString()
    let result = `${month}/${day}`

    return result

}

/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} str The template string
 * @return {Node}       The template HTML
 */
export function stringToHTML(str) {
    var parser = new DOMParser()
    var doc = parser.parseFromString(str, 'text/html')
    // console.log(doc.body.children[0])
    // console.log(typeof doc.body.children[0])
    return doc.body.children[0]
};

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
export function populateCategories(state: StateType, parent: HTMLSelectElement) {
    for (let category of state.categories) {
        let option = document.createElement("option")
        option.value = category
        option.text = category
        parent.appendChild(option)
    }
}

export class Spinner {
    node: HTMLElement
    timer
    constructor(node: HTMLElement) {
        this.node = node
        this.stop()
    }
    start() {
        let i = 0
        this.node.innerHTML = spinners.dots.frames[i]
        return window.setInterval(() => {
            if (i < spinners.dots.frames.length - 1) {

                i++
            } else {
                i = 0
            }
            this.node.innerHTML = spinners.dots.frames[i]
        }, 80)
    }
    stop() {
        window.clearInterval(this.timer)
        this.node.innerHTML = "✓"
    }
}

/**
 * Download a file for the user.
 * @param filename 
 * @param text 
 */
export function download(filename, text) {
    var element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', filename)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
}