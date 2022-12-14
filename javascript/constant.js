/** 预知信息 */
const c = (function () {
    const body = document.getElementsByTagName("body")[0];
    const wrap = document.getElementsByClassName("wrap")[0];
    const input = wrap.getElementsByClassName("input")[0];
    const tip = document.getElementsByClassName("tip")[0];
    const bodyStyle = body.style;
    const wrapStyle = wrap.style;

    const searchMapping = {
        'baidu': 'https://www.baidu.com/s?wd=',
        'bing': 'https://www.bing.com/search?q=',
        'bingcn': 'https://cn.bing.com/search?q=',
        'google': 'https://www.google.com/search?q=',
        'fsou': 'https://fsoufsou.com/search?q=',
        'brave': 'https://search.brave.com/search?q=',
        'duckduckgo': 'https://duckduckgo.com/?q=',
        'sougou': 'https://www.sogou.com/web?query=',
        'petal': 'https://petalsearch.com/search?query='
    }

    const commands = {
        'ahhhhfs': "https://www.abskoop.com",
        'apipost': "https://console.apipost.cn/",
        'axios': "https://www.axios-http.cn/docs/intro",
        'baidu': "https://www.baidu.com/",
        'BgSub': "https://bgsub.cn/webapp/",
        'bili': "https://t.bilibili.com/",
        'bilibili': "https://www.bilibili.com/",
        'bing': "https://cn.bing.com/",
        'blog': "https://victorgol.github.io/DDD-BLOG/",
        'brave': 'https://search.brave.com/',
        'cai': "https://www.runoob.com/",
        'can i use': 'https://caniuse.com',
        'csdn': "https://www.csdn.net/",
        'cupfox': "https://cupfox.app",
        'date-fns': "https://date-fns.org",
        'DB-EnginesRanking': "https://db-engines.com/en/ranking",
        'deepl': "https://www.deepl.com/translator",
        'diduan': "https://ddys.tv",
        'docus': 'https://docus.dev',
        'douyu': 'https://www.douyu.com',
        'douyin': "https://www.douyin.com/",
        'duckduckgo': 'https://duckduckgo.com',
        'electron': "https://www.electronjs.org/zh/docs/latest/tutorial/process-model",
        'elementplus': "https://element-plus.gitee.io/",
        'elementui': "https://element.eleme.cn/",
        'es-checker': "http://ruanyf.github.io/es-checker/index.cn.html",
        'express': 'https://expressjs.com',
        'Fighting Design-vue3': "https://fighting.tianyuhao.cn/components/button.html",
        'figma': 'https://www.figma.com',
        'Font Awesome': "https://fontawesome.com/search?o=r&m=free",
        'fanyi': "https://translate.google.cn/",
        'fitacg-anime': "https://fitacg.com",
        'flickr': "https://www.flickr.com/",
        'fsou': "https://fsoufsou.com/",
        'genshin': "https://ys.mihoyo.com/main/",
        'genshin-map': "https://webstatic.mihoyo.com/ys/app/interactive-map/index.html",
        'git': "https://git-scm.com",
        'gitee': "https://gitee.com",
        'github': "https://github.com/",
        'go-cn': 'https://studygolang.com',
        'google': "https://www.google.com/",
        'googleimg': "https://www.google.com.tw/imghp",
        'hackernews': "https://news.ycombinator.com",
        'hifini-music': "https://www.hifini.com/",
        'hikari-animeSearchEngine': 'https://hikari.obfs.dev',
        'houdunren': "https://doc.houdunren.com",
        'iconfinder': "https://www.iconfinder.com/",
        'iconGo': 'https://icongo.github.io',
        'icons.download': "https://icons.download/",
        'ip': "https://www.ip138.com/",
        'ipaddress': "https://www.ipaddress.com/",
        'jd': 'https://www.jd.com',
        'juejin': "https://juejin.cn",
        'juejin-challenge': "https://juejin.cn/challenge/1?utm_source=code_nav",
        'kaifa': "https://kaifa.baidu.com",
        'konachan': "https://konachan.net/post",
        'lodash': "https://lodash.com",
        'markdown': "https://markdown.com.cn/",
        'mdn': "https://developer.mozilla.org/",
        'miyoushe-genshin': "https://bbs.mihoyo.com/ys/",
        'nestjs': 'https://www.nestjs.com',
        'nestjs-cn': 'https://www.nestjs.com.cn',
        'nga': "https://bbs.nga.cn/thread.php?fid=650",
        'nodejs': "https://nodejs.org/en/",
        'mormalize.css': 'https://necolas.github.io/normalize.css/',
        'nowcoder-niuke': 'https://www.nowcoder.com/exam/company',
        'nuxtjs': 'https://nuxt.com',
        'nuxt-cn': 'https://www.nuxtjs.org.cn',
        'petal': 'https://petalsearch.com',
        'pinia': "https://pinia.vuejs.org",
        'pixiv': "https://www.pixiv.net/",
        'potplayer': "https://daumpotplayer.com/",
        'proxy-web-storage': "https://github.com/KID-joker/proxy-web-storage",
        'qidian': "https://www.qidian.com/",
        'qqmusic': "https://y.qq.com/",
        'ryf': "http://www.ruanyifeng.com/blog/",
        'ryf-github': "https://github.com/ruanyf/weekly",
        'ruoyi': "http://www.ruoyi.vip",
        'start-page': 'https://www.startpage.com',
        'sougou': 'https://www.sogou.com',
        'twitter': "https://twitter.com/",
        'uniapp': "https://uniapp.dcloud.net.cn",
        'unsplash': "https://unsplash.com",
        'uviewUI': "https://www.uviewui.com/components/intro.html",
        'v2ex': 'https://www.v2ex.com',
        'v8': "https://v8.dev/",
        'VexipUI_vue3_typescript': "https://www.vexipui.com/",
        'video-HDmoli': "https://www.hdmoli.com/",
        'vitepress': "https://vitepress.vuejs.org",
        'vmware教程': "https://zhuanlan.zhihu.com/p/272541376",
        'vue': "https://vuejs.org/",
        'vue-color-avatar': "https://vue-color-avatar.vercel.app/",
        'vuecn': "https://cn.vuejs.org",
        'vuerouter': "https://router.vuejs.org/",
        'vueuse': "https://vueuse.org",
        'wallhaven': "https://wallhaven.cc/",
        'wallhere': "https://wallhere.com/",
        "wallpaper-anime-pictures": "https://anime-pictures.net/",
        'webstore-chrome': "https://chrome.google.com/webstore/category/extensions",
        'wechat': "https://mp.weixin.qq.com",
        'weread': 'https://weread.qq.com',
        'weibo': "https://weibo.com/login.php/",
        'wexin-developers': "https://developers.weixin.qq.com/doc/",
        'wyy': "https://music.163.com/",
        'yande': "https://yande.re/post",
        'yandex': "https://yandex.com/images/",
        'youdao': "https://fanyi.youdao.com/",
        'youtube': "https://www.youtube.com/",
        'zhengze': "https://www.runoob.com/jsref/jsref-obj-regexp.html",
        'zhihu': "https://www.zhihu.com/",
        '云效': "https://devops.aliyun.com/",
        '域名备案查询': "https://beian.miit.gov.cn/#/Integrated/index",
        '星辰': "https://wudixingxing.com/user",
        'f-TNT': "https://github.com/tnfe/TNT-Weekly",
        'f-focus': "https://frontendfoc.us/issues",
        'f-javascript-weekly': "https://javascriptweekly.com/issues",
        'f-juejin': "https://juejin.cn/frontend",
        'f-nodejs-weekly': "https://nodeweekly.com/issues",
        'f-前端精读': "https://github.com/ascoders/weekly",
        'f-live-longer': "https://github.com/geekan/HowToLiveLonger",
    }
    /** console.log() */
    function l(val) {
        console.log(val)
    }
    /** 获取localStorage */
    function getStorage() {
        return localStorage.getItem('homepage')
    }
    /** 获取localStorage */
    function getStorageParse() {
        return JSON.parse(localStorage.getItem('homepage'))
    }
    /** 设置localStorage */
    function setStorage(str) {
        localStorage.setItem('homepage', str)
    }

    const colors = ['snow', 'GhostWhite', 'MintCream', 'Wheat1', 'WhiteSmoke', 'Ivory', 'FloralWhite', 'Linen', 'PapayaWhip', 'MintCream'];
    return {
        body, wrap, input, tip, bodyStyle, wrapStyle, searchMapping, commands, colors,
        l,getStorage,getStorageParse,setStorage
    }
})();

