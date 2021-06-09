export default {
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
  filterXSS(text){
    if (typeof text !== 'string') return
    text = text.replace(/&nbsp;/g, '')
    text = text.replace(/(\n)/g, '')
    text = text.replace(/(\t)/g, '')
    text = text.replace(/(\r)/g, '')
    text = text.replace(/<\/?[^>]*>/g, '')
    text = text.replace(/\s*/g, '')
    return text
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
  getRandomKey(len) {
    len = len || 8;
    //去掉容易混淆的字符oOLl,9gq,Vv,Uu,I1
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    let maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }
}