import { box } from './const.js'
import { showSuggestions } from './setting.js'

/**
 * 调用baidu搜索建议接口
 */
export function baiduSuggestion(keyword) {
    if (!box.value.trim()) return
    // const url = `http://suggestion.baidu.com/su?wd=${keyword}&cb=window.baidu.sug`;
    const url = `https://www.baidu.com/sugrec?&prod=pc&from=pc_web&wd=${keyword}&cb=window.baidu.sug`
    let script = document.createElement("script");
    script.src = url;
    script.classList.add('willdel')
    document.getElementsByTagName("head")[0].appendChild(script);
}

window.baidu = {
    sug: (res) => {
        if (res.g && res.g.length) {
            let suggestions = res.g.map(v => v.q);
            showSuggestions(suggestions)
            let script = document.getElementsByClassName('willdel')[0];
            document.getElementsByTagName('head')[0].removeChild(script);
        }
    }
}