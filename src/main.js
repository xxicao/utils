import cookie from './modules/cookie';
import ua from './modules/ua';
import utils from './modules/utils';
import dom from './modules/dom';
import { curry, debounce, throttle} from './modules/function';
import EventEmitter from './modules/events';

export default {...cookie, ...ua, ...utils, ...dom, curry, debounce, throttle, EventEmitter}