
import "../sass/main.scss"
import { categories } from './categories'
import { LOCALSTORAGE_NAME } from './globals'
import { getElements, setLocalStorageItem, Spinner } from './helpers'
import { planner } from './planner'
import { settings } from './settings'
import { Note, state } from './state'



window.addEventListener("load", onLoad)

// define DOM stuff
let domLink = {
    saveState: "#save",
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
let dom
let workingNote: Note
let tab = Tab.Planner


function onLoad() {

    planner()
    categories()
    settings()

    // find all relevant dom elements
    dom = getElements(domLink)
    let spinner = new Spinner(dom.spinner)

    // tabs
    dom.menu_planner.addEventListener('click', () => {
        changeTab(Tab.Planner)
    })
    dom.menu_categories.addEventListener('click', () => {
        changeTab(Tab.Categories)
    })
    dom.menu_settings.addEventListener('click', () => {
        changeTab(Tab.Settings)
    })


    dom.saveState.addEventListener('click', () => {
        console.log(state)
        spinner.start()
        setLocalStorageItem(LOCALSTORAGE_NAME, state)
        spinner.stop()
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
