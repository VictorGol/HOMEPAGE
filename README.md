一个有趣的自定义主页，打开 `index.html` 即可，也可将其设置为浏览器首页

# 介绍

这是一个除了背景图啥也没有的主页，功能如下：

# 功能

输入 `bg 图片链接` 可更换背景图片，例如 `bg https://images.unsplash.com/photo-1668876303651-ef4dc5814cc0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2372&q=80`

输入 `bgl` 可选择本地图片作为背景图片

输入 `trp 0到1之间的小数` 可设置背景透明度，例如 `trp .2`

点击右上角的四个箭头可移动背景图片位置，可以长按。不过因为 `backgroundSize` 设置的是`cover`，所以要么只有上下键生效，要么只有左右键生效，或者都不生效

输入文本后回车可进行搜索，默认是必应搜索，如果以 `bing 文本` 的搜索引擎加文本的格式搜索也行，可使用的搜索引擎有 `baidu` `bing` `google` `fsou` `brave` `duckduckgo` `sougou` `petal`等。

输入文本会进行命令提示，点击命令会跳转到指定网页，这可以自定义

输入 `past` 会显示搜索记录

输入文本最后是 `..` 则会清除文本，例如 `dhajkdhasjkhdajks..` 会被清除

输入 `*` 会显示所有自定义命令

输入 `pre` 会设置上一张背景图，过去的背景只会保留一张
