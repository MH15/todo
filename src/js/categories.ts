import { getElements } from "./helpers"
import { state } from "./state"

let domLink = {
    category_setup: "#category_setup",
    save_categories: "#save_categories"
}
let dom

export function categories() {
    dom = getElements(domLink)

    let cat_string = state.categories.join(", ")
    dom.category_setup.value = cat_string

    dom.save_categories.addEventListener('click', () => {
        let newCategories = dom.category_setup.value.replace(/\s/g, '').split(',')
        state.categories = newCategories
        console.log(state)
    })
}