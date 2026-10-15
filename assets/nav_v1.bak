/* Barra di navigazione comune */
(function () {
  var s = document.currentScript, base = (typeof window.__BASE === "string") ? window.__BASE : s.src.replace(/assets\/nav\.js.*$/, "");
  var css = ".sn-bar{background:#12284f;color:#fff;font:14px/1.2 system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif;display:flex;flex-wrap:wrap;align-items:center;gap:4px 18px;padding:8px 16px;position:relative;z-index:30}" +
    ".sn-bar a,.sn-bar summary{color:#e8eef8;text-decoration:none;cursor:pointer;padding:6px 2px;border-bottom:2px solid transparent;list-style:none}" +
    ".sn-bar a:hover,.sn-bar summary:hover,.sn-bar a.on,.sn-bar summary.on{color:#fff;border-bottom-color:#f2b266}" +
    ".sn-bar .sn-brand{font-weight:700;color:#fff;margin-right:8px}" +
    ".sn-bar summary::-webkit-details-marker{display:none}.sn-bar summary::after{content:' ▾';font-size:.8em}" +
    ".sn-bar details{position:relative}.sn-menu{position:absolute;top:100%;left:-8px;background:#fff;border:1px solid #cfd8d8;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.25);padding:6px;min-width:290px;display:flex;flex-direction:column;max-height:80vh;overflow:auto}" +
    ".sn-menu a{color:#1d2433;padding:7px 10px;border:0;border-radius:6px;font-size:.92rem}.sn-menu a:hover,.sn-menu a.on{background:#eef6f6;color:#0F6E6E;border:0}" +
    ".sn-sp{flex:1}.sn-by{font-size:.82rem;color:#f2b266}" +
    "@media(max-width:560px){.sn-menu{position:fixed;left:12px;right:12px;top:auto;min-width:0}.sn-sp,.sn-by{display:none}}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  var PG = [["statistica.html", "Dati e statistica descrittiva"], ["python.html", "Python nel browser"], ["matrici.html", "Trasformazioni con matrici"], ["regressione.html", "Regressione e classificazione"], ["bayes.html", "Probabilità e Naive Bayes"], ["knn.html", "KNN: classificare per somiglianza"], ["albero.html", "Alberi di decisione ed entropia"], ["kmeans.html", "K-means: raggruppare"], ["rete-neurale.html", "Reti neurali"], ["cnn.html", "Filtri e reti convoluzionali"], ["testo.html", "Testo e parole come numeri"]];
  var path = location.pathname, inPg = path.indexOf("/playground/") > -1, here = path.split("/").pop() || "index.html";
  function a(h, t, on) { return "<a href='" + base + h + "'" + (on ? " class='on'" : "") + ">" + t + "</a>"; }
  var menu = a("playground.html", "Tutti i playground", here === "playground.html") + PG.map(function (p) { return a("playground/" + p[0], p[1], inPg && here === p[0]); }).join("");
  var bar = document.createElement("div"); bar.className = "sn-bar"; bar.setAttribute("role", "navigation"); bar.setAttribute("aria-label", "Navigazione");
  bar.innerHTML = "<a class='sn-brand' href='" + base + "index.html'>Matematica, Dati e IA</a>" + a("percorso.html", "Percorso", here === "percorso.html") +
    "<details><summary" + (inPg || here === "playground.html" ? " class='on'" : "") + ">Playground</summary><div class='sn-menu'>" + menu + "</div></details><span class='sn-sp'></span><span class='sn-by'>Prof. Michele Crispoltoni</span>";
  function put() { document.body.insertBefore(bar, document.body.firstChild); }
  if (document.body) put(); else document.addEventListener("DOMContentLoaded", put);
  document.addEventListener("click", function (e) { var d = bar.querySelector("details"); if (d && !d.contains(e.target)) d.open = false; });
})();
