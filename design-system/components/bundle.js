/* @ds-bundle: {"format":4,"namespace":"DesignsByLuca","components":[{"name":"Button"},{"name":"IconButton"},{"name":"Link"},{"name":"Input"},{"name":"Textarea"},{"name":"Select"},{"name":"Checkbox"},{"name":"RadioGroup"},{"name":"Switch"},{"name":"Label"},{"name":"Badge"},{"name":"Avatar"},{"name":"Card"},{"name":"Separator"},{"name":"Alert"},{"name":"Toast"},{"name":"Tooltip"},{"name":"Dialog"},{"name":"NavBar"},{"name":"Hero"},{"name":"ProjectEntry"},{"name":"Footer"},{"name":"Reveal"},{"name":"ScrollHint"},{"name":"VideoToggle"},{"name":"AnnouncementBar"},{"name":"SectionTitle"},{"name":"FeatureTiles"},{"name":"StatRow"},{"name":"Accordion"},{"name":"ContactDock"},{"name":"StepForm"},{"name":"ListGroup"},{"name":"NumberedPoints"},{"name":"Letter"},{"name":"CaseStory"},{"name":"ReadingDock"},{"name":"Kicker"},{"name":"Wordmark"},{"name":"FeatureStack"},{"name":"ScrollFillText"},{"name":"BlurList"},{"name":"CardFan"},{"name":"MediaFrame"},{"name":"StatTiles"},{"name":"TestimonialRail"},{"name":"AudienceCard"}]} */
(function () {
  var React = window.React, h = React.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }
  function reduced() { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }

  // shadcn/ui-style helpers: className merge and asChild (Slot)
  function slot(p, tag, props, children) {
    if (p.asChild && React.isValidElement(p.children)) {
      var ch = p.children, cp = ch.props || {};
      return React.cloneElement(ch, Object.assign({}, props, cp, { className: cx(props.className, cp.className) }));
    }
    return h(tag, props, children);
  }
  function omit(p, keys) { var r = Object.assign({}, p); keys.forEach(function (k) { delete r[k]; }); return r; }
  var VARIANT_ALIAS = { primary: "default", mono: "default", "mono-secondary": "outline" };

  function Button(p) {
    var variant = VARIANT_ALIAS[p.variant] || p.variant || "default";
    var size = p.size || "default";
    var rest = omit(p, ["variant", "size", "onMedia", "className", "asChild", "children", "arrow"]);
    var cls = cx("sg-btn", "sg-btn-" + variant, size !== "default" && "sg-btn-" + size, p.onMedia && "sg-on-media", p.className);
    var kids = p.arrow ? [p.children, h("span", { key: "arrow", className: "sg-btn-arrow", "aria-hidden": "true" }, "→")] : p.children;
    if (p.href && !p.asChild) return h("a", Object.assign({}, rest, { className: cls, "aria-disabled": p.disabled || undefined }), kids);
    return slot(p, "button", Object.assign({ type: "button" }, rest, { className: cls }), kids);
  }

  function NavBar(p) {
    var links = p.links || [];
    var st = React.useState(false), solid = st[0], setSolid = st[1];
    React.useEffect(function () {
      if (!p.sticky || !p.overMedia) return;
      var limit = p.solidAfter == null ? 40 : p.solidAfter;
      function on() { setSolid(window.scrollY > limit); }
      on(); window.addEventListener("scroll", on, { passive: true });
      return function () { window.removeEventListener("scroll", on); };
    }, [p.sticky, p.overMedia, p.solidAfter]);
    var media = p.overMedia && !solid && !p.floating;
    var mono = p.mono || p.floating;
    return h("header", { className: cx("sg-nav", p.overMedia && !p.floating && "sg-media", solid && "sg-solid", p.sticky && !p.floating && "sg-sticky", p.floating && "sg-floating") },
      h("a", { className: "sg-nav-brand", href: p.brandHref || "/" }, p.brand),
      h("nav", { className: "sg-nav-links", "aria-label": "Main navigation" },
        links.map(function (l, i) { return h("a", { key: i, className: "sg-nav-link", href: l.href || "#" }, l.label, l.menu ? h("span", { className: "sg-nav-plus", "aria-hidden": "true" }, "+") : null); })),
      h("div", { className: "sg-nav-end" },
        p.lang ? h("a", { className: "sg-nav-lang", href: p.lang.href || "#" }, p.lang.label) : null,
        p.secondary ? (mono ? h(Button, { href: p.secondary.href || "#", variant: "outline" }, p.secondary.label)
                            : h("a", { className: "sg-nav-link", href: p.secondary.href || "#" }, p.secondary.label)) : null,
        p.cta ? h(Button, { href: p.cta.href || "#", variant: "default", onMedia: media }, p.cta.label) : null));
  }

  function Hero(p) {
    var a = p.animate;
    return h("section", { className: cx("sg-hero", p.dark && "sg-dark", p.align === "center" && "sg-center") },
      h("h1", null,
        h("span", { className: cx(a && "sg-rise sg-delay-1"), style: { display: "block" } }, p.title),
        p.muted ? h("span", { className: cx("sg-hero-muted", a && "sg-rise sg-delay-2") }, p.muted) : null),
      p.lead ? h("p", { className: cx(a && "sg-rise sg-delay-2") }, p.lead) : null,
      p.children ? h("div", { className: cx(a && "sg-rise sg-delay-3"), style: { marginTop: "var(--space-4)", display: "flex", justifyContent: p.align === "center" ? "center" : "flex-start" } }, p.children) : null);
  }

  function ProjectEntry(p) {
    var media = p.media
      ? (typeof p.media === "string" ? h("img", { src: p.media, alt: p.alt || "" }) : p.media)
      : null;
    var label = p.linkLabel || "View case";
    var thumb = p.thumb !== undefined
      ? h("span", { className: "sg-caselink-thumb", "aria-hidden": "true" }, p.thumb ? h("img", { src: p.thumb, alt: "" }) : h("i"))
      : null;
    var action = null;
    if (!p.comingSoon) {
      if (p.onPlay) action = h("button", { type: "button", className: "sg-caselink", onClick: p.onPlay }, thumb, label);
      else if (p.href && thumb) action = h("a", { className: "sg-caselink", href: p.href }, thumb, label);
      else if (p.href) action = h("a", { className: "sg-project-link", href: p.href }, label, h("span", { "aria-hidden": "true" }, "↗"));
    }
    return h("article", { className: cx("sg-project", p.secondary && "sg-secondary") },
      h("div", { className: "sg-project-media" }, p.comingSoon ? h("span", { className: "sg-chip-media" }, p.soonLabel || "Coming soon") : null, media),
      h("div", null,
        h("p", { className: "sg-project-text" }, p.text),
        action));
  }

  function Footer(p) {
    var cols = p.columns || [], legal = p.legal || [];
    return h("footer", { className: "sg-footer" },
      cols.length ? h("div", { className: "sg-footer-cols" }, cols.map(function (c, i) {
        return h("div", { key: i }, h("h4", null, c.title),
          h("ul", null, (c.links || []).map(function (l, j) { return h("li", { key: j }, h("a", { href: l.href || "#" }, l.label)); })));
      })) : null,
      h("div", { className: "sg-footer-legal" },
        p.copyright ? h("span", null, p.copyright) : null,
        legal.map(function (l, i) { return h("a", { key: i, href: l.href || "#" }, l.label); })));
  }

  function Reveal(p) {
    var ref = React.useRef(null);
    var st = React.useState(false), shown = st[0], setShown = st[1];
    React.useEffect(function () {
      var el = ref.current;
      if (!el || reduced() || !("IntersectionObserver" in window)) { setShown(true); return; }
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { setShown(true); if (!p.repeat) io.disconnect(); } else if (p.repeat) setShown(false); });
      }, { threshold: p.threshold == null ? 0.15 : p.threshold, rootMargin: "0px 0px -8% 0px" });
      io.observe(el);
      return function () { io.disconnect(); };
    }, [p.repeat, p.threshold]);
    var style = p.delay ? { transitionDelay: "var(--delay-" + p.delay + ")" } : undefined;
    return h(p.as || "div", { ref: ref, className: cx("sg-reveal", shown && "is-visible", p.className), style: style }, p.children);
  }

  function ScrollHint(p) {
    function go() {
      var t = p.target ? document.querySelector(p.target) : null;
      if (t) t.scrollIntoView({ behavior: reduced() ? "auto" : "smooth" });
      else window.scrollBy({ top: window.innerHeight * 0.9, behavior: reduced() ? "auto" : "smooth" });
    }
    return h("button", { type: "button", className: "sg-scroll-hint", onClick: go, "aria-label": p.label || "Scroll down" },
      p.label ? h("span", null, p.label) : null,
      h("svg", { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" },
        h("path", { d: "M5 8l5 5 5-5" })));
  }

  function VideoToggle(p) {
    var r = 18.25, c = 2 * Math.PI * r;
    var prog = Math.max(0, Math.min(1, p.progress || 0));
    return h("button", { type: "button", className: "sg-vtoggle", onClick: p.onToggle, "aria-label": p.playing ? "Pause video" : "Play video", "aria-pressed": !!p.playing },
      h("svg", { className: "sg-ring", viewBox: "0 0 40 40", "aria-hidden": "true" },
        h("circle", { className: "sg-ring-track", cx: 20, cy: 20, r: r }),
        h("circle", { className: "sg-ring-bar", cx: 20, cy: 20, r: r, strokeDasharray: c, strokeDashoffset: c * (1 - prog) })),
      h("svg", { width: 14, height: 14, viewBox: "0 0 14 14", fill: "currentColor", "aria-hidden": "true" },
        p.playing ? h(React.Fragment, null, h("rect", { x: 3, y: 2, width: 2.5, height: 10, rx: 0.5 }), h("rect", { x: 8.5, y: 2, width: 2.5, height: 10, rx: 0.5 }))
                  : h("path", { d: "M4 2.2v9.6a.5.5 0 0 0 .76.43l7.6-4.8a.5.5 0 0 0 0-.86l-7.6-4.8A.5.5 0 0 0 4 2.2z" })));
  }


  function Badge(p) {
    var v = p.variant || "default";
    return slot(p, "span", Object.assign(omit(p, ["variant", "className", "asChild", "children"]), { className: cx("sg-tag", v !== "default" && "sg-tag-" + v, p.className) }), p.children);
  }
  var Tag = Badge;

  function AnnouncementBar(p) {
    return h("div", { className: "sg-announce", role: "region", "aria-label": "Announcement" },
      p.text, p.linkLabel ? h("a", { href: p.href || "#" }, p.linkLabel, " ›") : null);
  }

  function SectionTitle(p) {
    return h(p.as || "h2", { className: cx("sg-stitle", p.align === "center" && "sg-center") },
      p.title, p.muted ? h("span", { className: "sg-muted" }, p.muted) : null);
  }

  function FeatureTiles(p) {
    return h("div", { className: "sg-tiles", style: p.columns ? { "--cols": p.columns } : undefined },
      (p.items || []).map(function (it, i) {
        return h("article", { key: i, className: cx("sg-tile", it.tone && it.tone !== "neutral" && "sg-tone-" + it.tone) },
          h("div", null, h("h3", null, it.title), it.text ? h("p", null, it.text) : null));
      }));
  }

  function StatRow(p) {
    return h("dl", { className: "sg-stats", style: { margin: 0 } }, (p.items || []).map(function (it, i) {
      return h("div", { key: i }, h("dt", { className: "sg-stat-value" }, it.value), h("dd", { className: "sg-stat-label", style: { marginLeft: 0 } }, it.label));
    }));
  }

  function Accordion(p) {
    return h("div", { className: "sg-acc" }, (p.items || []).map(function (it, i) {
      return h("details", { key: i, open: it.open },
        h("summary", null, h("span", null, it.q), h("span", { className: "sg-acc-icon", "aria-hidden": "true" })),
        h("div", { className: "sg-acc-body" }, it.a));
    }));
  }

  function ContactDock(p) {
    var person = p.name ? h("div", { className: "sg-dock-person" },
      p.avatar ? h("img", { className: "sg-avatar", src: p.avatar, alt: "" }) : h("i", { className: "sg-avatar" }),
      p.name, p.role ? h("span", null, p.role) : null) : null;
    var body = p.field
      ? h("label", { className: "sg-dock-field", style: { display: "block" } },
          h("div", { className: "sg-dock-title", style: { marginBottom: "4px" } }, p.field.label),
          h("input", { type: p.field.type || "text", placeholder: p.field.placeholder || "", name: p.field.name }))
      : h(React.Fragment, null, h("div", { className: "sg-dock-title" }, p.title), p.subtitle ? h("div", { className: "sg-dock-sub" }, p.subtitle) : null);
    return h("aside", { className: cx("sg-dock", p.floating && "sg-floating"), "aria-label": p.ariaLabel || "Kontakt" },
      h("div", { className: "sg-dock-main" }, person, body),
      p.cta ? h(Button, { href: p.cta.href, onClick: p.cta.onClick }, p.cta.label) : null);
  }

  function StepForm(p) {
    var steps = p.steps || [];
    var si = React.useState(0), i = si[0], setI = si[1];
    var sa = React.useState({}), ans = sa[0], setAns = sa[1];
    var sd = React.useState(false), done = sd[0], setDone = sd[1];
    var total = steps.length + (p.fields ? 1 : 0);
    var onFields = p.fields && i === steps.length;
    var step = steps[i];
    function next() {
      if (i < total - 1) setI(i + 1);
      else { setDone(true); if (p.onSubmit) p.onSubmit(ans); }
    }
    if (done) return h("div", { className: "sg-form" }, h("div", { className: "sg-form-done", role: "status" },
      h("h2", { style: { margin: 0 } }, p.doneTitle || "Thank you, it arrived."), h("p", null, p.doneText || "I will reply within two working days.")));
    var chosen = step && ans[i];
    return h("form", { className: "sg-form", onSubmit: function (e) { e.preventDefault(); next(); } },
      h("div", { className: "sg-form-progress", role: "progressbar", "aria-valuemin": 0, "aria-valuemax": total, "aria-valuenow": i + 1 },
        h("span", { style: { width: ((i + 1) / total * 100) + "%" } })),
      onFields
        ? h(React.Fragment, null, h("h2", null, p.fieldsTitle || "How can I reach you?"),
            h("div", { className: "sg-form-fields" }, p.fields.map(function (f, k) {
              return h("input", { key: k, className: "sg-input", type: f.type || "text", name: f.name, placeholder: f.label, "aria-label": f.label, required: f.required });
            })))
        : h(React.Fragment, null, h("h2", null, step.question),
            h("div", { className: "sg-form-options" }, step.options.map(function (o, k) {
              var lab = typeof o === "string" ? o : o.label;
              return h("button", { key: k, type: "button", className: "sg-option", "aria-pressed": chosen === lab,
                onClick: function () { var n = Object.assign({}, ans); n[i] = lab; setAns(n); } }, o.icon || null, lab);
            }))),
      h("div", { className: "sg-form-nav" },
        i > 0 ? h(Button, { variant: "outline", onClick: function () { setI(i - 1); } }, "Back") : null,
        h(Button, { type: "submit", variant: onFields ? "default" : "outline", disabled: !onFields && !chosen, style: !onFields && !chosen ? { opacity: .4, cursor: "default" } : undefined },
          onFields ? (p.submitLabel || "Send request") : "Continue")));
  }

  function ListGroup(p) {
    return h("div", null, (p.groups || []).map(function (g, i) {
      return h(React.Fragment, { key: i },
        g.label ? h("div", { className: "sg-list-label" }, g.label) : null,
        h("ul", { className: "sg-list" }, (g.items || []).map(function (it, k) {
          var inner = [h("span", { key: "t", className: "sg-list-title" }, it.title), it.tag ? h(Tag, { key: "g" }, it.tag) : null];
          return h("li", { key: k }, it.href ? h("a", { href: it.href }, inner) : h("div", { className: "sg-list-row" }, inner));
        })));
    }));
  }

  function NumberedPoints(p) {
    return h("ol", { className: "sg-points", style: { listStyle: "none", margin: 0, padding: 0 } }, (p.items || []).map(function (it, i) {
      return h("li", { key: i, className: "sg-point" },
        h("div", { className: "sg-point-num", "aria-hidden": "true" }, i + 1 + (p.start || 0)),
        h("h3", null, it.title), h("p", null, it.text));
    }));
  }

  function Letter(p) {
    return h("div", { className: "sg-letter" }, p.children,
      p.signature ? h("p", { style: { marginTop: "2em" } }, p.signature) : null);
  }

  function CaseStory(p) {
    var slides = p.slides || [];
    var si = React.useState(p.start || 0), i = si[0], setI = si[1];
    var sp = React.useState(0), prog = sp[0], setProg = sp[1];
    var ref = React.useRef(null);
    var auto = p.autoplay !== false && !reduced();
    var dur = p.duration || 5000;
    function go(n) { if (n < 0) n = 0; if (n >= slides.length) { if (p.onClose && !p.inline) p.onClose(); n = p.loop || p.inline ? 0 : slides.length - 1; } setI(n); setProg(0); }
    React.useEffect(function () {
      if (!auto) return;
      var t0 = Date.now(), id = setInterval(function () {
        var v = (Date.now() - t0) / dur; if (v >= 1) { clearInterval(id); go(i + 1); } else setProg(v);
      }, 100);
      return function () { clearInterval(id); };
    }, [i, auto]);
    React.useEffect(function () {
      function k(e) { if (e.key === "ArrowRight") go(i + 1); else if (e.key === "ArrowLeft") go(i - 1); else if (e.key === "Escape" && p.onClose) p.onClose(); }
      var el = p.inline ? ref.current : window; if (!el) return;
      el.addEventListener("keydown", k); return function () { el.removeEventListener("keydown", k); };
    }, [i]);
    React.useEffect(function () { if (!p.inline && ref.current) ref.current.focus(); }, []);
    var s = slides[i] || {};
    var media = s.media ? (typeof s.media === "string" ? h("img", { src: s.media, alt: s.alt || "" }) : s.media) : null;
    return h("div", { ref: ref, tabIndex: -1, className: cx("sg-story", p.inline && "sg-inline"), role: p.inline ? "region" : "dialog", "aria-modal": p.inline ? undefined : true, "aria-label": p.label || "Case", style: { outline: "none" } },
      h("div", { className: "sg-story-bar", "aria-hidden": "true" }, slides.map(function (_, k) {
        return h("span", { key: k }, h("i", { style: { transform: "scaleX(" + (k < i ? 1 : k === i ? (auto ? prog : 1) : 0) + ")" } }));
      })),
      p.onClose ? h("button", { type: "button", className: "sg-story-close", onClick: p.onClose, "aria-label": "Close" },
        h("svg", { width: 12, height: 12, viewBox: "0 0 12 12", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", "aria-hidden": "true" }, h("path", { d: "M2 2l8 8M10 2l-8 8" }))) : null,
      h("div", { className: "sg-story-slide", key: i, style: s.bg ? { background: s.bg } : undefined, "aria-live": "polite" },
        media,
        h("div", { className: "sg-story-copy" },
          s.title ? h("p", { className: "sg-story-title" }, s.title) : null,
          s.text ? h("p", { className: "sg-story-text" }, s.text) : null,
          s.caption ? h("div", { className: "sg-story-caption" }, s.caption) : null)),
      h("button", { type: "button", className: "sg-story-nav sg-prev", onClick: function () { go(i - 1); }, "aria-label": "Previous slide" }),
      h("button", { type: "button", className: "sg-story-nav sg-next", onClick: function () { go(i + 1); }, "aria-label": "Next slide" }));
  }

  function ReadingDock(p) {
    var sp = React.useState(p.progress || 0), prog = sp[0], setProg = sp[1];
    React.useEffect(function () {
      if (p.progress != null) { setProg(p.progress); return; }
      function on() { var d = document.documentElement, m = d.scrollHeight - window.innerHeight; setProg(m > 0 ? window.scrollY / m : 0); }
      on(); window.addEventListener("scroll", on, { passive: true });
      return function () { window.removeEventListener("scroll", on); };
    }, [p.progress]);
    return h("nav", { className: cx("sg-rdock", p.floating && "sg-floating"), "aria-label": "Reading progress" },
      p.secondary ? h("a", { className: "sg-rdock-btn sg-rdock-sec", href: p.secondary.href || "#" }, p.secondary.label) : null,
      h("div", { className: "sg-rdock-track", role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": Math.round(prog * 100) },
        h("span", { style: { transform: "scaleX(" + prog + ")" } })),
      p.cta ? h("a", { className: "sg-rdock-btn sg-rdock-cta", href: p.cta.href || "#" }, p.cta.label) : null);
  }


  /* ===================== Extended blocks ===================== */
  function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  // Scroll progress 0..1 of an element; fn(rect, vh) computes it. override: fixed value (previews, external control).
  function useScrollProgress(ref, fn, override) {
    var st = React.useState(override == null ? 0 : override), prog = st[0], setProg = st[1];
    React.useEffect(function () {
      if (override != null) { setProg(override); return; }
      if (reduced()) { setProg(1); return; }
      var raf = 0;
      function on() { cancelAnimationFrame(raf); raf = requestAnimationFrame(function () { var el = ref.current; if (!el) return; setProg(clamp01(fn(el.getBoundingClientRect(), window.innerHeight))); }); }
      on(); window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on);
      return function () { cancelAnimationFrame(raf); window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
    }, [override]);
    return prog;
  }
  function media(m, alt) { return m == null ? null : (typeof m === "string" ? h("img", { src: m, alt: alt || "", loading: "lazy" }) : m); }
  function actionList(list) {
    return (list || []).map(function (a, i) { return h(Button, { key: i, href: a.href, onClick: a.onClick, variant: a.variant || (i === 0 ? "default" : "outline") }, a.label); });
  }

  function Kicker(p) { return h("span", { className: "sg-kicker" }, p.children); }

  function Wordmark(p) {
    var echo = [];
    for (var i = 0; i < (p.echo || 0); i++) echo.push(h("span", { key: i, className: "sg-wordmark-echo", "aria-hidden": "true" }, String(p.text).charAt(0)));
    var ref = React.useRef(null), wrap = React.useRef(null);
    React.useLayoutEffect(function () {
      if (p.size !== "footer") return;
      function fit() { var el = ref.current, box = wrap.current; if (!el || !box) return;
        el.style.fontSize = ""; var avail = box.clientWidth * 0.98;
        for (var k = 0; k < 3; k++) { var fs = parseFloat(getComputedStyle(el).fontSize), w = el.scrollWidth; if (!w) break; el.style.fontSize = Math.min(fs * avail / w, 480) + "px"; } }
      fit(); window.addEventListener("resize", fit);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
      return function () { window.removeEventListener("resize", fit); };
    }, [p.size, p.text, p.echo]);
    return h(p.as || (p.size === "footer" ? "div" : "section"), { ref: wrap, className: cx("sg-wordmark", p.size === "footer" && "sg-footer-size") },
      h(p.size === "footer" ? "p" : "h1", { ref: ref, className: "sg-wordmark-word", "aria-label": p.echo ? String(p.text) : undefined }, echo, p.text),
      p.tagline ? h("p", { className: "sg-wordmark-tag" }, p.tagline) : null);
  }

  function FeatureStack(p) {
    var items = p.items || [];
    var ref = React.useRef(null);
    var top = p.top || 0;
    var sp = React.useState([]), fades = sp[0], setFades = sp[1];
    React.useEffect(function () {
      if (reduced()) return;
      var raf = 0;
      function on() { cancelAnimationFrame(raf); raf = requestAnimationFrame(function () {
        var root = ref.current; if (!root) return;
        var els = root.querySelectorAll(".sg-fstack-item"), vh = window.innerHeight, f = [];
        for (var i = 0; i < els.length; i++) {
          var next = els[i + 1];
          if (!next) { f.push(0); continue; }
          var nt = next.getBoundingClientRect().top;
          f.push(clamp01(1 - (nt - top) / (vh * 0.6)));
        }
        setFades(f);
      }); }
      on(); window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on);
      return function () { cancelAnimationFrame(raf); window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
    }, [items.length, top]);
    var style = { "--stack-top": top + "px" }; if (p.height) style["--stack-h"] = typeof p.height === "number" ? p.height + "px" : p.height;
    return h("div", { ref: ref, className: "sg-fstack", style: style }, items.map(function (it, i) {
      var f = fades[i] || 0;
      var paras = Array.isArray(it.text) ? it.text : (it.text ? [it.text] : []);
      return h("section", { key: i, className: "sg-fstack-item", style: { zIndex: i + 1 } },
        h("div", { className: "sg-fstack-text", style: f ? { opacity: 1 - f * 0.85, filter: "blur(" + (f * 4).toFixed(1) + "px)" } : undefined },
          it.kicker ? h(Kicker, null, it.kicker) : null,
          h("h2", null, h("span", null, it.title), it.title2 ? h("span", null, it.title2) : null),
          paras.map(function (t, k) { return h("p", { key: k }, t); }),
          it.actions && it.actions.length ? h("div", { className: "sg-fstack-actions" }, actionList(it.actions)) : null),
        h("div", { className: "sg-fstack-media", style: f ? { opacity: 1 - f * 0.85 } : undefined }, media(it.media, it.alt)));
    }));
  }

  function ScrollFillText(p) {
    var ref = React.useRef(null);
    var prog = useScrollProgress(ref, function (r, vh) { return (vh * 0.85 - r.top) / (r.height + vh * 0.4); }, p.progress);
    var words = String(p.text || "").split(/\s+/).filter(Boolean);
    var tail = String(p.tail || "").split(/\s+/).filter(Boolean);
    var all = words.length + tail.length, read = Math.round(prog * all);
    var out = [];
    words.concat(tail).forEach(function (w, i) {
      if (i) out.push(" ");
      out.push(h("span", { key: i, className: cx("sg-fill-w", i >= words.length && "sg-tail", i < read && "is-read") }, w));
    });
    return h(p.as || "p", { ref: ref, className: "sg-fill", "aria-label": words.concat(tail).join(" ") }, h("span", { "aria-hidden": "true" }, out));
  }

  function BlurList(p) {
    var items = p.items || [];
    var ref = React.useRef(null);
    var prog = useScrollProgress(ref, function (r, vh) { var span = r.height - vh; return span > 0 ? -r.top / span : 1; }, p.progress);
    var active = Math.min(items.length - 1, Math.floor(prog * items.length * 0.999));
    var style = {}; if (p.stageHeight) style["--blist-h"] = typeof p.stageHeight === "number" ? p.stageHeight + "px" : p.stageHeight;
    if (p.progress == null) style.height = "calc(" + (items.length * (p.step || 60)) + "vh + var(--blist-h, 100vh))";
    return h("div", { ref: ref, className: cx("sg-blist", p.strike && "sg-strike"), style: style },
      h("div", { className: "sg-blist-stage" },
        h("ul", null, items.map(function (t, i) {
          var d = i - active;
          return h("li", { key: i, className: cx(d === 0 && "is-active", d < 0 && "is-past", d === 1 && "is-near"), "aria-current": d === 0 ? "true" : undefined }, t);
        }))));
  }

  function CardFan(p) {
    var items = p.items || [];
    var ref = React.useRef(null);
    var prog = useScrollProgress(ref, function (r, vh) { return (vh - r.top - r.height * 0.15) / (vh * 0.7); }, p.progress);
    var n = items.length, w = p.width || 420, gap = 24;
    var tiltVar = p.tilt == null ? 4 : p.tilt, overlap = p.overlap == null ? 56 : p.overlap;
    var e = 1 - Math.pow(1 - prog, 3);
    var style = { "--fan-w": w + "px" }; if (p.height) style["--fan-h"] = p.height + "px";
    return h("div", { ref: ref, className: "sg-fan", style: style }, items.map(function (it, i) {
      var k = i - (n - 1) / 2;
      var x = k * (w + gap) * (1 - e) + k * overlap * e;
      var y = Math.abs(k) * 14 * e;
      var rot = k * tiltVar * e;
      return h("figure", { key: i, className: "sg-fan-card", style: { zIndex: 100 - Math.round(Math.abs(k) * 2), transform: "translate(calc(-50% + " + x.toFixed(1) + "px), calc(-50% + " + y.toFixed(1) + "px)) rotate(" + rot.toFixed(2) + "deg)" } },
        media(typeof it === "object" && it && it.src ? it.src : it, it && it.alt));
    }));
  }

  function MediaFrame(p) {
    return h("div", null,
      h("div", { className: cx("sg-mframe", p.whole && "sg-whole") },
        p.background ? h("img", { className: "sg-mframe-bg", src: p.background, alt: "", "aria-hidden": "true" }) : null,
        h("div", { className: "sg-mframe-window" }, media(p.media, p.alt), p.children)),
      p.actions && p.actions.length ? h("div", { className: "sg-mframe-actions" }, actionList(p.actions)) : null);
  }

  function StatTiles(p) {
    return h("dl", { className: cx("sg-stiles", p.scatter && "sg-scatter"), style: { margin: 0 } }, (p.items || []).map(function (it, i) {
      return h("div", { key: i, className: "sg-stile" },
        it.media ? h("img", { className: "sg-stile-media", src: it.media, alt: it.alt || "" }) : null,
        h("dt", { className: "sg-stile-value" }, it.value),
        h("dd", { className: "sg-stile-label", style: { marginLeft: 0 } }, it.label));
    }));
  }

  function railCard(it, i, hidden) {
    var props = { key: i, className: cx("sg-rail-card", it.quote && "sg-rail-quote"), "aria-hidden": hidden ? "true" : undefined };
    if (!it.quote) return h("figure", Object.assign(props, { style: { margin: 0 } }), media(it.media, hidden ? "" : it.alt));
    var initials = it.initials || String(it.name || "").split(/\s+/).map(function (s) { return s.charAt(0); }).join("").slice(0, 2);
    return h("figure", Object.assign(props, { style: { margin: 0 } }),
      h("blockquote", null, it.quote),
      h("figcaption", { className: "sg-rail-person" },
        it.avatar ? h("img", { className: "sg-rail-avatar", src: it.avatar, alt: "" }) : h("span", { className: "sg-rail-avatar", "aria-hidden": "true" }, initials),
        h("span", null, h("span", { className: "sg-rail-name", style: { display: "block" } }, it.name), it.role ? h("span", { className: "sg-rail-role", style: { display: "block" } }, it.role) : null)));
  }
  function TestimonialRail(p) {
    var rows = p.rows || [p.items || []];
    return h("div", { className: "sg-rail-rows", role: "region", "aria-label": p.label || "Testimonials" }, rows.map(function (items, r) {
      return h("div", { key: r, className: cx("sg-rail", r % 2 === 1 && "sg-reverse") },
        h("div", { className: "sg-rail-track", style: p.duration ? { animationDuration: p.duration + "ms" } : undefined },
          items.map(function (it, i) { return railCard(it, "a" + i, false); }),
          items.map(function (it, i) { return railCard(it, "b" + i, true); })));
    }));
  }

  function AudienceCard(p) {
    return h("article", { className: cx("sg-aud", p.reverse && "sg-reverse") },
      h("div", { className: "sg-aud-text" },
        h("h3", null, p.title),
        p.text ? h("p", null, p.text) : null,
        p.action ? h(Button, { href: p.action.href, onClick: p.action.onClick, variant: p.action.variant || "default" }, p.action.label) : null),
      h("div", { className: "sg-aud-media" }, media(p.media, p.alt)));
  }


  /* ===================== Base components (Free, shadcn/ui-compatible) ===================== */
  var uid = 0; function useId(given) { var r = React.useRef(given || ("sg-" + (++uid))); return r.current; }
  function useControlled(value, def, onChange) {
    var st = React.useState(def), inner = st[0], setInner = st[1];
    var ctrl = value !== undefined;
    return [ctrl ? value : inner, function (v) { if (!ctrl) setInner(v); if (onChange) onChange(v); }];
  }
  function portal(node) { return window.ReactDOM && window.ReactDOM.createPortal ? window.ReactDOM.createPortal(node, document.body) : node; }
  function Icon(d, size) { return h("svg", { width: size || 16, height: size || 16, viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, h("path", { d: d })); }
  var ICON = { check: "M3.5 8.5l3 3 6-7", chevron: "M4 6l4 4 4-4", x: "M4 4l8 8M12 4l-8 8", arrow: "M3 8h10M9 4l4 4-4 4", ext: "M6 4h6v6M12 4l-8 8" };

  function IconButton(p) {
    return h(Button, Object.assign({}, omit(p, ["icon"]), { size: p.size || "icon", variant: p.variant || "outline" }), p.icon || p.children);
  }

  function Link(p) {
    var rest = omit(p, ["variant", "external", "arrow", "className", "asChild", "children"]);
    if (p.external) { rest.target = rest.target || "_blank"; rest.rel = rest.rel || "noopener noreferrer"; }
    var kids = [p.children, p.external ? h("span", { key: "e", className: "sg-link-icon", "aria-hidden": "true" }, "↗") : p.arrow ? h("span", { key: "a", className: "sg-link-icon", "aria-hidden": "true" }, "→") : null];
    return slot(p, "a", Object.assign(rest, { className: cx("sg-link", p.variant && p.variant !== "default" && "sg-link-" + p.variant, p.className) }), kids);
  }

  function Label(p) {
    return h("label", Object.assign(omit(p, ["className"]), { className: cx("sg-label", p.className) }), p.children);
  }

  function Input(p) {
    return h("input", Object.assign({ type: "text" }, omit(p, ["className", "variant"]), { className: cx("sg-input", p.variant === "boxed" && "sg-input-boxed", p.className) }));
  }

  function Textarea(p) {
    return h("textarea", Object.assign({ rows: 4 }, omit(p, ["className"]), { className: cx("sg-input sg-textarea", p.className) }));
  }

  // Select — compound API like shadcn/ui: Select > SelectTrigger > SelectValue, SelectContent > SelectItem
  var SelectCtx = React.createContext(null);
  function Select(p) {
    var v = useControlled(p.value, p.defaultValue, p.onValueChange);
    var o = useControlled(p.open, p.defaultOpen || false, p.onOpenChange);
    var labels = React.useRef({});
    var id = useId();
    var tick = React.useState(0); React.useEffect(function () { tick[1](1); }, []);
    var ref = React.useRef(null);
    React.useEffect(function () {
      if (!o[0]) return;
      function out(e) { if (ref.current && !ref.current.contains(e.target)) o[1](false); }
      document.addEventListener("mousedown", out);
      return function () { document.removeEventListener("mousedown", out); };
    }, [o[0]]);
    var ctx = { value: v[0], setValue: function (x) { v[1](x); o[1](false); }, open: o[0], setOpen: o[1], disabled: p.disabled, labels: labels.current, id: id, name: p.name };
    return h(SelectCtx.Provider, { value: ctx }, h("div", { ref: ref, className: "sg-select" }, p.children,
      p.name ? h("input", { type: "hidden", name: p.name, value: v[0] || "" }) : null));
  }
  function SelectTrigger(p) {
    var c = React.useContext(SelectCtx);
    function key(e) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].indexOf(e.key) >= 0) { e.preventDefault(); c.setOpen(true); }
    }
    return h("button", Object.assign(omit(p, ["className", "children", "variant"]), { type: "button", role: "combobox", "aria-expanded": c.open, "aria-controls": c.id + "-list", "aria-haspopup": "listbox", disabled: c.disabled || p.disabled, onClick: function () { c.setOpen(!c.open); }, onKeyDown: key, className: cx("sg-input sg-select-trigger", p.variant === "boxed" && "sg-input-boxed", p.className) }),
      p.children, h("span", { className: "sg-select-chevron" }, Icon(ICON.chevron)));
  }
  function SelectValue(p) {
    var c = React.useContext(SelectCtx);
    var label = c.value != null ? (c.labels[c.value] || c.value) : null;
    return h("span", { className: cx("sg-select-value", label == null && "is-placeholder") }, label == null ? p.placeholder : label);
  }
  function SelectContent(p) {
    var c = React.useContext(SelectCtx);
    var ref = React.useRef(null);
    React.useEffect(function () {
      if (!c.open || !ref.current) return;
      var items = ref.current.querySelectorAll('[role="option"]:not([aria-disabled="true"])');
      var cur = ref.current.querySelector('[aria-selected="true"]') || items[0];
      if (cur) cur.focus();
    }, [c.open]);
    function key(e) {
      var items = Array.prototype.slice.call(ref.current.querySelectorAll('[role="option"]:not([aria-disabled="true"])'));
      var i = items.indexOf(document.activeElement);
      if (e.key === "ArrowDown") { e.preventDefault(); (items[i + 1] || items[0]).focus(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); (items[i - 1] || items[items.length - 1]).focus(); }
      else if (e.key === "Escape" || e.key === "Tab") { c.setOpen(false); }
    }
    // labels must be known even while closed: render hidden
    return h("div", { ref: ref, id: c.id + "-list", role: "listbox", hidden: !c.open, onKeyDown: key, className: cx("sg-select-content", p.className) }, p.children);
  }
  function SelectItem(p) {
    var c = React.useContext(SelectCtx);
    c.labels[p.value] = p.children;
    var sel = c.value === p.value;
    function pick() { if (!p.disabled) c.setValue(p.value); }
    return h("div", { role: "option", tabIndex: -1, "aria-selected": sel, "aria-disabled": p.disabled || undefined, onClick: pick, onKeyDown: function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); } }, className: cx("sg-select-item", p.className) },
      h("span", null, p.children), sel ? h("span", { className: "sg-select-check" }, Icon(ICON.check)) : null);
  }

  function Checkbox(p) {
    var v = useControlled(p.checked, p.defaultChecked || false, p.onCheckedChange);
    var rest = omit(p, ["checked", "defaultChecked", "onCheckedChange", "className"]);
    return h("button", Object.assign(rest, { type: "button", role: "checkbox", "aria-checked": v[0] === "indeterminate" ? "mixed" : !!v[0], "data-state": v[0] ? "checked" : "unchecked", onClick: function () { v[1](v[0] === true ? false : true); }, className: cx("sg-check", p.className) }),
      v[0] === "indeterminate" ? h("span", { className: "sg-check-dash" }) : v[0] ? Icon(ICON.check, 14) : null);
  }

  var RadioCtx = React.createContext(null);
  function RadioGroup(p) {
    var v = useControlled(p.value, p.defaultValue, p.onValueChange);
    var ref = React.useRef(null);
    function key(e) {
      if (["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].indexOf(e.key) < 0) return;
      e.preventDefault();
      var items = Array.prototype.slice.call(ref.current.querySelectorAll('[role="radio"]:not(:disabled)'));
      var i = items.indexOf(document.activeElement), d = (e.key === "ArrowDown" || e.key === "ArrowRight") ? 1 : -1;
      var n = items[(i + d + items.length) % items.length]; if (n) { n.focus(); n.click(); }
    }
    return h(RadioCtx.Provider, { value: { value: v[0], set: v[1], disabled: p.disabled, name: p.name } },
      h("div", { ref: ref, role: "radiogroup", "aria-invalid": p["aria-invalid"], "aria-label": p["aria-label"], "aria-labelledby": p["aria-labelledby"], onKeyDown: key, className: cx("sg-radio-group", p.orientation === "horizontal" && "sg-horizontal", p.className) }, p.children));
  }
  function RadioGroupItem(p) {
    var c = React.useContext(RadioCtx);
    var on = c.value === p.value;
    return h("button", Object.assign(omit(p, ["value", "className"]), { type: "button", role: "radio", "aria-checked": on, "data-state": on ? "checked" : "unchecked", tabIndex: on || (c.value == null) ? 0 : -1, disabled: c.disabled || p.disabled, onClick: function () { c.set(p.value); }, className: cx("sg-radio", p.className) }), on ? h("span", { className: "sg-radio-dot" }) : null);
  }

  function Switch(p) {
    var v = useControlled(p.checked, p.defaultChecked || false, p.onCheckedChange);
    var rest = omit(p, ["checked", "defaultChecked", "onCheckedChange", "className"]);
    return h("button", Object.assign(rest, { type: "button", role: "switch", "aria-checked": !!v[0], "data-state": v[0] ? "checked" : "unchecked", onClick: function () { v[1](!v[0]); }, className: cx("sg-switch", p.className) }), h("span", { className: "sg-switch-thumb" }));
  }

  var AvatarCtx = React.createContext(null);
  function Avatar(p) {
    var st = React.useState("loading");
    return h(AvatarCtx.Provider, { value: st }, h("span", { className: cx("sg-avatar-root", p.size && "sg-avatar-" + p.size, p.className) }, p.children));
  }
  function AvatarImage(p) {
    var st = React.useContext(AvatarCtx);
    if (st[0] === "error" || !p.src) return null;
    return h("img", Object.assign(omit(p, ["className"]), { className: cx("sg-avatar-img", p.className), onLoad: function () { st[1]("loaded"); }, onError: function () { st[1]("error"); }, style: st[0] === "loaded" ? undefined : { opacity: 0 } }));
  }
  function AvatarFallback(p) {
    var st = React.useContext(AvatarCtx);
    if (st[0] === "loaded") return null;
    return h("span", { className: cx("sg-avatar-fallback", p.className), "aria-hidden": p["aria-hidden"] }, p.children);
  }

  function part(cls, tag) { return function (p) { return h(p.as || tag || "div", Object.assign(omit(p, ["className", "as"]), { className: cx(cls, p.className) }), p.children); }; }
  function Card(p) {
    var v = p.variant || "default";
    return h(p.as || "div", Object.assign(omit(p, ["className", "as", "variant"]), { className: cx("sg-card", v !== "default" && "sg-card-" + v, p.className) }), p.children);
  }
  function CardMedia(p) { return h("div", { className: cx("sg-card-media", p.className) }, media(p.src || p.children, p.alt)); }
  var CardMeta = part("sg-card-meta sg-caption");
  var CardHeader = part("sg-card-header"), CardTitle = part("sg-card-title", "h3"), CardDescription = part("sg-card-description", "p"), CardAction = part("sg-card-action"), CardContent = part("sg-card-content"), CardFooter = part("sg-card-footer");

  function Separator(p) {
    var o = p.orientation || "horizontal";
    var deco = p.decorative !== false;
    return h("div", { role: deco ? "none" : "separator", "aria-orientation": deco ? undefined : o, "data-orientation": o, className: cx("sg-separator", "sg-" + o, p.className) });
  }

  function Alert(p) {
    var v = p.variant || "default";
    return h("div", Object.assign(omit(p, ["variant", "className", "icon"]), { role: v === "destructive" ? "alert" : "status", className: cx("sg-alert", v !== "default" && "sg-alert-" + v, p.className) }),
      p.icon || h("span", { className: "sg-alert-mark", "aria-hidden": "true" }), h("div", { className: "sg-alert-body" }, p.children));
  }
  var AlertTitle = part("sg-alert-title", "h5"), AlertDescription = part("sg-alert-description");

  // Toast — Sonner-style API: <Toaster /> once, then toast("Saved") / toast.error(...)
  var toastBus = { list: [], subs: [], n: 0 };
  function emitToasts() { toastBus.subs.forEach(function (f) { f(toastBus.list.slice()); }); }
  function dismissToast(id) { toastBus.list = toastBus.list.filter(function (t) { return t.id !== id; }); emitToasts(); }
  function toast(message, opts) {
    var o = opts || {}, id = o.id || ++toastBus.n;
    toastBus.list = toastBus.list.filter(function (t) { return t.id !== id; }).concat([Object.assign({ id: id, title: message, type: "default", duration: 4000 }, o)]);
    emitToasts(); return id;
  }
  toast.success = function (m, o) { return toast(m, Object.assign({}, o, { type: "success" })); };
  toast.error = function (m, o) { return toast(m, Object.assign({}, o, { type: "error" })); };
  toast.dismiss = function (id) { if (id == null) { toastBus.list = []; emitToasts(); } else dismissToast(id); };
  function ToastItem(t) {
    var st = React.useState(false), paused = st[0], setPaused = st[1];
    React.useEffect(function () {
      if (paused || t.duration === Infinity) return;
      var id = setTimeout(function () { dismissToast(t.id); }, t.duration);
      return function () { clearTimeout(id); };
    }, [paused]);
    return h("li", { className: cx("sg-toast", t.type === "error" && "sg-toast-error"), role: t.type === "error" ? "alert" : "status", onMouseEnter: function () { setPaused(true); }, onMouseLeave: function () { setPaused(false); }, onFocus: function () { setPaused(true); }, onBlur: function () { setPaused(false); } },
      h("span", { className: "sg-toast-mark", "aria-hidden": "true" }),
      h("div", { className: "sg-toast-body" }, h("div", { className: "sg-toast-title" }, t.title), t.description ? h("div", { className: "sg-toast-description" }, t.description) : null),
      t.action ? h(Button, { size: "sm", variant: "outline", onClick: function () { t.action.onClick && t.action.onClick(); dismissToast(t.id); } }, t.action.label) : null,
      h("button", { type: "button", className: "sg-toast-close", "aria-label": "Close", onClick: function () { dismissToast(t.id); } }, Icon(ICON.x, 14)));
  }
  function Toaster(p) {
    var st = React.useState(toastBus.list.slice()), list = st[0], setList = st[1];
    React.useEffect(function () { toastBus.subs.push(setList); return function () { toastBus.subs = toastBus.subs.filter(function (f) { return f !== setList; }); }; }, []);
    var pos = p.position || "bottom-right";
    var node = h("ol", { className: cx("sg-toaster", "sg-" + pos, p.inline && "sg-inline"), "aria-label": "Notifications" }, list.map(function (t) { return h(ToastItem, Object.assign({ key: t.id }, t)); }));
    return p.inline ? node : portal(node);
  }

  // Tooltip — TooltipProvider > Tooltip > TooltipTrigger + TooltipContent
  var TipCtx = React.createContext(null), TipDelay = React.createContext(500);
  function TooltipProvider(p) { return h(TipDelay.Provider, { value: p.delayDuration == null ? 500 : p.delayDuration }, p.children); }
  function Tooltip(p) {
    var delay = React.useContext(TipDelay);
    var o = useControlled(p.open, p.defaultOpen || false, p.onOpenChange);
    var timer = React.useRef(0), id = useId();
    var d = p.delayDuration == null ? delay : p.delayDuration;
    var ctx = { open: o[0], id: id, show: function (now) { clearTimeout(timer.current); timer.current = setTimeout(function () { o[1](true); }, now ? 0 : d); }, hide: function () { clearTimeout(timer.current); o[1](false); } };
    return h(TipCtx.Provider, { value: ctx }, h("span", { className: "sg-tip" }, p.children));
  }
  function TooltipTrigger(p) {
    var c = React.useContext(TipCtx);
    var props = Object.assign(omit(p, ["asChild", "children"]), { "aria-describedby": c.open ? c.id : undefined, onMouseEnter: function () { c.show(); }, onMouseLeave: c.hide, onFocus: function () { c.show(true); }, onBlur: c.hide, onKeyDown: function (e) { if (e.key === "Escape") c.hide(); } });
    return slot(p, "button", Object.assign({ type: "button" }, props, { className: cx(!p.asChild && "sg-tip-trigger", p.className) }), p.children);
  }
  function TooltipContent(p) {
    var c = React.useContext(TipCtx);
    if (!c.open) return null;
    return h("span", { id: c.id, role: "tooltip", className: cx("sg-tip-content", "sg-" + (p.side || "top"), p.className) }, p.children);
  }

  // Dialog — Dialog > DialogTrigger + DialogContent > DialogHeader (DialogTitle, DialogDescription), DialogFooter, DialogClose
  var DlgCtx = React.createContext(null);
  function Dialog(p) {
    var o = useControlled(p.open, p.defaultOpen || false, p.onOpenChange);
    var id = useId(), back = React.useRef(null);
    return h(DlgCtx.Provider, { value: { open: o[0], setOpen: o[1], id: id, back: back } }, p.children);
  }
  function DialogTrigger(p) {
    var c = React.useContext(DlgCtx);
    return slot(p, "button", Object.assign({ type: "button" }, omit(p, ["asChild", "children"]), { "aria-haspopup": "dialog", "aria-expanded": c.open, onClick: function (e) { c.back.current = e.currentTarget; c.setOpen(true); } }), p.children);
  }
  function DialogClose(p) {
    var c = React.useContext(DlgCtx);
    return slot(p, "button", Object.assign({ type: "button" }, omit(p, ["asChild", "children"]), { onClick: function () { c.setOpen(false); } }), p.children);
  }
  function DialogContent(p) {
    var c = React.useContext(DlgCtx);
    var ref = React.useRef(null);
    React.useEffect(function () {
      if (!c.open) return;
      var el = ref.current, prev = document.activeElement;
      var f = el && el.querySelector('[autofocus], input, select, textarea, button:not(.sg-dialog-x), [href]');
      (f || el).focus();
      var ov = document.body.style.overflow; if (!p.inline) document.body.style.overflow = "hidden";
      function key(e) {
        if (e.key === "Escape") { e.preventDefault(); c.setOpen(false); }
        if (e.key === "Tab") {
          var items = el.querySelectorAll('button:not(:disabled), [href], input:not(:disabled), select, textarea, [tabindex]:not([tabindex="-1"])');
          if (!items.length) return;
          var first = items[0], last = items[items.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
      document.addEventListener("keydown", key);
      return function () { document.removeEventListener("keydown", key); document.body.style.overflow = ov; var b = c.back.current || prev; if (b && b.focus) b.focus(); };
    }, [c.open]);
    if (!c.open) return null;
    var box = h("div", { className: cx("sg-dialog-layer", p.inline && "sg-inline") },
      h("div", { className: "sg-dialog-overlay", onClick: function () { c.setOpen(false); } }),
      h("div", { ref: ref, role: p.role || "dialog", "aria-modal": "true", "aria-labelledby": c.id + "-t", "aria-describedby": c.id + "-d", tabIndex: -1, className: cx("sg-dialog", p.className) },
        p.children,
        p.showCloseButton === false ? null : h("button", { type: "button", className: "sg-dialog-x", "aria-label": "Close", onClick: function () { c.setOpen(false); } }, Icon(ICON.x))));
    return p.inline ? box : portal(box);
  }
  var DialogHeader = part("sg-dialog-header"), DialogFooter = part("sg-dialog-footer");
  function DialogTitle(p) { var c = React.useContext(DlgCtx); return h("h2", { id: c.id + "-t", className: cx("sg-dialog-title", p.className) }, p.children); }
  function DialogDescription(p) { var c = React.useContext(DlgCtx); return h("p", { id: c.id + "-d", className: cx("sg-dialog-description", p.className) }, p.children); }

  window.DesignsByLuca = Object.assign(window.DesignsByLuca || {}, { Button: Button, NavBar: NavBar, Hero: Hero, ProjectEntry: ProjectEntry, Footer: Footer, Reveal: Reveal, ScrollHint: ScrollHint, VideoToggle: VideoToggle, AnnouncementBar: AnnouncementBar, SectionTitle: SectionTitle, FeatureTiles: FeatureTiles, StatRow: StatRow, Accordion: Accordion, ContactDock: ContactDock, StepForm: StepForm, ListGroup: ListGroup, Tag: Tag, NumberedPoints: NumberedPoints, Letter: Letter, CaseStory: CaseStory, ReadingDock: ReadingDock, Kicker: Kicker, Wordmark: Wordmark, FeatureStack: FeatureStack, ScrollFillText: ScrollFillText, BlurList: BlurList, CardFan: CardFan, MediaFrame: MediaFrame, StatTiles: StatTiles, TestimonialRail: TestimonialRail, AudienceCard: AudienceCard, Badge: Badge, IconButton: IconButton, Link: Link, Label: Label, Input: Input, Textarea: Textarea, Select: Select, SelectTrigger: SelectTrigger, SelectValue: SelectValue, SelectContent: SelectContent, SelectItem: SelectItem, Checkbox: Checkbox, RadioGroup: RadioGroup, RadioGroupItem: RadioGroupItem, Switch: Switch, Avatar: Avatar, AvatarImage: AvatarImage, AvatarFallback: AvatarFallback, Card: Card, CardMedia: CardMedia, CardMeta: CardMeta, CardHeader: CardHeader, CardTitle: CardTitle, CardDescription: CardDescription, CardAction: CardAction, CardContent: CardContent, CardFooter: CardFooter, Separator: Separator, Alert: Alert, AlertTitle: AlertTitle, AlertDescription: AlertDescription, Toaster: Toaster, Toast: Toaster, toast: toast, Tooltip: Tooltip, TooltipProvider: TooltipProvider, TooltipTrigger: TooltipTrigger, TooltipContent: TooltipContent, Dialog: Dialog, DialogTrigger: DialogTrigger, DialogContent: DialogContent, DialogHeader: DialogHeader, DialogTitle: DialogTitle, DialogDescription: DialogDescription, DialogFooter: DialogFooter, DialogClose: DialogClose });
})();
