import { formatDate, timeAgo } from '../src/modules/date';

describe('date 模块', () => {
  describe('formatDate', () => {
    it('应按默认格式格式化时间戳', () => {
      const ts = new Date(2024, 0, 15, 10, 30, 0).getTime();
      const result = formatDate(ts);
      expect(result).toBe('2024-1-15');
    });

    it('应支持自定义格式', () => {
      const ts = new Date(2024, 0, 15, 10, 30, 45).getTime();
      const result = formatDate(ts, '{y}-{m}-{d} {h}:{i}:{s}');
      expect(result).toBe('2024-1-15 10:30:45');
    });

    it('应支持补零格式 {mm} {dd}', () => {
      const ts = new Date(2024, 0, 5, 8, 5, 3).getTime();
      const result = formatDate(ts, '{yyyy}-{mm}-{dd}');
      expect(result).toBe('2024-01-05');
    });

    it('不传时间戳应返回 "-"', () => {
      expect(formatDate()).toBe('-');
    });

    it('传入非数字应返回 "-"', () => {
      expect(formatDate('abc')).toBe('-');
    });

    it('应支持 {a} 星期', () => {
      const ts = new Date(2024, 0, 15).getTime(); // 2024-01-15 是周一
      const result = formatDate(ts, '{a}');
      expect(result).toBe('1');
    });
  });

  describe('timeAgo', () => {
    it('1 分钟内应返回 "刚刚"', () => {
      const ts = Date.now() - 30 * 1000;
      expect(timeAgo(ts)).toBe('刚刚');
    });

    it('5 分钟前应返回 "5分钟前"', () => {
      const ts = Date.now() - 5 * 60 * 1000;
      expect(timeAgo(ts)).toBe('5分钟前');
    });

    it('2 小时前应返回 "2小时前"', () => {
      const ts = Date.now() - 2 * 60 * 60 * 1000;
      expect(timeAgo(ts)).toBe('2小时前');
    });

    it('3 天前应返回 "3天前"', () => {
      const ts = Date.now() - 3 * 24 * 60 * 60 * 1000;
      expect(timeAgo(ts)).toBe('3天前');
    });

    it('未来时间应返回 "刚刚"', () => {
      const ts = Date.now() + 60000;
      expect(timeAgo(ts)).toBe('刚刚');
    });

    it('空值应返回空字符串', () => {
      expect(timeAgo()).toBe('');
      expect(timeAgo(null)).toBe('');
    });

    it('非数字应返回空字符串', () => {
      expect(timeAgo('abc')).toBe('');
    });
  });
});
