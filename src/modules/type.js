/**
 * @module type
 * @description 类型判断：基本类型、对象、数组、布尔、纯对象、空值、Promise、邮箱
 */
const toString = Object.prototype.toString;

/**
 * 是否有值（排除 undefined 和 null）
 * @param {*} val
 * @returns {boolean}
 */
export function isDef(val) {
  return val !== undefined && val !== null;
}

/**
 * 判断数据类型
 * @param {*} val
 * @param {string} type
 * @returns {boolean}
 */
export function is(val, type) {
  return toString.call(val) === `[object ${type}]`;
}

/**
 * 是否字符串
 * @param {*} val
 * @returns {boolean}
 */
export function isString(val) {
  return is(val, 'String');
}

/**
 * 是否数字
 * @param {*} val
 * @returns {boolean}
 */
export function isNumber(val) {
  return is(val, 'Number');
}

/**
 * 是否对象
 * @param {*} val
 * @returns {boolean}
 */
export function isObject(val) {
  return val !== null && is(val, 'Object');
}

/**
 * 是否数组
 * @param {*} val
 * @returns {boolean}
 */
export function isArray(val) {
  return val && Array.isArray(val);
}

/**
 * 是否函数
 * @param {*} val
 * @returns {boolean}
 */
export function isFunction(val) {
  return typeof val === 'function';
}

/**
 * 是否布尔值
 * @param {*} val
 * @returns {boolean}
 */
export function isBoolean(val) {
  return is(val, 'Boolean');
}

/**
 * 是否纯对象（通过 {} 或 new Object 创建）
 * @param {*} val
 * @returns {boolean}
 */
export function isPlainObject(val) {
  if (!isObject(val)) return false;
  const proto = Object.getPrototypeOf(val);
  return proto === null || proto === Object.prototype;
}

/**
 * 是否为空（空字符串、空数组、空对象、null、undefined）
 * @param {*} val
 * @returns {boolean}
 */
export function isEmpty(val) {
  if (val === undefined || val === null) return true;
  if (isString(val) || isArray(val)) return val.length === 0;
  if (isPlainObject(val)) return Object.keys(val).length === 0;
  return false;
}

/**
 * 是否 Promise 对象
 * @param {*} val
 * @returns {boolean}
 */
export function isPromise(val) {
  return isDef(val) && isFunction(val.then) && isFunction(val.catch);
}

/**
 * 邮箱格式校验
 * @param {string} email
 * @returns {boolean}
 */
export function isEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}
