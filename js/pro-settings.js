const DATA_URL = "data/pro-settings.json";

const translations = {
  en: {
    eyebrow: "Competitive loadout database",
    title: "Valorant Pro Settings",
    intro: "Explore player sensitivity, calculated eDPI and gaming gear in one searchable database.",
    demoNotice: "Demo data only — these fictional players, teams and settings are not real professional records.",
    filterTitle: "Search and filters",
    searchLabel: "Search player or team",
    searchPlaceholder: "Player or team name",
    team: "Team",
    region: "Region",
    role: "Role",
    allTeams: "All teams",
    allRegions: "All regions",
    allRoles: "All roles",
    resultsTitle: "Player settings",
    loading: "Loading records…",
    loadError: "The demonstration records could not be loaded. Please try again later.",
    noResults: "No players match the current search and filters.",
    oneRecord: "1 record",
    manyRecords: "{count} records",
    player: "Player",
    dpi: "DPI",
    sensitivity: "Sensitivity",
    edpi: "eDPI",
    mouse: "Mouse",
    keyboard: "Keyboard",
    monitor: "Monitor",
    verified: "Verified",
    source: "Source",
    viewSource: "View source",
    demo: "Demo record",
    selectedPlayer: "Selected player",
    details: "Player details",
    closeDetails: "Close player details"
  },
  es: {
    eyebrow: "Base de datos de equipamiento competitivo",
    title: "Configuraciones Pro de Valorant",
    intro: "Explora la sensibilidad, el eDPI calculado y el equipamiento de jugadores en una base de datos con búsqueda.",
    demoNotice: "Solo datos de demostración: estos jugadores, equipos y ajustes ficticios no son registros profesionales reales.",
    filterTitle: "Búsqueda y filtros",
    searchLabel: "Buscar jugador o equipo",
    searchPlaceholder: "Nombre del jugador o equipo",
    team: "Equipo",
    region: "Región",
    role: "Rol",
    allTeams: "Todos los equipos",
    allRegions: "Todas las regiones",
    allRoles: "Todos los roles",
    resultsTitle: "Configuraciones de jugadores",
    loading: "Cargando registros…",
    loadError: "No se pudieron cargar los registros de demostración. Inténtalo de nuevo más tarde.",
    noResults: "Ningún jugador coincide con la búsqueda y los filtros actuales.",
    oneRecord: "1 registro",
    manyRecords: "{count} registros",
    player: "Jugador",
    dpi: "DPI",
    sensitivity: "Sensibilidad",
    edpi: "eDPI",
    mouse: "Mouse",
    keyboard: "Teclado",
    monitor: "Monitor",
    verified: "Verificado",
    source: "Fuente",
    viewSource: "Ver fuente",
    demo: "Registro demo",
    selectedPlayer: "Jugador seleccionado",
    details: "Detalles del jugador",
    closeDetails: "Cerrar detalles del jugador"
  }
};

const roleTranslations = {
  es: {
    Duelist: "Duelista",
    Controller: "Controlador",
    Sentinel: "Centinela",
    Initiator: "Iniciador"
  }
};

const elements = {
  search: document.getElementById("playerSearch"),
  team: document.getElementById("teamFilter"),
  region: document.getElementById("regionFilter"),
  role: document.getElementById("roleFilter"),
  grid: document.getElementById("settingsGrid"),
  count: document.getElementById("resultCount"),
  empty: document.getElementById("emptyState"),
  detailOverlay: document.getElementById("detailOverlay"),
  detailPanel: document.getElementById("detailPanel"),
  detailTitle: document.getElementById("detailTitle"),
  detailContent: document.getElementById("detailContent"),
  detailClose: document.getElementById("detailClose")
};

let records = [];
let currentLanguage = window.ValoToolsUI?.getLanguage() || "en";
let selectedPlayerId = null;
let loadFailed = false;
let modalScrollPosition = 0;
let lastFocusedElement = null;

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function translateRole(role) {
  return roleTranslations[currentLanguage]?.[role] || role;
}

function formatEdpi(record) {
  const value = record.dpi * record.sensitivity;
  return Number(value.toFixed(2)).toString();
}

