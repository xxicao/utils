export default {
  getQuery(name, search){
    const tempSearch = search || window.location.search;
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const r = tempSearch.substr(1).match(reg);
    if (r !== null) return unescape(r[2]);
    return null;
  },
  bigNumberAdd(a, b){
    const checkNum = num => typeof num === 'string' && !Number.isNaN(Number(num))
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
  dateFormat (fmt, time) {
    const date = time ? new Date(time) : new Date()
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (const k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
    return fmt
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
  }
}