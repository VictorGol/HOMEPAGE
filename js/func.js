/**
 * 显示提示信息
 * 参数就是提示的信息
 */
 function showTip(param) {
    box.value = param
    const timeout = setTimeout(() => {
        box.value = ''
        clearTimeout(timeout)
    }, 1200);
}

/**
 * 切换鼠标光标的显示和隐藏
 * 原理是使光标变透明
 */
function changeCursorShow() {
    if (box.style.caretColor == 'transparent') {
        box.style.caretColor = 'auto'
    } else {
        box.style.caretColor = 'transparent';
    }
}

/**
 * 切换input框的布局
 */
function layoutChange() {
    box.classList.toggle('box-center')
    wrap1.classList.toggle('wrap11')
    wrap2.classList.toggle('wrap22')
    tip.classList.toggle('tip-change')
}

/**
 * 显示搜索建议
 */
function showSuggestions(arr) {
    if (tip.innerHTML == ' ') {
        tip.innerHTML = ''
        return
    }
    const tips = arr.join('</div><div>')
    tip.innerHTML = '<span></span><div>' + tips + '</div>'
    const el = tip.getElementsByTagName('div');
    const span = tip.getElementsByTagName('span')[0];
    for (let i = 0, len = el.length; i < len; i++) {
        el[i].classList.add('tip-text')
        el[i].addEventListener('click', (e) => {
            box.value = e.target.innerHTML
            jump()
            baiduSuggestion(e.target.innerHTML)
        })
        el[i].onmouseover = () => {
            selectStatus = false
            if (!span.classList.length) {
                span.classList.add('tip-border')
                span.style.width = tip.clientWidth + 'px'
            }
            const a = tip.getElementsByClassName('tip-text-hover')
            for (let i = 0, len = a.length; i < len; i++) {
                a[i].classList.remove('tip-text-hover')
            }
            span.style.top = 24 * i + 'px';
        }
    }
    tip.onmouseleave = () => {
        selectStatus = false
        span.classList.length && span.classList.remove('tip-border')
    }
}

/**
 * 图片转base64
 */
function fileImport() {
    let file = document.getElementById('file').files[0];
    // 图片大小限制2M
    if (file.size > 2097152) {
        showTip('请上传2M以内的图片')
        return
    }
    const blob = new Blob([file], { type: file.type || 'application/*' })
    // const blobUrl = window.URL.createObjectURL(blob)
    let reader = new FileReader()
    reader.onload = () => {
        setBg(reader.result)
        let bgl = document.getElementsByClassName('bgl')[0];
        wrap.removeChild(bgl)
    }
    reader.readAsDataURL(blob)
}

/**
 * 跳转页面
*/
function jump() {
    let targetLink = ''
    // 回车时判断当前是否采取建议搜索
    if (selectStatus) {
        const el2 = tip.getElementsByClassName('tip-text-hover')
        if(!el2.length)return
        box.value = el2[0].innerHTML
        targetLink = command[box.value] ? command[box.value] : `${path[engine]}${box.value}`
        window.open(targetLink)
        baiduSuggestion(box.value)
        return
    }
    // 判断内容是否类似_xx ...
    if (/^ *_.*/.test(box.value)) {
        setting(box.value)
        return
    }
    // 判断内容是否是合格网页链接
    if (box.value.slice(0, 4) === 'http') {
        const reg = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/
        if (reg.test(box.value)) {
            window.open(box.value)
            return
        }
    }
    // 正常跳转
    targetLink = ''
    targetLink = command[box.value] ? command[box.value] : `${path[engine]}${box.value}`
    window.open(targetLink);
}

/**
 * 按下上、下键时切换建议
 */
function switchSuggestion(flag) {
    const divs = tip.getElementsByTagName('div')
    if (!divs.length || !divs[0].innerHTML) return
    const span = tip.getElementsByTagName('span')[0]
    const len = divs.length;
    if (flag) {
        selectStatus = true
        if (!span.classList.length) {
            span.classList.add('tip-border');
            span.style.width = tip.clientWidth + 'px';
            span.style.top = '0px';
            divs[0].classList.add('tip-text-hover');
            return
        }
        const index = parseInt(span.style.top.match(/(.+)px/)[1]) / 24
        if (index !== (len - 1)) {
            span.style.top = (index + 1) * 24 + 'px';
            divs[index].classList.remove('tip-text-hover');
            divs[index + 1].classList.add('tip-text-hover');
        }
    } else {
        const index = parseInt(span.style.top.match(/(.+)px/)[1]) / 24
        divs[index].classList.remove('tip-text-hover')
        if (index == 0) {
            selectStatus = false
            span.classList.remove('tip-border')
        } else {
            selectStatus = true
            span.style.top = (index - 1) * 24 + 'px';
            divs[index - 1].classList.add('tip-text-hover')
        }
    }
}

function closePopup() {
    popup1.classList.toggle('popup1-change');
    const t = setTimeout(() => {
        popup.classList.toggle('popup-change')
        clearTimeout(t)
    }, 500);
    box.focus()
}