function formatDate(dateValue) {
  const date = new Date(`${dateValue}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return dateValue;

  return new Intl.DateTimeFormat(currentLanguage === "es" ? "es-ES" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC"
  }).format(date);
}

function normalized(value) {
  return value
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isValidRecord(record) {
  const textFields = ["id", "player", "team", "role", "region", "mouse", "keyboard", "monitor", "verifiedAt", "sourceUrl"];
  const hasText = textFields.every((field) => typeof record[field] === "string" && record[field].trim());
  const hasNumbers = Number.isFinite(record.dpi) && record.dpi > 0 && Number.isFinite(record.sensitivity) && record.sensitivity > 0;

  try {
    const source = new URL(record.sourceUrl);
    return hasText && hasNumbers && source.protocol === "https:";
  } catch (error) {
    return false;
  }
}

function uniqueValues(field) {
  return [...new Set(records.map((record) => record[field]))].sort((a, b) => a.localeCompare(b));
}

function populateSelect(select, values, allLabel, formatter = (value) => value) {
  const previousValue = select.value;
  select.replaceChildren(new Option(allLabel, ""));
  values.forEach((value) => select.add(new Option(formatter(value), value)));
  select.value = values.includes(previousValue) ? previousValue : "";
}

function populateFilters() {
  const text = translations[currentLanguage];
  populateSelect(elements.team, uniqueValues("team"), text.allTeams);
  populateSelect(elements.region, uniqueValues("region"), text.allRegions);
  populateSelect(elements.role, uniqueValues("role"), text.allRoles, translateRole);
}

function addStat(container, label, value, highlight = false) {
  const stat = createElement("div", `card-stat${highlight ? " card-stat-edpi" : ""}`);
  stat.append(createElement("span", "", label), createElement("strong", "", value));
  container.append(stat);
}

function addGearRow(container, label, value) {
  const row = createElement("div", "gear-row");
  row.append(createElement("dt", "", label), createElement("dd", "", value));
  container.append(row);
}

function createSourceLink(record, label) {
  const link = createElement("a", "source-link", label);
  link.href = record.sourceUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.addEventListener("click", (event) => event.stopPropagation());
  return link;
}

function createPlayerCard(record) {
  const text = translations[currentLanguage];
  const card = createElement("article", `player-card${selectedPlayerId === record.id ? " selected" : ""}`);
  card.dataset.playerId = record.id;

  const openButton = createElement("button", "card-open");
  openButton.type = "button";
  openButton.setAttribute("aria-label", `${text.details}: ${record.player}`);
  openButton.setAttribute("aria-haspopup", "dialog");
  openButton.setAttribute("aria-controls", "detailPanel");
  openButton.setAttribute("aria-expanded", (selectedPlayerId === record.id).toString());
  openButton.addEventListener("click", () => showDetails(record.id, openButton));
  card.append(openButton);

  card.append(
    createElement("span", "card-demo-label", text.demo),
    createElement("h3", "card-player", record.player),
    createElement("p", "card-team", record.team)
  );

  const tags = createElement("div", "card-tags");
  tags.append(createElement("span", "card-tag", translateRole(record.role)), createElement("span", "card-tag", record.region));
  card.append(tags);

  const stats = createElement("div", "card-stats");
  addStat(stats, text.dpi, record.dpi.toString());
  addStat(stats, text.sensitivity, record.sensitivity.toString());
  addStat(stats, text.edpi, formatEdpi(record), true);
  card.append(stats);

  const gear = createElement("dl", "card-gear");
  addGearRow(gear, text.mouse, record.mouse);
  addGearRow(gear, text.keyboard, record.keyboard);
  addGearRow(gear, text.monitor, record.monitor);
  card.append(gear);

  const footer = createElement("div", "card-footer");
  footer.append(createElement("time", "", `${text.verified}: ${formatDate(record.verifiedAt)}`), createSourceLink(record, text.viewSource));
  card.append(footer);

  return card;
}

function filteredRecords() {
  const query = normalized(elements.search.value.trim());
  return records.filter((record) => {
    const matchesSearch = !query || normalized(`${record.player} ${record.team}`).includes(query);
    return matchesSearch &&
      (!elements.team.value || record.team === elements.team.value) &&
      (!elements.region.value || record.region === elements.region.value) &&
      (!elements.role.value || record.role === elements.role.value);
  });
}

function updateCount(count) {
  const text = translations[currentLanguage];
  elements.count.textContent = count === 1 ? text.oneRecord : text.manyRecords.replace("{count}", count);
}

function renderRecords() {
  const matches = filteredRecords();
  elements.grid.replaceChildren(...matches.map(createPlayerCard));
  elements.empty.hidden = matches.length !== 0;
  updateCount(matches.length);

  if (selectedPlayerId && !matches.some((record) => record.id === selectedPlayerId)) {
    closeDetails();
  }
}

function addDetailItem(container, label, value, className = "") {
  const item = createElement("dl", `detail-item ${className}`.trim());
  item.append(createElement("dt", "", label), createElement("dd", "", value));
  container.append(item);
}

function showDetails(playerId, triggerElement = null) {
  const record = records.find((item) => item.id === playerId);
  if (!record) return;

  const text = translations[currentLanguage];
  const wasOpen = !elements.detailOverlay.hidden;
  selectedPlayerId = playerId;
  if (triggerElement) lastFocusedElement = triggerElement;
  elements.detailTitle.textContent = record.player;
  elements.detailContent.replaceChildren();

  addDetailItem(elements.detailContent, text.team, record.team);
  addDetailItem(elements.detailContent, text.role, translateRole(record.role));
  addDetailItem(elements.detailContent, text.region, record.region);
  addDetailItem(elements.detailContent, text.dpi, record.dpi.toString());
  addDetailItem(elements.detailContent, text.sensitivity, record.sensitivity.toString());
  addDetailItem(elements.detailContent, text.edpi, formatEdpi(record), "detail-item-edpi");
  addDetailItem(elements.detailContent, text.mouse, record.mouse);
  addDetailItem(elements.detailContent, text.keyboard, record.keyboard);
  addDetailItem(elements.detailContent, text.monitor, record.monitor);
  addDetailItem(elements.detailContent, text.verified, formatDate(record.verifiedAt));

  const sourceItem = createElement("dl", "detail-item detail-source");
  const sourceValue = createElement("dd");
  sourceValue.append(createSourceLink(record, record.sourceUrl));
  sourceItem.append(createElement("dt", "", text.source), sourceValue);
  elements.detailContent.append(sourceItem);

  elements.detailOverlay.hidden = false;
  document.querySelectorAll(".player-card").forEach((card) => {
    const isSelected = card.dataset.playerId === playerId;
    card.classList.toggle("selected", isSelected);
    card.querySelector(".card-open").setAttribute("aria-expanded", isSelected.toString());
  });

  if (!wasOpen) {
    modalScrollPosition = window.scrollY;
    document.body.style.top = `-${modalScrollPosition}px`;
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => elements.detailClose.focus({ preventScroll: true }));
  }
}

function closeDetails() {
  if (elements.detailOverlay.hidden) return;

  const closingPlayerId = selectedPlayerId;
  selectedPlayerId = null;
  elements.detailOverlay.hidden = true;
  document.body.classList.remove("modal-open");
  document.body.style.top = "";
  window.scrollTo(0, modalScrollPosition);

  document.querySelectorAll(".player-card").forEach((card) => {
    card.classList.remove("selected");
    card.querySelector(".card-open").setAttribute("aria-expanded", "false");
  });

  const currentCard = [...document.querySelectorAll(".player-card")]
    .find((card) => card.dataset.playerId === closingPlayerId);
  const currentTrigger = currentCard?.querySelector(".card-open");
  const focusTarget = currentTrigger || (lastFocusedElement?.isConnected ? lastFocusedElement : null);
  focusTarget?.focus({ preventScroll: true });
  lastFocusedElement = null;
}

function handleModalKeydown(event) {
  if (elements.detailOverlay.hidden) return;

  if (event.key === "Escape") {
    event.preventDefault();
    closeDetails();
    return;
  }

  if (event.key !== "Tab") return;

  const focusable = [...elements.detailPanel.querySelectorAll(
    "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])"
  )].filter((element) => !element.hidden);

  if (!focusable.length) {
    event.preventDefault();
    elements.detailPanel.focus({ preventScroll: true });
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function updateStaticText() {
  const text = translations[currentLanguage];
  document.documentElement.lang = currentLanguage;

  const content = {
    eyebrowText: text.eyebrow,
    pageTitle: text.title,
    pageIntro: text.intro,
    demoNotice: text.demoNotice,
    filterTitle: text.filterTitle,
    searchLabel: text.searchLabel,
    teamFilterLabel: text.team,
    regionFilterLabel: text.region,
    roleFilterLabel: text.role,
    resultsTitle: text.resultsTitle,
    emptyState: text.noResults,
    detailKicker: text.selectedPlayer
  };

  Object.entries(content).forEach(([id, value]) => {
    document.getElementById(id).textContent = value;
  });

  elements.search.placeholder = text.searchPlaceholder;
  elements.detailClose.setAttribute("aria-label", text.closeDetails);

  if (loadFailed) elements.count.textContent = text.loadError;
}

function setLanguage(language) {
  currentLanguage = language === "es" ? "es" : "en";
  updateStaticText();
  populateFilters();
  renderRecords();

  if (selectedPlayerId) showDetails(selectedPlayerId);
}

async function loadRecords() {
  const text = translations[currentLanguage];
  elements.count.textContent = text.loading;

  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("Expected an array of player records");

    records = data.filter(isValidRecord);
    if (records.length !== data.length) {
      console.warn("Some pro settings records were ignored because they are incomplete or invalid.");
    }
    populateFilters();
    renderRecords();
  } catch (error) {
    loadFailed = true;
    elements.count.textContent = text.loadError;
    elements.grid.replaceChildren();
    elements.empty.hidden = true;
    console.error("Unable to load pro settings:", error);
  }
}

[elements.search, elements.team, elements.region, elements.role].forEach((control) => {
  control.addEventListener(control === elements.search ? "input" : "change", renderRecords);
});

elements.detailClose.addEventListener("click", closeDetails);
elements.detailOverlay.addEventListener("click", (event) => {
  if (event.target === elements.detailOverlay) closeDetails();
});
document.addEventListener("keydown", handleModalKeydown);
document.addEventListener("valotools:languagechange", (event) => setLanguage(event.detail.language));

updateStaticText();
loadRecords();
