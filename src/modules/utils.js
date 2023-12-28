export default {
  bigNumberAdd(a, b) {
    const checkNum = num => (typeof num === 'string' && !Number.isNaN(Number(num)))
    if (!checkNum(a) || !checkNum(b)) return
    let maxLength = Math.max(a.length, b.length);
    a = a.padStart(maxLength, 0);
    b = b.padStart(maxLength, 0);
    let t = 0;
    let f = 0;
    let sum = '';
    for (let i = maxLength - 1; i >= 0; i--) {
      t = parseInt(a[i]) + parseInt(b[i]) + f;
      f = Math.floor(t / 10);
      sum = t % 10 + sum;
    }
    if (f == 1) {
      sum = '1' + sum;
    }
    return sum;
  },
  filterXSS(e) {
    if (!e) return e;
    for (; e !== unescape(e);) e = unescape(e);
    for (let r = ['<', '>', '\'', '"', '%3c', '%3e', '%27', '%22', '%253c', '%253e', '%2527', '%2522'], n = ['&#x3c;', '&#x3e;', '&#x27;', '&#x22;', '%26%23x3c%3B', '%26%23x3e%3B', '%26%23x27%3B', '%26%23x22%3B', '%2526%2523x3c%253B', '%2526%2523x3e%253B', '%2526%2523x27%253B', '%2526%2523x22%253B'], a = 0; a < r.length; a++) e = e.replace(new RegExp(r[a], 'gi'), n[a]);
    return e;
  },
  dateFormat(stamp, format = '{y}-{m}-{d}') {
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
  getURLParameters(url) {
    const reg = /([^?=&]+)(=([^&#]*))/g;
    const href = url || window.location.href;
    const matchList = href.match(reg) || [];
    const obj = {};

    matchList.forEach((v) => {
      obj[v.slice(0, v.indexOf('='))] = decodeURIComponent(v.slice(v.indexOf('=') + 1));
    });

    return obj;
  },
  deepClone(source) {
    const target = Array.isArray(source) ? [] : {};
    for (const key in source) {
      target[key] = source[key] !== null && typeof source[key] === 'object' ? deepClone(source[key]) : source[key];
    }

    return target;
  }
}