
initSetting()

wrap.addEventListener('click', () => {
    box.focus();
})

wrap.onkeydown = (e) => {
    // console.log('e',e);
    if (e.code === 'ControlRight') {
        layoutChange()
    }
    if (!box.value) return
    if (e.keyCode == 13) {
        jump(box.value)
    }
    if (e.key == "ArrowUp") {
        box.blur()
        box.focus()
        switchSuggestion(0)
    }
    if (e.key == "ArrowDown") {
        switchSuggestion(1)
    }
}

box.oninput = () => {
    if (!box.value) {
        tip.innerHTML = ''
        return
    }
    if (/.*\.\.$/.test(box.value)) {
        box.value = ''
    }
    searchCommand(box.value)
}

const wrap3 = document.getElementsByClassName('wrap3')[0]
wrap3.addEventListener('click', () => {
    window.open('https://t.bilibili.com/');
})

const wrap4 = document.getElementsByClassName('wrap4')[0]
const up = wrap4.getElementsByClassName('up')[0]
const down = wrap4.getElementsByClassName('down')[0]
const left = wrap4.getElementsByClassName('left')[0]
const right = wrap4.getElementsByClassName('right')[0]
up.addEventListener('click', () => {
    setBgOffset(0, 1)
})
down.addEventListener('click', () => {
    setBgOffset(0, -1)
})
left.addEventListener('click', () => {
    setBgOffset(1, 0)
})
right.addEventListener('click', () => {
    setBgOffset(-1, 0)
})
