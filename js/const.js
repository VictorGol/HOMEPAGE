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
    'vue': 'https://vuejs.org/',
    'ip': 'https://www.ip138.com/',
    'csdn': 'https://www.csdn.net/',
    'github': 'https://github.com/',
    'pixiv': 'https://www.pixiv.net/',
    'twitter': 'https://twitter.com/',
    'bili': 'https://www.bilibili.com/',
    'bilibili': 'https://www.bilibili.com/',
    'wallhere': 'https://wallhere.com/',
    'wallhaven': 'https://wallhaven.cc/',
    '云效': 'https://account.aliyun.com/',
    'fanyi': 'https://translate.google.cn/',
    'deepl': 'https://www.deepl.com/translator',
    'apipost': 'https://console.apipost.cn/',
    'elementui': 'https://element.eleme.cn/',
    'elementplus': 'https://element-plus.gitee.io/',
    'wyy': 'https://music.163.com/',
    'bing': 'https://cn.bing.com/',
    'google': 'https://www.google.com/',
    'baidu': 'https://www.baidu.com/',
    'qqmusic': 'https://y.qq.com/',
    'douyin': 'https://www.douyin.com/',
    'flickr': 'https://www.flickr.com/',
    'youtube': 'https://www.youtube.com/',
    'webstore': 'https://chrome.google.com/webstore/category/extensions',
    'cupfox': 'https://cupfox.app',
    'zhihu': 'https://www.zhihu.com/',
    'fitacg': 'https://fitacg.com',
    'diduan': 'https://ddrk.me/',
    'googleimage': 'https://www.google.com.tw/imghp',
    'nga': 'https://bbs.nga.cn/',
    'wechat': 'https://mp.weixin.qq.com',
    '微信公众平台': 'https://mp.weixin.qq.com',
    'genshin': 'https://ys.mihoyo.com/main/',
    'qidian': 'https://www.qidian.com/',
    'konachan': 'https://konachan.net/post',
    'markdown': 'https://markdown.com.cn/',
    '菜鸟教程': 'https://www.runoob.com/',
    'mdn': 'https://developer.mozilla.org/',
    'weibo': 'https://weibo.com/login.php/',
    'yande': 'https://yande.re/post',
    'houdunren': 'https://doc.houdunren.com',
    'fsou': 'https://fsoufsou.com/',
    'ruoyi': 'http://www.ruoyi.vip',
    'unsplash': 'https://unsplash.com',
}