# 介绍

一个浏览器主页，使用 html、js、css 编写

# 使用

打开 `index.html` 即可

# 功能

输入 `bg 图片链接` 可更换背景图片，例如 `bg https://images.unsplash.com/photo-1668876303651-ef4dc5814cc0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2372&q=80`

输入 `bgl` 可选择本地图片作为背景图片

输入 `trp 0到1之间的小数` 可设置背景透明度，例如 `trp .2`，不输小数则会设置透明度为0

点击右上角的四个箭头可移动背景图片位置，可以长按。不过因为 `backgroundSize` 设置的是`cover`，所以要么只有上下键生效，要么只有左右键生效，或者都不生效

输入与命令不同的文本后回车可进行搜索，默认是必应搜索，如果以 `bing 文本` 的搜索引擎加文本的格式搜索也是同样效果，可使用的搜索引擎有 `baidu` `bing` `google` `fsou` `brave` `duckduckgo` `sougou` `petal`等。

输入文本会进行命令提示，点击命令会跳转到指定网页，这可以自定义(在 javascript/constant.js 里自行修改)

输入 `past` 会显示搜索记录

输入文本最后是 `..` 则会清除文本

输入 `*` 会显示所有自定义命令

输入 `pre` 会设置上一张背景图

输入 `l 链接` 会打开链接，比如 `l www.baidu.com` 会打开百度
