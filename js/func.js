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
    const tip = document.getElementsByClassName('tip')[0];
    tip.innerHTML = ''
    const tips = arr.join('</div><div>')
    tip.innerHTML = '<span></span><div>' + tips + '</div>';
    const el = tip.getElementsByTagName('div');
    const span = tip.getElementsByTagName('span')[0];
    for (let i = 0, len = el.length; i < len; i++) {
        el[i].classList.add('tip-text')
        el[i].addEventListener('click', (e) => {
            jump(e.target.innerHTML)
        })
        el[i].onmouseover = () => {
            selectStatus = false
            if (!span.classList.length) {
                span.classList.add('tip-border')
                span.style.width = tip.clientWidth - 20 + 'px'
            }
            // 鼠标滑过时，取消由上下键带来的样式
            const a = tip.getElementsByClassName('tip-text-hover')
            for (let i = 0, len = a.length; i < len; i++) {
                a[i].classList.remove('tip-text-hover')
            }

            span.style.top = 24 * i + 'px';
        }
    }
    // 鼠标离开提示框时去除它的子元素外壳
    tip.onmouseleave = () => {
        selectStatus = false
        span.classList.length && span.classList.remove('tip-border')
    }
    if (body.clientHeight * 0.9 >= arr.length * 24) { }
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
function jump(val) {
    let targetLink = ''
    // 判断内容是否是合格网页链接
    if (val.slice(0, 4) === 'http') {
        const reg = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/
        if (reg.test(val)) {
            to(val)
            return
        }
    }
    // 回车时判断当前是否采取建议搜索
    if (selectStatus) {
        const el2 = tip.getElementsByClassName('tip-text-hover')
        if (!el2.length) return
        val = el2[0].innerHTML;
        targetLink = command[val] ? command[val] : `${path[engine]}${val}`
        to(targetLink)
        return
    }
    // 以#开头的
    if (/^#.*/.test(val)) {
        setting(val)
        return
    }
    // 正常跳转
    targetLink = command[val] ? command[val] : `${path[engine]}${val}`
    to(targetLink)
}

/**
 * 跳转到指定链接
 */
function to(targetLink) {
    selectStatus = false;
    window.open(targetLink);
}

/**
 * 按下上、下键时切换建议
 */
function switchSuggestion(flag) {
    const divs = tip.getElementsByTagName('div')
    if (!divs.length) return
    const span = tip.getElementsByTagName('span')[0]
    const len = divs.length;
    // 如果是下按钮
    if (flag) {
        selectStatus = true
        if (!span.classList.length) {
            span.classList.add('tip-border');
            span.style.width = tip.clientWidth - 20 + 'px';
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

/**
 * 搜索指令
 */
function searchCommand(val) {
    if (!val) return
    if (val === '*') {
        showSuggestions(commandKeys);
        return
    }
    let arr = [];
    val.slice(0, 1) === '*' ? val = val.slice(1) : 1 + 1;
    for (let i = 0, len = commandKeys.length; i < len; i++) {
        if (commandKeys[i].indexOf(val) !== -1) {
            arr.push(commandKeys[i])
        }
    }
    if (arr.length) {
        showSuggestions(arr)
    } else {
        tip.innerHTML = ''
    }
}
