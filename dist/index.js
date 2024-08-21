function le(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
function ue(r) {
  if (r.__esModule) return r;
  var e = r.default;
  if (typeof e == "function") {
    var n = function a() {
      return this instanceof a ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    n.prototype = e.prototype;
  } else n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(r).forEach(function(a) {
    var t = Object.getOwnPropertyDescriptor(r, a);
    Object.defineProperty(n, a, t.get ? t : {
      enumerable: !0,
      get: function() {
        return r[a];
      }
    });
  }), n;
}
function b(r) {
  if (typeof r != "string")
    throw new TypeError("Path must be a string. Received " + JSON.stringify(r));
}
function ae(r, e) {
  for (var n = "", a = 0, t = -1, i = 0, o, c = 0; c <= r.length; ++c) {
    if (c < r.length)
      o = r.charCodeAt(c);
    else {
      if (o === 47)
        break;
      o = 47;
    }
    if (o === 47) {
      if (!(t === c - 1 || i === 1)) if (t !== c - 1 && i === 2) {
        if (n.length < 2 || a !== 2 || n.charCodeAt(n.length - 1) !== 46 || n.charCodeAt(n.length - 2) !== 46) {
          if (n.length > 2) {
            var l = n.lastIndexOf("/");
            if (l !== n.length - 1) {
              l === -1 ? (n = "", a = 0) : (n = n.slice(0, l), a = n.length - 1 - n.lastIndexOf("/")), t = c, i = 0;
              continue;
            }
          } else if (n.length === 2 || n.length === 1) {
            n = "", a = 0, t = c, i = 0;
            continue;
          }
        }
        e && (n.length > 0 ? n += "/.." : n = "..", a = 2);
      } else
        n.length > 0 ? n += "/" + r.slice(t + 1, c) : n = r.slice(t + 1, c), a = c - t - 1;
      t = c, i = 0;
    } else o === 46 && i !== -1 ? ++i : i = -1;
  }
  return n;
}
function ce(r, e) {
  var n = e.dir || e.root, a = e.base || (e.name || "") + (e.ext || "");
  return n ? n === e.root ? n + a : n + r + a : a;
}
var $ = {
  // path.resolve([from ...], to)
  resolve: function() {
    for (var e = "", n = !1, a, t = arguments.length - 1; t >= -1 && !n; t--) {
      var i;
      t >= 0 ? i = arguments[t] : (a === void 0 && (a = process.cwd()), i = a), b(i), i.length !== 0 && (e = i + "/" + e, n = i.charCodeAt(0) === 47);
    }
    return e = ae(e, !n), n ? e.length > 0 ? "/" + e : "/" : e.length > 0 ? e : ".";
  },
  normalize: function(e) {
    if (b(e), e.length === 0) return ".";
    var n = e.charCodeAt(0) === 47, a = e.charCodeAt(e.length - 1) === 47;
    return e = ae(e, !n), e.length === 0 && !n && (e = "."), e.length > 0 && a && (e += "/"), n ? "/" + e : e;
  },
  isAbsolute: function(e) {
    return b(e), e.length > 0 && e.charCodeAt(0) === 47;
  },
  join: function() {
    if (arguments.length === 0)
      return ".";
    for (var e, n = 0; n < arguments.length; ++n) {
      var a = arguments[n];
      b(a), a.length > 0 && (e === void 0 ? e = a : e += "/" + a);
    }
    return e === void 0 ? "." : $.normalize(e);
  },
  relative: function(e, n) {
    if (b(e), b(n), e === n || (e = $.resolve(e), n = $.resolve(n), e === n)) return "";
    for (var a = 1; a < e.length && e.charCodeAt(a) === 47; ++a)
      ;
    for (var t = e.length, i = t - a, o = 1; o < n.length && n.charCodeAt(o) === 47; ++o)
      ;
    for (var c = n.length, l = c - o, f = i < l ? i : l, u = -1, s = 0; s <= f; ++s) {
      if (s === f) {
        if (l > f) {
          if (n.charCodeAt(o + s) === 47)
            return n.slice(o + s + 1);
          if (s === 0)
            return n.slice(o + s);
        } else i > f && (e.charCodeAt(a + s) === 47 ? u = s : s === 0 && (u = 0));
        break;
      }
      var h = e.charCodeAt(a + s), p = n.charCodeAt(o + s);
      if (h !== p)
        break;
      h === 47 && (u = s);
    }
    var d = "";
    for (s = a + u + 1; s <= t; ++s)
      (s === t || e.charCodeAt(s) === 47) && (d.length === 0 ? d += ".." : d += "/..");
    return d.length > 0 ? d + n.slice(o + u) : (o += u, n.charCodeAt(o) === 47 && ++o, n.slice(o));
  },
  _makeLong: function(e) {
    return e;
  },
  dirname: function(e) {
    if (b(e), e.length === 0) return ".";
    for (var n = e.charCodeAt(0), a = n === 47, t = -1, i = !0, o = e.length - 1; o >= 1; --o)
      if (n = e.charCodeAt(o), n === 47) {
        if (!i) {
          t = o;
          break;
        }
      } else
        i = !1;
    return t === -1 ? a ? "/" : "." : a && t === 1 ? "//" : e.slice(0, t);
  },
  basename: function(e, n) {
    if (n !== void 0 && typeof n != "string") throw new TypeError('"ext" argument must be a string');
    b(e);
    var a = 0, t = -1, i = !0, o;
    if (n !== void 0 && n.length > 0 && n.length <= e.length) {
      if (n.length === e.length && n === e) return "";
      var c = n.length - 1, l = -1;
      for (o = e.length - 1; o >= 0; --o) {
        var f = e.charCodeAt(o);
        if (f === 47) {
          if (!i) {
            a = o + 1;
            break;
          }
        } else
          l === -1 && (i = !1, l = o + 1), c >= 0 && (f === n.charCodeAt(c) ? --c === -1 && (t = o) : (c = -1, t = l));
      }
      return a === t ? t = l : t === -1 && (t = e.length), e.slice(a, t);
    } else {
      for (o = e.length - 1; o >= 0; --o)
        if (e.charCodeAt(o) === 47) {
          if (!i) {
            a = o + 1;
            break;
          }
        } else t === -1 && (i = !1, t = o + 1);
      return t === -1 ? "" : e.slice(a, t);
    }
  },
  extname: function(e) {
    b(e);
    for (var n = -1, a = 0, t = -1, i = !0, o = 0, c = e.length - 1; c >= 0; --c) {
      var l = e.charCodeAt(c);
      if (l === 47) {
        if (!i) {
          a = c + 1;
          break;
        }
        continue;
      }
      t === -1 && (i = !1, t = c + 1), l === 46 ? n === -1 ? n = c : o !== 1 && (o = 1) : n !== -1 && (o = -1);
    }
    return n === -1 || t === -1 || // We saw a non-dot character immediately before the dot
    o === 0 || // The (right-most) trimmed path component is exactly '..'
    o === 1 && n === t - 1 && n === a + 1 ? "" : e.slice(n, t);
  },
  format: function(e) {
    if (e === null || typeof e != "object")
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e);
    return ce("/", e);
  },
  parse: function(e) {
    b(e);
    var n = { root: "", dir: "", base: "", ext: "", name: "" };
    if (e.length === 0) return n;
    var a = e.charCodeAt(0), t = a === 47, i;
    t ? (n.root = "/", i = 1) : i = 0;
    for (var o = -1, c = 0, l = -1, f = !0, u = e.length - 1, s = 0; u >= i; --u) {
      if (a = e.charCodeAt(u), a === 47) {
        if (!f) {
          c = u + 1;
          break;
        }
        continue;
      }
      l === -1 && (f = !1, l = u + 1), a === 46 ? o === -1 ? o = u : s !== 1 && (s = 1) : o !== -1 && (s = -1);
    }
    return o === -1 || l === -1 || // We saw a non-dot character immediately before the dot
    s === 0 || // The (right-most) trimmed path component is exactly '..'
    s === 1 && o === l - 1 && o === c + 1 ? l !== -1 && (c === 0 && t ? n.base = n.name = e.slice(1, l) : n.base = n.name = e.slice(c, l)) : (c === 0 && t ? (n.name = e.slice(1, o), n.base = e.slice(1, l)) : (n.name = e.slice(c, o), n.base = e.slice(c, l)), n.ext = e.slice(o, l)), c > 0 ? n.dir = e.slice(0, c - 1) : t && (n.dir = "/"), n;
  },
  sep: "/",
  delimiter: ":",
  win32: null,
  posix: null
};
$.posix = $;
var he = $;
function ve(r) {
  for (var e = new Array(r), n = 0; n < r; ++n)
    e[n] = n;
  return e;
}
var de = ve;
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var ge = function(r) {
  return r != null && (oe(r) || pe(r) || !!r._isBuffer);
};
function oe(r) {
  return !!r.constructor && typeof r.constructor.isBuffer == "function" && r.constructor.isBuffer(r);
}
function pe(r) {
  return typeof r.readFloatLE == "function" && typeof r.slice == "function" && oe(r.slice(0, 0));
}
var ye = de, we = ge, me = typeof Float64Array < "u";
function _e(r, e) {
  return r[0] - e[0];
}
function xe() {
  var r = this.stride, e = new Array(r.length), n;
  for (n = 0; n < e.length; ++n)
    e[n] = [Math.abs(r[n]), n];
  e.sort(_e);
  var a = new Array(e.length);
  for (n = 0; n < a.length; ++n)
    a[n] = e[n][1];
  return a;
}
function Ae(r, e) {
  var n = ["View", e, "d", r].join("");
  e < 0 && (n = "View_Nil" + r);
  var a = r === "generic";
  if (e === -1) {
    var t = "function " + n + "(a){this.data=a;};var proto=" + n + ".prototype;proto.dtype='" + r + "';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new " + n + "(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_" + n + "(a){return new " + n + "(a);}", g = new Function(t);
    return g();
  } else if (e === 0) {
    var t = "function " + n + "(a,d) {this.data = a;this.offset = d};var proto=" + n + ".prototype;proto.dtype='" + r + "';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function " + n + "_copy() {return new " + n + "(this.data,this.offset)};proto.pick=function " + n + "_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function " + n + "_get(){return " + (a ? "this.data.get(this.offset)" : "this.data[this.offset]") + "};proto.set=function " + n + "_set(v){return " + (a ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v") + "};return function construct_" + n + "(a,b,c,d){return new " + n + "(a,d)}", g = new Function("TrivialArray", t);
    return g(Z[r][0]);
  }
  var t = ["'use strict'"], i = ye(e), o = i.map(function(v) {
    return "i" + v;
  }), c = "this.offset+" + i.map(function(v) {
    return "this.stride[" + v + "]*i" + v;
  }).join("+"), l = i.map(function(v) {
    return "b" + v;
  }).join(","), f = i.map(function(v) {
    return "c" + v;
  }).join(",");
  t.push(
    "function " + n + "(a," + l + "," + f + ",d){this.data=a",
    "this.shape=[" + l + "]",
    "this.stride=[" + f + "]",
    "this.offset=d|0}",
    "var proto=" + n + ".prototype",
    "proto.dtype='" + r + "'",
    "proto.dimension=" + e
  ), t.push(
    "Object.defineProperty(proto,'size',{get:function " + n + "_size(){return " + i.map(function(v) {
      return "this.shape[" + v + "]";
    }).join("*"),
    "}})"
  ), e === 1 ? t.push("proto.order=[0]") : (t.push("Object.defineProperty(proto,'order',{get:"), e < 4 ? (t.push("function " + n + "_order(){"), e === 2 ? t.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})") : e === 3 && t.push(
    "var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})"
  )) : t.push("ORDER})")), t.push(
    "proto.set=function " + n + "_set(" + o.join(",") + ",v){"
  ), a ? t.push("return this.data.set(" + c + ",v)}") : t.push("return this.data[" + c + "]=v}"), t.push("proto.get=function " + n + "_get(" + o.join(",") + "){"), a ? t.push("return this.data.get(" + c + ")}") : t.push("return this.data[" + c + "]}"), t.push(
    "proto.index=function " + n + "_index(",
    o.join(),
    "){return " + c + "}"
  ), t.push("proto.hi=function " + n + "_hi(" + o.join(",") + "){return new " + n + "(this.data," + i.map(function(v) {
    return ["(typeof i", v, "!=='number'||i", v, "<0)?this.shape[", v, "]:i", v, "|0"].join("");
  }).join(",") + "," + i.map(function(v) {
    return "this.stride[" + v + "]";
  }).join(",") + ",this.offset)}");
  var u = i.map(function(v) {
    return "a" + v + "=this.shape[" + v + "]";
  }), s = i.map(function(v) {
    return "c" + v + "=this.stride[" + v + "]";
  });
  t.push("proto.lo=function " + n + "_lo(" + o.join(",") + "){var b=this.offset,d=0," + u.join(",") + "," + s.join(","));
  for (var h = 0; h < e; ++h)
    t.push(
      "if(typeof i" + h + "==='number'&&i" + h + ">=0){d=i" + h + "|0;b+=c" + h + "*d;a" + h + "-=d}"
    );
  t.push("return new " + n + "(this.data," + i.map(function(v) {
    return "a" + v;
  }).join(",") + "," + i.map(function(v) {
    return "c" + v;
  }).join(",") + ",b)}"), t.push("proto.step=function " + n + "_step(" + o.join(",") + "){var " + i.map(function(v) {
    return "a" + v + "=this.shape[" + v + "]";
  }).join(",") + "," + i.map(function(v) {
    return "b" + v + "=this.stride[" + v + "]";
  }).join(",") + ",c=this.offset,d=0,ceil=Math.ceil");
  for (var h = 0; h < e; ++h)
    t.push(
      "if(typeof i" + h + "==='number'){d=i" + h + "|0;if(d<0){c+=b" + h + "*(a" + h + "-1);a" + h + "=ceil(-a" + h + "/d)}else{a" + h + "=ceil(a" + h + "/d)}b" + h + "*=d}"
    );
  t.push("return new " + n + "(this.data," + i.map(function(v) {
    return "a" + v;
  }).join(",") + "," + i.map(function(v) {
    return "b" + v;
  }).join(",") + ",c)}");
  for (var p = new Array(e), d = new Array(e), h = 0; h < e; ++h)
    p[h] = "a[i" + h + "]", d[h] = "b[i" + h + "]";
  t.push(
    "proto.transpose=function " + n + "_transpose(" + o + "){" + o.map(function(v, y) {
      return v + "=(" + v + "===undefined?" + y + ":" + v + "|0)";
    }).join(";"),
    "var a=this.shape,b=this.stride;return new " + n + "(this.data," + p.join(",") + "," + d.join(",") + ",this.offset)}"
  ), t.push("proto.pick=function " + n + "_pick(" + o + "){var a=[],b=[],c=this.offset");
  for (var h = 0; h < e; ++h)
    t.push("if(typeof i" + h + "==='number'&&i" + h + ">=0){c=(c+this.stride[" + h + "]*i" + h + ")|0}else{a.push(this.shape[" + h + "]);b.push(this.stride[" + h + "])}");
  t.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}"), t.push("return function construct_" + n + "(data,shape,stride,offset){return new " + n + "(data," + i.map(function(v) {
    return "shape[" + v + "]";
  }).join(",") + "," + i.map(function(v) {
    return "stride[" + v + "]";
  }).join(",") + ",offset)}");
  var g = new Function("CTOR_LIST", "ORDER", t.join(`
`));
  return g(Z[r], xe);
}
function je(r) {
  if (we(r))
    return "buffer";
  if (me)
    switch (Object.prototype.toString.call(r)) {
      case "[object Float64Array]":
        return "float64";
      case "[object Float32Array]":
        return "float32";
      case "[object Int8Array]":
        return "int8";
      case "[object Int16Array]":
        return "int16";
      case "[object Int32Array]":
        return "int32";
      case "[object Uint8Array]":
        return "uint8";
      case "[object Uint16Array]":
        return "uint16";
      case "[object Uint32Array]":
        return "uint32";
      case "[object Uint8ClampedArray]":
        return "uint8_clamped";
      case "[object BigInt64Array]":
        return "bigint64";
      case "[object BigUint64Array]":
        return "biguint64";
    }
  return Array.isArray(r) ? "array" : "generic";
}
var Z = {
  float32: [],
  float64: [],
  int8: [],
  int16: [],
  int32: [],
  uint8: [],
  uint16: [],
  uint32: [],
  array: [],
  uint8_clamped: [],
  bigint64: [],
  biguint64: [],
  buffer: [],
  generic: []
};
function ke(r, e, n, a) {
  if (r === void 0) {
    var f = Z.array[0];
    return f([]);
  } else typeof r == "number" && (r = [r]);
  e === void 0 && (e = [r.length]);
  var t = e.length;
  if (n === void 0) {
    n = new Array(t);
    for (var i = t - 1, o = 1; i >= 0; --i)
      n[i] = o, o *= e[i];
  }
  if (a === void 0) {
    a = 0;
    for (var i = 0; i < t; ++i)
      n[i] < 0 && (a -= (e[i] - 1) * n[i]);
  }
  for (var c = je(r), l = Z[c]; l.length <= t + 1; )
    l.push(Ae(c, l.length - 1));
  var f = l[t + 1];
  return f(r, e, n, a);
}
var Ee = ke, ne = {}, Ie, be;
function Be(r, e, n, i) {
  var t = 0, i = i === void 0 ? {} : i, o = i.loop === void 0 ? null : i.loop, c = i.palette === void 0 ? null : i.palette;
  if (e <= 0 || n <= 0 || e > 65535 || n > 65535)
    throw new Error("Width/Height invalid.");
  function l(v) {
    var y = v.length;
    if (y < 2 || y > 256 || y & y - 1)
      throw new Error(
        "Invalid code/color length, must be power of 2 and 2 .. 256."
      );
    return y;
  }
  r[t++] = 71, r[t++] = 73, r[t++] = 70, r[t++] = 56, r[t++] = 57, r[t++] = 97;
  var f = 0, u = 0;
  if (c !== null) {
    for (var s = l(c); s >>= 1; ) ++f;
    if (s = 1 << f, --f, i.background !== void 0) {
      if (u = i.background, u >= s)
        throw new Error("Background index out of range.");
      if (u === 0)
        throw new Error("Background index explicitly passed as 0.");
    }
  }
  if (r[t++] = e & 255, r[t++] = e >> 8 & 255, r[t++] = n & 255, r[t++] = n >> 8 & 255, r[t++] = (c !== null ? 128 : 0) | // Global Color Table Flag.
  f, r[t++] = u, r[t++] = 0, c !== null)
    for (var h = 0, p = c.length; h < p; ++h) {
      var d = c[h];
      r[t++] = d >> 16 & 255, r[t++] = d >> 8 & 255, r[t++] = d & 255;
    }
  if (o !== null) {
    if (o < 0 || o > 65535)
      throw new Error("Loop count invalid.");
    r[t++] = 33, r[t++] = 255, r[t++] = 11, r[t++] = 78, r[t++] = 69, r[t++] = 84, r[t++] = 83, r[t++] = 67, r[t++] = 65, r[t++] = 80, r[t++] = 69, r[t++] = 50, r[t++] = 46, r[t++] = 48, r[t++] = 3, r[t++] = 1, r[t++] = o & 255, r[t++] = o >> 8 & 255, r[t++] = 0;
  }
  var g = !1;
  this.addFrame = function(v, y, w, x, j, _) {
    if (g === !0 && (--t, g = !1), _ = _ === void 0 ? {} : _, v < 0 || y < 0 || v > 65535 || y > 65535)
      throw new Error("x/y invalid.");
    if (w <= 0 || x <= 0 || w > 65535 || x > 65535)
      throw new Error("Width/Height invalid.");
    if (j.length < w * x)
      throw new Error("Not enough pixels for the frame size.");
    var E = !0, I = _.palette;
    if (I == null && (E = !1, I = c), I == null)
      throw new Error("Must supply either a local or global palette.");
    for (var H = l(I), O = 0; H >>= 1; ) ++O;
    H = 1 << O;
    var S = _.delay === void 0 ? 0 : _.delay, R = _.disposal === void 0 ? 0 : _.disposal;
    if (R < 0 || R > 3)
      throw new Error("Disposal out of range.");
    var V = !1, D = 0;
    if (_.transparent !== void 0 && _.transparent !== null && (V = !0, D = _.transparent, D < 0 || D >= H))
      throw new Error("Transparent color index.");
    if ((R !== 0 || V || S !== 0) && (r[t++] = 33, r[t++] = 249, r[t++] = 4, r[t++] = R << 2 | (V === !0 ? 1 : 0), r[t++] = S & 255, r[t++] = S >> 8 & 255, r[t++] = D, r[t++] = 0), r[t++] = 44, r[t++] = v & 255, r[t++] = v >> 8 & 255, r[t++] = y & 255, r[t++] = y >> 8 & 255, r[t++] = w & 255, r[t++] = w >> 8 & 255, r[t++] = x & 255, r[t++] = x >> 8 & 255, r[t++] = E === !0 ? 128 | O - 1 : 0, E === !0)
      for (var W = 0, B = I.length; W < B; ++W) {
        var k = I[W];
        r[t++] = k >> 16 & 255, r[t++] = k >> 8 & 255, r[t++] = k & 255;
      }
    return t = Ce(
      r,
      t,
      O < 2 ? 2 : O,
      j
    ), t;
  }, this.end = function() {
    return g === !1 && (r[t++] = 59, g = !0), t;
  }, this.getOutputBuffer = function() {
    return r;
  }, this.setOutputBuffer = function(v) {
    r = v;
  }, this.getOutputBufferPosition = function() {
    return t;
  }, this.setOutputBufferPosition = function(v) {
    t = v;
  };
}
function Ce(r, e, n, a) {
  r[e++] = n;
  var t = e++, i = 1 << n, o = i - 1, c = i + 1, l = c + 1, f = n + 1, u = 0, s = 0;
  function h(_) {
    for (; u >= _; )
      r[e++] = s & 255, s >>= 8, u -= 8, e === t + 256 && (r[t] = 255, t = e++);
  }
  function p(_) {
    s |= _ << u, u += f, h(8);
  }
  var d = a[0] & o, g = {};
  p(i);
  for (var v = 1, y = a.length; v < y; ++v) {
    var w = a[v] & o, x = d << 8 | w, j = g[x];
    if (j === void 0) {
      for (s |= d << u, u += f; u >= 8; )
        r[e++] = s & 255, s >>= 8, u -= 8, e === t + 256 && (r[t] = 255, t = e++);
      l === 4096 ? (p(i), l = c + 1, f = n + 1, g = {}) : (l >= 1 << f && ++f, g[x] = l++), d = w;
    } else
      d = j;
  }
  return p(d), p(c), h(1), t + 1 === e ? r[t] = 0 : (r[t] = e - t - 1, r[e++] = 0), e;
}
function Te(r) {
  var e = 0;
  if (r[e++] !== 71 || r[e++] !== 73 || r[e++] !== 70 || r[e++] !== 56 || (r[e++] + 1 & 253) !== 56 || r[e++] !== 97)
    throw new Error("Invalid GIF 87a/89a header.");
  var n = r[e++] | r[e++] << 8, a = r[e++] | r[e++] << 8, t = r[e++], i = t >> 7, o = t & 7, c = 1 << o + 1;
  r[e++], r[e++];
  var l = null, f = null;
  i && (l = e, f = c, e += c * 3);
  var u = !0, s = [], h = 0, p = null, d = 0, g = null;
  for (this.width = n, this.height = a; u && e < r.length; )
    switch (r[e++]) {
      case 33:
        switch (r[e++]) {
          case 255:
            if (r[e] !== 11 || // 21 FF already read, check block size.
            // NETSCAPE2.0
            r[e + 1] == 78 && r[e + 2] == 69 && r[e + 3] == 84 && r[e + 4] == 83 && r[e + 5] == 67 && r[e + 6] == 65 && r[e + 7] == 80 && r[e + 8] == 69 && r[e + 9] == 50 && r[e + 10] == 46 && r[e + 11] == 48 && // Sub-block
            r[e + 12] == 3 && r[e + 13] == 1 && r[e + 16] == 0)
              e += 14, g = r[e++] | r[e++] << 8, e++;
            else
              for (e += 12; ; ) {
                var v = r[e++];
                if (!(v >= 0)) throw Error("Invalid block size");
                if (v === 0) break;
                e += v;
              }
            break;
          case 249:
            if (r[e++] !== 4 || r[e + 4] !== 0)
              throw new Error("Invalid graphics extension block.");
            var y = r[e++];
            h = r[e++] | r[e++] << 8, p = r[e++], y & 1 || (p = null), d = y >> 2 & 7, e++;
            break;
          case 254:
            for (; ; ) {
              var v = r[e++];
              if (!(v >= 0)) throw Error("Invalid block size");
              if (v === 0) break;
              e += v;
            }
            break;
          default:
            throw new Error(
              "Unknown graphic control label: 0x" + r[e - 1].toString(16)
            );
        }
        break;
      case 44:
        var w = r[e++] | r[e++] << 8, x = r[e++] | r[e++] << 8, j = r[e++] | r[e++] << 8, _ = r[e++] | r[e++] << 8, E = r[e++], I = E >> 7, H = E >> 6 & 1, O = E & 7, S = 1 << O + 1, R = l, V = f, D = !1;
        if (I) {
          var D = !0;
          R = e, V = S, e += S * 3;
        }
        var W = e;
        for (e++; ; ) {
          var v = r[e++];
          if (!(v >= 0)) throw Error("Invalid block size");
          if (v === 0) break;
          e += v;
        }
        s.push({
          x: w,
          y: x,
          width: j,
          height: _,
          has_local_palette: D,
          palette_offset: R,
          palette_size: V,
          data_offset: W,
          data_length: e - W,
          transparent_index: p,
          interlaced: !!H,
          delay: h,
          disposal: d
        });
        break;
      case 59:
        u = !1;
        break;
      default:
        throw new Error("Unknown gif block: 0x" + r[e - 1].toString(16));
    }
  this.numFrames = function() {
    return s.length;
  }, this.loopCount = function() {
    return g;
  }, this.frameInfo = function(B) {
    if (B < 0 || B >= s.length)
      throw new Error("Frame index out of range.");
    return s[B];
  }, this.decodeAndBlitFrameBGRA = function(B, k) {
    var m = this.frameInfo(B), N = m.width * m.height, U = new Uint8Array(N);
    ie(
      r,
      m.data_offset,
      U,
      N
    );
    var F = m.palette_offset, M = m.transparent_index;
    M === null && (M = 256);
    var C = m.width, G = n - C, P = C, Y = (m.y * n + m.x) * 4, J = ((m.y + m.height) * n + m.x) * 4, A = Y, z = G * 4;
    m.interlaced === !0 && (z += n * 4 * 7);
    for (var q = 8, L = 0, X = U.length; L < X; ++L) {
      var T = U[L];
      if (P === 0 && (A += z, P = C, A >= J && (z = G * 4 + n * 4 * (q - 1), A = Y + (C + G) * (q << 1), q >>= 1)), T === M)
        A += 4;
      else {
        var K = r[F + T * 3], Q = r[F + T * 3 + 1], ee = r[F + T * 3 + 2];
        k[A++] = ee, k[A++] = Q, k[A++] = K, k[A++] = 255;
      }
      --P;
    }
  }, this.decodeAndBlitFrameRGBA = function(B, k) {
    var m = this.frameInfo(B), N = m.width * m.height, U = new Uint8Array(N);
    ie(
      r,
      m.data_offset,
      U,
      N
    );
    var F = m.palette_offset, M = m.transparent_index;
    M === null && (M = 256);
    var C = m.width, G = n - C, P = C, Y = (m.y * n + m.x) * 4, J = ((m.y + m.height) * n + m.x) * 4, A = Y, z = G * 4;
    m.interlaced === !0 && (z += n * 4 * 7);
    for (var q = 8, L = 0, X = U.length; L < X; ++L) {
      var T = U[L];
      if (P === 0 && (A += z, P = C, A >= J && (z = G * 4 + n * 4 * (q - 1), A = Y + (C + G) * (q << 1), q >>= 1)), T === M)
        A += 4;
      else {
        var K = r[F + T * 3], Q = r[F + T * 3 + 1], ee = r[F + T * 3 + 2];
        k[A++] = K, k[A++] = Q, k[A++] = ee, k[A++] = 255;
      }
      --P;
    }
  };
}
function ie(r, e, n, a) {
  for (var t = r[e++], i = 1 << t, o = i + 1, c = o + 1, l = t + 1, f = (1 << l) - 1, u = 0, s = 0, h = 0, p = r[e++], d = new Int32Array(4096), g = null; ; ) {
    for (; u < 16 && p !== 0; )
      s |= r[e++] << u, u += 8, p === 1 ? p = r[e++] : --p;
    if (u < l)
      break;
    var v = s & f;
    if (s >>= l, u -= l, v === i) {
      c = o + 1, l = t + 1, f = (1 << l) - 1, g = null;
      continue;
    } else if (v === o)
      break;
    for (var y = v < c ? v : g, w = 0, x = y; x > i; )
      x = d[x] >> 8, ++w;
    var j = x, _ = h + w + (y !== v ? 1 : 0);
    if (_ > a) {
      console.log("Warning, gif stream longer than expected.");
      return;
    }
    n[h++] = j, h += w;
    var E = h;
    for (y !== v && (n[h++] = j), x = y; w--; )
      x = d[x], n[--E] = x & 255, x >>= 8;
    g !== null && c < 4096 && (d[c++] = g << 8 | j, c >= f + 1 && l < 12 && (++l, f = f << 1 | 1)), g = v;
  }
  return h !== a && console.log("Warning, gif stream shorter than expected."), n;
}
try {
  be = ne.GifWriter = Be, Ie = ne.GifReader = Te;
} catch {
}
function Oe(r, e) {
  for (var n = 1, a = r.length, t = r[0], i = r[0], o = 1; o < a; ++o)
    if (i = t, t = r[o], e(t, i)) {
      if (o === n) {
        n++;
        continue;
      }
      r[n++] = t;
    }
  return r.length = n, r;
}
function Re(r) {
  for (var e = 1, n = r.length, a = r[0], t = r[0], i = 1; i < n; ++i, t = a)
    if (t = a, a = r[i], a !== t) {
      if (i === e) {
        e++;
        continue;
      }
      r[e++] = a;
    }
  return r.length = e, r;
}
function De(r, e, n) {
  return r.length === 0 ? r : e ? (n || r.sort(e), Oe(r, e)) : (n || r.sort(), Re(r));
}
var Ue = De, Fe = Ue;
function se(r, e, n) {
  var a = r.length, t = e.arrayArgs.length, i = e.indexArgs.length > 0, o = [], c = [], l = 0, f = 0, u, s;
  for (u = 0; u < a; ++u)
    c.push(["i", u, "=0"].join(""));
  for (s = 0; s < t; ++s)
    for (u = 0; u < a; ++u)
      f = l, l = r[u], u === 0 ? c.push(["d", s, "s", u, "=t", s, "p", l].join("")) : c.push(["d", s, "s", u, "=(t", s, "p", l, "-s", f, "*t", s, "p", f, ")"].join(""));
  for (c.length > 0 && o.push("var " + c.join(",")), u = a - 1; u >= 0; --u)
    l = r[u], o.push(["for(i", u, "=0;i", u, "<s", l, ";++i", u, "){"].join(""));
  for (o.push(n), u = 0; u < a; ++u) {
    for (f = l, l = r[u], s = 0; s < t; ++s)
      o.push(["p", s, "+=d", s, "s", u].join(""));
    i && (u > 0 && o.push(["index[", f, "]-=s", f].join("")), o.push(["++index[", l, "]"].join(""))), o.push("}");
  }
  return o.join(`
`);
}
function Me(r, e, n, a) {
  for (var t = e.length, i = n.arrayArgs.length, o = n.blockSize, c = n.indexArgs.length > 0, l = [], f = 0; f < i; ++f)
    l.push(["var offset", f, "=p", f].join(""));
  for (var f = r; f < t; ++f)
    l.push(["for(var j" + f + "=SS[", e[f], "]|0;j", f, ">0;){"].join("")), l.push(["if(j", f, "<", o, "){"].join("")), l.push(["s", e[f], "=j", f].join("")), l.push(["j", f, "=0"].join("")), l.push(["}else{s", e[f], "=", o].join("")), l.push(["j", f, "-=", o, "}"].join("")), c && l.push(["index[", e[f], "]=j", f].join(""));
  for (var f = 0; f < i; ++f) {
    for (var u = ["offset" + f], s = r; s < t; ++s)
      u.push(["j", s, "*t", f, "p", e[s]].join(""));
    l.push(["p", f, "=(", u.join("+"), ")"].join(""));
  }
  l.push(se(e, n, a));
  for (var f = r; f < t; ++f)
    l.push("}");
  return l.join(`
`);
}
function Ge(r) {
  for (var e = 0, n = r[0].length; e < n; ) {
    for (var a = 1; a < r.length; ++a)
      if (r[a][e] !== r[0][e])
        return e;
    ++e;
  }
  return e;
}
function re(r, e, n) {
  for (var a = r.body, t = [], i = [], o = 0; o < r.args.length; ++o) {
    var c = r.args[o];
    if (!(c.count <= 0)) {
      var l = new RegExp(c.name, "g"), f = "", u = e.arrayArgs.indexOf(o);
      switch (e.argTypes[o]) {
        case "offset":
          var s = e.offsetArgIndex.indexOf(o), h = e.offsetArgs[s];
          u = h.array, f = "+q" + s;
        case "array":
          f = "p" + u + f;
          var p = "l" + o, d = "a" + u;
          if (e.arrayBlockIndices[u] === 0)
            c.count === 1 ? n[u] === "generic" ? c.lvalue ? (t.push(["var ", p, "=", d, ".get(", f, ")"].join("")), a = a.replace(l, p), i.push([d, ".set(", f, ",", p, ")"].join(""))) : a = a.replace(l, [d, ".get(", f, ")"].join("")) : a = a.replace(l, [d, "[", f, "]"].join("")) : n[u] === "generic" ? (t.push(["var ", p, "=", d, ".get(", f, ")"].join("")), a = a.replace(l, p), c.lvalue && i.push([d, ".set(", f, ",", p, ")"].join(""))) : (t.push(["var ", p, "=", d, "[", f, "]"].join("")), a = a.replace(l, p), c.lvalue && i.push([d, "[", f, "]=", p].join("")));
          else {
            for (var g = [c.name], v = [f], y = 0; y < Math.abs(e.arrayBlockIndices[u]); y++)
              g.push("\\s*\\[([^\\]]+)\\]"), v.push("$" + (y + 1) + "*t" + u + "b" + y);
            if (l = new RegExp(g.join(""), "g"), f = v.join("+"), n[u] === "generic")
              throw new Error("cwise: Generic arrays not supported in combination with blocks!");
            a = a.replace(l, [d, "[", f, "]"].join(""));
          }
          break;
        case "scalar":
          a = a.replace(l, "Y" + e.scalarArgs.indexOf(o));
          break;
        case "index":
          a = a.replace(l, "index");
          break;
        case "shape":
          a = a.replace(l, "shape");
          break;
      }
    }
  }
  return [t.join(`
`), a, i.join(`
`)].join(`
`).trim();
}
function Pe(r) {
  for (var e = new Array(r.length), n = !0, a = 0; a < r.length; ++a) {
    var t = r[a], i = t.match(/\d+/);
    i ? i = i[0] : i = "", t.charAt(0) === 0 ? e[a] = "u" + t.charAt(1) + i : e[a] = t.charAt(0) + i, a > 0 && (n = n && e[a] === e[a - 1]);
  }
  return n ? e[0] : e.join("");
}
function ze(r, e) {
  for (var n = e[1].length - Math.abs(r.arrayBlockIndices[0]) | 0, a = new Array(r.arrayArgs.length), t = new Array(r.arrayArgs.length), i = 0; i < r.arrayArgs.length; ++i)
    t[i] = e[2 * i], a[i] = e[2 * i + 1];
  for (var o = [], c = [], l = [], f = [], u = [], i = 0; i < r.arrayArgs.length; ++i) {
    r.arrayBlockIndices[i] < 0 ? (l.push(0), f.push(n), o.push(n), c.push(n + r.arrayBlockIndices[i])) : (l.push(r.arrayBlockIndices[i]), f.push(r.arrayBlockIndices[i] + n), o.push(0), c.push(r.arrayBlockIndices[i]));
    for (var s = [], h = 0; h < a[i].length; h++)
      l[i] <= a[i][h] && a[i][h] < f[i] && s.push(a[i][h] - l[i]);
    u.push(s);
  }
  for (var p = ["SS"], d = ["'use strict'"], g = [], h = 0; h < n; ++h)
    g.push(["s", h, "=SS[", h, "]"].join(""));
  for (var i = 0; i < r.arrayArgs.length; ++i) {
    p.push("a" + i), p.push("t" + i), p.push("p" + i);
    for (var h = 0; h < n; ++h)
      g.push(["t", i, "p", h, "=t", i, "[", l[i] + h, "]"].join(""));
    for (var h = 0; h < Math.abs(r.arrayBlockIndices[i]); ++h)
      g.push(["t", i, "b", h, "=t", i, "[", o[i] + h, "]"].join(""));
  }
  for (var i = 0; i < r.scalarArgs.length; ++i)
    p.push("Y" + i);
  if (r.shapeArgs.length > 0 && g.push("shape=SS.slice(0)"), r.indexArgs.length > 0) {
    for (var v = new Array(n), i = 0; i < n; ++i)
      v[i] = "0";
    g.push(["index=[", v.join(","), "]"].join(""));
  }
  for (var i = 0; i < r.offsetArgs.length; ++i) {
    for (var y = r.offsetArgs[i], w = [], h = 0; h < y.offset.length; ++h)
      y.offset[h] !== 0 && (y.offset[h] === 1 ? w.push(["t", y.array, "p", h].join("")) : w.push([y.offset[h], "*t", y.array, "p", h].join("")));
    w.length === 0 ? g.push("q" + i + "=0") : g.push(["q", i, "=", w.join("+")].join(""));
  }
  var x = Fe([].concat(r.pre.thisVars).concat(r.body.thisVars).concat(r.post.thisVars));
  g = g.concat(x), g.length > 0 && d.push("var " + g.join(","));
  for (var i = 0; i < r.arrayArgs.length; ++i)
    d.push("p" + i + "|=0");
  r.pre.body.length > 3 && d.push(re(r.pre, r, t));
  var j = re(r.body, r, t), _ = Ge(u);
  _ < n ? d.push(Me(_, u[0], r, j)) : d.push(se(u[0], r, j)), r.post.body.length > 3 && d.push(re(r.post, r, t)), r.debug && console.log("-----Generated cwise routine for ", e, `:
` + d.join(`
`) + `
----------`);
  var E = [r.funcName || "unnamed", "_cwise_loop_", a[0].join("s"), "m", _, Pe(t)].join(""), I = new Function(["function ", E, "(", p.join(","), "){", d.join(`
`), "} return ", E].join(""));
  return I();
}
var qe = ze, Le = qe;
function Se(r) {
  var e = ["'use strict'", "var CACHED={}"], n = [], a = r.funcName + "_cwise_thunk";
  e.push(["return function ", a, "(", r.shimArgs.join(","), "){"].join(""));
  for (var t = [], i = [], o = [[
    "array",
    r.arrayArgs[0],
    ".shape.slice(",
    // Slice shape so that we only retain the shape over which we iterate (which gets passed to the cwise operator as SS).
    Math.max(0, r.arrayBlockIndices[0]),
    r.arrayBlockIndices[0] < 0 ? "," + r.arrayBlockIndices[0] + ")" : ")"
  ].join("")], c = [], l = [], f = 0; f < r.arrayArgs.length; ++f) {
    var u = r.arrayArgs[f];
    n.push([
      "t",
      u,
      "=array",
      u,
      ".dtype,",
      "r",
      u,
      "=array",
      u,
      ".order"
    ].join("")), t.push("t" + u), t.push("r" + u), i.push("t" + u), i.push("r" + u + ".join()"), o.push("array" + u + ".data"), o.push("array" + u + ".stride"), o.push("array" + u + ".offset|0"), f > 0 && (c.push("array" + r.arrayArgs[0] + ".shape.length===array" + u + ".shape.length+" + (Math.abs(r.arrayBlockIndices[0]) - Math.abs(r.arrayBlockIndices[f]))), l.push("array" + r.arrayArgs[0] + ".shape[shapeIndex+" + Math.max(0, r.arrayBlockIndices[0]) + "]===array" + u + ".shape[shapeIndex+" + Math.max(0, r.arrayBlockIndices[f]) + "]"));
  }
  r.arrayArgs.length > 1 && (e.push("if (!(" + c.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same dimensionality!')"), e.push("for(var shapeIndex=array" + r.arrayArgs[0] + ".shape.length-" + Math.abs(r.arrayBlockIndices[0]) + "; shapeIndex-->0;) {"), e.push("if (!(" + l.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same shape!')"), e.push("}"));
  for (var f = 0; f < r.scalarArgs.length; ++f)
    o.push("scalar" + r.scalarArgs[f]);
  n.push(["type=[", i.join(","), "].join()"].join("")), n.push("proc=CACHED[type]"), e.push("var " + n.join(",")), e.push([
    "if(!proc){",
    "CACHED[type]=proc=compile([",
    t.join(","),
    "])}",
    "return proc(",
    o.join(","),
    ")}"
  ].join("")), r.debug && console.log(`-----Generated thunk:
` + e.join(`
`) + `
----------`);
  var s = new Function("compile", e.join(`
`));
  return s(Le.bind(void 0, r));
}
var Ve = Se, We = Ve;
function $e() {
  this.argTypes = [], this.shimArgs = [], this.arrayArgs = [], this.arrayBlockIndices = [], this.scalarArgs = [], this.offsetArgs = [], this.offsetArgIndex = [], this.indexArgs = [], this.shapeArgs = [], this.funcName = "", this.pre = null, this.body = null, this.post = null, this.debug = !1;
}
function He(r) {
  var e = new $e();
  e.pre = r.pre, e.body = r.body, e.post = r.post;
  var n = r.args.slice(0);
  e.argTypes = n;
  for (var a = 0; a < n.length; ++a) {
    var t = n[a];
    if (t === "array" || typeof t == "object" && t.blockIndices) {
      if (e.argTypes[a] = "array", e.arrayArgs.push(a), e.arrayBlockIndices.push(t.blockIndices ? t.blockIndices : 0), e.shimArgs.push("array" + a), a < e.pre.args.length && e.pre.args[a].count > 0)
        throw new Error("cwise: pre() block may not reference array args");
      if (a < e.post.args.length && e.post.args[a].count > 0)
        throw new Error("cwise: post() block may not reference array args");
    } else if (t === "scalar")
      e.scalarArgs.push(a), e.shimArgs.push("scalar" + a);
    else if (t === "index") {
      if (e.indexArgs.push(a), a < e.pre.args.length && e.pre.args[a].count > 0)
        throw new Error("cwise: pre() block may not reference array index");
      if (a < e.body.args.length && e.body.args[a].lvalue)
        throw new Error("cwise: body() block may not write to array index");
      if (a < e.post.args.length && e.post.args[a].count > 0)
        throw new Error("cwise: post() block may not reference array index");
    } else if (t === "shape") {
      if (e.shapeArgs.push(a), a < e.pre.args.length && e.pre.args[a].lvalue)
        throw new Error("cwise: pre() block may not write to array shape");
      if (a < e.body.args.length && e.body.args[a].lvalue)
        throw new Error("cwise: body() block may not write to array shape");
      if (a < e.post.args.length && e.post.args[a].lvalue)
        throw new Error("cwise: post() block may not write to array shape");
    } else if (typeof t == "object" && t.offset)
      e.argTypes[a] = "offset", e.offsetArgs.push({ array: t.array, offset: t.offset }), e.offsetArgIndex.push(a);
    else
      throw new Error("cwise: Unknown argument type " + n[a]);
  }
  if (e.arrayArgs.length <= 0)
    throw new Error("cwise: No array arguments specified");
  if (e.pre.args.length > n.length)
    throw new Error("cwise: Too many arguments in pre() block");
  if (e.body.args.length > n.length)
    throw new Error("cwise: Too many arguments in body() block");
  if (e.post.args.length > n.length)
    throw new Error("cwise: Too many arguments in post() block");
  return e.debug = !!r.printCode || !!r.debug, e.funcName = r.funcName || "cwise", e.blockSize = r.blockSize || 64, We(e);
}
var Ne = He;
Ne({ args: ["array", "scalar", "index"], pre: { body: "{}", args: [], thisVars: [], localVars: [] }, body: { body: `{
var _inline_1_v=_inline_1_arg1_,_inline_1_i
for(_inline_1_i=0;_inline_1_i<_inline_1_arg2_.length-1;++_inline_1_i) {
_inline_1_v=_inline_1_v[_inline_1_arg2_[_inline_1_i]]
}
_inline_1_arg0_=_inline_1_v[_inline_1_arg2_[_inline_1_arg2_.length-1]]
}`, args: [{ name: "_inline_1_arg0_", lvalue: !0, rvalue: !1, count: 1 }, { name: "_inline_1_arg1_", lvalue: !1, rvalue: !0, count: 1 }, { name: "_inline_1_arg2_", lvalue: !1, rvalue: !0, count: 4 }], thisVars: [], localVars: ["_inline_1_i", "_inline_1_v"] }, post: { body: "{}", args: [], thisVars: [], localVars: [] }, funcName: "convert", blockSize: 64 });
var Ye = { exports: {} };
const Ze = {}, Je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ze
}, Symbol.toStringTag, { value: "Module" })), Xe = /* @__PURE__ */ ue(Je);
(function(r, e) {
  var n = Xe;
  r.exports = a, a.through = a;
  function a(t, i, o) {
    t = t || function(d) {
      this.queue(d);
    }, i = i || function() {
      this.queue(null);
    };
    var c = !1, l = !1, f = [], u = !1, s = new n();
    s.readable = s.writable = !0, s.paused = !1, s.autoDestroy = !(o && o.autoDestroy === !1), s.write = function(d) {
      return t.call(this, d), !s.paused;
    };
    function h() {
      for (; f.length && !s.paused; ) {
        var d = f.shift();
        if (d === null)
          return s.emit("end");
        s.emit("data", d);
      }
    }
    s.queue = s.push = function(d) {
      return u || (d === null && (u = !0), f.push(d), h()), s;
    }, s.on("end", function() {
      s.readable = !1, !s.writable && s.autoDestroy && process.nextTick(function() {
        s.destroy();
      });
    });
    function p() {
      s.writable = !1, i.call(s), !s.readable && s.autoDestroy && s.destroy();
    }
    return s.end = function(d) {
      if (!c)
        return c = !0, arguments.length && s.write(d), p(), s;
    }, s.destroy = function() {
      if (!l)
        return l = !0, c = !0, f.length = 0, s.writable = s.readable = !1, s.emit("close"), s;
    }, s.pause = function() {
      if (!s.paused)
        return s.paused = !0, s;
    }, s.resume = function() {
      return s.paused && (s.paused = !1, s.emit("resume")), h(), s.paused || s.emit("drain"), s;
    }, s;
  }
})(Ye);
var Ke = Qe;
function Qe(r) {
  if (!/^data\:/i.test(r))
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  r = r.replace(/\r?\n/g, "");
  var e = r.indexOf(",");
  if (e === -1 || e <= 4) throw new TypeError("malformed data: URI");
  for (var n = r.substring(5, e).split(";"), a = !1, t = "US-ASCII", i = 0; i < n.length; i++)
    n[i] == "base64" ? a = !0 : n[i].indexOf("charset=") == 0 && (t = n[i].substring(8));
  var o = unescape(r.substring(e + 1)), c = a ? "base64" : "ascii", l = new Buffer(o, c);
  return l.type = n[0] || "text/plain", l.charset = t, l;
}
var er = he, te = Ee, rr = ne.GifReader, nr = Ke;
function tr(r, e) {
  var n = new Image();
  n.crossOrigin = "Anonymous", n.onload = function() {
    var a = document.createElement("canvas");
    a.width = n.width, a.height = n.height;
    var t = a.getContext("2d");
    t.drawImage(n, 0, 0);
    var i = t.getImageData(0, 0, n.width, n.height);
    e(null, te(new Uint8Array(i.data), [n.width, n.height, 4], [4, 4 * n.width, 1], 0));
  }, n.onerror = function(a) {
    e(a);
  }, n.src = r;
}
function fe(r, e) {
  var n;
  try {
    n = new rr(r);
  } catch (c) {
    e(c);
    return;
  }
  if (n.numFrames() > 0) {
    var a = [n.numFrames(), n.height, n.width, 4], t = new Uint8Array(a[0] * a[1] * a[2] * a[3]), i = te(t, a);
    try {
      for (var o = 0; o < n.numFrames(); ++o)
        n.decodeAndBlitFrameRGBA(o, t.subarray(
          i.index(o, 0, 0, 0),
          i.index(o + 1, 0, 0, 0)
        ));
    } catch (c) {
      e(c);
      return;
    }
    e(null, i.transpose(0, 2, 1));
  } else {
    var a = [n.height, n.width, 4], t = new Uint8Array(a[0] * a[1] * a[2]), i = te(t, a);
    try {
      n.decodeAndBlitFrameRGBA(0, t);
    } catch (u) {
      e(u);
      return;
    }
    e(null, i.transpose(1, 0));
  }
}
function ar(r, e) {
  var n = new XMLHttpRequest();
  n.open("GET", r, !0), n.responseType = "arraybuffer", n.overrideMimeType && n.overrideMimeType("application/binary"), n.onerror = function(a) {
    e(a);
  }, n.onload = function() {
    if (n.readyState === 4) {
      var a = new Uint8Array(n.response);
      fe(a, e);
    }
  }, n.send();
}
function ir(r) {
  if (r[0] === void 0) {
    for (var e = r.length, n = new Uint8Array(e), a = 0; a < e; ++a)
      n[a] = r.get(a);
    return n;
  } else
    return new Uint8Array(r);
}
function or(r, e) {
  process.nextTick(function() {
    try {
      var n = nr(r);
      n ? fe(ir(n), e) : e(new Error("Error parsing data URI"));
    } catch (a) {
      e(a);
    }
  });
}
var sr = function(e, n, a) {
  a || (a = n, n = "");
  var t = er.extname(e);
  switch (n || t.toUpperCase()) {
    case ".GIF":
      ar(e, a);
      break;
    default:
      Buffer.isBuffer(e) && (e = "data:" + n + ";base64," + e.toString("base64")), e.indexOf("data:image/gif;") === 0 ? or(e, a) : tr(e, a);
  }
};
const fr = /* @__PURE__ */ le(sr), cr = async (r) => lr(r), lr = (r) => new Promise((e, n) => {
  fr(r, (a, t) => {
    if (a)
      n(a);
    else {
      console.log(t);
      const i = [], { shape: o } = t, [c, l, f, u] = o, s = l * f;
      for (let h = 0; h < c; ++h) {
        if (h > 0) {
          const p = t.index(h, 0, 0, 0), d = t.index(h - 1, 0, 0, 0);
          for (let g = 0; g < s; ++g) {
            const v = p + g * u;
            if (t.data[v + u - 1] === 0) {
              const y = d + g * u;
              for (let w = 0; w < u; ++w)
                t.data[v + w] = t.data[y + w];
            }
          }
        }
        i.push(t.pick(h));
      }
      e(ur(i, l, f));
    }
  });
}), ur = (r, e, n) => {
  const a = document.createElement("canvas"), t = a.getContext("2d");
  return a.width = e * r.length, a.height = n, r.forEach((i, o) => {
    const c = t.createImageData(e, n);
    c.data.set(i.data.slice(e * n * 4 * o, e * n * 4 * (o + 1))), t.putImageData(c, e * o, 0);
  }), {
    animated: r.length > 1,
    width: e,
    height: n,
    spriteData: a.toDataURL()
  };
};
export {
  cr as gif2Sprite
};
