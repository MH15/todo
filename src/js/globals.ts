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

export const LOCALSTORAGE_TEMPLATE_LARGE: State = {
    user: "mh15",
    list: [
        {
            content: "ya",
            category: "CSE",
            date: "2020-02-27",
            done: false
        },
        {
            content: "a",
            category: "CSE",
            date: "2020-02-28",
            done: false
        },
        {
            content: "b",
            category: "CSE",
            date: "2020-03-01",
            done: false
        },
        {
            content: "c",
            category: "CSE",
            date: "2020-03-02",
            done: false
        },
        {
            content: "d",
            category: "CSE",
            date: "2020-03-03",
            done: false
        },
        {
            content: "e",
            category: "CSE",
            date: "2020-03-04",
            done: false
        },
        {
            content: "f",
            category: "CSE",
            date: "2020-03-05",
            done: false
        },
        {
            content: "g",
            category: "CSE",
            date: "2020-03-06",
            done: false
        },
        {
            content: "h",
            category: "CSE",
            date: "2020-03-07",
            done: false
        },
        {
            content: "i",
            category: "default",
            date: "2020-03-08",
            done: false
        },
        {
            content: "j",
            category: "CSE",
            date: "2020-03-09",
            done: false
        }
    ], categories: ["default", "CSE"]
}