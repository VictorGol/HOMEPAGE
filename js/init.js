initSetting()

wrap.addEventListener('click',()=>{
    box.focus()
})

wrap.onkeydown = (e) => {
    // console.log('e',e);
    if(e.code === 'ControlLeft'){
        changeCursorShow()
    }
    if(e.code === 'ControlRight'){
        layoutChange()
    }
    if (!box.value) return
    if (e.keyCode == 13) {
        if (/^_.+/.test(box.value)) {
            setting(box.value)
            return
        }
        let targetLink = ''
        targetLink = command[box.value] ? command[box.value] : `${path[engine]}${box.value}`
        window.open(targetLink);
    }
}

box.oninput = () => {
    let text = box.value
    if (text.match(/.*cl$/)) {
        box.value = ''
    }
}
