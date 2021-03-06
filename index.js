const refs = {
    input: document.querySelector('#myInput'),
    addBtn: document.querySelector('.addBtn'),
    myList: document.querySelector('#myUL')
}

refs.addBtn.addEventListener('click', addString)
refs.myList.addEventListener('click', classСheck)

function addString(e) {

    if (!refs.input.value) return
    addLocalStorage(refs.input.value)
   addItem()
    refs.input.value = ''
}

function addLocalStorage(value) {
    const object = {
        text: value,
        result: false,
    }
    let str = localStorage.getItem('data')
    const array = str ? JSON.parse(str) : []
    array.push(object)
    const data = localStorage.setItem('data', JSON.stringify(array))
}

function getDataLocStr() {
    const item = localStorage.getItem('data')
    return JSON.parse(item)
}

function addItem() {
    const array = getDataLocStr()
    const markup = array.map(({ text, result }, index) => {
        const classEl = result ? 'checked' : ''
        return `
        <li class ="${classEl}" data-index="${index}">${text}
        <button type="button" class="btn-remove">Remove</button></li>
        `
    }).join('')

    refs.myList.innerHTML = markup

}

function classСheck({ target }) {
    let array = getDataLocStr()
    let idx
    if (target.classList.contains('btn-remove')) {
        idx = Number(target.parentElement.getAttribute('data-index'))
        array.splice(idx, 1)
    } else if (target.tagName === 'LI') {
        idx = Number(target.getAttribute('data-index'))
        array[idx].result = !array[idx].result
    }
    localStorage.setItem('data', JSON.stringify(array))

    addItem()
}
addItem()
