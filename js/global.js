/** body元素 */
const body = document.getElementsByTagName('body')[0];

/** wrap元素 */
const wrap = document.getElementById('app')

/** wrap1元素 */
const wrap1 = document.getElementsByClassName('wrap1')[0]

/** wrap2元素 */
const wrap2 = document.getElementsByClassName('wrap2')[0]

/** box元素 */
const box = document.getElementsByClassName('box')[0]

/** tip元素 */
const tip = document.getElementsByClassName('tip')[0]

/** popup元素 */
const popup = document.getElementsByClassName('popup')[0]

/** popup1元素 */
const popup1 = document.getElementsByClassName('popup1')[0];

/** 弹窗的提示 */
const pTip = document.getElementsByClassName('p-tip')[0];

/** 搜索引擎 */
let engine = 'baidu';

/** 选择状态，当按上下键进行选择搜索建议时 */
let selectStatus = false

/** 引擎配置网页搜索路径 */
const path = {
    'baidu': 'https://www.baidu.com/s?wd=',
    'bing': 'https://www.bing.com/search?q=',
    'bingcn': 'https://cn.bing.com/search?q=',
    'google': 'https://www.google.com/search?q=',
    'fsou': 'https://fsoufsou.com/search?q=',
}

/** 自定义命令 */
const command = {
    'ahhhhfs': 'https://www.abskoop.com',
    'apipost': 'https://console.apipost.cn/',
    'baidu': 'https://www.baidu.com/',
    'bili': 'https://t.bilibili.com/',
    'bilibili': 'https://www.bilibili.com/',
    'bing': 'https://cn.bing.com/',
    'cai': 'https://www.runoob.com/',
    'csdn': 'https://www.csdn.net/',
    'cupfox': 'https://cupfox.app',
    'deepl': 'https://www.deepl.com/translator',
    'diduan': 'https://ddys.tv',
    'douyin': 'https://www.douyin.com/',
    'electron': 'https://www.electronjs.org/zh/docs/latest/tutorial/process-model',
    'elementplus': 'https://element-plus.gitee.io/',
    'elementui': 'https://element.eleme.cn/',
    'fanyi': 'https://translate.google.cn/',
    'fitacg': 'https://fitacg.com',
    'flickr': 'https://www.flickr.com/',
    'fsou': 'https://fsoufsou.com/',
    'gamma': 'https://gamma.app/?ref=producthunt',
    'genshin': 'https://ys.mihoyo.com/main/',
    'git': 'https://git-scm.com',
    'gitee': 'https://gitee.com',
    'github': 'https://github.com/',
    'google': 'https://www.google.com/',
    'googleimg': 'https://www.google.com.tw/imghp',
    'hackernews': 'https://news.ycombinator.com',
    'houdunren': 'https://doc.houdunren.com',
    'iconfinder': 'https://www.iconfinder.com/',
    'ip': 'https://www.ip138.com/',
    'juejin': 'https://juejin.cn',
    'konachan': 'https://konachan.net/post',
    'lodash': 'https://lodash.com',
    'date-fns': 'https://date-fns.org',
    'markdown': 'https://markdown.com.cn/',
    'mdn': 'https://developer.mozilla.org/',
    'nga': 'https://bbs.nga.cn/',
    'pinia': 'https://pinia.vuejs.org',
    'pixiv': 'https://www.pixiv.net/',
    'qidian': 'https://www.qidian.com/',
    'qqmusic': 'https://y.qq.com/',
    'ranyf': 'https://github.com/ruanyf/weekly',
    'ruoyi': 'http://www.ruoyi.vip',
    'twitter': 'https://twitter.com/',
    'uniapp': 'https://uniapp.dcloud.net.cn',
    'unsplash': 'https://unsplash.com',
    'vitepress': 'https://vitepress.vuejs.org',
    'vmware教程': 'https://zhuanlan.zhihu.com/p/272541376',
    'vue': 'https://vuejs.org/',
    'vuecn': 'https://cn.vuejs.org',
    'vuerouter': 'https://router.vuejs.org/zh/',
    'vueuse': 'https://vueuse.org',
    'wallhaven': 'https://wallhaven.cc/',
    'wallhere': 'https://wallhere.com/',
    'webstore': 'https://chrome.google.com/webstore/category/extensions',
    'wechat': 'https://mp.weixin.qq.com',
    'weibo': 'https://weibo.com/login.php/',
    'wyy': 'https://music.163.com/',
    'yande': 'https://yande.re/post',
    'youtube': 'https://www.youtube.com/',
    'zhengze': 'https://www.runoob.com/jsref/jsref-obj-regexp.html',
    'zhihu': 'https://www.zhihu.com/',
    '菜鸟教程': 'https://www.runoob.com/',
    '若依': 'http://www.ruoyi.vip',
    '微信公众号': 'https://mp.weixin.qq.com',
    '微信公众平台': 'https://mp.weixin.qq.com',
    '域名备案查询': 'https://beian.miit.gov.cn/#/Integrated/index',
    '云效': 'https://devops.aliyun.com/',
    '正则': 'https://www.runoob.com/jsref/jsref-obj-regexp.html',
    // 前端分享
    'f-focus': 'https://frontendfoc.us/issues',
    'f-javascript-weekly': 'https://javascriptweekly.com/issues',
    'f-juejin': 'https://juejin.cn/frontend',
    'f-nodejs-weekly': 'https://nodeweekly.com/issues',
    'f-TNT': 'https://github.com/tnfe/TNT-Weekly',
    'f-编程狂人': 'https://www.tuicool.com/mags',
    'f-前端精读': 'https://github.com/ascoders/weekly',
}

/** 指令的所有键 */
const commandKeys = Object.keys(command);

/**
 * 显示提示信息
 * 参数就是提示的信息
 */
function showTip(param) {
    box.value = param ? param : '啥也没有哦';
    const timeout = setTimeout(() => {
        box.value = ''
        clearTimeout(timeout)
    }, 1000);
}