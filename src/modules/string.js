/**
 * @module string
 * @description 字符串工具：XSS 转义、随机字符串、UUID 生成
 */

/**
 * XSS 标签净化转义
 * @param {string} str
 * @returns {string}
 */
export function sanitizeXSS(str) {
  if (!str) return str;
  let result = str;
  // 先解码所有已编码的内容
  for (; result !== decodeURIComponent(result);) result = decodeURIComponent(result);
  // 替换危险字符为安全编码
  const dangerPatterns = ['<', '>', '\'', '"', '%3c', '%3e', '%27', '%22', '%253c', '%253e', '%2527', '%2522'];
  const safeReplacements = ['&#x3c;', '&#x3e;', '&#x27;', '&#x22;', '%26%23x3c%3B', '%26%23x3e%3B', '%26%23x27%3B', '%26%23x22%3B', '%2526%2523x3c%253B', '%2526%2523x3e%253B', '%2526%2523x27%253B', '%2526%2523x22%253B'];
  for (let i = 0; i < dangerPatterns.length; i++) {
    result = result.replace(new RegExp(dangerPatterns[i], 'gi'), safeReplacements[i]);
  }
  return result;
}

/**
 * 生成随机字符串
 * @param {number} [length=32] 字符串长度
 * @returns {string}
 */
export function randomString(length) {
  const len = length || 32;
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  let result = '';
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * 生成 UUID v4
 * @returns {string}
 */
export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
