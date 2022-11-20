// 当前提示框的信息
let moveH = {
    top: -1,
    h: 0
}

/**
 * 设置映射
 */
const settingMapping = {
    bg: bgSet,
    bgl: bglSet,
    trp: trpSet,
    pre: preBgSet
}

function getLocalStorage() {
    return JSON.parse(localStorage.getItem('homepage'))
}

function setLocalStorage(val) {
    localStorage.setItem('homepage', val)
}

/**
 * 通用设置
 */
function set(fn, val) {
    const storage = getLocalStorage()
    fn(storage, val)
    setLocalStorage(JSON.stringify(storage))
}

/**
 * 背景图设置
 */
function bgSet(storage, val) {
    const imgUrl = val ? val : 'img/bg.jpg'
    bodyStyle.backgroundImage = `url(${imgUrl})`;
    storage.preImg = storage.bgUrl
    storage.bgUrl = imgUrl
}

/**
 * 设置本地图片为背景
 */
function bglSet() {
    tip.innerHTML = `<input type="file" name="img" id="file"\
     accept="image/jpeg,image/jpg,image/png"></input>`
    document.getElementById('file').onchange = fileImport
}

/**
 * 设置上一张背景图
 */
function preBgSet(storage) {
    bgSet(storage, storage.preImg)
}

/**
 * 背景透明度设置
 */
function trpSet(storage, val) {
    const trp = val ? val : '0'
    wrapStyle.backgroundColor = `rgba(0,0,0,${trp})`;
    storage.bgTransparency = trp
}

/**
 * 图片位置设置
 */
function bgMove(storage, val) {
    let arr = val.split(' ')
    const x = parseInt(arr[0])
    const y = parseInt(arr[1])
    let sx = storage.bgPosX + x
    let sy = storage.bgPosY + y
    sx = sx < 0 ? 0 : sx
    sy = sy < 0 ? 0 : sy
    sx = sx > 100 ? 100 : sx
    sy = sy > 100 ? 100 : sy
    bodyStyle.backgroundPosition = `${sx}% ${sy}%`;
    storage.bgPosX = sx
    storage.bgPosY = sy
}

/**
 * 回车键按下
 */
function pressEnter(val, bool = true) {
    if (bool) set(savePreWords, val)
    // 输入值格式化为数组
    let str = val.trim()
    let arr = [str]
    if (/.+\s+.+/.test(str)) {
        str = str.replace(/\s+/g, ' ')
        const ind = str.indexOf(' ')
        arr[0] = str.slice(0, ind)
        arr[1] = str.slice(ind + 1)
    }
    // 如果是设置命令
    const fn = settingMapping[arr[0]]
    if (fn) {
        set(fn, arr[1])
        return
    }
    // 如果是搜索命令，分有搜索值和无搜索值的情况
    // 有搜索值，直接跳转；无搜索值，作为普通映射跳转
    const engLink = searchMapping[arr[0]]
    if (engLink && arr[1]) {
        window.open(engLink + arr[1])
        return
    }
    // 如果是映射命令
    if (commands[arr[0]]) {
        window.open(commands[arr[0]])
        return
    }
    // 直接搜索
    window.open(searchMapping.bing + val)
}

/**
 * 搜索
 */
function search(val) {
    pressEnter(val, false)
}

/**
 * 匹配映射命令
 */
function pattern(val) {
    tip.innerHTML = ''
    if (!val) return
    if (val.slice(val.length - 2) === '..') {
        input.value = ''
        tip.innerHTML = ''
        return
    }
    if (val === 'past') {
        getPreWords()
        return
    }
    const keys = Object.keys(commands)
    if (val === '*') {
        addTips(keys)
        return
    }
    let tipArr = []
    for (let item of keys) {
        if (item.indexOf(val) !== -1) {
            tipArr.push(item)
        }
    }
    addTips(tipArr)
}

/**
 * 填充提示
 */
function addTips(arr) {
    tip.innerHTML = ''
    const bacs = document.getElementsByClassName("bac")
    let bac;
    if (!bacs.length) {
        bac = addTipBac()
    } else {
        bac = bacs[0]
    }
    for (let i = 0; i < arr.length; i++) {
        const div = document.createElement('div')
        div.classList.add('tip-child')
        div.addEventListener('click', () => {
            search(arr[i])
        })
        div.innerHTML = arr[i]
        tip.appendChild(div)
        const h = div.clientHeight
        const top = div.clientHeight * i
        moveH.h = h
        const color = colors[i % 6]
        div.onmouseover = () => {
            bac.style.display = 'block'
            bac.style.height = h + 'px'
            bac.style.top = top + 'px'
            bac.style.backgroundColor = color
            moveH.top = top
        }
        div.onmouseleave = () => {
            bac.style.display = 'none'
            moveH.top = -1
        }
    }
}

/**
 * 获取旧值
 */
function getPreWords() {
    const storage = getLocalStorage()
    const arr = storage.preWords.split(',')
    addTips(arr)
}

/**
 * 保存旧值
 */
function savePreWords(storage, val) {
    if (!val) return
    const arr = storage.preWords.split(',')
    if (arr.length === 100) {
        arr.pop()
    }
    arr.unshift(val)
    storage.preWords = arr.join(',')
}

/**
 * 添加提示背景
 */
function addTipBac() {
    const bac = document.createElement('div')
    bac.style.display = 'none'
    bac.style.position = 'absolute'
    bac.style.transition = 'top .2s'
    bac.style.width = '100%'
    bac.style.borderRadius = '.5em'
    bac.style.zIndex = '-1'
    bac.classList.add('bac')
    tip.appendChild(bac)
    return bac
}

/** 
 * 图片转base64
 */
function fileImport() {
    let file = document.getElementById('file').files[0];
    const blob = new Blob([file], { type: file.type || 'application/*' })
    // const blobUrl = window.URL.createObjectURL(blob)
    let reader = new FileReader()
    reader.onload = () => {
        file.size > 2097152 ? compression(reader.result) : set(bgSet, reader.result);
    }
    reader.readAsDataURL(blob)
}

/** 
 * 压缩图片 
 */
function compression(img) {
    l(999)
    let image = new Image();
    image.setAttribute("crossOrigin", 'anonymous');
    image.src = img;
    let myCanvas = document.createElement("canvas");
    let ctx = myCanvas.getContext('2d');
    image.onload = () => {
        myCanvas.width = image.width;
        myCanvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        const url = myCanvas.toDataURL('image/jpeg', 0.7);
        set(bgSet, url);
    }
}
