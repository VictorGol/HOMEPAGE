/**
 * 插入js文件到html中
 */
function insertScript(type,path) {
    let a = document.createElement("script");
    a.type = type;
    a.src = path;
    let head = document.getElementsByTagName("head")[0];
    head.appendChild(a);
}

insertScript('text/javascript','./js/global.js');
insertScript('module','./js/const.js');
insertScript('module','./js/setting.js');
insertScript('module','./js/request.js');
insertScript('module','./js/init.js');