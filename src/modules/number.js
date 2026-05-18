/**
 * @module number
 * @description 数字工具：补零、范围限制、随机整数、百分比格式化、大数相加、金额格式化
 */

/**
 * 数字补零
 * @param {number} num 数字
 * @param {number} [length=2] 目标长度
 * @returns {string}
 */
export function padZero(num, length) {
  const len = length || 2;
  return String(num).padStart(len, '0');
}

/**
 * 限制数字在指定范围内
 * @param {number} value 目标值
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * 生成指定范围内的随机整数
 * @param {number} min 最小值（含）
 * @param {number} max 最大值（含）
 * @returns {number}
 */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 格式化百分比
 * @param {number} value 数值
 * @param {number} [total=1] 总数
 * @param {number} [digits=2] 保留小数位数
 * @returns {string}
 */
export function formatPercent(value, total, digits) {
  const t = total !== undefined ? total : 1;
  const d = digits !== undefined ? digits : 2;
  if (t === 0) return '0%';
  const percent = (value / t) * 100;
  return percent.toFixed(d) + '%';
}

/**
 * 大数相加（避免精度丢失）
 * @param {string} a
 * @param {string} b
 * @returns {string|undefined}
 */
export function addLargeNumbers(a, b) {
  const isValidNumber = num => (typeof num === 'string' && !Number.isNaN(Number(num)));
  if (!isValidNumber(a) || !isValidNumber(b)) return;
  let maxLen = Math.max(a.length, b.length);
  a = a.padStart(maxLen, 0);
  b = b.padStart(maxLen, 0);
  let carry = 0;
  let sum = '';
  for (let i = maxLen - 1; i >= 0; i--) {
    const digitSum = parseInt(a[i], 10) + parseInt(b[i], 10) + carry;
    carry = Math.floor(digitSum / 10);
    sum = digitSum % 10 + sum;
  }
  if (carry === 1) {
    sum = '1' + sum;
  }
  return sum;
}

/**
 * 金额格式化（千分位）
 * @param {number|string} amount 金额
 * @param {number} [decimalDigits=2] 保留小数位数
 * @returns {string}
 */
export function formatMoney(amount, decimalDigits) {
  const digits = decimalDigits !== undefined ? decimalDigits : 2;
  const num = Number(amount);
  if (isNaN(num)) return '';
  const fixed = num.toFixed(digits);
  const parts = fixed.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}
