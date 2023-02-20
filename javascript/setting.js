/** 人工操作 */
const setting = (function () {
  /** 当前提示框的信息 */
  let moveH = {
    top: -1,
    h: 0,
  };

  /** 设置映射 */
  const mapping = {
    bg: bg.bgSet,
    bgl: bg.bglSet,
    trp: bg.trpSet,
    pre: bg.preBgSet,
    l: jump,
  };

  /** 回车键按下 */
  function pressEnter(val, isSaveHistory = true) {
    isSaveHistory && savePreWords(val);
    // 输入值格式化为数组
    let str = val.trim();
    let arr = [str];
    if (/.+\s+.+/.test(str)) {
      str = str.replace(/\s+/g, " ");
      const ind = str.indexOf(" ");
      arr = [str.slice(0, ind), str.slice(ind + 1)];
    }
    if ((fn = mapping[arr[0]])) {
      // 如果是普通映射
      fn(arr[1] || undefined);
    } else if ((engLink = c.searchMapping[arr[0]]) && arr[1]) {
      // 如果是搜索命令
      window.open(engLink + arr[1]);
    } else if (!arr[1] && (link = c.commands[arr[0]])) {
      // 如果是自定义命令
      window.open(link);
    } else window.open(c.searchMapping.bing + val); // 直接搜索
  }

  /** 搜索 */
  function search(val) {
    window.open(c.commands[val]);
  }

  /** 匹配映射命令 */
  function pattern(val) {
    c.tip.innerHTML = "";
    if (!val) return;
    if (val.slice(val.length - 2) === "..") {
      c.input.value = "";
      c.tip.innerHTML = "";
      return;
    }
    if (val === "past") {
      getPreWords();
      return;
    }
    const keys = Object.keys(c.commands);
    if (val === "*") {
      addTips(keys);
      return;
    }
    const tipArr = [];
    for (let item of keys) {
      item.indexOf(val) !== -1 ? tipArr.push(item) : 0;
    }
    addTips(tipArr);
  }

  /** 填充提示 */
  function addTips(arr) {
    c.tip.innerHTML = "";
    const bacs = document.getElementsByClassName("bac");
    const bac = bacs.length ? bacs[0] : addTipBac();
    for (let i = 0; i < arr.length; i++) {
      const div = document.createElement("div");
      div.classList.add("tip-child");
      div.addEventListener("click", () => {
        search(arr[i]);
      });
      div.innerHTML = arr[i];
      c.tip.appendChild(div);
      const h = div.clientHeight;
      const top = div.clientHeight * i;
      moveH.h = h;
      const color = c.colors[i % 6];
      div.onmouseover = () => {
        bac.style.display = "block";
        bac.style.height = h + "px";
        bac.style.top = top + "px";
        bac.style.backgroundColor = color;
        moveH.top = top;
      };
      div.onmouseleave = () => {
        bac.style.display = "none";
        moveH.top = -1;
      };
    }
  }

  /** 获取旧值 */
  function getPreWords() {
    addTips(c.getStorageParse().preWords.split(","));
  }

  /** 保存旧值 */
  function savePreWords(val) {
    if (!val) return;
    const storage = c.getStorageParse(),
      arr = storage.preWords.split(",");
    arr.length === 500 ? arr.pop() : 0;
    arr.unshift(val);
    storage.preWords = arr.join(",");
    c.setStorage(JSON.stringify(storage));
  }

  /** 添加提示背景 */
  function addTipBac() {
    const bac = document.createElement("div");
    const bacStyle = bac.style;
    bacStyle.display = "none";
    bacStyle.position = "absolute";
    bacStyle.transition = "top .2s";
    bacStyle.width = "100%";
    bacStyle.borderRadius = ".5em";
    bacStyle.zIndex = "-1";
    bac.classList.add("bac");
    c.tip.appendChild(bac);
    return bac;
  }

  function jump(val) {
    val.slice(0, 4) !== "http" ? (val = "https://" + val) : 0;
    window.open(val);
  }

  /** 初始化有关输入框 */
  function init() {
    c.wrap.onkeydown = (e) => {
      const val = c.input.value;
      if (!val) return;
      e.keyCode == 13 ? pressEnter(val) : 0;
    };
    c.wrap.addEventListener("click", () => {
      c.input.focus();
    });
    c.input.oninput = () => {
      pattern(c.input.value);
    };
  }

  return {
    init,
  };
})();
