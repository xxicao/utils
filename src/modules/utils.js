export default {
  bigNumberAdd(a, b){
    const checkNum = num => (typeof num === 'string' && !Number.isNaN(Number(num)))
    if(!checkNum(a) || !checkNum(b)) return
    let maxLength = Math.max(a.length, b.length);
    a = a.padStart(maxLength , 0);
    b = b.padStart(maxLength , 0);
    let t = 0;
    let f = 0;
    let sum = '';
    for(let i = maxLength-1 ; i>=0 ; i--){
        t = parseInt(a[i]) + parseInt(b[i]) + f;
        f = Math.floor(t/10);
        sum = t%10 + sum;
    }
    if(f == 1){
        sum = '1' + sum;
    }
    return sum;
  },
  filterXSS(e){
    if (!e) return e;
    for (; e !== unescape(e);) e = unescape(e);
    for (let r = ['<', '>', '\'', '"', '%3c', '%3e', '%27', '%22', '%253c', '%253e', '%2527', '%2522'], n = ['&#x3c;', '&#x3e;', '&#x27;', '&#x22;', '%26%23x3c%3B', '%26%23x3e%3B', '%26%23x27%3B', '%26%23x22%3B', '%2526%2523x3c%253B', '%2526%2523x3e%253B', '%2526%2523x27%253B', '%2526%2523x22%253B'], a = 0; a < r.length; a++) e = e.replace(new RegExp(r[a], 'gi'), n[a]);
    return e;
  },
  dateFormat(stamp, format = '{y}-{m}-{d}'){
    if (!stamp || typeof stamp !== 'number') {
      console.warn('请传入要格式化的时间戳');
      return '-';
    }
    const date = new Date(stamp);
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay(),
    };
    return format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key];
      if (result.length > 0 && value < 10) {
        value = `0${value}`;
      }
      return value || 0;
    });
  },
  debounce(fn, delay) {
    const ndelay = delay || 300;
    let timer;
    return function (...args) {
      const th = this;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        timer = null;
        fn.apply(th, args);
      }, ndelay);
    };
  },
  throttle(fn, interval) {
    let last;
    let timer;
    const ninterval = interval || 300;
    return function (...args) {
      const th = this;
      const now = +new Date();
      if (last && now - last < interval) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          last = now;
          fn.apply(th, args);
        }, ninterval);
      } else {
        last = now;
        fn.apply(th, args);
      }
    };
  },
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