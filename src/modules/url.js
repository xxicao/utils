/**
 * @module url
 * @description URL 工具：查询字符串构建/解析、参数提取、外部链接判断、参数更新、基础 URL 提取
 */

/**
 * 对象转查询字符串
 * @param {Object} params 参数对象
 * @returns {string}
 */
export function buildQueryString(params) {
  if (!params || typeof params !== 'object') return '';
  return Object.keys(params)
    .filter(key => params[key] !== undefined && params[key] !== null && params[key] !== '')
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
}

/**
 * 获取 URL 中指定参数值
 * @param {string} name 参数名
 * @param {string} [url] URL 字符串，默认取当前页面 URL
 * @returns {string|null}
 */
export function getUrlParam(name, url) {
  if (!name) return null;
  const href = url || (typeof window !== 'undefined' ? window.location.href : '');
  const search = href.split('?')[1];
  if (!search) return null;
  const hashSplit = search.split('#')[0];
  const pairs = hashSplit.split('&');
  for (const pair of pairs) {
    const [key, value] = pair.split('=');
    if (decodeURIComponent(key) === name) {
      return decodeURIComponent(value || '');
    }
  }
  return null;
}

/**
 * 判断是否外部链接
 * @param {string} url
 * @returns {boolean}
 */
export function isExternalLink(url) {
  if (!url || typeof url !== 'string') return false;
  return /^https?:\/\//.test(url);
}

/**
 * 更新 URL 参数（不刷新页面）
 * @param {Object} params 要更新或新增的参数
 */
export function updateUrlParams(params) {
  if (!params || typeof params !== 'object') return;
  const url = new URL(window.location.href);
  Object.keys(params).forEach(key => {
    if (params[key] === undefined || params[key] === null || params[key] === '') {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, params[key]);
    }
  });
  window.history.replaceState(null, '', url.toString());
}

/**
 * 获取基础 URL（不含查询参数和哈希）
 * @param {string} [url] URL 字符串，默认取当前页面 URL
 * @returns {string}
 */
export function getBaseUrl(url) {
  const href = url || (typeof window !== 'undefined' ? window.location.href : '');
  return href.split('?')[0].split('#')[0];
}

/**
 * 解析 URL 查询参数
 * @param {string} [url] URL 字符串，默认取当前页面 URL
 * @returns {Object}
 */
export function parseQueryString(url) {
  const pattern = /([^?=&]+)(=([^&#]*))/g;
  const href = url || (typeof window !== 'undefined' ? window.location.href : '');
  const matchList = href.match(pattern) || [];
  const params = {};

  matchList.forEach((match) => {
    const equalIndex = match.indexOf('=');
    params[match.slice(0, equalIndex)] = decodeURIComponent(match.slice(equalIndex + 1));
  });

  return params;
}
