const games = {
  valorant: {
    name: "Valorant",
    yaw: 0.07
  },
  cs2: {
    name: "Counter-Strike 2",
    yaw: 0.022
  },
  apex: {
    name: "Apex Legends",
    yaw: 0.022
  },
  overwatch2: {
    name: "Overwatch 2",
    yaw: 0.0066
  },
  warzone: {
    name: "Call of Duty: Warzone",
    yaw: 0.0066
  }
};

const sourceGame = document.getElementById("sourceGame");
const targetGame = document.getElementById("targetGame");
const mouseDpi = document.getElementById("mouseDpi");
const sourceSensitivity = document.getElementById("sourceSensitivity");
const sourceSensitivityLabel = document.getElementById("sourceSensitivityLabel");
const swapGamesBtn = document.getElementById("swapGamesBtn");
const convertSensBtn = document.getElementById("convertSensBtn");
const sensError = document.getElementById("sensError");
const sensResult = document.getElementById("sensResult");
const resultGame = document.getElementById("resultGame");
const resultSensitivity = document.getElementById("resultSensitivity");
const sourceEdpi = document.getElementById("sourceEdpi");
const sourceCm360 = document.getElementById("sourceCm360");
const resultDpi = document.getElementById("resultDpi");

const converterTranslations = {
  en: {
    eyebrow: "Cross-game sensitivity utility",
    title: "Valorant Sensitivity Converter",
    description: "Convert sensitivity between supported games while keeping approximately the same hipfire turning distance.",
    toolTitle: "Convert sensitivity",
    toolDescription: "Choose a source game, a target game and your current settings.",
    sourceGame: "Source game",
    targetGame: "Target game",
    mouseDpi: "Mouse DPI",
    swap: "⇄ Swap games",
    convert: "Convert sensitivity",
    result: "Equivalent sensitivity",
    sourceEdpiLabel: "Source eDPI",
    cm360Label: "cm per 360°",
    resultDpiLabel: "DPI used",
    back: "← Back to the eDPI calculator",
    note: "This conversion assumes the same DPI in both games and approximately matches normal hipfire turning distance. ADS, scopes and zoom multipliers are not included.",
    sensitivity: "Sensitivity in",
    differentGames: "Select two different games.",
    invalid: "Enter a valid DPI and sensitivity."
  },
  es: {
    eyebrow: "Utilidad de sensibilidad entre juegos",
    title: "Conversor de sensibilidad de Valorant",
    description: "Convierte la sensibilidad entre juegos compatibles manteniendo aproximadamente la misma distancia de giro en hipfire.",
    toolTitle: "Convertir sensibilidad",
    toolDescription: "Elige un juego de origen, uno de destino y tu configuración actual.",
    sourceGame: "Juego de origen",
    targetGame: "Juego de destino",
    mouseDpi: "DPI del mouse",
    swap: "⇄ Intercambiar juegos",
    convert: "Convertir sensibilidad",
    result: "Sensibilidad equivalente",
    sourceEdpiLabel: "eDPI de origen",
    cm360Label: "cm por 360°",
    resultDpiLabel: "DPI utilizado",
    back: "← Volver a la calculadora de eDPI",
    note: "Esta conversión supone el mismo DPI en ambos juegos e iguala aproximadamente la distancia de giro normal en hipfire. No incluye ADS, miras ni multiplicadores de zoom.",
    sensitivity: "Sensibilidad en",
    differentGames: "Selecciona dos juegos diferentes.",
    invalid: "Introduce un DPI y una sensibilidad válidos."
  }
};

let currentConverterLanguage = window.ValoToolsUI?.getLanguage() || "en";

