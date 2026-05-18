/**
 * @module storage
 * @description 本地存储封装：localStorage / sessionStorage，自动 JSON 序列化
 */
export default {
  /**
   * 设置 localStorage
   * @param {string} key
   * @param {*} value
   */
  setLocal(key, value) {
    if (!key) return;
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  /**
   * 获取 localStorage
   * @param {string} key
   * @returns {*}
   */
  getLocal(key) {
    if (!key) return null;
    const data = window.localStorage.getItem(key);
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  },
  /**
   * 删除 localStorage
   * @param {string} key
   */
  removeLocal(key) {
    if (!key) return;
    window.localStorage.removeItem(key);
  },
  /**
   * 清空 localStorage
   */
  clearLocal() {
    window.localStorage.clear();
  },
  /**
   * 设置 sessionStorage
   * @param {string} key
   * @param {*} value
   */
  setSession(key, value) {
    if (!key) return;
    window.sessionStorage.setItem(key, JSON.stringify(value));
  },
  /**
   * 获取 sessionStorage
   * @param {string} key
   * @returns {*}
   */
  getSession(key) {
    if (!key) return null;
    const data = window.sessionStorage.getItem(key);
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  },
  /**
   * 删除 sessionStorage
   * @param {string} key
   */
  removeSession(key) {
    if (!key) return;
    window.sessionStorage.removeItem(key);
  },
  /**
   * 清空 sessionStorage
   */
  clearSession() {
    window.sessionStorage.clear();
  },
}
