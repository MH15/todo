
import { getElements } from './helpers'

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

    initializeState(state)


    // dom.

}

