const dpiInput = document.getElementById("dpi");
const sensInput = document.getElementById("sens");
const calcBtn = document.getElementById("calcBtn");
const result = document.getElementById("result");
const resultValue = document.getElementById("resultValue");
const badgeWrap = document.getElementById("badgeWrap");
const resultNote = document.getElementById("resultNote");
const scaleMarker = document.getElementById("scaleMarker");
const scaleMarkerValue = document.getElementById("scaleMarkerValue");
const scaleSegments = document.querySelectorAll(".scale-segment");
const meterExplanation = document.getElementById("meterExplanation");
const copyBtn = document.getElementById("copyBtn");
const copyText = document.getElementById("copyText");
const targetDpi = document.getElementById("targetDpi");
const convertedValue = document.getElementById("convertedValue");
const targetQuickButtons = document.querySelectorAll(".target-quick-buttons button");

let currentLanguage = window.ValoToolsUI?.getLanguage() || "en";
let currentMeterTier = null;

const translations = {
  en: {
    eyebrow: "Sensitivity utility",
    title: "Valorant eDPI Calculator",
    description: "Calculate effective sensitivity and compare different DPI setups without changing how your aim feels.",
    calculatorTitle: "Calculate eDPI",
    calculatorDescription: "Enter your mouse DPI and in-game Valorant sensitivity.",
    dpiLabel: "Mouse DPI",
    sensitivityLabel: "In-game sensitivity",
    calculateButton: "Calculate eDPI",
    resultLabel: "Your eDPI is",
    infoTitle: "What is eDPI?",
    infoText1: "eDPI compares sensitivity settings between players who use different mouse DPI values.",
    infoText2: "Multiply mouse DPI by Valorant sensitivity to calculate it.",
    formula: "eDPI = DPI × sensitivity",
    copy: "Copy result",
    copied: "Copied",
    target: "Convert to DPI",
    equivalent: "Equivalent sensitivity",
    meterTitle: "Sensitivity ranges",
    meterPrompt: "Focus or tap a range to learn more.",
    lowName: "Low / control",
    lowRange: "Below 220",
    lowExplanation: "Below 220 eDPI: broader mouse movement with an emphasis on fine control.",
    midName: "Medium / balance",
    midRange: "220–400",
    midExplanation: "220–400 eDPI: a balance between controlled movement and faster turns.",
    highName: "High / reaction",
    highRange: "Above 400",
    highExplanation: "Above 400 eDPI: faster turns with less physical mouse movement."
  },
  es: {
    eyebrow: "Utilidad de sensibilidad",
    title: "Calculadora de eDPI de Valorant",
    description: "Calcula la sensibilidad efectiva y compara distintos DPI sin cambiar la sensación de tu mira.",
    calculatorTitle: "Calcular eDPI",
    calculatorDescription: "Introduce el DPI del mouse y la sensibilidad de Valorant.",
    dpiLabel: "DPI del mouse",
    sensitivityLabel: "Sensibilidad en juego",
    calculateButton: "Calcular eDPI",
    resultLabel: "Tu eDPI es",
    infoTitle: "¿Qué es el eDPI?",
    infoText1: "El eDPI permite comparar sensibilidades entre jugadores que usan distintos valores de DPI.",
    infoText2: "Se calcula multiplicando el DPI del mouse por la sensibilidad de Valorant.",
    formula: "eDPI = DPI × sensibilidad",
    copy: "Copiar resultado",
    copied: "Copiado",
    target: "Convertir a DPI",
    equivalent: "Sensibilidad equivalente",
    meterTitle: "Rangos de sensibilidad",
    meterPrompt: "Enfoca o toca un rango para ver su explicación.",
    lowName: "Baja / control",
    lowRange: "Menos de 220",
    lowExplanation: "Menos de 220 eDPI: movimientos amplios del mouse con énfasis en el control fino.",
    midName: "Media / equilibrio",
    midRange: "220–400",
    midExplanation: "220–400 eDPI: equilibrio entre movimientos controlados y giros más rápidos.",
    highName: "Alta / reacción",
    highRange: "Más de 400",
    highExplanation: "Más de 400 eDPI: giros rápidos con menos movimiento físico del mouse."
  }
};

function classify(edpi, language = "en") {
  const resultTexts = {
    en: {
      low: {
        label: "LOW SENS — CONTROL",
        note: "Wide mouse movements with greater precision for long-range flicks. Ideal for more static players."
      },
      mid: {
        label: "MEDIUM SENS — BALANCE",
        note: "A balanced setup between precision and fast movement. Common among competitive players."
      },
      high: {
        label: "HIGH SENS — REACTION",
        note: "Fast turns with less hand movement. Requires stronger fine control to avoid overshooting."
      }
    },
    es: {
      low: {
        label: "SENS BAJA — CONTROL",
        note: "Movimientos amplios del mouse con mayor precisión para flicks largos. Ideal para jugadores de mira estática."
      },
      mid: {
        label: "SENS MEDIA — EQUILIBRIO",
        note: "Un equilibrio entre precisión y movimientos rápidos. Muy común entre jugadores competitivos."
      },
      high: {
        label: "SENS ALTA — REACCIÓN",
        note: "Giros rápidos con poco movimiento de mano. Exige mayor control fino para no pasarte del blanco."
      }
    }
  };

  const text = resultTexts[language] || resultTexts.en;

  if (edpi < 220) {
    return { tier: "low", label: text.low.label, note: text.low.note };
  }

  if (edpi <= 400) {
    return { tier: "mid", label: text.mid.label, note: text.mid.note };
  }

  return { tier: "high", label: text.high.label, note: text.high.note };
}

