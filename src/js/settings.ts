import { state } from "./state"
import { getElements, download } from "./helpers"

let domLink = {
    download_button: "#download_button",
}
let dom

export function settings() {
    dom = getElements(domLink)


    dom.download_button.addEventListener('click', () => {
        download("planner.json", JSON.stringify(state, null, 4))
    })

}