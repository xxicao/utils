import EventEmitter from '../src/modules/events';

describe('events 模块', () => {
  it('应能监听和触发事件', () => {
    const handler = vi.fn();
    EventEmitter.on('test', handler);
    EventEmitter.emit('test');
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('应传递事件参数', () => {
    const handler = vi.fn();
    EventEmitter.on('test-args', handler);
    EventEmitter.emit('test-args', 'hello', 42);
    expect(handler).toHaveBeenCalledWith('hello', 42);
  });

  it('应支持移除事件监听', () => {
    const handler = vi.fn();
    EventEmitter.on('test-remove', handler);
    EventEmitter.off('test-remove', handler);
    EventEmitter.emit('test-remove');
    expect(handler).not.toHaveBeenCalled();
  });

  it('同一事件应支持多个监听器', () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();
    EventEmitter.on('test-multi', handler1);
    EventEmitter.on('test-multi', handler2);
    EventEmitter.emit('test-multi');
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(1);
  });
});
