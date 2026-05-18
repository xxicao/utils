import { maskPhone, idCardMask } from '../src/modules/mask';

describe('mask 模块', () => {
  describe('maskPhone', () => {
    it('应正确脱敏手机号', () => {
      expect(maskPhone('13812345678')).toBe('138****5678');
    });

    it('应处理不同号段', () => {
      expect(maskPhone('19900001111')).toBe('199****1111');
    });

    it('空字符串应返回空', () => {
      expect(maskPhone('')).toBe('');
    });

    it('非字符串应返回空', () => {
      expect(maskPhone(13812345678)).toBe('');
    });

    it('不符合手机号格式的应原样返回', () => {
      expect(maskPhone('12345')).toBe('12345');
    });
  });

  describe('idCardMask', () => {
    it('应正确脱敏 18 位身份证号', () => {
      expect(idCardMask('110101199001011234')).toBe('1101**********1234');
    });

    it('应正确脱敏 15 位身份证号', () => {
      expect(idCardMask('110101900101123')).toBe('1101**********1123');
    });

    it('空字符串应返回空', () => {
      expect(idCardMask('')).toBe('');
    });

    it('非字符串应返回空', () => {
      expect(idCardMask(Number('110101199001011234'))).toBe('');
    });

    it('长度不足 8 位应原样返回', () => {
      expect(idCardMask('1234567')).toBe('1234567');
    });
  });
});
