import { getElements, getLocalStorageItem, localStorageExists, setLocalStorageItem } from './helpers'
import { LOCALSTORAGE_NAME, LOCALSTORAGE_TEMPLATE, State } from './globals'



export function initializeState(): State {
    let state
    if (!localStorageExists(LOCALSTORAGE_NAME)) {
        console.log("First session. Copy LOCALSTORAGE_TEMPLATE to store.")
        state = setLocalStorageItem(LOCALSTORAGE_NAME, LOCALSTORAGE_TEMPLATE)
    } else {
        state = getLocalStorageItem(LOCALSTORAGE_NAME)
    }
    return state
}

