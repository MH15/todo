
import { getElements, getDate } from './helpers'

import { state, initializeState, checkState } from './state'
import { list } from './list'


window.addEventListener("load", onLoad);

// define DOM stuff
let dom = {
    list: "#list",
    name_input: "#name_input",
    category_input: "#category_input",
    date_input: "#date_input",
}



function onLoad() {
    getElements(dom);
    console.log(dom);

    let state = initializeState()

    console.log(state)

    setupInput(dom)



}


function setupInput(dom) {

    dom.name_input.value = ""
    dom.category_input.value = ""
    dom.date_input.value = getDate()

    dom.date_input.addEventListener('keydown', (e) => {
        console.log(e.keyCode)
        if (e.keyCode === 13) {
            addNewNote(dom.name_input.value, dom.category_input.value,
                dom.date_input.value)
        }
    })

}


function addNewNote(note, category, date) {
    console.log(typeof (date))
    console.log(note, category, date)
}