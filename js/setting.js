// 设置选项对应的方法
const matchObj = {
    '_bg': setBg,
    '_eng': setEngine,
    '_pos': setPosition,
}

// 输入文本带有_时，判断要设置的选项，跳转到对应方法
function setting(text) {
    if (/^_.+ +.+/.test(box.value)) {
        text = text.replace(/ +/g,' ')
        let arr = text.split(' ')
        matchObj[arr[0]](arr[1])
    } else {
        matchObj[text]()
    }
}

// 初始化设置
function initSetting() {
    let str = localStorage.getItem('customSetting')
    let obj = str ? JSON.parse(str) : {}
    wrap.style.background = obj.bg ? `url(${obj.bg}) 50% 50%/cover` : `url('image/bg.jpg') 50% 50%/cover`
    engine = obj.engine ? obj.engine : 'baidu'
    obj.position == '2' ? layoutChange() : 1 + 1
}

// 设置背景图
function setBg(param) {
    let str = localStorage.getItem('customSetting')
    let obj = str ? JSON.parse(str) : {}
    if (!param) {
        wrap.style.background = `url('image/bg.jpg') 50% 50%/cover`
        obj.bg = ''
    } else {
        wrap.style.background = `url(${param}) 50% 50%/cover`
        obj.bg = param
    }
    localStorage.setItem('customSetting', JSON.stringify(obj))
    showTip('背景设置成功')
}

// 设置搜索引擎
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

// 设置input框的位置
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

// 显示提示信息
function showTip(param) {
    if (box.value) {
        box.value = param
        const timeout = setTimeout(() => {
            box.value = ''
            clearTimeout(timeout)
        }, 1200);
    }
}

// 切换鼠标光标的显示和隐藏
function changeCursorShow() {
    if (box.style.caretColor == 'transparent') {
        box.style.caretColor = 'auto'
    } else {
        box.style.caretColor = 'transparent';
    }
}

// 切换input框的布局
function layoutChange() {
    box.classList.toggle('box-center')
    wrap1.classList.toggle('wrap11')
}