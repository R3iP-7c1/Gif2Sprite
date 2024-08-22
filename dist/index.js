function _e(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Ae(t) {
  if (t.__esModule) return t;
  var e = t.default;
  if (typeof e == "function") {
    var r = function a() {
      return this instanceof a ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    r.prototype = e.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(t).forEach(function(a) {
    var n = Object.getOwnPropertyDescriptor(t, a);
    Object.defineProperty(r, a, n.get ? n : {
      enumerable: !0,
      get: function() {
        return t[a];
      }
    });
  }), r;
}
function T(t) {
  if (typeof t != "string")
    throw new TypeError("Path must be a string. Received " + JSON.stringify(t));
}
function de(t, e) {
  for (var r = "", a = 0, n = -1, i = 0, o, f = 0; f <= t.length; ++f) {
    if (f < t.length)
      o = t.charCodeAt(f);
    else {
      if (o === 47)
        break;
      o = 47;
    }
    if (o === 47) {
      if (!(n === f - 1 || i === 1)) if (n !== f - 1 && i === 2) {
        if (r.length < 2 || a !== 2 || r.charCodeAt(r.length - 1) !== 46 || r.charCodeAt(r.length - 2) !== 46) {
          if (r.length > 2) {
            var l = r.lastIndexOf("/");
            if (l !== r.length - 1) {
              l === -1 ? (r = "", a = 0) : (r = r.slice(0, l), a = r.length - 1 - r.lastIndexOf("/")), n = f, i = 0;
              continue;
            }
          } else if (r.length === 2 || r.length === 1) {
            r = "", a = 0, n = f, i = 0;
            continue;
          }
        }
        e && (r.length > 0 ? r += "/.." : r = "..", a = 2);
      } else
        r.length > 0 ? r += "/" + t.slice(n + 1, f) : r = t.slice(n + 1, f), a = f - n - 1;
      n = f, i = 0;
    } else o === 46 && i !== -1 ? ++i : i = -1;
  }
  return r;
}
function ke(t, e) {
  var r = e.dir || e.root, a = e.base || (e.name || "") + (e.ext || "");
  return r ? r === e.root ? r + a : r + t + a : a;
}
var X = {
  // path.resolve([from ...], to)
  resolve: function() {
    for (var e = "", r = !1, a, n = arguments.length - 1; n >= -1 && !r; n--) {
      var i;
      n >= 0 ? i = arguments[n] : (a === void 0 && (a = process.cwd()), i = a), T(i), i.length !== 0 && (e = i + "/" + e, r = i.charCodeAt(0) === 47);
    }
    return e = de(e, !r), r ? e.length > 0 ? "/" + e : "/" : e.length > 0 ? e : ".";
  },
  normalize: function(e) {
    if (T(e), e.length === 0) return ".";
    var r = e.charCodeAt(0) === 47, a = e.charCodeAt(e.length - 1) === 47;
    return e = de(e, !r), e.length === 0 && !r && (e = "."), e.length > 0 && a && (e += "/"), r ? "/" + e : e;
  },
  isAbsolute: function(e) {
    return T(e), e.length > 0 && e.charCodeAt(0) === 47;
  },
  join: function() {
    if (arguments.length === 0)
      return ".";
    for (var e, r = 0; r < arguments.length; ++r) {
      var a = arguments[r];
      T(a), a.length > 0 && (e === void 0 ? e = a : e += "/" + a);
    }
    return e === void 0 ? "." : X.normalize(e);
  },
  relative: function(e, r) {
    if (T(e), T(r), e === r || (e = X.resolve(e), r = X.resolve(r), e === r)) return "";
    for (var a = 1; a < e.length && e.charCodeAt(a) === 47; ++a)
      ;
    for (var n = e.length, i = n - a, o = 1; o < r.length && r.charCodeAt(o) === 47; ++o)
      ;
    for (var f = r.length, l = f - o, u = i < l ? i : l, d = -1, s = 0; s <= u; ++s) {
      if (s === u) {
        if (l > u) {
          if (r.charCodeAt(o + s) === 47)
            return r.slice(o + s + 1);
          if (s === 0)
            return r.slice(o + s);
        } else i > u && (e.charCodeAt(a + s) === 47 ? d = s : s === 0 && (d = 0));
        break;
      }
      var c = e.charCodeAt(a + s), p = r.charCodeAt(o + s);
      if (c !== p)
        break;
      c === 47 && (d = s);
    }
    var h = "";
    for (s = a + d + 1; s <= n; ++s)
      (s === n || e.charCodeAt(s) === 47) && (h.length === 0 ? h += ".." : h += "/..");
    return h.length > 0 ? h + r.slice(o + d) : (o += d, r.charCodeAt(o) === 47 && ++o, r.slice(o));
  },
  _makeLong: function(e) {
    return e;
  },
  dirname: function(e) {
    if (T(e), e.length === 0) return ".";
    for (var r = e.charCodeAt(0), a = r === 47, n = -1, i = !0, o = e.length - 1; o >= 1; --o)
      if (r = e.charCodeAt(o), r === 47) {
        if (!i) {
          n = o;
          break;
        }
      } else
        i = !1;
    return n === -1 ? a ? "/" : "." : a && n === 1 ? "//" : e.slice(0, n);
  },
  basename: function(e, r) {
    if (r !== void 0 && typeof r != "string") throw new TypeError('"ext" argument must be a string');
    T(e);
    var a = 0, n = -1, i = !0, o;
    if (r !== void 0 && r.length > 0 && r.length <= e.length) {
      if (r.length === e.length && r === e) return "";
      var f = r.length - 1, l = -1;
      for (o = e.length - 1; o >= 0; --o) {
        var u = e.charCodeAt(o);
        if (u === 47) {
          if (!i) {
            a = o + 1;
            break;
          }
        } else
          l === -1 && (i = !1, l = o + 1), f >= 0 && (u === r.charCodeAt(f) ? --f === -1 && (n = o) : (f = -1, n = l));
      }
      return a === n ? n = l : n === -1 && (n = e.length), e.slice(a, n);
    } else {
      for (o = e.length - 1; o >= 0; --o)
        if (e.charCodeAt(o) === 47) {
          if (!i) {
            a = o + 1;
            break;
          }
        } else n === -1 && (i = !1, n = o + 1);
      return n === -1 ? "" : e.slice(a, n);
    }
  },
  extname: function(e) {
    T(e);
    for (var r = -1, a = 0, n = -1, i = !0, o = 0, f = e.length - 1; f >= 0; --f) {
      var l = e.charCodeAt(f);
      if (l === 47) {
        if (!i) {
          a = f + 1;
          break;
        }
        continue;
      }
      n === -1 && (i = !1, n = f + 1), l === 46 ? r === -1 ? r = f : o !== 1 && (o = 1) : r !== -1 && (o = -1);
    }
    return r === -1 || n === -1 || // We saw a non-dot character immediately before the dot
    o === 0 || // The (right-most) trimmed path component is exactly '..'
    o === 1 && r === n - 1 && r === a + 1 ? "" : e.slice(r, n);
  },
  format: function(e) {
    if (e === null || typeof e != "object")
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e);
    return ke("/", e);
  },
  parse: function(e) {
    T(e);
    var r = { root: "", dir: "", base: "", ext: "", name: "" };
    if (e.length === 0) return r;
    var a = e.charCodeAt(0), n = a === 47, i;
    n ? (r.root = "/", i = 1) : i = 0;
    for (var o = -1, f = 0, l = -1, u = !0, d = e.length - 1, s = 0; d >= i; --d) {
      if (a = e.charCodeAt(d), a === 47) {
        if (!u) {
          f = d + 1;
          break;
        }
        continue;
      }
      l === -1 && (u = !1, l = d + 1), a === 46 ? o === -1 ? o = d : s !== 1 && (s = 1) : o !== -1 && (s = -1);
    }
    return o === -1 || l === -1 || // We saw a non-dot character immediately before the dot
    s === 0 || // The (right-most) trimmed path component is exactly '..'
    s === 1 && o === l - 1 && o === f + 1 ? l !== -1 && (f === 0 && n ? r.base = r.name = e.slice(1, l) : r.base = r.name = e.slice(f, l)) : (f === 0 && n ? (r.name = e.slice(1, o), r.base = e.slice(1, l)) : (r.name = e.slice(f, o), r.base = e.slice(f, l)), r.ext = e.slice(o, l)), f > 0 ? r.dir = e.slice(0, f - 1) : n && (r.dir = "/"), r;
  },
  sep: "/",
  delimiter: ":",
  win32: null,
  posix: null
};
X.posix = X;
var Be = X;
function je(t) {
  for (var e = new Array(t), r = 0; r < t; ++r)
    e[r] = r;
  return e;
}
var be = je;
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var Ie = function(t) {
  return t != null && (he(t) || Ee(t) || !!t._isBuffer);
};
function he(t) {
  return !!t.constructor && typeof t.constructor.isBuffer == "function" && t.constructor.isBuffer(t);
}
function Ee(t) {
  return typeof t.readFloatLE == "function" && typeof t.slice == "function" && he(t.slice(0, 0));
}
var Ce = be, Se = Ie, Te = typeof Float64Array < "u";
function Ue(t, e) {
  return t[0] - e[0];
}
function De() {
  var t = this.stride, e = new Array(t.length), r;
  for (r = 0; r < e.length; ++r)
    e[r] = [Math.abs(t[r]), r];
  e.sort(Ue);
  var a = new Array(e.length);
  for (r = 0; r < a.length; ++r)
    a[r] = e[r][1];
  return a;
}
function Fe(t, e) {
  var r = ["View", e, "d", t].join("");
  e < 0 && (r = "View_Nil" + t);
  var a = t === "generic";
  if (e === -1) {
    var n = "function " + r + "(a){this.data=a;};var proto=" + r + ".prototype;proto.dtype='" + t + "';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new " + r + "(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_" + r + "(a){return new " + r + "(a);}", g = new Function(n);
    return g();
  } else if (e === 0) {
    var n = "function " + r + "(a,d) {this.data = a;this.offset = d};var proto=" + r + ".prototype;proto.dtype='" + t + "';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function " + r + "_copy() {return new " + r + "(this.data,this.offset)};proto.pick=function " + r + "_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function " + r + "_get(){return " + (a ? "this.data.get(this.offset)" : "this.data[this.offset]") + "};proto.set=function " + r + "_set(v){return " + (a ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v") + "};return function construct_" + r + "(a,b,c,d){return new " + r + "(a,d)}", g = new Function("TrivialArray", n);
    return g(K[t][0]);
  }
  var n = ["'use strict'"], i = Ce(e), o = i.map(function(v) {
    return "i" + v;
  }), f = "this.offset+" + i.map(function(v) {
    return "this.stride[" + v + "]*i" + v;
  }).join("+"), l = i.map(function(v) {
    return "b" + v;
  }).join(","), u = i.map(function(v) {
    return "c" + v;
  }).join(",");
  n.push(
    "function " + r + "(a," + l + "," + u + ",d){this.data=a",
    "this.shape=[" + l + "]",
    "this.stride=[" + u + "]",
    "this.offset=d|0}",
    "var proto=" + r + ".prototype",
    "proto.dtype='" + t + "'",
    "proto.dimension=" + e
  ), n.push(
    "Object.defineProperty(proto,'size',{get:function " + r + "_size(){return " + i.map(function(v) {
      return "this.shape[" + v + "]";
    }).join("*"),
    "}})"
  ), e === 1 ? n.push("proto.order=[0]") : (n.push("Object.defineProperty(proto,'order',{get:"), e < 4 ? (n.push("function " + r + "_order(){"), e === 2 ? n.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})") : e === 3 && n.push(
    "var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})"
  )) : n.push("ORDER})")), n.push(
    "proto.set=function " + r + "_set(" + o.join(",") + ",v){"
  ), a ? n.push("return this.data.set(" + f + ",v)}") : n.push("return this.data[" + f + "]=v}"), n.push("proto.get=function " + r + "_get(" + o.join(",") + "){"), a ? n.push("return this.data.get(" + f + ")}") : n.push("return this.data[" + f + "]}"), n.push(
    "proto.index=function " + r + "_index(",
    o.join(),
    "){return " + f + "}"
  ), n.push("proto.hi=function " + r + "_hi(" + o.join(",") + "){return new " + r + "(this.data," + i.map(function(v) {
    return ["(typeof i", v, "!=='number'||i", v, "<0)?this.shape[", v, "]:i", v, "|0"].join("");
  }).join(",") + "," + i.map(function(v) {
    return "this.stride[" + v + "]";
  }).join(",") + ",this.offset)}");
  var d = i.map(function(v) {
    return "a" + v + "=this.shape[" + v + "]";
  }), s = i.map(function(v) {
    return "c" + v + "=this.stride[" + v + "]";
  });
  n.push("proto.lo=function " + r + "_lo(" + o.join(",") + "){var b=this.offset,d=0," + d.join(",") + "," + s.join(","));
  for (var c = 0; c < e; ++c)
    n.push(
      "if(typeof i" + c + "==='number'&&i" + c + ">=0){d=i" + c + "|0;b+=c" + c + "*d;a" + c + "-=d}"
    );
  n.push("return new " + r + "(this.data," + i.map(function(v) {
    return "a" + v;
  }).join(",") + "," + i.map(function(v) {
    return "c" + v;
  }).join(",") + ",b)}"), n.push("proto.step=function " + r + "_step(" + o.join(",") + "){var " + i.map(function(v) {
    return "a" + v + "=this.shape[" + v + "]";
  }).join(",") + "," + i.map(function(v) {
    return "b" + v + "=this.stride[" + v + "]";
  }).join(",") + ",c=this.offset,d=0,ceil=Math.ceil");
  for (var c = 0; c < e; ++c)
    n.push(
      "if(typeof i" + c + "==='number'){d=i" + c + "|0;if(d<0){c+=b" + c + "*(a" + c + "-1);a" + c + "=ceil(-a" + c + "/d)}else{a" + c + "=ceil(a" + c + "/d)}b" + c + "*=d}"
    );
  n.push("return new " + r + "(this.data," + i.map(function(v) {
    return "a" + v;
  }).join(",") + "," + i.map(function(v) {
    return "b" + v;
  }).join(",") + ",c)}");
  for (var p = new Array(e), h = new Array(e), c = 0; c < e; ++c)
    p[c] = "a[i" + c + "]", h[c] = "b[i" + c + "]";
  n.push(
    "proto.transpose=function " + r + "_transpose(" + o + "){" + o.map(function(v, y) {
      return v + "=(" + v + "===undefined?" + y + ":" + v + "|0)";
    }).join(";"),
    "var a=this.shape,b=this.stride;return new " + r + "(this.data," + p.join(",") + "," + h.join(",") + ",this.offset)}"
  ), n.push("proto.pick=function " + r + "_pick(" + o + "){var a=[],b=[],c=this.offset");
  for (var c = 0; c < e; ++c)
    n.push("if(typeof i" + c + "==='number'&&i" + c + ">=0){c=(c+this.stride[" + c + "]*i" + c + ")|0}else{a.push(this.shape[" + c + "]);b.push(this.stride[" + c + "])}");
  n.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}"), n.push("return function construct_" + r + "(data,shape,stride,offset){return new " + r + "(data," + i.map(function(v) {
    return "shape[" + v + "]";
  }).join(",") + "," + i.map(function(v) {
    return "stride[" + v + "]";
  }).join(",") + ",offset)}");
  var g = new Function("CTOR_LIST", "ORDER", n.join(`
`));
  return g(K[t], De);
}
function Pe(t) {
  if (Se(t))
    return "buffer";
  if (Te)
    switch (Object.prototype.toString.call(t)) {
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
  return Array.isArray(t) ? "array" : "generic";
}
var K = {
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
function Me(t, e, r, a) {
  if (t === void 0) {
    var u = K.array[0];
    return u([]);
  } else typeof t == "number" && (t = [t]);
  e === void 0 && (e = [t.length]);
  var n = e.length;
  if (r === void 0) {
    r = new Array(n);
    for (var i = n - 1, o = 1; i >= 0; --i)
      r[i] = o, o *= e[i];
  }
  if (a === void 0) {
    a = 0;
    for (var i = 0; i < n; ++i)
      r[i] < 0 && (a -= (e[i] - 1) * r[i]);
  }
  for (var f = Pe(t), l = K[f]; l.length <= n + 1; )
    l.push(Fe(f, l.length - 1));
  var u = l[n + 1];
  return u(t, e, r, a);
}
var Oe = Me, fe = {}, ze, Ge;
function Re(t, e, r, i) {
  var n = 0, i = i === void 0 ? {} : i, o = i.loop === void 0 ? null : i.loop, f = i.palette === void 0 ? null : i.palette;
  if (e <= 0 || r <= 0 || e > 65535 || r > 65535)
    throw new Error("Width/Height invalid.");
  function l(v) {
    var y = v.length;
    if (y < 2 || y > 256 || y & y - 1)
      throw new Error(
        "Invalid code/color length, must be power of 2 and 2 .. 256."
      );
    return y;
  }
  t[n++] = 71, t[n++] = 73, t[n++] = 70, t[n++] = 56, t[n++] = 57, t[n++] = 97;
  var u = 0, d = 0;
  if (f !== null) {
    for (var s = l(f); s >>= 1; ) ++u;
    if (s = 1 << u, --u, i.background !== void 0) {
      if (d = i.background, d >= s)
        throw new Error("Background index out of range.");
      if (d === 0)
        throw new Error("Background index explicitly passed as 0.");
    }
  }
  if (t[n++] = e & 255, t[n++] = e >> 8 & 255, t[n++] = r & 255, t[n++] = r >> 8 & 255, t[n++] = (f !== null ? 128 : 0) | // Global Color Table Flag.
  u, t[n++] = d, t[n++] = 0, f !== null)
    for (var c = 0, p = f.length; c < p; ++c) {
      var h = f[c];
      t[n++] = h >> 16 & 255, t[n++] = h >> 8 & 255, t[n++] = h & 255;
    }
  if (o !== null) {
    if (o < 0 || o > 65535)
      throw new Error("Loop count invalid.");
    t[n++] = 33, t[n++] = 255, t[n++] = 11, t[n++] = 78, t[n++] = 69, t[n++] = 84, t[n++] = 83, t[n++] = 67, t[n++] = 65, t[n++] = 80, t[n++] = 69, t[n++] = 50, t[n++] = 46, t[n++] = 48, t[n++] = 3, t[n++] = 1, t[n++] = o & 255, t[n++] = o >> 8 & 255, t[n++] = 0;
  }
  var g = !1;
  this.addFrame = function(v, y, x, m, A, w) {
    if (g === !0 && (--n, g = !1), w = w === void 0 ? {} : w, v < 0 || y < 0 || v > 65535 || y > 65535)
      throw new Error("x/y invalid.");
    if (x <= 0 || m <= 0 || x > 65535 || m > 65535)
      throw new Error("Width/Height invalid.");
    if (A.length < x * m)
      throw new Error("Not enough pixels for the frame size.");
    var j = !0, B = w.palette;
    if (B == null && (j = !1, B = f), B == null)
      throw new Error("Must supply either a local or global palette.");
    for (var I = l(B), C = 0; I >>= 1; ) ++C;
    I = 1 << C;
    var S = w.delay === void 0 ? 0 : w.delay, M = w.disposal === void 0 ? 0 : w.disposal;
    if (M < 0 || M > 3)
      throw new Error("Disposal out of range.");
    var N = !1, O = 0;
    if (w.transparent !== void 0 && w.transparent !== null && (N = !0, O = w.transparent, O < 0 || O >= I))
      throw new Error("Transparent color index.");
    if ((M !== 0 || N || S !== 0) && (t[n++] = 33, t[n++] = 249, t[n++] = 4, t[n++] = M << 2 | (N === !0 ? 1 : 0), t[n++] = S & 255, t[n++] = S >> 8 & 255, t[n++] = O, t[n++] = 0), t[n++] = 44, t[n++] = v & 255, t[n++] = v >> 8 & 255, t[n++] = y & 255, t[n++] = y >> 8 & 255, t[n++] = x & 255, t[n++] = x >> 8 & 255, t[n++] = m & 255, t[n++] = m >> 8 & 255, t[n++] = j === !0 ? 128 | C - 1 : 0, j === !0)
      for (var Z = 0, U = B.length; Z < U; ++Z) {
        var E = B[Z];
        t[n++] = E >> 16 & 255, t[n++] = E >> 8 & 255, t[n++] = E & 255;
      }
    return n = qe(
      t,
      n,
      C < 2 ? 2 : C,
      A
    ), n;
  }, this.end = function() {
    return g === !1 && (t[n++] = 59, g = !0), n;
  }, this.getOutputBuffer = function() {
    return t;
  }, this.setOutputBuffer = function(v) {
    t = v;
  }, this.getOutputBufferPosition = function() {
    return n;
  }, this.setOutputBufferPosition = function(v) {
    n = v;
  };
}
function qe(t, e, r, a) {
  t[e++] = r;
  var n = e++, i = 1 << r, o = i - 1, f = i + 1, l = f + 1, u = r + 1, d = 0, s = 0;
  function c(w) {
    for (; d >= w; )
      t[e++] = s & 255, s >>= 8, d -= 8, e === n + 256 && (t[n] = 255, n = e++);
  }
  function p(w) {
    s |= w << d, d += u, c(8);
  }
  var h = a[0] & o, g = {};
  p(i);
  for (var v = 1, y = a.length; v < y; ++v) {
    var x = a[v] & o, m = h << 8 | x, A = g[m];
    if (A === void 0) {
      for (s |= h << d, d += u; d >= 8; )
        t[e++] = s & 255, s >>= 8, d -= 8, e === n + 256 && (t[n] = 255, n = e++);
      l === 4096 ? (p(i), l = f + 1, u = r + 1, g = {}) : (l >= 1 << u && ++u, g[m] = l++), h = x;
    } else
      h = A;
  }
  return p(h), p(f), c(1), n + 1 === e ? t[n] = 0 : (t[n] = e - n - 1, t[e++] = 0), e;
}
function Le(t) {
  var e = 0;
  if (t[e++] !== 71 || t[e++] !== 73 || t[e++] !== 70 || t[e++] !== 56 || (t[e++] + 1 & 253) !== 56 || t[e++] !== 97)
    throw new Error("Invalid GIF 87a/89a header.");
  var r = t[e++] | t[e++] << 8, a = t[e++] | t[e++] << 8, n = t[e++], i = n >> 7, o = n & 7, f = 1 << o + 1;
  t[e++], t[e++];
  var l = null, u = null;
  i && (l = e, u = f, e += f * 3);
  var d = !0, s = [], c = 0, p = null, h = 0, g = null;
  for (this.width = r, this.height = a; d && e < t.length; )
    switch (t[e++]) {
      case 33:
        switch (t[e++]) {
          case 255:
            if (t[e] !== 11 || // 21 FF already read, check block size.
            // NETSCAPE2.0
            t[e + 1] == 78 && t[e + 2] == 69 && t[e + 3] == 84 && t[e + 4] == 83 && t[e + 5] == 67 && t[e + 6] == 65 && t[e + 7] == 80 && t[e + 8] == 69 && t[e + 9] == 50 && t[e + 10] == 46 && t[e + 11] == 48 && // Sub-block
            t[e + 12] == 3 && t[e + 13] == 1 && t[e + 16] == 0)
              e += 14, g = t[e++] | t[e++] << 8, e++;
            else
              for (e += 12; ; ) {
                var v = t[e++];
                if (!(v >= 0)) throw Error("Invalid block size");
                if (v === 0) break;
                e += v;
              }
            break;
          case 249:
            if (t[e++] !== 4 || t[e + 4] !== 0)
              throw new Error("Invalid graphics extension block.");
            var y = t[e++];
            c = t[e++] | t[e++] << 8, p = t[e++], y & 1 || (p = null), h = y >> 2 & 7, e++;
            break;
          case 254:
            for (; ; ) {
              var v = t[e++];
              if (!(v >= 0)) throw Error("Invalid block size");
              if (v === 0) break;
              e += v;
            }
            break;
          default:
            throw new Error(
              "Unknown graphic control label: 0x" + t[e - 1].toString(16)
            );
        }
        break;
      case 44:
        var x = t[e++] | t[e++] << 8, m = t[e++] | t[e++] << 8, A = t[e++] | t[e++] << 8, w = t[e++] | t[e++] << 8, j = t[e++], B = j >> 7, I = j >> 6 & 1, C = j & 7, S = 1 << C + 1, M = l, N = u, O = !1;
        if (B) {
          var O = !0;
          M = e, N = S, e += S * 3;
        }
        var Z = e;
        for (e++; ; ) {
          var v = t[e++];
          if (!(v >= 0)) throw Error("Invalid block size");
          if (v === 0) break;
          e += v;
        }
        s.push({
          x,
          y: m,
          width: A,
          height: w,
          has_local_palette: O,
          palette_offset: M,
          palette_size: N,
          data_offset: Z,
          data_length: e - Z,
          transparent_index: p,
          interlaced: !!I,
          delay: c,
          disposal: h
        });
        break;
      case 59:
        d = !1;
        break;
      default:
        throw new Error("Unknown gif block: 0x" + t[e - 1].toString(16));
    }
  this.numFrames = function() {
    return s.length;
  }, this.loopCount = function() {
    return g;
  }, this.frameInfo = function(U) {
    if (U < 0 || U >= s.length)
      throw new Error("Frame index out of range.");
    return s[U];
  }, this.decodeAndBlitFrameBGRA = function(U, E) {
    var _ = this.frameInfo(U), Y = _.width * _.height, z = new Uint8Array(Y);
    ve(
      t,
      _.data_offset,
      z,
      Y
    );
    var G = _.palette_offset, R = _.transparent_index;
    R === null && (R = 256);
    var D = _.width, q = r - D, L = D, J = (_.y * r + _.x) * 4, te = ((_.y + _.height) * r + _.x) * 4, b = J, $ = q * 4;
    _.interlaced === !0 && ($ += r * 4 * 7);
    for (var V = 8, W = 0, ne = z.length; W < ne; ++W) {
      var F = z[W];
      if (L === 0 && (b += $, L = D, b >= te && ($ = q * 4 + r * 4 * (V - 1), b = J + (D + q) * (V << 1), V >>= 1)), F === R)
        b += 4;
      else {
        var ae = t[G + F * 3], ie = t[G + F * 3 + 1], oe = t[G + F * 3 + 2];
        E[b++] = oe, E[b++] = ie, E[b++] = ae, E[b++] = 255;
      }
      --L;
    }
  }, this.decodeAndBlitFrameRGBA = function(U, E) {
    var _ = this.frameInfo(U), Y = _.width * _.height, z = new Uint8Array(Y);
    ve(
      t,
      _.data_offset,
      z,
      Y
    );
    var G = _.palette_offset, R = _.transparent_index;
    R === null && (R = 256);
    var D = _.width, q = r - D, L = D, J = (_.y * r + _.x) * 4, te = ((_.y + _.height) * r + _.x) * 4, b = J, $ = q * 4;
    _.interlaced === !0 && ($ += r * 4 * 7);
    for (var V = 8, W = 0, ne = z.length; W < ne; ++W) {
      var F = z[W];
      if (L === 0 && (b += $, L = D, b >= te && ($ = q * 4 + r * 4 * (V - 1), b = J + (D + q) * (V << 1), V >>= 1)), F === R)
        b += 4;
      else {
        var ae = t[G + F * 3], ie = t[G + F * 3 + 1], oe = t[G + F * 3 + 2];
        E[b++] = ae, E[b++] = ie, E[b++] = oe, E[b++] = 255;
      }
      --L;
    }
  };
}
function ve(t, e, r, a) {
  for (var n = t[e++], i = 1 << n, o = i + 1, f = o + 1, l = n + 1, u = (1 << l) - 1, d = 0, s = 0, c = 0, p = t[e++], h = new Int32Array(4096), g = null; ; ) {
    for (; d < 16 && p !== 0; )
      s |= t[e++] << d, d += 8, p === 1 ? p = t[e++] : --p;
    if (d < l)
      break;
    var v = s & u;
    if (s >>= l, d -= l, v === i) {
      f = o + 1, l = n + 1, u = (1 << l) - 1, g = null;
      continue;
    } else if (v === o)
      break;
    for (var y = v < f ? v : g, x = 0, m = y; m > i; )
      m = h[m] >> 8, ++x;
    var A = m, w = c + x + (y !== v ? 1 : 0);
    if (w > a) {
      console.log("Warning, gif stream longer than expected.");
      return;
    }
    r[c++] = A, c += x;
    var j = c;
    for (y !== v && (r[c++] = A), m = y; x--; )
      m = h[m], r[--j] = m & 255, m >>= 8;
    g !== null && f < 4096 && (h[f++] = g << 8 | A, f >= u + 1 && l < 12 && (++l, u = u << 1 | 1)), g = v;
  }
  return c !== a && console.log("Warning, gif stream shorter than expected."), r;
}
try {
  Ge = fe.GifWriter = Re, ze = fe.GifReader = Le;
} catch {
}
function $e(t, e) {
  for (var r = 1, a = t.length, n = t[0], i = t[0], o = 1; o < a; ++o)
    if (i = n, n = t[o], e(n, i)) {
      if (o === r) {
        r++;
        continue;
      }
      t[r++] = n;
    }
  return t.length = r, t;
}
function Ve(t) {
  for (var e = 1, r = t.length, a = t[0], n = t[0], i = 1; i < r; ++i, n = a)
    if (n = a, a = t[i], a !== n) {
      if (i === e) {
        e++;
        continue;
      }
      t[e++] = a;
    }
  return t.length = e, t;
}
function We(t, e, r) {
  return t.length === 0 ? t : e ? (r || t.sort(e), $e(t, e)) : (r || t.sort(), Ve(t));
}
var He = We, Ne = He;
function pe(t, e, r) {
  var a = t.length, n = e.arrayArgs.length, i = e.indexArgs.length > 0, o = [], f = [], l = 0, u = 0, d, s;
  for (d = 0; d < a; ++d)
    f.push(["i", d, "=0"].join(""));
  for (s = 0; s < n; ++s)
    for (d = 0; d < a; ++d)
      u = l, l = t[d], d === 0 ? f.push(["d", s, "s", d, "=t", s, "p", l].join("")) : f.push(["d", s, "s", d, "=(t", s, "p", l, "-s", u, "*t", s, "p", u, ")"].join(""));
  for (f.length > 0 && o.push("var " + f.join(",")), d = a - 1; d >= 0; --d)
    l = t[d], o.push(["for(i", d, "=0;i", d, "<s", l, ";++i", d, "){"].join(""));
  for (o.push(r), d = 0; d < a; ++d) {
    for (u = l, l = t[d], s = 0; s < n; ++s)
      o.push(["p", s, "+=d", s, "s", d].join(""));
    i && (d > 0 && o.push(["index[", u, "]-=s", u].join("")), o.push(["++index[", l, "]"].join(""))), o.push("}");
  }
  return o.join(`
`);
}
function Ze(t, e, r, a) {
  for (var n = e.length, i = r.arrayArgs.length, o = r.blockSize, f = r.indexArgs.length > 0, l = [], u = 0; u < i; ++u)
    l.push(["var offset", u, "=p", u].join(""));
  for (var u = t; u < n; ++u)
    l.push(["for(var j" + u + "=SS[", e[u], "]|0;j", u, ">0;){"].join("")), l.push(["if(j", u, "<", o, "){"].join("")), l.push(["s", e[u], "=j", u].join("")), l.push(["j", u, "=0"].join("")), l.push(["}else{s", e[u], "=", o].join("")), l.push(["j", u, "-=", o, "}"].join("")), f && l.push(["index[", e[u], "]=j", u].join(""));
  for (var u = 0; u < i; ++u) {
    for (var d = ["offset" + u], s = t; s < n; ++s)
      d.push(["j", s, "*t", u, "p", e[s]].join(""));
    l.push(["p", u, "=(", d.join("+"), ")"].join(""));
  }
  l.push(pe(e, r, a));
  for (var u = t; u < n; ++u)
    l.push("}");
  return l.join(`
`);
}
function Xe(t) {
  for (var e = 0, r = t[0].length; e < r; ) {
    for (var a = 1; a < t.length; ++a)
      if (t[a][e] !== t[0][e])
        return e;
    ++e;
  }
  return e;
}
function se(t, e, r) {
  for (var a = t.body, n = [], i = [], o = 0; o < t.args.length; ++o) {
    var f = t.args[o];
    if (!(f.count <= 0)) {
      var l = new RegExp(f.name, "g"), u = "", d = e.arrayArgs.indexOf(o);
      switch (e.argTypes[o]) {
        case "offset":
          var s = e.offsetArgIndex.indexOf(o), c = e.offsetArgs[s];
          d = c.array, u = "+q" + s;
        case "array":
          u = "p" + d + u;
          var p = "l" + o, h = "a" + d;
          if (e.arrayBlockIndices[d] === 0)
            f.count === 1 ? r[d] === "generic" ? f.lvalue ? (n.push(["var ", p, "=", h, ".get(", u, ")"].join("")), a = a.replace(l, p), i.push([h, ".set(", u, ",", p, ")"].join(""))) : a = a.replace(l, [h, ".get(", u, ")"].join("")) : a = a.replace(l, [h, "[", u, "]"].join("")) : r[d] === "generic" ? (n.push(["var ", p, "=", h, ".get(", u, ")"].join("")), a = a.replace(l, p), f.lvalue && i.push([h, ".set(", u, ",", p, ")"].join(""))) : (n.push(["var ", p, "=", h, "[", u, "]"].join("")), a = a.replace(l, p), f.lvalue && i.push([h, "[", u, "]=", p].join("")));
          else {
            for (var g = [f.name], v = [u], y = 0; y < Math.abs(e.arrayBlockIndices[d]); y++)
              g.push("\\s*\\[([^\\]]+)\\]"), v.push("$" + (y + 1) + "*t" + d + "b" + y);
            if (l = new RegExp(g.join(""), "g"), u = v.join("+"), r[d] === "generic")
              throw new Error("cwise: Generic arrays not supported in combination with blocks!");
            a = a.replace(l, [h, "[", u, "]"].join(""));
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
  return [n.join(`
`), a, i.join(`
`)].join(`
`).trim();
}
function Ye(t) {
  for (var e = new Array(t.length), r = !0, a = 0; a < t.length; ++a) {
    var n = t[a], i = n.match(/\d+/);
    i ? i = i[0] : i = "", n.charAt(0) === 0 ? e[a] = "u" + n.charAt(1) + i : e[a] = n.charAt(0) + i, a > 0 && (r = r && e[a] === e[a - 1]);
  }
  return r ? e[0] : e.join("");
}
function Je(t, e) {
  for (var r = e[1].length - Math.abs(t.arrayBlockIndices[0]) | 0, a = new Array(t.arrayArgs.length), n = new Array(t.arrayArgs.length), i = 0; i < t.arrayArgs.length; ++i)
    n[i] = e[2 * i], a[i] = e[2 * i + 1];
  for (var o = [], f = [], l = [], u = [], d = [], i = 0; i < t.arrayArgs.length; ++i) {
    t.arrayBlockIndices[i] < 0 ? (l.push(0), u.push(r), o.push(r), f.push(r + t.arrayBlockIndices[i])) : (l.push(t.arrayBlockIndices[i]), u.push(t.arrayBlockIndices[i] + r), o.push(0), f.push(t.arrayBlockIndices[i]));
    for (var s = [], c = 0; c < a[i].length; c++)
      l[i] <= a[i][c] && a[i][c] < u[i] && s.push(a[i][c] - l[i]);
    d.push(s);
  }
  for (var p = ["SS"], h = ["'use strict'"], g = [], c = 0; c < r; ++c)
    g.push(["s", c, "=SS[", c, "]"].join(""));
  for (var i = 0; i < t.arrayArgs.length; ++i) {
    p.push("a" + i), p.push("t" + i), p.push("p" + i);
    for (var c = 0; c < r; ++c)
      g.push(["t", i, "p", c, "=t", i, "[", l[i] + c, "]"].join(""));
    for (var c = 0; c < Math.abs(t.arrayBlockIndices[i]); ++c)
      g.push(["t", i, "b", c, "=t", i, "[", o[i] + c, "]"].join(""));
  }
  for (var i = 0; i < t.scalarArgs.length; ++i)
    p.push("Y" + i);
  if (t.shapeArgs.length > 0 && g.push("shape=SS.slice(0)"), t.indexArgs.length > 0) {
    for (var v = new Array(r), i = 0; i < r; ++i)
      v[i] = "0";
    g.push(["index=[", v.join(","), "]"].join(""));
  }
  for (var i = 0; i < t.offsetArgs.length; ++i) {
    for (var y = t.offsetArgs[i], x = [], c = 0; c < y.offset.length; ++c)
      y.offset[c] !== 0 && (y.offset[c] === 1 ? x.push(["t", y.array, "p", c].join("")) : x.push([y.offset[c], "*t", y.array, "p", c].join("")));
    x.length === 0 ? g.push("q" + i + "=0") : g.push(["q", i, "=", x.join("+")].join(""));
  }
  var m = Ne([].concat(t.pre.thisVars).concat(t.body.thisVars).concat(t.post.thisVars));
  g = g.concat(m), g.length > 0 && h.push("var " + g.join(","));
  for (var i = 0; i < t.arrayArgs.length; ++i)
    h.push("p" + i + "|=0");
  t.pre.body.length > 3 && h.push(se(t.pre, t, n));
  var A = se(t.body, t, n), w = Xe(d);
  w < r ? h.push(Ze(w, d[0], t, A)) : h.push(pe(d[0], t, A)), t.post.body.length > 3 && h.push(se(t.post, t, n)), t.debug && console.log("-----Generated cwise routine for ", e, `:
` + h.join(`
`) + `
----------`);
  var j = [t.funcName || "unnamed", "_cwise_loop_", a[0].join("s"), "m", w, Ye(n)].join(""), B = new Function(["function ", j, "(", p.join(","), "){", h.join(`
`), "} return ", j].join(""));
  return B();
}
var Ke = Je, Qe = Ke;
function er(t) {
  var e = ["'use strict'", "var CACHED={}"], r = [], a = t.funcName + "_cwise_thunk";
  e.push(["return function ", a, "(", t.shimArgs.join(","), "){"].join(""));
  for (var n = [], i = [], o = [[
    "array",
    t.arrayArgs[0],
    ".shape.slice(",
    // Slice shape so that we only retain the shape over which we iterate (which gets passed to the cwise operator as SS).
    Math.max(0, t.arrayBlockIndices[0]),
    t.arrayBlockIndices[0] < 0 ? "," + t.arrayBlockIndices[0] + ")" : ")"
  ].join("")], f = [], l = [], u = 0; u < t.arrayArgs.length; ++u) {
    var d = t.arrayArgs[u];
    r.push([
      "t",
      d,
      "=array",
      d,
      ".dtype,",
      "r",
      d,
      "=array",
      d,
      ".order"
    ].join("")), n.push("t" + d), n.push("r" + d), i.push("t" + d), i.push("r" + d + ".join()"), o.push("array" + d + ".data"), o.push("array" + d + ".stride"), o.push("array" + d + ".offset|0"), u > 0 && (f.push("array" + t.arrayArgs[0] + ".shape.length===array" + d + ".shape.length+" + (Math.abs(t.arrayBlockIndices[0]) - Math.abs(t.arrayBlockIndices[u]))), l.push("array" + t.arrayArgs[0] + ".shape[shapeIndex+" + Math.max(0, t.arrayBlockIndices[0]) + "]===array" + d + ".shape[shapeIndex+" + Math.max(0, t.arrayBlockIndices[u]) + "]"));
  }
  t.arrayArgs.length > 1 && (e.push("if (!(" + f.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same dimensionality!')"), e.push("for(var shapeIndex=array" + t.arrayArgs[0] + ".shape.length-" + Math.abs(t.arrayBlockIndices[0]) + "; shapeIndex-->0;) {"), e.push("if (!(" + l.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same shape!')"), e.push("}"));
  for (var u = 0; u < t.scalarArgs.length; ++u)
    o.push("scalar" + t.scalarArgs[u]);
  r.push(["type=[", i.join(","), "].join()"].join("")), r.push("proc=CACHED[type]"), e.push("var " + r.join(",")), e.push([
    "if(!proc){",
    "CACHED[type]=proc=compile([",
    n.join(","),
    "])}",
    "return proc(",
    o.join(","),
    ")}"
  ].join("")), t.debug && console.log(`-----Generated thunk:
` + e.join(`
`) + `
----------`);
  var s = new Function("compile", e.join(`
`));
  return s(Qe.bind(void 0, t));
}
var rr = er, tr = rr;
function nr() {
  this.argTypes = [], this.shimArgs = [], this.arrayArgs = [], this.arrayBlockIndices = [], this.scalarArgs = [], this.offsetArgs = [], this.offsetArgIndex = [], this.indexArgs = [], this.shapeArgs = [], this.funcName = "", this.pre = null, this.body = null, this.post = null, this.debug = !1;
}
function ar(t) {
  var e = new nr();
  e.pre = t.pre, e.body = t.body, e.post = t.post;
  var r = t.args.slice(0);
  e.argTypes = r;
  for (var a = 0; a < r.length; ++a) {
    var n = r[a];
    if (n === "array" || typeof n == "object" && n.blockIndices) {
      if (e.argTypes[a] = "array", e.arrayArgs.push(a), e.arrayBlockIndices.push(n.blockIndices ? n.blockIndices : 0), e.shimArgs.push("array" + a), a < e.pre.args.length && e.pre.args[a].count > 0)
        throw new Error("cwise: pre() block may not reference array args");
      if (a < e.post.args.length && e.post.args[a].count > 0)
        throw new Error("cwise: post() block may not reference array args");
    } else if (n === "scalar")
      e.scalarArgs.push(a), e.shimArgs.push("scalar" + a);
    else if (n === "index") {
      if (e.indexArgs.push(a), a < e.pre.args.length && e.pre.args[a].count > 0)
        throw new Error("cwise: pre() block may not reference array index");
      if (a < e.body.args.length && e.body.args[a].lvalue)
        throw new Error("cwise: body() block may not write to array index");
      if (a < e.post.args.length && e.post.args[a].count > 0)
        throw new Error("cwise: post() block may not reference array index");
    } else if (n === "shape") {
      if (e.shapeArgs.push(a), a < e.pre.args.length && e.pre.args[a].lvalue)
        throw new Error("cwise: pre() block may not write to array shape");
      if (a < e.body.args.length && e.body.args[a].lvalue)
        throw new Error("cwise: body() block may not write to array shape");
      if (a < e.post.args.length && e.post.args[a].lvalue)
        throw new Error("cwise: post() block may not write to array shape");
    } else if (typeof n == "object" && n.offset)
      e.argTypes[a] = "offset", e.offsetArgs.push({ array: n.array, offset: n.offset }), e.offsetArgIndex.push(a);
    else
      throw new Error("cwise: Unknown argument type " + r[a]);
  }
  if (e.arrayArgs.length <= 0)
    throw new Error("cwise: No array arguments specified");
  if (e.pre.args.length > r.length)
    throw new Error("cwise: Too many arguments in pre() block");
  if (e.body.args.length > r.length)
    throw new Error("cwise: Too many arguments in body() block");
  if (e.post.args.length > r.length)
    throw new Error("cwise: Too many arguments in post() block");
  return e.debug = !!t.printCode || !!t.debug, e.funcName = t.funcName || "cwise", e.blockSize = t.blockSize || 64, tr(e);
}
var ir = ar;
ir({ args: ["array", "scalar", "index"], pre: { body: "{}", args: [], thisVars: [], localVars: [] }, body: { body: `{
var _inline_1_v=_inline_1_arg1_,_inline_1_i
for(_inline_1_i=0;_inline_1_i<_inline_1_arg2_.length-1;++_inline_1_i) {
_inline_1_v=_inline_1_v[_inline_1_arg2_[_inline_1_i]]
}
_inline_1_arg0_=_inline_1_v[_inline_1_arg2_[_inline_1_arg2_.length-1]]
}`, args: [{ name: "_inline_1_arg0_", lvalue: !0, rvalue: !1, count: 1 }, { name: "_inline_1_arg1_", lvalue: !1, rvalue: !0, count: 1 }, { name: "_inline_1_arg2_", lvalue: !1, rvalue: !0, count: 4 }], thisVars: [], localVars: ["_inline_1_i", "_inline_1_v"] }, post: { body: "{}", args: [], thisVars: [], localVars: [] }, funcName: "convert", blockSize: 64 });
var or = { exports: {} };
const sr = {}, fr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sr
}, Symbol.toStringTag, { value: "Module" })), lr = /* @__PURE__ */ Ae(fr);
(function(t, e) {
  var r = lr;
  t.exports = a, a.through = a;
  function a(n, i, o) {
    n = n || function(h) {
      this.queue(h);
    }, i = i || function() {
      this.queue(null);
    };
    var f = !1, l = !1, u = [], d = !1, s = new r();
    s.readable = s.writable = !0, s.paused = !1, s.autoDestroy = !(o && o.autoDestroy === !1), s.write = function(h) {
      return n.call(this, h), !s.paused;
    };
    function c() {
      for (; u.length && !s.paused; ) {
        var h = u.shift();
        if (h === null)
          return s.emit("end");
        s.emit("data", h);
      }
    }
    s.queue = s.push = function(h) {
      return d || (h === null && (d = !0), u.push(h), c()), s;
    }, s.on("end", function() {
      s.readable = !1, !s.writable && s.autoDestroy && process.nextTick(function() {
        s.destroy();
      });
    });
    function p() {
      s.writable = !1, i.call(s), !s.readable && s.autoDestroy && s.destroy();
    }
    return s.end = function(h) {
      if (!f)
        return f = !0, arguments.length && s.write(h), p(), s;
    }, s.destroy = function() {
      if (!l)
        return l = !0, f = !0, u.length = 0, s.writable = s.readable = !1, s.emit("close"), s;
    }, s.pause = function() {
      if (!s.paused)
        return s.paused = !0, s;
    }, s.resume = function() {
      return s.paused && (s.paused = !1, s.emit("resume")), c(), s.paused || s.emit("drain"), s;
    }, s;
  }
})(or);
var ur = cr;
function cr(t) {
  if (!/^data\:/i.test(t))
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  t = t.replace(/\r?\n/g, "");
  var e = t.indexOf(",");
  if (e === -1 || e <= 4) throw new TypeError("malformed data: URI");
  for (var r = t.substring(5, e).split(";"), a = !1, n = "US-ASCII", i = 0; i < r.length; i++)
    r[i] == "base64" ? a = !0 : r[i].indexOf("charset=") == 0 && (n = r[i].substring(8));
  var o = unescape(t.substring(e + 1)), f = a ? "base64" : "ascii", l = new Buffer(o, f);
  return l.type = r[0] || "text/plain", l.charset = n, l;
}
var dr = Be, le = Oe, vr = fe.GifReader, hr = ur;
function pr(t, e) {
  var r = new Image();
  r.crossOrigin = "Anonymous", r.onload = function() {
    var a = document.createElement("canvas");
    a.width = r.width, a.height = r.height;
    var n = a.getContext("2d");
    n.drawImage(r, 0, 0);
    var i = n.getImageData(0, 0, r.width, r.height);
    e(null, le(new Uint8Array(i.data), [r.width, r.height, 4], [4, 4 * r.width, 1], 0));
  }, r.onerror = function(a) {
    e(a);
  }, r.src = t;
}
function ge(t, e) {
  var r;
  try {
    r = new vr(t);
  } catch (f) {
    e(f);
    return;
  }
  if (r.numFrames() > 0) {
    var a = [r.numFrames(), r.height, r.width, 4], n = new Uint8Array(a[0] * a[1] * a[2] * a[3]), i = le(n, a);
    try {
      for (var o = 0; o < r.numFrames(); ++o)
        r.decodeAndBlitFrameRGBA(o, n.subarray(
          i.index(o, 0, 0, 0),
          i.index(o + 1, 0, 0, 0)
        ));
    } catch (f) {
      e(f);
      return;
    }
    e(null, i.transpose(0, 2, 1));
  } else {
    var a = [r.height, r.width, 4], n = new Uint8Array(a[0] * a[1] * a[2]), i = le(n, a);
    try {
      r.decodeAndBlitFrameRGBA(0, n);
    } catch (d) {
      e(d);
      return;
    }
    e(null, i.transpose(1, 0));
  }
}
function gr(t, e) {
  var r = new XMLHttpRequest();
  r.open("GET", t, !0), r.responseType = "arraybuffer", r.overrideMimeType && r.overrideMimeType("application/binary"), r.onerror = function(a) {
    e(a);
  }, r.onload = function() {
    if (r.readyState === 4) {
      var a = new Uint8Array(r.response);
      ge(a, e);
    }
  }, r.send();
}
function yr(t) {
  if (t[0] === void 0) {
    for (var e = t.length, r = new Uint8Array(e), a = 0; a < e; ++a)
      r[a] = t.get(a);
    return r;
  } else
    return new Uint8Array(t);
}
function mr(t, e) {
  process.nextTick(function() {
    try {
      var r = hr(t);
      r ? ge(yr(r), e) : e(new Error("Error parsing data URI"));
    } catch (a) {
      e(a);
    }
  });
}
var wr = function(e, r, a) {
  a || (a = r, r = "");
  var n = dr.extname(e);
  switch (r || n.toUpperCase()) {
    case ".GIF":
      gr(e, a);
      break;
    default:
      Buffer.isBuffer(e) && (e = "data:" + r + ";base64," + e.toString("base64")), e.indexOf("data:image/gif;") === 0 ? mr(e, a) : pr(e, a);
  }
};
const xr = /* @__PURE__ */ _e(wr);
var H = {}, ye = {}, P = {};
Object.defineProperty(P, "__esModule", {
  value: !0
});
P.loop = P.conditional = P.parse = void 0;
var _r = function t(e, r) {
  var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : a;
  if (Array.isArray(r))
    r.forEach(function(o) {
      return t(e, o, a, n);
    });
  else if (typeof r == "function")
    r(e, a, n, t);
  else {
    var i = Object.keys(r)[0];
    Array.isArray(r[i]) ? (n[i] = {}, t(e, r[i], a, n[i])) : n[i] = r[i](e, a, n, t);
  }
  return a;
};
P.parse = _r;
var Ar = function(e, r) {
  return function(a, n, i, o) {
    r(a, n, i) && o(a, e, n, i);
  };
};
P.conditional = Ar;
var kr = function(e, r) {
  return function(a, n, i, o) {
    for (var f = [], l = a.pos; r(a, n, i); ) {
      var u = {};
      if (o(a, e, n, u), a.pos === l)
        break;
      l = a.pos, f.push(u);
    }
    return f;
  };
};
P.loop = kr;
var k = {};
Object.defineProperty(k, "__esModule", {
  value: !0
});
k.readBits = k.readArray = k.readUnsigned = k.readString = k.peekBytes = k.readBytes = k.peekByte = k.readByte = k.buildStream = void 0;
var Br = function(e) {
  return {
    data: e,
    pos: 0
  };
};
k.buildStream = Br;
var me = function() {
  return function(e) {
    return e.data[e.pos++];
  };
};
k.readByte = me;
var jr = function() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
  return function(r) {
    return r.data[r.pos + e];
  };
};
k.peekByte = jr;
var Q = function(e) {
  return function(r) {
    return r.data.subarray(r.pos, r.pos += e);
  };
};
k.readBytes = Q;
var br = function(e) {
  return function(r) {
    return r.data.subarray(r.pos, r.pos + e);
  };
};
k.peekBytes = br;
var Ir = function(e) {
  return function(r) {
    return Array.from(Q(e)(r)).map(function(a) {
      return String.fromCharCode(a);
    }).join("");
  };
};
k.readString = Ir;
var Er = function(e) {
  return function(r) {
    var a = Q(2)(r);
    return e ? (a[1] << 8) + a[0] : (a[0] << 8) + a[1];
  };
};
k.readUnsigned = Er;
var Cr = function(e, r) {
  return function(a, n, i) {
    for (var o = typeof r == "function" ? r(a, n, i) : r, f = Q(e), l = new Array(o), u = 0; u < o; u++)
      l[u] = f(a);
    return l;
  };
};
k.readArray = Cr;
var Sr = function(e, r, a) {
  for (var n = 0, i = 0; i < a; i++)
    n += e[r + i] && Math.pow(2, a - i - 1);
  return n;
}, Tr = function(e) {
  return function(r) {
    for (var a = me()(r), n = new Array(8), i = 0; i < 8; i++)
      n[7 - i] = !!(a & 1 << i);
    return Object.keys(e).reduce(function(o, f) {
      var l = e[f];
      return l.length ? o[f] = Sr(n, l.index, l.length) : o[f] = n[l.index], o;
    }, {});
  };
};
k.readBits = Tr;
(function(t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0;
  var e = P, r = k, a = {
    blocks: function(c) {
      for (var p = 0, h = [], g = c.data.length, v = 0, y = (0, r.readByte)()(c); y !== p && y; y = (0, r.readByte)()(c)) {
        if (c.pos + y >= g) {
          var x = g - c.pos;
          h.push((0, r.readBytes)(x)(c)), v += x;
          break;
        }
        h.push((0, r.readBytes)(y)(c)), v += y;
      }
      for (var m = new Uint8Array(v), A = 0, w = 0; w < h.length; w++)
        m.set(h[w], A), A += h[w].length;
      return m;
    }
  }, n = (0, e.conditional)({
    gce: [{
      codes: (0, r.readBytes)(2)
    }, {
      byteSize: (0, r.readByte)()
    }, {
      extras: (0, r.readBits)({
        future: {
          index: 0,
          length: 3
        },
        disposal: {
          index: 3,
          length: 3
        },
        userInput: {
          index: 6
        },
        transparentColorGiven: {
          index: 7
        }
      })
    }, {
      delay: (0, r.readUnsigned)(!0)
    }, {
      transparentColorIndex: (0, r.readByte)()
    }, {
      terminator: (0, r.readByte)()
    }]
  }, function(s) {
    var c = (0, r.peekBytes)(2)(s);
    return c[0] === 33 && c[1] === 249;
  }), i = (0, e.conditional)({
    image: [{
      code: (0, r.readByte)()
    }, {
      descriptor: [{
        left: (0, r.readUnsigned)(!0)
      }, {
        top: (0, r.readUnsigned)(!0)
      }, {
        width: (0, r.readUnsigned)(!0)
      }, {
        height: (0, r.readUnsigned)(!0)
      }, {
        lct: (0, r.readBits)({
          exists: {
            index: 0
          },
          interlaced: {
            index: 1
          },
          sort: {
            index: 2
          },
          future: {
            index: 3,
            length: 2
          },
          size: {
            index: 5,
            length: 3
          }
        })
      }]
    }, (0, e.conditional)({
      lct: (0, r.readArray)(3, function(s, c, p) {
        return Math.pow(2, p.descriptor.lct.size + 1);
      })
    }, function(s, c, p) {
      return p.descriptor.lct.exists;
    }), {
      data: [{
        minCodeSize: (0, r.readByte)()
      }, a]
    }]
  }, function(s) {
    return (0, r.peekByte)()(s) === 44;
  }), o = (0, e.conditional)({
    text: [{
      codes: (0, r.readBytes)(2)
    }, {
      blockSize: (0, r.readByte)()
    }, {
      preData: function(c, p, h) {
        return (0, r.readBytes)(h.text.blockSize)(c);
      }
    }, a]
  }, function(s) {
    var c = (0, r.peekBytes)(2)(s);
    return c[0] === 33 && c[1] === 1;
  }), f = (0, e.conditional)({
    application: [{
      codes: (0, r.readBytes)(2)
    }, {
      blockSize: (0, r.readByte)()
    }, {
      id: function(c, p, h) {
        return (0, r.readString)(h.blockSize)(c);
      }
    }, a]
  }, function(s) {
    var c = (0, r.peekBytes)(2)(s);
    return c[0] === 33 && c[1] === 255;
  }), l = (0, e.conditional)({
    comment: [{
      codes: (0, r.readBytes)(2)
    }, a]
  }, function(s) {
    var c = (0, r.peekBytes)(2)(s);
    return c[0] === 33 && c[1] === 254;
  }), u = [
    {
      header: [{
        signature: (0, r.readString)(3)
      }, {
        version: (0, r.readString)(3)
      }]
    },
    {
      lsd: [{
        width: (0, r.readUnsigned)(!0)
      }, {
        height: (0, r.readUnsigned)(!0)
      }, {
        gct: (0, r.readBits)({
          exists: {
            index: 0
          },
          resolution: {
            index: 1,
            length: 3
          },
          sort: {
            index: 4
          },
          size: {
            index: 5,
            length: 3
          }
        })
      }, {
        backgroundColorIndex: (0, r.readByte)()
      }, {
        pixelAspectRatio: (0, r.readByte)()
      }]
    },
    (0, e.conditional)({
      gct: (0, r.readArray)(3, function(s, c) {
        return Math.pow(2, c.lsd.gct.size + 1);
      })
    }, function(s, c) {
      return c.lsd.gct.exists;
    }),
    // content frames
    {
      frames: (0, e.loop)([n, f, l, i, o], function(s) {
        var c = (0, r.peekByte)()(s);
        return c === 33 || c === 44;
      })
    }
  ], d = u;
  t.default = d;
})(ye);
var ee = {};
Object.defineProperty(ee, "__esModule", {
  value: !0
});
ee.deinterlace = void 0;
var Ur = function(e, r) {
  for (var a = new Array(e.length), n = e.length / r, i = function(c, p) {
    var h = e.slice(p * r, (p + 1) * r);
    a.splice.apply(a, [c * r, r].concat(h));
  }, o = [0, 4, 2, 1], f = [8, 8, 4, 2], l = 0, u = 0; u < 4; u++)
    for (var d = o[u]; d < n; d += f[u])
      i(d, l), l++;
  return a;
};
ee.deinterlace = Ur;
var re = {};
Object.defineProperty(re, "__esModule", {
  value: !0
});
re.lzw = void 0;
var Dr = function(e, r, a) {
  var n = 4096, i = -1, o = a, f, l, u, d, s, c, p, j, h, g, w, v, B, I, S, C, y = new Array(a), x = new Array(n), m = new Array(n), A = new Array(n + 1);
  for (v = e, l = 1 << v, s = l + 1, f = l + 2, p = i, d = v + 1, u = (1 << d) - 1, h = 0; h < l; h++)
    x[h] = 0, m[h] = h;
  var w, j, B, I, C, S;
  for (w = j = B = I = C = S = 0, g = 0; g < o; ) {
    if (I === 0) {
      if (j < d) {
        w += r[S] << j, j += 8, S++;
        continue;
      }
      if (h = w & u, w >>= d, j -= d, h > f || h == s)
        break;
      if (h == l) {
        d = v + 1, u = (1 << d) - 1, f = l + 2, p = i;
        continue;
      }
      if (p == i) {
        A[I++] = m[h], p = h, B = h;
        continue;
      }
      for (c = h, h == f && (A[I++] = B, h = p); h > l; )
        A[I++] = m[h], h = x[h];
      B = m[h] & 255, A[I++] = B, f < n && (x[f] = p, m[f] = B, f++, !(f & u) && f < n && (d++, u += f)), p = c;
    }
    I--, y[C++] = A[I], g++;
  }
  for (g = C; g < o; g++)
    y[g] = 0;
  return y;
};
re.lzw = Dr;
Object.defineProperty(H, "__esModule", {
  value: !0
});
var ue = H.decompressFrames = H.decompressFrame = ce = H.parseGIF = void 0, Fr = Gr(ye), Pr = P, Mr = k, Or = ee, zr = re;
function Gr(t) {
  return t && t.__esModule ? t : { default: t };
}
var Rr = function(e) {
  var r = new Uint8Array(e);
  return (0, Pr.parse)((0, Mr.buildStream)(r), Fr.default);
}, ce = H.parseGIF = Rr, qr = function(e) {
  for (var r = e.pixels.length, a = new Uint8ClampedArray(r * 4), n = 0; n < r; n++) {
    var i = n * 4, o = e.pixels[n], f = e.colorTable[o] || [0, 0, 0];
    a[i] = f[0], a[i + 1] = f[1], a[i + 2] = f[2], a[i + 3] = o !== e.transparentIndex ? 255 : 0;
  }
  return a;
}, we = function(e, r, a) {
  if (!e.image) {
    console.warn("gif frame does not have associated image.");
    return;
  }
  var n = e.image, i = n.descriptor.width * n.descriptor.height, o = (0, zr.lzw)(n.data.minCodeSize, n.data.blocks, i);
  n.descriptor.lct.interlaced && (o = (0, Or.deinterlace)(o, n.descriptor.width));
  var f = {
    pixels: o,
    dims: {
      top: e.image.descriptor.top,
      left: e.image.descriptor.left,
      width: e.image.descriptor.width,
      height: e.image.descriptor.height
    }
  };
  return n.descriptor.lct && n.descriptor.lct.exists ? f.colorTable = n.lct : f.colorTable = r, e.gce && (f.delay = (e.gce.delay || 10) * 10, f.disposalType = e.gce.extras.disposal, e.gce.extras.transparentColorGiven && (f.transparentIndex = e.gce.transparentColorIndex)), a && (f.patch = qr(f)), f;
};
H.decompressFrame = we;
var Lr = function(e, r) {
  return e.frames.filter(function(a) {
    return a.image;
  }).map(function(a) {
    return we(a, e.gct, r);
  });
};
ue = H.decompressFrames = Lr;
const Nr = async (t) => {
  const r = await (await fetch(t)).arrayBuffer(), a = ce(r), n = ue(a, !0), i = await Vr(t, !n[0].transparentIndex);
  return i.animated && (i.delayArray = n.map((o) => o.delay)), i;
}, Zr = async (t) => {
  const r = await (await fetch(t)).arrayBuffer(), a = ce(r), n = ue(a, !0);
  console.log(n);
  const i = await $r(t, n[0].disposalType !== 2);
  return i.animated && (i.delayArray = n.map((o) => o.delay)), i;
}, $r = (t, e = !0) => new Promise((r, a) => {
  xe(t, e).then((n) => {
    r(Hr(n.ndArrayArray, n.width, n.height));
  }).catch((n) => a(n));
}), Vr = (t, e = !0) => new Promise((r, a) => {
  xe(t, e).then((n) => {
    r(Wr(n.ndArrayArray, n.width, n.height));
  }).catch((n) => a(n));
}), xe = (t, e = !0) => new Promise((r, a) => {
  xr(t, (n, i) => {
    if (n)
      a(n);
    else {
      const o = [], { shape: f } = i, [l, u, d, s] = f, c = u * d;
      for (let p = 0; p < l; ++p) {
        if (p > 0 && e) {
          const h = i.index(p, 0, 0, 0), g = i.index(p - 1, 0, 0, 0);
          for (let v = 0; v < c; ++v) {
            const y = h + v * s;
            if (i.data[y + s - 1] === 0) {
              const x = g + v * s;
              for (let m = 0; m < s; ++m)
                i.data[y + m] = i.data[x + m];
            }
          }
        }
        o.push(i.pick(p));
      }
      r({ ndArrayArray: o, width: u, height: d });
    }
  });
}), Wr = (t, e, r) => {
  const a = document.createElement("canvas"), n = a.getContext("2d");
  return a.width = e * t.length, a.height = r, t.forEach((i, o) => {
    const f = n.createImageData(e, r);
    f.data.set(i.data.slice(e * r * 4 * o, e * r * 4 * (o + 1))), n.putImageData(f, e * o, 0);
  }), {
    animated: t.length > 1,
    width: e,
    height: r,
    spriteData: a.toDataURL()
  };
}, Hr = (t, e, r) => {
  const a = document.createElement("canvas"), n = a.getContext("2d");
  a.width = e, a.height = r;
  const i = [];
  return t.forEach((o, f) => {
    const l = n.createImageData(e, r);
    l.data.set(o.data.slice(e * r * 4 * f, e * r * 4 * (f + 1))), n.putImageData(l, 0, 0), i.push(a.toDataURL());
  }), {
    animated: t.length > 1,
    width: e,
    height: r,
    imgArray: i
  };
};
export {
  Zr as gif2ImgArray,
  Nr as gif2Sprite
};
