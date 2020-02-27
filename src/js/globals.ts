import { State } from "./state"

export const LOCALSTORAGE_NAME = "todo-list"

export interface Note {
    content: string,
    category: string,
    date: string,
    done: boolean
}





export const LOCALSTORAGE_TEMPLATE: State = {
    user: "mh15",
    list: [

    ],
    categories: [
        "default",
        "CSE"
    ]
}