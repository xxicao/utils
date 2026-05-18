/**
 * @module date
 * @description 日期工具：时间戳格式化、时间距离描述
 */

/**
 * 时间戳格式化
 * @param {number} timestamp 时间戳（毫秒）
 * @param {string} [format='{y}-{m}-{d}'] 格式模板，支持 {y}{m}{d}{h}{i}{s}{a}
 * @returns {string}
 */
export function formatDate(timestamp, format = '{y}-{m}-{d}') {
  if (!timestamp || typeof timestamp !== 'number') {
    console.warn('请传入要格式化的时间戳');
    return '-';
  }
  const date = new Date(timestamp);
  const dateValues = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  return format.replace(/{(y|m|d|h|i|s|a)+}/g, (matched, key) => {
    let value = dateValues[key];
    // 两位占位时补零，如 {mm} {dd}
    if (matched.length > 3 && value < 10) {
      value = `0${value}`;
    }
    return value || 0;
  });
}

/**
 * 计算时间距离描述（如"3分钟前"）
 * @param {number} timestamp 时间戳（毫秒）
 * @returns {string}
 */
export function timeAgo(timestamp) {
  if (!timestamp || typeof timestamp !== 'number') return '';
  const diff = Date.now() - timestamp;
  if (diff < 0) return '刚刚';
  const MINUTE = 60 * 1000;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const MONTH = 30 * DAY;
  const YEAR = 365 * DAY;
  if (diff < MINUTE) return '刚刚';
  if (diff < HOUR) return Math.floor(diff / MINUTE) + '分钟前';
  if (diff < DAY) return Math.floor(diff / HOUR) + '小时前';
  if (diff < MONTH) return Math.floor(diff / DAY) + '天前';
  if (diff < YEAR) return Math.floor(diff / MONTH) + '个月前';
  return Math.floor(diff / YEAR) + '年前';
}
