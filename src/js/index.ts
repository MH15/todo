
import { getDate, setLocalStorageItem, dateMMDD, stringToHTML } from './helpers'

import { State, initializeState } from './state'
import { insertInList, newNote, deleteFromList, findInList, Update, setupList } from './list'
import { LOCALSTORAGE_NAME, Note } from './globals'

import "../sass/main.scss"
import { deleteNote, checkNote, insertNote, editCallback } from './transforms'
import { populateCategories, getElements, startSpinner, stopSpinner } from './view'
import { planner } from './planner'





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
    update: "#update",
    spinner: "#spinner",
    planner_tab: "#planner_tab",
    categories_tab: "#categories_tab",
    settings_tab: "#settings_tab",
    menu_planner: "#menu_planner",
    menu_categories: "#menu_categories",
    menu_settings: "#menu_settings"
}

enum Tab {
    Planner = 1,
    Categories,
    Settings
}

// globals
let state: State
let dom
let workingNote: Note
let tab = Tab.Planner


function onLoad() {

    planner()
    categories()
    settings()

    // find all relevant dom elements
    dom = getElements(domLink)
    let timer = startSpinner(dom.spinner)
    stopSpinner(dom.spinner, timer)

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

    dom.menu_planner.addEventListener('click', () => {
        changeTab(Tab.Planner)
    })
    dom.menu_categories.addEventListener('click', () => {
        changeTab(Tab.Categories)
    })
    dom.menu_settings.addEventListener('click', () => {
        changeTab(Tab.Settings)
    })
}


function changeTab(tab: Tab) {
    switch (tab) {
        case Tab.Planner:
            dom.planner_tab.classList.remove("hidden")
            dom.categories_tab.classList.add("hidden")
            dom.settings_tab.classList.add("hidden")
            break
        case Tab.Categories:
            dom.planner_tab.classList.add("hidden")
            dom.categories_tab.classList.remove("hidden")
            dom.settings_tab.classList.add("hidden")
            break
        case Tab.Settings:
            dom.planner_tab.classList.add("hidden")
            dom.categories_tab.classList.add("hidden")
            dom.settings_tab.classList.remove("hidden")

    }
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
        workingNote = noteObj
        editCallback(state, dom, noteObj)
    })

    node.querySelector(".date_text").addEventListener('click', () => {
        workingNote = noteObj
        editCallback(state, dom, noteObj)
    })

    node.querySelector(".category_text").addEventListener('click', () => {
        workingNote = noteObj
        editCallback(state, dom, noteObj)
    })


    return node
}




