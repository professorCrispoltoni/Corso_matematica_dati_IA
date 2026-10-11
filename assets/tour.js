/* Motore delle esperienze guidate, comune alle pagine nuove */
(function () {
  var css = "#tourOver{display:none;position:fixed;inset:0;z-index:50;pointer-events:none}#tourHole{position:fixed;border-radius:10px;box-shadow:0 0 0 9999px rgba(15,30,60,.58);outline:3px solid #f2b266;transition:left .25s,top .25s,width .25s,height .25s;animation:tpulse 1.6s infinite}@keyframes tpulse{50%{outline-color:#fff}}" +
    "#tourCard{position:fixed;z-index:60;width:min(400px,calc(100vw - 24px));background:#fff;color:#1d2433;border:1px solid #cfd8d8;border-top:5px solid #0F6E6E;border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,.35);padding:10px 14px 12px;pointer-events:auto;font:14px/1.4 system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif}" +
    "#tourKick{font-size:.72rem;color:#0F6E6E;font-weight:700;text-transform:uppercase;letter-spacing:.03em}#tourTitle{margin:3px 0 4px;font-size:1.02rem;color:#1F3864}#tourText{font-size:.9rem;line-height:1.4}" +
    "#tourDots{display:flex;gap:4px;margin:8px 0}#tourDots i{flex:1;height:4px;border-radius:2px;background:#d6dede}#tourDots i.ok{background:#0F6E6E}#tourDots i.on{background:#C0611B}" +
    ".tbtn{display:flex;gap:6px;flex-wrap:wrap;align-items:center}.tbtn button{font:inherit;font-size:.85rem;padding:6px 10px;border-radius:6px;border:1px solid #1F3864;background:#fff;color:#1F3864;cursor:pointer}.tbtn button:disabled{opacity:.4;cursor:default}" +
    ".tbtn #tourNext{background:#1F3864;color:#fff;margin-left:auto}.tbtn #tourDo{background:#C0611B;border-color:#C0611B;color:#fff}.tbtn #tourExit{border-color:#aaa;color:#555}" +
    "#tourMenu{display:none;position:fixed;inset:0;z-index:70;background:rgba(15,30,60,.55);align-items:center;justify-content:center;padding:12px;font:14px/1.4 system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif}#tourMenu .tm{background:#fff;color:#1d2433;border-radius:12px;max-width:760px;width:100%;max-height:90vh;overflow:auto;padding:14px 18px}" +
    "#tourMenu h3{margin:0 0 4px;color:#1F3864}#tourMenu .tmh{display:flex;justify-content:space-between;align-items:center}#tourMenu .tmh button{font:inherit;padding:5px 10px;border:1px solid #1F3864;background:#fff;color:#1F3864;border-radius:6px;cursor:pointer}" +
    "button.ex{display:block;width:100%;text-align:left;font:inherit;background:#fff;border:1px solid #cfd8d8;border-left:4px solid #0F6E6E;border-radius:8px;padding:8px 10px;margin-bottom:6px;cursor:pointer;color:#1d2433}button.ex:hover{background:#eef6f6}" +
    "button.ex b{display:block;color:#1F3864;font-size:.92rem}button.ex span{display:block;font-size:.8rem;color:#4a5568;margin:2px 0}button.ex em{font-size:.72rem;color:#0F6E6E;font-style:normal;font-weight:600}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  var $ = function (id) { return document.getElementById(id); };
  var host = document.createElement("div");
  host.innerHTML = "<div id='tourOver'><div id='tourHole'></div><div id='tourCard' role='dialog' aria-live='polite' aria-label='Esperienza guidata'><div id='tourKick'></div><h4 id='tourTitle'></h4><div id='tourText'></div><div id='tourDots'></div>" +
    "<div class='tbtn'><button id='tourExit' title='Esci (Esc)'>✕ Esci</button><button id='tourPrev'>◀ Indietro</button><button id='tourDo'></button><button id='tourNext'>Avanti ▶</button></div></div></div>" +
    "<div id='tourMenu'><div class='tm'><div class='tmh'><h3>🎓 Esperienze guidate</h3><button id='tourMenuClose'>✕ Chiudi</button></div>" +
    "<p style='font-size:.88rem;margin:4px 0'>Ogni esperienza evidenzia cosa guardare o cliccare e spiega il passaggio. Usa <b>Avanti/Indietro</b> (o le frecce) oppure il pulsante arancione <b>“Fallo per me”</b>. Con <b>Esc</b> esci e continui da solo.</p><div id='tourMenuList'></div></div></div>";
  document.body.appendChild(host);
  var T = { exp: null, i: 0, done: {}, raf: 0, EXPS: [] };
  function rect(el) {
    var l = (Array.isArray(el) ? el : [el]).map(function (q) { return document.querySelector(q); }).filter(Boolean), r = null;
    l.forEach(function (e) { var b = e.getBoundingClientRect(); if (!b.width && !b.height) return; r = r ? { left: Math.min(r.left, b.left), top: Math.min(r.top, b.top), right: Math.max(r.right, b.right), bottom: Math.max(r.bottom, b.bottom) } : { left: b.left, top: b.top, right: b.right, bottom: b.bottom }; });
    return r;
  }
  function place() {
    if (!T.exp) return; var st = T.exp.steps[T.i], card = $("tourCard"), hole = $("tourHole"), W = innerWidth, H = innerHeight, r = rect(st.el), cw = card.offsetWidth, ch = card.offsetHeight;
    if (!r) { hole.style.cssText = "left:" + W / 2 + "px;top:" + H / 2 + "px;width:0;height:0;outline:none"; card.style.left = Math.max(12, (W - cw) / 2) + "px"; card.style.top = Math.max(12, (H - ch) / 2) + "px"; return; }
    var p = 6, L = r.left - p, Tp = r.top - p, Wd = r.right - r.left + 2 * p, Hh = r.bottom - r.top + 2 * p;
    hole.style.cssText = "left:" + L + "px;top:" + Tp + "px;width:" + Wd + "px;height:" + Hh + "px";
    var x = Math.min(Math.max(12, L), W - cw - 12), y;
    if (H - (Tp + Hh) >= ch + 16) y = Tp + Hh + 12; else if (Tp >= ch + 16) y = Tp - ch - 12; else { y = H - ch - 12; x = W - cw - 12; }
    card.style.left = x + "px"; card.style.top = Math.max(8, y) + "px";
  }
  function loop() { place(); T.raf = requestAnimationFrame(loop); }
  function show() {
    var e = T.exp, st = e.steps[T.i], n = e.steps.length;
    if (e.onShow) e.onShow(st);
    var first = document.querySelector(Array.isArray(st.el) ? st.el[0] : st.el);
    if (first) { var b = first.getBoundingClientRect(), tall = b.height > innerHeight * 0.55; if (b.top < 70 || b.bottom > innerHeight - 10 || tall) first.scrollIntoView({ block: tall ? "start" : "center" }); }
    $("tourKick").textContent = e.title + " · passo " + (T.i + 1) + " di " + n; $("tourTitle").textContent = st.t; $("tourText").innerHTML = st.x;
    $("tourDots").innerHTML = e.steps.map(function (_, k) { return "<i class='" + (k === T.i ? "on" : k < T.i ? "ok" : "") + "'></i>"; }).join("");
    $("tourPrev").disabled = T.i === 0; var sd = st.apply && T.i > 0 && st.btn !== "";
    $("tourDo").style.display = sd ? "" : "none"; $("tourDo").textContent = st.btn ? "👉 " + st.btn : "👉 Fallo per me"; $("tourNext").textContent = T.i === n - 1 ? "Fine ✓" : "Avanti ▶"; place();
  }
  function ap(st) { try { st.apply && st.apply(); } catch (err) { console.error(err); } }
  T.start = function (id) {
    var e = T.EXPS.filter(function (x) { return x.id === id; })[0]; if (!e) return; $("tourMenu").style.display = "none"; T.exp = e; T.i = 0;
    $("tourOver").style.display = "block"; ap(e.steps[0]); T.done = { 0: true }; cancelAnimationFrame(T.raf); show(); loop(); $("tourNext").focus();
  };
  T.end = function () { var e = T.exp; T.exp = null; cancelAnimationFrame(T.raf); $("tourOver").style.display = "none"; if (e && e.onEnd) e.onEnd(); };
  function next() { var e = T.exp; if (!e) return; var st = e.steps[T.i]; if (st.apply && T.i > 0 && !T.done[T.i]) ap(st); T.done[T.i] = true; if (T.i >= e.steps.length - 1) { T.end(); return; } T.i++; show(); }
  function prev() { if (T.exp && T.i > 0) { T.i--; show(); } }
  function menu() {
    $("tourMenuList").innerHTML = T.EXPS.map(function (x) { return "<button class='ex' data-id='" + x.id + "'><b>▶ " + x.title + "</b><span>" + x.desc + "</span><em>" + x.time + " · " + x.steps.length + " passi</em></button>"; }).join("");
    $("tourMenu").style.display = "flex"; Array.prototype.forEach.call($("tourMenuList").querySelectorAll(".ex"), function (b) { b.onclick = function () { T.start(b.getAttribute("data-id")); }; });
  }
  T.init = function (exps) {
    T.EXPS = exps; var mb = $("tourMenuBtn"); if (mb) mb.onclick = menu;
    $("tourNext").onclick = next; $("tourPrev").onclick = prev; $("tourDo").onclick = function () { var st = T.exp.steps[T.i]; ap(st); T.done[T.i] = true; }; $("tourExit").onclick = T.end;
    $("tourMenuClose").onclick = function () { $("tourMenu").style.display = "none"; }; $("tourMenu").addEventListener("click", function (e) { if (e.target.id === "tourMenu") $("tourMenu").style.display = "none"; });
    var lists = document.querySelectorAll("[data-tourlist]"); Array.prototype.forEach.call(lists, function (L) {
      L.innerHTML = exps.map(function (x) { return "<button class='ex' data-id='" + x.id + "'><b>▶ " + x.title + "</b><span>" + x.desc + "</span><em>" + x.time + " · " + x.steps.length + " passi</em></button>"; }).join("");
      Array.prototype.forEach.call(L.querySelectorAll(".ex"), function (b) { b.onclick = function () { T.start(b.getAttribute("data-id")); }; }); });
    document.addEventListener("keydown", function (e) { var tag = (e.target.tagName || "").toLowerCase();
      if (e.key === "Escape") { if (T.exp) T.end(); $("tourMenu").style.display = "none"; return; }
      if (!T.exp || tag === "input" || tag === "select" || tag === "textarea") return;
      if (e.key === "ArrowRight") { e.preventDefault(); next(); } else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); } });
    var h = location.hash.replace("#", ""); if (h) setTimeout(function () { T.start(h); }, 300);
  };
  window.Tour = T;
})();
