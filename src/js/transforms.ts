import { Note, saveState, state } from "./state"
import { deleteFromList, findInList, insertInList } from "./list"
import { newNoteDOM } from "./planner"
import { populateCategories } from "./helpers"
import { StateType } from "./state"

// Transformations for the Todo list like delete, edit, insert etc

/**
 * Insert a note in the list and update the DOM accordingly
 * @param list 
 * @param note 
 */
export function insertNote(list: Array<Note>, dom, note: Note) {
    let pos = insertInList(list, note)
    let node = newNoteDOM(note)
    dom.list.insertBefore(node, dom.list.children[pos])
    console.log("rendering")
    saveState(state)
}


/**
 * Delete a note from the list and update the DOM accordingly
 * @param list 
 * @param dom 
 * @param note 
 */
export function deleteNote(list: Array<Note>, dom, note: Note) {
    let pos = deleteFromList(list, note)
    console.log(pos)
    dom.list.removeChild(dom.list.children[pos])
    saveState(state)
}

/**
 * Find a note in the list and update its 'done' status.
 * @param list 
 * @param note 
 */
export function checkNote(list: Array<Note>, note: Note) {
    let pos = findInList(list, note)
    note.done = !note.done

    list[pos] = note
    saveState(state)
}

export function editCallback(state: StateType, dom, note: Note) {
    // console.log("edit", noteObj)
    let pos = findInList(state.list, note)

    dom.update.classList.toggle("hidden")

    populateCategories(state, dom.category_update)

    dom.date_update.value = note.date
    dom.category_update.value = note.category
    dom.content_update.value = note.content

    saveState(state)
}