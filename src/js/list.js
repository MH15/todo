
import { stringToHTML } from "./helpers"

// Insert note into sorted list and return position
export function insertInList(list, note) {
    list.push(note)
    let i = list.length - 1
    while (i > 0 && note.date < list[i - 1].date) {
        list[i] = list[i - 1]
        i -= 1
    }
    list[i] = note
    return i
}

export function deleteFromList(list, note) {
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

export function newNote(noteString, categoryString, dateString) {
    let dateObj = new Date(dateString)
    let noteObj = {
        content: noteString,
        category: categoryString,
        date: dateString
    }
    // TODO: insertion date?
    return noteObj
}


export function newNoteDOM(noteObj, deleteCallback, checkCallback) {
    let docString = `
        <div class="note">
            <div class="date">${noteObj.date}</div>
            <div class="category">${noteObj.category}</div>
            <div class="content">${noteObj.content}</div>
            <button class="delete">Delete</button>
        </div>
    `
    let node = stringToHTML(docString)

    node.querySelector(".delete").addEventListener('click', () => {
        deleteCallback(noteObj)
    })


    return node
}