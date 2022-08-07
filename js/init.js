
initSetting()

wrap.addEventListener('click', () => {
    box.focus();
    box.style.caretColor = 'auto'
})

wrap.onkeydown = (e) => {
    // console.log('e',e);
    if (e.code === 'ControlLeft') {
        changeCursorShow()
    }
    if (e.code === 'ControlRight') {
        layoutChange()
    }
    if (!box.value) return
    if (e.keyCode == 13) {
        jump()
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
    if (box.value.match(/.*cl$/)) {
        box.value = ''
        tip.innerHTML = ' '
    }
    box.value && !/^ *_.*/.test(box.value) && baiduSuggestion(box.value)
}
