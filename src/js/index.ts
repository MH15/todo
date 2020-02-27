
import { getDate, setLocalStorageItem, dateMMDD, stringToHTML } from './helpers'

import { State, initializeState } from './state'
import { insertInList, newNote, deleteFromList, findInList, Update, setupList } from './list'
import { LOCALSTORAGE_NAME, Note } from './globals'

import "../sass/main.scss"
import { deleteNote, checkNote, insertNote, editCallback } from './transforms'
import { populateCategories, getElements } from './view'


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

// globals
let state: State
let dom
let workingNote: Note



function onLoad() {
    // find all relevant dom elements
    dom = getElements(domLink)

    // get the state from localstorage or server
    state = initializeState()

    // categories


    // set up input areas
    setupInput()
    // populate current notes
    setupList(state, dom)

    dom.save.addEventListener('click', () => {
        setLocalStorageItem(LOCALSTORAGE_NAME, state)
    })

}

export function setupInput() {
    let dom
    dom = getElements(domLink)

    dom.name_input.value = ""
    dom.category_input.value = ""


    populateCategories(state, dom.category_input)



    dom.date_input.value = getDate()


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


                console.log(workingNote)

                dom.update.classList.toggle("hidden")
                workingNote = updatedNote // or null
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
        deleteNote(state.list, dom, noteObj)
    })

    check.addEventListener('change', (e) => {
        let status = check.value
        console.log(status)
        checkNote(state.list, noteObj)
    })

    node.querySelector(".content_text").addEventListener('click', () => {
        editCallback(state, dom, noteObj)
    })

    node.querySelector(".date_text").addEventListener('click', () => {
        workingNote = noteObj
        editCallback(state, dom, noteObj)
    })

    node.querySelector(".category_text").addEventListener('click', () => {
        editCallback(state, dom, noteObj)
    })


    return node
}




