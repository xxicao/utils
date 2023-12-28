import cookie from './modules/cookie';
import ua from './modules/ua';
import utils from './modules/utils';
import dom from './modules/dom';
import * as fun from './modules/function';
import Events from './modules/events';
import * as file from './modules/file'
import * as type from './modules/type'

export default { ...cookie, ...ua, ...utils, ...dom, ...file, ...fun, ...type, Events }