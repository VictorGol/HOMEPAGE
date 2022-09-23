
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
    box.value = box.value ? '' : '你很棒'
})