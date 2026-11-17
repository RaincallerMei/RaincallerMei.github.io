(function () {
  var themes = [
    ["light", "Light", "#F7EEDD"],
    ["midnight", "Midnight", "#0e1a2b"],
    ["graphite", "Graphite", "#17181b"],
    ["aurora", "Aurora", "#150f24"]
  ];
  var root = document.documentElement;

  function isValid(name) {
    return themes.some(function (t) { return t[0] === name; });
  }

  function savedTheme() {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
  }

  function initialTheme() {
    var saved = savedTheme();
    if (isValid(saved)) return saved;
    return "midnight";
  }

  function applyTheme(name) {
    root.dataset.theme = name;
    document.querySelectorAll("[data-theme-choice]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.themeChoice === name);
    });
    try { localStorage.setItem("theme", name); } catch (e) {}
  }

  function buildSwitch() {
    var box = document.createElement("div");
    box.className = "theme-switch";
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", "Colour theme");
    themes.forEach(function (t) {
      var b = document.createElement("button");
      b.type = "button";
      b.dataset.themeChoice = t[0];
      b.title = t[1];
      b.innerHTML = '<span class="dot" style="background:' + t[2] + '"></span><span class="label-text">' + t[1] + "</span>";
      b.addEventListener("click", function () { applyTheme(t[0]); });
      box.appendChild(b);
    });
    document.body.appendChild(box);
    applyTheme(root.dataset.theme);
  }

  root.dataset.theme = initialTheme();
  document.addEventListener("DOMContentLoaded", buildSwitch);
})();
