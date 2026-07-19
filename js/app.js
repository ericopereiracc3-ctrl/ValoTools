const dpiInput = document.getElementById('dpi');
  const sensInput = document.getElementById('sens');
  const calcBtn = document.getElementById('calcBtn');
  const result = document.getElementById('result');
  const resultValue = document.getElementById('resultValue');
  const badgeWrap = document.getElementById('badgeWrap');
  const resultNote = document.getElementById('resultNote');
  const scaleMarker = document.getElementById("scaleMarker");
  const scaleLow = document.getElementById("scaleLow");
const scaleMedium = document.getElementById("scaleMedium");
const scaleHigh = document.getElementById("scaleHigh");
const copyBtn = document.getElementById("copyBtn");
const copyText = document.getElementById("copyText");
const targetDpi = document.getElementById("targetDpi");
const convertedValue = document.getElementById("convertedValue");
const targetQuickButtons = document.querySelectorAll(
  ".target-quick-buttons button"
);

  document.querySelectorAll('.quick-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const target = document.getElementById(btn.dataset.target);
      target.value = btn.dataset.val;
      target.focus();
    });
  });

 function classify(edpi, language = "en") {
  const resultTexts = {
    en: {
      low: {
        label: "LOW SENS — CONTROL",
        note:
          "Wide mouse movements with greater precision for long-range flicks. Ideal for more static players."
      },
      mid: {
        label: "MEDIUM SENS — BALANCE",
        note:
          "A balanced setup between precision and fast movement. Common among competitive players."
      },
      high: {
        label: "HIGH SENS — REACTION",
        note:
          "Fast turns with less hand movement. Requires stronger fine control to avoid overshooting."
      }
    },

    es: {
      low: {
        label: "SENS BAJA — CONTROL",
        note:
          "Movimientos amplios del mouse con mayor precisión para flicks largos. Ideal para jugadores de mira estática."
      },
      mid: {
        label: "SENS MEDIA — EQUILIBRIO",
        note:
          "Un equilibrio entre precisión y movimientos rápidos. Muy común entre jugadores competitivos."
      },
      high: {
        label: "SENS ALTA — REACCIÓN",
        note:
          "Giros rápidos con poco movimiento de mano. Exige mayor control fino para no pasarte del blanco."
      }
    }
  };

  const text = resultTexts[language] || resultTexts.en;

  if (edpi < 220) {
    return {
      tier: "low",
      label: text.low.label,
      note: text.low.note
    };
  }

  if (edpi <= 400) {
    return {
      tier: "mid",
      label: text.mid.label,
      note: text.mid.note
    };
  }

  return {
    tier: "high",
    label: text.high.label,
    note: text.high.note
  };
}
  

  function calculate(){
    const dpi = parseFloat(dpiInput.value);
    const sens = parseFloat(sensInput.value);

    if (!dpi || !sens || dpi <= 0 || sens <= 0) {
      dpiInput.style.setProperty('--err','1');
      [dpiInput, sensInput].forEach(el=>{
        if (!parseFloat(el.value) || parseFloat(el.value) <= 0) {
          el.parentElement.style.borderColor = '#ff4655';
          el.parentElement.style.boxShadow = '0 0 0 1px #ff4655';
          setTimeout(()=>{
            el.parentElement.style.borderColor = '';
            el.parentElement.style.boxShadow = '';
          }, 900);
        }
      });
      return;
    }

    const edpi = dpi * sens;
    const targetDpiValue = parseFloat(targetDpi.value);

if (targetDpiValue > 0) {
  const equivalentSens = edpi / targetDpiValue;
  convertedValue.textContent = equivalentSens.toFixed(3);
}
    const markerPosition = Math.min((edpi / 600) * 100, 100);
scaleMarker.style.left = `${markerPosition}%`;
const info = classify(edpi, localStorage.getItem("valotools-language") || "en")
    resultValue.textContent = edpi % 1 === 0 ? edpi.toFixed(0) : edpi.toFixed(1);
    badgeWrap.innerHTML = `<span class="badge ${info.tier}">${info.label}</span>`;
    resultNote.textContent = info.note;

    result.classList.remove('show');
    void result.offsetWidth;
    result.classList.add('show');
  }
function updateEquivalentSensitivity() {
  const dpi = parseFloat(dpiInput.value);
  const sens = parseFloat(sensInput.value);
  const targetDpiValue = parseFloat(targetDpi.value);

  if (dpi > 0 && sens > 0 && targetDpiValue > 0) {
    const edpi = dpi * sens;
    convertedValue.textContent = (edpi / targetDpiValue).toFixed(3);
  } else {
    convertedValue.textContent = "—";
  }
}

function updateActiveTargetButton() {
  targetQuickButtons.forEach((button) => {
    const isActive = button.dataset.targetDpi === targetDpi.value;
    button.classList.toggle("active", isActive);
  });
}

targetDpi.addEventListener("input", () => {
  updateEquivalentSensitivity();
  updateActiveTargetButton();
});

dpiInput.addEventListener("input", updateEquivalentSensitivity);
sensInput.addEventListener("input", updateEquivalentSensitivity);

targetQuickButtons.forEach((button) => {
  button.addEventListener("click", () => {
    targetDpi.value = button.dataset.targetDpi;
    updateEquivalentSensitivity();
    updateActiveTargetButton();
  });
});

