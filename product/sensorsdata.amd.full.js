(function(factory) {
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    define(factory);
  }
})(function() {
  try {
    var sd = {};

    sd.modules = {};

    var _ = (sd._ = {});

    if (typeof JSON !== 'object') {
      JSON = {}
    }(function() {
      'use strict';
      var rx_one = /^[\],:{}\s]*$/,
        rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        rx_four = /(?:^|:|,)(?:\s*\[)+/g,
        rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

      function f(n) {
        return n < 10 ? '0' + n : n
      }

      function this_value() {
        return this.valueOf()
      }
      if (typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function() {
          return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null
        };
        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value
      }
      var gap, indent, meta, rep;

      function quote(string) {
        rx_escapable.lastIndex = 0;
        return rx_escapable.test(string) ? '"' + string.replace(rx_escapable, function(a) {
          var c = meta[a];
          return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
      }

      function str(key, holder) {
        var i, k, v, length, mind = gap,
          partial, value = holder[key];
        if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
          value = value.toJSON(key)
        }
        if (typeof rep === 'function') {
          value = rep.call(holder, key, value)
        }
        switch (typeof value) {
          case 'string':
            return quote(value);
          case 'number':
            return isFinite(value) ? String(value) : 'null';
          case 'boolean':
          case 'null':
            return String(value);
          case 'object':
            if (!value) {
              return 'null'
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === '[object Array]') {
              length = value.length;
              for (i = 0; i < length; i += 1) {
                partial[i] = str(i, value) || 'null'
              }
              v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
              gap = mind;
              return v
            }
            if (rep && typeof rep === 'object') {
              length = rep.length;
              for (i = 0; i < length; i += 1) {
                if (typeof rep[i] === 'string') {
                  k = rep[i];
                  v = str(k, value);
                  if (v) {
                    partial.push(quote(k) + (gap ? ': ' : ':') + v)
                  }
                }
              }
            } else {
              for (k in value) {
                if (Object.prototype.hasOwnProperty.call(value, k)) {
                  v = str(k, value);
                  if (v) {
                    partial.push(quote(k) + (gap ? ': ' : ':') + v)
                  }
                }
              }
            }
            v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v
        }
      }
      if (typeof JSON.stringify !== 'function') {
        meta = {
          '\b': '\\b',
          '\t': '\\t',
          '\n': '\\n',
          '\f': '\\f',
          '\r': '\\r',
          '"': '\\"',
          '\\': '\\\\'
        };
        JSON.stringify = function(value, replacer, space) {
          var i;
          gap = '';
          indent = '';
          if (typeof space === 'number') {
            for (i = 0; i < space; i += 1) {
              indent += ' '
            }
          } else if (typeof space === 'string') {
            indent = space
          }
          rep = replacer;
          if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
            throw new Error('JSON.stringify')
          }
          return str('', {
            '': value
          })
        }
      }
      if (typeof JSON.parse !== 'function') {
        JSON.parse = function(text, reviver) {
          var j;

          function walk(holder, key) {
            var k, v, value = holder[key];
            if (value && typeof value === 'object') {
              for (k in value) {
                if (Object.prototype.hasOwnProperty.call(value, k)) {
                  v = walk(value, k);
                  if (v !== undefined) {
                    value[k] = v
                  } else {
                    delete value[k]
                  }
                }
              }
            }
            return reviver.call(holder, key, value)
          }
          text = String(text);
          rx_dangerous.lastIndex = 0;
          if (rx_dangerous.test(text)) {
            text = text.replace(rx_dangerous, function(a) {
              return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4)
            })
          }
          if (rx_one.test(text.replace(rx_two, '@').replace(rx_three, ']').replace(rx_four, ''))) {
            j = eval('(' + text + ')');
            return typeof reviver === 'function' ? walk({
              '': j
            }, '') : j
          }
          throw new SyntaxError('JSON.parse')
        }
      }
    }());;


    (function(root, factory) {
      factory(root);
    })(window, function(root) {
      if (root.atob) {
        try {
          root.atob(" ");
        } catch (e) {
          root.atob = (function(atob) {
            var func = function(string) {
              return atob(String(string).replace(/[\t\n\f\r ]+/g, ""));
            };
            func.original = atob;
            return func;
          })(root.atob);
        }
        return;
      }

      var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;

      root.btoa = function(string) {
        string = String(string);
        var bitmap, a, b, c,
          result = "",
          i = 0,
          rest = string.length % 3;

        for (; i < string.length;) {
          if ((a = string.charCodeAt(i++)) > 255 ||
            (b = string.charCodeAt(i++)) > 255 ||
            (c = string.charCodeAt(i++)) > 255)
            sd.log("Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.");

          bitmap = (a << 16) | (b << 8) | c;
          result += b64.charAt(bitmap >> 18 & 63) + b64.charAt(bitmap >> 12 & 63) +
            b64.charAt(bitmap >> 6 & 63) + b64.charAt(bitmap & 63);
        }

        return rest ? result.slice(0, rest - 3) + "===".substring(rest) : result;
      };

      root.atob = function(string) {
        string = String(string).replace(/[\t\n\f\r ]+/g, "");
        if (!b64re.test(string))
          sd.log("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");

        string += "==".slice(2 - (string.length & 3));
        var bitmap, result = "",
          r1, r2, i = 0;
        for (; i < string.length;) {
          bitmap = b64.indexOf(string.charAt(i++)) << 18 | b64.indexOf(string.charAt(i++)) << 12 |
            (r1 = b64.indexOf(string.charAt(i++))) << 6 | (r2 = b64.indexOf(string.charAt(i++)));

          result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
            r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
            String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
        }
        return result;
      };
    });;


    (function() {
      var ArrayProto = Array.prototype;
      var FuncProto = Function.prototype;
      var ObjProto = Object.prototype;
      var slice = ArrayProto.slice;
      var toString = ObjProto.toString;
      var hasOwnProperty = ObjProto.hasOwnProperty;
      var nativeBind = FuncProto.bind;
      var nativeForEach = ArrayProto.forEach;
      var nativeIndexOf = ArrayProto.indexOf;
      var nativeIsArray = Array.isArray;
      var breaker = {};

      var each = (_.each = function(obj, iterator, context) {
        if (obj == null) {
          return false;
        }
        if (nativeForEach && obj.forEach === nativeForEach) {
          obj.forEach(iterator, context);
        } else if (_.isArray(obj) && obj.length === +obj.length) {
          for (var i = 0, l = obj.length; i < l; i++) {
            if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) {
              return false;
            }
          }
        } else {
          for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) {
              if (iterator.call(context, obj[key], key, obj) === breaker) {
                return false;
              }
            }
          }
        }
      });

      _.map = function(obj, iterator) {
        var results = [];
        if (obj == null) {
          return results;
        }
        if (Array.prototype.map && obj.map === Array.prototype.map) {
          return obj.map(iterator);
        }
        each(obj, function(value, index, list) {
          results.push(iterator(value, index, list));
        });
        return results;
      };

      _.extend = function(obj) {
        each(slice.call(arguments, 1), function(source) {
          for (var prop in source) {
            if (hasOwnProperty.call(source, prop) && source[prop] !== void 0) {
              obj[prop] = source[prop];
            }
          }
        });
        return obj;
      };

      _.extend2Lev = function(obj) {
        each(slice.call(arguments, 1), function(source) {
          for (var prop in source) {
            if (source[prop] !== void 0) {
              if (_.isObject(source[prop]) && _.isObject(obj[prop])) {
                _.extend(obj[prop], source[prop]);
              } else {
                obj[prop] = source[prop];
              }
            }
          }
        });
        return obj;
      };
      _.coverExtend = function(obj) {
        each(slice.call(arguments, 1), function(source) {
          for (var prop in source) {
            if (source[prop] !== void 0 && obj[prop] === void 0) {
              obj[prop] = source[prop];
            }
          }
        });
        return obj;
      };

      _.isArray =
        nativeIsArray ||
        function(obj) {
          return toString.call(obj) === '[object Array]';
        };

      _.isFunction = function(f) {
        if (!f) {
          return false;
        }
        try {
          return /^\s*\bfunction\b/.test(f);
        } catch (x) {
          return false;
        }
      };

      _.isArguments = function(obj) {
        return !!(obj && hasOwnProperty.call(obj, 'callee'));
      };

      _.toArray = function(iterable) {
        if (!iterable) {
          return [];
        }
        if (iterable.toArray) {
          return iterable.toArray();
        }
        if (_.isArray(iterable)) {
          return slice.call(iterable);
        }
        if (_.isArguments(iterable)) {
          return slice.call(iterable);
        }
        return _.values(iterable);
      };

      _.values = function(obj) {
        var results = [];
        if (obj == null) {
          return results;
        }
        each(obj, function(value) {
          results[results.length] = value;
        });
        return results;
      };

      _.indexOf = function(arr, target) {
        var indexof = arr.indexOf;
        if (indexof) {
          return indexof.call(arr, target);
        } else {
          for (var i = 0; i < arr.length; i++) {
            if (target === arr[i]) {
              return i;
            }
          }
          return -1;
        }
      };

      _.hasAttributes = function(ele, attrs) {
        if (typeof attrs === 'string') {
          return _.hasAttribute(ele, attrs);
        } else if (_.isArray(attrs)) {
          var result = false;
          for (var i = 0; i < attrs.length; i++) {
            var testResult = _.hasAttribute(ele, attrs[i]);
            if (testResult) {
              result = true;
              break;
            }
          }
          return result;
        }
      };

      _.hasAttribute = function(ele, attr) {
        if (ele.hasAttribute) {
          return ele.hasAttribute(attr);
        } else {
          return !!(ele.attributes[attr] && ele.attributes[attr].specified);
        }
      };

      _.filter = function(arr, fn, self) {
        var hasOwn = Object.prototype.hasOwnProperty;
        if (arr.filter) {
          return arr.filter(fn);
        }
        var ret = [];
        for (var i = 0; i < arr.length; i++) {
          if (!hasOwn.call(arr, i)) {
            continue;
          }
          var val = arr[i];
          if (fn.call(self, val, i, arr)) {
            ret.push(val);
          }
        }
        return ret;
      };

      _.inherit = function(subclass, superclass) {
        subclass.prototype = new superclass();
        subclass.prototype.constructor = subclass;
        subclass.superclass = superclass.prototype;
        return subclass;
      };

      _.trim = function(str) {
        return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
      };

      _.isObject = function(obj) {
        if (obj == null) {
          return false;
        } else {
          return toString.call(obj) == '[object Object]';
        }
      };

      _.isEmptyObject = function(obj) {
        if (_.isObject(obj)) {
          for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) {
              return false;
            }
          }
          return true;
        }
        return false;
      };

      _.isUndefined = function(obj) {
        return obj === void 0;
      };

      _.isString = function(obj) {
        return toString.call(obj) == '[object String]';
      };

      _.isDate = function(obj) {
        return toString.call(obj) == '[object Date]';
      };

      _.isBoolean = function(obj) {
        return toString.call(obj) == '[object Boolean]';
      };

      _.isNumber = function(obj) {
        return toString.call(obj) == '[object Number]' && /[\d\.]+/.test(String(obj));
      };

      _.isElement = function(obj) {
        return !!(obj && obj.nodeType === 1);
      };

      _.isJSONString = function(str) {
        try {
          JSON.parse(str);
        } catch (e) {
          return false;
        }
        return true;
      };
      _.safeJSONParse = function(str) {
        var val = null;
        try {
          val = JSON.parse(str);
        } catch (e) {
          return false;
        }
        return val;
      };
      _.decodeURIComponent = function(val) {
        var result = val;
        try {
          result = decodeURIComponent(val);
        } catch (e) {
          result = val;
        }
        return result;
      };

      _.decodeURI = function(val) {
        var result = val;
        try {
          result = decodeURI(val);
        } catch (e) {
          result = val;
        }
        return result;
      };

      _.isDecodeURI = function(para, val) {
        if (para) {
          return _.decodeURI(val);
        } else {
          return val;
        }
      };

      _.encodeDates = function(obj) {
        _.each(obj, function(v, k) {
          if (_.isDate(v)) {
            obj[k] = _.formatDate(v);
          } else if (_.isObject(v)) {
            obj[k] = _.encodeDates(v);
          }
        });
        return obj;
      };

      _.mediaQueriesSupported = function() {
        return typeof window.matchMedia != 'undefined' || typeof window.msMatchMedia != 'undefined';
      };

      _.getScreenOrientation = function() {
        var screenOrientationAPI = screen.msOrientation || screen.mozOrientation || (screen.orientation || {}).type;
        var screenOrientation = '未取到值';
        if (screenOrientationAPI) {
          screenOrientation = screenOrientationAPI.indexOf('landscape') > -1 ? 'landscape' : 'portrait';
        } else if (_.mediaQueriesSupported()) {
          var matchMediaFunc = window.matchMedia || window.msMatchMedia;
          if (matchMediaFunc('(orientation: landscape)').matches) {
            screenOrientation = 'landscape';
          } else if (matchMediaFunc('(orientation: portrait)').matches) {
            screenOrientation = 'portrait';
          }
        }
        return screenOrientation;
      };

      _.now =
        Date.now ||
        function() {
          return new Date().getTime();
        };

      _.throttle = function(func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        if (!options) options = {};
        var later = function() {
          previous = options.leading === false ? 0 : _.now();
          timeout = null;
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        };
        return function() {
          var now = _.now();
          if (!previous && options.leading === false) previous = now;
          var remaining = wait - (now - previous);
          context = this;
          args = arguments;
          if (remaining <= 0 || remaining > wait) {
            if (timeout) {
              clearTimeout(timeout);
              timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
          } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
          }
          return result;
        };
      };

      _.hashCode = function(str) {
        if (typeof str !== 'string') {
          return 0;
        }
        var hash = 0;
        var char = null;
        if (str.length == 0) {
          return hash;
        }
        for (var i = 0; i < str.length; i++) {
          char = str.charCodeAt(i);
          hash = (hash << 5) - hash + char;
          hash = hash & hash;
        }
        return hash;
      };

      _.formatDate = function(d) {
        function pad(n) {
          return n < 10 ? '0' + n : n;
        }

        return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()) + '.' + pad(d.getMilliseconds());
      };

      _.searchObjDate = function(o) {
        if (_.isObject(o)) {
          _.each(o, function(a, b) {
            if (_.isObject(a)) {
              _.searchObjDate(o[b]);
            } else {
              if (_.isDate(a)) {
                o[b] = _.formatDate(a);
              }
            }
          });
        }
      };

      _.searchZZAppStyle = function(data) {
        if (typeof data.properties.$project !== 'undefined') {
          data.project = data.properties.$project;
          delete data.properties.$project;
        }
        if (typeof data.properties.$token !== 'undefined') {
          data.token = data.properties.$token;
          delete data.properties.$token;
        }
      };

      _.formatJsonString = function(obj) {
        try {
          return JSON.stringify(obj, null, '  ');
        } catch (e) {
          return JSON.stringify(obj);
        }
      };

      _.formatString = function(str, maxLen) {
        if (_.isNumber(maxLen) && str.length > maxLen) {
          sd.log('字符串长度超过限制，已经做截取--' + str);
          return str.slice(0, maxLen);
        } else {
          return str;
        }
      };

      _.searchObjString = function(o) {
        if (_.isObject(o)) {
          _.each(o, function(a, b) {
            if (_.isObject(a)) {
              _.searchObjString(o[b]);
            } else {
              if (_.isString(a)) {
                o[b] = _.formatString(a, b === '$element_selector' ? 1024 : sd.para.max_string_length);
              }
            }
          });
        }
      };

      _.parseSuperProperties = function(data) {
        var obj = data.properties;
        var copyData = JSON.parse(JSON.stringify(data));
        if (_.isObject(obj)) {
          _.each(obj, function(value, key) {
            if (_.isFunction(value)) {
              try {
                obj[key] = value(copyData);
                if (_.isFunction(obj[key])) {
                  sd.log('您的属性- ' + key + ' 格式不满足要求，我们已经将其删除');
                  delete obj[key];
                }
              } catch (e) {
                delete obj[key];
                sd.log('您的属性- ' + key + ' 抛出了异常，我们已经将其删除');
              }
            }
          });
          _.strip_sa_properties(obj);
        }
      };

      _.filterReservedProperties = function(obj) {
        var reservedFields = ['distinct_id', 'user_id', 'id', 'date', 'datetime', 'event', 'events', 'first_id', 'original_id', 'device_id', 'properties', 'second_id', 'time', 'users'];
        if (!_.isObject(obj)) {
          return;
        }
        _.each(reservedFields, function(key, index) {
          if (!(key in obj)) {
            return;
          }
          if (index < 3) {
            delete obj[key];
            sd.log('您的属性- ' + key + '是保留字段，我们已经将其删除');
          } else {
            sd.log('您的属性- ' + key + '是保留字段，请避免其作为属性名');
          }
        });
      };

      _.searchConfigData = function(data) {
        if (typeof data === 'object' && data.$option) {
          var data_config = data.$option;
          delete data.$option;
          return data_config;
        } else {
          return {};
        }
      };

      _.unique = function(ar) {
        var temp,
          n = [],
          o = {};
        for (var i = 0; i < ar.length; i++) {
          temp = ar[i];
          if (!(temp in o)) {
            o[temp] = true;
            n.push(temp);
          }
        }
        return n;
      };

      _.strip_sa_properties = function(p) {
        if (!_.isObject(p)) {
          return p;
        }
        _.each(p, function(v, k) {
          if (_.isArray(v)) {
            var temp = [];
            _.each(v, function(arrv) {
              if (_.isString(arrv)) {
                temp.push(arrv);
              } else {
                sd.log('您的数据-', k, v, '的数组里的值必须是字符串,已经将其删除');
              }
            });
            if (temp.length !== 0) {
              p[k] = temp;
            } else {
              delete p[k];
              sd.log('已经删除空的数组');
            }
          }
          if (!(_.isString(v) || _.isNumber(v) || _.isDate(v) || _.isBoolean(v) || _.isArray(v) || _.isFunction(v) || k === '$option')) {
            sd.log('您的数据-', k, v, '-格式不满足要求，我们已经将其删除');
            delete p[k];
          }
        });
        return p;
      };

      _.strip_empty_properties = function(p) {
        var ret = {};
        _.each(p, function(v, k) {
          if (v != null) {
            ret[k] = v;
          }
        });
        return ret;
      };

      _.base64Encode = function(data) {
        return btoa(
          encodeURIComponent(data).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode('0x' + p1);
          })
        );
      };

      _.base64Decode = function(data) {
        var arr = _.map(atob(data).split(''), function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        });
        return decodeURIComponent(arr.join(''));
      };

      _.UUID = (function() {
        var T = function() {
          var d = 1 * new Date(),
            i = 0;
          while (d == 1 * new Date()) {
            i++;
          }
          return d.toString(16) + i.toString(16);
        };
        var R = function() {
          return Math.random().toString(16).replace('.', '');
        };
        var UA = function(n) {
          var ua = navigator.userAgent,
            i,
            ch,
            buffer = [],
            ret = 0;

          function xor(result, byte_array) {
            var j,
              tmp = 0;
            for (j = 0; j < byte_array.length; j++) {
              tmp |= buffer[j] << (j * 8);
            }
            return result ^ tmp;
          }

          for (i = 0; i < ua.length; i++) {
            ch = ua.charCodeAt(i);
            buffer.unshift(ch & 0xff);
            if (buffer.length >= 4) {
              ret = xor(ret, buffer);
              buffer = [];
            }
          }

          if (buffer.length > 0) {
            ret = xor(ret, buffer);
          }

          return ret.toString(16);
        };

        return function() {
          var se = String(screen.height * screen.width);
          if (se && /\d{5,}/.test(se)) {
            se = se.toString(16);
          } else {
            se = String(Math.random() * 31242)
              .replace('.', '')
              .slice(0, 8);
          }
          var val = T() + '-' + R() + '-' + UA() + '-' + se + '-' + T();
          if (val) {
            return val;
          } else {
            return (String(Math.random()) + String(Math.random()) + String(Math.random())).slice(2, 15);
          }
        };
      })();

      _.getQueryParam = function(url, param) {
        param = param.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        url = _.decodeURIComponent(url);
        var regexS = '[\\?&]' + param + '=([^&#]*)',
          regex = new RegExp(regexS),
          results = regex.exec(url);
        if (results === null || (results && typeof results[1] !== 'string' && results[1].length)) {
          return '';
        } else {
          return _.decodeURIComponent(results[1]);
        }
      };

      _.urlParse = function(para) {
        var URLParser = function(a) {
          this._fields = {
            Username: 4,
            Password: 5,
            Port: 7,
            Protocol: 2,
            Host: 6,
            Path: 8,
            URL: 0,
            QueryString: 9,
            Fragment: 10
          };
          this._values = {};
          this._regex = null;
          this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;

          if (typeof a != 'undefined') {
            this._parse(a);
          }
        };
        URLParser.prototype.setUrl = function(a) {
          this._parse(a);
        };
        URLParser.prototype._initValues = function() {
          for (var a in this._fields) {
            this._values[a] = '';
          }
        };
        URLParser.prototype.addQueryString = function(queryObj) {
          if (typeof queryObj !== 'object') {
            return false;
          }
          var query = this._values.QueryString || '';
          for (var i in queryObj) {
            if (new RegExp(i + '[^&]+').test(query)) {
              query = query.replace(new RegExp(i + '[^&]+'), i + '=' + queryObj[i]);
            } else {
              if (query.slice(-1) === '&') {
                query = query + i + '=' + queryObj[i];
              } else {
                if (query === '') {
                  query = i + '=' + queryObj[i];
                } else {
                  query = query + '&' + i + '=' + queryObj[i];
                }
              }
            }
          }
          this._values.QueryString = query;
        };
        URLParser.prototype.getUrl = function() {
          var url = '';
          url += this._values.Origin;
          url += this._values.Port ? ':' + this._values.Port : '';
          url += this._values.Path;
          url += this._values.QueryString ? '?' + this._values.QueryString : '';
          url += this._values.Fragment ? '#' + this._values.Fragment : '';
          return url;
        };

        URLParser.prototype.getUrl = function() {
          var url = '';
          url += this._values.Origin;
          url += this._values.Port ? ':' + this._values.Port : '';
          url += this._values.Path;
          url += this._values.QueryString ? '?' + this._values.QueryString : '';
          return url;
        };
        URLParser.prototype._parse = function(a) {
          this._initValues();
          var b = this._regex.exec(a);
          if (!b) {
            sd.log('DPURLParser::_parse -> Invalid URL');
          }
          for (var c in this._fields) {
            if (typeof b[this._fields[c]] != 'undefined') {
              this._values[c] = b[this._fields[c]];
            }
          }
          this._values['Hostname'] = this._values['Host'].replace(/:\d+$/, '');
          this._values['Origin'] = this._values['Protocol'] + '://' + this._values['Hostname'];
        };
        return new URLParser(para);
      };





      _.addEvent = function() {
        function fixEvent(event) {
          if (event) {
            event.preventDefault = fixEvent.preventDefault;
            event.stopPropagation = fixEvent.stopPropagation;
            event._getPath = fixEvent._getPath;
          }
          return event;
        }
        fixEvent._getPath = function() {
          var ev = this;
          var polyfill = function() {
            try {
              var element = ev.target;
              var pathArr = [element];
              if (element === null || element.parentElement === null) {
                return [];
              }
              while (element.parentElement !== null) {
                element = element.parentElement;
                pathArr.unshift(element);
              }
              return pathArr;
            } catch (err) {
              return [];
            }
          };
          return this.path || (this.composedPath && this.composedPath()) || polyfill();
        };
        fixEvent.preventDefault = function() {
          this.returnValue = false;
        };
        fixEvent.stopPropagation = function() {
          this.cancelBubble = true;
        };

        var register_event = function(element, type, handler) {
          var useCapture = _.isObject(sd.para.heatmap) && sd.para.heatmap.useCapture ? true : false;
          if (_.isObject(sd.para.heatmap) && typeof sd.para.heatmap.useCapture === 'undefined' && type === 'click') {
            useCapture = true;
          }
          if (element && element.addEventListener) {
            element.addEventListener(
              type,
              function(e) {
                e._getPath = fixEvent._getPath;
                handler.call(this, e);
              },
              useCapture
            );
          } else {
            var ontype = 'on' + type;
            var old_handler = element[ontype];
            element[ontype] = makeHandler(element, handler, old_handler);
          }
        };

        function makeHandler(element, new_handler, old_handlers) {
          var handler = function(event) {
            event = event || fixEvent(window.event);
            if (!event) {
              return undefined;
            }
            event.target = event.srcElement;

            var ret = true;
            var old_result, new_result;
            if (typeof old_handlers === 'function') {
              old_result = old_handlers(event);
            }
            new_result = new_handler.call(element, event);
            if (false === old_result || false === new_result) {
              ret = false;
            }
            return ret;
          };
          return handler;
        }

        register_event.apply(null, arguments);
      };

      _.addHashEvent = function(callback) {
        var hashEvent = 'pushState' in window.history ? 'popstate' : 'hashchange';
        _.addEvent(window, hashEvent, callback);
      };

      _.addSinglePageEvent = function(callback) {
        var current_url = location.href;
        var historyPushState = window.history.pushState;
        var historyReplaceState = window.history.replaceState;

        window.history.pushState = function() {
          historyPushState.apply(window.history, arguments);
          callback(current_url);
          current_url = location.href;
        };
        window.history.replaceState = function() {
          historyReplaceState.apply(window.history, arguments);
          callback(current_url);
          current_url = location.href;
        };

        var singlePageEvent = historyPushState ? 'popstate' : 'hashchange';
        _.addEvent(window, singlePageEvent, function() {
          callback(current_url);
          current_url = location.href;
        });
      };

      _.cookie = {
        get: function(name) {
          var nameEQ = name + '=';
          var ca = document.cookie.split(';');
          for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
              c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) == 0) {
              return _.decodeURIComponent(c.substring(nameEQ.length, c.length));
            }
          }
          return null;
        },
        set: function(name, value, days, cross_subdomain, is_secure) {
          cross_subdomain = typeof cross_subdomain === 'undefined' ? sd.para.cross_subdomain : cross_subdomain;
          var cdomain = '',
            expires = '',
            secure = '';
          days = days == null ? 73000 : days;

          if (cross_subdomain) {
            var domain = _.getCurrentDomain(location.href);
            if (domain === 'url解析失败') {
              domain = '';
            }
            cdomain = domain ? '; domain=' + domain : '';
          }

          if (days !== 0) {
            var date = new Date();
            if (String(days).slice(-1) === 's') {
              date.setTime(date.getTime() + Number(String(days).slice(0, -1)) * 1000);
            } else {
              date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            }

            expires = '; expires=' + date.toGMTString();
          }

          if (is_secure) {
            secure = '; secure';
          }

          document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/' + cdomain + secure;
        },
        encrypt: function(v) {
          return 'data:enc;' + _.rot13obfs(v);
        },
        decrypt: function(v) {
          v = v.substring('data:enc;'.length);
          v = _.rot13defs(v);
          return v;
        },
        resolveValue: function(cross) {
          var flag = 'data:enc;';
          if (_.isString(cross) && cross.indexOf(flag) === 0) {
            cross = _.cookie.decrypt(cross);
          }
          return cross;
        },

        remove: function(name, cross_subdomain) {
          cross_subdomain = typeof cross_subdomain === 'undefined' ? sd.para.cross_subdomain : cross_subdomain;
          _.cookie.set(name, '', -1, cross_subdomain);
        },

        getCookieName: function(name_prefix, url) {
          var sub = '';
          url = url || location.href;
          if (sd.para.cross_subdomain === false) {
            try {
              sub = _.URL(url).hostname;
            } catch (e) {
              sd.log(e);
            }
            if (typeof sub === 'string' && sub !== '') {
              sub = 'sajssdk_2015_' + name_prefix + '_' + sub.replace(/\./g, '_');
            } else {
              sub = 'sajssdk_2015_root_' + name_prefix;
            }
          } else {
            sub = 'sajssdk_2015_cross_' + name_prefix;
          }
          return sub;
        },
        getNewUser: function() {
          var prefix = 'new_user';
          if (this.get('sensorsdata_is_new_user') !== null || this.get(this.getCookieName(prefix)) !== null) {
            return true;
          } else {
            return false;
          }
        }
      };
      _.getElementContent = function(target, tagName) {
        var textContent = '';
        var element_content = '';
        if (target.textContent) {
          textContent = _.trim(target.textContent);
        } else if (target.innerText) {
          textContent = _.trim(target.innerText);
        }
        if (textContent) {
          textContent = textContent
            .replace(/[\r\n]/g, ' ')
            .replace(/[ ]+/g, ' ')
            .substring(0, 255);
        }
        element_content = textContent || '';

        if (tagName === 'input' || tagName === 'INPUT') {
          if (target.type === 'button' || target.type === 'submit') {
            element_content = target.value || '';
          } else if (sd.para.heatmap && typeof sd.para.heatmap.collect_input === 'function' && sd.para.heatmap.collect_input(target)) {
            element_content = target.value || '';
          }
        }
        return element_content;
      };
      _.getEleInfo = function(obj) {
        if (!obj.target) {
          return false;
        }

        var target = obj.target;
        var tagName = target.tagName.toLowerCase();

        var props = {};

        props.$element_type = tagName;
        props.$element_name = target.getAttribute('name');
        props.$element_id = target.getAttribute('id');
        props.$element_class_name = typeof target.className === 'string' ? target.className : null;
        props.$element_target_url = target.getAttribute('href');
        props.$element_content = _.getElementContent(target, tagName);

        props = _.strip_empty_properties(props);

        (props.$url = _.isDecodeURI(sd.para.url_is_decode, location.href)), (props.$url_path = location.pathname);
        props.$title = document.title;
        props.$viewport_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;

        return props;
      };

      _.localStorage = {
        get: function(name) {
          return window.localStorage.getItem(name);
        },

        parse: function(name) {
          var storedValue;
          try {
            storedValue = JSON.parse(_.localStorage.get(name)) || null;
          } catch (err) {
            sd.log(err);
          }
          return storedValue;
        },

        set: function(name, value) {
          window.localStorage.setItem(name, value);
        },

        remove: function(name) {
          window.localStorage.removeItem(name);
        },

        isSupport: function() {
          var supported = true;
          try {
            var key = '__sensorsdatasupport__';
            var val = 'testIsSupportStorage';
            _.localStorage.set(key, val);
            if (_.localStorage.get(key) !== val) {
              supported = false;
            }
            _.localStorage.remove(key);
          } catch (err) {
            supported = false;
          }
          return supported;
        }
      };

      _.sessionStorage = {
        isSupport: function() {
          var supported = true;

          var key = '__sensorsdatasupport__';
          var val = 'testIsSupportStorage';
          try {
            if (sessionStorage && sessionStorage.setItem) {
              sessionStorage.setItem(key, val);
              sessionStorage.removeItem(key, val);
              supported = true;
            } else {
              supported = false;
            }
          } catch (e) {
            supported = false;
          }
          return supported;
        }
      };

      _.isSupportCors = function() {
        if (typeof window.XMLHttpRequest === 'undefined') {
          return false;
        }
        if ('withCredentials' in new XMLHttpRequest()) {
          return true;
        } else if (typeof XDomainRequest !== 'undefined') {
          return true;
        } else {
          return false;
        }
      };

      _.xhr = function(cors) {
        if (cors) {
          if (typeof window.XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest()) {
            return new XMLHttpRequest();
          } else if (typeof XDomainRequest !== 'undefined') {
            return new XDomainRequest();
          } else {
            return null;
          }
        } else {
          if (typeof window.XMLHttpRequest !== 'undefined') {
            return new XMLHttpRequest();
          }
          if (window.ActiveXObject) {
            try {
              return new ActiveXObject('Msxml2.XMLHTTP');
            } catch (d) {
              try {
                return new ActiveXObject('Microsoft.XMLHTTP');
              } catch (d) {
                sd.log(d);
              }
            }
          }
        }
      };

      _.ajax = function(para) {
        para.timeout = para.timeout || 20000;

        para.credentials = typeof para.credentials === 'undefined' ? true : para.credentials;

        function getJSON(data) {
          if (!data) {
            return '';
          }
          try {
            return JSON.parse(data);
          } catch (e) {
            return {};
          }
        }

        var g = _.xhr(para.cors);

        if (!g) {
          return false;
        }

        if (!para.type) {
          para.type = para.data ? 'POST' : 'GET';
        }
        para = _.extend({
            success: function() {},
            error: function() {}
          },
          para
        );

        sd.debug.protocol.ajax(para.url);

        var oldsuccess = para.success;
        var olderror = para.error;
        var errorTimer;

        function abort() {
          try {
            if (_.isObject(g) && g.abort) {
              g.abort();
            }
          } catch (error) {
            sd.log(error);
          }

          if (errorTimer) {
            clearTimeout(errorTimer);
            errorTimer = null;
            para.error && para.error();
            g.onreadystatechange = null;
            g.onload = null;
            g.onerror = null;
          }
        }

        para.success = function(data) {
          oldsuccess(data);
          if (errorTimer) {
            clearTimeout(errorTimer);
            errorTimer = null;
          }
        };
        para.error = function(err) {
          olderror(err);
          if (errorTimer) {
            clearTimeout(errorTimer);
            errorTimer = null;
          }
        };
        errorTimer = setTimeout(function() {
          abort();
        }, para.timeout);

        if (typeof XDomainRequest !== 'undefined' && g instanceof XDomainRequest) {
          g.onload = function() {
            para.success && para.success(getJSON(g.responseText));
            g.onreadystatechange = null;
            g.onload = null;
            g.onerror = null;
          };
          g.onerror = function() {
            para.error && para.error(getJSON(g.responseText), g.status);
            g.onreadystatechange = null;
            g.onerror = null;
            g.onload = null;
          };
        }
        g.onreadystatechange = function() {
          try {
            if (g.readyState == 4) {
              if ((g.status >= 200 && g.status < 300) || g.status == 304) {
                para.success(getJSON(g.responseText));
              } else {
                para.error(getJSON(g.responseText), g.status);
              }
              g.onreadystatechange = null;
              g.onload = null;
            }
          } catch (e) {
            g.onreadystatechange = null;
            g.onload = null;
          }
        };

        g.open(para.type, para.url, true);

        try {
          if (para.credentials) {
            g.withCredentials = true;
          }
          if (_.isObject(para.header)) {
            _.each(para.header, function(v, i) {
              g.setRequestHeader && g.setRequestHeader(i, v);
            });
          }

          if (para.data) {
            if (!para.cors) {
              g.setRequestHeader && g.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            }
            if (para.contentType === 'application/json') {
              g.setRequestHeader && g.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
            } else {
              g.setRequestHeader && g.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            }
          }
        } catch (e) {
          sd.log(e);
        }

        g.send(para.data || null);
      };

      _.loadScript = function(para) {
        para = _.extend({
            success: function() {},
            error: function() {},
            appendCall: function(g) {
              document.getElementsByTagName('head')[0].appendChild(g);
            }
          },
          para
        );

        var g = null;
        if (para.type === 'css') {
          g = document.createElement('link');
          g.rel = 'stylesheet';
          g.href = para.url;
        }
        if (para.type === 'js') {
          g = document.createElement('script');
          g.async = 'async';
          g.setAttribute('charset', 'UTF-8');
          g.src = para.url;
          g.type = 'text/javascript';
        }
        g.onload = g.onreadystatechange = function() {
          if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
            para.success();
            g.onload = g.onreadystatechange = null;
          }
        };
        g.onerror = function() {
          para.error();
          g.onerror = null;
        };
        para.appendCall(g);
      };

      _.getHostname = function(url, defaultValue) {
        if (!defaultValue || typeof defaultValue !== 'string') {
          defaultValue = 'hostname解析异常';
        }
        var hostname = null;
        try {
          hostname = _.URL(url).hostname;
        } catch (e) {
          sd.log('getHostname传入的url参数不合法！');
        }
        return hostname || defaultValue;
      };

      _.getQueryParamsFromUrl = function(url) {
        var result = {};
        var arr = url.split('?');
        var queryString = arr[1] || '';
        if (queryString) {
          result = _.getURLSearchParams('?' + queryString);
        }
        return result;
      };

      _.getURLSearchParams = function(queryString) {
        queryString = queryString || '';
        var decodeParam = function(str) {
          return decodeURIComponent(str);
        };
        var args = {};
        var query = queryString.substring(1);
        var pairs = query.split('&');
        for (var i = 0; i < pairs.length; i++) {
          var pos = pairs[i].indexOf('=');
          if (pos === -1) continue;
          var name = pairs[i].substring(0, pos);
          var value = pairs[i].substring(pos + 1);
          name = decodeParam(name);
          value = decodeParam(value);
          args[name] = value;
        }
        return args;
      };

      _.URL = function(url) {
        var result = {};
        var basicProps = ['hash', 'host', 'hostname', 'href', 'origin', 'password', 'pathname', 'port', 'protocol', 'search', 'username'];
        var isURLAPIWorking = function() {
          var url;
          try {
            url = new URL('http://modernizr.com/');
            return url.href === 'http://modernizr.com/';
          } catch (e) {
            return false;
          }
        };
        if (typeof window.URL === 'function' && isURLAPIWorking()) {
          result = new URL(url);
          if (!result.searchParams) {
            result.searchParams = (function() {
              var params = _.getURLSearchParams(result.search);
              return {
                get: function(searchParam) {
                  return params[searchParam];
                }
              };
            })();
          }
        } else {
          var _regex = /^https?:\/\/.+/;
          if (_regex.test(url) === false) {
            sd.log('Invalid URL');
          }
          var link = document.createElement('a');
          link.href = url;
          for (var i = basicProps.length - 1; i >= 0; i--) {
            var prop = basicProps[i];
            result[prop] = link[prop];
          }
          if (result.hostname && typeof result.pathname === 'string' && result.pathname.indexOf('/') !== 0) {
            result.pathname = '/' + result.pathname;
          }
          result.searchParams = (function() {
            var params = _.getURLSearchParams(result.search);
            return {
              get: function(searchParam) {
                return params[searchParam];
              }
            };
          })();
        }
        return result;
      };

      _.getCurrentDomain = function(url) {
        var sdDomain = sd.para.current_domain;
        switch (typeof sdDomain) {
          case 'function':
            var resultDomain = sdDomain();
            if (resultDomain === '' || _.trim(resultDomain) === '') {
              return 'url解析失败';
            } else if (resultDomain.indexOf('.') !== -1) {
              return resultDomain;
            } else {
              return 'url解析失败';
            }
            case 'string':
              if (sdDomain === '' || _.trim(sdDomain) === '') {
                return 'url解析失败';
              } else if (sdDomain.indexOf('.') !== -1) {
                return sdDomain;
              } else {
                return 'url解析失败';
              }
              default:
                var cookieTopLevelDomain = _.getCookieTopLevelDomain();
                if (url === '') {
                  return 'url解析失败';
                } else if (cookieTopLevelDomain === '') {
                  return 'url解析失败';
                } else {
                  return cookieTopLevelDomain;
                }
        }
      };

      _.getCookieTopLevelDomain = function(hostname) {
        hostname = hostname || window.location.hostname;
        var splitResult = hostname.split('.');
        if (_.isArray(splitResult) && splitResult.length >= 2 && !/^(\d+\.)+\d+$/.test(hostname)) {
          var domainStr = '.' + splitResult.splice(splitResult.length - 1, 1);
          while (splitResult.length > 0) {
            domainStr = '.' + splitResult.splice(splitResult.length - 1, 1) + domainStr;
            document.cookie = 'sensorsdata_domain_test=true; path=/; domain=' + domainStr;
            if (document.cookie.indexOf('sensorsdata_domain_test=true') !== -1) {
              var now = new Date();
              now.setTime(now.getTime() - 1000);
              document.cookie = 'sensorsdata_domain_test=true; expires=' + now.toGMTString() + '; path=/; domain=' + domainStr;
              return domainStr;
            }
          }
        }
        return '';
      };

      _.isReferralTraffic = function(refererstring) {
        refererstring = refererstring || document.referrer;
        if (refererstring === '') {
          return true;
        }

        return _.getCookieTopLevelDomain(_.getHostname(refererstring)) !== _.getCookieTopLevelDomain();
      };

      _.ry = function(dom) {
        return new _.ry.init(dom);
      };
      _.ry.init = function(dom) {
        this.ele = dom;
      };
      _.ry.init.prototype = {
        addClass: function(para) {
          var classes = ' ' + this.ele.className + ' ';
          if (classes.indexOf(' ' + para + ' ') === -1) {
            this.ele.className = this.ele.className + (this.ele.className === '' ? '' : ' ') + para;
          }
          return this;
        },
        removeClass: function(para) {
          var classes = ' ' + this.ele.className + ' ';
          if (classes.indexOf(' ' + para + ' ') !== -1) {
            this.ele.className = classes.replace(' ' + para + ' ', ' ').slice(1, -1);
          }
          return this;
        },
        hasClass: function(para) {
          var classes = ' ' + this.ele.className + ' ';
          if (classes.indexOf(' ' + para + ' ') !== -1) {
            return true;
          } else {
            return false;
          }
        },
        attr: function(key, value) {
          if (typeof key === 'string' && _.isUndefined(value)) {
            return this.ele.getAttribute(key);
          }
          if (typeof key === 'string') {
            value = String(value);
            this.ele.setAttribute(key, value);
          }
          return this;
        },
        offset: function() {
          var rect = this.ele.getBoundingClientRect();
          if (rect.width || rect.height) {
            var doc = this.ele.ownerDocument;
            var docElem = doc.documentElement;

            return {
              top: rect.top + window.pageYOffset - docElem.clientTop,
              left: rect.left + window.pageXOffset - docElem.clientLeft
            };
          } else {
            return {
              top: 0,
              left: 0
            };
          }
        },
        getSize: function() {
          if (!window.getComputedStyle) {
            return {
              width: this.ele.offsetWidth,
              height: this.ele.offsetHeight
            };
          }
          try {
            var bounds = this.ele.getBoundingClientRect();
            return {
              width: bounds.width,
              height: bounds.height
            };
          } catch (e) {
            return {
              width: 0,
              height: 0
            };
          }
        },
        getStyle: function(value) {
          if (this.ele.currentStyle) {
            return this.ele.currentStyle[value];
          } else {
            return this.ele.ownerDocument.defaultView.getComputedStyle(this.ele, null).getPropertyValue(value);
          }
        },
        wrap: function(elementTagName) {
          var ele = document.createElement(elementTagName);
          this.ele.parentNode.insertBefore(ele, this.ele);
          ele.appendChild(this.ele);
          return _.ry(ele);
        },
        getCssStyle: function(prop) {
          var result = this.ele.style.getPropertyValue(prop);
          if (result) {
            return result;
          }
          var rules = null;
          if (typeof window.getMatchedCSSRules === 'function') {
            rules = getMatchedCSSRules(this.ele);
          }
          if (!rules || !_.isArray(rules)) {
            return null;
          }
          for (var i = rules.length - 1; i >= 0; i--) {
            var r = rules[i];
            result = r.style.getPropertyValue(prop);
            if (result) {
              return result;
            }
          }
        },
        sibling: function(cur, dir) {
          while ((cur = cur[dir]) && cur.nodeType !== 1) {}
          return cur;
        },
        next: function() {
          return this.sibling(this.ele, 'nextSibling');
        },
        prev: function(elem) {
          return this.sibling(this.ele, 'previousSibling');
        },
        siblings: function(elem) {
          return this.siblings((this.ele.parentNode || {}).firstChild, this.ele);
        },
        children: function(elem) {
          return this.siblings(this.ele.firstChild);
        },
        parent: function() {
          var parent = this.ele.parentNode;
          parent = parent && parent.nodeType !== 11 ? parent : null;
          return _.ry(parent);
        },
        previousElementSibling: function() {
          var el = this.ele;
          if ('previousElementSibling' in document.documentElement) {
            return _.ry(el.previousElementSibling);
          } else {
            while ((el = el.previousSibling)) {
              if (el.nodeType === 1) {
                return _.ry(el);
              }
            }
            return _.ry(null);
          }
        },
        getSameTypeSiblings: function() {
          var element = this.ele;
          var parentNode = element.parentNode;
          var tagName = element.tagName.toLowerCase();
          var arr = [];
          for (var i = 0; i < parentNode.children.length; i++) {
            var child = parentNode.children[i];
            if (child.nodeType === 1 && child.tagName.toLowerCase() === tagName) {
              arr.push(parentNode.children[i]);
            }
          }
          return arr;
        }
      };

      _.strToUnicode = function(str) {
        if (typeof str !== 'string') {
          sd.log('转换unicode错误', str);
          return str;
        }
        var nstr = '';
        for (var i = 0; i < str.length; i++) {
          nstr += '\\' + str.charCodeAt(i).toString(16);
        }
        return nstr;
      };


      _.getReferrer = function(referrer) {
        var referrer = referrer || document.referrer;
        if (typeof referrer !== 'string') {
          return '取值异常_referrer异常_' + String(referrer);
        }
        if (referrer.indexOf('https://www.baidu.com/') === 0) {
          referrer = referrer.split('?')[0];
        }
        referrer = referrer.slice(0, sd.para.max_referrer_string_length);
        return typeof referrer === 'string' ? referrer : '';
      };

      _.getKeywordFromReferrer = function(referrerUrl) {
        referrerUrl = referrerUrl || document.referrer;
        var search_keyword = sd.para.source_type.keyword;
        if (document && typeof referrerUrl === 'string') {
          if (referrerUrl.indexOf('http') === 0) {
            var searchEngine = _.getReferSearchEngine(referrerUrl);
            var query = _.getQueryParamsFromUrl(referrerUrl);
            if (_.isEmptyObject(query)) {
              return '未取到值';
            }
            var temp = null;
            for (var i in search_keyword) {
              if (searchEngine === i) {
                if (typeof query === 'object') {
                  temp = search_keyword[i];
                  if (_.isArray(temp)) {
                    for (var i = 0; i < temp.length; i++) {
                      var _value = query[temp[i]];
                      if (_value) {
                        return _value;
                      }
                    }
                  } else if (query[temp]) {
                    return query[temp];
                  }
                }
              }
            }
            return '未取到值';
          } else {
            if (referrerUrl === '') {
              return '未取到值_直接打开';
            } else {
              return '未取到值_非http的url';
            }
          }
        } else {
          return '取值异常_referrer异常_' + String(referrerUrl);
        }
      };

      _.getWxAdIdFromUrl = function(url) {
        var click_id = _.getQueryParam(url, 'gdt_vid');
        var hash_key = _.getQueryParam(url, 'hash_key');
        var callbacks = _.getQueryParam(url, 'callbacks');
        var obj = {
          click_id: '',
          hash_key: '',
          callbacks: ''
        };
        if (_.isString(click_id) && click_id.length) {
          obj.click_id = click_id.length == 16 || click_id.length == 18 ? click_id : '参数解析不合法';

          if (_.isString(hash_key) && hash_key.length) {
            obj.hash_key = hash_key;
          }
          if (_.isString(callbacks) && callbacks.length) {
            obj.callbacks = callbacks;
          }
        }

        return obj;
      };

      _.getReferSearchEngine = function(referrerUrl) {
        var hostname = _.getHostname(referrerUrl);
        if (!hostname || hostname === 'hostname解析异常') {
          return '';
        }
        var search_keyword = sd.para.source_type.keyword;
        var searchEngineUrls = {
          baidu: [/^.*\.baidu\.com$/],
          bing: [/^.*\.bing\.com$/],
          google: [/^www\.google\.com$/, /^www\.google\.com\.[a-z]{2}$/, /^www\.google\.[a-z]{2}$/],
          sm: [/^m\.sm\.cn$/],
          so: [/^.+\.so\.com$/],
          sogou: [/^.*\.sogou\.com$/],
          yahoo: [/^.*\.yahoo\.com$/]
        };
        for (var prop in searchEngineUrls) {
          var urls = searchEngineUrls[prop];
          for (var i = 0, len = urls.length; i < len; i++) {
            if (urls[i].test(hostname)) {
              return prop;
            }
          }
        }
        return '未知搜索引擎';
      };

      _.getSourceFromReferrer = function() {
        function getMatchStrFromArr(arr, str) {
          for (var i = 0; i < arr.length; i++) {
            if (str.split('?')[0].indexOf(arr[i]) !== -1) {
              return true;
            }
          }
        }

        var utm_reg = '(' + sd.para.source_type.utm.join('|') + ')\\=[^&]+';
        var search_engine = sd.para.source_type.search;
        var social_engine = sd.para.source_type.social;

        var referrer = document.referrer || '';
        var url = _.info.pageProp.url;
        if (url) {
          var utm_match = url.match(new RegExp(utm_reg));
          if (utm_match && utm_match[0]) {
            return '付费广告流量';
          } else if (getMatchStrFromArr(search_engine, referrer)) {
            return '自然搜索流量';
          } else if (getMatchStrFromArr(social_engine, referrer)) {
            return '社交网站流量';
          } else if (referrer === '') {
            return '直接流量';
          } else {
            return '引荐流量';
          }
        } else {
          return '获取url异常';
        }
      };

      _.info = {
        initPage: function() {
          var referrer = _.getReferrer();
          var url = location.href;
          var url_domain = _.getCurrentDomain(url);
          if (!url_domain) {
            sd.debug.jssdkDebug('url_domain异常_' + url + '_' + url_domain);
          }

          this.pageProp = {
            referrer: referrer,
            referrer_host: referrer ? _.getHostname(referrer) : '',
            url: url,
            url_host: _.getHostname(url, 'url_host取值异常'),
            url_domain: url_domain
          };
        },
        pageProp: {},

        campaignParams: function() {
          var campaign_keywords = sd.source_channel_standard.split(' '),
            kw = '',
            params = {};
          if (_.isArray(sd.para.source_channel) && sd.para.source_channel.length > 0) {
            campaign_keywords = campaign_keywords.concat(sd.para.source_channel);
            campaign_keywords = _.unique(campaign_keywords);
          }
          _.each(campaign_keywords, function(kwkey) {
            kw = _.getQueryParam(location.href, kwkey);
            if (kw.length) {
              params[kwkey] = kw;
            }
          });

          return params;
        },
        campaignParamsStandard: function(prefix, prefix_add) {
          prefix = prefix || '';
          prefix_add = prefix_add || '';
          var utms = _.info.campaignParams();
          var $utms = {},
            otherUtms = {};
          _.each(utms, function(v, i, utms) {
            if ((' ' + sd.source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1) {
              $utms[prefix + i] = utms[i];
            } else {
              otherUtms[prefix_add + i] = utms[i];
            }
          });
          return {
            $utms: $utms,
            otherUtms: otherUtms
          };
        },
        properties: function() {
          return {
            $timezone_offset: new Date().getTimezoneOffset(),
            $screen_height: Number(screen.height) || 0,
            $screen_width: Number(screen.width) || 0,
            $lib: 'js',
            $lib_version: String(sd.lib_version)
          };
        },
        currentProps: {},
        register: function(obj) {
          _.extend(_.info.currentProps, obj);
        }
      };

      _.autoExeQueue = function() {
        var queue = {
          items: [],
          enqueue: function(val) {
            this.items.push(val);
            this.start();
          },
          dequeue: function() {
            return this.items.shift();
          },
          getCurrentItem: function() {
            return this.items[0];
          },
          isRun: false,
          start: function() {
            if (this.items.length > 0 && !this.isRun) {
              this.isRun = true;
              this.getCurrentItem().start();
            }
          },
          close: function() {
            this.dequeue();
            this.isRun = false;
            this.start();
          }
        };
        return queue;
      };

      _.trackLink = function(obj, event_name, event_prop) {
        obj = obj || {};
        var link = null;
        if (obj.ele) {
          link = obj.ele;
        }
        if (obj.event) {
          if (obj.target) {
            link = obj.target;
          } else {
            link = obj.event.target;
          }
        }

        event_prop = event_prop || {};
        if (!link || typeof link !== 'object') {
          return false;
        }
        if (!link.href || /^javascript/.test(link.href) || link.target || link.download || link.onclick) {
          sd.track(event_name, event_prop);
          return false;
        }

        function linkFunc(e) {
          e.stopPropagation();
          e.preventDefault();
          var hasCalled = false;

          function track_a_click() {
            if (!hasCalled) {
              hasCalled = true;
              location.href = link.href;
            }
          }
          setTimeout(track_a_click, 1000);
          sd.track(event_name, event_prop, track_a_click);
        }
        if (obj.event) {
          linkFunc(obj.event);
        }
        if (obj.ele) {
          _.addEvent(obj.ele, 'click', function(e) {
            linkFunc(e);
          });
        }
      };

      _.eventEmitter = function() {
        this._events = [];
        this.pendingEvents = [];
      };

      _.eventEmitter.prototype = {
        emit: function(type) {
          var args = [].slice.call(arguments, 1);

          _.each(this._events, function(val) {
            if (val.type !== type) {
              return;
            }
            val.callback.apply(val.context, args);
          });
        },
        on: function(event, callback, context) {
          if (typeof callback !== 'function') {
            return;
          }
          this._events.push({
            type: event,
            callback: callback,
            context: context || this
          });
        },
        tempAdd: function(event, data) {
          if (!data || !event) {
            return;
          }

          this.pendingEvents.push({
            type: event,
            data: data
          });
          this.pendingEvents.length > 20 ? this.pendingEvents.shift() : null;
        },
        isReady: function() {
          var that = this;
          this.tempAdd = this.emit;

          if (this.pendingEvents.length === 0) {
            return;
          }
          _.each(this.pendingEvents, function(val) {
            that.emit(val.type, val.data);
          });

          this.pendingEvents = [];
        }
      };

      _.rot13obfs = function(str, key) {
        str = String(str);
        key = typeof key === 'number' ? key : 13;
        var n = 126;

        var chars = str.split('');

        for (var i = 0, len = chars.length; i < len; i++) {
          var c = chars[i].charCodeAt(0);

          if (c < n) {
            chars[i] = String.fromCharCode((chars[i].charCodeAt(0) + key) % n);
          }
        }

        return chars.join('');
      };

      _.rot13defs = function(str) {
        var key = 13,
          n = 126,
          str = String(str);

        return _.rot13obfs(str, n - key);
      };

      _.urlSafeBase64 = (function() {
        var ENC = {
          '+': '-',
          '/': '_',
          '=': '.'
        };
        var DEC = {
          '-': '+',
          _: '/',
          '.': '='
        };

        var encode = function(base64) {
          return base64.replace(/[+/=]/g, function(m) {
            return ENC[m];
          });
        };

        var decode = function(safe) {
          return safe.replace(/[-_.]/g, function(m) {
            return DEC[m];
          });
        };

        var trim = function(string) {
          return string.replace(/[.=]{1,2}$/, '');
        };

        var isBase64 = function(string) {
          return /^[A-Za-z0-9+/]*[=]{0,2}$/.test(string);
        };

        var isUrlSafeBase64 = function(string) {
          return /^[A-Za-z0-9_-]*[.]{0,2}$/.test(string);
        };

        return {
          encode: encode,
          decode: decode,
          trim: trim,
          isBase64: isBase64,
          isUrlSafeBase64: isUrlSafeBase64
        };
      })();

      _.setCssStyle = function(css) {
        var style = document.createElement('style');
        style.type = 'text/css';
        try {
          style.appendChild(document.createTextNode(css));
        } catch (e) {
          style.styleSheet.cssText = css;
        }
        var head = document.getElementsByTagName('head')[0];
        var firstScript = document.getElementsByTagName('script')[0];
        if (head) {
          if (head.children.length) {
            head.insertBefore(style, head.children[0]);
          } else {
            head.appendChild(style);
          }
        } else {
          firstScript.parentNode.insertBefore(style, firstScript);
        }
      };

      _.isIOS = function() {
        return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
      };

      _.getIOSVersion = function() {
        try {
          var version = navigator.appVersion.match(/OS (\d+)[._](\d+)[._]?(\d+)?/);
          return version && version[1] ? Number.parseInt(version[1], 10) : '';
        } catch (e) {
          return '';
        }
      };

      _.getUA = function() {
        var Sys = {};
        var ua = navigator.userAgent.toLowerCase();
        var s;
        if ((s = ua.match(/opera.([\d.]+)/))) {
          Sys.opera = Number(s[1].split('.')[0]);
        } else if ((s = ua.match(/msie ([\d.]+)/))) {
          Sys.ie = Number(s[1].split('.')[0]);
        } else if ((s = ua.match(/edge.([\d.]+)/))) {
          Sys.edge = Number(s[1].split('.')[0]);
        } else if ((s = ua.match(/firefox\/([\d.]+)/))) {
          Sys.firefox = Number(s[1].split('.')[0]);
        } else if ((s = ua.match(/chrome\/([\d.]+)/))) {
          Sys.chrome = Number(s[1].split('.')[0]);
        } else if ((s = ua.match(/version\/([\d.]+).*safari/))) {
          Sys.safari = Number(s[1].match(/^\d*.\d*/));
        }
        return Sys;
      };

      _.jsonp = function(obj) {
        if (!(_.isObject(obj) && _.isString(obj.callbackName))) {
          sd.log('JSONP 请求缺少 callbackName');
          return false;
        }
        obj.success = _.isFunction(obj.success) ? obj.success : function() {};
        obj.error = _.isFunction(obj.error) ? obj.error : function() {};
        obj.data = obj.data || '';
        var script = document.createElement('script');
        var head = document.getElementsByTagName('head')[0];
        var timer = null;
        head.appendChild(script);
        if (_.isNumber(obj.timeout)) {
          timer = setTimeout(function() {
            obj.error('timeout');
            window[obj.callbackName] = function() {
              sd.log('call jsonp error');
            };
            timer = null;
            head.removeChild(script);
          }, obj.timeout);
        }
        window[obj.callbackName] = function(data) {
          obj.success(data);
          window[obj.callbackName] = function() {
            sd.log('call jsonp error');
          };
          clearTimeout(timer);
          timer = null;
          head.removeChild(script);
        };
        if (obj.url.indexOf('?') > -1) {
          obj.url += '&callbackName=' + obj.callbackName;
        } else {
          obj.url += '?callbackName=' + obj.callbackName;
        }
        if (_.isObject(obj.data)) {
          var arr = [];
          _.each(obj.data, function(value, key) {
            arr.push(key + '=' + value);
          });
          obj.data = arr.join('&');
          obj.url += '&' + obj.data;
        }
        script.onerror = function(err) {
          window[obj.callbackName] = function() {
            sd.log('call jsonp error');
          };
          clearTimeout(timer);
          timer = null;
          head.removeChild(script);
          obj.error(err);
        };
        script.src = obj.url;
      };

      _.isSupportBeaconSend = function() {
        var Sys = _.getUA();
        var supported = false;
        var ua = navigator.userAgent.toLowerCase();
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
          var reg = /os [\d._]*/gi;
          var verinfo = ua.match(reg);
          var version = (verinfo + '').replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.');
          var ver = version.split('.');
          if (typeof Sys.safari === 'undefined') {
            Sys.safari = ver[0];
          }
          if (ver[0] && ver[0] < 13) {
            if (Sys.chrome > 41 || Sys.firefox > 30 || Sys.opera > 25 || Sys.safari > 12) {
              supported = true;
            }
          } else if (Sys.chrome > 41 || Sys.firefox > 30 || Sys.opera > 25 || Sys.safari > 11.3) {
            supported = true;
          }
        } else {
          if (Sys.chrome > 38 || Sys.edge > 13 || Sys.firefox > 30 || Sys.opera > 25 || Sys.safari > 11.0) {
            supported = true;
          }
        }
        return supported;
      };

      _.secCheck = {
        isHTTPURL: function(str) {
          if (typeof str !== 'string') return false;
          var _regex = /^https?:\/\/.+/;
          if (_regex.test(str) === false) {
            sd.log('Invalid URL');
            return false;
          }
          return true;
        },
        removeScriptProtocol: function(str) {
          if (typeof str !== 'string') return '';
          var _regex = /^\s*javascript:/i;
          while (_regex.test(str)) {
            str = str.replace(_regex, '');
          }
          return str;
        }
      };
    })();;


    sd.para_default = {
      preset_properties: {
        latest_utm: true,
        latest_traffic_source_type: true,
        latest_search_keyword: true,
        latest_referrer: true,
        latest_referrer_host: false,
        latest_landing_page: false,
        latest_wx_ad_click_id: undefined,
        url: true,
        title: true
      },
      encrypt_cookie: false,
      img_use_crossorigin: false,

      name: 'sa',
      max_referrer_string_length: 200,
      max_string_length: 500,
      cross_subdomain: true,
      show_log: true,
      is_debug: false,
      debug_mode: false,
      debug_mode_upload: false,

      session_time: 0,

      use_client_time: false,
      source_channel: [],

      send_type: 'image',

      vtrack_ignore: {},

      auto_init: true,

      is_track_single_page: false,

      is_single_page: false,

      batch_send: false,

      source_type: {},
      callback_timeout: 200,
      datasend_timeout: 3000,
      queue_timeout: 300,
      is_track_device_id: false,
      ignore_oom: true,
      app_js_bridge: false,
      url_is_decode: false
    };

    sd.addReferrerHost = function(data) {
      var defaultHost = '取值异常';
      if (_.isObject(data.properties)) {
        if (data.properties.$first_referrer) {
          data.properties.$first_referrer_host = _.getHostname(data.properties.$first_referrer, defaultHost);
        }
        if (data.type === 'track' || data.type === 'track_signup') {
          if ('$referrer' in data.properties) {
            data.properties.$referrer_host = data.properties.$referrer === '' ? '' : _.getHostname(data.properties.$referrer, defaultHost);
          }
          if (sd.para.preset_properties.latest_referrer && sd.para.preset_properties.latest_referrer_host) {
            data.properties.$latest_referrer_host = data.properties.$latest_referrer === '' ? '' : _.getHostname(data.properties.$latest_referrer, defaultHost);
          }
        }
      }
    };

    sd.addPropsHook = function(data) {
      if (sd.para.preset_properties && sd.para.preset_properties.url && (data.type === 'track' || data.type === 'track_signup') && typeof data.properties.$url === 'undefined') {
        data.properties.$url = _.isDecodeURI(sd.para.url_is_decode, window.location.href);
      }
      if (sd.para.preset_properties && sd.para.preset_properties.title && (data.type === 'track' || data.type === 'track_signup') && typeof data.properties.$title === 'undefined') {
        data.properties.$title = document.title;
      }
    };

    sd.initPara = function(para) {
      sd.para = para || sd.para || {};
      var latestObj = {};
      if (_.isObject(sd.para.is_track_latest)) {
        for (var latestProp in sd.para.is_track_latest) {
          latestObj['latest_' + latestProp] = sd.para.is_track_latest[latestProp];
        }
      }
      sd.para.preset_properties = _.extend({}, sd.para_default.preset_properties, latestObj, sd.para.preset_properties || {});

      var i;
      for (i in sd.para_default) {
        if (sd.para[i] === void 0) {
          sd.para[i] = sd.para_default[i];
        }
      }
      if (typeof sd.para.server_url === 'string') {
        sd.para.server_url = _.trim(sd.para.server_url);
        if (sd.para.server_url) {
          if (sd.para.server_url.slice(0, 3) === '://') {
            sd.para.server_url = location.protocol.slice(0, -1) + sd.para.server_url;
          } else if (sd.para.server_url.slice(0, 2) === '//') {
            sd.para.server_url = location.protocol + sd.para.server_url;
          } else if (sd.para.server_url.slice(0, 4) !== 'http') {
            sd.para.server_url = '';
          }
        }
      } else {
        sd.para.server_url = '';
      }

      if (typeof sd.para.web_url === 'string' && (sd.para.web_url.slice(0, 3) === '://' || sd.para.web_url.slice(0, 2) === '//')) {
        if (sd.para.web_url.slice(0, 3) === '://') {
          sd.para.web_url = location.protocol.slice(0, -1) + sd.para.web_url;
        } else {
          sd.para.web_url = location.protocol + sd.para.web_url;
        }
      }

      if (sd.para.send_type !== 'image' && sd.para.send_type !== 'ajax' && sd.para.send_type !== 'beacon') {
        sd.para.send_type = 'image';
      }

      sd.debug.protocol.serverUrl();

      sd.bridge.initPara();
      sd.bridge.initState();

      var batch_send_default = {
        datasend_timeout: 6000,
        send_interval: 6000
      };

      if (_.localStorage.isSupport() && _.isSupportCors() && typeof localStorage === 'object') {
        if (sd.para.batch_send === true) {
          sd.para.batch_send = _.extend({}, batch_send_default);
          sd.para.use_client_time = true;
        } else if (typeof sd.para.batch_send === 'object') {
          sd.para.use_client_time = true;
          sd.para.batch_send = _.extend({}, batch_send_default, sd.para.batch_send);
        }
      } else {
        sd.para.batch_send = false;
      }

      var utm_type = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
      var search_type = ['www.baidu.', 'm.baidu.', 'm.sm.cn', 'so.com', 'sogou.com', 'youdao.com', 'google.', 'yahoo.com/', 'bing.com/', 'ask.com/'];
      var social_type = ['weibo.com', 'renren.com', 'kaixin001.com', 'douban.com', 'qzone.qq.com', 'zhihu.com', 'tieba.baidu.com', 'weixin.qq.com'];
      var search_keyword = {
        baidu: ['wd', 'word', 'kw', 'keyword'],
        google: 'q',
        bing: 'q',
        yahoo: 'p',
        sogou: ['query', 'keyword'],
        so: 'q',
        sm: 'q'
      };

      if (typeof sd.para.source_type === 'object') {
        sd.para.source_type.utm = _.isArray(sd.para.source_type.utm) ? sd.para.source_type.utm.concat(utm_type) : utm_type;
        sd.para.source_type.search = _.isArray(sd.para.source_type.search) ? sd.para.source_type.search.concat(search_type) : search_type;
        sd.para.source_type.social = _.isArray(sd.para.source_type.social) ? sd.para.source_type.social.concat(social_type) : social_type;
        sd.para.source_type.keyword = _.isObject(sd.para.source_type.keyword) ? _.extend(search_keyword, sd.para.source_type.keyword) : search_keyword;
      }
      var collect_tags_default = {
        div: false
      };
      var ignore_tags_default = ['mark', '/mark', 'strong', 'b', 'em', 'i', 'u', 'abbr', 'ins', 'del', 's', 'sup'];
      if (_.isObject(sd.para.heatmap)) {
        sd.para.heatmap.clickmap = sd.para.heatmap.clickmap || 'default';
        sd.para.heatmap.scroll_notice_map = sd.para.heatmap.scroll_notice_map || 'default';
        sd.para.heatmap.scroll_delay_time = sd.para.heatmap.scroll_delay_time || 4000;
        sd.para.heatmap.scroll_event_duration = sd.para.heatmap.scroll_event_duration || 18000;
        sd.para.heatmap.renderRefreshTime = sd.para.heatmap.renderRefreshTime || 1000;
        sd.para.heatmap.loadTimeout = sd.para.heatmap.loadTimeout || 1000;
        var trackAttrs = _.isArray(sd.para.heatmap.track_attr) ?
          _.filter(sd.para.heatmap.track_attr, function(v) {
            return v && typeof v === 'string';
          }) :
          [];
        trackAttrs.push('data-sensors-click');
        sd.para.heatmap.track_attr = trackAttrs;

        if (_.isObject(sd.para.heatmap.collect_tags)) {
          if (sd.para.heatmap.collect_tags.div === true) {
            sd.para.heatmap.collect_tags.div = {
              ignore_tags: ignore_tags_default
            };
          } else if (_.isObject(sd.para.heatmap.collect_tags.div)) {
            if (sd.para.heatmap.collect_tags.div.ignore_tags) {
              if (!_.isArray(sd.para.heatmap.collect_tags.div.ignore_tags)) {
                sd.log('ignore_tags 参数必须是数组格式');
                sd.para.heatmap.collect_tags.div.ignore_tags = ignore_tags_default;
              }
            } else {
              sd.para.heatmap.collect_tags.div.ignore_tags = ignore_tags_default;
            }
          } else {
            sd.para.heatmap.collect_tags.div = false;
          }
        } else {
          sd.para.heatmap.collect_tags = collect_tags_default;
        }
      }
      if (_.isArray(sd.para.server_url) && sd.para.server_url.length) {
        for (i = 0; i < sd.para.server_url.length; i++) {
          if (!/sa\.gif[^\/]*$/.test(sd.para.server_url[i])) {
            sd.para.server_url[i] = sd.para.server_url[i].replace(/\/sa$/, '/sa.gif').replace(/(\/sa)(\?[^\/]+)$/, '/sa.gif$2');
          }
        }
      } else if (!/sa\.gif[^\/]*$/.test(sd.para.server_url) && typeof sd.para.server_url === 'string') {
        sd.para.server_url = sd.para.server_url.replace(/\/sa$/, '/sa.gif').replace(/(\/sa)(\?[^\/]+)$/, '/sa.gif$2');
      }
      if (typeof sd.para.server_url === 'string') {
        sd.para.debug_mode_url = sd.para.debug_mode_url || sd.para.server_url.replace('sa.gif', 'debug');
      }
      if (sd.para.noCache === true) {
        sd.para.noCache = '?' + new Date().getTime();
      } else {
        sd.para.noCache = '';
      }

      if (sd.para.callback_timeout > sd.para.datasend_timeout) {
        sd.para.datasend_timeout = sd.para.callback_timeout;
      }
      if (sd.para.callback_timeout > sd.para.queue_timeout) {
        sd.para.queue_timeout = sd.para.callback_timeout;
      }
      if (sd.para.queue_timeout > sd.para.datasend_timeout) {
        sd.para.datasend_timeout = sd.para.queue_timeout;
      }
    };

    sd.readyState = {
      state: 0,
      historyState: [],
      stateType: {
        1: '1-init未开始',
        2: '2-init开始',
        3: '3-store完成'
      },
      getState: function() {
        return this.historyState.join('\n');
      },
      setState: function(n) {
        if (String(n) in this.stateType) {
          this.state = n;
        }
        this.historyState.push(this.stateType[n]);
      }
    };

    sd.setPreConfig = function(sa) {
      sd.para = sa.para;
      sd._q = sa._q;
    };

    sd.setInitVar = function() {
      sd._t = sd._t || 1 * new Date();
      sd.lib_version = '1.16.10';
      sd.is_first_visitor = false;
      sd.source_channel_standard = 'utm_source utm_medium utm_campaign utm_content utm_term';
    };

    sd.log = function() {
      if ((_.sessionStorage.isSupport() && sessionStorage.getItem('sensorsdata_jssdk_debug') === 'true') || sd.para.show_log) {
        if (_.isObject(arguments[0]) && (sd.para.show_log === true || sd.para.show_log === 'string' || sd.para.show_log === false)) {
          arguments[0] = _.formatJsonString(arguments[0]);
        }

        if (typeof console === 'object' && console.log) {
          try {
            return console.log.apply(console, arguments);
          } catch (e) {
            console.log(arguments[0]);
          }
        }
      }
    };

    sd.enableLocalLog = function() {
      if (_.sessionStorage.isSupport()) {
        try {
          sessionStorage.setItem('sensorsdata_jssdk_debug', 'true');
        } catch (e) {
          sd.log('enableLocalLog error: ' + e.message);
        }
      }
    };

    sd.disableLocalLog = function() {
      if (_.sessionStorage.isSupport()) {
        sessionStorage.removeItem('sensorsdata_jssdk_debug');
      }
    };

    sd.debug = {
      distinct_id: function() {},
      jssdkDebug: function() {},
      _sendDebug: function(debugString) {
        sd.track('_sensorsdata2019_debug', {
          _jssdk_debug_info: debugString
        });
      },
      apph5: function(obj) {
        var name = 'app_h5打通失败-';
        var relation = {
          1: name + 'use_app_track为false',
          2: name + 'Android或者iOS，没有暴露相应方法',
          3.1: name + 'Android校验server_url失败',
          3.2: name + 'iOS校验server_url失败',
          4.1: name + 'H5 校验 iOS server_url 失败',
          4.2: name + 'H5 校验 Android server_url 失败'
        };
        var output = obj.output;
        var step = obj.step;
        var data = obj.data || '';
        if (output === 'all' || output === 'console') {
          sd.log(relation[step]);
        }
        if ((output === 'all' || output === 'code') && _.isObject(sd.para.is_debug) && sd.para.is_debug.apph5) {
          if (!data.type || data.type.slice(0, 7) !== 'profile') {
            data.properties._jssdk_debug_info = 'apph5-' + String(step);
          }
        }
      },
      defineMode: function(type) {
        var debugList = {
          1: {
            title: '当前页面无法进行可视化全埋点',
            message: 'App SDK 与 Web JS SDK 没有进行打通，请联系贵方技术人员修正 App SDK 的配置，详细信息请查看文档。',
            link_text: '配置文档',
            link_url: 'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html'
          },
          2: {
            title: '当前页面无法进行可视化全埋点',
            message: 'App SDK 与 Web JS SDK 没有进行打通，请联系贵方技术人员修正 Web JS SDK 的配置，详细信息请查看文档。',
            link_text: '配置文档',
            link_url: 'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html'
          },
          3: {
            title: '当前页面无法进行可视化全埋点',
            message: 'Web JS SDK 没有开启全埋点配置，请联系贵方工作人员修正 SDK 的配置，详细信息请查看文档。',
            link_text: '配置文档',
            link_url: 'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_web_all-1573964.html'
          },
          4: {
            title: '当前页面无法进行可视化全埋点',
            message: 'Web JS SDK 配置的数据校验地址与 App SDK 配置的数据校验地址不一致，请联系贵方工作人员修正 SDK 的配置，详细信息请查看文档。',
            link_text: '配置文档',
            link_url: 'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html'
          }
        };
        if (type && debugList[type]) {
          return debugList[type];
        } else {
          return false;
        }
      },
      protocol: {
        protocolIsSame: function(url1, url2) {
          try {
            if (_.URL(url1).protocol !== _.URL(url2).protocol) {
              return false;
            }
          } catch (error) {
            sd.log('不支持 _.URL 方法');
            return false;
          }
          return true;
        },
        serverUrl: function() {
          if (_.isString(sd.para.server_url) && sd.para.server_url !== '' && !this.protocolIsSame(sd.para.server_url, location.href)) {
            sd.log('SDK 检测到您的数据发送地址和当前页面地址的协议不一致，建议您修改成一致的协议。\n因为：1、https 下面发送 http 的图片请求会失败。2、http 页面使用 https + ajax 方式发数据，在 ie9 及以下会丢失数据。');
          }
        },
        ajax: function(url) {
          if (url === sd.para.server_url) {
            return false;
          }
          if (_.isString(url) && url !== '' && !this.protocolIsSame(url, location.href)) {
            sd.log('SDK 检测到您的数据发送地址和当前页面地址的协议不一致，建议您修改成一致的协议。因为 http 页面使用 https + ajax 方式发数据，在 ie9 及以下会丢失数据。');
          }
        }
      }
    };

    var commonWays = {
      setOnlineState: function(state) {
        if (state === true && _.isObject(sd.para.jsapp) && typeof sd.para.jsapp.getData === 'function') {
          sd.para.jsapp.isOnline = true;
          var arr = sd.para.jsapp.getData();
          if (_.isArray(arr) && arr.length > 0) {
            _.each(arr, function(str) {
              if (_.isJSONString(str)) {
                sd.sendState.pushSend(JSON.parse(str));
              }
            });
          }
        } else {
          sd.para.jsapp.isOnline = false;
        }
      },
      autoTrackIsUsed: false,
      isReady: function(callback) {
        callback();
      },
      getUtm: function() {
        return _.info.campaignParams();
      },
      getStayTime: function() {
        return (new Date() - sd._t) / 1000;
      },
      setProfileLocal: function(obj) {
        if (!_.localStorage.isSupport()) {
          sd.setProfile(obj);
          return false;
        }
        if (!_.isObject(obj) || _.isEmptyObject(obj)) {
          return false;
        }
        var saveData = _.localStorage.parse('sensorsdata_2015_jssdk_profile');
        var isNeedSend = false;
        if (_.isObject(saveData) && !_.isEmptyObject(saveData)) {
          for (var i in obj) {
            if ((i in saveData && saveData[i] !== obj[i]) || !(i in saveData)) {
              saveData[i] = obj[i];
              isNeedSend = true;
            }
          }
          if (isNeedSend) {
            _.localStorage.set('sensorsdata_2015_jssdk_profile', JSON.stringify(saveData));
            sd.setProfile(obj);
          }
        } else {
          _.localStorage.set('sensorsdata_2015_jssdk_profile', JSON.stringify(obj));
          sd.setProfile(obj);
        }
      },
      setInitReferrer: function() {
        var _referrer = _.getReferrer();
        sd.setOnceProfile({
          _init_referrer: _referrer,
          _init_referrer_host: _.info.pageProp.referrer_host
        });
      },
      setSessionReferrer: function() {
        var _referrer = _.getReferrer();
        store.setSessionPropsOnce({
          _session_referrer: _referrer,
          _session_referrer_host: _.info.pageProp.referrer_host
        });
      },
      setDefaultAttr: function() {
        _.info.register({
          _current_url: location.href,
          _referrer: _.getReferrer(),
          _referring_host: _.info.pageProp.referrer_host
        });
      },
      trackHeatMap: function(target, props, callback) {
        if (typeof target === 'object' && target.tagName) {
          var tagName = target.tagName.toLowerCase();
          var parent_ele = target.parentNode.tagName.toLowerCase();
          var trackAttrs = sd.para.heatmap && sd.para.heatmap.track_attr ? sd.para.heatmap.track_attr : ['data-sensors-click'];
          if (tagName !== 'button' && tagName !== 'a' && parent_ele !== 'a' && parent_ele !== 'button' && tagName !== 'input' && tagName !== 'textarea' && !_.hasAttributes(target, trackAttrs)) {
            heatmap.start(null, target, tagName, props, callback);
          }
        }
      },
      trackAllHeatMap: function(target, props, callback) {
        if (typeof target === 'object' && target.tagName) {
          var tagName = target.tagName.toLowerCase();
          heatmap.start(null, target, tagName, props, callback);
        }
      },
      autoTrackSinglePage: function(para, callback) {
        if (this.autoTrackIsUsed) {
          var url = _.info.pageProp.url;
        } else {
          var url = _.info.pageProp.referrer;
        }
        para = _.isObject(para) ? para : {};

        para = _.isObject(para) ? para : {};

        function getUtm() {
          var utms = _.info.campaignParams();
          var $utms = {};
          _.each(utms, function(v, i, utms) {
            if ((' ' + sd.source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1) {
              $utms['$' + i] = utms[i];
            } else {
              $utms[i] = utms[i];
            }
          });
          return $utms;
        }

        if (sd.is_first_visitor && !para.not_set_profile) {
          sd.setOnceProfile(
            _.extend({
                $first_visit_time: new Date(),
                $first_referrer: _.isDecodeURI(sd.para.url_is_decode, _.getReferrer()),
                $first_browser_language: navigator.language || '取值异常',
                $first_browser_charset: typeof document.charset === 'string' ? document.charset.toUpperCase() : '取值异常',
                $first_traffic_source_type: _.getSourceFromReferrer(),
                $first_search_keyword: _.getKeywordFromReferrer()
              },
              getUtm()
            )
          );
          sd.is_first_visitor = false;
        }
        if (para.not_set_profile) {
          delete para.not_set_profile;
        }

        function closure(p, c) {
          sd.track(
            '$pageview',
            _.extend({
                $referrer: _.isDecodeURI(sd.para.url_is_decode, url),
                $url: _.isDecodeURI(sd.para.url_is_decode, location.href),
                $url_path: location.pathname,
                $title: document.title
              },
              p,
              getUtm()
            ),
            c
          );
          url = location.href;
        }
        closure(para, callback);
        this.autoTrackSinglePage = closure;
      },
      autoTrackWithoutProfile: function(para, callback) {
        para = _.isObject(para) ? para : {};
        this.autoTrack(_.extend(para, {
          not_set_profile: true
        }), callback);
      },
      autoTrack: function(para, callback) {
        para = _.isObject(para) ? para : {};

        var utms = _.info.campaignParams();
        var $utms = {};
        _.each(utms, function(v, i, utms) {
          if ((' ' + sd.source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1) {
            $utms['$' + i] = utms[i];
          } else {
            $utms[i] = utms[i];
          }
        });
        if (sd.is_first_visitor && !para.not_set_profile) {
          sd.setOnceProfile(
            _.extend({
                $first_visit_time: new Date(),
                $first_referrer: _.isDecodeURI(sd.para.url_is_decode, _.getReferrer()),
                $first_browser_language: navigator.language || '取值异常',
                $first_browser_charset: typeof document.charset === 'string' ? document.charset.toUpperCase() : '取值异常',
                $first_traffic_source_type: _.getSourceFromReferrer(),
                $first_search_keyword: _.getKeywordFromReferrer()
              },
              $utms
            )
          );
          sd.is_first_visitor = false;
        }
        if (para.not_set_profile) {
          delete para.not_set_profile;
        }

        var current_page_url = location.href;

        if (sd.para.is_single_page) {
          _.addHashEvent(function() {
            var referrer = _.getReferrer(current_page_url);
            sd.track(
              '$pageview',
              _.extend({
                  $referrer: _.isDecodeURI(sd.para.url_is_decode, referrer),
                  $url: _.isDecodeURI(sd.para.url_is_decode, location.href),
                  $url_path: location.pathname,
                  $title: document.title
                },
                $utms,
                para
              ),
              callback
            );
            current_page_url = location.href;
          });
        }
        sd.track(
          '$pageview',
          _.extend({
              $referrer: _.isDecodeURI(sd.para.url_is_decode, _.getReferrer()),
              $url: _.isDecodeURI(sd.para.url_is_decode, location.href),
              $url_path: location.pathname,
              $title: document.title
            },
            $utms,
            para
          ),
          callback
        );
        this.autoTrackIsUsed = true;
      },
      getAnonymousID: function() {
        if (_.isEmptyObject(sd.store._state)) {
          return '请先初始化SDK';
        } else {
          return sd.store._state._first_id || sd.store._state.first_id || sd.store._state._distinct_id || sd.store._state.distinct_id;
        }
      },
      setPlugin: function(para) {
        if (!_.isObject(para)) {
          return false;
        }
        _.each(para, function(v, k) {
          if (_.isFunction(v)) {
            if (_.isObject(window.SensorsDataWebJSSDKPlugin) && window.SensorsDataWebJSSDKPlugin[k]) {
              v(window.SensorsDataWebJSSDKPlugin[k]);
            } else {
              sd.log(k + '没有获取到,请查阅文档，调整' + k + '的引入顺序！');
            }
          }
        });
      },
      useModulePlugin: function() {
        sd.use.apply(sd, arguments);
      },
      useAppPlugin: function() {
        this.setPlugin.apply(this, arguments);
      }
    };

    sd.quick = function() {
      var arg = Array.prototype.slice.call(arguments);
      var arg0 = arg[0];
      var arg1 = arg.slice(1);
      if (typeof arg0 === 'string' && commonWays[arg0]) {
        return commonWays[arg0].apply(commonWays, arg1);
      } else if (typeof arg0 === 'function') {
        arg0.apply(sd, arg1);
      } else {
        sd.log('quick方法中没有这个功能' + arg[0]);
      }
    };


    sd.use = function(name, option) {
      if (!_.isString(name)) {
        sd.log('use插件名称必须是字符串！');
        return false;
      }

      if (_.isObject(window.SensorsDataWebJSSDKPlugin) && _.isObject(window.SensorsDataWebJSSDKPlugin[name]) && _.isFunction(window.SensorsDataWebJSSDKPlugin[name].init)) {
        window.SensorsDataWebJSSDKPlugin[name].init(sd, option);
        return window.SensorsDataWebJSSDKPlugin[name];
      } else if (_.isObject(sd.modules) && _.isObject(sd.modules[name]) && _.isFunction(sd.modules[name].init)) {
        sd.modules[name].init(sd, option);
        return sd.modules[name];
      } else {
        sd.log(name + '没有获取到,请查阅文档，调整' + name + '的引入顺序！');
      }
    };

    sd.track = function(e, p, c) {
      if (saEvent.check({
          event: e,
          properties: p
        })) {
        saEvent.send({
            type: 'track',
            event: e,
            properties: p
          },
          c
        );
      }
    };

    sd.trackLink = function(link, event_name, event_prop) {
      if (typeof link === 'object' && link.tagName) {
        _.trackLink({
          ele: link
        }, event_name, event_prop);
      } else if (typeof link === 'object' && link.target && link.event) {
        _.trackLink(link, event_name, event_prop);
      }
    };
    sd.trackLinks = function(link, event_name, event_prop) {
      var ele = link;
      event_prop = event_prop || {};
      if (!link || typeof link !== 'object') {
        return false;
      }
      if (!link.href || /^javascript/.test(link.href) || link.target) {
        return false;
      }
      _.addEvent(link, 'click', function(e) {
        e.preventDefault();
        var hasCalled = false;
        setTimeout(track_a_click, 1000);

        function track_a_click() {
          if (!hasCalled) {
            hasCalled = true;
            location.href = link.href;
          }
        }
        sd.track(event_name, event_prop, track_a_click);
      });
    };

    sd.setProfile = function(p, c) {
      if (saEvent.check({
          propertiesMust: p
        })) {
        saEvent.send({
            type: 'profile_set',
            properties: p
          },
          c
        );
      }
    };

    sd.setOnceProfile = function(p, c) {
      if (saEvent.check({
          propertiesMust: p
        })) {
        saEvent.send({
            type: 'profile_set_once',
            properties: p
          },
          c
        );
      }
    };

    sd.appendProfile = function(p, c) {
      if (saEvent.check({
          propertiesMust: p
        })) {
        _.each(p, function(value, key) {
          if (_.isString(value)) {
            p[key] = [value];
          } else if (_.isArray(value)) {
            p[key] = value;
          } else {
            delete p[key];
            sd.log('appendProfile属性的值必须是字符串或者数组');
          }
        });
        if (!_.isEmptyObject(p)) {
          saEvent.send({
              type: 'profile_append',
              properties: p
            },
            c
          );
        }
      }
    };
    sd.incrementProfile = function(p, c) {
      var str = p;
      if (_.isString(p)) {
        p = {};
        p[str] = 1;
      }

      function isChecked(p) {
        for (var i in p) {
          if (Object.prototype.hasOwnProperty.call(p, i) && !/-*\d+/.test(String(p[i]))) {
            return false;
          }
        }
        return true;
      }

      if (saEvent.check({
          propertiesMust: p
        })) {
        if (isChecked(p)) {
          saEvent.send({
              type: 'profile_increment',
              properties: p
            },
            c
          );
        } else {
          sd.log('profile_increment的值只能是数字');
        }
      }
    };

    sd.deleteProfile = function(c) {
      saEvent.send({
          type: 'profile_delete'
        },
        c
      );
      store.set('distinct_id', _.UUID());
      store.set('first_id', '');
    };
    sd.unsetProfile = function(p, c) {
      var str = p;
      var temp = {};
      if (_.isString(p)) {
        p = [];
        p.push(str);
      }
      if (_.isArray(p)) {
        _.each(p, function(v) {
          if (_.isString(v)) {
            temp[v] = true;
          } else {
            sd.log('profile_unset给的数组里面的值必须时string,已经过滤掉', v);
          }
        });
        saEvent.send({
            type: 'profile_unset',
            properties: temp
          },
          c
        );
      } else {
        sd.log('profile_unset的参数是数组');
      }
    };
    sd.identify = function(id, isSave) {
      if (typeof id === 'number') {
        id = String(id);
      }
      var firstId = store.getFirstId();
      if (typeof id === 'undefined') {
        var uuid = _.UUID();
        if (firstId) {
          store.set('first_id', uuid);
        } else {
          store.set('distinct_id', uuid);
        }
      } else if (saEvent.check({
          distinct_id: id
        })) {
        if (isSave === true) {
          if (firstId) {
            store.set('first_id', id);
          } else {
            store.set('distinct_id', id);
          }
        } else {
          if (firstId) {
            store.change('first_id', id);
          } else {
            store.change('distinct_id', id);
          }
        }
      } else {
        sd.log('identify的参数必须是字符串');
      }
    };
    sd.trackSignup = function(id, e, p, c) {
      if (saEvent.check({
          distinct_id: id,
          event: e,
          properties: p
        })) {
        var original_id = store.getFirstId() || store.getDistinctId();
        store.set('distinct_id', id);
        saEvent.send({
            original_id: original_id,
            distinct_id: id,
            type: 'track_signup',
            event: e,
            properties: p
          },
          c
        );
      }
    };


    sd.registerPage = function(obj) {
      if (saEvent.check({
          properties: obj
        })) {
        _.extend(_.info.currentProps, obj);
      } else {
        sd.log('register输入的参数有误');
      }
    };

    sd.clearAllRegister = function(arr) {
      store.clearAllProps(arr);
    };

    sd.clearPageRegister = function(arr) {
      if (_.isArray(arr) && arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
          if (_.isString(arr[i]) && arr[i] in _.info.currentProps) {
            delete _.info.currentProps[arr[i]];
          }
        }
      } else if (arr === true) {
        for (var i in _.info.currentProps) {
          delete _.info.currentProps[i];
        }
      }
    };

    sd.register = function(props) {
      if (saEvent.check({
          properties: props
        })) {
        store.setProps(props);
      } else {
        sd.log('register输入的参数有误');
      }
    };

    sd.registerOnce = function(props) {
      if (saEvent.check({
          properties: props
        })) {
        store.setPropsOnce(props);
      } else {
        sd.log('registerOnce输入的参数有误');
      }
    };

    sd.registerSession = function(props) {
      if (saEvent.check({
          properties: props
        })) {
        store.setSessionProps(props);
      } else {
        sd.log('registerSession输入的参数有误');
      }
    };

    sd.registerSessionOnce = function(props) {
      if (saEvent.check({
          properties: props
        })) {
        store.setSessionPropsOnce(props);
      } else {
        sd.log('registerSessionOnce输入的参数有误');
      }
    };

    sd.login = function(id, callback) {
      if (typeof id === 'number') {
        id = String(id);
      }
      if (saEvent.check({
          distinct_id: id
        })) {
        var firstId = store.getFirstId();
        var distinctId = store.getDistinctId();
        if (id !== distinctId) {
          if (!firstId) {
            store.set('first_id', distinctId);
          }
          sd.trackSignup(id, '$SignUp', {}, callback);
        } else {
          callback && callback();
        }
      } else {
        sd.log('login的参数必须是字符串');
        callback && callback();
      }
    };

    sd.logout = function(isChangeId) {
      var firstId = store.getFirstId();
      if (firstId) {
        store.set('first_id', '');
        if (isChangeId === true) {
          var uuid = _.UUID();
          store.set('distinct_id', uuid);
        } else {
          store.set('distinct_id', firstId);
        }
      } else {
        sd.log('没有first_id，logout失败');
      }
    };

    sd.getPresetProperties = function() {
      function getUtm() {
        var utms = _.info.campaignParams();
        var $utms = {};
        _.each(utms, function(v, i, utms) {
          if ((' ' + sd.source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1) {
            $utms['$' + i] = utms[i];
          } else {
            $utms[i] = utms[i];
          }
        });
        return $utms;
      }

      var obj = {
        $is_first_day: _.cookie.getNewUser(),
        $referrer: _.isDecodeURI(sd.para.url_is_decode, _.info.pageProp.referrer) || '',
        $referrer_host: _.info.pageProp.referrer ? _.getHostname(_.info.pageProp.referrer) : '',
        $url: _.isDecodeURI(sd.para.url_is_decode, location.href),
        $url_path: location.pathname,
        $title: document.title || '',
        _distinct_id: store.getDistinctId()
      };
      var result = _.extend({}, _.info.properties(), sd.store.getProps(), getUtm(), obj);
      if (sd.para.preset_properties.latest_referrer && sd.para.preset_properties.latest_referrer_host) {
        result.$latest_referrer_host = result.$latest_referrer === '' ? '' : _.getHostname(result.$latest_referrer);
      }
      return result;
    };

    sd.detectMode = function() {
      var heatmapMode = {
        searchKeywordMatch: location.search.match(/sa-request-id=([^&#]+)/),
        isSeachHasKeyword: function() {
          var match = this.searchKeywordMatch;
          if (match && match[0] && match[1]) {
            if (typeof sessionStorage.getItem('sensors-visual-mode') === 'string') {
              sessionStorage.removeItem('sensors-visual-mode');
            }
            return true;
          } else {
            return false;
          }
        },
        hasKeywordHandle: function() {
          var match = this.searchKeywordMatch;
          var type = location.search.match(/sa-request-type=([^&#]+)/);
          var web_url = location.search.match(/sa-request-url=([^&#]+)/);
          heatmap.setNotice(web_url);
          if (_.sessionStorage.isSupport()) {
            if (web_url && web_url[0] && web_url[1]) {
              sessionStorage.setItem('sensors_heatmap_url', decodeURIComponent(web_url[1]));
            }
            sessionStorage.setItem('sensors_heatmap_id', match[1]);
            if (type && type[0] && type[1]) {
              if (type[1] === '1' || type[1] === '2' || type[1] === '3') {
                type = type[1];
                sessionStorage.setItem('sensors_heatmap_type', type);
              } else {
                type = null;
              }
            } else {
              if (sessionStorage.getItem('sensors_heatmap_type') !== null) {
                type = sessionStorage.getItem('sensors_heatmap_type');
              } else {
                type = null;
              }
            }
          }
          this.isReady(match[1], type);
        },
        isReady: function(data, type, url) {
          if (sd.para.heatmap_url) {
            _.loadScript({
              success: function() {
                setTimeout(function() {
                  if (typeof sa_jssdk_heatmap_render !== 'undefined') {
                    sa_jssdk_heatmap_render(sd, data, type, url);
                    if (typeof console === 'object' && typeof console.log === 'function') {
                      if (!(sd.heatmap_version && sd.heatmap_version === sd.lib_version)) {
                        console.log('heatmap.js与sensorsdata.js版本号不一致，可能存在风险!');
                      }
                    }
                  }
                }, 0);
              },
              error: function() {},
              type: 'js',
              url: sd.para.heatmap_url
            });
          } else {
            sd.log('没有指定heatmap_url的路径');
          }
        },
        isStorageHasKeyword: function() {
          return _.sessionStorage.isSupport() && typeof sessionStorage.getItem('sensors_heatmap_id') === 'string';
        },
        storageHasKeywordHandle: function() {
          heatmap.setNotice();
          heatmapMode.isReady(sessionStorage.getItem('sensors_heatmap_id'), sessionStorage.getItem('sensors_heatmap_type'), location.href);
        }
      };

      var vtrackMode = {
        isStorageHasKeyword: function() {
          return _.sessionStorage.isSupport() && typeof sessionStorage.getItem('sensors-visual-mode') === 'string';
        },
        isSearchHasKeyword: function() {
          if (location.search.match(/sa-visual-mode=true/)) {
            if (typeof sessionStorage.getItem('sensors_heatmap_id') === 'string') {
              sessionStorage.removeItem('sensors_heatmap_id');
            }
            return true;
          } else {
            return false;
          }
        },
        loadVtrack: function() {
          _.loadScript({
            success: function() {},
            error: function() {},
            type: 'js',
            url: sd.para.vtrack_url ? sd.para.vtrack_url : location.protocol + '//static.sensorsdata.cn/sdk/' + sd.lib_version + '/vtrack.min.js'
          });
        },
        messageListener: function(event) {
          if (event.data.source !== 'sa-fe') {
            return false;
          }
          if (event.data.type === 'v-track-mode') {
            if (event.data.data && event.data.data.isVtrack) {
              if (_.sessionStorage.isSupport()) {
                sessionStorage.setItem('sensors-visual-mode', 'true');
              }
              if (event.data.data.userURL && location.search.match(/sa-visual-mode=true/)) {
                window.location.href = _.secCheck.removeScriptProtocol(event.data.data.userURL);
              } else {
                vtrackMode.loadVtrack();
              }
            }
            window.removeEventListener('message', vtrackMode.messageListener, false);
          }
        },
        removeMessageHandle: function() {
          if (window.removeEventListener) {
            window.removeEventListener('message', vtrackMode.messageListener, false);
          }
        },
        verifyVtrackMode: function() {
          if (window.addEventListener) {
            window.addEventListener('message', vtrackMode.messageListener, false);
          }
          vtrackMode.postMessage();
        },
        postMessage: function() {
          if (window.parent && window.parent.postMessage) {
            window.parent.postMessage({
                source: 'sa-web-sdk',
                type: 'v-is-vtrack',
                data: {
                  sdkversion: '1.16.10'
                }
              },
              '*'
            );
          }
        },
        notifyUser: function() {
          var fn = function(event) {
            if (event.data.source !== 'sa-fe') {
              return false;
            }
            if (event.data.type === 'v-track-mode') {
              if (event.data.data && event.data.data.isVtrack) {
                alert('当前版本不支持，请升级部署神策数据治理');
              }
              window.removeEventListener('message', fn, false);
            }
          };
          if (window.addEventListener) {
            window.addEventListener('message', fn, false);
          }
          vtrackMode.postMessage();
        }
      };

      var defineMode = function(isLoaded) {
        var bridgeObj = sd.bridge.initDefineBridgeInfo();

        function getAndPostDebugInfo() {
          var arr = [];
          if (!bridgeObj.touch_app_bridge) {
            arr.push(sd.debug.defineMode('1'));
          }
          if (!_.isObject(sd.para.app_js_bridge)) {
            arr.push(sd.debug.defineMode('2'));
            bridgeObj.verify_success = false;
          }
          if (!(_.isObject(sd.para.heatmap) && sd.para.heatmap.clickmap == 'default')) {
            arr.push(sd.debug.defineMode('3'));
          }
          if (bridgeObj.verify_success === 'fail') {
            arr.push(sd.debug.defineMode('4'));
          }
          var data = {
            callType: 'app_alert',
            data: arr
          };

          if (SensorsData_App_Visual_Bridge && SensorsData_App_Visual_Bridge.sensorsdata_visualized_alert_info) {
            SensorsData_App_Visual_Bridge.sensorsdata_visualized_alert_info(JSON.stringify(data));
          } else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage) {
            window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(JSON.stringify(data));
          }
        }

        if (_.isObject(window.SensorsData_App_Visual_Bridge) && window.SensorsData_App_Visual_Bridge.sensorsdata_visualized_mode && (window.SensorsData_App_Visual_Bridge.sensorsdata_visualized_mode === true || window.SensorsData_App_Visual_Bridge.sensorsdata_visualized_mode())) {
          if (_.isObject(sd.para.heatmap) && sd.para.heatmap.clickmap == 'default') {
            if (_.isObject(sd.para.app_js_bridge) && bridgeObj.verify_success === 'success') {
              if (!isLoaded) {
                var protocol = location.protocol;
                var protocolArr = ['http:', 'https:'];
                protocol = _.indexOf(protocolArr, protocol) > -1 ? protocol : 'https:';
                _.loadScript({
                  success: function() {
                    setTimeout(function() {
                      if (typeof sa_jssdk_app_define_mode !== 'undefined') {
                        sa_jssdk_app_define_mode(sd, isLoaded);
                      }
                    }, 0);
                  },
                  error: function() {},
                  type: 'js',
                  url: protocol + '//static.sensorsdata.cn/sdk/' + sd.lib_version + '/vapph5define.min.js'
                });
              } else {
                sa_jssdk_app_define_mode(sd, isLoaded);
              }
            } else {
              getAndPostDebugInfo();
            }
          } else {
            getAndPostDebugInfo();
          }
        }
      };

      function trackMode() {
        sd.readyState.setState(3);

        var visualizedBridge = new sd.JSBridge({
          type: 'visualized',
          app_call_js: function() {
            if (typeof sa_jssdk_app_define_mode !== 'undefined') {
              defineMode(true);
            } else {
              defineMode(false);
            }
          }
        });

        defineMode(false);

        sd.bridge.app_js_bridge_v1();
        _.info.initPage();

        if (sd.para.is_track_single_page) {
          _.addSinglePageEvent(function(last_url) {
            var sendData = function(extraData) {
              extraData = extraData || {};
              if (last_url !== location.href) {
                _.info.pageProp.referrer = last_url;
                last_url = _.isDecodeURI(sd.para.url_is_decode, last_url);
                sd.quick('autoTrack', _.extend({
                  $url: _.isDecodeURI(sd.para.url_is_decode, location.href),
                  $referrer: last_url
                }, extraData));
              }
            };
            if (typeof sd.para.is_track_single_page === 'boolean') {
              sendData();
            } else if (typeof sd.para.is_track_single_page === 'function') {
              var returnValue = sd.para.is_track_single_page();
              if (_.isObject(returnValue)) {
                sendData(returnValue);
              } else if (returnValue === true) {
                sendData();
              }
            }
          });
        }
        if (sd.para.batch_send) {
          _.addEvent(window, 'onpagehide' in window ? 'pagehide' : 'unload', function(e) {
            sd.batchSend.clearPendingStatus();
          });
          sd.batchSend.batchInterval();
        }
        sd.store.init();

        sd.readyState.setState(4);
        if (sd._q && _.isArray(sd._q) && sd._q.length > 0) {
          _.each(sd._q, function(content) {
            sd[content[0]].apply(sd, Array.prototype.slice.call(content[1]));
          });
        }

        if (_.isObject(sd.para.heatmap)) {
          heatmap.initHeatmap();
          heatmap.initScrollmap();
        }
      }

      if (heatmapMode.isSeachHasKeyword()) {
        heatmapMode.hasKeywordHandle();
      } else if (window.parent !== self && vtrackMode.isSearchHasKeyword()) {
        vtrackMode.verifyVtrackMode();
      } else if (heatmapMode.isStorageHasKeyword()) {
        heatmapMode.storageHasKeywordHandle();
      } else if (window.parent !== self && vtrackMode.isStorageHasKeyword()) {
        vtrackMode.verifyVtrackMode();
      } else {
        trackMode();
        vtrackMode.notifyUser();
      }
    };;


    function BatchSend() {
      this.sendingData = 0;
      this.sendingItemKeys = [];
    }

    BatchSend.prototype = {
      add: function(data) {
        if (_.isObject(data)) {
          this.writeStore(data);
          if (data.type === 'track_signup' || data.event === '$pageview') {
            this.sendStrategy();
          }
        }
      },
      clearPendingStatus: function() {
        if (this.sendingItemKeys.length) {
          this.removePendingItems(this.sendingItemKeys);
        }
      },
      remove: function(keys) {
        var me = this;
        if (this.sendingData > 0) {
          --this.sendingData;
        }
        if (_.isArray(keys) && keys.length > 0) {
          _.each(keys, function(key) {
            _.localStorage.remove(key);
          });
        }
      },
      send: function(data) {
        var me = this;
        var server_url;
        if ((_.isString(sd.para.server_url) && sd.para.server_url !== '') || (_.isArray(sd.para.server_url) && sd.para.server_url.length)) {
          server_url = _.isArray(sd.para.server_url) ? sd.para.server_url[0] : sd.para.server_url;
        } else {
          sd.log('当前 server_url 为空或不正确，只在控制台打印日志，network 中不会发数据，请配置正确的 server_url！');
          return;
        }
        _.ajax({
          url: server_url,
          type: 'POST',
          data: 'data_list=' + encodeURIComponent(_.base64Encode(JSON.stringify(data.vals))),
          credentials: false,
          timeout: sd.para.batch_send.datasend_timeout,
          cors: true,
          success: function() {
            me.remove(data.keys);
            me.removePendingItems(data.keys);
          },
          error: function() {
            if (me.sendingData > 0) {
              --me.sendingData;
            }
            me.removePendingItems(data.keys);
          }
        });
      },
      appendPendingItems: function(newKeys) {
        if (_.isArray(newKeys) === false) {
          return;
        }
        this.sendingItemKeys = _.unique(this.sendingItemKeys.concat(newKeys));
        try {
          var existingItems = this.getPendingItems();
          var newItems = _.unique(existingItems.concat(newKeys));
          localStorage.setItem('sawebjssdk-sendingitems', JSON.stringify(newItems));
        } catch (e) {}
      },
      removePendingItems: function(keys) {
        if (_.isArray(keys) === false) {
          return;
        }
        if (this.sendingItemKeys.length) {
          this.sendingItemKeys = _.filter(this.sendingItemKeys, function(item) {
            return _.indexOf(keys, item) === -1;
          });
        }
        try {
          var existingItems = this.getPendingItems();
          var newItems = _.filter(existingItems, function(item) {
            return _.indexOf(keys, item) === -1;
          });
          localStorage.setItem('sawebjssdk-sendingitems', JSON.stringify(newItems));
        } catch (e) {}
      },
      getPendingItems: function() {
        var items = [];
        try {
          var value = localStorage.getItem('sawebjssdk-sendingitems');
          if (value) {
            items = JSON.parse(value);
          }
        } catch (e) {}
        return items;
      },
      sendPrepare: function(data) {
        this.appendPendingItems(data.keys);
        var arr = data.vals;
        var arrLen = arr.length;
        if (arrLen > 0) {
          this.send({
            keys: data.keys,
            vals: arr
          });
        }
      },
      sendStrategy: function() {
        if (document.hasFocus() === false) {
          return false;
        }
        var data = this.readStore();
        if (data.keys.length > 0 && this.sendingData === 0) {
          this.sendingData = 1;
          this.sendPrepare(data);
        }
      },
      batchInterval: function() {
        var me = this;
        setInterval(function() {
          me.sendStrategy();
        }, sd.para.batch_send.send_interval);
      },
      readStore: function() {
        var keys = [];
        var vals = [];
        var obj = {};
        var val = null;
        var now = new Date().getTime();
        var len = localStorage.length;
        var pendingItems = this.getPendingItems();
        for (var i = 0; i < len; i++) {
          var key = localStorage.key(i);
          if (key.indexOf('sawebjssdk-') === 0 && /^sawebjssdk\-\d+$/.test(key)) {
            if (pendingItems.length && _.indexOf(pendingItems, key) > -1) {
              continue;
            }
            val = localStorage.getItem(key);
            if (val) {
              val = _.safeJSONParse(val);
              if (val && _.isObject(val)) {
                val._flush_time = now;
                keys.push(key);
                vals.push(val);
              } else {
                localStorage.removeItem(key);
                sd.log('localStorage-数据parse异常' + val);
              }
            } else {
              localStorage.removeItem(key);
              sd.log('localStorage-数据取值异常' + val);
            }
          }
        }
        return {
          keys: keys,
          vals: vals
        };
      },
      writeStore: function(data) {
        var uuid = String(Math.random()).slice(2, 5) + String(Math.random()).slice(2, 5) + String(new Date().getTime()).slice(3);
        localStorage.setItem('sawebjssdk-' + uuid, JSON.stringify(data));
      }
    };

    sd.batchSend = new BatchSend();

    var dataSend = {};

    dataSend.getSendUrl = function(url, data) {
      var base64Data = _.base64Encode(data);
      var crc = 'crc=' + _.hashCode(base64Data);
      if (url.indexOf('?') !== -1) {
        return url + '&data=' + encodeURIComponent(base64Data) + '&ext=' + encodeURIComponent(crc);
      } else {
        return url + '?data=' + encodeURIComponent(base64Data) + '&ext=' + encodeURIComponent(crc);
      }
    };

    dataSend.getSendData = function(data) {
      var base64Data = _.base64Encode(data);
      var crc = 'crc=' + _.hashCode(base64Data);
      return 'data=' + encodeURIComponent(base64Data) + '&ext=' + encodeURIComponent(crc);
    };

    dataSend.getInstance = function(data) {
      var sendType = this.getSendType(data);
      var obj = new this[sendType](data);
      var start = obj.start;
      obj.start = function() {
        if (_.isObject(sd.para.is_debug) && sd.para.is_debug.storage && sd.store.requests) {
          sd.store.requests.push({
            name: this.server_url,
            initiatorType: this.img ? 'img' : 'xmlhttprequest',
            entryType: 'resource',
            requestData: this.data
          });
        }
        var me = this;
        start.apply(this, arguments);
        setTimeout(function() {
          me.isEnd(true);
        }, sd.para.callback_timeout);
      };
      obj.end = function() {
        this.callback && this.callback();
        var self = this;
        setTimeout(function() {
          self.lastClear && self.lastClear();
        }, sd.para.datasend_timeout - sd.para.callback_timeout);
      };
      obj.isEnd = function(isDelay) {
        if (!this.received) {
          this.received = true;
          this.end();
          var self = this;
          if (isDelay) {
            if (sd.para.queue_timeout - sd.para.callback_timeout <= 0) {
              self.close();
            } else {
              setTimeout(function() {
                self.close();
              }, sd.para.queue_timeout - sd.para.callback_timeout);
            }
          } else {
            self.close();
          }
        }
      };

      return obj;
    };

    dataSend.getRealtimeInstance = function(data) {
      var sendType = this.getSendType(data);
      var obj = new this[sendType](data);
      obj.defaultData = data;
      var start = obj.start;
      obj.start = function() {
        var me = this;
        start.apply(this, arguments);
        setTimeout(function() {
          me.isEnd(true);
        }, sd.para.callback_timeout);
      };
      obj.end = function() {
        this.callback && this.callback();
        var self = this;
        setTimeout(function() {
          self.lastClear && self.lastClear();
        }, sd.para.datasend_timeout - sd.para.callback_timeout);
      };
      obj.isEnd = function(isDelay) {
        if (!this.received) {
          this.received = true;
          this.end();
        }
      };
      return obj;
    };

    dataSend.getSendType = function(data) {
      var supportedSendTypes = ['image', 'ajax', 'beacon'];
      var sendType = supportedSendTypes[0];

      if (data.config && _.indexOf(supportedSendTypes, data.config.send_type) > -1) {
        sendType = data.config.send_type;
      } else {
        sendType = sd.para.send_type;
      }

      if (sendType === 'beacon' && _.isSupportBeaconSend() === false) {
        sendType = 'image';
      }

      if (sendType === 'ajax' && _.isSupportCors() === false) {
        sendType = 'image';
      }

      return sendType;
    };

    dataSend.image = function(para) {
      this.callback = para.callback;
      this.img = document.createElement('img');
      this.img.width = 1;
      this.img.height = 1;
      if (sd.para.img_use_crossorigin) {
        this.img.crossOrigin = 'anonymous';
      }
      this.data = para.data;
      this.server_url = dataSend.getSendUrl(para.server_url, para.data);
    };
    dataSend.image.prototype.start = function() {
      var me = this;
      if (sd.para.ignore_oom) {
        this.img.onload = function() {
          this.onload = null;
          this.onerror = null;
          this.onabort = null;
          me.isEnd();
        };
        this.img.onerror = function() {
          this.onload = null;
          this.onerror = null;
          this.onabort = null;
          me.isEnd();
        };
        this.img.onabort = function() {
          this.onload = null;
          this.onerror = null;
          this.onabort = null;
          me.isEnd();
        };
      }
      this.img.src = this.server_url;
    };

    dataSend.image.prototype.lastClear = function() {
      this.img.src = '';
    };

    dataSend.ajax = function(para) {
      this.callback = para.callback;
      this.server_url = para.server_url;
      this.data = dataSend.getSendData(para.data);
    };
    dataSend.ajax.prototype.start = function() {
      var me = this;
      _.ajax({
        url: this.server_url,
        type: 'POST',
        data: this.data,
        credentials: false,
        timeout: sd.para.datasend_timeout,
        cors: true,
        success: function() {
          me.isEnd();
        },
        error: function() {
          me.isEnd();
        }
      });
    };

    dataSend.beacon = function(para) {
      this.callback = para.callback;
      this.server_url = para.server_url;
      this.data = dataSend.getSendData(para.data);
    };

    dataSend.beacon.prototype.start = function() {
      var me = this;
      if (typeof navigator === 'object' && typeof navigator.sendBeacon === 'function') {
        if (!navigator.sendBeacon(this.server_url, this.data)) {
          this.defaultData.config.send_type = 'image';
          sendState.realtimeSend(this.defaultData);
        }
      }
      setTimeout(function() {
        me.isEnd();
      }, 40);
    };


    var sendState = {};
    sd.sendState = sendState;
    sd.events = new _.eventEmitter();
    sendState.queue = _.autoExeQueue();

    sendState.requestData = null;

    sendState.getSendCall = function(data, config, callback) {
      if (sd.is_heatmap_render_mode) {
        return false;
      }

      if (sd.readyState.state < 3) {
        sd.log('初始化没有完成');
        return false;
      }

      data._track_id = Number(String(Math.random()).slice(2, 5) + String(Math.random()).slice(2, 4) + String(new Date().getTime()).slice(-4));
      if (sd.para.use_client_time) {
        data._flush_time = new Date().getTime();
      }

      var originData = data;

      data = JSON.stringify(data);

      this.requestData = {
        data: originData,
        config: config,
        callback: callback
      };

      sd.events.tempAdd('send', originData);

      if (!sd.para.app_js_bridge && sd.para.batch_send && localStorage.length < 200) {
        sd.log(originData);
        sd.batchSend.add(this.requestData.data);
        return false;
      }

      sd.bridge.dataSend(originData, this, callback);

      sd.log(originData);
    };

    sendState.prepareServerUrl = function() {
      if (typeof this.requestData.config === 'object' && this.requestData.config.server_url) {
        this.sendCall(this.requestData.config.server_url, this.requestData.callback);
      } else if (_.isArray(sd.para.server_url) && sd.para.server_url.length) {
        for (var i = 0; i < sd.para.server_url.length; i++) {
          this.sendCall(sd.para.server_url[i]);
        }
      } else if (typeof sd.para.server_url === 'string' && sd.para.server_url !== '') {
        this.sendCall(sd.para.server_url, this.requestData.callback);
      } else {
        sd.log('当前 server_url 为空或不正确，只在控制台打印日志，network 中不会发数据，请配置正确的 server_url！');
      }
    };

    sendState.sendCall = function(server_url, callback) {
      var data = {
        server_url: server_url,
        data: JSON.stringify(this.requestData.data),
        callback: callback,
        config: this.requestData.config
      };
      if (_.isObject(sd.para.jsapp) && !sd.para.jsapp.isOnline && typeof sd.para.jsapp.setData === 'function') {
        delete data.callback;
        data = JSON.stringify(data);
        sd.para.jsapp.setData(data);
      } else {
        if (sd.para.use_client_time) {
          this.realtimeSend(data);
        } else {
          this.pushSend(data);
        }
      }
    };

    sendState.pushSend = function(data) {
      var instance = dataSend.getInstance(data);
      var me = this;
      instance.close = function() {
        me.queue.close();
      };
      this.queue.enqueue(instance);
    };

    sendState.realtimeSend = function(data) {
      var instance = dataSend.getRealtimeInstance(data);
      instance.start();
    };

    var saEvent = {};
    sd.saEvent = saEvent;

    saEvent.checkOption = {
      regChecks: {
        regName: /^((?!^distinct_id$|^original_id$|^time$|^properties$|^id$|^first_id$|^second_id$|^users$|^events$|^event$|^user_id$|^date$|^datetime$)[a-zA-Z_$][a-zA-Z\d_$]{0,99})$/i
      },
      checkPropertiesKey: function(obj) {
        var me = this,
          flag = true;
        _.each(obj, function(content, key) {
          if (!me.regChecks.regName.test(key)) {
            flag = false;
          }
        });
        return flag;
      },
      check: function(a, b) {
        if (typeof this[a] === 'string') {
          return this[this[a]](b);
        } else if (_.isFunction(this[a])) {
          return this[a](b);
        }
      },
      str: function(s) {
        if (!_.isString(s)) {
          sd.log('请检查参数格式,必须是字符串');
          return true;
        } else {
          return true;
        }
      },
      properties: function(p) {
        _.strip_sa_properties(p);
        if (p) {
          if (_.isObject(p)) {
            if (this.checkPropertiesKey(p)) {
              return true;
            } else {
              sd.log('properties 里的自定义属性名需要是合法的变量名，不能以数字开头，且只包含：大小写字母、数字、下划线，自定义属性不能以 $ 开头');
              return true;
            }
          } else {
            sd.log('properties可以没有，但有的话必须是对象');
            return true;
          }
        } else {
          return true;
        }
      },
      propertiesMust: function(p) {
        _.strip_sa_properties(p);
        if (p === undefined || !_.isObject(p) || _.isEmptyObject(p)) {
          sd.log('properties必须是对象且有值');
          return true;
        } else {
          if (this.checkPropertiesKey(p)) {
            return true;
          } else {
            sd.log('properties 里的自定义属性名需要是合法的变量名，不能以数字开头，且只包含：大小写字母、数字、下划线，自定义属性不能以 $ 开头');
            return true;
          }
        }
      },
      event: function(s) {
        if (!_.isString(s) || !this['regChecks']['regName'].test(s)) {
          sd.log('请检查参数格式，eventName 必须是字符串，且需是合法的变量名，即不能以数字开头，且只包含：大小写字母、数字、下划线和 $,其中以 $ 开头的表明是系统的保留字段，自定义事件名请不要以 $ 开头');
          return true;
        } else {
          return true;
        }
      },
      test_id: 'str',
      group_id: 'str',
      distinct_id: function(id) {
        if (_.isString(id) && /^.{1,255}$/.test(id)) {
          return true;
        } else {
          sd.log('distinct_id必须是不能为空，且小于255位的字符串');
          return false;
        }
      }
    };

    saEvent.check = function(p) {
      var flag = true;
      for (var i in p) {
        if (Object.prototype.hasOwnProperty.call(p, i) && !this.checkOption.check(i, p[i])) {
          return false;
        }
      }
      return flag;
    };

    saEvent.send = function(p, callback) {
      var data = {
        distinct_id: store.getDistinctId(),
        lib: {
          $lib: 'js',
          $lib_method: 'code',
          $lib_version: String(sd.lib_version)
        },
        properties: {}
      };

      if (_.isObject(p) && _.isObject(p.properties) && !_.isEmptyObject(p.properties) && p.properties.$lib_detail) {
        data.lib.$lib_detail = p.properties.$lib_detail;
        delete p.properties.$lib_detail;
      }
      _.extend(data, sd.store.getUnionId(), p);

      if (_.isObject(p.properties) && !_.isEmptyObject(p.properties)) {
        _.extend(data.properties, p.properties);
      }

      if (!p.type || p.type.slice(0, 7) !== 'profile') {

        data.properties = _.extend({}, _.info.properties(), store.getProps(), store.getSessionProps(), _.info.currentProps, data.properties);
        if (sd.para.preset_properties.latest_referrer && !_.isString(data.properties.$latest_referrer)) {
          data.properties.$latest_referrer = '取值异常';
        }
        if (sd.para.preset_properties.latest_search_keyword && !_.isString(data.properties.$latest_search_keyword)) {
          data.properties.$latest_search_keyword = '取值异常';
        }
        if (sd.para.preset_properties.latest_traffic_source_type && !_.isString(data.properties.$latest_traffic_source_type)) {
          data.properties.$latest_traffic_source_type = '取值异常';
        }
        if (sd.para.preset_properties.latest_landing_page && !_.isString(data.properties.$latest_landing_page)) {
          data.properties.$latest_landing_page = '取值异常';
        }
        if (sd.para.preset_properties.latest_wx_ad_click_id === 'not_collect') {
          delete data.properties._latest_wx_ad_click_id;
          delete data.properties._latest_wx_ad_hash_key;
          delete data.properties._latest_wx_ad_callbacks;
        } else if (sd.para.preset_properties.latest_wx_ad_click_id && !_.isString(data.properties._latest_wx_ad_click_id)) {
          data.properties._latest_wx_ad_click_id = '取值异常';
          data.properties._latest_wx_ad_hash_key = '取值异常';
          data.properties._latest_wx_ad_callbacks = '取值异常';
        }
        if (_.isString(data.properties._latest_wx_ad_click_id)) {
          data.properties.$url = _.isDecodeURI(sd.para.url_is_decode, window.location.href);
        }
      }

      if (data.properties.$time && _.isDate(data.properties.$time)) {
        data.time = data.properties.$time * 1;
        delete data.properties.$time;
      } else {
        if (sd.para.use_client_time) {
          data.time = new Date() * 1;
        }
      }
      _.parseSuperProperties(data);

      _.filterReservedProperties(data.properties);
      _.searchObjDate(data);
      _.searchObjString(data);
      _.searchZZAppStyle(data);

      var data_config = _.searchConfigData(data.properties);

      saNewUser.checkIsAddSign(data);
      saNewUser.checkIsFirstTime(data);

      sd.addReferrerHost(data);
      sd.addPropsHook(data);

      if (sd.para.debug_mode === true) {
        sd.log(data);
        this.debugPath(JSON.stringify(data), callback);
      } else {
        sd.sendState.getSendCall(data, data_config, callback);
      }
    };

    saEvent.debugPath = function(data, callback) {
      var _data = data;
      var url = '';
      if (sd.para.debug_mode_url.indexOf('?') !== -1) {
        url = sd.para.debug_mode_url + '&data=' + encodeURIComponent(_.base64Encode(data));
      } else {
        url = sd.para.debug_mode_url + '?data=' + encodeURIComponent(_.base64Encode(data));
      }

      _.ajax({
        url: url,
        type: 'GET',
        cors: true,
        header: {
          'Dry-Run': String(sd.para.debug_mode_upload)
        },
        success: function(data) {
          _.isEmptyObject(data) === true ? alert('debug数据发送成功' + _data) : alert('debug失败 错误原因' + JSON.stringify(data));
        }
      });
    };;


    var store = (sd.store = {
      requests: [],
      _sessionState: {},
      _state: {
        distinct_id: '',
        first_id: '',
        props: {}
      },
      getProps: function() {
        return this._state.props || {};
      },
      getSessionProps: function() {
        return this._sessionState;
      },
      getDistinctId: function() {
        return this._state._distinct_id || this._state.distinct_id;
      },
      getUnionId: function() {
        var obj = {};
        var firstId = this._state._first_id || this._state.first_id,
          distinct_id = this._state._distinct_id || this._state.distinct_id;
        if (firstId && distinct_id) {
          obj.login_id = distinct_id;
          obj.anonymous_id = firstId;
        } else {
          obj.anonymous_id = distinct_id;
        }
        return obj;
      },
      getFirstId: function() {
        return this._state._first_id || this._state.first_id;
      },
      toState: function(ds) {
        var state = null;
        if (ds != null && _.isJSONString(ds)) {
          state = JSON.parse(ds);
          this._state = _.extend(state);
          if (state.distinct_id) {
            if (typeof state.props === 'object') {
              for (var key in state.props) {
                if (typeof state.props[key] === 'string') {
                  state.props[key] = state.props[key].slice(0, sd.para.max_referrer_string_length);
                }
              }
              this.save();
            }
          } else {
            this.set('distinct_id', _.UUID());
            sd.debug.distinct_id('1', ds);
          }
        } else {
          this.set('distinct_id', _.UUID());
          sd.debug.distinct_id('2', ds);
        }
      },
      initSessionState: function() {
        var ds = _.cookie.get('sensorsdata2015session');
        var state = null;
        if (ds !== null && typeof(state = JSON.parse(ds)) === 'object') {
          this._sessionState = state || {};
        }
      },

      setOnce: function(a, b) {
        if (!(a in this._state)) {
          this.set(a, b);
        }
      },
      set: function(name, value) {
        this._state = this._state || {};
        if (name === 'distinct_id' && this._state.distinct_id) {
          sd.events.tempAdd('changeDistinctId', value);
        }
        this._state[name] = value;
        if (name === 'first_id') {
          delete this._state._first_id;
        } else if (name === 'distinct_id') {
          delete this._state._distinct_id;
        }
        this.save();
      },
      change: function(name, value) {
        this._state['_' + name] = value;
      },
      setSessionProps: function(newp) {
        var props = this._sessionState;
        _.extend(props, newp);
        this.sessionSave(props);
      },
      setSessionPropsOnce: function(newp) {
        var props = this._sessionState;
        _.coverExtend(props, newp);
        this.sessionSave(props);
      },
      setProps: function(newp, isCover) {
        var props = {};
        if (!isCover) {
          props = _.extend(this._state.props || {}, newp);
        } else {
          props = newp;
        }
        for (var key in props) {
          if (typeof props[key] === 'string') {
            props[key] = props[key].slice(0, sd.para.max_referrer_string_length);
          }
        }
        this.set('props', props);
      },
      setPropsOnce: function(newp) {
        var props = this._state.props || {};
        _.coverExtend(props, newp);
        this.set('props', props);
      },
      clearAllProps: function(arr) {
        this._sessionState = {};
        if (_.isArray(arr) && arr.length > 0) {
          for (var i = 0; i < arr.length; i++) {
            if (_.isString(arr[i]) && arr[i].indexOf('latest_') === -1 && arr[i] in this._state.props) {
              delete this._state.props[arr[i]];
            }
          }
        } else {
          for (var i in this._state.props) {
            if (i.indexOf('latest_') !== 1) {
              delete this._state.props[i];
            }
          }
        }
        this.sessionSave({});
        this.save();
      },
      sessionSave: function(props) {
        this._sessionState = props;
        _.cookie.set('sensorsdata2015session', JSON.stringify(this._sessionState), 0);
      },
      save: function() {
        var copyState = JSON.parse(JSON.stringify(this._state));
        delete copyState._first_id;
        delete copyState._distinct_id;

        var stateStr = JSON.stringify(copyState);
        if (sd.para.encrypt_cookie) {
          stateStr = _.cookie.encrypt(stateStr);
        }
        _.cookie.set(this.getCookieName(), stateStr, 73000, sd.para.cross_subdomain);
      },
      getCookieName: function() {
        var sub = '';
        if (sd.para.cross_subdomain === false) {
          try {
            sub = _.URL(location.href).hostname;
          } catch (e) {
            sd.log(e);
          }
          if (typeof sub === 'string' && sub !== '') {
            sub = 'sa_jssdk_2015_' + sub.replace(/\./g, '_');
          } else {
            sub = 'sa_jssdk_2015_root';
          }
        } else {
          sub = 'sensorsdata2015jssdkcross';
        }
        return sub;
      },
      init: function() {
        this.initSessionState();
        var uuid = _.UUID();
        var cross = _.cookie.get(this.getCookieName());
        cross = _.cookie.resolveValue(cross);
        if (cross === null) {
          sd.is_first_visitor = true;

          this.set('distinct_id', uuid);
        } else {
          if (!_.isJSONString(cross) || !JSON.parse(cross).distinct_id) {
            sd.is_first_visitor = true;
          }

          this.toState(cross);
        }

        saNewUser.setDeviceId(uuid);

        saNewUser.storeInitCheck();
        saNewUser.checkIsFirstLatest();
      }
    });

    var saNewUser = {
      checkIsAddSign: function(data) {
        if (data.type === 'track') {
          if (_.cookie.getNewUser()) {
            data.properties.$is_first_day = true;
          } else {
            data.properties.$is_first_day = false;
          }
        }
      },
      is_first_visit_time: false,
      checkIsFirstTime: function(data) {
        if (data.type === 'track' && data.event === '$pageview') {
          if (this.is_first_visit_time) {
            data.properties.$is_first_time = true;
            this.is_first_visit_time = false;
          } else {
            data.properties.$is_first_time = false;
          }
        }
      },
      setDeviceId: function(uuid) {
        var device_id = null;
        var ds = _.cookie.get('sensorsdata2015jssdkcross');
        ds = _.cookie.resolveValue(ds);
        var state = {};
        if (ds != null && _.isJSONString(ds)) {
          state = JSON.parse(ds);
          if (state.$device_id) {
            device_id = state.$device_id;
          }
        }

        device_id = device_id || uuid;

        if (sd.para.cross_subdomain === true) {
          store.set('$device_id', device_id);
        } else {
          state.$device_id = device_id;
          state = JSON.stringify(state);
          if (sd.para.encrypt_cookie) {
            state = _.cookie.encrypt(state);
          }
          _.cookie.set('sensorsdata2015jssdkcross', state, null, true);
        }

        if (sd.para.is_track_device_id) {
          _.info.currentProps.$device_id = device_id;
        }
      },
      storeInitCheck: function() {
        if (sd.is_first_visitor) {
          var date = new Date();
          var obj = {
            h: 23 - date.getHours(),
            m: 59 - date.getMinutes(),
            s: 59 - date.getSeconds()
          };
          _.cookie.set(_.cookie.getCookieName('new_user'), '1', obj.h * 3600 + obj.m * 60 + obj.s + 's');
          this.is_first_visit_time = true;
        } else {
          if (!_.cookie.getNewUser()) {
            this.checkIsAddSign = function(data) {
              if (data.type === 'track') {
                data.properties.$is_first_day = false;
              }
            };
          }
          this.checkIsFirstTime = function(data) {
            if (data.type === 'track' && data.event === '$pageview') {
              data.properties.$is_first_time = false;
            }
          };
        }
      },
      checkIsFirstLatest: function() {
        var url_domain = _.info.pageProp.url_domain;

        var latest_utms = ['$utm_source', '$utm_medium', '$utm_campaign', '$utm_content', '$utm_term'];
        var props = store.getProps();
        for (var i = 0; i < latest_utms.length; i++) {
          if (latest_utms[i] in props) {
            delete props[latest_utms[i]];
          }
        }
        store.setProps(props, true);


        var latestObj = {};

        if (url_domain === '') {
          url_domain = 'url解析失败';
        }

        _.each(sd.para.preset_properties, function(value, key) {
          if (key.indexOf('latest_') === -1) {
            return false;
          }
          key = key.slice(7);
          if (value) {
            if (key === 'wx_ad_click_id' && value === 'not_collect') {
              return false;
            }
            if (key !== 'utm' && url_domain === 'url解析失败') {
              if (key === 'wx_ad_click_id') {
                latestObj['_latest_wx_ad_click_id'] = 'url的domain解析失败';
                latestObj['_latest_wx_ad_hash_key'] = 'url的domain解析失败';
                latestObj['_latest_wx_ad_callbacks'] = 'url的domain解析失败';
              } else {
                latestObj['$latest_' + key] = 'url的domain解析失败';
              }
            } else if (_.isReferralTraffic(document.referrer)) {
              switch (key) {
                case 'traffic_source_type':
                  latestObj['$latest_traffic_source_type'] = _.getSourceFromReferrer();
                  break;
                case 'referrer':
                  latestObj['$latest_referrer'] = _.isDecodeURI(sd.para.url_is_decode, _.info.pageProp.referrer);
                  break;
                case 'search_keyword':
                  latestObj['$latest_search_keyword'] = _.getKeywordFromReferrer();
                  break;
                case 'landing_page':
                  latestObj['$latest_landing_page'] = _.isDecodeURI(sd.para.url_is_decode, location.href);
                  break;
                case 'wx_ad_click_id':
                  var adObj = _.getWxAdIdFromUrl(location.href);
                  latestObj['_latest_wx_ad_click_id'] = adObj.click_id;
                  latestObj['_latest_wx_ad_hash_key'] = adObj.hash_key;
                  latestObj['_latest_wx_ad_callbacks'] = adObj.callbacks;
                  break;
              }
            }
          } else {
            if (key === 'utm' && sd.store._state.props) {
              for (var key1 in sd.store._state.props) {
                if (key1.indexOf('$latest_utm') === 0 || (key1.indexOf('_latest_') === 0 && key1.indexOf('_latest_wx_ad_') < 0)) {
                  delete sd.store._state.props[key1];
                }
              }
            } else if (sd.store._state.props && '$latest_' + key in sd.store._state.props) {
              delete sd.store._state.props['$latest_' + key];
            } else if (key == 'wx_ad_click_id' && sd.store._state.props && value === false) {
              var wxPro = ['_latest_wx_ad_click_id', '_latest_wx_ad_hash_key', '_latest_wx_ad_callbacks'];
              _.each(wxPro, function(value) {
                if (value in sd.store._state.props) {
                  delete sd.store._state.props[value];
                }
              });
            }
          }
        });

        sd.register(latestObj);

        if (sd.para.preset_properties.latest_utm) {
          var allUtms = _.info.campaignParamsStandard('$latest_', '_latest_');
          var $utms = allUtms.$utms;
          var otherUtms = allUtms.otherUtms;
          if (!_.isEmptyObject($utms)) {
            sd.register($utms);
          }
          if (!_.isEmptyObject(otherUtms)) {
            sd.register(otherUtms);
          }
        }
      }
    };;

    sd.bridge = {
      is_verify_success: false,
      initPara: function() {
        var app_js_bridge_default = {
          is_send: true,
          white_list: [],
          is_mui: false
        };
        if (typeof sd.para.app_js_bridge === 'object') {
          sd.para.app_js_bridge = _.extend({}, app_js_bridge_default, sd.para.app_js_bridge);
        } else if (sd.para.use_app_track === true || sd.para.app_js_bridge === true || sd.para.use_app_track === 'only') {
          if (sd.para.use_app_track_is_send === false || sd.para.use_app_track === 'only') {
            app_js_bridge_default.is_send = false;
          }
          sd.para.app_js_bridge = _.extend({}, app_js_bridge_default);
        } else if (sd.para.use_app_track === 'mui') {
          app_js_bridge_default.is_mui = true;
          sd.para.app_js_bridge = _.extend({}, app_js_bridge_default);
        }
        if (sd.para.app_js_bridge.is_send === false) {
          sd.log('设置了 is_send:false,如果打通失败，数据将被丢弃！');
        }
      },
      initState: function() {
        function checkProjectAndHost(appUrl) {
          function getHostNameAndProject(url) {
            var obj = {
              hostname: '',
              project: ''
            };
            try {
              obj.hostname = _.URL(url).hostname;
              obj.project = _.URL(url).searchParams.get('project') || 'default';
            } catch (e) {
              sd.log(e);
            }
            return obj;
          }
          var appObj = getHostNameAndProject(appUrl);
          var H5Obj = getHostNameAndProject(sd.para.server_url);
          if (appObj.hostname === H5Obj.hostname && appObj.project === H5Obj.project) {
            return true;
          } else {
            if (sd.para.app_js_bridge.white_list.length > 0) {
              for (var i = 0; i < sd.para.app_js_bridge.white_list.length; i++) {
                var urlobj = getHostNameAndProject(sd.para.app_js_bridge.white_list[i]);
                if (urlobj.hostname === appObj.hostname && urlobj.project === appObj.project) {
                  return true;
                }
              }
            }
          }
          return false;
        }

        if (_.isObject(sd.para.app_js_bridge) && !sd.para.app_js_bridge.is_mui) {
          if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && _.isObject(window.SensorsData_iOS_JS_Bridge) && window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url) {
            if (checkProjectAndHost(window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url)) {
              sd.bridge.is_verify_success = true;
            }
          } else if (_.isObject(window.SensorsData_APP_New_H5_Bridge) && window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url && window.SensorsData_APP_New_H5_Bridge.sensorsdata_track) {
            var app_server_url = window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url();
            if (app_server_url) {
              if (checkProjectAndHost(app_server_url)) {
                sd.bridge.is_verify_success = true;
              }
            }
          }
        }
      },
      initDefineBridgeInfo: function() {
        var resultObj = {
          touch_app_bridge: true,
          verify_success: false
        };

        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage && _.isObject(window.SensorsData_iOS_JS_Bridge) && window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url) {
          if (sd.bridge.is_verify_success) {
            resultObj.verify_success = 'success';
          } else {
            resultObj.verify_success = 'fail';
          }
        } else if (_.isObject(window.SensorsData_APP_New_H5_Bridge) && window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url && window.SensorsData_APP_New_H5_Bridge.sensorsdata_track) {
          if (sd.bridge.is_verify_success) {
            resultObj.verify_success = 'success';
          } else {
            resultObj.verify_success = 'fail';
          }
        } else if (typeof SensorsData_APP_JS_Bridge === 'object' && ((SensorsData_APP_JS_Bridge.sensorsdata_verify && SensorsData_APP_JS_Bridge.sensorsdata_visual_verify) || SensorsData_APP_JS_Bridge.sensorsdata_track)) {
          if (SensorsData_APP_JS_Bridge.sensorsdata_verify && SensorsData_APP_JS_Bridge.sensorsdata_visual_verify) {
            if (SensorsData_APP_JS_Bridge.sensorsdata_visual_verify(JSON.stringify({
                server_url: sd.para.server_url
              }))) {
              resultObj.verify_success = 'success';
            } else {
              resultObj.verify_success = 'fail';
            }
          } else {
            resultObj.verify_success = 'success';
          }
        } else if ((/sensors-verify/.test(navigator.userAgent) || /sa-sdk-ios/.test(navigator.userAgent)) && !window.MSStream) {
          if (sd.bridge.iOS_UA_bridge()) {
            resultObj.verify_success = 'success';
          } else {
            resultObj.verify_success = 'fail';
          }
        } else {
          resultObj.touch_app_bridge = false;
        }

        return resultObj;
      },
      iOS_UA_bridge: function() {
        if (/sensors-verify/.test(navigator.userAgent)) {
          var match = navigator.userAgent.match(/sensors-verify\/([^\s]+)/);
          if (match && match[0] && typeof match[1] === 'string' && match[1].split('?').length === 2) {
            match = match[1].split('?');
            var hostname = null;
            var project = null;
            try {
              hostname = _.URL(sd.para.server_url).hostname;
              project = _.URL(sd.para.server_url).searchParams.get('project') || 'default';
            } catch (e) {
              sd.log(e);
            }
            if (hostname && hostname === match[0] && project && project === match[1]) {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        } else if (/sa-sdk-ios/.test(navigator.userAgent)) {
          return true;
        } else {
          return false;
        }
      },
      dataSend: function(originData, that, callback) {
        if (_.isObject(sd.para.app_js_bridge) && !sd.para.app_js_bridge.is_mui) {
          if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage && _.isObject(window.SensorsData_iOS_JS_Bridge) && window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url) {
            if (sd.bridge.is_verify_success) {
              window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(JSON.stringify({
                callType: 'app_h5_track',
                data: _.extend({
                  server_url: sd.para.server_url
                }, originData)
              }));
              typeof callback === 'function' && callback();
            } else {
              if (sd.para.app_js_bridge.is_send) {
                sd.debug.apph5({
                  data: originData,
                  step: '4.1',
                  output: 'all'
                });
                that.prepareServerUrl();
              } else {
                typeof callback === 'function' && callback();
              }
            }
          } else if (_.isObject(window.SensorsData_APP_New_H5_Bridge) && window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url && window.SensorsData_APP_New_H5_Bridge.sensorsdata_track) {
            if (sd.bridge.is_verify_success) {
              SensorsData_APP_New_H5_Bridge.sensorsdata_track(JSON.stringify(_.extend({
                server_url: sd.para.server_url
              }, originData)));
              typeof callback === 'function' && callback();
            } else {
              if (sd.para.app_js_bridge.is_send) {
                sd.debug.apph5({
                  data: originData,
                  step: '4.2',
                  output: 'all'
                });
                that.prepareServerUrl();
              } else {
                typeof callback === 'function' && callback();
              }
            }
          } else if (typeof SensorsData_APP_JS_Bridge === 'object' && (SensorsData_APP_JS_Bridge.sensorsdata_verify || SensorsData_APP_JS_Bridge.sensorsdata_track)) {
            if (SensorsData_APP_JS_Bridge.sensorsdata_verify) {
              if (!SensorsData_APP_JS_Bridge.sensorsdata_verify(JSON.stringify(_.extend({
                  server_url: sd.para.server_url
                }, originData)))) {
                if (sd.para.app_js_bridge.is_send) {
                  sd.debug.apph5({
                    data: originData,
                    step: '3.1',
                    output: 'all'
                  });
                  that.prepareServerUrl();
                } else {
                  typeof callback === 'function' && callback();
                }
              } else {
                typeof callback === 'function' && callback();
              }
            } else {
              SensorsData_APP_JS_Bridge.sensorsdata_track(JSON.stringify(_.extend({
                server_url: sd.para.server_url
              }, originData)));
              typeof callback === 'function' && callback();
            }
          } else if ((/sensors-verify/.test(navigator.userAgent) || /sa-sdk-ios/.test(navigator.userAgent)) && !window.MSStream) {
            var iframe = null;
            if (sd.bridge.iOS_UA_bridge()) {
              iframe = document.createElement('iframe');
              iframe.setAttribute(
                'src',
                'sensorsanalytics://trackEvent?event=' +
                encodeURIComponent(
                  JSON.stringify(
                    _.extend({
                        server_url: sd.para.server_url
                      },
                      originData
                    )
                  )
                )
              );
              document.documentElement.appendChild(iframe);
              iframe.parentNode.removeChild(iframe);
              iframe = null;
              typeof callback === 'function' && callback();
            } else {
              if (sd.para.app_js_bridge.is_send) {
                sd.debug.apph5({
                  data: originData,
                  step: '3.2',
                  output: 'all'
                });
                that.prepareServerUrl();
              } else {
                typeof callback === 'function' && callback();
              }
            }
          } else {
            if (_.isObject(sd.para.app_js_bridge) && sd.para.app_js_bridge.is_send === true) {
              sd.debug.apph5({
                data: originData,
                step: '2',
                output: 'all'
              });
              that.prepareServerUrl();
            } else {
              typeof callback === 'function' && callback();
            }
          }
        } else if (_.isObject(sd.para.app_js_bridge) && sd.para.app_js_bridge.is_mui) {
          if (_.isObject(window.plus) && window.plus.SDAnalytics && window.plus.SDAnalytics.trackH5Event) {
            window.plus.SDAnalytics.trackH5Event(data);
            typeof callback === 'function' && callback();
          } else {
            if (_.isObject(sd.para.app_js_bridge) && sd.para.app_js_bridge.is_send === true) {
              that.prepareServerUrl();
            } else {
              typeof callback === 'function' && callback();
            }
          }
        } else {
          sd.debug.apph5({
            data: originData,
            step: '1',
            output: 'code'
          });
          that.prepareServerUrl();
        }
      },
      app_js_bridge_v1: function() {
        var app_info = null;
        var todo = null;

        function setAppInfo(data) {
          app_info = data;
          if (_.isJSONString(app_info)) {
            app_info = JSON.parse(app_info);
          }
          if (todo) {
            todo(app_info);
            todo = null;
            app_info = null;
          }
        }

        function getAndroid() {
          if (typeof window.SensorsData_APP_JS_Bridge === 'object' && window.SensorsData_APP_JS_Bridge.sensorsdata_call_app) {
            app_info = SensorsData_APP_JS_Bridge.sensorsdata_call_app();
            if (_.isJSONString(app_info)) {
              app_info = JSON.parse(app_info);
            }
          }
        }
        window.sensorsdata_app_js_bridge_call_js = function(data) {
          setAppInfo(data);
        };

        function calliOS() {
          if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
            var iframe = document.createElement('iframe');
            iframe.setAttribute('src', 'sensorsanalytics://getAppInfo');
            document.documentElement.appendChild(iframe);
            iframe.parentNode.removeChild(iframe);
            iframe = null;
          }
        }
        sd.getAppStatus = function(func) {
          calliOS();
          getAndroid();
          if (!func) {
            return app_info;
            app_info = null;
          } else {
            if (app_info === null) {
              todo = func;
            } else {
              func(app_info);
              app_info = null;
            }
          }
        };
      },
      supportAppCallJs: function() {
        window.sensorsdata_app_call_js = function(type, data) {
          if (type in window.sensorsdata_app_call_js.modules) {
            window.sensorsdata_app_call_js.modules[type](data);
          }
        };
        window.sensorsdata_app_call_js.modules = {};
      }
    };
    sd.JSBridge = function(obj) {
      this.list = {};
      this.type = obj.type;
      this.app_call_js = _.isFunction(obj.app_call_js) ? obj.app_call_js : function() {};
      this.init();
    };
    sd.JSBridge.prototype.init = function() {
      var that = this;
      if (!window.sensorsdata_app_call_js.modules[this.type]) {
        window.sensorsdata_app_call_js.modules[this.type] = function(data) {
          that.app_call_js(data);
        };
      }
    };
    sd.JSBridge.prototype.jsCallApp = function(data) {
      var appData = {
        callType: this.type,
        data: data
      };
      if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage) {
        window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(JSON.stringify(appData));
      } else if (_.isObject(window.SensorsData_APP_New_H5_Bridge) && window.SensorsData_APP_New_H5_Bridge.sensorsdata_js_call_app) {
        window.SensorsData_APP_New_H5_Bridge.sensorsdata_js_call_app(JSON.stringify(appData));
      } else {
        sd.log('数据发往App失败，App没有暴露bridge');
        return false;
      }
    };
    sd.JSBridge.prototype.hasAppBridge = function() {
      if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage) {
        return 'ios';
      } else if (_.isObject(window.SensorsData_APP_New_H5_Bridge) && window.SensorsData_APP_New_H5_Bridge.sensorsdata_js_call_app) {
        return 'android';
      } else {
        sd.log('App端bridge未暴露');
        return false;
      }
    };
    sd.JSBridge.prototype.requestToApp = function(obj) {
      var that = this;
      var data = _.isObject(obj.data) ? obj.data : {};
      if (!_.isFunction(obj.callback)) {
        obj.callback = function() {};
      }

      if (_.isObject(obj.timeout) && _.isNumber(obj.timeout.time)) {
        if (!_.isFunction(obj.timeout.callback)) {
          obj.timeout.callback = function() {};
        }
        obj.timer = setTimeout(function() {
          obj.timeout.callback();
          delete that.list[key];
        }, obj.timeout.time);
      }

      function getKey() {
        var d = new Date().getTime().toString(16);
        var m = String(Math.random()).replace('.', '').slice(1, 8);
        return d + '-' + m;
      }
      var key = getKey();
      this.list[key] = obj;
      var appData = {
        callType: this.type,
        data: data
      };
      appData.data.message_id = key;
      if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage) {
        window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(JSON.stringify(appData));
      } else if (_.isObject(window.SensorsData_APP_New_H5_Bridge) && window.SensorsData_APP_New_H5_Bridge.sensorsdata_js_call_app) {
        window.SensorsData_APP_New_H5_Bridge.sensorsdata_js_call_app(JSON.stringify(appData));
      } else {
        sd.log('数据发往App失败，App没有暴露bridge');
        return false;
      }
    };
    sd.JSBridge.prototype.double = function(data) {
      if (data.message_id) {
        var message = this.list[data.message_id];
        if (message) {
          if (message.timer) {
            clearTimeout(message.timer);
          }
          message.callback(data);
          delete this.list[data.message_id];
        }
      }
    };;


    var heatmap = (sd.heatmap = {
      getElementPath: function(element, ignoreID) {
        var names = [];
        while (element.parentNode) {
          if (element.id && !ignoreID && /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(element.id)) {
            names.unshift(element.tagName.toLowerCase() + '#' + element.id);
            break;
          } else {
            if (element === document.body) {
              names.unshift('body');
              break;
            } else {
              names.unshift(element.tagName.toLowerCase());
            }
            element = element.parentNode;
          }
        }
        return names.join(' > ');
      },
      getClosestLi: function(element) {
        var getClosest = function(elem, selector) {
          for (; elem && elem !== document && elem.nodeType === 1; elem = elem.parentNode) {
            if (elem.tagName.toLowerCase() === selector) {
              return elem;
            }
          }
          return null;
        };
        return getClosest(element, 'li');
      },
      getElementPosition: function(element, elementPath, ignoreID) {
        var closestLi = sd.heatmap.getClosestLi(element);
        if (!closestLi) {
          return null;
        }
        var tag = element.tagName.toLowerCase();
        var sameTypeTags = closestLi.getElementsByTagName(tag);
        var sameTypeTagsLen = sameTypeTags.length;
        var arr = [];
        if (sameTypeTagsLen > 1) {
          for (var i = 0; i < sameTypeTagsLen; i++) {
            var elepath = sd.heatmap.getElementPath(sameTypeTags[i], ignoreID);
            if (elepath === elementPath) {
              arr.push(sameTypeTags[i]);
            }
          }
          if (arr.length > 1) {
            return _.indexOf(arr, element);
          }
        }

        function _getPosition(element) {
          var tagName = element.tagName.toLowerCase();
          var parentNode = element.parentNode;
          if (!parentNode) {
            return '';
          }
          var sameTypeSiblings = _.ry(element).getSameTypeSiblings();
          var typeLen = sameTypeSiblings.length;
          if (typeLen === 1) {
            return 0;
          }
          for (var i = 0, e = element; _.ry(e).previousElementSibling().ele; e = _.ry(e).previousElementSibling().ele, i++);
          return i;
        }
        return _getPosition(closestLi);
      },
      setNotice: function(web_url) {
        sd.is_heatmap_render_mode = true;

        if (!sd.para.heatmap) {
          sd.errorMsg = '您SDK没有配置开启点击图，可能没有数据！';
        }
        if (web_url && web_url[0] && web_url[1]) {
          if (web_url[1].slice(0, 5) === 'http:' && location.protocol === 'https:') {
            sd.errorMsg = '您的当前页面是https的地址，神策分析环境也必须是https！';
          }
        }
        if (!sd.para.heatmap_url) {
          sd.para.heatmap_url = location.protocol + '//static.sensorsdata.cn/sdk/' + sd.lib_version + '/heatmap.min.js';
        }
      },
      getDomIndex: function(el) {
        if (!el.parentNode) return -1;
        var i = 0;
        var nodeName = el.tagName;
        var list = el.parentNode.children;
        for (var n = 0; n < list.length; n++) {
          if (list[n].tagName === nodeName) {
            if (el === list[n]) {
              return i;
            } else {
              i++;
            }
          }
        }
        return -1;
      },
      selector: function(el) {
        var i = el.parentNode && 9 == el.parentNode.nodeType ? -1 : this.getDomIndex(el);
        if (el.getAttribute && el.getAttribute('id') && /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(el.getAttribute('id')) && (!sd.para.heatmap || (sd.para.heatmap && sd.para.heatmap.element_selector !== 'not_use_id'))) {
          return '#' + el.getAttribute('id');
        } else {
          return el.tagName.toLowerCase() + (~i ? ':nth-of-type(' + (i + 1) + ')' : '');
        }
      },
      getDomSelector: function(el, arr) {
        if (!el || !el.parentNode || !el.parentNode.children) {
          return false;
        }
        arr = arr && arr.join ? arr : [];
        var name = el.nodeName.toLowerCase();
        if (!el || name === 'body' || 1 != el.nodeType) {
          arr.unshift('body');
          return arr.join(' > ');
        }
        arr.unshift(this.selector(el));
        if (el.getAttribute && el.getAttribute('id') && /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(el.getAttribute('id')) && sd.para.heatmap && sd.para.heatmap.element_selector !== 'not_use_id') return arr.join(' > ');
        return this.getDomSelector(el.parentNode, arr);
      },
      na: function() {
        var a = document.documentElement.scrollLeft || window.pageXOffset;
        return parseInt(isNaN(a) ? 0 : a, 10);
      },
      i: function() {
        var a = 0;
        try {
          (a = (o.documentElement && o.documentElement.scrollTop) || m.pageYOffset), (a = isNaN(a) ? 0 : a);
        } catch (b) {
          a = 0;
        }
        return parseInt(a, 10);
      },
      getBrowserWidth: function() {
        var a = window.innerWidth || document.body.clientWidth;
        return isNaN(a) ? 0 : parseInt(a, 10);
      },
      getBrowserHeight: function() {
        var a = window.innerHeight || document.body.clientHeight;
        return isNaN(a) ? 0 : parseInt(a, 10);
      },
      getScrollWidth: function() {
        var a = parseInt(document.body.scrollWidth, 10);
        return isNaN(a) ? 0 : a;
      },
      W: function(a) {
        var b = parseInt(+a.clientX + +this.na(), 10);
        var a = parseInt(+a.clientY + +this.i(), 10);
        return {
          x: isNaN(b) ? 0 : b,
          y: isNaN(a) ? 0 : a
        };
      },
      start: function(ev, target, tagName, customProps, callback) {
        var userCustomProps = _.isObject(customProps) ? customProps : {};
        var userCallback = _.isFunction(callback) ? callback : _.isFunction(customProps) ? customProps : undefined;
        if (sd.para.heatmap && sd.para.heatmap.collect_element && !sd.para.heatmap.collect_element(target)) {
          return false;
        }

        var selector = this.getDomSelector(target);
        var prop = _.getEleInfo({
          target: target
        });

        prop.$element_selector = selector ? selector : '';
        prop.$element_path = sd.heatmap.getElementPath(target, sd.para.heatmap && sd.para.heatmap.element_selector === 'not_use_id');
        var element_position = sd.heatmap.getElementPosition(target, prop.$element_path, sd.para.heatmap && sd.para.heatmap.element_selector === 'not_use_id');
        if (_.isNumber(element_position)) {
          prop.$element_position = element_position;
        }
        if (sd.para.heatmap && sd.para.heatmap.custom_property) {
          var customP = sd.para.heatmap.custom_property(target);
          if (_.isObject(customP)) {
            prop = _.extend(prop, customP);
          }
        }
        prop = _.extend(prop, userCustomProps);
        if (tagName === 'a' && sd.para.heatmap && sd.para.heatmap.isTrackLink === true) {
          _.trackLink({
            event: ev,
            target: target
          }, '$WebClick', prop);
        } else {
          sd.track('$WebClick', prop, userCallback);
        }
      },
      hasElement: function(e) {
        var path = e._getPath();
        if (_.isArray(path) && path.length > 0) {
          for (var i = 0; i < path.length; i++) {
            if (path[i] && path[i].tagName && path[i].tagName.toLowerCase() === 'a') {
              return path[i];
            }
          }
        }
        return false;
      },
      isStyleTag: function(tagname, isVisualMode) {
        var defaultTag = ['a', 'div', 'input', 'button', 'textarea'];
        var ignore_tags_default = ['mark', '/mark', 'strong', 'b', 'em', 'i', 'u', 'abbr', 'ins', 'del', 's', 'sup'];
        if (_.indexOf(defaultTag, tagname) > -1) {
          return false;
        }
        if (isVisualMode && (!sd.para.heatmap || !sd.para.heatmap.collect_tags || !sd.para.heatmap.collect_tags.div)) {
          return _.indexOf(ignore_tags_default, tagname) > -1;
        } else if (_.isObject(sd.para.heatmap) && _.isObject(sd.para.heatmap.collect_tags) && _.isObject(sd.para.heatmap.collect_tags.div) && _.indexOf(sd.para.heatmap.collect_tags.div.ignore_tags, tagname) > -1) {
          return true;
        }
        return false;
      },
      isCollectableDiv: function(target, isVisualMode) {
        try {
          if (target.children.length === 0) {
            return true;
          } else {
            for (var i = 0; i < target.children.length; i++) {
              if (target.children[i].nodeType !== 1) {
                continue;
              }
              var tag = target.children[i].tagName.toLowerCase();
              if (this.isStyleTag(tag, isVisualMode)) {
                if (!this.isCollectableDiv(target.children[i], isVisualMode)) {
                  return false;
                }
              } else {
                return false;
              }
            }
            return true;
          }
        } catch (error) {
          sd.log(error);
        }
        return false;
      },
      getCollectableParent: function(target, isVisualMode) {
        try {
          var parent = target.parentNode;
          var parentName = parent ? parent.tagName.toLowerCase() : '';
          if (parentName === 'body') {
            return false;
          }
          if (parentName && parentName === 'div' && this.isCollectableDiv(parent, isVisualMode)) {
            return parent;
          } else if (parent && this.isStyleTag(parentName, isVisualMode)) {
            return this.getCollectableParent(parent, isVisualMode);
          }
        } catch (error) {
          sd.log(error);
        }
        return false;
      },
      initScrollmap: function() {
        if (!_.isObject(sd.para.heatmap) || sd.para.heatmap.scroll_notice_map !== 'default') {
          return false;
        }

        var checkPage = function() {
          if (sd.para.scrollmap && _.isFunction(sd.para.scrollmap.collect_url) && !sd.para.scrollmap.collect_url()) {
            return false;
          }
          return true;
        };

        var interDelay = function(param) {
          var interDelay = {};
          interDelay.timeout = param.timeout || 1000;
          interDelay.func = param.func;
          interDelay.hasInit = false;
          interDelay.inter = null;
          interDelay.main = function(para, isClose) {
            this.func(para, isClose);
            this.inter = null;
          };
          interDelay.go = function(isNoDelay) {
            var me = this;
            var para = {};
            if (!this.inter) {
              para.$viewport_position = (document.documentElement && document.documentElement.scrollTop) || window.pageYOffset || document.body.scrollTop || 0;
              para.$viewport_position = Math.round(para.$viewport_position) || 0;
              para.$viewport_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
              para.$viewport_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
              if (isNoDelay) {
                interDelay.main(para, true);
              } else {
                this.inter = setTimeout(function() {
                  interDelay.main(para);
                }, this.timeout);
              }
            }
          };
          return interDelay;
        };

        var delayTime = interDelay({
          timeout: 1000,
          func: function(para, isClose) {
            var offsetTop = (document.documentElement && document.documentElement.scrollTop) || window.pageYOffset || document.body.scrollTop || 0;
            var current_time = new Date();
            var delay_time = current_time - this.current_time;
            if ((delay_time > sd.para.heatmap.scroll_delay_time && offsetTop - para.$viewport_position !== 0) || isClose) {
              para.$url = _.isDecodeURI(sd.para.url_is_decode, location.href);
              para.$title = document.title;
              para.$url_path = location.pathname;
              para.event_duration = Math.min(sd.para.heatmap.scroll_event_duration, parseInt(delay_time) / 1000);
              sd.track('$WebStay', para);
            }
            this.current_time = current_time;
          }
        });

        delayTime.current_time = new Date();

        _.addEvent(window, 'scroll', function() {
          if (!checkPage()) {
            return false;
          }
          delayTime.go();
        });

        _.addEvent(window, 'unload', function() {
          if (!checkPage()) {
            return false;
          }
          delayTime.go('notime');
        });
      },
      initHeatmap: function() {
        var that = this;
        if (!_.isObject(sd.para.heatmap) || sd.para.heatmap.clickmap !== 'default') {
          return false;
        }

        if (_.isFunction(sd.para.heatmap.collect_url) && !sd.para.heatmap.collect_url()) {
          return false;
        }

        if (sd.para.heatmap.collect_elements === 'all') {
          sd.para.heatmap.collect_elements = 'all';
        } else {
          sd.para.heatmap.collect_elements = 'interact';
        }

        if (sd.para.heatmap.collect_elements === 'all') {
          _.addEvent(document, 'click', function(e) {
            var ev = e || window.event;
            if (!ev) {
              return false;
            }
            var target = ev.target || ev.srcElement;
            if (typeof target !== 'object') {
              return false;
            }
            if (typeof target.tagName !== 'string') {
              return false;
            }
            var tagName = target.tagName.toLowerCase();
            if (tagName === 'body' || tagName === 'html') {
              return false;
            }
            if (!target || !target.parentNode || !target.parentNode.children) {
              return false;
            }
            var parent_ele = target.parentNode.tagName.toLowerCase();
            if (parent_ele === 'a' || parent_ele === 'button') {
              that.start(ev, target.parentNode, parent_ele);
            } else {
              that.start(ev, target, tagName);
            }
          });
        } else {
          _.addEvent(document, 'click', function(e) {
            var ev = e || window.event;
            if (!ev) {
              return false;
            }
            var target = ev.target || ev.srcElement;
            if (typeof target !== 'object') {
              return false;
            }
            if (typeof target.tagName !== 'string') {
              return false;
            }
            var tagName = target.tagName.toLowerCase();
            if (tagName.toLowerCase() === 'body' || tagName.toLowerCase() === 'html') {
              return false;
            }
            if (!target || !target.parentNode || !target.parentNode.children) {
              return false;
            }

            var parent_ele = target.parentNode;
            var hasA = that.hasElement(e);
            var trackAttrs = sd.para.heatmap.track_attr;
            if (tagName === 'a' || tagName === 'button' || tagName === 'input' || tagName === 'textarea' || _.hasAttributes(target, trackAttrs)) {
              that.start(ev, target, tagName);
            } else if (parent_ele.tagName.toLowerCase() === 'button' || parent_ele.tagName.toLowerCase() === 'a' || _.hasAttributes(parent_ele, trackAttrs)) {
              that.start(ev, parent_ele, target.parentNode.tagName.toLowerCase());
            } else if (tagName === 'area' && parent_ele.tagName.toLowerCase() === 'map' && _.ry(parent_ele).prev().tagName && _.ry(parent_ele).prev().tagName.toLowerCase() === 'img') {
              that.start(ev, _.ry(parent_ele).prev(), _.ry(parent_ele).prev().tagName.toLowerCase());
            } else if (hasA) {
              that.start(ev, hasA, hasA.tagName.toLowerCase());
            } else if (tagName === 'div' && sd.para.heatmap.collect_tags.div && that.isCollectableDiv(target)) {
              that.start(ev, target, tagName);
            } else if (that.isStyleTag(tagName)) {
              if (sd.para.heatmap.collect_tags.div) {
                var divTarget = that.getCollectableParent(target);
                if (divTarget) {
                  that.start(ev, divTarget, 'div');
                }
              }
            }
          });
        }
      }
    });;

    sd.init = function(para) {
      if (sd.readyState && sd.readyState.state && sd.readyState.state >= 2) {
        return false;
      }
      sd.setInitVar();
      sd.readyState.setState(2);
      sd.initPara(para);
      sd.bridge.supportAppCallJs();
      sd.detectMode();

      if (sd._.isIOS() && sd._.getIOSVersion() && sd._.getIOSVersion() < 13) {
        if (sd.para.heatmap && sd.para.heatmap.collect_tags && sd.para.heatmap.collect_tags.div) {
          sd._.setCssStyle('div, [data-sensors-click] { cursor: pointer; -webkit-tap-highlight-color: rgba(0,0,0,0); }');
        }
        if (sd.para.heatmap && sd.para.heatmap.track_attr) {
          sd._.setCssStyle('[' + sd.para.heatmap.track_attr.join('], [') + '] { cursor: pointer; -webkit-tap-highlight-color: rgba(0,0,0,0); }');
        }
      }
    };

    var methods = ['getAppStatus', 'track', 'quick', 'register', 'registerPage', 'registerOnce', 'trackSignup', 'setProfile', 'setOnceProfile', 'appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify', 'login', 'logout', 'trackLink', 'clearAllRegister', 'clearPageRegister'];

    _.each(methods, function(method) {
      var oldFunc = sd[method];
      sd[method] = function() {
        if (sd.readyState.state < 3) {
          if (!_.isArray(sd._q)) {
            sd._q = [];
          }
          sd._q.push([method, arguments]);
          return false;
        }
        if (!sd.readyState.getState()) {
          try {
            console.error('请先初始化神策JS SDK');
          } catch (e) {
            sd.log(e);
          }
          return;
        }
        return oldFunc.apply(sd, arguments);
      };
    });;

    if (typeof window['sensorsDataAnalytic201505'] === 'string') {
      sd.setPreConfig(window[sensorsDataAnalytic201505]);
      window[sensorsDataAnalytic201505] = sd;
      window['sensorsDataAnalytic201505'] = sd;
      sd.init();
    } else if (typeof window['sensorsDataAnalytic201505'] === 'undefined') {
      window['sensorsDataAnalytic201505'] = sd;
      return sd;
    } else {
      return window['sensorsDataAnalytic201505'];
    }
  } catch (err) {
    if (typeof console === 'object' && console.log) {
      try {
        console.log(err);
      } catch (e) {
        sd.log(e);
      }
    }
  }
});