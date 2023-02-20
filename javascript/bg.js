/** 背景 */
const bg = (function () {
  /**图片位置移动*/
  function bgMove(val) {
    const storage = c.getStorageParse();
    let arr = val.split(" ");
    const x = parseInt(arr[0]);
    const y = parseInt(arr[1]);
    let sx = storage.bgPosX + x;
    let sy = storage.bgPosY + y;
    sx = sx < 0 ? 0 : sx;
    sy = sy < 0 ? 0 : sy;
    sx = sx > 100 ? 100 : sx;
    sy = sy > 100 ? 100 : sy;
    c.bodyStyle.backgroundPosition = `${sx}% ${sy}%`;
    storage.bgPosX = sx;
    storage.bgPosY = sy;
    c.setStorage(JSON.stringify(storage));
  }

  /** 背景图设置 */
  function bgSet(val) {
    const storage = c.getStorageParse();
    const imgUrl = val ? val : "img/bg.jpg";
    c.bodyStyle.backgroundImage = `url(${imgUrl})`;
    storage.preImg = storage.bgUrl;
    storage.bgUrl = imgUrl;
    c.setStorage(JSON.stringify(storage));
  }

  /** 设置本地图片为背景 */
  function bglSet() {
    c.tip.innerHTML = `<input type="file" name="img" id="file" accept="image/jpeg,image/jpg,image/png"></input>`;
    document.getElementById("file").onchange = fileImport;
  }

  /** 设置上一张背景图 */
  function preBgSet() {
    const storage = c.getStorageParse();
    bgSet(storage.preImg);
  }

  /** 背景透明度设置 */
  function trpSet(val) {
    const storage = c.getStorageParse();
    const trp = val || "0";
    c.wrapStyle.backgroundColor = `rgba(0,0,0,${trp})`;
    storage.bgTransparency = trp;
    c.setStorage(JSON.stringify(storage));
  }

  /** 图片转base64 */
  function fileImport() {
    let file = document.getElementById("file").files[0];
    const blob = new Blob([file], { type: file.type || "application/*" });
    // const blobUrl = window.URL.createObjectURL(blob)
    let reader = new FileReader();
    reader.onload = () => {
      file.size > 2097152 ? compression(reader.result) : bgSet(reader.result);
    };
    reader.readAsDataURL(blob);
  }

  /** 压缩图片 */
  function compression(img) {
    let image = new Image();
    image.setAttribute("crossOrigin", "anonymous");
    image.src = img;
    let myCanvas = document.createElement("canvas");
    let ctx = myCanvas.getContext("2d");
    image.onload = () => {
      myCanvas.width = image.width;
      myCanvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      const url = myCanvas.toDataURL("image/jpeg", 0.7);
      bgSet(url);
    };
  }

  /**初始化背景*/
  function initBackground() {
    const bodyStyle = c.bodyStyle;
    const str = c.getStorage();
    const storage = str
      ? JSON.parse(str)
      : {
          bgUrl: "",
          bgRrepeat: "no-repeat",
          bgPosX: 0,
          bgPosY: 0,
          bgSize: "cover",
          bgTransparency: "0",
          preImg: "",
          preWords: "",
        };
    const { bgUrl, bgRrepeat, bgPosX, bgPosY, bgSize, bgTransparency } =
      storage;
    bodyStyle.backgroundImage = `url(${bgUrl ? bgUrl : "img/bg.jpg"})`;
    bodyStyle.backgroundRepeat = bgRrepeat;
    bodyStyle.backgroundPosition = `${bgPosX}% ${bgPosY}%`;
    bodyStyle.backgroundSize = bgSize;
    bodyStyle.transition = "all 0.1s linear";
    c.wrapStyle.backgroundColor = `rgba(0,0,0,${bgTransparency})`;
    if (!str) {
      c.setStorage(JSON.stringify(storage));
    }
  }

  /**初始化箭头*/
  function initArrow() {
    const arrows = document.getElementsByClassName("arrow");
    const moveArr = ["0 -1", "0 1", "-1 0", "1 0"];
    for (let i = 0; i < 4; i++) {
      let timeout, interval;
      arrows[i].addEventListener(
        "mousedown",
        () => {
          bgMove(moveArr[i]);
          timeout = setTimeout(() => {
            interval = setInterval(() => {
              bgMove(moveArr[i]);
            }, 100);
          }, 200);
        },
        false
      );
      arrows[i].addEventListener(
        "mouseup",
        () => {
          clearTimeout(timeout);
          clearInterval(interval);
        },
        false
      );
    }
  }

  /** 初始化背景 */
  function init() {
    initBackground();
    initArrow();
  }

  return {
    init,
    bglSet,
    trpSet,
    preBgSet,
    bgSet,
  };
})();
