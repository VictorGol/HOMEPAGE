const matchObj = {
    '_bg': setBg,
    '_bgl': setLocalBg,
    '_eng': setEngine,
    '_pos': setPosition,
    '_trp': setBgTrp
}

/**
 * 输入文本带有_时，判断要设置的选项，跳转到对应方法
 */
function setting(text) {
    if (/^_.+ +.+/.test(box.value)) {
        text = text.replace(/ +/g, ' ')
        let arr = text.split(' ')
        matchObj[arr[0]](arr[1])
    } else {
        matchObj[text]()
    }
}

/**
 * 初始化设置
 */
function initSetting() {
    let str = localStorage.getItem('customSetting')
    let obj = str ? JSON.parse(str) : {}
    const body = document.getElementsByTagName('body')[0]
    if (!obj.bg || (obj.bg.slice(0, 4) !== 'http' && obj.bg.slice(0, 22) !== 'data:image/jpeg;base64')) {
        body.style.background = `url('image/bg.jpg') 50% 50%/cover`
    } else {
        body.style.background = `url(${obj.bg}) 50% 50%/cover`
    }
    engine = obj.engine ? path[obj.engine] ? obj.engine : 'baidu' : 'baidu'
    if (obj.position == '2') {
        layoutChange()
    }
    const num = parseFloat(obj.trp)
    if (num.toString() === 'NaN' || num > 1 || num < 0) {
        wrap.style.backgroundColor = 'rgba(0,0,0,0)'
    } else {
        wrap.style.backgroundColor = `rgba(0,0,0,${num})`
    }
}

/**
 * 设置背景图，格式_bg 图片链接
 * 只有_bg代表设置默认图片
 */
function setBg(param) {
    let str = localStorage.getItem('customSetting')
    let obj = str ? JSON.parse(str) : {}
    const body = document.getElementsByTagName('body')[0]
    if (!param || (param.slice(0, 4) !== 'http' && param.slice(0, 22) !== 'data:image/jpeg;base64')) {
        body.style.background = `url('image/bg.jpg') 50% 50%/cover`
        obj.bg = ''
    } else {
        body.style.background = `url(${param}) 50% 50%/cover`
        obj.bg = param
    }
    localStorage.setItem('customSetting', JSON.stringify(obj))
    showTip('背景设置成功')
}

/**
 * 设置背景——选用本地图片，格式_bgl
 * l时local的意思
 */
function setLocalBg() {
    const bgls = document.getElementsByClassName('bgl')
    if (bgls.length) {
        wrap.removeChild(bgls[0])
        return
    }
    let el = document.createElement('div');
    el.classList.add('bgl')
    el.innerHTML = `<input type="file" name="img" id="file" onchange="fileImport()"></input>`
    wrap.appendChild(el)
}

/**
 * 设置背景透明度，格式_trp xx
 * 取值0-1，不写默认为0
 */
function setBgTrp(param) {
    let str = localStorage.getItem('customSetting')
    let obj = str ? JSON.parse(str) : {}
    const num = parseFloat(param)
    if (num.toString() === 'NaN' || num > 1 || num < 0) {
        wrap.style.backgroundColor = 'rgba(0,0,0,0)'
        obj.trp = ''
    } else {
        wrap.style.backgroundColor = `rgba(0,0,0,${param})`
        obj.trp = param
    }
    localStorage.setItem('customSetting', JSON.stringify(obj))
    showTip('背景透明度设置成功')
}

/**
 * 设置搜索引擎，格式_eng xxx
 * 设置的参数需要与已设置的对应，不然会设置失败
 */
function setEngine(param) {
    let str = localStorage.getItem('customSetting')
    let obj = str ? JSON.parse(str) : {}
    if (param) {
        if (path[param]) {
            engine = param
            obj.engine = param
            localStorage.setItem('customSetting', JSON.stringify(obj))
            showTip(`搜索引擎已设置为${param ? param : 'baidu'}`)
        } else {
            showTip(`暂不支持此引擎，如需设置，请自行修改代码`)
        }
    } else {
        engine = 'baidu'
        obj.engine = 'baidu'
        localStorage.setItem('customSetting', JSON.stringify(obj))
        showTip(`搜索引擎已设置为baidu`)
    }
}

/**
 * 设置input框的位置，格式_pos xx
 * 取值1或2
 */
function setPosition(param) {
    let str = localStorage.getItem('customSetting')
    let obj = str ? JSON.parse(str) : {}
    if (!param) {
        obj.position = '1'
        localStorage.setItem('customSetting', JSON.stringify(obj))
        return
    }
    if (obj.position == param) {
        showTip('默认输入位置设置成功')
        return
    }
    if (param != '1' && param != '2') {
        showTip('设置无效，请正确输入1或2')
        return
    }
    obj.position = param
    localStorage.setItem('customSetting', JSON.stringify(obj))
    layoutChange()
    showTip('默认输入位置设置成功')
}

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
    // 回车时判断当前是否采取建议搜索
    const el1 = tip.getElementsByClassName('tip-border')
    const el2 = tip.getElementsByClassName('tip-text-hover')
    const divs = tip.getElementsByTagName('div');
    if (el1.length) {
        box.value = divs[el1[0].style.top.match(/(.+)px/)[1] / 24].innerHTML
        window.open(`${path[engine]}${box.value}`)
        baiduSuggestion(box.value)
        return
    }
    if (el2.length) {
        box.value = el2[0].innerHTML
        window.open(`${path[engine]}${box.value}`)
        baiduSuggestion(box.value)
        return
    }
    // 判断内容是否类似_xx ...
    if (/^_.+.*/.test(box.value)) {
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
    let targetLink = ''
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
            span.classList.remove('tip-border')
        } else {
            span.style.top = (index - 1) * 24 + 'px';
            divs[index - 1].classList.add('tip-text-hover')
        }
    }
}