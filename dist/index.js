function xe(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
function _e(n) {
  if (n.__esModule) return n;
  var e = n.default;
  if (typeof e == "function") {
    var r = function a() {
      return this instanceof a ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    r.prototype = e.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(n).forEach(function(a) {
    var t = Object.getOwnPropertyDescriptor(n, a);
    Object.defineProperty(r, a, t.get ? t : {
      enumerable: !0,
      get: function() {
        return n[a];
      }
    });
  }), r;
}
function T(n) {
  if (typeof n != "string")
    throw new TypeError("Path must be a string. Received " + JSON.stringify(n));
}
function ue(n, e) {
  for (var r = "", a = 0, t = -1, i = 0, o, f = 0; f <= n.length; ++f) {
    if (f < n.length)
      o = n.charCodeAt(f);
    else {
      if (o === 47)
        break;
      o = 47;
    }
    if (o === 47) {
      if (!(t === f - 1 || i === 1)) if (t !== f - 1 && i === 2) {
        if (r.length < 2 || a !== 2 || r.charCodeAt(r.length - 1) !== 46 || r.charCodeAt(r.length - 2) !== 46) {
          if (r.length > 2) {
            var u = r.lastIndexOf("/");
            if (u !== r.length - 1) {
              u === -1 ? (r = "", a = 0) : (r = r.slice(0, u), a = r.length - 1 - r.lastIndexOf("/")), t = f, i = 0;
              continue;
            }
          } else if (r.length === 2 || r.length === 1) {
            r = "", a = 0, t = f, i = 0;
            continue;
          }
        }
        e && (r.length > 0 ? r += "/.." : r = "..", a = 2);
      } else
        r.length > 0 ? r += "/" + n.slice(t + 1, f) : r = n.slice(t + 1, f), a = f - t - 1;
      t = f, i = 0;
    } else o === 46 && i !== -1 ? ++i : i = -1;
  }
  return r;
}
function Ae(n, e) {
  var r = e.dir || e.root, a = e.base || (e.name || "") + (e.ext || "");
  return r ? r === e.root ? r + a : r + n + a : a;
}
var X = {
  // path.resolve([from ...], to)
  resolve: function() {
    for (var e = "", r = !1, a, t = arguments.length - 1; t >= -1 && !r; t--) {
      var i;
      t >= 0 ? i = arguments[t] : (a === void 0 && (a = process.cwd()), i = a), T(i), i.length !== 0 && (e = i + "/" + e, r = i.charCodeAt(0) === 47);
    }
    return e = ue(e, !r), r ? e.length > 0 ? "/" + e : "/" : e.length > 0 ? e : ".";
  },
  normalize: function(e) {
    if (T(e), e.length === 0) return ".";
    var r = e.charCodeAt(0) === 47, a = e.charCodeAt(e.length - 1) === 47;
    return e = ue(e, !r), e.length === 0 && !r && (e = "."), e.length > 0 && a && (e += "/"), r ? "/" + e : e;
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
    for (var t = e.length, i = t - a, o = 1; o < r.length && r.charCodeAt(o) === 47; ++o)
      ;
    for (var f = r.length, u = f - o, c = i < u ? i : u, d = -1, s = 0; s <= c; ++s) {
      if (s === c) {
        if (u > c) {
          if (r.charCodeAt(o + s) === 47)
            return r.slice(o + s + 1);
          if (s === 0)
            return r.slice(o + s);
        } else i > c && (e.charCodeAt(a + s) === 47 ? d = s : s === 0 && (d = 0));
        break;
      }
      var l = e.charCodeAt(a + s), p = r.charCodeAt(o + s);
      if (l !== p)
        break;
      l === 47 && (d = s);
    }
    var h = "";
    for (s = a + d + 1; s <= t; ++s)
      (s === t || e.charCodeAt(s) === 47) && (h.length === 0 ? h += ".." : h += "/..");
    return h.length > 0 ? h + r.slice(o + d) : (o += d, r.charCodeAt(o) === 47 && ++o, r.slice(o));
  },
  _makeLong: function(e) {
    return e;
  },
  dirname: function(e) {
    if (T(e), e.length === 0) return ".";
    for (var r = e.charCodeAt(0), a = r === 47, t = -1, i = !0, o = e.length - 1; o >= 1; --o)
      if (r = e.charCodeAt(o), r === 47) {
        if (!i) {
          t = o;
          break;
        }
      } else
        i = !1;
    return t === -1 ? a ? "/" : "." : a && t === 1 ? "//" : e.slice(0, t);
  },
  basename: function(e, r) {
    if (r !== void 0 && typeof r != "string") throw new TypeError('"ext" argument must be a string');
    T(e);
    var a = 0, t = -1, i = !0, o;
    if (r !== void 0 && r.length > 0 && r.length <= e.length) {
      if (r.length === e.length && r === e) return "";
      var f = r.length - 1, u = -1;
      for (o = e.length - 1; o >= 0; --o) {
        var c = e.charCodeAt(o);
        if (c === 47) {
          if (!i) {
            a = o + 1;
            break;
          }
        } else
          u === -1 && (i = !1, u = o + 1), f >= 0 && (c === r.charCodeAt(f) ? --f === -1 && (t = o) : (f = -1, t = u));
      }
      return a === t ? t = u : t === -1 && (t = e.length), e.slice(a, t);
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
    T(e);
    for (var r = -1, a = 0, t = -1, i = !0, o = 0, f = e.length - 1; f >= 0; --f) {
      var u = e.charCodeAt(f);
      if (u === 47) {
        if (!i) {
          a = f + 1;
          break;
        }
        continue;
      }
      t === -1 && (i = !1, t = f + 1), u === 46 ? r === -1 ? r = f : o !== 1 && (o = 1) : r !== -1 && (o = -1);
    }
    return r === -1 || t === -1 || // We saw a non-dot character immediately before the dot
    o === 0 || // The (right-most) trimmed path component is exactly '..'
    o === 1 && r === t - 1 && r === a + 1 ? "" : e.slice(r, t);
  },
  format: function(e) {
    if (e === null || typeof e != "object")
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e);
    return Ae("/", e);
  },
  parse: function(e) {
    T(e);
    var r = { root: "", dir: "", base: "", ext: "", name: "" };
    if (e.length === 0) return r;
    var a = e.charCodeAt(0), t = a === 47, i;
    t ? (r.root = "/", i = 1) : i = 0;
    for (var o = -1, f = 0, u = -1, c = !0, d = e.length - 1, s = 0; d >= i; --d) {
      if (a = e.charCodeAt(d), a === 47) {
        if (!c) {
          f = d + 1;
          break;
        }
        continue;
      }
      u === -1 && (c = !1, u = d + 1), a === 46 ? o === -1 ? o = d : s !== 1 && (s = 1) : o !== -1 && (s = -1);
    }
    return o === -1 || u === -1 || // We saw a non-dot character immediately before the dot
    s === 0 || // The (right-most) trimmed path component is exactly '..'
    s === 1 && o === u - 1 && o === f + 1 ? u !== -1 && (f === 0 && t ? r.base = r.name = e.slice(1, u) : r.base = r.name = e.slice(f, u)) : (f === 0 && t ? (r.name = e.slice(1, o), r.base = e.slice(1, u)) : (r.name = e.slice(f, o), r.base = e.slice(f, u)), r.ext = e.slice(o, u)), f > 0 ? r.dir = e.slice(0, f - 1) : t && (r.dir = "/"), r;
  },
  sep: "/",
  delimiter: ":",
  win32: null,
  posix: null
};
X.posix = X;
var ke = X;
function je(n) {
  for (var e = new Array(n), r = 0; r < n; ++r)
    e[r] = r;
  return e;
}
var Be = je;
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var be = function(n) {
  return n != null && (de(n) || Ie(n) || !!n._isBuffer);
};
function de(n) {
  return !!n.constructor && typeof n.constructor.isBuffer == "function" && n.constructor.isBuffer(n);
}
function Ie(n) {
  return typeof n.readFloatLE == "function" && typeof n.slice == "function" && de(n.slice(0, 0));
}
var Ce = Be, Ee = be, Se = typeof Float64Array < "u";
function Te(n, e) {
  return n[0] - e[0];
}
function Ue() {
  var n = this.stride, e = new Array(n.length), r;
  for (r = 0; r < e.length; ++r)
    e[r] = [Math.abs(n[r]), r];
  e.sort(Te);
  var a = new Array(e.length);
  for (r = 0; r < a.length; ++r)
    a[r] = e[r][1];
  return a;
}
function Fe(n, e) {
  var r = ["View", e, "d", n].join("");
  e < 0 && (r = "View_Nil" + n);
  var a = n === "generic";
  if (e === -1) {
    var t = "function " + r + "(a){this.data=a;};var proto=" + r + ".prototype;proto.dtype='" + n + "';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new " + r + "(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_" + r + "(a){return new " + r + "(a);}", g = new Function(t);
    return g();
  } else if (e === 0) {
    var t = "function " + r + "(a,d) {this.data = a;this.offset = d};var proto=" + r + ".prototype;proto.dtype='" + n + "';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function " + r + "_copy() {return new " + r + "(this.data,this.offset)};proto.pick=function " + r + "_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function " + r + "_get(){return " + (a ? "this.data.get(this.offset)" : "this.data[this.offset]") + "};proto.set=function " + r + "_set(v){return " + (a ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v") + "};return function construct_" + r + "(a,b,c,d){return new " + r + "(a,d)}", g = new Function("TrivialArray", t);
    return g(K[n][0]);
  }
  var t = ["'use strict'"], i = Ce(e), o = i.map(function(v) {
    return "i" + v;
  }), f = "this.offset+" + i.map(function(v) {
    return "this.stride[" + v + "]*i" + v;
  }).join("+"), u = i.map(function(v) {
    return "b" + v;
  }).join(","), c = i.map(function(v) {
    return "c" + v;
  }).join(",");
  t.push(
    "function " + r + "(a," + u + "," + c + ",d){this.data=a",
    "this.shape=[" + u + "]",
    "this.stride=[" + c + "]",
    "this.offset=d|0}",
    "var proto=" + r + ".prototype",
    "proto.dtype='" + n + "'",
    "proto.dimension=" + e
  ), t.push(
    "Object.defineProperty(proto,'size',{get:function " + r + "_size(){return " + i.map(function(v) {
      return "this.shape[" + v + "]";
    }).join("*"),
    "}})"
  ), e === 1 ? t.push("proto.order=[0]") : (t.push("Object.defineProperty(proto,'order',{get:"), e < 4 ? (t.push("function " + r + "_order(){"), e === 2 ? t.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})") : e === 3 && t.push(
    "var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})"
  )) : t.push("ORDER})")), t.push(
    "proto.set=function " + r + "_set(" + o.join(",") + ",v){"
  ), a ? t.push("return this.data.set(" + f + ",v)}") : t.push("return this.data[" + f + "]=v}"), t.push("proto.get=function " + r + "_get(" + o.join(",") + "){"), a ? t.push("return this.data.get(" + f + ")}") : t.push("return this.data[" + f + "]}"), t.push(
    "proto.index=function " + r + "_index(",
    o.join(),
    "){return " + f + "}"
  ), t.push("proto.hi=function " + r + "_hi(" + o.join(",") + "){return new " + r + "(this.data," + i.map(function(v) {
    return ["(typeof i", v, "!=='number'||i", v, "<0)?this.shape[", v, "]:i", v, "|0"].join("");
  }).join(",") + "," + i.map(function(v) {
    return "this.stride[" + v + "]";
  }).join(",") + ",this.offset)}");
  var d = i.map(function(v) {
    return "a" + v + "=this.shape[" + v + "]";
  }), s = i.map(function(v) {
    return "c" + v + "=this.stride[" + v + "]";
  });
  t.push("proto.lo=function " + r + "_lo(" + o.join(",") + "){var b=this.offset,d=0," + d.join(",") + "," + s.join(","));
  for (var l = 0; l < e; ++l)
    t.push(
      "if(typeof i" + l + "==='number'&&i" + l + ">=0){d=i" + l + "|0;b+=c" + l + "*d;a" + l + "-=d}"
    );
  t.push("return new " + r + "(this.data," + i.map(function(v) {
    return "a" + v;
  }).join(",") + "," + i.map(function(v) {
    return "c" + v;
  }).join(",") + ",b)}"), t.push("proto.step=function " + r + "_step(" + o.join(",") + "){var " + i.map(function(v) {
    return "a" + v + "=this.shape[" + v + "]";
  }).join(",") + "," + i.map(function(v) {
    return "b" + v + "=this.stride[" + v + "]";
  }).join(",") + ",c=this.offset,d=0,ceil=Math.ceil");
  for (var l = 0; l < e; ++l)
    t.push(
      "if(typeof i" + l + "==='number'){d=i" + l + "|0;if(d<0){c+=b" + l + "*(a" + l + "-1);a" + l + "=ceil(-a" + l + "/d)}else{a" + l + "=ceil(a" + l + "/d)}b" + l + "*=d}"
    );
  t.push("return new " + r + "(this.data," + i.map(function(v) {
    return "a" + v;
  }).join(",") + "," + i.map(function(v) {
    return "b" + v;
  }).join(",") + ",c)}");
  for (var p = new Array(e), h = new Array(e), l = 0; l < e; ++l)
    p[l] = "a[i" + l + "]", h[l] = "b[i" + l + "]";
  t.push(
    "proto.transpose=function " + r + "_transpose(" + o + "){" + o.map(function(v, y) {
      return v + "=(" + v + "===undefined?" + y + ":" + v + "|0)";
    }).join(";"),
    "var a=this.shape,b=this.stride;return new " + r + "(this.data," + p.join(",") + "," + h.join(",") + ",this.offset)}"
  ), t.push("proto.pick=function " + r + "_pick(" + o + "){var a=[],b=[],c=this.offset");
  for (var l = 0; l < e; ++l)
    t.push("if(typeof i" + l + "==='number'&&i" + l + ">=0){c=(c+this.stride[" + l + "]*i" + l + ")|0}else{a.push(this.shape[" + l + "]);b.push(this.stride[" + l + "])}");
  t.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}"), t.push("return function construct_" + r + "(data,shape,stride,offset){return new " + r + "(data," + i.map(function(v) {
    return "shape[" + v + "]";
  }).join(",") + "," + i.map(function(v) {
    return "stride[" + v + "]";
  }).join(",") + ",offset)}");
  var g = new Function("CTOR_LIST", "ORDER", t.join(`
`));
  return g(K[n], Ue);
}
function Me(n) {
  if (Ee(n))
    return "buffer";
  if (Se)
    switch (Object.prototype.toString.call(n)) {
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
  return Array.isArray(n) ? "array" : "generic";
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
function Oe(n, e, r, a) {
  if (n === void 0) {
    var c = K.array[0];
    return c([]);
  } else typeof n == "number" && (n = [n]);
  e === void 0 && (e = [n.length]);
  var t = e.length;
  if (r === void 0) {
    r = new Array(t);
    for (var i = t - 1, o = 1; i >= 0; --i)
      r[i] = o, o *= e[i];
  }
  if (a === void 0) {
    a = 0;
    for (var i = 0; i < t; ++i)
      r[i] < 0 && (a -= (e[i] - 1) * r[i]);
  }
  for (var f = Me(n), u = K[f]; u.length <= t + 1; )
    u.push(Fe(f, u.length - 1));
  var c = u[t + 1];
  return c(n, e, r, a);
}
var Pe = Oe, fe = {}, ze, De;
function Re(n, e, r, i) {
  var t = 0, i = i === void 0 ? {} : i, o = i.loop === void 0 ? null : i.loop, f = i.palette === void 0 ? null : i.palette;
  if (e <= 0 || r <= 0 || e > 65535 || r > 65535)
    throw new Error("Width/Height invalid.");
  function u(v) {
    var y = v.length;
    if (y < 2 || y > 256 || y & y - 1)
      throw new Error(
        "Invalid code/color length, must be power of 2 and 2 .. 256."
      );
    return y;
  }
  n[t++] = 71, n[t++] = 73, n[t++] = 70, n[t++] = 56, n[t++] = 57, n[t++] = 97;
  var c = 0, d = 0;
  if (f !== null) {
    for (var s = u(f); s >>= 1; ) ++c;
    if (s = 1 << c, --c, i.background !== void 0) {
      if (d = i.background, d >= s)
        throw new Error("Background index out of range.");
      if (d === 0)
        throw new Error("Background index explicitly passed as 0.");
    }
  }
  if (n[t++] = e & 255, n[t++] = e >> 8 & 255, n[t++] = r & 255, n[t++] = r >> 8 & 255, n[t++] = (f !== null ? 128 : 0) | // Global Color Table Flag.
  c, n[t++] = d, n[t++] = 0, f !== null)
    for (var l = 0, p = f.length; l < p; ++l) {
      var h = f[l];
      n[t++] = h >> 16 & 255, n[t++] = h >> 8 & 255, n[t++] = h & 255;
    }
  if (o !== null) {
    if (o < 0 || o > 65535)
      throw new Error("Loop count invalid.");
    n[t++] = 33, n[t++] = 255, n[t++] = 11, n[t++] = 78, n[t++] = 69, n[t++] = 84, n[t++] = 83, n[t++] = 67, n[t++] = 65, n[t++] = 80, n[t++] = 69, n[t++] = 50, n[t++] = 46, n[t++] = 48, n[t++] = 3, n[t++] = 1, n[t++] = o & 255, n[t++] = o >> 8 & 255, n[t++] = 0;
  }
  var g = !1;
  this.addFrame = function(v, y, m, x, A, w) {
    if (g === !0 && (--t, g = !1), w = w === void 0 ? {} : w, v < 0 || y < 0 || v > 65535 || y > 65535)
      throw new Error("x/y invalid.");
    if (m <= 0 || x <= 0 || m > 65535 || x > 65535)
      throw new Error("Width/Height invalid.");
    if (A.length < m * x)
      throw new Error("Not enough pixels for the frame size.");
    var B = !0, j = w.palette;
    if (j == null && (B = !1, j = f), j == null)
      throw new Error("Must supply either a local or global palette.");
    for (var I = u(j), E = 0; I >>= 1; ) ++E;
    I = 1 << E;
    var S = w.delay === void 0 ? 0 : w.delay, P = w.disposal === void 0 ? 0 : w.disposal;
    if (P < 0 || P > 3)
      throw new Error("Disposal out of range.");
    var N = !1, z = 0;
    if (w.transparent !== void 0 && w.transparent !== null && (N = !0, z = w.transparent, z < 0 || z >= I))
      throw new Error("Transparent color index.");
    if ((P !== 0 || N || S !== 0) && (n[t++] = 33, n[t++] = 249, n[t++] = 4, n[t++] = P << 2 | (N === !0 ? 1 : 0), n[t++] = S & 255, n[t++] = S >> 8 & 255, n[t++] = z, n[t++] = 0), n[t++] = 44, n[t++] = v & 255, n[t++] = v >> 8 & 255, n[t++] = y & 255, n[t++] = y >> 8 & 255, n[t++] = m & 255, n[t++] = m >> 8 & 255, n[t++] = x & 255, n[t++] = x >> 8 & 255, n[t++] = B === !0 ? 128 | E - 1 : 0, B === !0)
      for (var Z = 0, U = j.length; Z < U; ++Z) {
        var C = j[Z];
        n[t++] = C >> 16 & 255, n[t++] = C >> 8 & 255, n[t++] = C & 255;
      }
    return t = Ge(
      n,
      t,
      E < 2 ? 2 : E,
      A
    ), t;
  }, this.end = function() {
    return g === !1 && (n[t++] = 59, g = !0), t;
  }, this.getOutputBuffer = function() {
    return n;
  }, this.setOutputBuffer = function(v) {
    n = v;
  }, this.getOutputBufferPosition = function() {
    return t;
  }, this.setOutputBufferPosition = function(v) {
    t = v;
  };
}
function Ge(n, e, r, a) {
  n[e++] = r;
  var t = e++, i = 1 << r, o = i - 1, f = i + 1, u = f + 1, c = r + 1, d = 0, s = 0;
  function l(w) {
    for (; d >= w; )
      n[e++] = s & 255, s >>= 8, d -= 8, e === t + 256 && (n[t] = 255, t = e++);
  }
  function p(w) {
    s |= w << d, d += c, l(8);
  }
  var h = a[0] & o, g = {};
  p(i);
  for (var v = 1, y = a.length; v < y; ++v) {
    var m = a[v] & o, x = h << 8 | m, A = g[x];
    if (A === void 0) {
      for (s |= h << d, d += c; d >= 8; )
        n[e++] = s & 255, s >>= 8, d -= 8, e === t + 256 && (n[t] = 255, t = e++);
      u === 4096 ? (p(i), u = f + 1, c = r + 1, g = {}) : (u >= 1 << c && ++c, g[x] = u++), h = m;
    } else
      h = A;
  }
  return p(h), p(f), l(1), t + 1 === e ? n[t] = 0 : (n[t] = e - t - 1, n[e++] = 0), e;
}
function qe(n) {
  var e = 0;
  if (n[e++] !== 71 || n[e++] !== 73 || n[e++] !== 70 || n[e++] !== 56 || (n[e++] + 1 & 253) !== 56 || n[e++] !== 97)
    throw new Error("Invalid GIF 87a/89a header.");
  var r = n[e++] | n[e++] << 8, a = n[e++] | n[e++] << 8, t = n[e++], i = t >> 7, o = t & 7, f = 1 << o + 1;
  n[e++], n[e++];
  var u = null, c = null;
  i && (u = e, c = f, e += f * 3);
  var d = !0, s = [], l = 0, p = null, h = 0, g = null;
  for (this.width = r, this.height = a; d && e < n.length; )
    switch (n[e++]) {
      case 33:
        switch (n[e++]) {
          case 255:
            if (n[e] !== 11 || // 21 FF already read, check block size.
            // NETSCAPE2.0
            n[e + 1] == 78 && n[e + 2] == 69 && n[e + 3] == 84 && n[e + 4] == 83 && n[e + 5] == 67 && n[e + 6] == 65 && n[e + 7] == 80 && n[e + 8] == 69 && n[e + 9] == 50 && n[e + 10] == 46 && n[e + 11] == 48 && // Sub-block
            n[e + 12] == 3 && n[e + 13] == 1 && n[e + 16] == 0)
              e += 14, g = n[e++] | n[e++] << 8, e++;
            else
              for (e += 12; ; ) {
                var v = n[e++];
                if (!(v >= 0)) throw Error("Invalid block size");
                if (v === 0) break;
                e += v;
              }
            break;
          case 249:
            if (n[e++] !== 4 || n[e + 4] !== 0)
              throw new Error("Invalid graphics extension block.");
            var y = n[e++];
            l = n[e++] | n[e++] << 8, p = n[e++], y & 1 || (p = null), h = y >> 2 & 7, e++;
            break;
          case 254:
            for (; ; ) {
              var v = n[e++];
              if (!(v >= 0)) throw Error("Invalid block size");
              if (v === 0) break;
              e += v;
            }
            break;
          default:
            throw new Error(
              "Unknown graphic control label: 0x" + n[e - 1].toString(16)
            );
        }
        break;
      case 44:
        var m = n[e++] | n[e++] << 8, x = n[e++] | n[e++] << 8, A = n[e++] | n[e++] << 8, w = n[e++] | n[e++] << 8, B = n[e++], j = B >> 7, I = B >> 6 & 1, E = B & 7, S = 1 << E + 1, P = u, N = c, z = !1;
        if (j) {
          var z = !0;
          P = e, N = S, e += S * 3;
        }
        var Z = e;
        for (e++; ; ) {
          var v = n[e++];
          if (!(v >= 0)) throw Error("Invalid block size");
          if (v === 0) break;
          e += v;
        }
        s.push({
          x: m,
          y: x,
          width: A,
          height: w,
          has_local_palette: z,
          palette_offset: P,
          palette_size: N,
          data_offset: Z,
          data_length: e - Z,
          transparent_index: p,
          interlaced: !!I,
          delay: l,
          disposal: h
        });
        break;
      case 59:
        d = !1;
        break;
      default:
        throw new Error("Unknown gif block: 0x" + n[e - 1].toString(16));
    }
  this.numFrames = function() {
    return s.length;
  }, this.loopCount = function() {
    return g;
  }, this.frameInfo = function(U) {
    if (U < 0 || U >= s.length)
      throw new Error("Frame index out of range.");
    return s[U];
  }, this.decodeAndBlitFrameBGRA = function(U, C) {
    var _ = this.frameInfo(U), Y = _.width * _.height, D = new Uint8Array(Y);
    ce(
      n,
      _.data_offset,
      D,
      Y
    );
    var R = _.palette_offset, G = _.transparent_index;
    G === null && (G = 256);
    var F = _.width, q = r - F, L = F, J = (_.y * r + _.x) * 4, ne = ((_.y + _.height) * r + _.x) * 4, b = J, $ = q * 4;
    _.interlaced === !0 && ($ += r * 4 * 7);
    for (var V = 8, W = 0, te = D.length; W < te; ++W) {
      var M = D[W];
      if (L === 0 && (b += $, L = F, b >= ne && ($ = q * 4 + r * 4 * (V - 1), b = J + (F + q) * (V << 1), V >>= 1)), M === G)
        b += 4;
      else {
        var ae = n[R + M * 3], ie = n[R + M * 3 + 1], oe = n[R + M * 3 + 2];
        C[b++] = oe, C[b++] = ie, C[b++] = ae, C[b++] = 255;
      }
      --L;
    }
  }, this.decodeAndBlitFrameRGBA = function(U, C) {
    var _ = this.frameInfo(U), Y = _.width * _.height, D = new Uint8Array(Y);
    ce(
      n,
      _.data_offset,
      D,
      Y
    );
    var R = _.palette_offset, G = _.transparent_index;
    G === null && (G = 256);
    var F = _.width, q = r - F, L = F, J = (_.y * r + _.x) * 4, ne = ((_.y + _.height) * r + _.x) * 4, b = J, $ = q * 4;
    _.interlaced === !0 && ($ += r * 4 * 7);
    for (var V = 8, W = 0, te = D.length; W < te; ++W) {
      var M = D[W];
      if (L === 0 && (b += $, L = F, b >= ne && ($ = q * 4 + r * 4 * (V - 1), b = J + (F + q) * (V << 1), V >>= 1)), M === G)
        b += 4;
      else {
        var ae = n[R + M * 3], ie = n[R + M * 3 + 1], oe = n[R + M * 3 + 2];
        C[b++] = ae, C[b++] = ie, C[b++] = oe, C[b++] = 255;
      }
      --L;
    }
  };
}
function ce(n, e, r, a) {
  for (var t = n[e++], i = 1 << t, o = i + 1, f = o + 1, u = t + 1, c = (1 << u) - 1, d = 0, s = 0, l = 0, p = n[e++], h = new Int32Array(4096), g = null; ; ) {
    for (; d < 16 && p !== 0; )
      s |= n[e++] << d, d += 8, p === 1 ? p = n[e++] : --p;
    if (d < u)
      break;
    var v = s & c;
    if (s >>= u, d -= u, v === i) {
      f = o + 1, u = t + 1, c = (1 << u) - 1, g = null;
      continue;
    } else if (v === o)
      break;
    for (var y = v < f ? v : g, m = 0, x = y; x > i; )
      x = h[x] >> 8, ++m;
    var A = x, w = l + m + (y !== v ? 1 : 0);
    if (w > a) {
      console.log("Warning, gif stream longer than expected.");
      return;
    }
    r[l++] = A, l += m;
    var B = l;
    for (y !== v && (r[l++] = A), x = y; m--; )
      x = h[x], r[--B] = x & 255, x >>= 8;
    g !== null && f < 4096 && (h[f++] = g << 8 | A, f >= c + 1 && u < 12 && (++u, c = c << 1 | 1)), g = v;
  }
  return l !== a && console.log("Warning, gif stream shorter than expected."), r;
}
try {
  De = fe.GifWriter = Re, ze = fe.GifReader = qe;
} catch {
}
function Le(n, e) {
  for (var r = 1, a = n.length, t = n[0], i = n[0], o = 1; o < a; ++o)
    if (i = t, t = n[o], e(t, i)) {
      if (o === r) {
        r++;
        continue;
      }
      n[r++] = t;
    }
  return n.length = r, n;
}
function $e(n) {
  for (var e = 1, r = n.length, a = n[0], t = n[0], i = 1; i < r; ++i, t = a)
    if (t = a, a = n[i], a !== t) {
      if (i === e) {
        e++;
        continue;
      }
      n[e++] = a;
    }
  return n.length = e, n;
}
function Ve(n, e, r) {
  return n.length === 0 ? n : e ? (r || n.sort(e), Le(n, e)) : (r || n.sort(), $e(n));
}
var We = Ve, He = We;
function ve(n, e, r) {
  var a = n.length, t = e.arrayArgs.length, i = e.indexArgs.length > 0, o = [], f = [], u = 0, c = 0, d, s;
  for (d = 0; d < a; ++d)
    f.push(["i", d, "=0"].join(""));
  for (s = 0; s < t; ++s)
    for (d = 0; d < a; ++d)
      c = u, u = n[d], d === 0 ? f.push(["d", s, "s", d, "=t", s, "p", u].join("")) : f.push(["d", s, "s", d, "=(t", s, "p", u, "-s", c, "*t", s, "p", c, ")"].join(""));
  for (f.length > 0 && o.push("var " + f.join(",")), d = a - 1; d >= 0; --d)
    u = n[d], o.push(["for(i", d, "=0;i", d, "<s", u, ";++i", d, "){"].join(""));
  for (o.push(r), d = 0; d < a; ++d) {
    for (c = u, u = n[d], s = 0; s < t; ++s)
      o.push(["p", s, "+=d", s, "s", d].join(""));
    i && (d > 0 && o.push(["index[", c, "]-=s", c].join("")), o.push(["++index[", u, "]"].join(""))), o.push("}");
  }
  return o.join(`
`);
}
function Ne(n, e, r, a) {
  for (var t = e.length, i = r.arrayArgs.length, o = r.blockSize, f = r.indexArgs.length > 0, u = [], c = 0; c < i; ++c)
    u.push(["var offset", c, "=p", c].join(""));
  for (var c = n; c < t; ++c)
    u.push(["for(var j" + c + "=SS[", e[c], "]|0;j", c, ">0;){"].join("")), u.push(["if(j", c, "<", o, "){"].join("")), u.push(["s", e[c], "=j", c].join("")), u.push(["j", c, "=0"].join("")), u.push(["}else{s", e[c], "=", o].join("")), u.push(["j", c, "-=", o, "}"].join("")), f && u.push(["index[", e[c], "]=j", c].join(""));
  for (var c = 0; c < i; ++c) {
    for (var d = ["offset" + c], s = n; s < t; ++s)
      d.push(["j", s, "*t", c, "p", e[s]].join(""));
    u.push(["p", c, "=(", d.join("+"), ")"].join(""));
  }
  u.push(ve(e, r, a));
  for (var c = n; c < t; ++c)
    u.push("}");
  return u.join(`
`);
}
function Ze(n) {
  for (var e = 0, r = n[0].length; e < r; ) {
    for (var a = 1; a < n.length; ++a)
      if (n[a][e] !== n[0][e])
        return e;
    ++e;
  }
  return e;
}
function se(n, e, r) {
  for (var a = n.body, t = [], i = [], o = 0; o < n.args.length; ++o) {
    var f = n.args[o];
    if (!(f.count <= 0)) {
      var u = new RegExp(f.name, "g"), c = "", d = e.arrayArgs.indexOf(o);
      switch (e.argTypes[o]) {
        case "offset":
          var s = e.offsetArgIndex.indexOf(o), l = e.offsetArgs[s];
          d = l.array, c = "+q" + s;
        case "array":
          c = "p" + d + c;
          var p = "l" + o, h = "a" + d;
          if (e.arrayBlockIndices[d] === 0)
            f.count === 1 ? r[d] === "generic" ? f.lvalue ? (t.push(["var ", p, "=", h, ".get(", c, ")"].join("")), a = a.replace(u, p), i.push([h, ".set(", c, ",", p, ")"].join(""))) : a = a.replace(u, [h, ".get(", c, ")"].join("")) : a = a.replace(u, [h, "[", c, "]"].join("")) : r[d] === "generic" ? (t.push(["var ", p, "=", h, ".get(", c, ")"].join("")), a = a.replace(u, p), f.lvalue && i.push([h, ".set(", c, ",", p, ")"].join(""))) : (t.push(["var ", p, "=", h, "[", c, "]"].join("")), a = a.replace(u, p), f.lvalue && i.push([h, "[", c, "]=", p].join("")));
          else {
            for (var g = [f.name], v = [c], y = 0; y < Math.abs(e.arrayBlockIndices[d]); y++)
              g.push("\\s*\\[([^\\]]+)\\]"), v.push("$" + (y + 1) + "*t" + d + "b" + y);
            if (u = new RegExp(g.join(""), "g"), c = v.join("+"), r[d] === "generic")
              throw new Error("cwise: Generic arrays not supported in combination with blocks!");
            a = a.replace(u, [h, "[", c, "]"].join(""));
          }
          break;
        case "scalar":
          a = a.replace(u, "Y" + e.scalarArgs.indexOf(o));
          break;
        case "index":
          a = a.replace(u, "index");
          break;
        case "shape":
          a = a.replace(u, "shape");
          break;
      }
    }
  }
  return [t.join(`
`), a, i.join(`
`)].join(`
`).trim();
}
function Xe(n) {
  for (var e = new Array(n.length), r = !0, a = 0; a < n.length; ++a) {
    var t = n[a], i = t.match(/\d+/);
    i ? i = i[0] : i = "", t.charAt(0) === 0 ? e[a] = "u" + t.charAt(1) + i : e[a] = t.charAt(0) + i, a > 0 && (r = r && e[a] === e[a - 1]);
  }
  return r ? e[0] : e.join("");
}
function Ye(n, e) {
  for (var r = e[1].length - Math.abs(n.arrayBlockIndices[0]) | 0, a = new Array(n.arrayArgs.length), t = new Array(n.arrayArgs.length), i = 0; i < n.arrayArgs.length; ++i)
    t[i] = e[2 * i], a[i] = e[2 * i + 1];
  for (var o = [], f = [], u = [], c = [], d = [], i = 0; i < n.arrayArgs.length; ++i) {
    n.arrayBlockIndices[i] < 0 ? (u.push(0), c.push(r), o.push(r), f.push(r + n.arrayBlockIndices[i])) : (u.push(n.arrayBlockIndices[i]), c.push(n.arrayBlockIndices[i] + r), o.push(0), f.push(n.arrayBlockIndices[i]));
    for (var s = [], l = 0; l < a[i].length; l++)
      u[i] <= a[i][l] && a[i][l] < c[i] && s.push(a[i][l] - u[i]);
    d.push(s);
  }
  for (var p = ["SS"], h = ["'use strict'"], g = [], l = 0; l < r; ++l)
    g.push(["s", l, "=SS[", l, "]"].join(""));
  for (var i = 0; i < n.arrayArgs.length; ++i) {
    p.push("a" + i), p.push("t" + i), p.push("p" + i);
    for (var l = 0; l < r; ++l)
      g.push(["t", i, "p", l, "=t", i, "[", u[i] + l, "]"].join(""));
    for (var l = 0; l < Math.abs(n.arrayBlockIndices[i]); ++l)
      g.push(["t", i, "b", l, "=t", i, "[", o[i] + l, "]"].join(""));
  }
  for (var i = 0; i < n.scalarArgs.length; ++i)
    p.push("Y" + i);
  if (n.shapeArgs.length > 0 && g.push("shape=SS.slice(0)"), n.indexArgs.length > 0) {
    for (var v = new Array(r), i = 0; i < r; ++i)
      v[i] = "0";
    g.push(["index=[", v.join(","), "]"].join(""));
  }
  for (var i = 0; i < n.offsetArgs.length; ++i) {
    for (var y = n.offsetArgs[i], m = [], l = 0; l < y.offset.length; ++l)
      y.offset[l] !== 0 && (y.offset[l] === 1 ? m.push(["t", y.array, "p", l].join("")) : m.push([y.offset[l], "*t", y.array, "p", l].join("")));
    m.length === 0 ? g.push("q" + i + "=0") : g.push(["q", i, "=", m.join("+")].join(""));
  }
  var x = He([].concat(n.pre.thisVars).concat(n.body.thisVars).concat(n.post.thisVars));
  g = g.concat(x), g.length > 0 && h.push("var " + g.join(","));
  for (var i = 0; i < n.arrayArgs.length; ++i)
    h.push("p" + i + "|=0");
  n.pre.body.length > 3 && h.push(se(n.pre, n, t));
  var A = se(n.body, n, t), w = Ze(d);
  w < r ? h.push(Ne(w, d[0], n, A)) : h.push(ve(d[0], n, A)), n.post.body.length > 3 && h.push(se(n.post, n, t)), n.debug && console.log("-----Generated cwise routine for ", e, `:
` + h.join(`
`) + `
----------`);
  var B = [n.funcName || "unnamed", "_cwise_loop_", a[0].join("s"), "m", w, Xe(t)].join(""), j = new Function(["function ", B, "(", p.join(","), "){", h.join(`
`), "} return ", B].join(""));
  return j();
}
var Je = Ye, Ke = Je;
function Qe(n) {
  var e = ["'use strict'", "var CACHED={}"], r = [], a = n.funcName + "_cwise_thunk";
  e.push(["return function ", a, "(", n.shimArgs.join(","), "){"].join(""));
  for (var t = [], i = [], o = [[
    "array",
    n.arrayArgs[0],
    ".shape.slice(",
    // Slice shape so that we only retain the shape over which we iterate (which gets passed to the cwise operator as SS).
    Math.max(0, n.arrayBlockIndices[0]),
    n.arrayBlockIndices[0] < 0 ? "," + n.arrayBlockIndices[0] + ")" : ")"
  ].join("")], f = [], u = [], c = 0; c < n.arrayArgs.length; ++c) {
    var d = n.arrayArgs[c];
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
    ].join("")), t.push("t" + d), t.push("r" + d), i.push("t" + d), i.push("r" + d + ".join()"), o.push("array" + d + ".data"), o.push("array" + d + ".stride"), o.push("array" + d + ".offset|0"), c > 0 && (f.push("array" + n.arrayArgs[0] + ".shape.length===array" + d + ".shape.length+" + (Math.abs(n.arrayBlockIndices[0]) - Math.abs(n.arrayBlockIndices[c]))), u.push("array" + n.arrayArgs[0] + ".shape[shapeIndex+" + Math.max(0, n.arrayBlockIndices[0]) + "]===array" + d + ".shape[shapeIndex+" + Math.max(0, n.arrayBlockIndices[c]) + "]"));
  }
  n.arrayArgs.length > 1 && (e.push("if (!(" + f.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same dimensionality!')"), e.push("for(var shapeIndex=array" + n.arrayArgs[0] + ".shape.length-" + Math.abs(n.arrayBlockIndices[0]) + "; shapeIndex-->0;) {"), e.push("if (!(" + u.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same shape!')"), e.push("}"));
  for (var c = 0; c < n.scalarArgs.length; ++c)
    o.push("scalar" + n.scalarArgs[c]);
  r.push(["type=[", i.join(","), "].join()"].join("")), r.push("proc=CACHED[type]"), e.push("var " + r.join(",")), e.push([
    "if(!proc){",
    "CACHED[type]=proc=compile([",
    t.join(","),
    "])}",
    "return proc(",
    o.join(","),
    ")}"
  ].join("")), n.debug && console.log(`-----Generated thunk:
` + e.join(`
`) + `
----------`);
  var s = new Function("compile", e.join(`
`));
  return s(Ke.bind(void 0, n));
}
var er = Qe, rr = er;
function nr() {
  this.argTypes = [], this.shimArgs = [], this.arrayArgs = [], this.arrayBlockIndices = [], this.scalarArgs = [], this.offsetArgs = [], this.offsetArgIndex = [], this.indexArgs = [], this.shapeArgs = [], this.funcName = "", this.pre = null, this.body = null, this.post = null, this.debug = !1;
}
function tr(n) {
  var e = new nr();
  e.pre = n.pre, e.body = n.body, e.post = n.post;
  var r = n.args.slice(0);
  e.argTypes = r;
  for (var a = 0; a < r.length; ++a) {
    var t = r[a];
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
  return e.debug = !!n.printCode || !!n.debug, e.funcName = n.funcName || "cwise", e.blockSize = n.blockSize || 64, rr(e);
}
var ar = tr;
ar({ args: ["array", "scalar", "index"], pre: { body: "{}", args: [], thisVars: [], localVars: [] }, body: { body: `{
var _inline_1_v=_inline_1_arg1_,_inline_1_i
for(_inline_1_i=0;_inline_1_i<_inline_1_arg2_.length-1;++_inline_1_i) {
_inline_1_v=_inline_1_v[_inline_1_arg2_[_inline_1_i]]
}
_inline_1_arg0_=_inline_1_v[_inline_1_arg2_[_inline_1_arg2_.length-1]]
}`, args: [{ name: "_inline_1_arg0_", lvalue: !0, rvalue: !1, count: 1 }, { name: "_inline_1_arg1_", lvalue: !1, rvalue: !0, count: 1 }, { name: "_inline_1_arg2_", lvalue: !1, rvalue: !0, count: 4 }], thisVars: [], localVars: ["_inline_1_i", "_inline_1_v"] }, post: { body: "{}", args: [], thisVars: [], localVars: [] }, funcName: "convert", blockSize: 64 });
var ir = { exports: {} };
const or = {}, sr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: or
}, Symbol.toStringTag, { value: "Module" })), fr = /* @__PURE__ */ _e(sr);
(function(n, e) {
  var r = fr;
  n.exports = a, a.through = a;
  function a(t, i, o) {
    t = t || function(h) {
      this.queue(h);
    }, i = i || function() {
      this.queue(null);
    };
    var f = !1, u = !1, c = [], d = !1, s = new r();
    s.readable = s.writable = !0, s.paused = !1, s.autoDestroy = !(o && o.autoDestroy === !1), s.write = function(h) {
      return t.call(this, h), !s.paused;
    };
    function l() {
      for (; c.length && !s.paused; ) {
        var h = c.shift();
        if (h === null)
          return s.emit("end");
        s.emit("data", h);
      }
    }
    s.queue = s.push = function(h) {
      return d || (h === null && (d = !0), c.push(h), l()), s;
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
      if (!u)
        return u = !0, f = !0, c.length = 0, s.writable = s.readable = !1, s.emit("close"), s;
    }, s.pause = function() {
      if (!s.paused)
        return s.paused = !0, s;
    }, s.resume = function() {
      return s.paused && (s.paused = !1, s.emit("resume")), l(), s.paused || s.emit("drain"), s;
    }, s;
  }
})(ir);
var lr = ur;
function ur(n) {
  if (!/^data\:/i.test(n))
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  n = n.replace(/\r?\n/g, "");
  var e = n.indexOf(",");
  if (e === -1 || e <= 4) throw new TypeError("malformed data: URI");
  for (var r = n.substring(5, e).split(";"), a = !1, t = "US-ASCII", i = 0; i < r.length; i++)
    r[i] == "base64" ? a = !0 : r[i].indexOf("charset=") == 0 && (t = r[i].substring(8));
  var o = unescape(n.substring(e + 1)), f = a ? "base64" : "ascii", u = new Buffer(o, f);
  return u.type = r[0] || "text/plain", u.charset = t, u;
}
var cr = ke, le = Pe, dr = fe.GifReader, vr = lr;
function hr(n, e) {
  var r = new Image();
  r.crossOrigin = "Anonymous", r.onload = function() {
    var a = document.createElement("canvas");
    a.width = r.width, a.height = r.height;
    var t = a.getContext("2d");
    t.drawImage(r, 0, 0);
    var i = t.getImageData(0, 0, r.width, r.height);
    e(null, le(new Uint8Array(i.data), [r.width, r.height, 4], [4, 4 * r.width, 1], 0));
  }, r.onerror = function(a) {
    e(a);
  }, r.src = n;
}
function he(n, e) {
  var r;
  try {
    r = new dr(n);
  } catch (f) {
    e(f);
    return;
  }
  if (r.numFrames() > 0) {
    var a = [r.numFrames(), r.height, r.width, 4], t = new Uint8Array(a[0] * a[1] * a[2] * a[3]), i = le(t, a);
    try {
      for (var o = 0; o < r.numFrames(); ++o)
        r.decodeAndBlitFrameRGBA(o, t.subarray(
          i.index(o, 0, 0, 0),
          i.index(o + 1, 0, 0, 0)
        ));
    } catch (f) {
      e(f);
      return;
    }
    e(null, i.transpose(0, 2, 1));
  } else {
    var a = [r.height, r.width, 4], t = new Uint8Array(a[0] * a[1] * a[2]), i = le(t, a);
    try {
      r.decodeAndBlitFrameRGBA(0, t);
    } catch (d) {
      e(d);
      return;
    }
    e(null, i.transpose(1, 0));
  }
}
function pr(n, e) {
  var r = new XMLHttpRequest();
  r.open("GET", n, !0), r.responseType = "arraybuffer", r.overrideMimeType && r.overrideMimeType("application/binary"), r.onerror = function(a) {
    e(a);
  }, r.onload = function() {
    if (r.readyState === 4) {
      var a = new Uint8Array(r.response);
      he(a, e);
    }
  }, r.send();
}
function gr(n) {
  if (n[0] === void 0) {
    for (var e = n.length, r = new Uint8Array(e), a = 0; a < e; ++a)
      r[a] = n.get(a);
    return r;
  } else
    return new Uint8Array(n);
}
function yr(n, e) {
  process.nextTick(function() {
    try {
      var r = vr(n);
      r ? he(gr(r), e) : e(new Error("Error parsing data URI"));
    } catch (a) {
      e(a);
    }
  });
}
var wr = function(e, r, a) {
  a || (a = r, r = "");
  var t = cr.extname(e);
  switch (r || t.toUpperCase()) {
    case ".GIF":
      pr(e, a);
      break;
    default:
      Buffer.isBuffer(e) && (e = "data:" + r + ";base64," + e.toString("base64")), e.indexOf("data:image/gif;") === 0 ? yr(e, a) : hr(e, a);
  }
};
const mr = /* @__PURE__ */ xe(wr);
var H = {}, pe = {}, O = {};
Object.defineProperty(O, "__esModule", {
  value: !0
});
O.loop = O.conditional = O.parse = void 0;
var xr = function n(e, r) {
  var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, t = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : a;
  if (Array.isArray(r))
    r.forEach(function(o) {
      return n(e, o, a, t);
    });
  else if (typeof r == "function")
    r(e, a, t, n);
  else {
    var i = Object.keys(r)[0];
    Array.isArray(r[i]) ? (t[i] = {}, n(e, r[i], a, t[i])) : t[i] = r[i](e, a, t, n);
  }
  return a;
};
O.parse = xr;
var _r = function(e, r) {
  return function(a, t, i, o) {
    r(a, t, i) && o(a, e, t, i);
  };
};
O.conditional = _r;
var Ar = function(e, r) {
  return function(a, t, i, o) {
    for (var f = [], u = a.pos; r(a, t, i); ) {
      var c = {};
      if (o(a, e, t, c), a.pos === u)
        break;
      u = a.pos, f.push(c);
    }
    return f;
  };
};
O.loop = Ar;
var k = {};
Object.defineProperty(k, "__esModule", {
  value: !0
});
k.readBits = k.readArray = k.readUnsigned = k.readString = k.peekBytes = k.readBytes = k.peekByte = k.readByte = k.buildStream = void 0;
var kr = function(e) {
  return {
    data: e,
    pos: 0
  };
};
k.buildStream = kr;
var ge = function() {
  return function(e) {
    return e.data[e.pos++];
  };
};
k.readByte = ge;
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
var Br = function(e) {
  return function(r) {
    return r.data.subarray(r.pos, r.pos + e);
  };
};
k.peekBytes = Br;
var br = function(e) {
  return function(r) {
    return Array.from(Q(e)(r)).map(function(a) {
      return String.fromCharCode(a);
    }).join("");
  };
};
k.readString = br;
var Ir = function(e) {
  return function(r) {
    var a = Q(2)(r);
    return e ? (a[1] << 8) + a[0] : (a[0] << 8) + a[1];
  };
};
k.readUnsigned = Ir;
var Cr = function(e, r) {
  return function(a, t, i) {
    for (var o = typeof r == "function" ? r(a, t, i) : r, f = Q(e), u = new Array(o), c = 0; c < o; c++)
      u[c] = f(a);
    return u;
  };
};
k.readArray = Cr;
var Er = function(e, r, a) {
  for (var t = 0, i = 0; i < a; i++)
    t += e[r + i] && Math.pow(2, a - i - 1);
  return t;
}, Sr = function(e) {
  return function(r) {
    for (var a = ge()(r), t = new Array(8), i = 0; i < 8; i++)
      t[7 - i] = !!(a & 1 << i);
    return Object.keys(e).reduce(function(o, f) {
      var u = e[f];
      return u.length ? o[f] = Er(t, u.index, u.length) : o[f] = t[u.index], o;
    }, {});
  };
};
k.readBits = Sr;
(function(n) {
  Object.defineProperty(n, "__esModule", {
    value: !0
  }), n.default = void 0;
  var e = O, r = k, a = {
    blocks: function(l) {
      for (var p = 0, h = [], g = l.data.length, v = 0, y = (0, r.readByte)()(l); y !== p && y; y = (0, r.readByte)()(l)) {
        if (l.pos + y >= g) {
          var m = g - l.pos;
          h.push((0, r.readBytes)(m)(l)), v += m;
          break;
        }
        h.push((0, r.readBytes)(y)(l)), v += y;
      }
      for (var x = new Uint8Array(v), A = 0, w = 0; w < h.length; w++)
        x.set(h[w], A), A += h[w].length;
      return x;
    }
  }, t = (0, e.conditional)({
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
    var l = (0, r.peekBytes)(2)(s);
    return l[0] === 33 && l[1] === 249;
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
      lct: (0, r.readArray)(3, function(s, l, p) {
        return Math.pow(2, p.descriptor.lct.size + 1);
      })
    }, function(s, l, p) {
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
      preData: function(l, p, h) {
        return (0, r.readBytes)(h.text.blockSize)(l);
      }
    }, a]
  }, function(s) {
    var l = (0, r.peekBytes)(2)(s);
    return l[0] === 33 && l[1] === 1;
  }), f = (0, e.conditional)({
    application: [{
      codes: (0, r.readBytes)(2)
    }, {
      blockSize: (0, r.readByte)()
    }, {
      id: function(l, p, h) {
        return (0, r.readString)(h.blockSize)(l);
      }
    }, a]
  }, function(s) {
    var l = (0, r.peekBytes)(2)(s);
    return l[0] === 33 && l[1] === 255;
  }), u = (0, e.conditional)({
    comment: [{
      codes: (0, r.readBytes)(2)
    }, a]
  }, function(s) {
    var l = (0, r.peekBytes)(2)(s);
    return l[0] === 33 && l[1] === 254;
  }), c = [
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
      gct: (0, r.readArray)(3, function(s, l) {
        return Math.pow(2, l.lsd.gct.size + 1);
      })
    }, function(s, l) {
      return l.lsd.gct.exists;
    }),
    // content frames
    {
      frames: (0, e.loop)([t, f, u, i, o], function(s) {
        var l = (0, r.peekByte)()(s);
        return l === 33 || l === 44;
      })
    }
  ], d = c;
  n.default = d;
})(pe);
var ee = {};
Object.defineProperty(ee, "__esModule", {
  value: !0
});
ee.deinterlace = void 0;
var Tr = function(e, r) {
  for (var a = new Array(e.length), t = e.length / r, i = function(l, p) {
    var h = e.slice(p * r, (p + 1) * r);
    a.splice.apply(a, [l * r, r].concat(h));
  }, o = [0, 4, 2, 1], f = [8, 8, 4, 2], u = 0, c = 0; c < 4; c++)
    for (var d = o[c]; d < t; d += f[c])
      i(d, u), u++;
  return a;
};
ee.deinterlace = Tr;
var re = {};
Object.defineProperty(re, "__esModule", {
  value: !0
});
re.lzw = void 0;
var Ur = function(e, r, a) {
  var t = 4096, i = -1, o = a, f, u, c, d, s, l, p, B, h, g, w, v, j, I, S, E, y = new Array(a), m = new Array(t), x = new Array(t), A = new Array(t + 1);
  for (v = e, u = 1 << v, s = u + 1, f = u + 2, p = i, d = v + 1, c = (1 << d) - 1, h = 0; h < u; h++)
    m[h] = 0, x[h] = h;
  var w, B, j, I, E, S;
  for (w = B = j = I = E = S = 0, g = 0; g < o; ) {
    if (I === 0) {
      if (B < d) {
        w += r[S] << B, B += 8, S++;
        continue;
      }
      if (h = w & c, w >>= d, B -= d, h > f || h == s)
        break;
      if (h == u) {
        d = v + 1, c = (1 << d) - 1, f = u + 2, p = i;
        continue;
      }
      if (p == i) {
        A[I++] = x[h], p = h, j = h;
        continue;
      }
      for (l = h, h == f && (A[I++] = j, h = p); h > u; )
        A[I++] = x[h], h = m[h];
      j = x[h] & 255, A[I++] = j, f < t && (m[f] = p, x[f] = j, f++, !(f & c) && f < t && (d++, c += f)), p = l;
    }
    I--, y[E++] = A[I], g++;
  }
  for (g = E; g < o; g++)
    y[g] = 0;
  return y;
};
re.lzw = Ur;
Object.defineProperty(H, "__esModule", {
  value: !0
});
var ye = H.decompressFrames = H.decompressFrame = we = H.parseGIF = void 0, Fr = Dr(pe), Mr = O, Or = k, Pr = ee, zr = re;
function Dr(n) {
  return n && n.__esModule ? n : { default: n };
}
var Rr = function(e) {
  var r = new Uint8Array(e);
  return (0, Mr.parse)((0, Or.buildStream)(r), Fr.default);
}, we = H.parseGIF = Rr, Gr = function(e) {
  for (var r = e.pixels.length, a = new Uint8ClampedArray(r * 4), t = 0; t < r; t++) {
    var i = t * 4, o = e.pixels[t], f = e.colorTable[o] || [0, 0, 0];
    a[i] = f[0], a[i + 1] = f[1], a[i + 2] = f[2], a[i + 3] = o !== e.transparentIndex ? 255 : 0;
  }
  return a;
}, me = function(e, r, a) {
  if (!e.image) {
    console.warn("gif frame does not have associated image.");
    return;
  }
  var t = e.image, i = t.descriptor.width * t.descriptor.height, o = (0, zr.lzw)(t.data.minCodeSize, t.data.blocks, i);
  t.descriptor.lct.interlaced && (o = (0, Pr.deinterlace)(o, t.descriptor.width));
  var f = {
    pixels: o,
    dims: {
      top: e.image.descriptor.top,
      left: e.image.descriptor.left,
      width: e.image.descriptor.width,
      height: e.image.descriptor.height
    }
  };
  return t.descriptor.lct && t.descriptor.lct.exists ? f.colorTable = t.lct : f.colorTable = r, e.gce && (f.delay = (e.gce.delay || 10) * 10, f.disposalType = e.gce.extras.disposal, e.gce.extras.transparentColorGiven && (f.transparentIndex = e.gce.transparentColorIndex)), a && (f.patch = Gr(f)), f;
};
H.decompressFrame = me;
var qr = function(e, r) {
  return e.frames.filter(function(a) {
    return a.image;
  }).map(function(a) {
    return me(a, e.gct, r);
  });
};
ye = H.decompressFrames = qr;
const Vr = async (n) => {
  const e = await fetch(n), r = await Lr(n), a = await e.arrayBuffer(), t = we(a), i = ye(t, !0);
  return r.animated && (r.delayArray = i.map((o) => o.delay)), r;
}, Lr = (n) => new Promise((e, r) => {
  mr(n, (a, t) => {
    if (a)
      console.warn(a), r(a);
    else {
      const i = [], { shape: o } = t, [f, u, c, d] = o, s = u * c;
      for (let l = 0; l < f; ++l) {
        if (l > 0) {
          const p = t.index(l, 0, 0, 0), h = t.index(l - 1, 0, 0, 0);
          for (let g = 0; g < s; ++g) {
            const v = p + g * d;
            if (t.data[v + d - 1] === 0) {
              const y = h + g * d;
              for (let m = 0; m < d; ++m)
                t.data[v + m] = t.data[y + m];
            }
          }
        }
        i.push(t.pick(l));
      }
      e($r(i, u, c));
    }
  });
}), $r = (n, e, r) => {
  const a = document.createElement("canvas"), t = a.getContext("2d");
  return a.width = e * n.length, a.height = r, n.forEach((i, o) => {
    const f = t.createImageData(e, r);
    f.data.set(i.data.slice(e * r * 4 * o, e * r * 4 * (o + 1))), t.putImageData(f, e * o, 0);
  }), {
    animated: n.length > 1,
    width: e,
    height: r,
    spriteData: a.toDataURL()
  };
};
export {
  Vr as gif2Sprite
};
