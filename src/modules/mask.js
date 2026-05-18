/**
 * @module mask
 * @description 数据脱敏：手机号、身份证号等敏感信息遮蔽
 */

/**
 * 手机号脱敏
 * @param {string} phone 手机号
 * @returns {string}
 */
export function maskPhone(phone) {
  if (!phone || typeof phone !== 'string') return '';
  return phone.replace(/^(1[3-9]\d)\d{4}(\d{4})$/, '$1****$2');
}

/**
 * 身份证号脱敏
 * @param {string} idCard 身份证号
 * @returns {string}
 */
export function idCardMask(idCard) {
  if (!idCard || typeof idCard !== 'string') return '';
  if (idCard.length < 8) return idCard;
  return idCard.slice(0, 4) + '**********' + idCard.slice(-4);
}
