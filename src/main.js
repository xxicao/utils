/**
 * @xxicao/utils - 前端常用工具方法库
 * @description 轻量、零依赖（除 events），开箱即用
 * @version 1.3.0
 */
import cookie from './modules/cookie';
import device from './modules/device';
import dom from './modules/dom';
import * as fn from './modules/fn';
import Events from './modules/events';
import * as file from './modules/file';
import * as type from './modules/type';
import storage from './modules/storage';
import * as url from './modules/url';
import * as number from './modules/number';
import * as string from './modules/string';
import * as date from './modules/date';
import * as object from './modules/object';
import * as mask from './modules/mask';

export default { ...cookie, ...device, ...dom, ...file, ...fn, ...type, ...storage, ...url, ...number, ...string, ...date, ...object, ...mask, Events }
