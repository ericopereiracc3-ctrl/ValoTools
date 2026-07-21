(function () {
  "use strict";

  const DATA_URL = "data/crosshairs.json";
  const codec = window.ValoToolsCrosshairCodec;

  if (!codec) {
    console.error("Crosshair Lab could not start because the local codec is unavailable.");
    return;
  }

  const translations = {
    en: {
      eyebrow: "Primary crosshair workshop",
      title: "Valorant Crosshair Lab",
      description: "Design a primary crosshair, preview it locally and copy a deterministic profile code.",
      previewEyebrow: "Live workspace",
      previewTitle: "Browser preview",
      previewAria: "Crosshair browser preview",
      backgroundAria: "Preview background",
      dark: "Dark",
      light: "Light",
      range: "Range",
      caveat: "Browser preview. Test the code in VALORANT before competitive use.",
      editorEyebrow: "Primary settings · V0.1",
      editorTitle: "Crosshair controls",
      appearance: "Appearance",
      presetColor: "Preset color",
      customHex: "Custom hex",
      outlines: "Outlines",
      centerDot: "Center dot",
      innerLines: "Inner lines",
      outline: "Outline",
      opacity: "Opacity",
      thickness: "Thickness",
      length: "Length",
      offset: "Offset",
      errorBehavior: "Error behavior",
      movementError: "Movement error",
      firingError: "Firing error",
      generatedCode: "Generated profile code",
      restore: "Restore selected preset",
      restored: "Selected preset restored.",
      copy: "Copy code",
      copied: "Code copied to the clipboard.",
      copyFailed: "Select the code and copy it manually.",
      libraryEyebrow: "24 original ValoTools presets",
      libraryTitle: "Preset library",
      filterTitle: "Search and filters",
      searchLabel: "Search by name",
      searchPlaceholder: "Preset name",
      category: "Category",
      allCategories: "All categories",
      color: "Color",
      allColors: "All colors",
      oneResult: "1 result",
      manyResults: "{count} results",
      empty: "No presets match the current search and filters.",
      usePreset: "Use preset",
      needsCheck: "Needs in-game check",
      selected: "Selected",
      contextEyebrow: "Useful context",
      contextTitle: "Choose for clarity and comfort",
      preference: "A crosshair is a personal preference; copy a preset as a starting point, not a promise of better aim.",
      visibility: "High visibility does not mean higher accuracy. Contrast only helps you keep track of the crosshair.",
      practice: "Test every code in the VALORANT practice range before relying on it in a competitive match.",
      future: "Professional configurations change over time and may be added in a future phase with clear source dates.",
      movementFlag: "Movement error enabled",
      firingFlag: "Firing error enabled",
      loadError: "The local preset library could not be loaded.",
      colors: {
        white: "White", green: "Green", yellowgreen: "Yellow green", greenyellow: "Green yellow",
        yellow: "Yellow", cyan: "Cyan", pink: "Pink", red: "Red", custom: "Custom"
      },
      categories: {
        classic: "Classic", compact: "Compact", dot: "Dot", "high-visibility": "High Visibility",
        outlined: "Outlined", experimental: "Experimental"
      },
      seoTitle: "Valorant Crosshair Generator & Presets | ValoTools",
      seoDescription: "Design a Valorant primary crosshair, preview it in your browser and copy a deterministic profile code from 24 original ValoTools presets."
    },
    es: {
      eyebrow: "Taller de mira primaria",
      title: "Laboratorio de miras de Valorant",
      description: "Diseña una mira primaria, previsualízala localmente y copia un código de perfil determinista.",
      previewEyebrow: "Espacio de trabajo en vivo",
      previewTitle: "Vista previa del navegador",
      previewAria: "Vista previa de la mira en el navegador",
      backgroundAria: "Fondo de la vista previa",
      dark: "Oscuro",
      light: "Claro",
      range: "Campo",
      caveat: "Vista previa del navegador. Prueba el código en VALORANT antes de usarlo en competitivo.",
      editorEyebrow: "Ajustes primarios · V0.1",
      editorTitle: "Controles de la mira",
      appearance: "Apariencia",
      presetColor: "Color predefinido",
      customHex: "Hex personalizado",
      outlines: "Contorno",
      centerDot: "Punto central",
      innerLines: "Líneas interiores",
      outline: "Contorno",
      opacity: "Opacidad",
      thickness: "Grosor",
      length: "Longitud",
      offset: "Separación",
      errorBehavior: "Comportamiento de error",
      movementError: "Error de movimiento",
      firingError: "Error de disparo",
      generatedCode: "Código de perfil generado",
      restore: "Restaurar preset seleccionado",
      restored: "Preset seleccionado restaurado.",
      copy: "Copiar código",
      copied: "Código copiado al portapapeles.",
      copyFailed: "Selecciona el código y cópialo manualmente.",
      libraryEyebrow: "24 presets originales de ValoTools",
      libraryTitle: "Biblioteca de presets",
      filterTitle: "Búsqueda y filtros",
      searchLabel: "Buscar por nombre",
      searchPlaceholder: "Nombre del preset",
      category: "Categoría",
      allCategories: "Todas las categorías",
      color: "Color",
      allColors: "Todos los colores",
      oneResult: "1 resultado",
      manyResults: "{count} resultados",
      empty: "Ningún preset coincide con la búsqueda y los filtros actuales.",
      usePreset: "Usar preset",
      needsCheck: "Pendiente de prueba en el juego",
      selected: "Seleccionado",
      contextEyebrow: "Contexto útil",
      contextTitle: "Elige claridad y comodidad",
      preference: "Una mira es una preferencia personal; copia un preset como punto de partida, no como promesa de mejor puntería.",
      visibility: "Una visibilidad alta no significa mayor precisión. El contraste solo ayuda a seguir la mira.",
      practice: "Prueba cada código en el campo de práctica de VALORANT antes de usarlo en una partida competitiva.",
      future: "Las configuraciones profesionales cambian con el tiempo y podrán añadirse en una fase futura con fechas de fuente claras.",
      movementFlag: "Error de movimiento activado",
      firingFlag: "Error de disparo activado",
      loadError: "No se pudo cargar la biblioteca local de presets.",
      colors: {
        white: "Blanco", green: "Verde", yellowgreen: "Verde amarillento", greenyellow: "Amarillo verdoso",
        yellow: "Amarillo", cyan: "Cian", pink: "Rosa", red: "Rojo", custom: "Personalizado"
      },
      categories: {
        classic: "Clásicas", compact: "Compactas", dot: "Punto", "high-visibility": "Alta visibilidad",
        outlined: "Con contorno", experimental: "Experimentales"
      },
      seoTitle: "Generador de miras de Valorant y presets | ValoTools",
      seoDescription: "Diseña una mira primaria de Valorant, previsualízala y copia un código determinista entre 24 presets originales de ValoTools."
    }
  };

  const elements = {
    form: document.getElementById("crosshairForm"),
    preview: document.getElementById("crosshairPreview"),
    shape: document.getElementById("crosshairShape"),
    flags: document.getElementById("previewFlags"),
    code: document.getElementById("crosshairCode"),
    copy: document.getElementById("copyCodeButton"),
    reset: document.getElementById("resetPresetButton"),
    copyStatus: document.getElementById("copyStatus"),
    selectedLabel: document.getElementById("selectedPresetLabel"),
    editorTitle: document.getElementById("editorTitle"),
    color: document.getElementById("crosshairColor"),
    customColor: document.getElementById("customColor"),
    swatch: document.getElementById("colorSwatch"),
    outlineEnabled: document.getElementById("outlineEnabled"),
    centerDotEnabled: document.getElementById("centerDotEnabled"),
    innerLinesEnabled: document.getElementById("innerLinesEnabled"),
    outlineOpacity: document.getElementById("outlineOpacity"),
    outlineThickness: document.getElementById("outlineThickness"),
    centerDotOpacity: document.getElementById("centerDotOpacity"),
    centerDotThickness: document.getElementById("centerDotThickness"),
    innerOpacity: document.getElementById("innerOpacity"),
    innerLength: document.getElementById("innerLength"),
    innerThickness: document.getElementById("innerThickness"),
    innerOffset: document.getElementById("innerOffset"),
    movementError: document.getElementById("movementError"),
    firingError: document.getElementById("firingError"),
    search: document.getElementById("presetSearch"),
    category: document.getElementById("categoryFilter"),
    colorFilter: document.getElementById("colorFilter"),
    grid: document.getElementById("presetGrid"),
    count: document.getElementById("resultCount"),
    empty: document.getElementById("presetEmpty")
  };

  const rangeKeys = [
    "outlineOpacity", "outlineThickness", "centerDotOpacity", "centerDotThickness",
    "innerOpacity", "innerLength", "innerThickness", "innerOffset"
  ];
  const booleanKeys = ["outlineEnabled", "centerDotEnabled", "innerLinesEnabled", "movementError", "firingError"];
  const categoryOrder = ["classic", "compact", "dot", "high-visibility", "outlined", "experimental"];
  const colorOrder = ["white", "green", "yellowgreen", "greenyellow", "yellow", "cyan", "pink", "red", "custom"];

  let currentLanguage = window.ValoToolsUI?.getLanguage() || "en";
  let presets = [];
  let selectedPresetId = null;
  let selectedSnapshot = codec.normalizeConfig(codec.DEFAULT_CONFIG);
  let currentConfig = codec.normalizeConfig(codec.DEFAULT_CONFIG);
  let loadFailed = false;

  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function normalized(value) {
    return String(value || "")
      .toLocaleLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function presetName(preset) {
    return currentLanguage === "es" ? preset.nameEs : preset.nameEn;
  }

  function selectedPreset() {
    return presets.find((preset) => preset.id === selectedPresetId) || null;
  }

  function collectConfig() {
    const raw = {
      color: elements.color.value,
      customColor: elements.customColor.value,
      ...Object.fromEntries(booleanKeys.map((key) => [key, elements[key].checked])),
      ...Object.fromEntries(rangeKeys.map((key) => [key, elements[key].value]))
    };
    return codec.normalizeConfig(raw);
  }

  function setShapeStyles(shape, config, compact = false) {
    const factor = compact ? 1.5 : 2.15;
    const lineLength = config.innerLinesEnabled ? config.innerLength * factor : 0;
    const lineThickness = config.innerLinesEnabled ? Math.max(1, config.innerThickness * (compact ? 0.85 : 1.15)) : 0;
    const lineOffset = (config.innerOffset * (compact ? 1.15 : 1.65)) + (lineThickness / 2) + 1;
    const dotSize = Math.max(2, config.centerDotThickness * (compact ? 1.1 : 1.45));
    const outlineSize = config.outlineEnabled ? Math.max(1, config.outlineThickness * (compact ? 0.55 : 0.75)) : 0;

    shape.style.setProperty("--crosshair-color", codec.getDisplayColor(config));
    shape.style.setProperty("--line-opacity", config.innerLinesEnabled ? config.innerOpacity : 0);
    shape.style.setProperty("--line-length", `${lineLength}px`);
    shape.style.setProperty("--line-thickness", `${lineThickness}px`);
    shape.style.setProperty("--line-offset", `${lineOffset}px`);
    shape.style.setProperty("--dot-size", `${dotSize}px`);
    shape.style.setProperty("--dot-opacity", config.centerDotEnabled ? config.centerDotOpacity : 0);
    shape.style.setProperty("--outline-size", `${outlineSize}px`);
    shape.style.setProperty("--outline-opacity", config.outlineOpacity);
    shape.classList.toggle("error-enabled", config.movementError || config.firingError);
  }

  function updateFlags(config) {
    const text = translations[currentLanguage];
    const flags = [];
    if (config.movementError) flags.push(text.movementFlag);
    if (config.firingError) flags.push(text.firingFlag);
    elements.flags.replaceChildren(...flags.map((flag) => createElement("span", "preview-flag", flag)));
  }

  function updateOutputs(config) {
    rangeKeys.forEach((key) => {
      document.getElementById(`${key}Value`).textContent = String(config[key]);
    });
  }

  function updateEditor() {
    currentConfig = collectConfig();
    const customHexValid = /^[0-9A-Fa-f]{6}$/.test(elements.customColor.value.trim().replace(/^#/, ""));
    elements.customColor.setAttribute("aria-invalid", (elements.color.value === "custom" && !customHexValid).toString());
    elements.customColor.disabled = elements.color.value !== "custom";
    elements.swatch.style.setProperty("--swatch-color", codec.getDisplayColor(currentConfig));
    setShapeStyles(elements.shape, currentConfig);
    updateOutputs(currentConfig);
    updateFlags(currentConfig);
    elements.code.value = codec.serialize(currentConfig);
    elements.copyStatus.textContent = "";
  }

  function applyConfig(config) {
    const normalizedConfig = codec.normalizeConfig(config);
    elements.color.value = normalizedConfig.color;
    elements.customColor.value = normalizedConfig.customColor;
    booleanKeys.forEach((key) => { elements[key].checked = normalizedConfig[key]; });
    rangeKeys.forEach((key) => { elements[key].value = normalizedConfig[key]; });
    updateEditor();
  }

  function createMiniShape(config) {
    const shape = createElement("div", "mini-crosshair");
    ["top", "right", "bottom", "left"].forEach((direction) => {
      shape.append(createElement("span", `mini-line mini-${direction}`));
    });
    shape.append(createElement("span", "mini-dot"));
    setShapeStyles(shape, codec.normalizeConfig(config), true);
    return shape;
  }

  function createPresetCard(preset) {
    const text = translations[currentLanguage];
    const config = codec.normalizeConfig(preset.config);
    const isSelected = preset.id === selectedPresetId;
    const card = createElement("article", `preset-card${isSelected ? " selected" : ""}`);
    card.dataset.presetId = preset.id;

    const preview = createElement("div", "preset-preview");
    preview.setAttribute("role", "img");
    preview.setAttribute("aria-label", `${presetName(preset)} ${text.previewTitle.toLocaleLowerCase()}`);
    preview.append(createMiniShape(config));

    const meta = createElement("div", "preset-meta");
    const category = createElement("span", "preset-category", text.categories[preset.category]);
    const color = createElement("span", "preset-color", text.colors[config.color]);
    color.style.setProperty("--preset-color", codec.getDisplayColor(config));
    meta.append(category, color);

    const button = createElement("button", "preset-use-button", isSelected ? text.selected : text.usePreset);
    button.type = "button";
    button.setAttribute("aria-pressed", isSelected.toString());
    button.addEventListener("click", () => selectPreset(preset.id, true));

    card.append(
      preview,
      createElement("h3", "preset-name", presetName(preset)),
      meta,
      createElement("p", "preset-status", text.needsCheck),
      button
    );
    return card;
  }

  function filteredPresets() {
    const query = normalized(elements.search.value.trim());
    return presets.filter((preset) => {
      const matchesName = !query || normalized(`${preset.nameEn} ${preset.nameEs}`).includes(query);
      return matchesName &&
        (!elements.category.value || preset.category === elements.category.value) &&
        (!elements.colorFilter.value || preset.config.color === elements.colorFilter.value);
    });
  }

  function updateCount(count) {
    const text = translations[currentLanguage];
    elements.count.textContent = count === 1 ? text.oneResult : text.manyResults.replace("{count}", count);
  }

  function renderPresets() {
    const matches = filteredPresets();
    elements.grid.replaceChildren(...matches.map(createPresetCard));
    elements.empty.hidden = matches.length !== 0;
    updateCount(matches.length);
  }

  function populateFilters() {
    const text = translations[currentLanguage];
    const categoryValue = elements.category.value;
    const colorValue = elements.colorFilter.value;
    elements.category.replaceChildren(new Option(text.allCategories, ""));
    categoryOrder.forEach((category) => elements.category.add(new Option(text.categories[category], category)));
    elements.colorFilter.replaceChildren(new Option(text.allColors, ""));
    colorOrder.forEach((color) => elements.colorFilter.add(new Option(text.colors[color], color)));
    elements.category.value = categoryOrder.includes(categoryValue) ? categoryValue : "";
    elements.colorFilter.value = colorOrder.includes(colorValue) ? colorValue : "";
  }

  function selectPreset(presetId, moveFocus = false) {
    const preset = presets.find((item) => item.id === presetId);
    if (!preset) return;
    selectedPresetId = preset.id;
    selectedSnapshot = codec.normalizeConfig(preset.config);
    applyConfig(selectedSnapshot);
    elements.selectedLabel.textContent = presetName(preset);
    renderPresets();
    if (moveFocus) requestAnimationFrame(() => elements.editorTitle.focus({ preventScroll: true }));
  }

  function restoreSelectedPreset() {
    applyConfig(selectedSnapshot);
    elements.copyStatus.textContent = translations[currentLanguage].restored;
  }

  async function copyCode() {
    const text = translations[currentLanguage];
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(elements.code.value);
      } else {
        elements.code.focus({ preventScroll: true });
        elements.code.select();
        if (!document.execCommand("copy")) throw new Error("Copy command was rejected");
      }
      elements.copyStatus.textContent = text.copied;
    } catch (error) {
      elements.code.focus({ preventScroll: true });
      elements.code.select();
      elements.copyStatus.textContent = text.copyFailed;
      console.error("Unable to copy crosshair code:", error);
    }
  }

  function setBackground(background) {
    elements.preview.classList.remove("preview-dark", "preview-light", "preview-range");
    elements.preview.classList.add(`preview-${background}`);
    document.querySelectorAll(".background-btn").forEach((button) => {
      const active = button.dataset.background === background;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active.toString());
    });
  }

  function updateMetadata(text) {
    document.title = text.seoTitle;
    const description = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (description) description.content = text.seoDescription;
    if (ogTitle) ogTitle.content = text.seoTitle;
    if (ogDescription) ogDescription.content = text.seoDescription;
    if (twitterTitle) twitterTitle.content = text.seoTitle;
    if (twitterDescription) twitterDescription.content = text.seoDescription;
  }

  function setLanguage(language) {
    currentLanguage = language === "es" ? "es" : "en";
    const text = translations[currentLanguage];
    const content = {
      eyebrowText: text.eyebrow,
      pageTitle: text.title,
      pageDescription: text.description,
      previewEyebrow: text.previewEyebrow,
      previewTitle: text.previewTitle,
      backgroundDark: text.dark,
      backgroundLight: text.light,
      backgroundRange: text.range,
      previewCaveat: text.caveat,
      editorEyebrow: text.editorEyebrow,
      editorTitle: text.editorTitle,
      appearanceLegend: text.appearance,
      colorLabel: text.presetColor,
      customColorLabel: text.customHex,
      outlineEnabledLabel: text.outlines,
      centerDotEnabledLabel: text.centerDot,
      innerLinesEnabledLabel: text.innerLines,
      outlineLegend: text.outline,
      outlineOpacityLabel: text.opacity,
      outlineThicknessLabel: text.thickness,
      dotLegend: text.centerDot,
      centerDotOpacityLabel: text.opacity,
      centerDotThicknessLabel: text.thickness,
      innerLegend: text.innerLines,
      innerOpacityLabel: text.opacity,
      innerLengthLabel: text.length,
      innerThicknessLabel: text.thickness,
      innerOffsetLabel: text.offset,
      errorLegend: text.errorBehavior,
      movementErrorLabel: text.movementError,
      firingErrorLabel: text.firingError,
      codeLabel: text.generatedCode,
      resetPresetButton: text.restore,
      copyCodeButton: text.copy,
      libraryEyebrow: text.libraryEyebrow,
      libraryTitle: text.libraryTitle,
      filterTitle: text.filterTitle,
      searchLabel: text.searchLabel,
      categoryFilterLabel: text.category,
      colorFilterLabel: text.color,
      presetEmpty: text.empty,
      contextEyebrow: text.contextEyebrow,
      contextTitle: text.contextTitle,
      contextPreference: text.preference,
      contextVisibility: text.visibility,
      contextPractice: text.practice,
      contextFuture: text.future
    };

    Object.entries(content).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    });

    elements.preview.setAttribute("aria-label", text.previewAria);
    document.querySelector(".background-switcher")?.setAttribute("aria-label", text.backgroundAria);
    elements.search.placeholder = text.searchPlaceholder;
    [...elements.color.options].forEach((option) => { option.textContent = text.colors[option.value]; });
    updateMetadata(text);
    populateFilters();
    const preset = selectedPreset();
    if (preset) elements.selectedLabel.textContent = presetName(preset);
    if (loadFailed) elements.count.textContent = text.loadError;
    renderPresets();
    updateFlags(currentConfig);
  }

  function validatePreset(record) {
    return record && typeof record.id === "string" && record.id &&
      typeof record.nameEn === "string" && record.nameEn &&
      typeof record.nameEs === "string" && record.nameEs &&
      categoryOrder.includes(record.category) &&
      record.sourceType === "valotools-preset" &&
      record.verificationStatus === "needs-in-game-check" &&
      record.config && typeof record.config === "object";
  }

  async function loadPresets() {
    try {
      const response = await fetch(DATA_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error("Expected a preset array");
      if (!data.every(validatePreset)) throw new Error("One or more preset records are invalid");
      if (new Set(data.map((preset) => preset.id)).size !== data.length) throw new Error("Preset IDs must be unique");
      presets = data;

      const diagnostics = codec.runSelfTests(presets);
      if (!diagnostics.passed) throw new Error(`Codec self-tests failed: ${diagnostics.failures.join(", ")}`);

      selectPreset(presets[0].id);
      console.info(`Crosshair Lab checks passed for ${diagnostics.checkedPresets} local presets.`);
    } catch (error) {
      loadFailed = true;
      elements.count.textContent = translations[currentLanguage].loadError;
      elements.grid.replaceChildren();
      elements.empty.hidden = true;
      console.error("Unable to load Crosshair Lab presets:", error);
    }
  }

  elements.form.addEventListener("input", updateEditor);
  elements.form.addEventListener("change", updateEditor);
  elements.reset.addEventListener("click", restoreSelectedPreset);
  elements.copy.addEventListener("click", copyCode);
  elements.search.addEventListener("input", renderPresets);
  elements.category.addEventListener("change", renderPresets);
  elements.colorFilter.addEventListener("change", renderPresets);
  document.querySelectorAll(".background-btn").forEach((button) => {
    button.addEventListener("click", () => setBackground(button.dataset.background));
  });
  document.addEventListener("valotools:languagechange", (event) => setLanguage(event.detail.language));

  window.ValoToolsCrosshairLab = Object.freeze({
    getState: () => ({
      language: currentLanguage,
      selectedPresetId,
      presetCount: presets.length,
      config: { ...currentConfig },
      code: elements.code.value,
      visiblePresetCount: filteredPresets().length
    }),
    selectPreset: (presetId) => selectPreset(presetId),
    restoreSelectedPreset,
    runDiagnostics: () => codec.runSelfTests(presets)
  });

  setBackground("dark");
  applyConfig(currentConfig);
  setLanguage(currentLanguage);
  loadPresets();
})();
