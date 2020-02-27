import { Note } from "./globals"
import { stringToHTML, dateMMDD } from "./helpers"
import { newNoteDOM } from "./index"

export enum Update {
    Date = 1,
    Category,
    Content
}


export function setupList(state, dom) {
    state.list.forEach(note => {
        let node = newNoteDOM(note)
        dom.list.appendChild(node)
    })
}

// Insert note into sorted list and return position
export function insertInList(list: Array<Note>, note: Note) {
    list.push(note)
    let i = list.length - 1
    while (i > 0 && note.date < list[i - 1].date) {
        list[i] = list[i - 1]
        i -= 1
    }
    list[i] = note
    return i
}

export function findInList(list: Array<Note>, note: Note) {
    let i = 0
    while (i < list.length) {
        if (list[i].date === note.date) {
            if (list[i].content === note.content) {
                if (list[i].category === note.category) {
                    break
                }
            }
        }
        i++
    }
    return i
}

export function deleteFromList(list: Array<Note>, note: Note) {
    console.log(note)
    let i = 0
    while (i < list.length) {
        if (list[i].date === note.date) {
            if (list[i].content === note.content) {
                if (list[i].category === note.category) {
                    console.log("found and deleted")
                    list.splice(i, 1)
                    break
                }
            }
        }
        i++
    }
    return i
}



export function newNote(noteString, categoryString, dateString): Note {
    let dateObj = new Date(dateString)
    let noteObj = {
        content: noteString,
        category: categoryString,
        date: dateString,
        done: false
    }
    // TODO: insertion date?
    return noteObj
}


