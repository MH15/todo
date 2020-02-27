export const LOCALSTORAGE_NAME = "todo-list"

export interface Note {
    content: string,
    category: string,
    date: string,
    done: boolean
}


export interface State {
    user: string,
    list: Array<Note>,
    categories: Array<string>
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