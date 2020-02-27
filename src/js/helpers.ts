



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

