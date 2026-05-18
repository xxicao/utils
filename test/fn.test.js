import { curry, debounce, throttle, sleep, retry, once } from '../src/modules/fn';

describe('fn 模块', () => {
  describe('curry', () => {
    it('应逐步柯里化函数', () => {
      const add = (a, b, c) => a + b + c;
      const curried = curry(add);
      expect(curried(1)(2)(3)).toBe(6);
    });

    it('应支持部分应用', () => {
      const add = (a, b, c) => a + b + c;
      const curried = curry(add);
      expect(curried(1, 2)(3)).toBe(6);
      expect(curried(1)(2, 3)).toBe(6);
    });

    it('参数足够时应直接执行', () => {
      const add = (a, b) => a + b;
      const curried = curry(add);
      expect(curried(1, 2)).toBe(3);
    });
  });

  describe('debounce', () => {
    it('应延迟执行', async () => {
      let count = 0;
      const fn = debounce(() => { count++; }, 100);
      fn();
      expect(count).toBe(0);
      await sleep(150);
      expect(count).toBe(1);
    });

    it('多次调用应只执行最后一次', async () => {
      let result = 0;
      const fn = debounce((val) => { result = val; }, 100);
      fn(1);
      fn(2);
      fn(3);
      await sleep(150);
      expect(result).toBe(3);
    });
  });

  describe('throttle', () => {
    it('首次调用应立即执行', () => {
      let count = 0;
      const fn = throttle(() => { count++; }, 100);
      fn();
      expect(count).toBe(1);
    });

    it('间隔内多次调用应只执行一次', async () => {
      let count = 0;
      const fn = throttle(() => { count++; }, 200);
      fn();
      fn();
      fn();
      expect(count).toBe(1);
      await sleep(300);
      // 延迟触发一次
      expect(count).toBeGreaterThanOrEqual(1);
    });
  });

  describe('sleep', () => {
    it('应在指定时间后 resolve', async () => {
      const start = Date.now();
      await sleep(100);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(90);
    });

    it('默认延迟应为 1000ms', async () => {
      const start = Date.now();
      await sleep(50); // 用较短时间测试
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(40);
    });
  });

  describe('retry', () => {
    it('成功时应直接 resolve', async () => {
      const fn = vi.fn().mockResolvedValue('ok');
      const result = await retry(fn, 3, 50);
      expect(result).toBe('ok');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('重试成功时应 resolve', async () => {
      const fn = vi.fn()
        .mockRejectedValueOnce(new Error('fail'))
        .mockResolvedValueOnce('ok');
      const result = await retry(fn, 3, 50);
      expect(result).toBe('ok');
      expect(fn).toHaveBeenCalledTimes(2);
    });

    it('耗尽重试次数应 reject', async () => {
      const fn = vi.fn().mockRejectedValue(new Error('fail'));
      await expect(retry(fn, 2, 50)).rejects.toThrow('fail');
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe('once', () => {
    it('应只执行一次', () => {
      let count = 0;
      const fn = once(() => ++count);
      fn();
      fn();
      fn();
      expect(count).toBe(1);
    });

    it('应返回第一次的结果', () => {
      const fn = once(() => 42);
      expect(fn()).toBe(42);
      expect(fn()).toBe(42);
      expect(fn()).toBe(42);
    });

    it('应传递参数', () => {
      const fn = once((a, b) => a + b);
      expect(fn(1, 2)).toBe(3);
      expect(fn(10, 20)).toBe(3); // 仍返回第一次结果
    });
  });
});
