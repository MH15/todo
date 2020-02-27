import { Note } from "./globals"
import { stringToHTML, dateMMDD } from "./helpers"

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


export function newNoteDOM(noteObj: Note, deleteCallback, checkCallback, editCallback) {


    let docString = `
        <div class="note">
            <input type="checkbox" class="done">
            <div class="date">${dateMMDD(noteObj.date)}</div>
            <div class="category">${noteObj.category}</div>
            <div class="content">${noteObj.content}</div>
            <button class="delete">Delete</button>
            <button class="edit">Edit</button>
        </div>
    `
    let node = stringToHTML(docString)

    let check = <HTMLInputElement>node.querySelector(".done")
    if (noteObj.done) {
        check.checked = true
    }

    node.querySelector(".delete").addEventListener('click', () => {
        deleteCallback(noteObj)
    })

    check.addEventListener('change', (e) => {
        let status = check.value
        console.log(status)
        checkCallback(noteObj)
    })

    node.querySelector(".edit").addEventListener('click', () => {
        editCallback(noteObj)
    })


    return node
}