
import { getElements, getDate, setLocalStorageItem, dateMMDD, stringToHTML } from './helpers'

import { initializeState } from './state'
import { insertInList, newNote, deleteFromList, findInList, Update } from './list'
import { LOCALSTORAGE_NAME, Note, State } from './globals'

import "../sass/main.scss"


window.addEventListener("load", onLoad)

// define DOM stuff
let domLink = {
    list: "#list",
    name_input: "#name_input",
    category_input: "#category_input",
    date_input: "#date_input",
    content_update: "#content_update",
    category_update: "#category_update",
    date_update: "#date_update",
    save: "#save",
    update: "#update"
}


let state: State
// link the state with the DOM for performant sorting
let dom

let updateMode = false

let workingNote: Note



function onLoad() {
    dom = getElements(domLink)
    console.log(dom)

    state = initializeState()

    console.log(state)


    setupInput()
    setupList()

    dom.save.addEventListener('click', () => {
        setLocalStorageItem(LOCALSTORAGE_NAME, state)
    })

}

function setupList() {
    state.list.forEach(note => {
        let node = newNoteDOM(note)
        dom.list.appendChild(node)
    })
}

function populateCategories(parent: HTMLSelectElement) {
    for (let category of state.categories) {
        let option = document.createElement("option")
        option.value = category
        option.text = category
        parent.appendChild(option)
    }
}


function setupInput() {


    dom.name_input.value = ""
    dom.category_input.value = ""


    populateCategories(dom.category_input)



    dom.date_input.value = getDate()


    // new nodes
    dom.date_input.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            if (dom.name_input.value != "" && dom.category_input.value != "" && dom.date_input.value != "") {
                let note = dom.name_input.value
                let category = dom.category_input.value
                let date = dom.date_input.value

                let noteObj = newNote(note, category, date)
                let pos = insertInList(state.list, noteObj)
                updateView(noteObj, pos)

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

                deleteCallback(workingNote)

                let updatedNote = newNote(note, category, date)
                updatedNote.done = workingNote.done

                let pos = insertInList(state.list, updatedNote)
                updateView(updatedNote, pos)


                console.log(workingNote)

                dom.update.classList.toggle("hidden")
                workingNote = updatedNote // or null
            }
        }
    })


}


function updateView(noteObj, pos) {
    let node = newNoteDOM(noteObj)
    dom.list.insertBefore(node, dom.list.children[pos])
    console.log("rendering")
}


function deleteCallback(noteObj: Note) {
    let pos = deleteFromList(state.list, noteObj)
    console.log(pos)
    dom.list.removeChild(dom.list.children[pos])
}





function newNoteDOM(noteObj: Note) {


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

    node.querySelector(".content_text").addEventListener('click', () => {
        editCallback(noteObj, Update.Content)
    })

    node.querySelector(".date_text").addEventListener('click', () => {
        editCallback(noteObj, Update.Date)
    })

    node.querySelector(".category_text").addEventListener('click', () => {
        editCallback(noteObj, Update.Category)
    })


    return node
}

function editCallback(note: Note, mode: Update) {
    // console.log("edit", noteObj)
    let pos = findInList(state.list, note)
    let node = <HTMLElement>dom.list.children[pos]

    dom.update.classList.toggle("hidden")

    populateCategories(dom.category_update)

    dom.date_update.value = note.date
    dom.category_update.value = note.category
    dom.content_update.value = note.content

    workingNote = note

}

function checkCallback(noteObj: Note) {
    let pos = findInList(state.list, noteObj)
    noteObj.done = !noteObj.done

    state.list[pos] = noteObj
}