function meterText(tier) {
  const text = translations[currentLanguage];
  return {
    low: text.lowExplanation,
    mid: text.midExplanation,
    high: text.highExplanation
  }[tier];
}

function setMeterTier(tier) {
  currentMeterTier = tier;
  scaleSegments.forEach((segment) => {
    segment.classList.toggle("active", segment.dataset.tier === tier);
  });
  meterExplanation.textContent = tier ? meterText(tier) : translations[currentLanguage].meterPrompt;
}

function calculate() {
  const dpi = parseFloat(dpiInput.value);
  const sens = parseFloat(sensInput.value);

  if (!dpi || !sens || dpi <= 0 || sens <= 0) {
    [dpiInput, sensInput].forEach((element) => {
      if (!parseFloat(element.value) || parseFloat(element.value) <= 0) {
        element.parentElement.style.borderColor = "#ff4655";
        element.parentElement.style.boxShadow = "0 0 0 1px #ff4655";
        setTimeout(() => {
          element.parentElement.style.borderColor = "";
          element.parentElement.style.boxShadow = "";
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
  const displayValue = edpi % 1 === 0 ? edpi.toFixed(0) : edpi.toFixed(1);
  scaleMarker.style.left = `${markerPosition}%`;
  scaleMarkerValue.textContent = `${displayValue} eDPI`;

  const info = classify(edpi, currentLanguage);
  resultValue.textContent = displayValue;
  badgeWrap.innerHTML = `<span class="badge ${info.tier}">${info.label}</span>`;
  resultNote.textContent = info.note;
  setMeterTier(info.tier);

  result.classList.remove("show");
  void result.offsetWidth;
  result.classList.add("show");
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
    button.classList.toggle("active", button.dataset.targetDpi === targetDpi.value);
  });
}

function setLanguage(language) {
  currentLanguage = language === "es" ? "es" : "en";
  const text = translations[currentLanguage];

  const content = {
    eyebrowText: text.eyebrow,
    pageTitle: text.title,
    pageDescription: text.description,
    calculatorTitle: text.calculatorTitle,
    calculatorDescription: text.calculatorDescription,
    dpiLabel: text.dpiLabel,
    sensitivityLabel: text.sensitivityLabel,
    calculateText: text.calculateButton,
    resultLabel: text.resultLabel,
    infoTitle: text.infoTitle,
    infoText1: text.infoText1,
    infoText2: text.infoText2,
    formulaText: text.formula,
    formulaLine: text.formula,
    targetDpiLabel: text.target,
    convertedLabel: text.equivalent,
    meterTitle: text.meterTitle,
    scaleLow: text.lowName,
    scaleLowRange: text.lowRange,
    scaleMedium: text.midName,
    scaleMediumRange: text.midRange,
    scaleHigh: text.highName,
    scaleHighRange: text.highRange
  };

  Object.entries(content).forEach(([id, value]) => {
    document.getElementById(id).textContent = value;
  });

  copyText.textContent = text.copy;
  setMeterTier(currentMeterTier);

  const currentEdpi = Number(resultValue.textContent);
  if (currentEdpi > 0) {
    const info = classify(currentEdpi, currentLanguage);
    badgeWrap.innerHTML = `<span class="badge ${info.tier}">${info.label}</span>`;
    resultNote.textContent = info.note;
  }
}

document.querySelectorAll(".quick-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.target);
    target.value = button.dataset.val;
    target.focus();
  });
});

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

scaleSegments.forEach((segment) => {
  const show = () => setMeterTier(segment.dataset.tier);
  segment.addEventListener("pointerenter", show);
  segment.addEventListener("focus", show);
  segment.addEventListener("click", show);
});

calcBtn.addEventListener("click", calculate);
copyBtn.addEventListener("click", async () => {
  const dpi = parseFloat(dpiInput.value);
  const sens = parseFloat(sensInput.value);
  const edpi = dpi * sens;
  if (!dpi || !sens || edpi <= 0) return;

  const info = classify(edpi, currentLanguage);
  const copiedResult = currentLanguage === "es"
    ? `Valorant eDPI: ${edpi}\n${dpi} DPI × ${sens} de sensibilidad\n${info.label}`
    : `Valorant eDPI: ${edpi}\n${dpi} DPI × ${sens} sensitivity\n${info.label}`;

  try {
    await navigator.clipboard.writeText(copiedResult);
    copyText.textContent = translations[currentLanguage].copied;
    setTimeout(() => copyText.textContent = translations[currentLanguage].copy, 1500);
  } catch (error) {
    console.error("Unable to copy result:", error);
  }
});

[dpiInput, sensInput].forEach((input) => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") calculate();
  });
});

document.addEventListener("valotools:languagechange", (event) => setLanguage(event.detail.language));

updateActiveTargetButton();
setLanguage(currentLanguage);
