import { sanitizeXSS, randomString, generateUUID } from '../src/modules/string';

describe('string 模块', () => {
  describe('sanitizeXSS', () => {
    it('应转义 < > 字符', () => {
      const result = sanitizeXSS('<script>alert(1)</script>');
      expect(result).not.toContain('<');
      expect(result).not.toContain('>');
    });

    it('应转义引号', () => {
      const result = sanitizeXSS('test"val\'ue');
      expect(result).not.toContain('"');
      expect(result).not.toContain('\'');
    });

    it('空字符串应原样返回', () => {
      expect(sanitizeXSS('')).toBe('');
    });

    it('null 应原样返回', () => {
      expect(sanitizeXSS(null)).toBeNull();
    });

    it('普通文本应不做修改', () => {
      expect(sanitizeXSS('hello world')).toBe('hello world');
    });
  });

  describe('randomString', () => {
    it('默认应生成 32 位字符串', () => {
      const result = randomString();
      expect(result.length).toBe(32);
    });

    it('应生成指定长度的字符串', () => {
      expect(randomString(8).length).toBe(8);
      expect(randomString(64).length).toBe(64);
    });

    it('每次生成的字符串应不同', () => {
      const a = randomString();
      const b = randomString();
      expect(a).not.toBe(b);
    });

    it('应只包含合法字符', () => {
      const result = randomString(100);
      expect(/^[ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678]+$/.test(result)).toBe(true);
    });
  });

  describe('generateUUID', () => {
    it('应生成符合 UUID v4 格式的字符串', () => {
      const uuid = generateUUID();
      expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    });

    it('每次生成的 UUID 应不同', () => {
      const a = generateUUID();
      const b = generateUUID();
      expect(a).not.toBe(b);
    });

    it('应包含 4 个连字符', () => {
      const uuid = generateUUID();
      expect(uuid.split('-').length).toBe(5);
    });
  });
});
