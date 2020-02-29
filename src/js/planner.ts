import { dateMMDD, getDate, getElements, populateCategories, stringToHTML } from "./helpers"
import { newNote } from "./list"
import { Note, state, saveState } from "./state"
import { checkNote, deleteNote, editCallback, insertNote } from "./transforms"

let domLink = {
    list: "#list",
    name_input: "#name_input",
    category_input: "#category_input",
    date_input: "#date_input",
    content_update: "#content_update",
    category_update: "#category_update",
    date_update: "#date_update",
    update: "#update",
}
let dom


let workingNote: Note

export function planner() {
    dom = getElements(domLink)


    // set up user input
    setupInput()
    // populate current notes
    state.list.forEach(note => {
        let node = newNoteDOM(note)
        dom.list.appendChild(node)
    })


}


function setupInput() {
    dom.name_input.value = ""
    dom.category_input.value = ""
    dom.date_input.value = getDate()

    populateCategories(state, dom.category_input)




    // new nodes
    dom.date_input.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            if (dom.name_input.value != "" && dom.category_input.value != "" && dom.date_input.value != "") {
                let note = dom.name_input.value
                let category = dom.category_input.value
                let date = dom.date_input.value

                let noteObj = newNote(note, category, date)
                insertNote(state.list, dom, noteObj)

            }
        }
    })


    // update nodes
    dom.date_update.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            if (dom.content_update.value != "" && dom.category_update.value != "" && dom.date_update.value != "") {
                let note = dom.content_update.value
                let category = dom.category_update.value
                let date = dom.date_update.value

                // to update a note we delete the old note then insert the new
                // note to make sure total preorder is maintained
                deleteNote(state.list, dom, workingNote)

                let updatedNote = newNote(note, category, date)
                updatedNote.done = workingNote.done

                insertNote(state.list, dom, updatedNote)


                dom.update.classList.toggle("hidden")
                workingNote = updatedNote // or null


                saveState(state)
            }
        }
    })

}


export function newNoteDOM(noteObj: Note) {
    let docString = `
        <div class="note">
            <input type="checkbox" class="done">
            <input class="hidden date_update date" placeholder="date" type="date">
            <div class="date_text date">
                ${dateMMDD(noteObj.date)}
            </div>
            <div class="category category_text">
                ${noteObj.category}
            </div>
            <div class="content content_text">
                ${noteObj.content}    
            </div>
            <input class="hidden content content_update" placeholder="note">
            <button class="delete">Delete</button>
        </div>
    `
    let node = stringToHTML(docString)

    let check = <HTMLInputElement>node.querySelector(".done")
    if (noteObj.done) {
        check.checked = true
    }

    node.querySelector(".delete").addEventListener('click', () => {
        if (confirm("Are you sure you want to delete this item?")) {
            deleteNote(state.list, dom, noteObj)
        }
    })

    check.addEventListener('change', (e) => {
        let status = check.value
        console.log(status)
        checkNote(state.list, noteObj)
    })

    node.querySelector(".content_text").addEventListener('click', () => {
        workingNote = noteObj
        editCallback(state, dom, noteObj)
    })

    node.querySelector(".date_text").addEventListener('click', () => {
        workingNote = noteObj
        editCallback(state, dom, noteObj)
    })

    node.querySelector(".category_text").addEventListener('click', () => {
        workingNote = noteObj
    })
    return node
}

