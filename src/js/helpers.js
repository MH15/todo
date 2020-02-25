

/**
 * Get Dom elements from an identifier-string key-value pair.
 * @param {Object} map 
 */
export function getElements(map) {
    Object.keys(map).forEach((item) => {
        let domNode = document.querySelector(map[item])
        map[item] = domNode
    })
}

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
    return window.localStorage.setItem(`${item}`, JSON.stringify(value));
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
    let date = new Date();
    let year = date.getFullYear()
    let month = (date.getMonth() + 1).toString().padStart(2, '0')
    let day = (date.getDate()).toString().padStart(2, '0')
    let dateString = `${year}-${month}-${day}`

    return dateString
}


