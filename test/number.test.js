import * as number from '../src/modules/number';

describe('number 模块', () => {
  describe('padZero', () => {
    it('应将个位数补零', () => {
      expect(number.padZero(1)).toBe('01');
      expect(number.padZero(5)).toBe('05');
    });

    it('应将两位数保持不变', () => {
      expect(number.padZero(10)).toBe('10');
      expect(number.padZero(99)).toBe('99');
    });

    it('应支持自定义长度', () => {
      expect(number.padZero(7, 3)).toBe('007');
    });

    it('应处理 0', () => {
      expect(number.padZero(0)).toBe('00');
    });
  });

  describe('clamp', () => {
    it('值在范围内应返回原值', () => {
      expect(number.clamp(5, 1, 10)).toBe(5);
    });

    it('值小于最小值应返回最小值', () => {
      expect(number.clamp(-1, 0, 10)).toBe(0);
    });

    it('值大于最大值应返回最大值', () => {
      expect(number.clamp(15, 0, 10)).toBe(10);
    });

    it('值等于边界时应返回原值', () => {
      expect(number.clamp(0, 0, 10)).toBe(0);
      expect(number.clamp(10, 0, 10)).toBe(10);
    });
  });

  describe('randomInt', () => {
    it('应返回范围内的整数', () => {
      for (let i = 0; i < 50; i++) {
        const result = number.randomInt(1, 10);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(10);
        expect(Number.isInteger(result)).toBe(true);
      }
    });

    it('范围相同时应返回该值', () => {
      expect(number.randomInt(5, 5)).toBe(5);
    });

    it('应支持负数范围', () => {
      const result = number.randomInt(-10, -1);
      expect(result).toBeGreaterThanOrEqual(-10);
      expect(result).toBeLessThanOrEqual(-1);
    });
  });

  describe('formatPercent', () => {
    it('应格式化百分比（默认总数为 1）', () => {
      expect(number.formatPercent(0.5)).toBe('50.00%');
    });

    it('应指定总数计算百分比', () => {
      expect(number.formatPercent(1, 4)).toBe('25.00%');
    });

    it('应支持自定义小数位数', () => {
      expect(number.formatPercent(1, 3, 0)).toBe('33%');
    });

    it('总数为 0 时应返回 0%', () => {
      expect(number.formatPercent(1, 0)).toBe('0%');
    });
  });

  describe('addLargeNumbers', () => {
    it('应正确进行大数相加', () => {
      expect(number.addLargeNumbers('999', '1')).toBe('1000');
    });

    it('应处理不等长数字', () => {
      expect(number.addLargeNumbers('12345', '678')).toBe('13023');
    });

    it('应处理两个 0', () => {
      expect(number.addLargeNumbers('0', '0')).toBe('0');
    });

    it('应处理超出 Number 精度的大数', () => {
      const a = '9007199254740991';
      const b = '1';
      expect(number.addLargeNumbers(a, b)).toBe('9007199254740992');
    });

    it('传入非数字字符串应返回 undefined', () => {
      expect(number.addLargeNumbers('abc', '123')).toBeUndefined();
    });

    it('传入空字符串应返回对应值', () => {
      expect(number.addLargeNumbers('', '123')).toBe('123');
    });
  });

  describe('formatMoney', () => {
    it('应格式化千分位，默认 2 位小数', () => {
      expect(number.formatMoney(1234567.89)).toBe('1,234,567.89');
    });

    it('应支持自定义小数位数', () => {
      expect(number.formatMoney(1234567.891, 3)).toBe('1,234,567.891');
    });

    it('0 位小数应不显示小数部分', () => {
      expect(number.formatMoney(1234567, 0)).toBe('1,234,567');
    });

    it('传入字符串数字应正常工作', () => {
      expect(number.formatMoney('1234567.89')).toBe('1,234,567.89');
    });

    it('NaN 应返回空字符串', () => {
      expect(number.formatMoney('abc')).toBe('');
    });
  });
});
