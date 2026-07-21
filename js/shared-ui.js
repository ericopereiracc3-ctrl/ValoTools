(function () {
  "use strict";

  const LANGUAGE_KEY = "valotools-language";
  const INSIGHTS_URL = "data/insights.json";
  const AUTOPLAY_DELAY = 7600;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const sharedText = {
    en: {
      navEdpi: "eDPI Calculator",
      navConverter: "Sensitivity Converter",
      navProSettings: "Pro Settings",
      navCrosshairs: "Crosshair Lab",
      disclaimer: "ValoTools is not affiliated with Riot Games. Valorant is a trademark of Riot Games.",
      insightLabel: "Useful context",
      previous: "Previous insight",
      next: "Next insight",
      dots: "Choose insight",
      goTo: "Show insight {number}"
    },
    es: {
      navEdpi: "Calculadora de eDPI",
      navConverter: "Conversor de sensibilidad",
      navProSettings: "Configuraciones Pro",
      navCrosshairs: "Laboratorio de miras",
      disclaimer: "ValoTools no está afiliado con Riot Games. Valorant es una marca registrada de Riot Games.",
      insightLabel: "Contexto útil",
      previous: "Información anterior",
      next: "Información siguiente",
      dots: "Elegir información",
      goTo: "Mostrar información {number}"
    }
  };

  let currentLanguage = localStorage.getItem(LANGUAGE_KEY) === "es" ? "es" : "en";
  const carousels = [];

  function centerActiveNavigation() {
    document.querySelectorAll("[data-nav-scroller]").forEach((nav) => {
      const active = nav.querySelector(".tool-nav-link.active");
      if (!active) return;

      const target = active.offsetLeft - ((nav.clientWidth - active.offsetWidth) / 2);
      nav.scrollLeft = Math.max(0, target);
    });
  }

  function applySharedLanguage(language, announce = true) {
    currentLanguage = language === "es" ? "es" : "en";
    localStorage.setItem(LANGUAGE_KEY, currentLanguage);
    document.documentElement.lang = currentLanguage;

    const text = sharedText[currentLanguage];
    const navText = {
      navEdpi: text.navEdpi,
      navConverter: text.navConverter,
      navProSettings: text.navProSettings,
      navCrosshairs: text.navCrosshairs
    };

    Object.entries(navText).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    });

    const disclaimer = document.getElementById("disclaimerText");
    if (disclaimer) disclaimer.textContent = text.disclaimer;

    document.querySelectorAll(".lang-btn").forEach((button) => {
      const active = button.dataset.lang === currentLanguage;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active.toString());
    });

    carousels.forEach((carousel) => carousel.setLanguage(currentLanguage));
    requestAnimationFrame(centerActiveNavigation);

    if (announce) {
      document.dispatchEvent(new CustomEvent("valotools:languagechange", {
        detail: { language: currentLanguage }
      }));
    }
  }

  class InsightCarousel {
    constructor(root, items) {
      this.root = root;
      this.items = items;
      this.index = 0;
      this.timer = null;
      this.paused = false;
      this.language = currentLanguage;
      this.stage = root.querySelector(".insight-stage");
      this.title = root.querySelector(".insight-title");
      this.body = root.querySelector(".insight-body");
      this.dots = root.querySelector(".insight-dots");
      this.previousButton = root.querySelector("[data-insight-prev]");
      this.nextButton = root.querySelector("[data-insight-next]");

      this.buildDots();
      this.bindEvents();
      this.setLanguage(this.language);
      this.start();
    }

    buildDots() {
      this.dots.replaceChildren();
      this.items.forEach((item, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "insight-dot";
        button.addEventListener("click", () => {
          this.pause();
          this.show(index);
        });
        this.dots.append(button);
      });
    }

    bindEvents() {
      this.previousButton.addEventListener("click", () => {
        this.pause();
        this.show(this.index - 1);
      });

      this.nextButton.addEventListener("click", () => {
        this.pause();
        this.show(this.index + 1);
      });

      this.root.addEventListener("mouseenter", () => this.pause());
      this.root.addEventListener("mouseleave", () => this.resume());
      this.root.addEventListener("focusin", () => this.pause());
      this.root.addEventListener("focusout", (event) => {
        if (!this.root.contains(event.relatedTarget)) this.resume();
      });
      this.root.addEventListener("pointerdown", () => this.pause());
      this.root.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          this.pause();
          this.show(this.index - 1);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          this.pause();
          this.show(this.index + 1);
        }
      });

      document.addEventListener("visibilitychange", () => {
        if (document.hidden) this.pause();
        else this.resume();
      });
    }

    setLanguage(language) {
      this.language = language;
      const text = sharedText[language];
      this.root.querySelector(".insight-label").textContent = text.insightLabel;
      this.previousButton.setAttribute("aria-label", text.previous);
      this.nextButton.setAttribute("aria-label", text.next);
      this.dots.setAttribute("aria-label", text.dots);
      [...this.dots.children].forEach((dot, index) => {
        dot.setAttribute("aria-label", text.goTo.replace("{number}", index + 1));
      });
      this.render();
    }

    show(index) {
      this.index = (index + this.items.length) % this.items.length;

      if (reducedMotion.matches) {
        this.render();
        return;
      }

      this.stage.classList.add("is-changing");
      window.setTimeout(() => {
        this.render();
        this.stage.classList.remove("is-changing");
      }, 180);
    }

    render() {
      const content = this.items[this.index]?.[this.language] || this.items[this.index]?.en;
      if (!content) return;

      this.title.textContent = content.title;
      this.body.textContent = content.body;
      [...this.dots.children].forEach((dot, index) => {
        const active = index === this.index;
        dot.classList.toggle("active", active);
        dot.setAttribute("aria-pressed", active.toString());
      });
    }

    start() {
      if (reducedMotion.matches || this.items.length < 2) return;
      this.stop();
      this.timer = window.setInterval(() => {
        if (!this.paused) this.show(this.index + 1);
      }, AUTOPLAY_DELAY);
    }

    stop() {
      if (this.timer) window.clearInterval(this.timer);
      this.timer = null;
    }

    pause() {
      this.paused = true;
    }

    resume() {
      this.paused = false;
      if (!this.timer) this.start();
    }
  }

  async function initializeCarousels() {
    const roots = [...document.querySelectorAll("[data-insights]")];
    if (!roots.length) return;

    try {
      const response = await fetch(INSIGHTS_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();

      roots.forEach((root) => {
        const items = data[root.dataset.insights];
        if (Array.isArray(items) && items.length) {
          carousels.push(new InsightCarousel(root, items));
        }
      });
    } catch (error) {
      console.error("Unable to load ValoTools insights:", error);
      roots.forEach((root) => root.hidden = true);
    }
  }

  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.addEventListener("click", () => applySharedLanguage(button.dataset.lang));
  });

  window.addEventListener("resize", centerActiveNavigation, { passive: true });
  document.fonts?.ready.then(centerActiveNavigation);
  reducedMotion.addEventListener?.("change", () => {
    carousels.forEach((carousel) => {
      carousel.stop();
      if (!reducedMotion.matches) carousel.start();
    });
  });

  window.ValoToolsUI = {
    getLanguage: () => currentLanguage,
    setLanguage: (language) => applySharedLanguage(language)
  };

  applySharedLanguage(currentLanguage, false);
  initializeCarousels();
})();