updateActiveTargetButton();

calcBtn.addEventListener("click", calculate);
  copyBtn.addEventListener("click", async () => {
  const dpi = parseFloat(dpiInput.value);
  const sens = parseFloat(sensInput.value);
  const edpi = dpi * sens;

  if (!dpi || !sens || edpi <= 0) {
    return;
  }

  const language =
    localStorage.getItem("valotools-language") || "en";

  const info = classify(edpi, language);

  const copiedResult =
    language === "es"
      ? `Valorant eDPI: ${edpi}\n${dpi} DPI × ${sens} de sensibilidad\n${info.label}`
      : `Valorant eDPI: ${edpi}\n${dpi} DPI × ${sens} sensitivity\n${info.label}`;

  try {
    await navigator.clipboard.writeText(copiedResult);

    copyText.textContent =
      language === "es" ? "COPIADO" : "COPIED";

    setTimeout(() => {
      copyText.textContent =
        language === "es" ? "COPIAR RESULTADO" : "COPY RESULT";
    }, 1500);
  } catch (error) {
    console.error("Unable to copy result:", error);
  }
});
  [dpiInput, sensInput].forEach(el=>{
    el.addEventListener('keydown', e=>{
      if (e.key === 'Enter') calculate();
    });
  });
const translations = {
  en: {
    subtitle: "Calculate your effective sensitivity in Valorant",
    dpiLabel: "Mouse DPI",
    sensitivityLabel: "In-game sensitivity",
    calculateButton: "Calculate eDPI",
    resultLabel: "Your eDPI is",
    infoTitle: "What is eDPI?",
    infoText1:
      "eDPI is a way to compare sensitivity settings between players who use different DPI values.",
    infoText2:
      "It is calculated by multiplying your mouse DPI by your in-game Valorant sensitivity.",
    formula: "eDPI = DPI × sensitivity",
    disclaimer:
      "ValoTools is not affiliated with Riot Games. Valorant is a trademark of Riot Games."
  },

  es: {
    subtitle: "Calcula tu sensibilidad efectiva en Valorant",
    dpiLabel: "DPI del mouse",
    sensitivityLabel: "Sensibilidad en juego",
    calculateButton: "Calcular eDPI",
    resultLabel: "Tu eDPI es",
    infoTitle: "¿Qué es el eDPI?",
    infoText1:
      "El eDPI es una forma de comparar sensibilidades entre jugadores aunque usen diferentes valores de DPI.",
    infoText2:
      "Se calcula multiplicando el DPI del mouse por la sensibilidad configurada dentro de Valorant.",
    formula: "eDPI = DPI × sensibilidad",
    disclaimer:
      "ValoTools no está afiliado con Riot Games. Valorant es una marca registrada de Riot Games."
  }
};const languageButtons = document.querySelectorAll(".lang-btn");

function setLanguage(language) {
  const text = translations[language];

  document.documentElement.lang = language;

  document.getElementById("toolTitle").textContent = "eDPI Calculator";
  document.getElementById("subtitleText").textContent = text.subtitle;
  document.getElementById("dpiLabel").textContent = text.dpiLabel;
  document.getElementById("sensitivityLabel").textContent =
    text.sensitivityLabel;
  document.getElementById("calculateText").textContent =
    text.calculateButton.toUpperCase();
  document.getElementById("resultLabel").textContent = text.resultLabel;
  document.getElementById("infoTitle").textContent = text.infoTitle;
  document.getElementById("infoText1").textContent = text.infoText1;
  document.getElementById("infoText2").textContent = text.infoText2;
  document.getElementById("formulaText").textContent = text.formula;
  document.getElementById("disclaimerText").textContent = text.disclaimer;

  languageButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === language);
  });
const currentEdpi = Number(resultValue.textContent);

if (currentEdpi > 0) {
  const info = classify(currentEdpi, language);

  badgeWrap.innerHTML = `
    <div class="badge ${info.tier}">
      ${info.label}
    </div>
  `;

  resultNote.textContent = info.note;
}
const scaleTranslations = {
  en: {
    low: "Low",
    medium: "Medium",
    high: "High"
  },
  es: {
    low: "Baja",
    medium: "Media",
    high: "Alta"
  }
};

const scaleText = scaleTranslations[language] || scaleTranslations.en;

scaleLow.textContent = scaleText.low;
scaleMedium.textContent = scaleText.medium;
scaleHigh.textContent = scaleText.high;
copyText.textContent =
  language === "es" ? "COPIAR RESULTADO" : "COPY RESULT";
  const converterTranslations = {
  en: {
    target: "Convert to DPI",
    equivalent: "Equivalent sensitivity"
  },
  es: {
    target: "Convertir a DPI",
    equivalent: "Sensibilidad equivalente"
  }
};

const converterText =
  converterTranslations[language] || converterTranslations.en;

document.getElementById("targetDpiLabel").textContent =
  converterText.target;

document.getElementById("convertedLabel").textContent =
  converterText.equivalent;
  localStorage.setItem("valotools-language", language);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.lang);
  });
});

const savedLanguage = localStorage.getItem("valotools-language") || "en";
setLanguage(savedLanguage);