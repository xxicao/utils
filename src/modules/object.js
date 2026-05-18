/**
 * @module object
 * @description 对象工具：深拷贝
 */

/**
 * 深拷贝
 * @param {*} source
 * @returns {*}
 */
export function deepClone(source) {
  if (source === null || typeof source !== 'object') {
    return source;
  }
  if (source instanceof Date) {
    return new Date(source.getTime());
  }
  if (source instanceof RegExp) {
    return new RegExp(source.source, source.flags);
  }
  if (Array.isArray(source)) {
    return source.map(item => deepClone(item));
  }
  const target = {};
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = deepClone(source[key]);
    }
  }
  return target;
}
