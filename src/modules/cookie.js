/**
 * @module cookie
 * @description Cookie 操作：设置、读取、删除
 */
export default {
  /**
   * 设置 Cookie
   * @param {string} name
   * @param {string} value
   * @param {number} [days=30] 天数
   * @param {string} [path='/'] 路径
   */
  setCookie(name, value, days, path) {
    const expiresDays = days || 30;
    const expires = new Date();
    expires.setTime(expires.getTime() + expiresDays * 24 * 60 * 60 * 1000);
    const cookiePath = path || '/';
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + expires.toUTCString() + ';path=' + cookiePath;
  },
  /**
   * 读取 Cookie
   * @param {string} name
   * @returns {string}
   */
  getCookie(name) {
    const prefix = name + '=';
    const cookieList = document.cookie.split(';');
    for (let i = 0; i < cookieList.length; i++) {
      const cookie = cookieList[i].trim();
      if (cookie.indexOf(prefix) === 0) {
        return decodeURIComponent(cookie.substring(prefix.length, cookie.length));
      }
    }
    return '';
  },
  /**
   * 删除 Cookie
   * @param {string} name
   * @param {string} [path='/'] 路径，需与设置时一致
   */
  deleteCookie(name, path) {
    const expires = new Date();
    expires.setTime(expires.getTime() - 1);
    const cookiePath = path || '/';
    document.cookie = name + '=null;expires=' + expires.toUTCString() + ';path=' + cookiePath;
  },
}
