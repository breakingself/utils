(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.DTableUtils = {}));
})(this, (function (exports) { 'use strict';

  var CellType = {
    DEFAULT: 'default',
    NUMBER: 'number',
    TEXT: 'text',
    CHECKBOX: 'checkbox',
    DATE: 'date',
    SINGLE_SELECT: 'single-select',
    LONG_TEXT: 'long-text',
    IMAGE: 'image',
    FILE: 'file',
    MULTIPLE_SELECT: 'multiple-select',
    COLLABORATOR: 'collaborator',
    LINK: 'link',
    FORMULA: 'formula',
    LINK_FORMULA: 'link-formula',
    CREATOR: 'creator',
    CTIME: 'ctime',
    LAST_MODIFIER: 'last-modifier',
    MTIME: 'mtime',
    GEOLOCATION: 'geolocation',
    AUTO_NUMBER: 'auto-number',
    URL: 'url',
    EMAIL: 'email',
    DURATION: 'duration',
    BUTTON: 'button',
    RATE: 'rate',
    DIGITAL_SIGN: 'digital-sign',
    // formula | link-formula column calculate result type
    BOOL: 'bool',
    STRING: 'string'
  };

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var _DURATION_DECIMAL_DIG;
  var DEFAULT_NUMBER_FORMAT = 'number';
  var DURATION_FORMATS_MAP = {
    H_MM: 'h:mm',
    H_MM_SS: 'h:mm:ss',
    H_MM_SS_S: 'h:mm:ss.s',
    H_MM_SS_SS: 'h:mm:ss.ss',
    H_MM_SS_SSS: 'h:mm:ss.sss'
  };
  var DURATION_FORMATS = [{
    name: DURATION_FORMATS_MAP.H_MM,
    type: DURATION_FORMATS_MAP.H_MM
  }, {
    name: DURATION_FORMATS_MAP.H_MM_SS,
    type: DURATION_FORMATS_MAP.H_MM_SS
  }];
  var DURATION_DECIMAL_DIGITS = (_DURATION_DECIMAL_DIG = {}, _defineProperty(_DURATION_DECIMAL_DIG, DURATION_FORMATS_MAP.H_MM, 0), _defineProperty(_DURATION_DECIMAL_DIG, DURATION_FORMATS_MAP.H_MM_SS, 0), _defineProperty(_DURATION_DECIMAL_DIG, DURATION_FORMATS_MAP.H_MM_SS_S, 1), _defineProperty(_DURATION_DECIMAL_DIG, DURATION_FORMATS_MAP.H_MM_SS_SS, 2), _defineProperty(_DURATION_DECIMAL_DIG, DURATION_FORMATS_MAP.H_MM_SS_SSS, 3), _DURATION_DECIMAL_DIG);

  var _FORMULA_COLUMN_TYPES;
  var FORMULA_COLUMN_TYPES_MAP = (_FORMULA_COLUMN_TYPES = {}, _defineProperty(_FORMULA_COLUMN_TYPES, CellType.FORMULA, true), _defineProperty(_FORMULA_COLUMN_TYPES, CellType.LINK_FORMULA, true), _FORMULA_COLUMN_TYPES);

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var dayjs_min$1 = {exports: {}};

  dayjs_min$1.exports;

  (function (module, exports) {
  	!function(t,e){module.exports=e();}(commonjsGlobal,(function(){var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return +(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return {M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else {var i=t.name;v[i]=t,r=i;}return !n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t);}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init();},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},m.$utils=function(){return O},m.isValid=function(){return !(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d;}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])};})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w})); 
  } (dayjs_min$1, dayjs_min$1.exports));

  var dayjs_minExports = dayjs_min$1.exports;
  var dayjs_min = /*@__PURE__*/getDefaultExportFromCjs(dayjs_minExports);

  var utc$1 = {exports: {}};

  utc$1.exports;

  (function (module, exports) {
  	!function(t,i){module.exports=i();}(commonjsGlobal,(function(){var t="minute",i=/[+-]\d\d(?::?\d\d)?/g,e=/([+-]|\d\d)/g;return function(s,f,n){var u=f.prototype;n.utc=function(t){var i={date:t,utc:!0,args:arguments};return new f(i)},u.utc=function(i){var e=n(this.toDate(),{locale:this.$L,utc:!0});return i?e.add(this.utcOffset(),t):e},u.local=function(){return n(this.toDate(),{locale:this.$L,utc:!1})};var o=u.parse;u.parse=function(t){t.utc&&(this.$u=!0),this.$utils().u(t.$offset)||(this.$offset=t.$offset),o.call(this,t);};var r=u.init;u.init=function(){if(this.$u){var t=this.$d;this.$y=t.getUTCFullYear(),this.$M=t.getUTCMonth(),this.$D=t.getUTCDate(),this.$W=t.getUTCDay(),this.$H=t.getUTCHours(),this.$m=t.getUTCMinutes(),this.$s=t.getUTCSeconds(),this.$ms=t.getUTCMilliseconds();}else r.call(this);};var a=u.utcOffset;u.utcOffset=function(s,f){var n=this.$utils().u;if(n(s))return this.$u?0:n(this.$offset)?a.call(this):this.$offset;if("string"==typeof s&&null===(s=function(t){void 0===t&&(t="");var s=t.match(i);if(!s)return null;var f=(""+s[0]).match(e)||["-",0,0],n=f[0],u=60*+f[1]+ +f[2];return 0===u?0:"+"===n?u:-u}(s)))return this;var u=Math.abs(s)<=16?60*s:s,o=this;if(f)return o.$offset=u,o.$u=0===s,o;if(0!==s){var r=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(o=this.local().add(u+r,t)).$offset=u,o.$x.$localOffset=r;}else o=this.utc();return o};var h=u.format;u.format=function(t){var i=t||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return h.call(this,i)},u.valueOf=function(){var t=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||(new Date).getTimezoneOffset());return this.$d.valueOf()-6e4*t},u.isUTC=function(){return !!this.$u},u.toISOString=function(){return this.toDate().toISOString()},u.toString=function(){return this.toDate().toUTCString()};var l=u.toDate;u.toDate=function(t){return "s"===t&&this.$offset?n(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():l.call(this)};var c=u.diff;u.diff=function(t,i,e){if(t&&this.$u===t.$u)return c.call(this,t,i,e);var s=this.local(),f=n(t).local();return c.call(s,f,i,e)};}})); 
  } (utc$1, utc$1.exports));

  var utcExports = utc$1.exports;
  var utc = /*@__PURE__*/getDefaultExportFromCjs(utcExports);

  var _DURATION_ZERO_DISPLA;
  var DURATION_ZERO_DISPLAY = (_DURATION_ZERO_DISPLA = {}, _defineProperty(_DURATION_ZERO_DISPLA, DURATION_FORMATS_MAP.H_MM, '0:00'), _defineProperty(_DURATION_ZERO_DISPLA, DURATION_FORMATS_MAP.H_MM_SS, '0:00'), _defineProperty(_DURATION_ZERO_DISPLA, DURATION_FORMATS_MAP.H_MM_SS_S, '0:00.0'), _defineProperty(_DURATION_ZERO_DISPLA, DURATION_FORMATS_MAP.H_MM_SS_SS, '0:00.00'), _defineProperty(_DURATION_ZERO_DISPLA, DURATION_FORMATS_MAP.H_MM_SS_SSS, '0:00.000'), _DURATION_ZERO_DISPLA);
  var getMathRoundedDuration = function getMathRoundedDuration(num, duration_format) {
    var decimalDigits = DURATION_DECIMAL_DIGITS[duration_format];
    if (decimalDigits < 1) {
      return num;
    }
    var ratio = Math.pow(10, decimalDigits);
    return Math.round(num * ratio) / ratio;
  };
  var getDurationDecimalSuffix = function getDurationDecimalSuffix(duration_format, decimal) {
    if (duration_format === DURATION_FORMATS_MAP.H_MM_SS_S) {
      return decimal === 0 ? '.0' : '';
    }
    if (duration_format === DURATION_FORMATS_MAP.H_MM_SS_SS) {
      if (decimal === 0) {
        return '.00';
      }
      if (decimal < 10) {
        return '0';
      }
      return '';
    }
    if (duration_format === DURATION_FORMATS_MAP.H_MM_SS_SSS) {
      if (decimal === 0) {
        return '.000';
      }
      if (decimal < 10) {
        return '00';
      }
      if (decimal < 100) {
        return '0';
      }
    }
    return '';
  };

  /**
   * format duration to display
   * @param {number} duration
   * @param {object} formats { duration_format, ... }
   */
  var getDurationDisplayString = function getDurationDisplayString(duration, formats) {
    if (!duration && duration !== 0) return '';
    var _ref = formats || {},
      duration_format = _ref.duration_format;
    duration_format = duration_format || DURATION_FORMATS_MAP.H_MM;
    if (DURATION_FORMATS.findIndex(function (format) {
      return format.type === duration_format;
    }) < 0) {
      return '';
    }
    if (duration === 0) {
      return DURATION_ZERO_DISPLAY[duration_format];
    }
    var includeDecimal = duration_format.indexOf('.') > -1;
    var positiveValue = Math.abs(duration);
    if (!includeDecimal) {
      positiveValue = Math.round(positiveValue);
    }
    positiveValue = getMathRoundedDuration(positiveValue, duration_format);
    var decimalParts = String(positiveValue).split('.');
    var decimalPartsLen = decimalParts.length;
    var decimal = 0;
    if (decimalPartsLen > 1) {
      decimal = decimalParts[decimalPartsLen - 1];
      decimal = decimal ? decimal - 0 : 0;
    }
    var decimalDigits = DURATION_DECIMAL_DIGITS[duration_format];
    var decimalSuffix = getDurationDecimalSuffix(duration_format, decimal);
    var hours = parseInt(positiveValue / 3600, 10);
    var minutes = parseInt((positiveValue - hours * 3600) / 60, 10);
    var displayString = duration < 0 ? '-' : '';
    if (duration_format === DURATION_FORMATS_MAP.H_MM) {
      displayString += "".concat(hours, ":").concat(minutes > 9 ? minutes : "0".concat(minutes));
      return displayString;
    }
    var seconds = Number.parseFloat((positiveValue - hours * 3600 - minutes * 60).toFixed(decimalDigits));
    minutes = minutes > 9 ? minutes : "0".concat(minutes);
    seconds = seconds > 9 ? seconds : "0".concat(seconds);
    displayString += "".concat(hours, ":").concat(minutes, ":").concat(seconds).concat(decimalSuffix);
    return displayString;
  };

  /**
   * get digits length of a number
   * @param {number} num Input number
   */
  var digitLength = function digitLength(num) {
    // Get digit length of e
    var eSplit = num.toString().split(/[eE]/);
    var len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
    return len > 0 ? len : 0;
  };

  /**
   * fix wrong data
   * e.g. strip(0.09999999999999998) = 0.1
   */
  var strip = function strip(num) {
    var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 15;
    return +parseFloat(Number(num).toPrecision(precision));
  };

  /**
   * convert decimal to integer.
   * Support scientific notation. If it is a decimal, it will be enlarged to an integer
   * @param {number|string} num
   */
  var float2Fixed = function float2Fixed(num) {
    if (num.toString().indexOf('e') === -1) {
      return Number(num.toString().replace('.', ''));
    }
    var dLen = digitLength(num);
    return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
  };

  /**
   * exact multiplication
   */
  var times = function times(numLeft, numRight) {
    var num1Changed = float2Fixed(numLeft);
    var num2Changed = float2Fixed(numRight);
    var baseNum = digitLength(numLeft) + digitLength(numRight);
    var leftValue = num1Changed * num2Changed;
    return leftValue / Math.pow(10, baseNum);
  };

  /**
   * exact subtraction
   */
  var minus = function minus(numLeft, numRight) {
    var baseNum = Math.pow(10, Math.max(digitLength(numLeft), digitLength(numRight)));
    return (times(numLeft, baseNum) - times(numRight, baseNum)) / baseNum;
  };

  /**
   * exact division
   */
  var divide = function divide(numLeft, numRight) {
    var num1Changed = float2Fixed(numLeft);
    var num2Changed = float2Fixed(numRight);

    // fix: e.g. 10 ** -4 = 0.00009999999999999999，use 'strip' to fix
    return times(num1Changed / num2Changed, strip(Math.pow(10, digitLength(numRight) - digitLength(numLeft))));
  };

  var separatorMap = {
    comma: ',',
    dot: '.',
    no: '',
    space: ' '
  };

  /**
   * removeZerosFromEnd('0.0100') // '0.01'
   * @param {string} sNumber string of numbers
   */
  var removeZerosFromEnd = function removeZerosFromEnd(sNumber) {
    if (typeof sNumber !== 'string') return '';
    if (sNumber.endsWith('0')) {
      return sNumber.replace(/(?:\.0*|(\.\d+?)0+)$/, '$1');
    }
    return sNumber;
  };

  /**
   * e.g. 1.23 // 2
   * @param {number} number
   * @returns digital length
   */
  var getDecimalDigitsFromNumber = function getDecimalDigitsFromNumber(number) {
    if (Number.isInteger(number)) {
      return 0;
    }
    var decimalPart = String(number).split('.')[1];
    var digitsLength = decimalPart ? decimalPart.length : 8;
    return digitsLength > 8 ? 8 : digitsLength;
  };
  var toThousands = function toThousands(number, _ref) {
    var formats = _ref.formats,
      _ref$isCurrency = _ref.isCurrency,
      isCurrency = _ref$isCurrency === void 0 ? true : _ref$isCurrency;
    var _ref2 = formats || {},
      _ref2$decimal = _ref2.decimal,
      decimal = _ref2$decimal === void 0 ? 'dot' : _ref2$decimal,
      _ref2$thousands = _ref2.thousands,
      thousands = _ref2$thousands === void 0 ? 'no' : _ref2$thousands,
      _ref2$precision = _ref2.precision,
      precision = _ref2$precision === void 0 ? 2 : _ref2$precision,
      _ref2$enable_precisio = _ref2.enable_precision,
      enable_precision = _ref2$enable_precisio === void 0 ? false : _ref2$enable_precisio;

    // handle numbers in scientific notation
    if (String(number).includes('e')) {
      if (number < 1 && number > -1) {
        // 1.convert to non-scientific number
        var numericString = number.toFixed(enable_precision ? precision : 8);

        // 2.remove 0 from end of the number which not set precision. e.g. 0.100000
        if (!enable_precision) {
          numericString = removeZerosFromEnd(numericString);
        }

        // 3.remove minus from number which equal to 0. e.g. '-0.00'
        if (parseFloat(numericString) === 0) {
          return numericString.startsWith('-') ? numericString.substring(1) : numericString;
        }
        return numericString;
      }
      return number;
    }
    var decimalString = separatorMap[decimal];
    var thousandsString = separatorMap[thousands];
    var decimalDigits = enable_precision ? precision : getDecimalDigitsFromNumber(number);
    var floatNumber = parseFloat(number.toFixed(decimalDigits));
    var isMinus = floatNumber < 0;
    var integer = Math.trunc(floatNumber);

    // format decimal part
    var decimalPart = String(Math.abs(minus(floatNumber, integer)).toFixed(decimalDigits)).slice(1);
    if (!enable_precision) {
      decimalPart = removeZerosFromEnd(decimalPart);
    }
    if (isCurrency) {
      if (!enable_precision) {
        decimalPart = decimalPart.length === 2 ? decimalPart = decimalPart.padEnd(3, '0') : (decimalPart.substring(0, 3) || '.').padEnd(3, '0');
      }
    }
    decimalPart = decimalPart.replace(/./, decimalString);

    // format integer part
    var integerNumbers = [];
    var counter = 0;
    integer = Math.abs(integer).toString();
    for (var i = integer.length - 1; i > -1; i--) {
      counter += 1;
      integerNumbers.unshift(integer[i]);
      if (!(counter % 3) && i !== 0) {
        integerNumbers.unshift(thousandsString);
      }
    }
    return "".concat(isMinus ? '-' : '').concat(integerNumbers.join('')).concat(decimalPart);
  };

  /**
   * format number to display
   * @param {number} number e.g. 1, -2, 3.3
   * @param {object} formats { format, decimal, ... }
   */
  var getNumberDisplayString = function getNumberDisplayString(number, formats) {
    var type = Object.prototype.toString.call(number);
    if (type !== '[object Number]') {
      // return formula internal errors directly.
      if (type === '[object String]' && number.startsWith('#')) {
        return number;
      }
      return '';
    }
    if (isNaN(number) || number === Infinity || number === -Infinity) return String(number);

    // formats: old version maybe 'null'
    var _ref3 = formats || {},
      _ref3$format = _ref3.format,
      format = _ref3$format === void 0 ? DEFAULT_NUMBER_FORMAT : _ref3$format;
    switch (format) {
      case 'number':
        {
          return toThousands(number, {
            formats: formats,
            isCurrency: false
          });
        }
      case 'percent':
        {
          return "".concat(toThousands(Number.parseFloat((number * 100).toFixed(8)), {
            formats: formats,
            isCurrency: false
          }), "%");
        }
      case 'yuan':
        {
          return "\uFFE5".concat(toThousands(number, {
            formats: formats
          }));
        }
      case 'dollar':
        {
          return "$".concat(toThousands(number, {
            formats: formats
          }));
        }
      case 'euro':
        {
          return "\u20AC".concat(toThousands(number, {
            formats: formats
          }));
        }
      case 'duration':
        {
          return getDurationDisplayString(number, formats);
        }
      case 'custom_currency':
        {
          if (formats.currency_symbol_position === 'after') {
            return "".concat(toThousands(number, {
              formats: formats
            })).concat(formats.currency_symbol || '');
          }
          return "".concat(formats.currency_symbol || '').concat(toThousands(number, {
            formats: formats
          }));
        }
      default:
        {
          return String(number);
        }
    }
  };

  /**
   * parse string to number
   * @param {string} sNum
   * @param {*} format
   * @returns float number
   */
  var getFloatNumber = function getFloatNumber(sNum, format) {
    if (!sNum && sNum !== 0) {
      return null;
    }
    var type = _typeof(sNum);
    if (type !== 'string') {
      return type === 'number' ? sNum : null;
    }
    var parsedNum = parseFloat(sNum.replace(/[^.-\d]/g, ''));
    if (format === 'percent' && !isNaN(parsedNum)) {
      return divide(parsedNum, 100);
    }
    return isNaN(parsedNum) ? null : parsedNum;
  };

  var isValidEmail = function isValidEmail(email) {
    return /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,20}$/.test(email);
  };

  exports.CellType = CellType;
  exports.DEFAULT_NUMBER_FORMAT = DEFAULT_NUMBER_FORMAT;
  exports.DURATION_DECIMAL_DIGITS = DURATION_DECIMAL_DIGITS;
  exports.DURATION_FORMATS = DURATION_FORMATS;
  exports.DURATION_FORMATS_MAP = DURATION_FORMATS_MAP;
  exports.FORMULA_COLUMN_TYPES_MAP = FORMULA_COLUMN_TYPES_MAP;
  exports.dayjs = dayjs_min;
  exports.getDurationDisplayString = getDurationDisplayString;
  exports.getFloatNumber = getFloatNumber;
  exports.getNumberDisplayString = getNumberDisplayString;
  exports.isValidEmail = isValidEmail;
  exports.utc = utc;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
