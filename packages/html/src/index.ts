/**
 * Import and export all needed types
 */
export { HtmlImageLayer } from './layers/htmlImageLayer';
export { HtmlVideoLayer } from './layers/htmlVideoLayer';
export {responsive} from './plugins/responsive';
export {lazyload} from './plugins/lazyload';
export {accessibility} from './plugins/accessibility';
export {placeholder} from './plugins/placeholder';
export {isBrowser} from './utils/isBrowser';
export {serverSideSrc} from './utils/serverSideSrc';
export {Plugins, VideoSources, PictureSources} from './types';
export {cancelCurrentlyRunningPlugins} from './utils/cancelCurrentlyRunningPlugins';
