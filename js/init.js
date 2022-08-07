
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

const close = popup.getElementsByClassName('close')[0];
close.addEventListener('click', () => {
    closePopup()
})

const save = popup.getElementsByClassName('save')[0];
save.addEventListener('click', () => {
    pTip.innerHTML = '保存成功';
    const color = pTip.style.color
    const len = tipColor.length;
    if (!color) {
        pTip.style.color = tipColor[0];
        return
    }
    const index = tipColor.indexOf(color);
    if (index !== -1) {
        if (index == len - 1) {
            pTip.style.color = tipColor[0];
        } else {
            pTip.style.color = tipColor[index + 1];
        }
    }
})

const pbtn = document.getElementById('pbtn');
const pinput1 = document.getElementById('pinput1');
pbtn.addEventListener('click', () => {
    const type = pinput1.type;
    type == 'text' ? pinput1.type='file' : pinput1.type='text';
})

// 写个节流或防抖