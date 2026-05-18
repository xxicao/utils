/**
 * @module fn
 * @description 函数工具：柯里化、防抖、节流、睡眠、异步重试、单次执行
 */

/**
 * 函数柯里化
 * @param {Function} fn 目标函数
 * @param {Array} [collectedArgs] 已收集的参数
 * @returns {Function}
 */
export function curry(fn, collectedArgs) {
  const requiredLength = fn.length;
  const args = collectedArgs || [];
  return function () {
    const mergedArgs = args.slice(0);
    for (let i = 0; i < arguments.length; i++) {
      mergedArgs.push(arguments[i]);
    }
    if (mergedArgs.length < requiredLength) {
      return curry.call(this, fn, mergedArgs);
    }
    return fn.apply(this, mergedArgs);
  };
}

/**
 * 防抖
 * @param {Function} fn 目标函数
 * @param {number} [delay=300] 延迟毫秒数
 * @returns {Function}
 */
export function debounce(fn, delay = 300) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * 节流
 * @param {Function} fn 目标函数
 * @param {number} [interval=300] 间隔毫秒数
 * @returns {Function}
 */
export function throttle(fn, interval = 300) {
  let lastTime;
  let timer;
  return function (...args) {
    const now = +new Date();
    if (lastTime && now - lastTime < interval) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        lastTime = now;
        fn.apply(this, args);
      }, interval);
    } else {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

/**
 * 睡眠函数
 * @param {number} [delay=1000] 毫秒数
 * @returns {Promise}
 */
export function sleep(delay = 1000) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

/**
 * 异步重试
 * @param {Function} fn 需要重试的异步函数
 * @param {number} [retries=3] 重试次数
 * @param {number} [interval=1000] 重试间隔（毫秒）
 * @returns {Promise}
 */
export function retry(fn, retries = 3, interval = 1000) {
  return new Promise((resolve, reject) => {
    const attempt = (remaining) => {
      fn().then(resolve).catch((err) => {
        if (remaining <= 1) {
          reject(err);
        } else {
          setTimeout(() => attempt(remaining - 1), interval);
        }
      });
    };
    attempt(retries);
  });
}

/**
 * 只执行一次的函数
 * @param {Function} fn
 * @returns {Function}
 */
export function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (called) return result;
    called = true;
    result = fn.apply(this, args);
    return result;
  };
}
