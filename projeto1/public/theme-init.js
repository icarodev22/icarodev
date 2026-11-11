// EPOCH.ia — aplica o tema escolhido antes da pintura (evita "flash" de tema).
(function () {
  try {
    var pref = localStorage.getItem("p1:tema") || "escuro";
    var theme = pref === "claro" ? "light" : pref === "sistema"
      ? (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark")
      : "dark";
    document.documentElement.dataset.theme = theme;
    if (localStorage.getItem("p1:animacoes") === "reduzidas") document.documentElement.dataset.motion = "reduce";
  } catch {
    /* armazenamento indisponível: mantém o tema escuro padrão */
  }
})();
