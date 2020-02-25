

export function getElements(map) {
    Object.keys(map).forEach((item) => {
        let domNode = document.querySelector(map[item])
        map[item] = domNode
    })
}


