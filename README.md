这是一个极简的自定义首页

这是一个纯前端项目，只用前端三剑客，不加任何框架和库。

# 介绍

## 1

输入任意内容，如果内容文本与设置的文本对应，则会直接跳转到对应链接，可在js/const.js里进行编辑。比如输入`vue`，会跳转到vue官网；输入`ruoyi`，会跳转到若依官网，等等。

## 2

按左Ctrl键进行`显示/隐藏`光标，按右Ctrl键进行input框的样式切换

## 3

`_`开头的文本不会进行搜索，一般作为内部设置指令使用。比如`_bg 图片链接`可以修改背景；`_engine bing`可以从默认的百度搜索引擎切换到必应搜索，等等。这可以在js/const.js里进行设置。设置的内容会保存到localStorage里。

## 4
默认背景图片是从[unsplash](https://unsplash.com)下载的

## 5
输入文本的末尾如果是`cl`则会清空input框

## 6
点击页面任意地方会聚焦input框
