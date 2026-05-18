/**
 * @module device
 * @description 设备与浏览器检测：PC/移动端、iOS/Android、微信/企业微信、IE 版本
 */
export default {
  /**
   * 检测是否 PC 端
   * @returns {boolean}
   */
  isPC() {
    const userAgent = window.navigator.userAgent;
    const mobileKeywords = ['Android', 'iPhone', 'webOS', 'BlackBerry', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
    return !mobileKeywords.some(keyword => userAgent.indexOf(keyword) > 0);
  },
  /**
   * 检测是否移动端
   * @returns {boolean}
   */
  isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
  },
  /**
   * 检测是否 iOS
   * @returns {boolean}
   */
  isIOS() {
    const userAgent = window.navigator.userAgent;
    return /iPhone|iPad|iPod/i.test(userAgent) || (userAgent.indexOf('Mac') > -1 && navigator.maxTouchPoints > 0);
  },
  /**
   * 检测是否 Android
   * @returns {boolean}
   */
  isAndroid() {
    const userAgent = window.navigator.userAgent;
    return userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1;
  },
  /**
   * 检测是否微信浏览器
   * @returns {boolean}
   */
  isWeChat() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /MicroMessenger/i.test(userAgent) || userAgent.indexOf('miniprogram') > -1;
  },
  /**
   * 检测是否企业微信
   * @returns {boolean}
   */
  isWorkWeChat() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /MicroMessenger/i.test(userAgent) && /wxwork/i.test(userAgent);
  },
  /**
   * 获取 IE 浏览器版本
   * @returns {number|string} IE 版本号，Edge 返回 'Edge'，非 IE 返回 -1
   */
  getIEVersion() {
    const userAgent = navigator.userAgent;
    const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1;
    const isEdge = userAgent.indexOf('Edge') > -1 && !isIE;
    const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
    if (isIE) {
      const match = userAgent.match(/MSIE (\d+\.\d+)/);
      const version = match ? parseFloat(match[1]) : 6;
      if (version === 7) return 7;
      if (version === 8) return 8;
      if (version === 9) return 9;
      if (version === 10) return 10;
      return 6;
    }
    if (isEdge) return 'Edge';
    if (isIE11) return 11;
    return -1;
  }
}
