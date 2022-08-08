这是一个极简的[自定义首页](https://github.com/VictorGol/index)

这是一个纯前端项目，只用前端三剑客，不加任何框架和库。

# 介绍

## 1

输入任意内容，如果内容文本与设置的文本对应，则会直接跳转到对应链接，可在js/const.js里进行编辑。比如输入`vue`，会跳转到vue官网；输入`ruoyi`，会跳转到若依官网，等等。

目前支持的有：
`vue`
`ip`
`csdn`
`github`
`bilibili`
`wallhaven`
`fanyi`
`deepl`
`apipost`
`elementui`
`elementplus`
等等，挺多的

## 2

按右Ctrl键进行input框的样式切换

## 3

`#`开头的文本不会进行搜索，一般作为内部设置指令使用。比如`#bg 图片链接`可以修改背景；`#eng bing`可以从默认的百度搜索引擎切换到必应搜索，等等。这可以在js/const.js里进行设置。设置的内容会保存到localStorage里。设置时如果不加参数，则会回到当前设置项的默认状态。

目前有的设置选项：

`#bg`设置背景：参数是网络图片链接
`#bgl`选择本地背景，因为本地图片的url不允许直接使用，不能和`#bg`的方式一样，选择后转化成base64。这种方式限制图片大小为2M，若非要以本地图片作为背景且图片很大，自己可以将图片复制到代码的image文件夹，修改setting.js的initSetting函数即可。
`#eng`：设置搜索引擎，参数是简写的搜索引擎，比如baidu/bing/google/fsou
`#pos`：设置input框的位置，参数只有1和2，1代表左上角，2代表中间
`#trp`：设置背景透明度，取值0-1

## 4
默认背景图片是从[unsplash](https://unsplash.com)下载的

## 5
输入文本的末尾如果是`..`则会清空input框

## 6
输入合格链接会直接跳转