function setConverterLanguage(language) {
  currentConverterLanguage = language === "es" ? "es" : "en";
  const text = converterTranslations[currentConverterLanguage];

  document.getElementById("eyebrowText").textContent = text.eyebrow;
  document.getElementById("converterTitle").textContent = text.title;
  document.getElementById("converterDescription").textContent = text.description;
  document.getElementById("converterToolTitle").textContent = text.toolTitle;
  document.getElementById("converterToolDescription").textContent = text.toolDescription;
  document.getElementById("sourceGameLabel").textContent = text.sourceGame;
  document.getElementById("targetGameLabel").textContent = text.targetGame;
  document.getElementById("mouseDpiLabel").textContent = text.mouseDpi;
  document.getElementById("swapGamesText").textContent = text.swap;
  document.getElementById("convertSensText").textContent = text.convert;
  document.getElementById("resultLabel").textContent = text.result;
  document.getElementById("sourceEdpiLabel").textContent = text.sourceEdpiLabel;
  document.getElementById("cm360Label").textContent = text.cm360Label;
  document.getElementById("resultDpiLabel").textContent = text.resultDpiLabel;
  document.getElementById("converterNote").textContent = text.note;
  document.getElementById("backLink").textContent = text.back;

  sourceSensitivityLabel.textContent = `${text.sensitivity} ${games[sourceGame.value].name}`;
}

function formatSensitivity(value) {
  if (value >= 10) {
    return Number(value.toFixed(2)).toString();
  }

  return Number(value.toFixed(4)).toString();
}

function updateInterface() {
  const selectedSource = games[sourceGame.value];
  const text = converterTranslations[currentConverterLanguage];

  sourceSensitivityLabel.textContent = `${text.sensitivity} ${selectedSource.name}`;
  sensResult.classList.remove("show");
  sensError.classList.remove("show");
}

function convertSensitivity() {
  const dpi = Number.parseFloat(mouseDpi.value);
  const sensitivity = Number.parseFloat(sourceSensitivity.value);
  const selectedSource = games[sourceGame.value];
  const selectedTarget = games[targetGame.value];
  const text = converterTranslations[currentConverterLanguage];

  if (sourceGame.value === targetGame.value) {
    sensError.textContent = text.differentGames;
    sensError.classList.add("show");
    sensResult.classList.remove("show");
    return;
  }

  if (
    !Number.isFinite(dpi) ||
    !Number.isFinite(sensitivity) ||
    dpi <= 0 ||
    sensitivity <= 0
  ) {
    sensError.textContent = text.invalid;
    sensError.classList.add("show");
    sensResult.classList.remove("show");
    return;
  }

  const convertedSensitivity =
    sensitivity *
    (selectedSource.yaw / selectedTarget.yaw);

  const calculatedEdpi = dpi * sensitivity;

  const calculatedCm360 =
    914.4 /
    (
      dpi *
      sensitivity *
      selectedSource.yaw
    );

  resultGame.textContent = selectedTarget.name;
  resultSensitivity.textContent = formatSensitivity(convertedSensitivity);
  sourceEdpi.textContent = Number(calculatedEdpi.toFixed(1));
  sourceCm360.textContent = `${calculatedCm360.toFixed(1)} cm`;
  resultDpi.textContent = `${Math.round(dpi)} DPI`;

  sensError.classList.remove("show");
  sensResult.classList.add("show");
}

function swapGames() {
  const previousSource = sourceGame.value;
  sourceGame.value = targetGame.value;
  targetGame.value = previousSource;
  updateInterface();
}

sourceGame.addEventListener("change", updateInterface);
targetGame.addEventListener("change", () => {
  sensResult.classList.remove("show");
  sensError.classList.remove("show");
});
swapGamesBtn.addEventListener("click", swapGames);
convertSensBtn.addEventListener("click", convertSensitivity);

[mouseDpi, sourceSensitivity].forEach((input) => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") convertSensitivity();
  });
});

document.addEventListener("valotools:languagechange", (event) => {
  setConverterLanguage(event.detail.language);
  updateInterface();
});

setConverterLanguage(currentConverterLanguage);
updateInterface();
