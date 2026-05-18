/**
 * @module dom
 * @description DOM 操作：资源预加载/注入、全屏控制、剪贴板复制、滚动、class 操作、滚动位置
 */
export default {
  /**
   * 预加载图片
   * @param {string} url 图片地址
   * @returns {Promise<boolean>}
   */
  preloadImage(url) {
    return new Promise((resolve, reject) => {
      if (!url || typeof url !== 'string') {
        reject(new Error('url must be a non-empty string'));
        return;
      }
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => reject(new Error('Image load error: ' + url));
      img.src = url;
    });
  },
  /**
   * 动态注入 JS 脚本
   * @param {string} src 脚本地址
   * @returns {Promise}
   */
  injectScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.addEventListener('load', function onLoad() {
        script.removeEventListener('load', onLoad);
        resolve();
      });
      script.addEventListener('error', function onError() {
        script.removeEventListener('error', onError);
        reject(new Error('Script load error: ' + src));
      });
      document.head.appendChild(script);
    });
  },
  /**
   * 动态注入 CSS 样式
   * @param {string} href 样式地址
   * @returns {Promise}
   */
  injectCss(href) {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.href = href;
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.addEventListener('load', function onLoad() {
        link.removeEventListener('load', onLoad);
        resolve();
      });
      link.addEventListener('error', function onError() {
        link.removeEventListener('error', onError);
        reject(new Error('CSS load error: ' + href));
      });
      document.head.appendChild(link);
    });
  },
  /**
   * 进入全屏
   * @param {HTMLElement} element 目标元素
   */
  fullscreen(element) {
    if (!element) return;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  },
  /**
   * 退出全屏
   */
  exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  },
  /**
   * 复制文本到剪贴板
   * @param {string} text 要复制的文本
   * @returns {Promise<boolean>}
   */
  copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
    }
    return new Promise((resolve) => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        resolve(true);
      } catch (e) {
        resolve(false);
      }
      document.body.removeChild(textarea);
    });
  },
  /**
   * 平滑滚动到页面顶部
   * @param {number} [duration=300] 动画时长（毫秒）
   */
  scrollToTop(duration) {
    const dur = duration || 300;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop === 0) return;
    const step = scrollTop / (dur / 16);
    function scroll() {
      const current = document.documentElement.scrollTop || document.body.scrollTop;
      if (current <= 0) {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        return;
      }
      document.documentElement.scrollTop = current - step;
      document.body.scrollTop = current - step;
      requestAnimationFrame(scroll);
    }
    scroll();
  },
  /**
   * 为元素添加 class
   * @param {HTMLElement} element 目标元素
   * @param {string} className 类名
   */
  addClass(element, className) {
    if (!element || !className) return;
    if (element.classList) {
      element.classList.add(className);
    } else {
      const classes = element.className.split(' ');
      if (classes.indexOf(className) === -1) {
        element.className += ' ' + className;
      }
    }
  },
  /**
   * 为元素移除 class
   * @param {HTMLElement} element 目标元素
   * @param {string} className 类名
   */
  removeClass(element, className) {
    if (!element || !className) return;
    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.className = element.className.replace(new RegExp('(^|\\s)' + className + '(\\s|$)', 'g'), ' ').trim();
    }
  },
  /**
   * 获取页面滚动位置
   * @returns {{x: number, y: number}}
   */
  getScrollPosition() {
    return {
      x: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
      y: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
    };
  },
}
