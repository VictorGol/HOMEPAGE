/**
 * 初始化
 */
const init = () => {
    initBackground()
    initArrow()
    initCommand()
    initOthers()
}

/**
 * 初始化背景
 */
const initBackground = () => {
    const str = localStorage.getItem('homepage')
    const storage = str ? JSON.parse(str) : {
        bgUrl: '',
        bgRrepeat: 'no-repeat',
        bgPosX: 0,
        bgPosY: 0,
        bgSize: 'cover',
        bgTransparency: '0',
        preImg: '',
        preWords: ''
    }
    const { bgUrl, bgRrepeat, bgPosX, bgPosY, bgSize, bgTransparency } = storage
    bodyStyle.backgroundImage = `url(${bgUrl ? bgUrl : 'img/bg.jpg'})`;
    bodyStyle.backgroundRepeat = bgRrepeat;
    bodyStyle.backgroundPosition = `${bgPosX}% ${bgPosY}%`;
    bodyStyle.backgroundSize = bgSize;
    bodyStyle.transition = 'all 0.1s linear';
    wrapStyle.backgroundColor = `rgba(0,0,0,${bgTransparency})`;
    if (!str) {
        setLocalStorage(JSON.stringify(storage))
    }
}

/**
 * 初始化箭头
 */
const initArrow = () => {
    const arrows = document.getElementsByClassName("arrow");
    const moveArr = ['0 -1', '0 1', '-1 0', '1 0']
    for (let i = 0; i < 4; i++) {
        arrows[i].addEventListener('click', () => {
            set(bgMove, moveArr[i])
        })
        let timeout, interval;
        arrows[i].addEventListener('mousedown', () => {
            timeout = setTimeout(() => {
                interval = setInterval(() => {
                    set(bgMove, moveArr[i])
                }, 100)
            }, 200);
        }, false);
        arrows[i].addEventListener('mouseup', () => {
            clearTimeout(timeout);
            clearInterval(interval)
        }, false);
    }
}

/**
 * 初始化回车
 */
const initCommand = () => {
    wrap.onkeydown = (e) => {
        const val = input.value
        if (!val) return
        if (e.keyCode == 13) {
            pressEnter(val)
        }
    }
}

/**
 * 其他初始化
 */
const initOthers = () => {
    wrap.addEventListener('click', () => {
        input.focus();
    })
    input.oninput = () => {
        pattern(input.value)
    }
}
