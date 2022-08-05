const matchObj = {
    '_bg': setBg,
    '_engine': setEngine,
}

function setting(text) {
    if (/^_.+ .+/.test(box.value)) {
        let arr = text.split(' ')
        matchObj[arr[0]](arr[1])
    } else {
        matchObj[text]()
    }
}

function initSetting() {
    let str = localStorage.getItem('customSetting')
    let obj = str ? JSON.parse(str) : {}
    wrap.style.background = obj.bg ? `url(${obj.bg}) 50% 50%/cover` : setBg()
    engine = obj.engine ? obj.engine : 'baidu'
}

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
function changeCursorShow(){
    if(box.style.caretColor == 'transparent'){
        box.style.caretColor = 'auto'
    }else{
        box.style.caretColor = 'transparent';
    }
}

// 切换input框的布局
function layoutChange(){
    box.classList.toggle('box-center')
    wrap1.classList.toggle('wrap11')
}