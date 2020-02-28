import { LOCALSTORAGE_NAME, LOCALSTORAGE_TEMPLATE_LARGE } from './globals'
import { getLocalStorageItem, localStorageExists, setLocalStorageItem } from './helpers'


export interface StateType {
    user: string,
    list: Array<Note>,
    categories: Array<string>
}

/**
 * Ensure categories are unique in a set.
 * @param state 
 */
function initializeCategories(state: StateType) {
    let set = new Set(state.categories)
    state.categories = Array.from(set)
}


export function initializeState(): StateType {
    let state
    if (!localStorageExists(LOCALSTORAGE_NAME)) {
        console.log("First session. Copy LOCALSTORAGE_TEMPLATE to store.")
        state = setLocalStorageItem(LOCALSTORAGE_NAME, LOCALSTORAGE_TEMPLATE_LARGE)
    } else {
        state = getLocalStorageItem(LOCALSTORAGE_NAME)
    }

    initializeCategories(state)

    return state
}

export interface Note {
    content: string,
    category: string,
    date: string,
    done: boolean
}

export let state = initializeState()

