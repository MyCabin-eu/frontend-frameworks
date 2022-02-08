(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@cloudinary/html'), require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', '@cloudinary/html', 'react'], factory) :
  (global = global || self, factory(global.react = {}, global.html, global.react));
})(this, (function (exports, html, React) {
  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;

    _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var version = "1.0.1";

  var SDKAnalyticsConstants = {
    sdkSemver: version,
    techVersion: React__default["default"].version,
    sdkCode: 'J'
  };

  var _excluded$1 = ["cldImg", "plugins"];
  /**
   * @mixin ReactSDK
   * @description The Cloudinary React SDK contains components like \<AdvancedImage\> to easily render your media assets from Cloudinary.
   * The SDK also comes with support for optional JS plugins that make the components smart, with features like lazy loading, placeholder, accessibility & responsiveness.
   *
   * @example
   * <caption>
   *  Please note that the order of the plugins is important. See {@link https://cloudinary.com/documentation/sdks/js/frontend-frameworks/index.html#plugin-order|Plugin Order} for more details.
   * </caption>
   * // Example
   * import {CloudinaryImage} from "@cloudinary/url-gen/assets/CloudinaryImage";
   * import {
   *  AdvancedImage,
   *  accessibility,
   *  responsive,
   *  lazyload,
   *  placeholder
   * } from '@cloudinary/react';
   *
   * const App = () => {
   *
   * const myCld = new Cloudinary({ cloudName: 'demo'});
   * let img = myCld().image('sample');
   *
   *   return (
   *      <div>
   *         <div style={{height: "1000px"}}/>
   *         <AdvancedImage
   *            cldImg={img}
   *            plugins={[lazyload(), responsive(100), placeholder()]}
   *         />
   *      </div>
   *   )
   * };
   *
   *
   *
   *
   *
   */

  /**
   * @memberOf ReactSDK
   * @type {Component}
   * @description The Cloudinary image component.
   * @prop {CloudinaryImage} cldImg Generated by @cloudinary/url-gen
   * @prop {Plugins} plugins Advanced image component plugins accessibility(), responsive(), lazyload(), placeholder()
   */

  var AdvancedImage = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose(AdvancedImage, _React$Component);

    function AdvancedImage(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.imageRef = /*#__PURE__*/React__default["default"].createRef();
      return _this;
    }
    /**
     * On mount, creates a new HTMLLayer instance and initializes with ref to img element,
     * user generated cloudinaryImage and the plugins to be used.
     */


    var _proto = AdvancedImage.prototype;

    _proto.componentDidMount = function componentDidMount() {
      this.htmlLayerInstance = new html.HtmlImageLayer(this.imageRef.current, this.props.cldImg, this.props.plugins, SDKAnalyticsConstants);
    }
    /**
     * On update, we cancel running plugins and update image instance with the state of user
     * cloudinaryImage and the state of plugins.
     */
    ;

    _proto.componentDidUpdate = function componentDidUpdate() {
      html.cancelCurrentlyRunningPlugins(this.htmlLayerInstance.htmlPluginState); // call html layer to update the dom again with plugins and reset toBeCanceled

      this.htmlLayerInstance.update(this.props.cldImg, this.props.plugins, SDKAnalyticsConstants);
    }
    /**
     * On unmount, we cancel the currently running plugins.
     */
    ;

    _proto.componentWillUnmount = function componentWillUnmount() {
      // Safely cancel running events on unmount.
      html.cancelCurrentlyRunningPlugins(this.htmlLayerInstance.htmlPluginState);
    };

    _proto.render = function render() {
      var _this$props = this.props,
          otherProps = _objectWithoutPropertiesLoose(_this$props, _excluded$1);

      if (html.isBrowser()) {
        // On client side render
        return /*#__PURE__*/React__default["default"].createElement("img", Object.assign({
          suppressHydrationWarning: true
        }, otherProps, {
          ref: this.imageRef
        }));
      } else {
        // on server side render
        var src = html.serverSideSrc(this.props.plugins, this.props.cldImg);
        return /*#__PURE__*/React__default["default"].createElement("img", Object.assign({}, otherProps, {
          src: src
        }));
      }
    };

    return AdvancedImage;
  }(React__default["default"].Component);

  var _excluded = ["cldVid", "plugins", "sources", "innerRef"];
  var VIDEO_ATTRIBUTES_KEYS = ['controls', 'loop', 'muted', 'poster', 'preload', 'autoplay', 'playsinline'];
  /**
   * @memberOf ReactSDK
   * @type {Component}
   * @description The Cloudinary video component.
   * @prop {CloudinaryVideo} transformation Generated by @cloudinary/url-gen
   * @prop {Plugins} plugins Advanced image component plugins lazyload()
   * @prop videoAttributes Optional attributes include controls, loop, muted, poster, preload, autoplay
   * @prop videoEvents Optional video events include play, loadstart, playing, error, ended
   * @prop {VideoSources} sources Optional sources to generate
   * @example
   *  <caption>
   *  Using custom defined resources.
   * </caption>
   * const vid = new CloudinaryVideo('dog', {cloudName: 'demo'});
   * const videoEl = useRef();
   * const sources = [
   *  {
   *    type: 'mp4',
   *    codecs: ['vp8', 'vorbis'],
   *    transcode: videoCodec(auto())
   *  },
   *  {
   *    type: 'webm',
   *    codecs: ['avc1.4D401E', 'mp4a.40.2'],
   *    videoCodec: videoCodec(auto())
   *  }];
   *
   * return <AdvancedVideo cldVid={vid} sources={sources} ref={videoEl} controls />
   */

  var AdvancedVideo = /*#__PURE__*/function (_Component) {
    _inheritsLoose(AdvancedVideo, _Component);

    function AdvancedVideo(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.videoRef = /*#__PURE__*/React.createRef();
      _this.attachRef = _this.attachRef.bind(_assertThisInitialized(_this));
      return _this;
    }
    /**
     * On mount, creates a new HTMLVideoLayer instance and initializes with ref to video element,
     * user generated cloudinaryVideo and the plugins to be used.
     */


    var _proto = AdvancedVideo.prototype;

    _proto.componentDidMount = function componentDidMount() {
      this.htmlVideoLayerInstance = new html.HtmlVideoLayer(this.videoRef && this.videoRef.current, this.props.cldVid, this.props.sources, this.props.plugins, this.getVideoAttributes());
    }
    /**
     * On update, we cancel running plugins and update the video instance if the src
     * was changed.
     */
    ;

    _proto.componentDidUpdate = function componentDidUpdate() {
      html.cancelCurrentlyRunningPlugins(this.htmlVideoLayerInstance.htmlPluginState); // call html layer to update the dom again with plugins and reset toBeCanceled

      this.htmlVideoLayerInstance.update(this.props.cldVid, this.props.sources, this.props.plugins, this.getVideoAttributes());
    }
    /**
     * On unmount, we cancel the currently running plugins.
     */
    ;

    _proto.componentWillUnmount = function componentWillUnmount() {
      // safely cancel running events on unmount
      html.cancelCurrentlyRunningPlugins(this.htmlVideoLayerInstance.htmlPluginState);
    }
    /**
     * Returns video attributes.
     */
    ;

    _proto.getVideoAttributes = function getVideoAttributes() {
      var _this2 = this;

      var result = {};
      VIDEO_ATTRIBUTES_KEYS.forEach(function (key) {
        if (key in _this2.props) {
          result[key] = _this2.props[key];
        }
      });
      return result;
    }
    /**
     * Attach both this.videoRef and props.innerRef as ref to the given element.
     * @param element - the element to attach a ref to
     */
    ;

    _proto.attachRef = function attachRef(element) {
      this.videoRef.current = element;
      var innerRef = this.props.innerRef;

      if (innerRef) {
        if (innerRef instanceof Function) {
          innerRef(element);
        } else {
          innerRef.current = element;
        }
      }
    };

    _proto.render = function render() {
      var _this$props = this.props,
          videoEvents = _objectWithoutPropertiesLoose(_this$props, _excluded);

      return /*#__PURE__*/React__default["default"].createElement("video", Object.assign({}, videoEvents, {
        ref: this.attachRef
      }));
    };

    return AdvancedVideo;
  }(React.Component);

  Object.defineProperty(exports, 'accessibility', {
    enumerable: true,
    get: function () { return html.accessibility; }
  });
  Object.defineProperty(exports, 'lazyload', {
    enumerable: true,
    get: function () { return html.lazyload; }
  });
  Object.defineProperty(exports, 'placeholder', {
    enumerable: true,
    get: function () { return html.placeholder; }
  });
  Object.defineProperty(exports, 'responsive', {
    enumerable: true,
    get: function () { return html.responsive; }
  });
  exports.AdvancedImage = AdvancedImage;
  exports.AdvancedVideo = AdvancedVideo;

}));
//# sourceMappingURL=index.umd.js.map