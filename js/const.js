const wrap = document.getElementById('app')
const wrap1 = document.getElementsByClassName('wrap1')[0]
const box = document.getElementsByClassName('box')[0]
const tip = document.getElementsByClassName('tip')[0]

const path = {
    'baidu': 'https://www.baidu.com/s?wd=',
    'bing': 'https://www.bing.com/search?q=',
    'google': 'https://www.google.com/search?q=',
    'fsou': 'https://fsoufsou.com/search?q=',
}
let engine = 'baidu'
let commonObj = {}

const command = {
    '*': 'https://www.ip138.com/',
    'apipost': 'https://console.apipost.cn/',
    'baidu': 'https://www.baidu.com/',
    'bili': 'https://www.bilibili.com/',
    'bilibili': 'https://www.bilibili.com/',
    'bing': 'https://cn.bing.com/',
    'csdn': 'https://www.csdn.net/',
    'cupfox': 'https://cupfox.app',
    'deepl': 'https://www.deepl.com/translator',
    'diduan': 'https://ddrk.me/',
    'douyin': 'https://www.douyin.com/',
    'elementplus': 'https://element-plus.gitee.io/',
    'elementui': 'https://element.eleme.cn/',
    'fanyi': 'https://translate.google.cn/',
    'fitacg': 'https://fitacg.com',
    'flickr': 'https://www.flickr.com/',
    'fsou': 'https://fsoufsou.com/',
    'genshin': 'https://ys.mihoyo.com/main/',
    'github': 'https://github.com/',
    'google': 'https://www.google.com/',
    'googleimg': 'https://www.google.com.tw/imghp',
    'houdunren': 'https://doc.houdunren.com',
    'ip': 'https://www.ip138.com/',
    'konachan': 'https://konachan.net/post',
    'markdown': 'https://markdown.com.cn/',
    'mdn': 'https://developer.mozilla.org/',
    'nga': 'https://bbs.nga.cn/',
    'pixiv': 'https://www.pixiv.net/',
    'qidian': 'https://www.qidian.com/',
    'qqmusic': 'https://y.qq.com/',
    'ruoyi': 'http://www.ruoyi.vip',
    'twitter': 'https://twitter.com/',
    'unsplash': 'https://unsplash.com',
    'vue': 'https://vuejs.org/',
    'wallhaven': 'https://wallhaven.cc/',
    'wallhere': 'https://wallhere.com/',
    'webstore': 'https://chrome.google.com/webstore/category/extensions',
    'wechat': 'https://mp.weixin.qq.com',
    'weibo': 'https://weibo.com/login.php/',
    'wyy': 'https://music.163.com/',
    'yande': 'https://yande.re/post',
    'youtube': 'https://www.youtube.com/',
    'zhihu': 'https://www.zhihu.com/',
    '菜鸟教程': 'https://www.runoob.com/',
    '微信公众号': 'https://mp.weixin.qq.com',
    '微信公众平台': 'https://mp.weixin.qq.com',
    '云效': 'https://account.aliyun.com/',
}