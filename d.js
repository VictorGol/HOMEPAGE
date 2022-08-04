let wrap = document.getElementById('app')
let box = document.getElementsByClassName('box')[0]

let flag = false

wrap.addEventListener('click', () => {
    if (flag) {
        box.blur()
    } else {
        box.focus()
    }
    flag = !flag
})

wrap.onkeydown = (e) => {
    // console.log('e',e);
    if (e.keyCode == 13) {
        let targetLink = ''
        targetLink = command[box.value] ? command[box.value] : `https://www.baidu.com/s?wd=${box.value}`
        window.open(targetLink);
    }
}

box.oninput = () => {
    let text = box.value
    if (text.match(/.*cl$/)) {
        box.value = ''
    }
}