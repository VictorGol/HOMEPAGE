Object.defineProperty(commonObj, 'suggestions', {
    get() {
        return suggestions
    },
    set(val) {
        suggestions = val
        showSuggestions(val)
    }
})

function baiduSuggestion(keyword) {
    const url = `http://suggestion.baidu.com/su?wd=${keyword}&cb=getRes`;
    let script = document.createElement("script");
    script.src = url;
    script.classList.add('willdel')
    document.getElementsByTagName("head")[0].appendChild(script);
}

function getRes(res) {
    commonObj.suggestions = res.s;
    let script = document.getElementsByClassName('willdel')[0];
    document.getElementsByTagName('head')[0].removeChild(script);
}