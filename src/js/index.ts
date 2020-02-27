
import { getElements, getDate, setLocalStorageItem } from './helpers'

import { initializeState } from './state'
import { insertInList, newNote, newNoteDOM, deleteFromList, findInList } from './list'
import { LOCALSTORAGE_NAME, Note, State } from './globals'

import "../sass/main.scss"


window.addEventListener("load", onLoad)

// define DOM stuff
let domLink = {
    list: "#list",
    name_input: "#name_input",
    category_input: "#category_input",
    date_input: "#date_input",
    save: "#save"
}


let state: State
// link the state with the DOM for performant sorting
let dom



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
        let node = newNoteDOM(note, deleteNote, checkNote, editCallback)
        dom.list.appendChild(node)
    })
}


function setupInput() {

    dom.name_input.value = ""
    dom.category_input.value = ""

    for (let category of state.categories) {
        let option = document.createElement("option")
        option.value = category
        option.text = category
        dom.category_input.appendChild(option)
    }



    dom.date_input.value = getDate()

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

}


function updateView(noteObj, pos) {
    let node = newNoteDOM(noteObj, deleteNote, checkNote, editCallback)
    dom.list.insertBefore(node, dom.list.children[pos])
    console.log("rendering")
}


function deleteNote(noteObj: Note) {
    let pos = deleteFromList(state.list, noteObj)
    dom.list.removeChild(dom.list.children[pos])
}

function checkNote(noteObj: Note) {
    let pos = findInList(state.list, noteObj)
    noteObj.done = !noteObj.done

    state.list[pos] = noteObj
}

function editCallback(noteObj: Note) {
    console.log("edit", noteObj)
}