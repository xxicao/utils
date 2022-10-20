export default {
  preloadImage(url){
    return new Promise((resolve, reject) => {
      if (!url || typeof url !== 'string') {
        console.error('url must exit and String');
        reject(false);
      }
      const ImgEl = new Image();
      ImgEl.src = url;
      ImgEl.onload = () => {
        console.log('Image loaded');
        resolve(true);
      };
      ImgEl.onerror = () => {
        console.log('Image load error');
        resolve(false);
      };
    })
  },
  injectScript(src){
    return new Promise((resolve, reject) => {
      let scriptEle = document.createElement('script');
      const succFn = () => {
        scriptEle.removeEventListener('load', succFn, false);
        scriptEle = null;
        resolve();
      };
      const errorFn = () => {
        scriptEle.removeEventListener('error', errorFn, false);
        scriptEle = null;
        reject();
      };
      scriptEle.src = src;
      document.head.appendChild(scriptEle);
      scriptEle.addEventListener('load', succFn, false);
      scriptEle.addEventListener('error', errorFn, false);
    })
  },
  injectCss(src){
    return new Promise((resolve, reject) => {
      let cssEle = document.createElement('link');
      const succFn = () => {
        cssEle.removeEventListener('load', succFn, false);
        cssEle = null;
        resolve();
      };
      const errorFn = () => {
        cssEle.removeEventListener('error', errorFn, false);
        cssEle = null;
        reject();
      };
      cssEle.href = src;
      cssEle.type = 'text/css';
      cssEle.rel = 'stylesheet';
      document.head.appendChild(cssEle);
      cssEle.addEventListener('load', succFn, false);
      cssEle.addEventListener('error', errorFn, false);
    })
  },
  fullscreen(ele){
    if (ele.requestFullscreen) {
      ele.requestFullscreen();
    } else if (ele.mozRequestFullScreen) {
      ele.mozRequestFullScreen();
    } else if (ele.webkitRequestFullscreen) {
      ele.webkitRequestFullscreen();
    } else if (ele.msRequestFullscreen) {
      ele.msRequestFullscreen();
    } else {
      ele.webkitEnterFullscreen();
    }
  },
  exitFullscreen(ele){
    if (ele.exitFullScreen) {
      ele.exitFullScreen();
    } else if (ele.mozCancelFullScreen) {
      ele.mozCancelFullScreen();
    } else if (ele.webkitExitFullscreen) {
      ele.webkitExitFullscreen();
    } else if (ele.msExitFullscreen) {
      ele.msExitFullscreen();
    }
  },
}