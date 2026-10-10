/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Tt = globalThis, Vt = Tt.ShadowRoot && (Tt.ShadyCSS === void 0 || Tt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Gt = Symbol(), Jt = /* @__PURE__ */ new WeakMap();
let ye = class {
  constructor(t, e, o) {
    if (this._$cssResult$ = !0, o !== Gt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Vt && t === void 0) {
      const o = e !== void 0 && e.length === 1;
      o && (t = Jt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), o && Jt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const xe = (n) => new ye(typeof n == "string" ? n : n + "", void 0, Gt), Pt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((o, r, i) => o + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + n[i + 1], n[0]);
  return new ye(e, n, Gt);
}, Te = (n, t) => {
  if (Vt) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const o = document.createElement("style"), r = Tt.litNonce;
    r !== void 0 && o.setAttribute("nonce", r), o.textContent = e.cssText, n.appendChild(o);
  }
}, Qt = Vt ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const o of t.cssRules) e += o.cssText;
  return xe(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Se, defineProperty: ke, getOwnPropertyDescriptor: Ce, getOwnPropertyNames: Ee, getOwnPropertySymbols: Pe, getPrototypeOf: Ae } = Object, At = globalThis, te = At.trustedTypes, Me = te ? te.emptyScript : "", He = At.reactiveElementPolyfillSupport, _t = (n, t) => n, St = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Me : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, Wt = (n, t) => !Se(n, t), ee = { attribute: !0, type: String, converter: St, reflect: !1, useDefault: !1, hasChanged: Wt };
Symbol.metadata ??= Symbol("metadata"), At.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let nt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ee) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const o = Symbol(), r = this.getPropertyDescriptor(t, o, e);
      r !== void 0 && ke(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, o) {
    const { get: r, set: i } = Ce(this.prototype, t) ?? { get() {
      return this[e];
    }, set(s) {
      this[e] = s;
    } };
    return { get: r, set(s) {
      const a = r?.call(this);
      i?.call(this, s), this.requestUpdate(t, a, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ee;
  }
  static _$Ei() {
    if (this.hasOwnProperty(_t("elementProperties"))) return;
    const t = Ae(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(_t("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(_t("properties"))) {
      const e = this.properties, o = [...Ee(e), ...Pe(e)];
      for (const r of o) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [o, r] of e) this.elementProperties.set(o, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, o] of this.elementProperties) {
      const r = this._$Eu(e, o);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const o = new Set(t.flat(1 / 0).reverse());
      for (const r of o) e.unshift(Qt(r));
    } else t !== void 0 && e.push(Qt(t));
    return e;
  }
  static _$Eu(t, e) {
    const o = e.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const o of e.keys()) this.hasOwnProperty(o) && (t.set(o, this[o]), delete this[o]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Te(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, o) {
    this._$AK(t, o);
  }
  _$ET(t, e) {
    const o = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, o);
    if (r !== void 0 && o.reflect === !0) {
      const i = (o.converter?.toAttribute !== void 0 ? o.converter : St).toAttribute(e, o.type);
      this._$Em = t, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const o = this.constructor, r = o._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const i = o.getPropertyOptions(r), s = typeof i.converter == "function" ? { fromAttribute: i.converter } : i.converter?.fromAttribute !== void 0 ? i.converter : St;
      this._$Em = r;
      const a = s.fromAttribute(e, i.type);
      this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, o, r = !1, i) {
    if (t !== void 0) {
      const s = this.constructor;
      if (r === !1 && (i = this[t]), o ??= s.getPropertyOptions(t), !((o.hasChanged ?? Wt)(i, e) || o.useDefault && o.reflect && i === this._$Ej?.get(t) && !this.hasAttribute(s._$Eu(t, o)))) return;
      this.C(t, e, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: o, reflect: r, wrapped: i }, s) {
    o && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, s ?? e ?? this[t]), i !== !0 || s !== void 0) || (this._$AL.has(t) || (this.hasUpdated || o || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [r, i] of this._$Ep) this[r] = i;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [r, i] of o) {
        const { wrapped: s } = i, a = this[r];
        s !== !0 || this._$AL.has(r) || a === void 0 || this.C(r, void 0, i, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((o) => o.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
nt.elementStyles = [], nt.shadowRootOptions = { mode: "open" }, nt[_t("elementProperties")] = /* @__PURE__ */ new Map(), nt[_t("finalized")] = /* @__PURE__ */ new Map(), He?.({ ReactiveElement: nt }), (At.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ut = globalThis, oe = (n) => n, kt = Ut.trustedTypes, re = kt ? kt.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, pe = "$lit$", q = `lit$${Math.random().toFixed(9).slice(2)}$`, _e = "?" + q, Ne = `<${_e}>`, tt = document, ut = () => tt.createComment(""), ft = (n) => n === null || typeof n != "object" && typeof n != "function", It = Array.isArray, Oe = (n) => It(n) || typeof n?.[Symbol.iterator] == "function", Dt = `[ 	
\f\r]`, pt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ie = /-->/g, se = />/g, X = RegExp(`>|${Dt}(?:([^\\s"'>=/]+)(${Dt}*=${Dt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ne = /'/g, ae = /"/g, ue = /^(?:script|style|textarea|title)$/i, fe = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), F = fe(1), p = fe(2), at = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), le = /* @__PURE__ */ new WeakMap(), Q = tt.createTreeWalker(tt, 129);
function ge(n, t) {
  if (!It(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return re !== void 0 ? re.createHTML(t) : t;
}
const De = (n, t) => {
  const e = n.length - 1, o = [];
  let r, i = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = pt;
  for (let a = 0; a < e; a++) {
    const l = n[a];
    let c, d, h = -1, y = 0;
    for (; y < l.length && (s.lastIndex = y, d = s.exec(l), d !== null); ) y = s.lastIndex, s === pt ? d[1] === "!--" ? s = ie : d[1] !== void 0 ? s = se : d[2] !== void 0 ? (ue.test(d[2]) && (r = RegExp("</" + d[2], "g")), s = X) : d[3] !== void 0 && (s = X) : s === X ? d[0] === ">" ? (s = r ?? pt, h = -1) : d[1] === void 0 ? h = -2 : (h = s.lastIndex - d[2].length, c = d[1], s = d[3] === void 0 ? X : d[3] === '"' ? ae : ne) : s === ae || s === ne ? s = X : s === ie || s === se ? s = pt : (s = X, r = void 0);
    const _ = s === X && n[a + 1].startsWith("/>") ? " " : "";
    i += s === pt ? l + Ne : h >= 0 ? (o.push(c), l.slice(0, h) + pe + l.slice(h) + q + _) : l + q + (h === -2 ? a : _);
  }
  return [ge(n, i + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), o];
};
class gt {
  constructor({ strings: t, _$litType$: e }, o) {
    let r;
    this.parts = [];
    let i = 0, s = 0;
    const a = t.length - 1, l = this.parts, [c, d] = De(t, e);
    if (this.el = gt.createElement(c, o), Q.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (r = Q.nextNode()) !== null && l.length < a; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const h of r.getAttributeNames()) if (h.endsWith(pe)) {
          const y = d[s++], _ = r.getAttribute(h).split(q), m = /([.?@])?(.*)/.exec(y);
          l.push({ type: 1, index: i, name: m[2], strings: _, ctor: m[1] === "." ? Ke : m[1] === "?" ? Re : m[1] === "@" ? Le : Mt }), r.removeAttribute(h);
        } else h.startsWith(q) && (l.push({ type: 6, index: i }), r.removeAttribute(h));
        if (ue.test(r.tagName)) {
          const h = r.textContent.split(q), y = h.length - 1;
          if (y > 0) {
            r.textContent = kt ? kt.emptyScript : "";
            for (let _ = 0; _ < y; _++) r.append(h[_], ut()), Q.nextNode(), l.push({ type: 2, index: ++i });
            r.append(h[y], ut());
          }
        }
      } else if (r.nodeType === 8) if (r.data === _e) l.push({ type: 2, index: i });
      else {
        let h = -1;
        for (; (h = r.data.indexOf(q, h + 1)) !== -1; ) l.push({ type: 7, index: i }), h += q.length - 1;
      }
      i++;
    }
  }
  static createElement(t, e) {
    const o = tt.createElement("template");
    return o.innerHTML = t, o;
  }
}
function lt(n, t, e = n, o) {
  if (t === at) return t;
  let r = o !== void 0 ? e._$Co?.[o] : e._$Cl;
  const i = ft(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== i && (r?._$AO?.(!1), i === void 0 ? r = void 0 : (r = new i(n), r._$AT(n, e, o)), o !== void 0 ? (e._$Co ??= [])[o] = r : e._$Cl = r), r !== void 0 && (t = lt(n, r._$AS(n, t.values), r, o)), t;
}
class Be {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: o } = this._$AD, r = (t?.creationScope ?? tt).importNode(e, !0);
    Q.currentNode = r;
    let i = Q.nextNode(), s = 0, a = 0, l = o[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let c;
        l.type === 2 ? c = new vt(i, i.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(i, l.name, l.strings, this, t) : l.type === 6 && (c = new Fe(i, this, t)), this._$AV.push(c), l = o[++a];
      }
      s !== l?.index && (i = Q.nextNode(), s++);
    }
    return Q.currentNode = tt, r;
  }
  p(t) {
    let e = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(t, o, e), e += o.strings.length - 2) : o._$AI(t[e])), e++;
  }
}
class vt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, o, r) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = o, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = lt(this, t, e), ft(t) ? t === g || t == null || t === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : t !== this._$AH && t !== at && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Oe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== g && ft(this._$AH) ? this._$AA.nextSibling.data = t : this.T(tt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: o } = t, r = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = gt.createElement(ge(o.h, o.h[0]), this.options)), o);
    if (this._$AH?._$AD === r) this._$AH.p(e);
    else {
      const i = new Be(r, this), s = i.u(this.options);
      i.p(e), this.T(s), this._$AH = i;
    }
  }
  _$AC(t) {
    let e = le.get(t.strings);
    return e === void 0 && le.set(t.strings, e = new gt(t)), e;
  }
  k(t) {
    It(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let o, r = 0;
    for (const i of t) r === e.length ? e.push(o = new vt(this.O(ut()), this.O(ut()), this, this.options)) : o = e[r], o._$AI(i), r++;
    r < e.length && (this._$AR(o && o._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const o = oe(t).nextSibling;
      oe(t).remove(), t = o;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Mt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, o, r, i) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = i, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = g;
  }
  _$AI(t, e = this, o, r) {
    const i = this.strings;
    let s = !1;
    if (i === void 0) t = lt(this, t, e, 0), s = !ft(t) || t !== this._$AH && t !== at, s && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = i[0], l = 0; l < i.length - 1; l++) c = lt(this, a[o + l], e, l), c === at && (c = this._$AH[l]), s ||= !ft(c) || c !== this._$AH[l], c === g ? t = g : t !== g && (t += (c ?? "") + i[l + 1]), this._$AH[l] = c;
    }
    s && !r && this.j(t);
  }
  j(t) {
    t === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ke extends Mt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === g ? void 0 : t;
  }
}
class Re extends Mt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== g);
  }
}
class Le extends Mt {
  constructor(t, e, o, r, i) {
    super(t, e, o, r, i), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = lt(this, t, e, 0) ?? g) === at) return;
    const o = this._$AH, r = t === g && o !== g || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, i = t !== g && (o === g || r);
    r && this.element.removeEventListener(this.name, this, o), i && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Fe {
  constructor(t, e, o) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    lt(this, t);
  }
}
const Ve = Ut.litHtmlPolyfillSupport;
Ve?.(gt, vt), (Ut.litHtmlVersions ??= []).push("3.3.2");
const Ge = (n, t, e) => {
  const o = e?.renderBefore ?? t;
  let r = o._$litPart$;
  if (r === void 0) {
    const i = e?.renderBefore ?? null;
    o._$litPart$ = r = new vt(t.insertBefore(ut(), i), i, void 0, e ?? {});
  }
  return r._$AI(n), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const zt = globalThis;
class Y extends nt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ge(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return at;
  }
}
Y._$litElement$ = !0, Y.finalized = !0, zt.litElementHydrateSupport?.({ LitElement: Y });
const We = zt.litElementPolyfillSupport;
We?.({ LitElement: Y });
(zt.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ue = { attribute: !0, type: String, converter: St, reflect: !1, hasChanged: Wt }, Ie = (n = Ue, t, e) => {
  const { kind: o, metadata: r } = e;
  let i = globalThis.litPropertyMetadata.get(r);
  if (i === void 0 && globalThis.litPropertyMetadata.set(r, i = /* @__PURE__ */ new Map()), o === "setter" && ((n = Object.create(n)).wrapped = !0), i.set(e.name, n), o === "accessor") {
    const { name: s } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(s, l, n, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(s, void 0, n, a), a;
    } };
  }
  if (o === "setter") {
    const { name: s } = e;
    return function(a) {
      const l = this[s];
      t.call(this, a), this.requestUpdate(s, l, n, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function w(n) {
  return (t, e) => typeof e == "object" ? Ie(n, t, e) : ((o, r, i) => {
    const s = r.hasOwnProperty(i);
    return r.constructor.createProperty(i, o), s ? Object.getOwnPropertyDescriptor(r, i) : void 0;
  })(n, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function W(n) {
  return w({ ...n, state: !0, attribute: !1 });
}
function ze(n) {
  return Object.values(n.devices || {}).filter(
    (t) => t.identifiers?.some(
      (e) => Array.isArray(e) && e[0] === "eybond_local"
    )
  ).map((t) => t.id);
}
function je(n) {
  const t = String(n || "").toLowerCase().split(".").pop();
  if (!t) return null;
  for (const e of me)
    if (t.endsWith(`_${e}`))
      return e;
  return null;
}
function Ct(n) {
  if (!n) return "";
  const t = ze(n);
  if (t.length === 0) return "";
  if (t.length === 1) return t[0];
  const e = new Set(t), o = /* @__PURE__ */ new Map();
  for (const i of Object.values(n.entities || {})) {
    const s = i.device_id;
    if (!s || !e.has(s))
      continue;
    const a = typeof i.translation_key == "string" ? i.translation_key.trim() : "";
    (me.has(a) ? a : je(i.entity_id)) && o.set(s, (o.get(s) ?? 0) + 1);
  }
  const r = [...o.entries()].sort(
    (i, s) => s[1] - i[1] || i[0].localeCompare(s[0])
  );
  return r.length === 1 || r.length > 1 && r[0][1] > r[1][1] ? r[0][0] : "";
}
const jt = {
  battery_power: ["battery_power", "battery_average_power"],
  load_energy_today: ["estimated_load_energy_daily", "estimated_load_energy_today"],
  pv_to_home_today: [
    "estimated_pv_to_home_energy_daily",
    "estimated_pv_to_home_energy_today"
  ],
  battery_to_home_today: [
    "estimated_battery_to_home_energy_daily",
    "estimated_battery_to_home_energy_today"
  ],
  grid_to_home_today: [
    "estimated_grid_to_home_energy_daily",
    "estimated_grid_to_home_energy_today"
  ],
  battery_charge_energy_today: [
    "estimated_battery_charge_energy_daily",
    "estimated_battery_charge_energy_today"
  ],
  battery_discharge_energy_today: [
    "estimated_battery_discharge_energy_daily",
    "estimated_battery_discharge_energy_today"
  ],
  power_flow_summary: ["power_flow_summary", "power_flow"]
}, ct = {
  pv_power: "pv_power",
  pv_voltage: "pv_voltage",
  pv_current: "pv_current",
  pv_charging_power: "pv_charging_power",
  inverter_charging_power: "inverter_charging_power",
  pv_energy_today: "estimated_pv_energy_daily",
  pv_energy_total: "pv_energy_total",
  output_power: "output_power",
  output_voltage: "output_voltage",
  load_percent: "load_percent",
  load_energy_today: "estimated_load_energy_daily",
  pv_to_home_power: "pv_to_home_power",
  pv_to_battery_power: "pv_to_battery_power",
  pv_to_grid_power: "pv_to_grid_power",
  battery_to_home_power: "battery_to_home_power",
  grid_to_home_power: "grid_to_home_power",
  grid_to_battery_power: "grid_to_battery_power",
  pv_to_home_today: "estimated_pv_to_home_energy_daily",
  battery_to_home_today: "estimated_battery_to_home_energy_daily",
  grid_to_home_today: "estimated_grid_to_home_energy_daily",
  battery_percent: "battery_percent",
  battery_voltage: "battery_voltage",
  battery_power: "battery_power",
  battery_charge_energy_today: "estimated_battery_charge_energy_daily",
  battery_discharge_energy_today: "estimated_battery_discharge_energy_daily",
  grid_power: "grid_power",
  grid_voltage: "grid_voltage",
  grid_frequency: "grid_frequency",
  grid_import_energy_today: "estimated_grid_import_energy_daily",
  grid_export_energy_today: "estimated_grid_export_energy_daily",
  operating_mode: "operating_mode",
  power_flow_summary: "power_flow_summary"
}, me = /* @__PURE__ */ new Set([
  ...Object.values(ct),
  ...Object.values(jt).flat()
]);
function qe(n, t) {
  const e = n.filter(
    (r) => r.device_id === t && !r.disabled_by && !r.hidden_by
  ), o = {};
  for (const r of Object.keys(ct)) {
    const i = jt[r] ?? [ct[r]];
    let s = null;
    for (const a of i) {
      const l = e.find((c) => c.unique_id.endsWith(`_${a}`));
      if (l) {
        s = l.entity_id;
        break;
      }
    }
    o[r] = s;
  }
  return o;
}
function ce(n, t) {
  if (!t) return n;
  const e = { ...n };
  for (const [o, r] of Object.entries(t)) {
    if (!(o in ct) || typeof r != "string") continue;
    const i = r.trim();
    i && (e[o] = i);
  }
  return e;
}
function Ye(n, t) {
  const e = Object.values(n.entities || {}).filter((r) => r.device_id === t).map((r) => r.entity_id), o = {};
  for (const r of Object.keys(ct)) {
    const s = (jt[r] ?? [ct[r]]).map((a) => e.find((l) => l.endsWith(`_${a}`))).find((a) => !!a);
    o[r] = s ?? null;
  }
  return o;
}
function S(n, t) {
  if (!t) return null;
  const e = n.states[t];
  if (!e || e.state === "unknown" || e.state === "unavailable") return null;
  const o = Number(e.state);
  return Number.isFinite(o) ? o : null;
}
function Ze(n, t) {
  if (!t) return null;
  const e = n.states[t];
  return !e || e.state === "unknown" || e.state === "unavailable" ? null : e.state;
}
function Bt(n, t) {
  return n === null ? { value: "—", unit: t["unit.W"] } : Math.abs(n) >= 1e3 ? { value: de(n / 1e3, 2), unit: t["unit.kW"] } : { value: de(n, 0), unit: t["unit.W"] };
}
function de(n, t) {
  return Number.isFinite(n) ? n.toFixed(t) : "—";
}
function Xe(n, t, e, o, r = {}) {
  const i = Math.max(0, n ?? 0), s = Math.max(0, t ?? 0), a = Math.max(0, e ?? 0), l = Math.max(0, -(e ?? 0)), c = Math.max(0, o ?? 0), d = Math.max(0, -(o ?? 0)), h = Je(r.powerFlowSummary), y = Qe(r.powerFlowSummary), _ = h !== null ? eo(s, h, {
    pv: i,
    battery: l,
    grid: c
  }) : Ft(s, i, l, c), m = oo(
    a,
    y,
    r.pvChargingPower ?? null,
    r.inverterChargingPower ?? null,
    i,
    c,
    _.pv,
    _.grid
  ), v = Math.min(
    d,
    Math.max(0, i - _.pv - m.pv)
  ), b = Math.max(
    0,
    c - _.grid - m.grid
  );
  return {
    pvToHome: _.pv,
    pvToBattery: m.pv,
    pvToGrid: v,
    batteryToHome: _.battery,
    gridToHome: _.grid + b,
    gridToBattery: m.grid
  };
}
function Je(n) {
  if (!n) return null;
  const t = n.match(/(?:^|\|)\s*Load:\s*([^|]+)/);
  return t ? to(t[1]) : null;
}
function Qe(n) {
  if (!n) return null;
  const t = n.match(/(?:^|\|)\s*Battery:\s*([^|]+)/);
  if (!t) return null;
  const e = t[1];
  return e.includes("Charging from PV + Utility") ? "mixed" : e.includes("Charging from PV") ? "pv" : e.includes("Charging from Utility") ? "grid" : null;
}
function to(n) {
  const t = /* @__PURE__ */ new Set();
  return n.includes("PV") && t.add("pv"), n.includes("Battery") && t.add("battery"), n.includes("Utility") && t.add("grid"), t.size ? t : null;
}
function eo(n, t, e) {
  const o = Object.keys(e).filter((s) => t.has(s) && e[s] > 0).map((s) => ({ source: s, power: e[s] }));
  if (!o.length)
    return Ft(n, e.pv, e.battery, e.grid);
  const r = o.reduce((s, a) => s + a.power, 0);
  if (r <= 0)
    return Ft(n, e.pv, e.battery, e.grid);
  const i = { pv: 0, battery: 0, grid: 0 };
  for (const s of o)
    i[s.source] = s.power / r * n;
  return i;
}
function Ft(n, t, e, o) {
  const r = Math.min(t, n), i = Math.max(0, n - r), s = Math.min(e, i), a = Math.max(0, i - s), l = Math.min(o, a);
  return {
    pv: r,
    battery: s,
    grid: l
  };
}
function oo(n, t, e, o, r, i, s, a) {
  if (n <= 0)
    return { pv: 0, grid: 0 };
  const l = Math.max(0, r - s), c = Math.max(0, i - a), d = Math.max(0, e ?? 0), h = Math.max(0, o ?? 0), y = d > 0 ? Math.min(l, d) : l, _ = h > 0 ? Math.min(c, h) : c;
  if (t === "pv")
    return { pv: Math.min(n, y), grid: 0 };
  if (t === "grid")
    return { pv: 0, grid: Math.min(n, _) };
  if (t === "mixed" || d > 0 || h > 0) {
    const b = Math.min(n, y), E = Math.min(
      Math.max(0, n - b),
      _
    );
    return {
      pv: b,
      grid: E
    };
  }
  const m = Math.min(l, n), v = Math.min(c, Math.max(0, n - m));
  return {
    pv: m,
    grid: v
  };
}
function ro(n, t, e) {
  const o = Math.max(0, n ?? 0), r = Math.max(0, t ?? 0), i = Math.max(0, e ?? 0), s = o + r + i;
  return s <= 0 ? {
    pv: 0,
    battery: 0,
    grid: 0,
    unused: 0,
    totals: { pv: 0, battery: 0, grid: 0 }
  } : {
    pv: o / s,
    battery: r / s,
    grid: i / s,
    unused: 0,
    totals: { pv: o, battery: r, grid: i }
  };
}
function io(n, t, e, o) {
  const r = Math.max(0, t ?? 0), i = Math.max(0, -(e ?? 0)), s = Math.max(0, o ?? 0), a = r + i + s, l = n.pvToHome + n.batteryToHome + n.gridToHome, c = Math.max(l, a);
  return c <= 0 ? { pv: 0, battery: 0, grid: 0, unused: 0 } : {
    pv: n.pvToHome / c,
    battery: n.batteryToHome / c,
    grid: n.gridToHome / c,
    unused: Math.max(0, (c - l) / c)
  };
}
function so(n) {
  return n === null || !Number.isFinite(n) ? "#7cff8f" : `hsl(${Math.max(0, Math.min(100, n)) / 100 * 130}, 85%, 55%)`;
}
const mt = {
  pv: "#00f6ff",
  pv_secondary: "#2a56d4",
  home: "#b975ff",
  home_secondary: "#d95ac6",
  battery: "#7cff8f",
  battery_secondary: "#13b6a8",
  grid: "#ffb454",
  grid_secondary: "#e26257"
}, no = Object.keys(
  mt
), ao = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, lo = /^(?:rgb|rgba|hsl|hsla)\([^\n\r]+\)$/i, co = /^var\(\s*--[A-Za-z0-9_-]+\s*\)$/, ho = /^[A-Za-z][A-Za-z0-9-]*$/;
function yo(n, t) {
  const e = n?.trim();
  return e && (ao.test(e) || lo.test(e) || co.test(e) || ho.test(e)) ? e : t;
}
function po(n) {
  const t = { ...mt };
  for (const e of no)
    t[e] = yo(n?.[e], mt[e]);
  return t;
}
function _o(n) {
  return [
    `--eybond-color-pv: ${n.pv}`,
    `--eybond-color-pv-secondary: ${n.pv_secondary}`,
    `--eybond-color-home: ${n.home}`,
    `--eybond-color-home-secondary: ${n.home_secondary}`,
    `--eybond-color-battery: ${n.battery}`,
    `--eybond-color-battery-secondary: ${n.battery_secondary}`,
    `--eybond-color-grid: ${n.grid}`,
    `--eybond-color-grid-secondary: ${n.grid_secondary}`
  ].join("; ");
}
const ve = {
  "node.pv": "PV",
  "node.home": "Home",
  "node.battery": "Battery",
  "node.grid": "Grid",
  "suffix.today": "today",
  "unit.W": "W",
  "unit.kW": "kW",
  "unit.V": "V",
  "unit.Hz": "Hz",
  "unit.kWh": "kWh",
  "unit.Wh": "Wh",
  "err.no_sensors": "No EyeBond Local sensors found for device {device}. Check that the integration is loaded and the device id is correct.",
  "err.need_device": "You need to specify a device",
  "err.invalid_config": "Invalid configuration",
  loading: "Loading…",
  "editor.device": "Device",
  "editor.name": "Card title (optional)",
  "editor.show_power_flow": "Show power flow diagram",
  "editor.show_charts": "Show history charts",
  "editor.show_pv": "Show PV (solar) node",
  "editor.show_grid": "Show Grid node",
  "editor.show_battery": "Show Battery node",
  "editor.auto_hide_nodes": "Auto-hide nodes without data",
  "editor.icon_scale": "Icon scale",
  "editor.text_scale": "Text scale",
  "editor.weather_entity": "Weather entity (optional)",
  "editor.color_pv": "PV current power color (optional)",
  "editor.color_pv_secondary": "PV daily generation color (optional)",
  "editor.color_home": "Home current power color (optional)",
  "editor.color_home_secondary": "Home daily energy color (optional)",
  "editor.color_battery": "Battery primary color (optional)",
  "editor.color_battery_secondary": "Battery secondary chart color (optional)",
  "editor.color_grid": "Grid live power color (optional)",
  "editor.color_grid_secondary": "Grid daily import color (optional)",
  "editor.override_pv_power": "PV power entity (optional)",
  "editor.override_output_power": "Load power entity (optional)",
  "editor.override_battery_percent": "Battery SoC entity (optional)",
  "editor.override_battery_voltage": "Battery voltage entity (optional)",
  "editor.override_battery_power": "Battery power entity (optional)",
  "editor.override_grid_power": "Grid power entity (optional)",
  "editor.override_grid_voltage": "Grid voltage entity (optional)",
  "editor.override_grid_frequency": "Grid frequency entity (optional)",
  "editor.override_pv_energy_today": "PV daily energy entity (optional)",
  "editor.override_pv_voltage": "PV voltage entity (optional)",
  "editor.override_pv_current": "PV current entity (optional)",
  "editor.override_pv_energy_total": "PV total energy entity (optional)",
  "editor.override_load_energy_today": "Home daily energy entity (optional)",
  "editor.override_battery_charge_energy_today": "Battery charge today entity (optional)",
  "editor.override_battery_discharge_energy_today": "Battery discharge today entity (optional)",
  "editor.override_grid_import_energy_today": "Grid import today entity (optional)",
  "editor.override_grid_export_energy_today": "Grid export today entity (optional)",
  "editor.override_pv_to_home_power": "PV to Home flow entity (optional)",
  "editor.override_pv_to_battery_power": "PV to Battery flow entity (optional)",
  "editor.override_pv_to_grid_power": "PV to Grid flow entity (optional)",
  "editor.override_battery_to_home_power": "Battery to Home flow entity (optional)",
  "editor.override_grid_to_home_power": "Grid to Home flow entity (optional)",
  "editor.override_grid_to_battery_power": "Grid to Battery flow entity (optional)",
  "editor.override_pv_to_home_today": "PV to Home daily energy entity (optional)",
  "editor.override_battery_to_home_today": "Battery to Home daily energy entity (optional)",
  "editor.override_grid_to_home_today": "Grid to Home daily energy entity (optional)",
  "weather.cloud_cover": "Cloud cover"
}, uo = {
  "node.pv": "Сонячні панелі",
  "node.home": "Дім",
  "node.battery": "Батарея",
  "node.grid": "Мережа",
  "suffix.today": "сьогодні",
  "unit.W": "Вт",
  "unit.kW": "кВт",
  "unit.V": "В",
  "unit.Hz": "Гц",
  "unit.kWh": "кВт·г",
  "unit.Wh": "Вт·г",
  "err.no_sensors": "Не знайдено сенсорів EyeBond Local для пристрою {device}. Переконайтеся, що інтеграція завантажена і ідентифікатор пристрою вказаний правильно.",
  "err.need_device": "Потрібно вказати пристрій",
  "err.invalid_config": "Некоректна конфігурація",
  loading: "Завантаження…",
  "editor.device": "Пристрій",
  "editor.name": "Заголовок картки (необов'язково)",
  "editor.show_power_flow": "Показувати схему потоків",
  "editor.show_charts": "Показувати графіки історії",
  "editor.show_pv": "Показувати вузол PV (сонце)",
  "editor.show_grid": "Показувати вузол мережі",
  "editor.show_battery": "Показувати вузол батареї",
  "editor.auto_hide_nodes": "Автоматично ховати вузли без даних",
  "editor.icon_scale": "Масштаб іконок",
  "editor.text_scale": "Масштаб тексту",
  "editor.weather_entity": "Сутність погоди (необов'язково)",
  "editor.color_pv": "Колір поточної потужності PV (необов'язково)",
  "editor.color_pv_secondary": "Колір денної генерації PV (необов'язково)",
  "editor.color_home": "Колір поточної потужності Дому (необов'язково)",
  "editor.color_home_secondary": "Колір денної енергії Дому (необов'язково)",
  "editor.color_battery": "Основний колір Батареї (необов'язково)",
  "editor.color_battery_secondary": "Вторинний колір графіка Батареї (необов'язково)",
  "editor.color_grid": "Колір живої потужності Мережі (необов'язково)",
  "editor.color_grid_secondary": "Колір денного імпорту Мережі (необов'язково)",
  "editor.override_pv_power": "Сутність потужності PV (необов'язково)",
  "editor.override_output_power": "Сутність потужності навантаження (необов'язково)",
  "editor.override_battery_percent": "Сутність заряду батареї (необов'язково)",
  "editor.override_battery_voltage": "Сутність напруги батареї (необов'язково)",
  "editor.override_battery_power": "Сутність потужності батареї (необов'язково)",
  "editor.override_grid_power": "Сутність потужності мережі (необов'язково)",
  "editor.override_grid_voltage": "Сутність напруги мережі (необов'язково)",
  "editor.override_grid_frequency": "Сутність частоти мережі (необов'язково)",
  "editor.override_pv_energy_today": "Сутність денної енергії PV (необов'язково)",
  "editor.override_pv_voltage": "Сутність напруги PV (необов'язково)",
  "editor.override_pv_current": "Сутність струму PV (необов'язково)",
  "editor.override_pv_energy_total": "Сутність загальної енергії PV (необов'язково)",
  "editor.override_load_energy_today": "Сутність денної енергії дому (необов'язково)",
  "editor.override_battery_charge_energy_today": "Сутність денного заряду батареї (необов'язково)",
  "editor.override_battery_discharge_energy_today": "Сутність денного розряду батареї (необов'язково)",
  "editor.override_grid_import_energy_today": "Сутність денного імпорту з мережі (необов'язково)",
  "editor.override_grid_export_energy_today": "Сутність денного експорту в мережу (необов'язково)",
  "editor.override_pv_to_home_power": "Сутність потоку PV → Дім (необов'язково)",
  "editor.override_pv_to_battery_power": "Сутність потоку PV → Батарея (необов'язково)",
  "editor.override_pv_to_grid_power": "Сутність потоку PV → Мережа (необов'язково)",
  "editor.override_battery_to_home_power": "Сутність потоку Батарея → Дім (необов'язково)",
  "editor.override_grid_to_home_power": "Сутність потоку Мережа → Дім (необов'язково)",
  "editor.override_grid_to_battery_power": "Сутність потоку Мережа → Батарея (необов'язково)",
  "editor.override_pv_to_home_today": "Сутність денної енергії PV → Дім (необов'язково)",
  "editor.override_battery_to_home_today": "Сутність денної енергії Батарея → Дім (необов'язково)",
  "editor.override_grid_to_home_today": "Сутність денної енергії Мережа → Дім (необов'язково)",
  "weather.cloud_cover": "Хмарність"
}, fo = {
  "node.pv": "Солнечные панели",
  "node.home": "Дом",
  "node.battery": "Батарея",
  "node.grid": "Сеть",
  "suffix.today": "сегодня",
  "unit.W": "Вт",
  "unit.kW": "кВт",
  "unit.V": "В",
  "unit.Hz": "Гц",
  "unit.kWh": "кВт·ч",
  "unit.Wh": "Вт·ч",
  "err.no_sensors": "Не найдено сенсоров EyeBond Local для устройства {device}. Убедитесь, что интеграция загружена и идентификатор устройства указан правильно.",
  "err.need_device": "Необходимо указать устройство",
  "err.invalid_config": "Некорректная конфигурация",
  loading: "Загрузка…",
  "editor.device": "Устройство",
  "editor.name": "Заголовок карточки (необязательно)",
  "editor.show_power_flow": "Показывать схему потоков",
  "editor.show_charts": "Показывать графики истории",
  "editor.show_pv": "Показывать узел PV (солнце)",
  "editor.show_grid": "Показывать узел сети",
  "editor.show_battery": "Показывать узел батареи",
  "editor.auto_hide_nodes": "Автоматически скрывать узлы без данных",
  "editor.icon_scale": "Масштаб иконок",
  "editor.text_scale": "Масштаб текста",
  "editor.weather_entity": "Сущность погоды (необязательно)",
  "editor.color_pv": "Цвет текущей мощности PV (необязательно)",
  "editor.color_pv_secondary": "Цвет дневной генерации PV (необязательно)",
  "editor.color_home": "Цвет текущей мощности дома (необязательно)",
  "editor.color_home_secondary": "Цвет дневной энергии дома (необязательно)",
  "editor.color_battery": "Основной цвет батареи (необязательно)",
  "editor.color_battery_secondary": "Вторичный цвет графика батареи (необязательно)",
  "editor.color_grid": "Цвет живой мощности сети (необязательно)",
  "editor.color_grid_secondary": "Цвет дневного импорта сети (необязательно)",
  "editor.override_pv_power": "Сущность мощности PV (необязательно)",
  "editor.override_output_power": "Сущность мощности нагрузки (необязательно)",
  "editor.override_battery_percent": "Сущность заряда батареи (необязательно)",
  "editor.override_battery_voltage": "Сущность напряжения батареи (необязательно)",
  "editor.override_battery_power": "Сущность мощности батареи (необязательно)",
  "editor.override_grid_power": "Сущность мощности сети (необязательно)",
  "editor.override_grid_voltage": "Сущность напряжения сети (необязательно)",
  "editor.override_grid_frequency": "Сущность частоты сети (необязательно)",
  "editor.override_pv_energy_today": "Сущность дневной энергии PV (необязательно)",
  "editor.override_pv_voltage": "Сущность напряжения PV (необязательно)",
  "editor.override_pv_current": "Сущность тока PV (необязательно)",
  "editor.override_pv_energy_total": "Сущность общей энергии PV (необязательно)",
  "editor.override_load_energy_today": "Сущность дневной энергии дома (необязательно)",
  "editor.override_battery_charge_energy_today": "Сущность дневного заряда батареи (необязательно)",
  "editor.override_battery_discharge_energy_today": "Сущность дневного разряда батареи (необязательно)",
  "editor.override_grid_import_energy_today": "Сущность дневного импорта из сети (необязательно)",
  "editor.override_grid_export_energy_today": "Сущность дневного экспорта в сеть (необязательно)",
  "editor.override_pv_to_home_power": "Сущность потока PV → Дом (необязательно)",
  "editor.override_pv_to_battery_power": "Сущность потока PV → Батарея (необязательно)",
  "editor.override_pv_to_grid_power": "Сущность потока PV → Сеть (необязательно)",
  "editor.override_battery_to_home_power": "Сущность потока Батарея → Дом (необязательно)",
  "editor.override_grid_to_home_power": "Сущность потока Сеть → Дом (необязательно)",
  "editor.override_grid_to_battery_power": "Сущность потока Сеть → Батарея (необязательно)",
  "editor.override_pv_to_home_today": "Сущность дневной энергии PV → Дом (необязательно)",
  "editor.override_battery_to_home_today": "Сущность дневной энергии Батарея → Дом (необязательно)",
  "editor.override_grid_to_home_today": "Сущность дневной энергии Сеть → Дом (необязательно)",
  "weather.cloud_cover": "Облачность"
}, go = {
  en: ve,
  uk: uo,
  ru: fo
};
function Et(n) {
  const t = (n || "en").split("-")[0].toLowerCase(), e = go[t] || {}, o = { ...ve };
  for (const r of Object.keys(e)) {
    const i = e[r];
    i !== void 0 && (o[r] = i);
  }
  return o;
}
function Ht(n, t) {
  const e = customElements.get(n);
  if (!e) {
    customElements.define(n, t);
    return;
  }
  e !== t && console.warn(
    `[eybond-local-card] custom element already defined: ${n}`
  );
}
function mo(n) {
  window.customCards = window.customCards || [], !window.customCards.some((t) => t.type === n.type) && window.customCards.push(n);
}
var vo = Object.defineProperty, T = (n, t, e, o) => {
  for (var r = void 0, i = n.length - 1, s; i >= 0; i--)
    (s = n[i]) && (r = s(t, e, r) || r);
  return r && vo(t, e, r), r;
};
const bo = 1, wo = 34;
function he(n) {
  return !Number.isFinite(n) || n <= 0 ? 1 : Math.min(1.6, Math.max(0.8, n));
}
const f = {
  pv: { x: 180, y: 55 },
  grid: { x: 50, y: 160 },
  battery: { x: 310, y: 160 },
  home: { x: 180, y: 265 }
}, $o = {
  pv: 30,
  grid: 32,
  battery: 36,
  home: 42
};
class $ extends Y {
  constructor() {
    super(...arguments), this.i18n = Et("en"), this.colors = mt, this.pvPower = null, this.loadPower = null, this.batteryPower = null, this.gridPower = null, this.batterySoc = null, this.flows = {
      pvToHome: 0,
      pvToBattery: 0,
      pvToGrid: 0,
      batteryToHome: 0,
      gridToHome: 0,
      gridToBattery: 0
    }, this.homeShares = {
      pv: 0,
      battery: 0,
      grid: 0,
      unused: 0
    }, this.pvTodayKwh = null, this.pvVoltage = null, this.pvCurrent = null, this.pvTotalKwh = null, this.homeTodayKwh = null, this.homeSplitTotals = null, this.batteryChargeToday = null, this.batteryDischargeToday = null, this.gridVoltage = null, this.gridFrequency = null, this.gridImportToday = null, this.gridExportToday = null, this.gridExportEnabled = !1, this.weatherCondition = null, this.cloudCoverage = null, this.isNight = !1, this.showPv = !0, this.showGrid = !0, this.showBattery = !0, this.iconScale = 1, this.textScale = 1, this._uid = Math.random().toString(36).slice(2, 8);
  }
  _iconScale() {
    return he(this.iconScale);
  }
  _textScale() {
    return he(this.textScale);
  }
  /**
   * Text inside a node group is already visually multiplied by the group's
   * icon transform, so it gets textScale ÷ iconScale — text size then tracks
   * `text_scale` alone instead of compounding with `icon_scale`.
   */
  _groupTextScale() {
    return this._textScale() / this._iconScale();
  }
  /**
   * Vertical gap between stacked label lines inside a node group. Grows with
   * the *visual* text size so enlarged text never overlaps the line above it
   * (visual gap = base × max(iconScale, textScale)).
   */
  _stackGap(t) {
    return t * Math.max(1, this._groupTextScale());
  }
  _nodeRadius(t) {
    return $o[t] * this._iconScale();
  }
  _nodeTransform(t) {
    const e = this._iconScale();
    if (e === 1) return "";
    const { x: o, y: r } = f[t];
    return `translate(${o} ${r}) scale(${e}) translate(${-o} ${-r})`;
  }
  _nodeGroupStyle() {
    return `--elc-text-scale: ${this._groupTextScale().toFixed(3)}`;
  }
  /** Which of the six physical flows are visible given the hidden nodes. */
  _flowVisibility() {
    return {
      pvToHome: this.showPv,
      pvToBattery: this.showPv && this.showBattery,
      pvToGrid: this.showPv && this.showGrid,
      batteryToHome: this.showBattery,
      gridToHome: this.showGrid,
      gridToBattery: this.showGrid && this.showBattery
    };
  }
  /**
   * ViewBox tightens around the visible nodes (hidden PV crops the top,
   * hidden grid/battery crop the sides) and grows when enlarged icons or
   * text stacks would otherwise spill past the default 360×385 bounds.
   */
  _viewBox() {
    const t = this._iconScale(), e = Math.max(1, this._groupTextScale()), o = Math.max(92 * t, 92 * this._textScale()), r = this.showPv ? Math.min(0, f.pv.y - (24 + 28 * e + 12) * t + 9) : Math.min(108, f.grid.y - 38 * t - 6), i = Math.max(
      385,
      f.home.y + (62 + 36 * e) * t + 12
    ), s = this.showGrid ? 0 : Math.max(0, f.home.x - o), a = this.showBattery ? 360 : Math.min(
      360,
      f.home.x + Math.max(
        o,
        this.showPv && this.weatherCondition ? 138 : 0
      )
    );
    return `${s.toFixed(0)} ${r.toFixed(0)} ${(a - s).toFixed(0)} ${(i - r).toFixed(0)}`;
  }
  static {
    this.styles = Pt`
    :host {
      display: block;
      width: 100%;
      --eybond-color-pv: #00f6ff;
      --eybond-color-home: #b975ff;
      --eybond-color-battery: #7cff8f;
      --eybond-color-grid: #ffb454;
    }

    svg {
      width: 100%;
      height: auto;
      max-width: 460px;
      margin: 0 auto;
      display: block;
      overflow: visible;
    }

    /* ---- flow lines ---- */

    .line {
      fill: none;
      stroke: rgba(255, 255, 255, 0.07);
      stroke-width: 2;
      stroke-linecap: round;
      transition: stroke 0.4s ease;
    }

    .line.active {
      stroke: var(--flow-color, #fff);
      stroke-width: 2.8;
      stroke-dasharray: 7 9;
      filter: drop-shadow(0 0 5px var(--flow-color, #fff));
      animation: flow 1.4s linear infinite;
    }

    @keyframes flow {
      from {
        stroke-dashoffset: 16;
      }
      to {
        stroke-dashoffset: 0;
      }
    }

    /* ---- node styling ---- */

    .node {
      transition: filter 0.3s ease, opacity 0.3s ease;
      cursor: pointer;
    }

    .node.idle {
      opacity: 0.55;
    }

    .node .node-value {
      font-size: calc(15px * var(--elc-text-scale, 1));
      font-weight: 700;
      fill: #fff;
      text-anchor: middle;
      font-variant-numeric: tabular-nums;
      font-family: -apple-system, system-ui, "Segoe UI", sans-serif;
    }

    .node .node-unit {
      font-size: calc(10px * var(--elc-text-scale, 1));
      fill: rgba(255, 255, 255, 0.55);
      text-anchor: middle;
      font-family: -apple-system, system-ui, sans-serif;
      letter-spacing: 0.05em;
    }

    .node .node-sub {
      font-size: calc(9px * var(--elc-text-scale, 1));
      fill: rgba(255, 255, 255, 0.45);
      text-anchor: middle;
      font-family: -apple-system, system-ui, sans-serif;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    /* ---- solar panel ---- */

    .panel-body {
      fill: rgba(10, 18, 32, 0.92);
      stroke: var(--node-accent, #00f6ff);
      stroke-width: 1.5;
      transition: filter 0.3s ease;
    }

    .node.active .panel-body {
      filter: drop-shadow(0 0 8px var(--node-accent, #00f6ff));
    }

    .panel-cells line {
      stroke: var(--node-accent, #00f6ff);
      stroke-width: 0.8;
      opacity: 0.25;
      transition: opacity 0.3s ease;
    }

    .node.active .panel-cells line {
      opacity: 0.5;
      animation: cellPulse 2.4s ease-in-out infinite;
    }

    @keyframes cellPulse {
      0%, 100% { opacity: 0.35; }
      50% { opacity: 0.75; }
    }

    .panel-pole {
      stroke: var(--node-accent, #00f6ff);
      opacity: 0.5;
      stroke-linecap: round;
    }

    .node.idle .panel-body {
      stroke: var(--node-accent, #00f6ff);
      stroke-opacity: 0.3;
    }

    .node.idle .panel-cells line {
      stroke: var(--node-accent, #00f6ff);
      opacity: 0.15;
    }

    /* energy sparks — small dots rising from the panel when generating */
    .spark {
      display: none;
    }
    .node.active .spark {
      display: block;
    }

    /* ---- weather icon ---- */

    .weather-icon {
      opacity: 0.9;
    }

    /* ---- battery ---- */

    .battery-body {
      fill: rgba(12, 16, 24, 0.85);
      stroke: rgba(255, 255, 255, 0.35);
      stroke-width: 2;
      transition: stroke 0.3s ease, filter 0.3s ease;
    }

    .node.active .battery-body {
      stroke: var(--eybond-color-battery, #7cff8f);
      filter: drop-shadow(0 0 10px var(--eybond-color-battery, #7cff8f));
    }

    .battery-terminal {
      fill: rgba(255, 255, 255, 0.55);
      transition: fill 0.3s ease;
    }

    .node.active .battery-terminal {
      fill: var(--eybond-color-battery, #7cff8f);
    }

    /* ---- power tower ---- */

    .tower line,
    .tower path {
      stroke: var(--grid-color, #ffb454);
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
      filter: drop-shadow(0 0 4px var(--grid-color, #ffb454));
    }

    .node.idle .tower line,
    .node.idle .tower path {
      filter: none;
      stroke: var(--grid-color, #ffb454);
      stroke-opacity: 0.5;
    }

    /* Power line wires at the top — animate dashes when active to show
       electricity running through them. */
    .tower-wires line {
      stroke-width: 2.2;
    }
    .node.active .tower-wires line {
      stroke-dasharray: 4 3;
      animation: wireFlow 0.7s linear infinite;
    }
    @keyframes wireFlow {
      from { stroke-dashoffset: 7; }
      to { stroke-dashoffset: 0; }
    }

    /* ---- house ---- */

    .house {
      fill: var(--home-color, #b975ff);
      stroke: var(--home-color, #b975ff);
      stroke-width: 1.2;
      stroke-linejoin: round;
      filter: drop-shadow(0 0 5px var(--home-color, #b975ff));
    }

    .node.idle .house {
      filter: none;
      fill: var(--home-color, #b975ff);
      stroke: var(--home-color, #b975ff);
      fill-opacity: 0.5;
      stroke-opacity: 0.5;
    }

    .home-ring-bg {
      fill: none;
      stroke: rgba(255, 255, 255, 0.09);
      stroke-width: 4;
    }

    .home-ring-seg {
      fill: none;
      stroke-width: 4;
      stroke-linecap: butt;
      transition: stroke-dasharray 0.4s ease;
    }

    .home-ring-seg.pv {
      stroke: var(--eybond-color-pv, #00f6ff);
      filter: drop-shadow(0 0 3px var(--eybond-color-pv, #00f6ff));
    }
    .home-ring-seg.battery {
      stroke: var(--eybond-color-battery, #7cff8f);
      filter: drop-shadow(0 0 3px var(--eybond-color-battery, #7cff8f));
    }
    .home-ring-seg.grid {
      stroke: var(--eybond-color-grid, #ffb454);
      filter: drop-shadow(0 0 3px var(--eybond-color-grid, #ffb454));
    }

    /* flow-power labels placed on active flow lines */
    .flow-label {
      font-size: calc(11px * var(--elc-text-scale, 1));
      font-weight: 700;
      fill: var(--flow-color, #fff);
      text-anchor: middle;
      font-variant-numeric: tabular-nums;
      font-family: -apple-system, system-ui, sans-serif;
      paint-order: stroke;
      stroke: #0b1220;
      stroke-width: 3;
      stroke-linejoin: round;
    }

    /* segment labels on the home ring */
    .ring-label {
      font-size: calc(9.5px * var(--elc-text-scale, 1));
      font-weight: 700;
      text-anchor: middle;
      dominant-baseline: central;
      font-variant-numeric: tabular-nums;
      font-family: -apple-system, system-ui, sans-serif;
      paint-order: stroke;
      stroke: #0b1220;
      stroke-width: 2.5;
      stroke-linejoin: round;
    }
    .ring-label.pv {
      fill: var(--eybond-color-pv, #00f6ff);
    }
    .ring-label.battery {
      fill: var(--eybond-color-battery, #7cff8f);
    }
    .ring-label.grid {
      fill: var(--eybond-color-grid, #ffb454);
    }

    /* battery liquid waves */
    .liquid-fill {
      transition: fill 0.4s ease;
    }

    /* per-node sub-info (today kWh / V / Hz) */
    .node-info {
      font-size: calc(9.5px * var(--elc-text-scale, 1));
      fill: rgba(255, 255, 255, 0.55);
      text-anchor: middle;
      font-family: -apple-system, system-ui, sans-serif;
      letter-spacing: 0.03em;
    }
    .node-info em {
      font-style: normal;
      fill: rgba(255, 255, 255, 0.85);
      font-weight: 600;
    }

    /* Node name caption (PV / Home / Battery / Grid). Matches .node-info in
       size and letter-spacing but gets highlighted in the node accent color
       when the node is active (participating in a flow). */
    .node-label {
      font-size: calc(9.5px * var(--elc-text-scale, 1));
      text-anchor: middle;
      font-family: -apple-system, system-ui, sans-serif;
      letter-spacing: 0.04em;
      fill: rgba(255, 255, 255, 0.55);
      font-weight: 500;
      transition: fill 0.3s ease, font-weight 0.3s ease;
    }
    .node.active .node-label {
      fill: var(--node-accent, #ffffff);
      font-weight: 700;
    }

     /* prominent daily-total line, colored per-node via inline style. PV/Home
       accumulated values intentionally use the secondary palette so they match
       the paired secondary series in the history charts. */
    .node-total {
      font-size: calc(12.5px * var(--elc-text-scale, 1));
      font-weight: 700;
      text-anchor: middle;
      font-variant-numeric: tabular-nums;
      font-family: -apple-system, system-ui, sans-serif;
      letter-spacing: 0.01em;
    }

    /* larger current-power line (used by Home). Same coloring convention. */
    .node-value-lg {
      font-size: calc(15px * var(--elc-text-scale, 1));
      font-weight: 700;
      text-anchor: middle;
      font-variant-numeric: tabular-nums;
      font-family: -apple-system, system-ui, sans-serif;
      letter-spacing: -0.01em;
    }
  `;
  }
  render() {
    const t = this._activations(), e = this.batterySoc, o = so(e), r = e !== null ? Math.max(0, Math.min(100, e)) : 0;
    return F`
      <svg
        viewBox="${this._viewBox()}"
        role="img"
        aria-label="Power flow"
        style="${_o(this.colors)}; --elc-text-scale: ${this._textScale()}"
      >
        <defs>
          <clipPath id="battery-clip-${this._uid}">
            <rect x="-18" y="-30" width="36" height="60" rx="5" ry="5" />
          </clipPath>
          <linearGradient
            id="soc-grad-${this._uid}"
            x1="0"
            y1="1"
            x2="0"
            y2="0"
          >
            <stop offset="0" stop-color=${o} stop-opacity="0.95" />
            <stop offset="1" stop-color=${o} stop-opacity="0.55" />
          </linearGradient>
        </defs>

        ${this._renderLines(t)}
        ${this._renderFlowLabels(t)}
        ${this.showPv ? p`<g transform="${this._nodeTransform("pv")}" style="${this._nodeGroupStyle()}" @click=${() => this._emitNodeClick("pv")}>
              ${this._renderSolarPanel(
      t.pvToHome || t.pvToBattery || t.pvToGrid
    )}
            </g>
            ${this._renderWeather()}` : g}
        ${this.showGrid ? p`<g transform="${this._nodeTransform("grid")}" style="${this._nodeGroupStyle()}" @click=${() => this._emitNodeClick("grid")}>
              ${this._renderGridTower(
      t.gridToHome || t.gridToBattery || t.pvToGrid
    )}
            </g>` : g}
        ${this.showBattery ? p`<g transform="${this._nodeTransform("battery")}" style="${this._nodeGroupStyle()}" @click=${() => this._emitNodeClick("battery")}>
              ${this._renderBattery(
      t.pvToBattery || t.gridToBattery || t.batteryToHome,
      r,
      e
    )}
            </g>` : g}
        <g transform="${this._nodeTransform("home")}" style="${this._nodeGroupStyle()}" @click=${() => this._emitNodeClick("home")}>
          ${this._renderHouse(
      t.pvToHome || t.batteryToHome || t.gridToHome
    )}
        </g>
      </svg>
    `;
  }
  // ---------- Flow power labels ----------
  _renderFlowLabels(t) {
    const e = {
      pvToHome: { dx: 28, dy: -8 },
      // right of vertical (unchanged)
      pvToGrid: { dx: 25, dy: 11 },
      // inside diamond, top-left quad
      pvToBattery: { dx: -25, dy: 11 },
      // inside diamond, top-right quad
      gridToHome: { dx: 25, dy: -11 },
      // inside diamond, bottom-left quad
      batteryToHome: { dx: -25, dy: -11 },
      // inside diamond, bottom-right quad
      gridToBattery: { dx: 0, dy: -20 }
      // above horizontal, left third
    }, o = (a, l, c = 0.5) => ({
      x: a.x + (l.x - a.x) * c,
      y: a.y + (l.y - a.y) * c
    }), r = this._flowVisibility(), i = [
      { key: "pvToHome", from: f.pv, to: f.home },
      { key: "pvToBattery", from: f.pv, to: f.battery },
      { key: "pvToGrid", from: f.pv, to: f.grid },
      { key: "batteryToHome", from: f.battery, to: f.home },
      { key: "gridToHome", from: f.grid, to: f.home },
      { key: "gridToBattery", from: f.grid, to: f.battery, t: 0.3 }
    ].filter((a) => r[a.key]), s = Math.max(1, this._textScale());
    return p`
      ${i.map((a) => {
      if (!t[a.key]) return g;
      const l = Bt(this.flows[a.key], this.i18n), c = o(a.from, a.to, a.t), d = e[a.key];
      return p`
          <text
            class="flow-label"
            x=${c.x + d.dx * s}
            y=${c.y + d.dy * s}
            style=${`--flow-color: ${this._flowColor(a.key)}`}
          >${l.value} ${l.unit}</text>
        `;
    })}
    `;
  }
  _flowColor(t) {
    switch (t) {
      case "pvToHome":
      case "pvToBattery":
      case "pvToGrid":
        return this.colors.pv;
      case "batteryToHome":
        return this.colors.battery;
      case "gridToHome":
      case "gridToBattery":
        return this.colors.grid;
    }
  }
  _emitNodeClick(t) {
    this.dispatchEvent(
      new CustomEvent("node-click", {
        detail: { node: t },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _activations() {
    const t = {};
    for (const e of Object.keys(this.flows))
      t[e] = (this.flows[e] ?? 0) > bo;
    return t;
  }
  // ---------- Lines ----------
  _renderLines(t) {
    const e = (d, h, y, _) => {
      const m = h.x - d.x, v = h.y - d.y, b = Math.hypot(m, v) || 1, E = m / b, C = v / b, k = d.x + E * y, P = d.y + C * y, K = h.x - E * _, O = h.y - C * _;
      return `M ${k.toFixed(1)} ${P.toFixed(1)} L ${K.toFixed(1)} ${O.toFixed(1)}`;
    }, o = wo * this._iconScale(), r = (d) => {
      const h = d.x - f.home.x, y = d.y - f.home.y, _ = Math.hypot(h, y) || 1;
      return {
        x: f.home.x + h / _ * o,
        y: f.home.y + y / _ * o
      };
    }, i = this._nodeRadius("pv"), s = this._nodeRadius("grid"), a = this._nodeRadius("battery"), l = this._flowVisibility(), c = [
      {
        key: "pvToHome",
        d: e(f.pv, r(f.pv), i, 2)
      },
      {
        key: "pvToBattery",
        d: e(f.pv, f.battery, i, a)
      },
      {
        key: "pvToGrid",
        d: e(f.pv, f.grid, i, s)
      },
      {
        key: "batteryToHome",
        d: e(f.battery, r(f.battery), a, 2)
      },
      {
        key: "gridToHome",
        d: e(f.grid, r(f.grid), s, 2)
      },
      {
        key: "gridToBattery",
        d: e(f.grid, f.battery, s, a)
      }
    ].filter((d) => l[d.key]);
    return p`
      ${c.map(
      (d) => p`
          <path
            class="line ${t[d.key] ? "active" : ""}"
            d=${d.d}
            style=${`--flow-color: ${this._flowColor(d.key)}`}
          />
        `
    )}
    `;
  }
  // ---------- Solar Panel (PV) ----------
  _renderSolarPanel(t) {
    const e = f.pv.x, o = f.pv.y, r = Bt(this.pvPower, this.i18n), s = `${this.pvTodayKwh !== null ? this.pvTodayKwh.toFixed(2) : "—"} ${this.i18n["unit.kWh"]} ${this.i18n["suffix.today"]}`, v = this.pvVoltage !== null ? `${this.pvVoltage.toFixed(1)} V` : null, c = this.pvCurrent !== null ? `${this.pvCurrent.toFixed(1)} A` : null, total = this.pvTotalKwh !== null ? `(всего ${this.pvTotalKwh.toFixed(2)} ${this.i18n["unit.kWh"]})` : null;
    return p`
      <g
        class="node ${t ? "active" : "idle"}"
        style="--node-accent: ${this.colors.pv}"
      >
        <g transform="translate(${e} ${o})">
          <!-- tilted solar panel -->
          <g transform="rotate(-12)">
            <rect class="panel-body" x="-24" y="-14" width="48" height="28" rx="2" />
            <g class="panel-cells">
              <!-- 3 horizontal cell dividers -->
              <line x1="-24" y1="-4.67" x2="24" y2="-4.67" />
              <line x1="-24" y1="4.67" x2="24" y2="4.67" />
              <!-- 4 vertical cell dividers -->
              <line x1="-12" y1="-14" x2="-12" y2="14" />
              <line x1="0" y1="-14" x2="0" y2="14" />
              <line x1="12" y1="-14" x2="12" y2="14" />
            </g>
          </g>
          <!-- support pole -->
          <line class="panel-pole" x1="0" y1="13" x2="0" y2="22" stroke-width="2.5" />
          <line class="panel-pole" x1="-8" y1="22" x2="8" y2="22" stroke-width="2" />

          <!-- energy sparks rising from the panel surface when generating -->
          ${t ? p`
                <circle class="spark" cx="-10" cy="-10" r="1.5" fill="${this.colors.pv}">
                  <animate attributeName="cy" from="-10" to="-18" dur="1.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.85" to="0" dur="1.6s" repeatCount="indefinite" />
                </circle>
                <circle class="spark" cx="5" cy="-10" r="1.5" fill="${this.colors.pv}">
                  <animate attributeName="cy" from="-10" to="-18" dur="2.2s" begin="0.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.85" to="0" dur="2.2s" begin="0.5s" repeatCount="indefinite" />
                </circle>
                <circle class="spark" cx="14" cy="-10" r="1.2" fill="${this.colors.pv}">
                  <animate attributeName="cy" from="-10" to="-18" dur="1.9s" begin="1.1s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.85" to="0" dur="1.9s" begin="1.1s" repeatCount="indefinite" />
                </circle>
              ` : g}
        </g>
        <!-- labels above the panel — below would collide with flow lines.
             The stack is anchored at its bottom line (closest to the icon)
             and grows upward with the text scale so lines never overlap. -->
        ${(() => {
      const a = this._stackGap(14);
      return p`
            <text class="node-label" x=${e} y=${o - 24 - 2 * a}>${this.i18n["node.pv"]}</text>
            <text
              class="node-value-lg"
              x=${e}
              y=${o - 24 - a}
              style="fill: ${this.colors.pv}"
            >${r.value} ${r.unit}${v ? p`<tspan style="fill:#42a5f5;font-size:.72em;font-weight:600">   ${v}</tspan>` : g}${c ? p`<tspan style="fill:#ffb74d;font-size:.72em;font-weight:600">   ${c}</tspan>` : g}</text>
            <text
              class="node-total"
              x=${e}
              y=${o - 24}
              style="fill: ${this.colors.pv_secondary}"
            >${s}${total ? p`<tspan style="fill:#ab86ff;font-size:.72em;font-weight:600">   ${total}</tspan>` : g}</text>
          `;
    })()}
      </g>
    `;
  }
  // ---------- Weather icon (near PV node) ----------
  _renderWeather() {
    if (!this.weatherCondition) return g;
    const t = f.pv.x + 48, e = f.pv.y - 4, o = this.cloudCoverage !== null ? `${this.i18n["weather.cloud_cover"]}: ${Math.round(this.cloudCoverage)}%` : "";
    return p`
      <g class="weather-icon" transform="translate(${t} ${e}) scale(1.6)">
        ${this._weatherShape(this.weatherCondition, this.isNight)}
        ${o ? p`<text
              x="-7"
              y="17"
              text-anchor="start"
              font-size="${(5.5 * this._textScale()).toFixed(1)}"
              fill="rgba(255,255,255,0.6)"
              style="font-family: system-ui, sans-serif"
            >${o}</text>` : g}
      </g>
    `;
  }
  /**
   * Returns a small SVG fragment for the given HA weather condition.
   * Icons are hand-drawn ~20×20 px shapes.
   */
  _weatherShape(t, e) {
    const o = p`
      <g>
        <path
          d="M -1,-8 C -8,-6 -8,2 -1,4 C -3.5,2 -3.5,-6 -1,-8 Z"
          fill="#f0e6a0"
          transform="translate(-3, -2)"
        >
          <animate attributeName="opacity" values="0.75;1;0.75" dur="4s" repeatCount="indefinite" />
        </path>
        <!-- twinkling stars -->
        <circle cx="5" cy="-6" r="0.7" fill="#fffde8">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="7" cy="0" r="0.5" fill="#fffde8">
          <animate attributeName="opacity" values="0.2;0.9;0.2" dur="3.1s" begin="0.7s" repeatCount="indefinite" />
        </circle>
        <circle cx="3" cy="4" r="0.6" fill="#fffde8">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2.8s" begin="1.3s" repeatCount="indefinite" />
        </circle>
      </g>
    `, r = p`
      <circle cx="-3" cy="-3" r="4" fill="#ffd700" opacity="0.85" />
      <g>
        ${[0, 45, 90, 135, 180, 225, 270, 315].map((i) => {
      const s = i * Math.PI / 180;
      return p`<line
            x1=${-3 + Math.cos(s) * 5.5} y1=${-3 + Math.sin(s) * 5.5}
            x2=${-3 + Math.cos(s) * 8} y2=${-3 + Math.sin(s) * 8}
            stroke="#ffd700" stroke-width="1" stroke-linecap="round" opacity="0.6"
          />`;
    })}
        <animateTransform attributeName="transform" type="rotate"
          from="0 -3 -3" to="360 -3 -3" dur="20s" repeatCount="indefinite" />
      </g>
    `;
    switch (t) {
      case "sunny":
        return e ? p`
            <g>
              <path
                d="M 0,-7 C -8,-5 -8,5 0,7 C -3,5 -3,-5 0,-7 Z"
                fill="#f0e6a0"
              >
                <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" />
              </path>
              <circle cx="8" cy="-5" r="0.8" fill="#fffde8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="9" cy="3" r="0.6" fill="#fffde8">
                <animate attributeName="opacity" values="0.2;0.9;0.2" dur="3s" begin="0.8s" repeatCount="indefinite" />
              </circle>
              <circle cx="5" cy="6" r="0.7" fill="#fffde8">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" begin="1.5s" repeatCount="indefinite" />
              </circle>
            </g>
          ` : p`
          <circle cx="0" cy="0" r="5" fill="#ffd700" />
          <g>
            ${[0, 45, 90, 135, 180, 225, 270, 315].map((i) => {
          const s = i * Math.PI / 180;
          return p`<line
                x1=${Math.cos(s) * 7} y1=${Math.sin(s) * 7}
                x2=${Math.cos(s) * 10} y2=${Math.sin(s) * 10}
                stroke="#ffd700" stroke-width="1.5" stroke-linecap="round"
              />`;
        })}
            <animateTransform attributeName="transform" type="rotate"
              from="0" to="360" dur="20s" repeatCount="indefinite" />
          </g>
        `;
      case "clear-night":
        return p`
          <g>
            <path
              d="M 0,-7 C -8,-5 -8,5 0,7 C -3,5 -3,-5 0,-7 Z"
              fill="#f0e6a0"
            >
              <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" />
            </path>
            <circle cx="8" cy="-5" r="0.8" fill="#fffde8">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="9" cy="3" r="0.6" fill="#fffde8">
              <animate attributeName="opacity" values="0.2;0.9;0.2" dur="3s" begin="0.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="5" cy="6" r="0.7" fill="#fffde8">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" begin="1.5s" repeatCount="indefinite" />
            </circle>
          </g>
        `;
      case "partlycloudy":
        return p`
          ${e ? o : r}
          <g>
            <ellipse cx="2" cy="1" rx="7" ry="4.5" fill="#b0bdd4" />
            <ellipse cx="-2" cy="-1" rx="5" ry="3.5" fill="#c5d0e2" />
            <animateTransform attributeName="transform" type="translate"
              values="-1,0; 1,0; -1,0" dur="5s" repeatCount="indefinite" />
          </g>
        `;
      case "cloudy":
      case "fog":
        return p`
          <g>
            <ellipse cx="0" cy="0" rx="8" ry="5" fill="#a0aec4" />
            <ellipse cx="-4" cy="-2" rx="5.5" ry="4" fill="#b8c8dc" />
            <animateTransform attributeName="transform" type="translate"
              values="-1,0; 1,0; -1,0" dur="6s" repeatCount="indefinite" />
          </g>
        `;
      case "rainy":
      case "pouring":
        return p`
          <g>
            <ellipse cx="0" cy="-2" rx="8" ry="5" fill="#8a9ab4" />
            <ellipse cx="-4" cy="-4" rx="5.5" ry="3.5" fill="#9eaec5" />
            <animateTransform attributeName="transform" type="translate"
              values="0,0; 1,0; 0,0" dur="5s" repeatCount="indefinite" />
          </g>
          ${[-4, 0, 4].map((i, s) => p`
            <line x1=${i} y1="4" x2=${i - 1.5} y2="9" stroke="#7db8e8" stroke-width="1.2" opacity="0">
              <animate attributeName="opacity" values="0;0.8;0" dur="0.8s"
                begin="${s * 0.25}s" repeatCount="indefinite" />
              <animate attributeName="y1" values="3;8" dur="0.8s"
                begin="${s * 0.25}s" repeatCount="indefinite" />
              <animate attributeName="y2" values="8;13" dur="0.8s"
                begin="${s * 0.25}s" repeatCount="indefinite" />
            </line>
          `)}
        `;
      case "snowy":
      case "snowy-rainy":
        return p`
          <ellipse cx="0" cy="-2" rx="8" ry="5" fill="#a0aec4" />
          ${[-4, 0, 4].map((i, s) => p`
            <circle cx=${i} cy="6" r="1.4" fill="#e2eaf6" opacity="0">
              <animate attributeName="cy" values="5;12" dur="1.8s"
                begin="${s * 0.5}s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.9;0" dur="1.8s"
                begin="${s * 0.5}s" repeatCount="indefinite" />
            </circle>
          `)}
        `;
      case "lightning":
      case "lightning-rainy":
        return p`
          <ellipse cx="0" cy="-2" rx="8" ry="5" fill="#8090a8" />
          <path d="M 0 2 L -2 5.5 L 1 5.5 L -1 10" fill="none"
            stroke="#ffe066" stroke-width="1.8" stroke-linejoin="round" opacity="0">
            <animate attributeName="opacity" values="0;0;1;0;0;0;1;0;0;0" dur="3s" repeatCount="indefinite" />
          </path>
        `;
      default:
        return p`
          <ellipse cx="0" cy="0" rx="7" ry="4.5" fill="#a0aec4" opacity="0.7" />
        `;
    }
  }
  // ---------- Power tower (Grid) ----------
  _renderGridTower(t) {
    const e = f.grid.x, o = f.grid.y, r = this.gridImportToday !== null ? Kt(this.gridImportToday, this.i18n) : "", i = this.gridExportEnabled && this.gridExportToday !== null ? Kt(this.gridExportToday, this.i18n) : "", s = r ? `↓ ${r}` : "", a = i ? `↑ ${i}` : "";
    return p`
      <g
        class="node ${t ? "active" : "idle"}"
        style="--grid-color: ${this.colors.grid}; --node-accent: ${this.colors.grid}"
      >
        <g class="tower" transform="translate(${e} ${o})">
          <!-- outer legs -->
          <line x1="-14" y1="28" x2="-7" y2="-24" />
          <line x1="14" y1="28" x2="7" y2="-24" />
          <!-- inner cross braces -->
          <line x1="-14" y1="28" x2="7" y2="-24" />
          <line x1="14" y1="28" x2="-7" y2="-24" />
          <!-- crossbars -->
          <line x1="-13" y1="14" x2="13" y2="14" />
          <line x1="-10" y1="-2" x2="10" y2="-2" />
          <line x1="-8" y1="-18" x2="8" y2="-18" />
          <!-- top arms holding power lines -->
          <g class="tower-wires">
            <line x1="-12" y1="-20" x2="-4" y2="-24" />
            <line x1="12" y1="-20" x2="4" y2="-24" />
          </g>
          <!-- Top horizontal wire: static line when idle, running sine when
               active to visualize AC current on the power line. -->
          ${t ? p`
                <defs>
                  <clipPath id="wire-clip-${this._uid}">
                    <rect x="-15" y="-33" width="30" height="10" />
                  </clipPath>
                </defs>
                <g clip-path="url(#wire-clip-${this._uid})">
                  <path
                    fill="none"
                    stroke="var(--grid-color, #ffb454)"
                    stroke-width="2"
                    stroke-linecap="round"
                    filter="drop-shadow(0 0 4px var(--grid-color, #ffb454))"
                    d="M -28 -28 Q -24.5 -31 -21 -28 T -14 -28 T -7 -28 T 0 -28 T 7 -28 T 14 -28 T 21 -28 T 28 -28"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      from="0 0"
                      to="-14 0"
                      dur="0.8s"
                      repeatCount="indefinite"
                    />
                  </path>
                </g>
              ` : p`<line x1="-14" y1="-28" x2="14" y2="-28" />`}
        </g>
        ${(() => {
      const l = this._stackGap(14);
      return p`
            <text class="node-label" x=${e} y=${o + 44}>${this.i18n["node.grid"]}</text>
            ${s ? p`<text class="node-total" x=${e} y=${o + 44 + l} fill="${this.colors.grid_secondary}">${s}</text>` : g}
            ${a ? p`<text class="node-total" x=${e} y=${o + 44 + (s ? 2 : 1) * l} fill="#ff6b6b">${a}</text>` : g}
          `;
    })()}
      </g>
    `;
  }
  // ---------- Battery with liquid fill + sloshing wave animation ----------
  _renderBattery(t, e, o) {
    const r = f.battery.x, i = f.battery.y, s = -30, a = 60, l = s + a, c = 18, d = s + a * (1 - e / 100), h = 1.6, y = 7, _ = c * 2, m = (b, E) => {
      let C = `M ${-_} ${b}`, k = !0;
      for (let P = -_; P < _; P += y) {
        const K = P + y / 2, O = b + (k ? -1 : 1) * h * 2 * E;
        C += ` Q ${K} ${O} ${P + y} ${b}`, k = !k;
      }
      return C += ` L ${_} ${l} L ${-_} ${l} Z`, C;
    }, v = xo(
      this.batteryChargeToday,
      this.batteryDischargeToday,
      this.i18n
    );
    return p`
      <g
        class="node ${t ? "active" : "idle"}"
        style="--node-accent: ${this.colors.battery}"
      >
        <g transform="translate(${r} ${i})">
          <!-- terminal bump on top -->
          <rect class="battery-terminal" x="-7" y="-34" width="14" height="4" rx="1" />
          <!-- outline body -->
          <rect class="battery-body" x="-18" y="-30" width="36" height="60" rx="5" ry="5" />
          <!-- Two liquid wave layers clipped to the battery body. Each uses
               SMIL <animateTransform> to slide horizontally by one wavelength
               (2 × segLen = 14) so the pattern loops seamlessly. -->
          ${o !== null ? t ? p`
                  <g clip-path="url(#battery-clip-${this._uid})">
                    <!-- back wave (slower, more transparent) -->
                    <g>
                      <path
                        class="liquid-fill"
                        d=${m(d + 1, -1)}
                        fill="url(#soc-grad-${this._uid})"
                        opacity="0.55"
                      />
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        from="0 0"
                        to="${y * 2} 0"
                        dur="4.6s"
                        repeatCount="indefinite"
                      />
                    </g>
                    <!-- front wave (faster, opaque) -->
                    <g>
                      <path
                        class="liquid-fill"
                        d=${m(d, 1)}
                        fill="url(#soc-grad-${this._uid})"
                      />
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        from="0 0"
                        to="${-y * 2} 0"
                        dur="3.2s"
                        repeatCount="indefinite"
                      />
                    </g>
                  </g>
                ` : p`
                  <!-- Idle: flat static fill, no wave animation -->
                  <g clip-path="url(#battery-clip-${this._uid})">
                    <rect
                      x="${-c}"
                      y="${d}"
                      width="${c * 2}"
                      height="${l - d}"
                      fill="url(#soc-grad-${this._uid})"
                    />
                  </g>
                ` : g}
          <!-- SoC percentage inside battery body.
               When there's enough liquid to contain the text with padding,
               we place it at the *vertical center of the liquid region*.
               When the liquid is too thin (low SoC) we fall back to just
               above the wave line, in the dark empty area. Fill is a cool
               neutral grey so the same color reads on both dark bg and the
               bright green→red liquid gradient. -->
          ${o !== null ? (() => {
      const b = 7 * this._groupTextScale(), E = d + b + 4, C = l - b - 3, k = E <= C, P = (d + l) / 2, K = Math.max(E, Math.min(C, P)), O = d - 8;
      return p`
                  <text
                    x="0"
                    y=${k ? K : O}
                    text-anchor="middle"
                    dominant-baseline="central"
                    font-size="${(13 * this._groupTextScale()).toFixed(1)}"
                    font-weight="700"
                    fill="#d4d8e0"
                    stroke="rgba(10, 15, 26, 0.92)"
                    stroke-width="2.4"
                    paint-order="stroke fill"
                    style="font-family: system-ui, sans-serif; font-variant-numeric: tabular-nums"
                  >${Math.round(e)}%</text>
                `;
    })() : g}
        </g>
        ${(() => {
      const b = this._stackGap(14);
      return p`
            <text class="node-label" x=${r} y=${i + 48}>${this.i18n["node.battery"]}</text>
            ${v !== null && v.charge !== null ? p`<text class="node-total" x=${r} y=${i + 48 + b} fill="${this.colors.battery}">↑ ${v.charge} ${v.unit}</text>` : g}
            ${v !== null && v.discharge !== null ? p`<text class="node-total" x=${r} y=${i + 48 + (v.charge !== null ? 2 : 1) * b} fill="#ff6b6b">↓ ${v.discharge} ${v.unit}</text>` : g}
          `;
    })()}
      </g>
    `;
  }
  // ---------- House with segmented consumption ring ----------
  _renderHouse(t) {
    const e = f.home.x, o = f.home.y, r = 34, i = 2 * Math.PI * r, s = this.homeShares, a = 5e-3, l = s.pv > a, c = s.battery > a, d = s.grid > a, h = [l, c, d].filter(Boolean).length, y = 3, _ = h >= 2 ? h : 0, m = i - y * _, v = l ? Math.max(2, m * s.pv) : 0, b = c ? Math.max(2, m * s.battery) : 0, E = d ? Math.max(2, m * s.grid) : 0, C = _ > 0 ? y : 0;
    let k = 0;
    const P = k;
    l && (k += v + C);
    const K = k;
    c && (k += b + C);
    const O = k, U = (L, B) => ({
      dasharray: `${Math.max(0, L)} ${Math.max(0, i - L)}`,
      dashoffset: -B
    }), I = U(v, P), z = U(b, K), V = U(E, O), G = Bt(this.loadPower, this.i18n), et = this.homeTodayKwh !== null ? `${this.homeTodayKwh.toFixed(2)} ${this.i18n["unit.kWh"]} ${this.i18n["suffix.today"]}` : `— ${this.i18n["unit.kWh"]} ${this.i18n["suffix.today"]}`, u = [];
    if (this.homeSplitTotals) {
      const L = this.homeSplitTotals, B = (Ot, ht) => {
        ht !== null && ht > 0 && u.push({ color: Ot, value: Kt(ht, this.i18n) });
      };
      B(this.colors.grid, L.grid), B(this.colors.pv, L.pv), B(this.colors.battery, L.battery);
    }
    const R = 55 * Math.max(1, this._groupTextScale()), D = u.length * R, j = e - D / 2, dt = this._stackGap(16), ot = this._stackGap(12), rt = this._stackGap(8), A = o + 50, wt = A + dt, it = wt + ot, $t = it + rt;
    return p`
      <g
        class="node ${t ? "active" : "idle"}"
        style="--home-color: ${this.colors.home}; --node-accent: ${this.colors.home}"
      >
        <!-- Ring background + gapped segments -->
        <g transform="translate(${e} ${o}) rotate(-90)">
          <circle class="home-ring-bg" r=${r} />
          ${l ? p`<circle class="home-ring-seg pv" r=${r}
                stroke-dasharray=${I.dasharray}
                stroke-dashoffset=${I.dashoffset} />` : g}
          ${c ? p`<circle class="home-ring-seg battery" r=${r}
                stroke-dasharray=${z.dasharray}
                stroke-dashoffset=${z.dashoffset} />` : g}
          ${d ? p`<circle class="home-ring-seg grid" r=${r}
                stroke-dasharray=${V.dasharray}
                stroke-dashoffset=${V.dashoffset} />` : g}
        </g>
        <!-- House icon inside the ring -->
        <g transform="translate(${e} ${o - 2})">
          <path
            class="house"
            d="M -18 2 L 0 -16 L 18 2 L 18 16 L 6 16 L 6 4 L -6 4 L -6 16 L -18 16 Z"
          />
        </g>
        <!-- Sub-info stack below the ring, tight like other nodes -->
        <text class="node-label" x=${e} y=${A}>${this.i18n["node.home"]}</text>
        <text
          class="node-value-lg"
          x=${e}
          y=${wt}
          style="fill: ${this.colors.home}"
        >${G.value} ${G.unit}</text>
        <text
          class="node-total"
          x=${e}
          y=${it}
          style="fill: ${this.colors.home_secondary}"
        >${et}</text>
        <!-- Legend: colored squares + kWh values -->
        ${u.map(
      (L, B) => p`
            <rect
              x=${j + B * R}
              y=${$t}
              width="8"
              height="8"
              rx="1.5"
              fill=${L.color}
            />
            <text
              x=${j + B * R + 12}
              y=${$t + 8}
              font-size="${(9 * this._groupTextScale()).toFixed(1)}"
              fill="rgba(255,255,255,0.65)"
              style="font-family: system-ui, sans-serif; font-variant-numeric: tabular-nums"
            >${L.value}</text>
          `
    )}
      </g>
    `;
  }
}
T([
  w({ attribute: !1 })
], $.prototype, "i18n");
T([
  w({ attribute: !1 })
], $.prototype, "colors");
T([
  w({ type: Number })
], $.prototype, "pvPower");
T([
  w({ type: Number })
], $.prototype, "loadPower");
T([
  w({ type: Number })
], $.prototype, "batteryPower");
T([
  w({ type: Number })
], $.prototype, "gridPower");
T([
  w({ type: Number })
], $.prototype, "batterySoc");
T([
  w({ attribute: !1 })
], $.prototype, "flows");
T([
  w({ attribute: !1 })
], $.prototype, "homeShares");
T([
  w({ type: Number })
], $.prototype, "pvTodayKwh");
T([
  w({ type: Number })
], $.prototype, "pvVoltage");
T([
  w({ type: Number })
], $.prototype, "pvCurrent");
T([
  w({ type: Number })
], $.prototype, "pvTotalKwh");
T([
  w({ type: Number })
], $.prototype, "homeTodayKwh");
T([
  w({ attribute: !1 })
], $.prototype, "homeSplitTotals");
T([
  w({ type: Number })
], $.prototype, "batteryChargeToday");
T([
  w({ type: Number })
], $.prototype, "batteryDischargeToday");
T([
  w({ type: Number })
], $.prototype, "gridVoltage");
T([
  w({ type: Number })
], $.prototype, "gridFrequency");
T([
  w({ type: Number })
], $.prototype, "gridImportToday");
T([
  w({ type: Number })
], $.prototype, "gridExportToday");
T([
  w({ type: Boolean })
], $.prototype, "gridExportEnabled");
T([
  w({ type: String })
], $.prototype, "weatherCondition");
T([
  w({ type: Number })
], $.prototype, "cloudCoverage");
T([
  w({ type: Boolean })
], $.prototype, "isNight");
T([
  w({ type: Boolean })
], $.prototype, "showPv");
T([
  w({ type: Boolean })
], $.prototype, "showGrid");
T([
  w({ type: Boolean })
], $.prototype, "showBattery");
T([
  w({ type: Number })
], $.prototype, "iconScale");
T([
  w({ type: Number })
], $.prototype, "textScale");
Ht("eybond-power-flow", $);
function Kt(n, t) {
  return !Number.isFinite(n) || n <= 0 ? "" : n >= 1 ? `${n.toFixed(1)} ${t["unit.kWh"]}` : `${Math.round(n * 1e3)} ${t["unit.Wh"]}`;
}
function xo(n, t, e) {
  const o = n ?? 0, r = t ?? 0;
  if (o <= 0 && r <= 0) return null;
  const s = Math.max(o, r) >= 1, a = s ? e["unit.kWh"] : e["unit.Wh"], l = (c) => s ? c.toFixed(1) : Math.round(c * 1e3).toString();
  return {
    charge: o > 0 ? l(o) : null,
    discharge: r > 0 ? l(r) : null,
    both: o > 0 && r > 0,
    unit: a
  };
}
var To = Object.defineProperty, N = (n, t, e, o) => {
  for (var r = void 0, i = n.length - 1, s; i >= 0; i--)
    (s = n[i]) && (r = s(t, e, r) || r);
  return r && To(t, e, r), r;
};
const M = 360, J = 160, x = { top: 16, right: 44, bottom: 22, left: 44 }, xt = M - x.left - x.right, st = J - x.top - x.bottom;
class H extends Y {
  constructor() {
    super(...arguments), this.node = "home", this.colors = mt, this.hiddenNodes = [], this.textScale = 1, this._series = [], this._loading = !1, this._cursorT = null, this._viewStart = 0, this._viewEnd = -1, this._dateOffset = 0, this._lastFetchKey = "", this._fetchGen = 0, this._pinchStartDist = 0, this._pinchStartRange = 0, this._pinchStartCenter = 0, this._gestureActive = !1, this._bounceAnim = null;
  }
  static {
    this.styles = Pt`
    :host {
      display: block;
    }

    .chart-header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 4px 8px 6px;
    }

    .nav-btn {
      background: none;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 6px;
      color: rgba(255, 255, 255, 0.6);
      font-size: calc(14px * var(--elc-text-scale, 1));
      padding: 2px 8px;
      cursor: pointer;
      font-family: system-ui, sans-serif;
      transition: all 0.15s ease;
    }

    .nav-btn:hover {
      border-color: rgba(255, 255, 255, 0.35);
      color: #fff;
    }

    .nav-btn:disabled {
      opacity: 0.25;
      cursor: default;
    }

    .date-input {
      font-size: calc(11px * var(--elc-text-scale, 1));
      color: rgba(255, 255, 255, 0.7);
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 6px;
      padding: 2px 8px;
      font-family: system-ui, sans-serif;
      font-variant-numeric: tabular-nums;
      text-align: center;
      cursor: pointer;
      color-scheme: dark;
      min-width: 90px;
    }

    .date-input::-webkit-calendar-picker-indicator {
      filter: invert(0.7);
      cursor: pointer;
    }

    .chart-tabs {
      display: flex;
      gap: 6px;
      padding: 0 8px 8px;
      justify-content: center;
    }

    .tab {
      font-size: calc(11px * var(--elc-text-scale, 1));
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 4px 12px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: transparent;
      color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: -apple-system, system-ui, sans-serif;
    }

    .tab:hover {
      border-color: rgba(255, 255, 255, 0.25);
      color: rgba(255, 255, 255, 0.8);
    }

    .tab.active {
      border-color: var(--tab-accent, #fff);
      color: var(--tab-accent, #fff);
      background: rgba(255, 255, 255, 0.04);
    }

    .chart-container {
      padding: 4px 4px 4px;
      position: relative;
    }

    svg.chart-svg {
      width: 100%;
      height: auto;
      display: block;
      touch-action: none;
    }

    .axis-label {
      font-size: calc(7.5px * var(--elc-text-scale, 1));
      fill: rgba(255, 255, 255, 0.4);
      font-family: system-ui, sans-serif;
      font-variant-numeric: tabular-nums;
    }

    .axis-unit {
      font-size: calc(7px * var(--elc-text-scale, 1));
      fill: rgba(255, 255, 255, 0.3);
      font-family: system-ui, sans-serif;
    }

    .grid-line {
      stroke: rgba(255, 255, 255, 0.06);
      stroke-width: 0.5;
    }

    .zero-line {
      stroke: rgba(255, 255, 255, 0.18);
      stroke-width: 0.7;
      stroke-dasharray: 3 2;
    }

    .data-line {
      fill: none;
      stroke-width: 1.5;
      stroke-linejoin: round;
      stroke-linecap: round;
    }

    .data-line.dashed {
      stroke-dasharray: 4 3;
      stroke-width: 1.2;
    }

    .cursor-line {
      stroke: rgba(255, 255, 255, 0.35);
      stroke-width: 0.5;
      stroke-dasharray: 2 2;
    }

    .cursor-dot {
      stroke-width: 1.5;
    }

    .cursor-label {
      font-size: calc(8px * var(--elc-text-scale, 1));
      fill: #fff;
      font-family: system-ui, sans-serif;
      font-variant-numeric: tabular-nums;
    }

    .cursor-bg {
      fill: rgba(10, 15, 26, 0.88);
      rx: 3;
    }

    .loading {
      text-anchor: middle;
      font-size: calc(10px * var(--elc-text-scale, 1));
      fill: rgba(255, 255, 255, 0.4);
      font-family: system-ui, sans-serif;
    }
  `;
  }
  _textScale() {
    const t = this.textScale;
    return !Number.isFinite(t) || t <= 0 ? 1 : Math.min(1.6, Math.max(0.8, t));
  }
  willUpdate(t) {
    if (this.style.setProperty("--elc-text-scale", String(this._textScale())), !this.hass || !this.entities) return;
    const e = this._entitiesForNode(), o = `${this.node}:${this._dateOffset}:${e.map((r) => r.id).join(",")}`;
    o !== this._lastFetchKey && (this._lastFetchKey = o, this._viewStart = 0, this._viewEnd = -1, this._cursorT = null, this._fetchAllHistory(e));
  }
  updated() {
    const t = this.renderRoot.querySelector(
      "svg.chart-svg"
    );
    t && !t.__wb && (t.addEventListener(
      "wheel",
      (e) => this._onWheel(e),
      { passive: !1 }
    ), t.__wb = !0);
  }
  render() {
    const t = [
      { id: "home", label: this.i18n["node.home"], accent: this._accentForNode("home") },
      { id: "pv", label: this.i18n["node.pv"], accent: this._accentForNode("pv") },
      {
        id: "battery",
        label: this.i18n["node.battery"],
        accent: this._accentForNode("battery")
      },
      { id: "grid", label: this.i18n["node.grid"], accent: this._accentForNode("grid") }
    ].filter((e) => !this.hiddenNodes.includes(e.id));
    return F`
      <div class="chart-tabs">
        ${t.map(
      (e) => F`
            <button
              class="tab ${this.node === e.id ? "active" : ""}"
              style="--tab-accent: ${e.accent}"
              @click=${() => this._selectNode(e.id)}
            >
              ${e.label}
            </button>
          `
    )}
      </div>
      <div class="chart-header">
        <button class="nav-btn" @click=${this._prevDay}>←</button>
        <input
          class="date-input"
          type="date"
          .value=${this._isoDate()}
          max=${this._isoDate(0)}
          @change=${this._onDatePicked}
        />
        <button
          class="nav-btn"
          ?disabled=${this._dateOffset >= 0}
          @click=${this._nextDay}
        >→</button>
      </div>
      <div class="chart-container">${this._renderChart()}</div>
    `;
  }
  // ---- Chart rendering ----
  _renderChart() {
    if (this._loading)
      return F`
        <svg class="chart-svg" viewBox="0 0 ${M} ${J}">
          <text class="loading" x=${M / 2} y=${J / 2}>
            ${this.i18n.loading}
          </text>
        </svg>
      `;
    if (!this._series.length || !this._series.some((u) => u.data.length))
      return F`
        <svg class="chart-svg" viewBox="0 0 ${M} ${J}">
          <text class="loading" x=${M / 2} y=${J / 2}>—</text>
        </svg>
      `;
    const t = this._dateOffset === 0, e = /* @__PURE__ */ new Date(), o = t ? e.getHours() * 60 + e.getMinutes() : 1440, r = this._viewStart, i = this._viewEnd < 0 ? Math.max(o, 60) : this._viewEnd, s = i - r || 1, a = this._series.filter((u) => u.axis === "left"), l = this._series.filter((u) => u.axis === "right"), c = this._yRange(a), d = this._yRange(l), h = (u) => x.left + (u - r) / s * xt, y = (u) => x.top + st - (u - c.min) / (c.range || 1) * st, _ = (u) => x.top + st - (u - d.min) / (d.range || 1) * st, v = [5, 10, 15, 30, 60, 120, 240, 360, 480, 720].find((u) => Math.floor(s / u) <= 6) ?? 720, b = Math.ceil(r / v) * v, E = [];
    for (let u = b; u <= i; u += v) {
      const R = Math.floor(u / 60), D = Math.round(u % 60);
      E.push({
        x: h(u),
        label: v < 60 ? `${R}:${String(D).padStart(2, "0")}` : `${R}:00`
      });
    }
    const C = 4, k = this._yLabels(c, C, y), P = l.length ? this._yLabels(d, C, _) : [], K = this.i18n["unit.W"], O = l.some((u) => u.isPercent) ? "%" : this.i18n["unit.kWh"], U = a[0]?.color ?? "rgba(255,255,255,0.4)", I = l[0]?.color ?? "rgba(255,255,255,0.4)", z = c.min < 0 && c.max > 0, V = z ? y(0) : null, G = this._cursorT, et = G !== null ? h(G) : null;
    return F`
      <svg
        class="chart-svg"
        viewBox="0 0 ${M} ${J}"
        @pointerdown=${this._onPointerDown}
        @pointermove=${this._onPointerMove}
        @pointerleave=${this._onPointerLeave}
        @touchstart=${this._onTouchStart}
        @touchmove=${this._onTouchMove}
        @touchend=${this._onTouchEnd}
      >
        <!-- Left Y grid + labels -->
        ${k.map(
      (u) => p`
            <line class="grid-line"
              x1=${x.left} y1=${u.y}
              x2=${M - x.right} y2=${u.y} />
            <text class="axis-label" x=${x.left - 4} y=${u.y + 3}
              text-anchor="end" style="fill: ${U}; opacity: 0.6">${u.label}</text>
          `
    )}
        <text class="axis-unit" x=${x.left} y=${x.top - 6}
          text-anchor="middle" style="fill: ${U}; opacity: 0.5">${K}</text>

        <!-- Right Y labels (colored to match right series) -->
        ${P.map(
      (u) => p`
            <text class="axis-label" x=${M - x.right + 4} y=${u.y + 3}
              text-anchor="start" style="fill: ${I}; opacity: 0.6">${u.label}</text>
          `
    )}
        ${l.length ? p`<text class="axis-unit" x=${M - x.right} y=${x.top - 6}
              text-anchor="middle" style="fill: ${I}; opacity: 0.5">${O}</text>` : g}

        <!-- Zero line -->
        ${V !== null ? p`<line class="zero-line"
              x1=${x.left} y1=${V}
              x2=${M - x.right} y2=${V} />` : g}

        <!-- Time labels -->
        ${E.map(
      (u) => p`
            <text class="axis-label" x=${u.x} y=${J - 4}
              text-anchor="middle">${u.label}</text>
          `
    )}

        <!-- Clip plot area -->
        <defs>
          <clipPath id="plot-clip">
            <rect x=${x.left} y=${x.top}
              width=${xt} height=${st} />
          </clipPath>
        </defs>

        <!-- Data lines -->
        <g clip-path="url(#plot-clip)">
          ${this._series.map((u) => {
      const R = u.axis === "left" ? y : _, D = this._visiblePoints(
        u.data,
        r,
        i
      );
      if (!D.length) return g;
      const j = D.map(
        (A) => `${h(A.t).toFixed(1)},${R(A.v).toFixed(1)}`
      ).join(" "), dt = !u.dashed && u.axis === "left", ot = y(z ? 0 : c.min), rt = dt ? `${h(D[0].t).toFixed(1)},${ot.toFixed(1)} ${j} ${h(D[D.length - 1].t).toFixed(1)},${ot.toFixed(1)}` : "";
      return p`
              ${rt ? p`<polygon points=${rt} fill=${u.color} opacity="0.06" />` : g}
              <polyline
                class="data-line ${u.dashed ? "dashed" : ""}"
                points=${j}
                stroke=${u.color}
                style="filter: drop-shadow(0 0 3px ${u.color})"
              />
            `;
    })}
        </g>

        <!-- Cursor -->
        ${et !== null && G !== null ? this._renderCursor(G, et, y, _) : g}
      </svg>
    `;
  }
  _renderCursor(t, e, o, r) {
    if (e < x.left || e > M - x.right) return g;
    const i = Math.floor(t / 60), s = Math.round(t % 60), a = `${i}:${String(s).padStart(2, "0")}`, l = [];
    for (const v of this._series) {
      const b = this._nearestPoint(v.data, t);
      if (!b) continue;
      const C = (v.axis === "left" ? o : r)(b.v);
      let k;
      if (v.isPercent)
        k = `${Math.round(b.v)}%`;
      else if (v.axis === "left")
        k = Math.abs(b.v) >= 1e3 ? `${(b.v / 1e3).toFixed(2)} ${this.i18n["unit.kW"]}` : `${Math.round(b.v)} ${this.i18n["unit.W"]}`;
      else {
        const P = Math.abs(b.v) < 0.1 ? 3 : (Math.abs(b.v) < 1, 2);
        k = `${b.v.toFixed(P)} ${this.i18n["unit.kWh"]}`;
      }
      l.push({ y: C, color: v.color, label: k });
    }
    const c = this._textScale(), d = x.top + 4, h = 11 * c, y = 14 * c + l.length * h, _ = 76 * c, m = Math.min(e + 6, M - x.right - _);
    return p`
      <line class="cursor-line"
        x1=${e} y1=${x.top} x2=${e} y2=${x.top + st} />
      ${l.map(
      (v) => p`
          <circle class="cursor-dot" cx=${e} cy=${v.y} r="3"
            fill=${v.color} stroke="#0b1220" />
        `
    )}
      <rect class="cursor-bg" x=${m} y=${d}
        width=${_} height=${y} />
      <text class="cursor-label" x=${m + 4} y=${d + 10 * c}>
        ${a}
      </text>
      ${l.map(
      (v, b) => p`
          <text class="cursor-label" x=${m + 4}
            y=${d + 10 * c + (b + 1) * h}
            fill=${v.color}>${v.label}</text>
        `
    )}
    `;
  }
  // ---- Y-axis helpers ----
  _yRange(t) {
    let e = 1 / 0, o = -1 / 0;
    for (const i of t)
      for (const s of i.data)
        s.v < e && (e = s.v), s.v > o && (o = s.v);
    Number.isFinite(e) || (e = 0, o = 1);
    const r = o - e || 1;
    return {
      min: e - r * 0.05,
      max: o + r * 0.05,
      range: r * 1.1
    };
  }
  /**
   * Generate "nice" Y-axis tick values — round multiples of 1, 2, 5, 10, 20,
   * 50, 100, 200, 500, 1000, etc. so the axis reads e.g. 0, 100, 200, 300
   * instead of 0, 259, 539, 819.
   */
  _yLabels(t, e, o) {
    const r = t.range / e, i = this._niceStep(r), s = Math.floor(t.min / i) * i, a = Math.ceil(t.max / i) * i, l = i >= 1 ? 0 : i >= 0.1 ? 1 : i >= 0.01 ? 2 : 3, c = [];
    for (let d = s; d <= a + i * 0.01; d += i) {
      const h = Math.abs(d) >= 1e3 ? `${(d / 1e3).toFixed(1)}k` : d.toFixed(l);
      c.push({ y: o(d), label: h });
    }
    return c;
  }
  /** Round a raw step to the nearest "nice" number: 1, 2, 5, 10, 20, 50, ... */
  _niceStep(t) {
    if (t <= 0) return 1;
    const e = Math.floor(Math.log10(t)), o = Math.pow(10, e), r = t / o;
    return r <= 1.5 ? o : r <= 3.5 ? o * 2 : r <= 7.5 ? o * 5 : o * 10;
  }
  /**
   * Extract the visible portion of a data series for the current viewport,
   * interpolating values at the left and right edges so the line always
   * extends to the full viewport width — even when no raw data points fall
   * inside the visible range (e.g. battery SoC with infrequent updates).
   */
  _visiblePoints(t, e, o) {
    if (!t.length) return [];
    let r = -1, i = t.length;
    for (let a = 0; a < t.length; a++)
      t[a].t < e && (r = a), t[a].t > o && i === t.length && (i = a);
    const s = t.filter((a) => a.t >= e && a.t <= o);
    if (r >= 0 && (s.length === 0 || s[0].t > e)) {
      const a = t[r], l = t[r + 1];
      if (l) {
        const c = (e - a.t) / (l.t - a.t);
        s.unshift({ t: e, v: a.v + (l.v - a.v) * c });
      } else
        s.unshift({ t: e, v: a.v });
    }
    if (i < t.length && (s.length === 0 || s[s.length - 1].t < o)) {
      const a = t[i], l = t[i - 1];
      if (l) {
        const c = (o - l.t) / (a.t - l.t);
        s.push({ t: o, v: l.v + (a.v - l.v) * c });
      } else
        s.push({ t: o, v: a.v });
    }
    if (s.length === 0 && t.length > 0) {
      const a = r >= 0 ? t[r] : t[0];
      s.push({ t: e, v: a.v }, { t: o, v: a.v });
    }
    return s;
  }
  _nearestPoint(t, e) {
    if (!t.length) return null;
    let o = t[0], r = Math.abs(t[0].t - e);
    for (let i = 1; i < t.length; i++) {
      const s = Math.abs(t[i].t - e);
      s < r && (o = t[i], r = s);
    }
    return r < 30 ? o : null;
  }
  // ---- Interaction ----
  _svgToTime(t) {
    const o = t.currentTarget.getBoundingClientRect(), r = M / o.width, i = (t.clientX - o.left) * r, s = this._dateOffset === 0, a = /* @__PURE__ */ new Date(), l = s ? a.getHours() * 60 + a.getMinutes() : 1440, d = (this._viewEnd < 0 ? Math.max(l, 60) : this._viewEnd) - this._viewStart || 1;
    return (i - x.left) / xt * d + this._viewStart;
  }
  _onPointerDown(t) {
    if (this._gestureActive) return;
    const e = this._svgToTime(t);
    this._cursorT = Math.max(this._viewStart, e);
  }
  _onPointerMove(t) {
    if (this._gestureActive || t.pointerType === "touch" && !t.isPrimary) return;
    const e = this._svgToTime(t);
    this._cursorT = Math.max(this._viewStart, e);
  }
  _onPointerLeave() {
    this._gestureActive || (this._cursorT = null);
  }
  _onWheel(t) {
    t.preventDefault(), t.stopPropagation(), this._cursorT = null;
    const e = this._dateOffset === 0, o = /* @__PURE__ */ new Date(), r = e ? o.getHours() * 60 + o.getMinutes() : 1440, s = (this._viewEnd < 0 ? Math.max(r, 60) : this._viewEnd) - this._viewStart, a = t.deltaY > 0 ? 1.25 : 0.8, l = Math.max(30, Math.min(1440, s * a)), c = this._cursorT !== null ? this._cursorT : this._viewStart + s / 2, d = s > 0 ? (c - this._viewStart) / s : 0.5;
    let h = c - l * d, y = h + l;
    h < 0 && (h = 0, y = l), y > r && (y = r, h = Math.max(0, y - l)), this._viewStart = h, this._viewEnd = y;
  }
  // ---- Pinch-to-zoom + two-finger pan ----
  _getMaxTime() {
    if (!(this._dateOffset === 0)) return 1440;
    const e = /* @__PURE__ */ new Date();
    return Math.max(e.getHours() * 60 + e.getMinutes(), 60);
  }
  _touchDist(t) {
    const e = t.touches, o = e[1].clientX - e[0].clientX, r = e[1].clientY - e[0].clientY;
    return Math.hypot(o, r);
  }
  _touchCenterTime(t) {
    const o = t.currentTarget.getBoundingClientRect(), r = M / o.width, i = ((t.touches[0].clientX + t.touches[1].clientX) / 2 - o.left) * r, a = (this._viewEnd < 0 ? this._getMaxTime() : this._viewEnd) - this._viewStart || 1;
    return (i - x.left) / xt * a + this._viewStart;
  }
  _onTouchStart(t) {
    t.touches.length === 2 && (t.preventDefault(), this._gestureActive = !0, this._cursorT = null, this._pinchStartDist = this._touchDist(t), this._pinchStartRange = (this._viewEnd < 0 ? this._getMaxTime() : this._viewEnd) - this._viewStart, this._pinchStartCenter = this._touchCenterTime(t));
  }
  _onTouchMove(t) {
    if (t.touches.length === 2) {
      t.preventDefault();
      const e = this._touchDist(t), o = this._getMaxTime();
      if (this._pinchStartDist > 0) {
        const r = this._pinchStartDist / e, i = 30;
        let s = Math.min(o, this._pinchStartRange * r);
        if (s < i) {
          const _ = i - s;
          s = i - Math.min(_ * 0.3, 20);
        }
        const a = this._pinchStartCenter, l = this._pinchStartRange > 0 ? (a - this._viewStart) / this._pinchStartRange : 0.5;
        let c = a - s * l, d = c + s;
        const h = this._touchCenterTime(t), y = this._pinchStartCenter - h;
        c += y, d += y, c < 0 && (d -= c, c = 0), d > o && (c -= d - o, d = o, c = Math.max(0, c)), this._viewStart = c, this._viewEnd = d, this.requestUpdate();
      }
    }
  }
  _onTouchEnd(t) {
    if (t.touches.length < 2) {
      const e = this._pinchStartDist > 0;
      this._pinchStartDist = 0, this._gestureActive = !1, e && (this._viewEnd < 0 ? this._getMaxTime() : this._viewEnd) - this._viewStart < 30 && this._snapToMinRange();
    }
  }
  /** Animate snap-back to minimum zoom range (30 min). */
  _snapToMinRange() {
    this._bounceAnim !== null && cancelAnimationFrame(this._bounceAnim);
    const t = () => {
      if (this._viewEnd - this._viewStart >= 29.5) {
        this._bounceAnim = null;
        return;
      }
      const o = (this._viewStart + this._viewEnd) / 2, r = Math.max(0, o - 15), i = r + 30;
      this._viewStart += (r - this._viewStart) * 0.25, this._viewEnd += (i - this._viewEnd) * 0.25, this.requestUpdate(), this._bounceAnim = requestAnimationFrame(t);
    };
    t();
  }
  // ---- Day navigation ----
  _prevDay() {
    this._dateOffset--, this._lastFetchKey = "";
  }
  _nextDay() {
    this._dateOffset < 0 && (this._dateOffset++, this._lastFetchKey = "");
  }
  /** ISO date string (YYYY-MM-DD) for the input[type=date] value. */
  _isoDate(t) {
    const e = /* @__PURE__ */ new Date();
    return e.setDate(e.getDate() + (t ?? this._dateOffset)), e.toISOString().slice(0, 10);
  }
  _onDatePicked(t) {
    const e = t.target, o = /* @__PURE__ */ new Date(e.value + "T00:00:00"), r = /* @__PURE__ */ new Date();
    r.setHours(0, 0, 0, 0);
    const i = Math.round(
      (o.getTime() - r.getTime()) / 864e5
    );
    i <= 0 && (this._dateOffset = i, this._lastFetchKey = "");
  }
  // ---- Entity mapping ----
  _entitiesForNode() {
    if (!this.entities) return [];
    const t = this._accentForNode(this.node), e = this._secondaryAccentForNode(this.node), o = this.i18n["unit.W"], r = this.i18n["unit.kWh"];
    switch (this.node) {
      case "pv":
        return [
          { id: this.entities.pv_power, color: t, label: o, axis: "left" },
          {
            id: this.entities.pv_energy_today,
            color: e,
            label: r,
            axis: "right",
            dashed: !0
          }
        ];
      case "home":
        return [
          { id: this.entities.output_power, color: t, label: o, axis: "left" },
          {
            id: this.entities.load_energy_today,
            color: e,
            label: r,
            axis: "right",
            dashed: !0
          }
        ];
      case "battery":
        return [
          { id: this.entities.battery_power, color: t, label: o, axis: "left" },
          {
            id: this.entities.battery_percent,
            color: e,
            label: "%",
            axis: "right",
            dashed: !0,
            isPercent: !0
          }
        ];
      case "grid":
        return [
          { id: this.entities.grid_power, color: t, label: o, axis: "left" },
          {
            id: this.entities.grid_import_energy_today,
            color: e,
            label: `↓ ${r}`,
            axis: "right",
            dashed: !0
          },
          ...this.entities.grid_export_energy_today ? [
            {
              id: this.entities.grid_export_energy_today,
              color: "#ff6b6b",
              label: `↑ ${r}`,
              axis: "right",
              dashed: !0
            }
          ] : []
        ];
      default:
        return [];
    }
  }
  _accentForNode(t) {
    return t === "pv" ? this.colors.pv : t === "home" ? this.colors.home : t === "battery" ? this.colors.battery : t === "grid" ? this.colors.grid : "#fff";
  }
  _secondaryAccentForNode(t) {
    return t === "pv" ? this.colors.pv_secondary : t === "home" ? this.colors.home_secondary : t === "battery" ? this.colors.battery_secondary : t === "grid" ? this.colors.grid_secondary : "#fff";
  }
  // ---- Data fetching ----
  _selectNode(t) {
    this.dispatchEvent(
      new CustomEvent("node-click", {
        detail: { node: t },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _historySamples(t, e) {
    return t.map((o) => {
      if (o.s === null) return null;
      const r = Number(o.s);
      return Number.isFinite(r) ? {
        t: (o.lu * 1e3 - e) / 6e4,
        v: r
      } : null;
    }).filter((o) => o !== null);
  }
  async _fetchAllHistory(t) {
    const e = ++this._fetchGen;
    this._loading = !0, this._series = [];
    try {
      const o = /* @__PURE__ */ new Date();
      o.setDate(o.getDate() + this._dateOffset);
      const r = new Date(o);
      r.setHours(0, 0, 0, 0);
      const i = r.getTime(), s = new Date(i), a = this._dateOffset === 0 ? /* @__PURE__ */ new Date() : new Date(i + 864e5), l = t.filter((y) => y.id);
      if (!l.length) {
        this._loading = !1;
        return;
      }
      const c = l.map((y) => y.id), d = await this.hass.callWS({
        type: "history/history_during_period",
        start_time: s.toISOString(),
        end_time: a.toISOString(),
        entity_ids: c,
        minimal_response: !0,
        significant_changes_only: !1,
        no_attributes: !0
      });
      if (e !== this._fetchGen) return;
      const h = this._dateOffset === 0 ? (/* @__PURE__ */ new Date()).getHours() * 60 + (/* @__PURE__ */ new Date()).getMinutes() : 1440;
      this._series = l.map((y) => {
        const _ = d?.[y.id] || [];
        let m = this._historySamples(_, i);
        if (m.length >= 2 && m[0].t <= 0 && m[1].v < m[0].v * 0.5 && (m = m.slice(1)), m.length > 0) {
          const v = m[m.length - 1];
          v.t < h - 1 && m.push({ t: h, v: v.v });
        }
        return {
          data: m,
          color: y.color,
          label: y.label,
          axis: y.axis,
          dashed: y.dashed,
          isPercent: y.isPercent
        };
      });
    } catch (o) {
      console.warn("[eybond-local-card] history fetch failed", o), this._series = [];
    } finally {
      this._loading = !1;
    }
  }
}
N([
  w({ attribute: !1 })
], H.prototype, "hass");
N([
  w({ type: String })
], H.prototype, "node");
N([
  w({ attribute: !1 })
], H.prototype, "entities");
N([
  w({ attribute: !1 })
], H.prototype, "i18n");
N([
  w({ attribute: !1 })
], H.prototype, "colors");
N([
  w({ attribute: !1 })
], H.prototype, "hiddenNodes");
N([
  w({ type: Number })
], H.prototype, "textScale");
N([
  W()
], H.prototype, "_series");
N([
  W()
], H.prototype, "_loading");
N([
  W()
], H.prototype, "_cursorT");
N([
  W()
], H.prototype, "_viewStart");
N([
  W()
], H.prototype, "_viewEnd");
N([
  W()
], H.prototype, "_dateOffset");
Ht("eybond-chart-panel", H);
var So = Object.defineProperty, be = (n, t, e, o) => {
  for (var r = void 0, i = n.length - 1, s; i >= 0; i--)
    (s = n[i]) && (r = s(t, e, r) || r);
  return r && So(t, e, r), r;
};
const Rt = [
  {
    formKey: "color_pv",
    colorKey: "pv",
    label: "PV current power color (optional)"
  },
  {
    formKey: "color_pv_secondary",
    colorKey: "pv_secondary",
    label: "PV daily generation color (optional)"
  },
  {
    formKey: "color_home",
    colorKey: "home",
    label: "Home current power color (optional)"
  },
  {
    formKey: "color_home_secondary",
    colorKey: "home_secondary",
    label: "Home daily energy color (optional)"
  },
  {
    formKey: "color_battery",
    colorKey: "battery",
    label: "Battery primary color (optional)"
  },
  {
    formKey: "color_battery_secondary",
    colorKey: "battery_secondary",
    label: "Battery secondary chart color (optional)"
  },
  {
    formKey: "color_grid",
    colorKey: "grid",
    label: "Grid live power color (optional)"
  },
  {
    formKey: "color_grid_secondary",
    colorKey: "grid_secondary",
    label: "Grid daily import color (optional)"
  }
], Lt = [
  {
    formKey: "override_pv_power",
    overrideKey: "pv_power",
    label: "PV power entity (optional)"
  },
  {
    formKey: "override_output_power",
    overrideKey: "output_power",
    label: "Load power entity (optional)"
  },
  {
    formKey: "override_battery_percent",
    overrideKey: "battery_percent",
    label: "Battery SoC entity (optional)"
  },
  {
    formKey: "override_battery_voltage",
    overrideKey: "battery_voltage",
    label: "Battery voltage entity (optional)"
  },
  {
    formKey: "override_battery_power",
    overrideKey: "battery_power",
    label: "Battery power entity (optional)"
  },
  {
    formKey: "override_grid_power",
    overrideKey: "grid_power",
    label: "Grid power entity (optional)"
  },
  {
    formKey: "override_grid_voltage",
    overrideKey: "grid_voltage",
    label: "Grid voltage entity (optional)"
  },
  {
    formKey: "override_grid_frequency",
    overrideKey: "grid_frequency",
    label: "Grid frequency entity (optional)"
  },
  {
    formKey: "override_pv_energy_today",
    overrideKey: "pv_energy_today",
    label: "PV daily energy entity (optional)"
  },
  {
    formKey: "override_pv_voltage",
    overrideKey: "pv_voltage",
    label: "PV voltage entity (optional)"
  },
  {
    formKey: "override_pv_current",
    overrideKey: "pv_current",
    label: "PV current entity (optional)"
  },
  {
    formKey: "override_pv_energy_total",
    overrideKey: "pv_energy_total",
    label: "PV total energy entity (optional)"
  },
  {
    formKey: "override_load_energy_today",
    overrideKey: "load_energy_today",
    label: "Home daily energy entity (optional)"
  },
  {
    formKey: "override_battery_charge_energy_today",
    overrideKey: "battery_charge_energy_today",
    label: "Battery charge today entity (optional)"
  },
  {
    formKey: "override_battery_discharge_energy_today",
    overrideKey: "battery_discharge_energy_today",
    label: "Battery discharge today entity (optional)"
  },
  {
    formKey: "override_grid_import_energy_today",
    overrideKey: "grid_import_energy_today",
    label: "Grid import today entity (optional)"
  },
  {
    formKey: "override_grid_export_energy_today",
    overrideKey: "grid_export_energy_today",
    label: "Grid export today entity (optional)"
  },
  {
    formKey: "override_pv_to_home_power",
    overrideKey: "pv_to_home_power",
    label: "PV to Home flow entity (optional)"
  },
  {
    formKey: "override_pv_to_battery_power",
    overrideKey: "pv_to_battery_power",
    label: "PV to Battery flow entity (optional)"
  },
  {
    formKey: "override_pv_to_grid_power",
    overrideKey: "pv_to_grid_power",
    label: "PV to Grid flow entity (optional)"
  },
  {
    formKey: "override_battery_to_home_power",
    overrideKey: "battery_to_home_power",
    label: "Battery to Home flow entity (optional)"
  },
  {
    formKey: "override_grid_to_home_power",
    overrideKey: "grid_to_home_power",
    label: "Grid to Home flow entity (optional)"
  },
  {
    formKey: "override_grid_to_battery_power",
    overrideKey: "grid_to_battery_power",
    label: "Grid to Battery flow entity (optional)"
  },
  {
    formKey: "override_pv_to_home_today",
    overrideKey: "pv_to_home_today",
    label: "PV to Home daily energy entity (optional)"
  },
  {
    formKey: "override_battery_to_home_today",
    overrideKey: "battery_to_home_today",
    label: "Battery to Home daily energy entity (optional)"
  },
  {
    formKey: "override_grid_to_home_today",
    overrideKey: "grid_to_home_today",
    label: "Grid to Home daily energy entity (optional)"
  }
];
class qt extends Y {
  setConfig(t) {
    this._config = this._withResolvedDevice(t);
  }
  updated(t) {
    if (super.updated(t), !this._config || this._config.device || !this.hass)
      return;
    const e = this._withResolvedDevice(this._config);
    !e?.device || e.device === this._config.device || (this._config = e, this._dispatchConfigChanged(e));
  }
  static {
    this.styles = Pt`
    :host {
      display: block;
    }
    ha-form {
      display: block;
    }
  `;
  }
  render() {
    if (!this.hass || !this._config) return g;
    const t = Et(this.hass.language), e = [
      {
        name: "device",
        required: !0,
        selector: { device: { integration: "eybond_local" } }
      },
      {
        name: "name",
        selector: { text: {} }
      },
      {
        name: "show_power_flow",
        selector: { boolean: {} }
      },
      {
        name: "show_charts",
        selector: { boolean: {} }
      },
      {
        name: "show_pv",
        selector: { boolean: {} }
      },
      {
        name: "show_grid",
        selector: { boolean: {} }
      },
      {
        name: "show_battery",
        selector: { boolean: {} }
      },
      {
        name: "auto_hide_nodes",
        selector: { boolean: {} }
      },
      {
        name: "icon_scale",
        selector: {
          number: { min: 0.8, max: 1.6, step: 0.05, mode: "slider" }
        }
      },
      {
        name: "text_scale",
        selector: {
          number: { min: 0.8, max: 1.6, step: 0.05, mode: "slider" }
        }
      },
      {
        name: "weather_entity",
        selector: { entity: { domain: "weather" } }
      },
      ...Rt.map((i) => ({
        name: i.formKey,
        selector: { text: {} },
        label: t[`editor.${i.formKey}`] ?? i.label
      })),
      ...Lt.map((i) => ({
        name: i.formKey,
        selector: { entity: {} },
        label: t[`editor.${i.formKey}`] ?? i.label
      }))
    ], o = (i) => i.label ?? t[`editor.${i.name}`] ?? i.name, r = this._toFormData();
    return F`
      <ha-form
        .hass=${this.hass}
        .data=${r}
        .schema=${e}
        .computeLabel=${o}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
  _toFormData() {
    const t = this._withResolvedDevice(this._config), e = t?.entity_overrides ?? {}, o = t?.colors ?? {}, r = {
      device: t?.device ?? "",
      name: t?.name ?? "",
      show_power_flow: t?.show_power_flow ?? !0,
      show_charts: t?.show_charts ?? !0,
      show_pv: t?.show_pv ?? !0,
      show_grid: t?.show_grid ?? !0,
      show_battery: t?.show_battery ?? !0,
      auto_hide_nodes: t?.auto_hide_nodes ?? !1,
      icon_scale: t?.icon_scale ?? 1,
      text_scale: t?.text_scale ?? 1,
      weather_entity: t?.weather_entity ?? ""
    };
    for (const i of Rt)
      r[i.formKey] = o[i.colorKey] ?? "";
    for (const i of Lt)
      r[i.formKey] = e[i.overrideKey] ?? "";
    return r;
  }
  _valueChanged(t) {
    t.stopPropagation();
    const e = t.detail.value, o = {
      ...this._config?.colors ?? {}
    }, r = {
      ...this._config?.entity_overrides ?? {}
    };
    for (const s of Rt) {
      const a = e[s.formKey];
      typeof a == "string" && a.trim() ? o[s.colorKey] = a.trim() : delete o[s.colorKey];
    }
    for (const s of Lt) {
      const a = e[s.formKey];
      typeof a == "string" && a.trim() ? r[s.overrideKey] = a.trim() : delete r[s.overrideKey];
    }
    const i = {
      ...this._config,
      type: "custom:eybond-local-card",
      device: String(e.device ?? this._config?.device ?? "").trim() || Ct(this.hass),
      show_power_flow: typeof e.show_power_flow == "boolean" ? e.show_power_flow : this._config?.show_power_flow ?? !0
    };
    e.show_charts === !1 ? i.show_charts = !1 : delete i.show_charts;
    for (const s of ["show_pv", "show_grid", "show_battery"])
      e[s] === !1 ? i[s] = !1 : delete i[s];
    e.auto_hide_nodes === !0 ? i.auto_hide_nodes = !0 : delete i.auto_hide_nodes;
    for (const s of ["icon_scale", "text_scale"]) {
      const a = Number(e[s]);
      Number.isFinite(a) && Math.abs(a - 1) > 1e-3 ? i[s] = Math.min(1.6, Math.max(0.8, a)) : delete i[s];
    }
    this._assignOptionalString(i, "name", e.name), this._assignOptionalString(i, "weather_entity", e.weather_entity), Object.keys(o).length ? i.colors = o : delete i.colors, Object.keys(r).length ? i.entity_overrides = r : delete i.entity_overrides, this._dispatchConfigChanged(i);
  }
  _dispatchConfigChanged(t) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: t },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _withResolvedDevice(t) {
    if (!t)
      return t;
    const e = String(t.device ?? "").trim();
    if (e)
      return e === t.device ? t : { ...t, device: e };
    const o = Ct(this.hass);
    return o ? { ...t, device: o } : t;
  }
  _assignOptionalString(t, e, o) {
    if (typeof o == "string" && o.trim()) {
      t[e] = o.trim();
      return;
    }
    delete t[e];
  }
}
be([
  w({ attribute: !1 })
], qt.prototype, "hass");
be([
  W()
], qt.prototype, "_config");
Ht("eybond-local-card-editor", qt);
var ko = Object.defineProperty, Nt = (n, t, e, o) => {
  for (var r = void 0, i = n.length - 1, s; i >= 0; i--)
    (s = n[i]) && (r = s(t, e, r) || r);
  return r && ko(t, e, r), r;
};
const Co = "0.3.0";
console.info(
  `%c EYBOND-LOCAL-CARD %c ${Co} `,
  "color: #0b1220; background: #00f6ff; font-weight: 600; padding: 2px 6px;",
  "color: #00f6ff; background: #0b1220; padding: 2px 6px;"
);
mo({
  type: "eybond-local-card",
  name: "EyeBond Local Card",
  description: "A neon-minimal power flow view for an EyeBond Local inverter.",
  preview: !0,
  documentationURL: "https://github.com/groove-max/ha-eybond-local-card#readme"
});
class bt extends Y {
  constructor() {
    super(...arguments), this._entities = null, this._selectedNode = "home", this._registryFetched = !1;
  }
  /** Lovelace calls this to produce the visual configuration editor. */
  static getConfigElement() {
    return document.createElement("eybond-local-card-editor");
  }
  /** Lovelace calls this when the user first adds the card. Pre-fill the
   *  device field with the inverter-like EyeBond device when it can be
   *  determined unambiguously, while keeping the old single-device fallback.*/
  static getStubConfig(t) {
    return {
      type: "custom:eybond-local-card",
      device: Ct(t)
    };
  }
  setConfig(t) {
    const e = Et(this.hass?.language), o = t?.device || Ct(this.hass);
    if (!t)
      throw new Error(e["err.invalid_config"]);
    if (!o)
      throw new Error(e["err.need_device"]);
    this._config = {
      show_power_flow: !0,
      ...t,
      device: o
    }, this._entities = null, this._registryFetched = !1;
  }
  getCardSize() {
    const t = this._config?.show_power_flow ?? !0, e = this._config?.show_charts ?? !0;
    return t && e ? 6 : t || e ? 4 : 1;
  }
  willUpdate() {
    !this.hass || !this._config?.device || (this._entities === null && (this._entities = ce(
      Ye(this.hass, this._config.device),
      this._config.entity_overrides
    )), this._registryFetched || (this._registryFetched = !0, this._fetchRegistry()));
  }
  _handleNodeClick(t) {
    this._selectedNode = t.detail.node;
  }
  async _fetchRegistry() {
    try {
      const t = await this.hass.callWS({
        type: "config/entity_registry/list"
      });
      this._entities = ce(
        qe(t, this._config.device),
        this._config.entity_overrides
      );
    } catch (t) {
      console.warn("[eybond-local-card] entity registry fetch failed", t);
    }
  }
  static {
    this.styles = Pt`
    :host {
      --card-bg: linear-gradient(155deg, #0b1220 0%, #0a0f1a 60%, #080c15 100%);
      --card-border: rgba(0, 246, 255, 0.12);
    }

    ha-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 18px;
      overflow: hidden;
      padding: 18px 16px 20px;
      display: block;
      position: relative;
    }

    ha-card::before {
      content: "";
      position: absolute;
      inset: 0;
      background: radial-gradient(
        circle at 50% 0%,
        rgba(0, 246, 255, 0.08),
        transparent 60%
      );
      pointer-events: none;
    }

    .header {
      position: relative;
      padding-bottom: 8px;
      color: #fff;
    }

    .header .name {
      font-size: 15px;
      font-weight: 600;
      letter-spacing: 0.04em;
    }

    .power-flow {
      position: relative;
      padding: 6px 0 14px;
    }

    .missing {
      color: #ff7a7a;
      padding: 20px 12px;
      font-size: 13px;
    }
  `;
  }
  render() {
    if (!this.hass || !this._config) return g;
    const t = Et(this.hass.language), e = this._entities, o = po(this._config.colors);
    if (!e)
      return F`<ha-card><div class="missing">${t.loading}</div></ha-card>`;
    if ([
      e.pv_power,
      e.output_power,
      e.battery_percent,
      e.grid_power
    ].every((Z) => Z === null)) {
      const Z = t["err.no_sensors"].replace(
        "{device}",
        this._config.device
      );
      return F`
        <ha-card>
          <div class="missing">${Z}</div>
        </ha-card>
      `;
    }
    const i = this.hass.devices?.[this._config.device], s = this._config.name ?? i?.name_by_user ?? i?.name ?? "EyeBond Local", a = S(this.hass, e.pv_power), l = S(this.hass, e.output_power), c = S(this.hass, e.battery_power), d = S(this.hass, e.grid_power), h = this._readDirectFlows(e), y = Object.values(h).every((Z) => Z !== null), _ = S(this.hass, e.pv_charging_power), m = S(
      this.hass,
      e.inverter_charging_power
    ), v = Ze(this.hass, e.power_flow_summary), b = S(this.hass, e.battery_percent), E = S(this.hass, e.grid_voltage), C = S(this.hass, e.grid_frequency), k = S(
      this.hass,
      e.grid_import_energy_today
    ), P = S(
      this.hass,
      e.grid_export_energy_today
    ), K = e.grid_export_energy_today !== null, O = S(this.hass, e.pv_energy_today), pvVoltage = S(this.hass, e.pv_voltage), pvCurrent = S(this.hass, e.pv_current), pvTotalKwh = S(this.hass, e.pv_energy_total), U = S(this.hass, e.load_energy_today), I = S(this.hass, e.pv_to_home_today), z = S(
      this.hass,
      e.battery_to_home_today
    ), V = S(this.hass, e.grid_to_home_today), G = I !== null || z !== null || V !== null, et = S(
      this.hass,
      e.battery_charge_energy_today
    ), u = S(
      this.hass,
      e.battery_discharge_energy_today
    ), R = this._config.weather_entity ?? Object.keys(this.hass.states).find((Z) => Z.startsWith("weather.")) ?? null, D = R ? this.hass.states[R] : null, j = D?.state ?? null, dt = D?.attributes?.cloud_coverage ?? null, ot = this.hass.states["sun.sun"], rt = j === "clear-night" || ot?.state === "below_horizon", A = y ? {
      pvToHome: h.pvToHome ?? 0,
      pvToBattery: h.pvToBattery ?? 0,
      pvToGrid: h.pvToGrid ?? 0,
      batteryToHome: h.batteryToHome ?? 0,
      gridToHome: h.gridToHome ?? 0,
      gridToBattery: h.gridToBattery ?? 0
    } : Xe(a, l, c, d, {
      powerFlowSummary: v,
      pvChargingPower: _,
      inverterChargingPower: m
    }), wt = y ? Math.max(
      l ?? 0,
      A.pvToHome + A.batteryToHome + A.gridToHome
    ) : l, it = d ?? (y ? A.gridToHome + A.gridToBattery - A.pvToGrid : null), $t = G ? ro(
      I,
      z,
      V
    ) : y ? this._homeSharesFromFlows(A) : io(A, a, c, it), L = G ? {
      pv: I,
      battery: z,
      grid: V
    } : null, B = this._config.auto_hide_nodes === !0, Ot = a !== null || O !== null, ht = c !== null || b !== null, we = it !== null || E !== null || k !== null, Yt = (this._config.show_pv ?? !0) && !(B && !Ot), Zt = (this._config.show_grid ?? !0) && !(B && !we), Xt = (this._config.show_battery ?? !0) && !(B && !ht), yt = [];
    Yt || yt.push("pv"), Zt || yt.push("grid"), Xt || yt.push("battery");
    const $e = yt.includes(this._selectedNode) ? "home" : this._selectedNode;
    return F`
      <ha-card>
        <div class="header">
          <span class="name">${s}</span>
        </div>

        <div class="power-flow">
          <eybond-power-flow
            .i18n=${t}
            .colors=${o}
            .pvPower=${a}
            .loadPower=${wt}
            .batteryPower=${c}
            .gridPower=${it}
            .batterySoc=${b}
            .gridVoltage=${E}
            .gridFrequency=${C}
            .gridImportToday=${k}
            .gridExportToday=${P}
            .gridExportEnabled=${K}
            .pvTodayKwh=${O}
            .pvVoltage=${pvVoltage}
            .pvCurrent=${pvCurrent}
            .pvTotalKwh=${pvTotalKwh}
            .homeTodayKwh=${U}
            .batteryChargeToday=${et}
            .batteryDischargeToday=${u}
            .flows=${A}
            .homeShares=${$t}
            .homeSplitTotals=${L}
            .weatherCondition=${j}
            .cloudCoverage=${dt}
            .isNight=${rt}
            .showPv=${Yt}
            .showGrid=${Zt}
            .showBattery=${Xt}
            .iconScale=${this._config?.icon_scale ?? 1}
            .textScale=${this._config?.text_scale ?? 1}
            @node-click=${this._handleNodeClick}
          ></eybond-power-flow>
        </div>

        ${this._config.show_charts ?? !0 ? F`<eybond-chart-panel
              .hass=${this.hass}
              .node=${$e}
              .entities=${e}
              .i18n=${t}
              .colors=${o}
              .hiddenNodes=${yt}
              .textScale=${this._config?.text_scale ?? 1}
              @node-click=${this._handleNodeClick}
            ></eybond-chart-panel>` : g}
      </ha-card>
    `;
  }
  _readDirectFlows(t) {
    return {
      pvToHome: S(this.hass, t.pv_to_home_power),
      pvToBattery: S(this.hass, t.pv_to_battery_power),
      pvToGrid: S(this.hass, t.pv_to_grid_power),
      batteryToHome: S(this.hass, t.battery_to_home_power),
      gridToHome: S(this.hass, t.grid_to_home_power),
      gridToBattery: S(this.hass, t.grid_to_battery_power)
    };
  }
  _homeSharesFromFlows(t) {
    const e = t.pvToHome + t.batteryToHome + t.gridToHome;
    return e <= 0 ? { pv: 0, battery: 0, grid: 0, unused: 0 } : {
      pv: t.pvToHome / e,
      battery: t.batteryToHome / e,
      grid: t.gridToHome / e,
      unused: 0
    };
  }
}
Nt([
  w({ attribute: !1 })
], bt.prototype, "hass");
Nt([
  W()
], bt.prototype, "_config");
Nt([
  W()
], bt.prototype, "_entities");
Nt([
  W()
], bt.prototype, "_selectedNode");
Ht("eybond-local-card", bt);
export {
  bt as EybondLocalCard
};
