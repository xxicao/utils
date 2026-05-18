/**
 * @module events
 * @description 事件总线，基于 Node.js events 模块
 * @see https://github.com/browserify/events#readme
 */
import Events from 'events';

const EventEmitter = new Events();

export default EventEmitter;
