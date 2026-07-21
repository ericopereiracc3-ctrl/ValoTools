(function (root, factory) {
  "use strict";

  const codec = factory();
  if (typeof module === "object" && module.exports) module.exports = codec;
  if (root) root.ValoToolsCrosshairCodec = codec;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  /*
   * Supported VALORANT profile-code mapping (Primary block only):
   * c=color, u=custom RGB, b=use custom RGB, h/o/t=outline toggle/opacity/thickness,
   * d/a/z=center-dot toggle/opacity/thickness, 0b=inner-line toggle,
   * 0a/0l/0t/0o=inner opacity/length/thickness/offset,
   * 0m/0f=inner movement/firing error. 1b;0 explicitly disables outer lines.
   * ADS, sniper, outer-line editing, import, fade and error multipliers are deliberately
   * outside V0.1 and are never inferred or emitted here.
   */
  const COLOR_CODES = Object.freeze({
    white: 0,
    green: 1,
    yellowgreen: 2,
    greenyellow: 3,
    yellow: 4,
    cyan: 5,
    pink: 6,
    red: 7,
    custom: 8
  });

  const COLOR_HEX = Object.freeze({
    white: "FFFFFF",
    green: "00FF00",
    yellowgreen: "7FFF00",
    greenyellow: "DFFF00",
    yellow: "FFFF00",
    cyan: "00FFFF",
    pink: "FF00FF",
    red: "FF0000"
  });

  const DEFAULT_CONFIG = Object.freeze({
    color: "cyan",
    customColor: "00FFFF",
    outlineEnabled: false,
    outlineOpacity: 0.5,
    outlineThickness: 1,
    centerDotEnabled: false,
    centerDotOpacity: 1,
    centerDotThickness: 2,
    innerLinesEnabled: true,
    innerOpacity: 1,
    innerLength: 4,
    innerThickness: 2,
    innerOffset: 2,
    movementError: false,
    firingError: false
  });

  function toNumber(value, fallback) {
    const normalized = typeof value === "string" ? value.trim().replace(",", ".") : value;
    const number = Number(normalized);
    return Number.isFinite(number) ? number : fallback;
  }

  function clamp(value, min, max, fallback, integer = false) {
    const bounded = Math.min(max, Math.max(min, toNumber(value, fallback)));
    return integer ? Math.round(bounded) : Math.round(bounded * 1000) / 1000;
  }

  function booleanValue(value, fallback) {
    return typeof value === "boolean" ? value : fallback;
  }

  function normalizeHex(value, fallback = DEFAULT_CONFIG.customColor) {
    const normalized = String(value || "").trim().replace(/^#/, "").toUpperCase();
    return /^[0-9A-F]{6}$/.test(normalized) ? normalized : fallback;
  }

  function normalizeConfig(input = {}) {
    const color = Object.hasOwn(COLOR_CODES, input.color) ? input.color : DEFAULT_CONFIG.color;
    return {
      color,
      customColor: normalizeHex(input.customColor),
      outlineEnabled: booleanValue(input.outlineEnabled, DEFAULT_CONFIG.outlineEnabled),
      outlineOpacity: clamp(input.outlineOpacity, 0, 1, DEFAULT_CONFIG.outlineOpacity),
      outlineThickness: clamp(input.outlineThickness, 1, 6, DEFAULT_CONFIG.outlineThickness, true),
      centerDotEnabled: booleanValue(input.centerDotEnabled, DEFAULT_CONFIG.centerDotEnabled),
      centerDotOpacity: clamp(input.centerDotOpacity, 0, 1, DEFAULT_CONFIG.centerDotOpacity),
      centerDotThickness: clamp(input.centerDotThickness, 1, 6, DEFAULT_CONFIG.centerDotThickness, true),
      innerLinesEnabled: booleanValue(input.innerLinesEnabled, DEFAULT_CONFIG.innerLinesEnabled),
      innerOpacity: clamp(input.innerOpacity, 0, 1, DEFAULT_CONFIG.innerOpacity),
      innerLength: clamp(input.innerLength, 0, 20, DEFAULT_CONFIG.innerLength, true),
      innerThickness: clamp(input.innerThickness, 0, 10, DEFAULT_CONFIG.innerThickness, true),
      innerOffset: clamp(input.innerOffset, 0, 20, DEFAULT_CONFIG.innerOffset, true),
      movementError: booleanValue(input.movementError, DEFAULT_CONFIG.movementError),
      firingError: booleanValue(input.firingError, DEFAULT_CONFIG.firingError)
    };
  }

  function decimal(value) {
    return Number(value.toFixed(3)).toString();
  }

  function bit(value) {
    return value ? "1" : "0";
  }

  function serialize(input) {
    const config = normalizeConfig(input);
    const colorTokens = config.color === "custom"
      ? ["c", "8", "u", config.customColor, "b", "1"]
      : ["c", String(COLOR_CODES[config.color])];

    return [
      "0", "s", "1", "P",
      ...colorTokens,
      "h", bit(config.outlineEnabled),
      "o", decimal(config.outlineOpacity),
      "t", String(config.outlineThickness),
      "d", bit(config.centerDotEnabled),
      "a", decimal(config.centerDotOpacity),
      "z", String(config.centerDotThickness),
      "0b", bit(config.innerLinesEnabled),
      "0a", decimal(config.innerOpacity),
      "0l", String(config.innerLength),
      "0t", String(config.innerThickness),
      "0o", String(config.innerOffset),
      "0m", bit(config.movementError),
      "0f", bit(config.firingError),
      "1b", "0"
    ].join(";");
  }

  function isStructurallyValid(code) {
    if (typeof code !== "string" || !code.startsWith("0;s;1;P;") || code.includes(";;")) return false;
    const tokens = code.split(";");
    if (tokens.length < 34 || tokens.some((token) => token === "")) return false;
    const pairs = new Map();
    for (let index = 4; index < tokens.length; index += 2) pairs.set(tokens[index], tokens[index + 1]);
    return pairs.has("c") && pairs.has("h") && pairs.has("0b") && pairs.has("0m") && pairs.has("0f") && pairs.get("1b") === "0";
  }

  function getDisplayColor(input) {
    const config = normalizeConfig(input);
    return `#${config.color === "custom" ? config.customColor : COLOR_HEX[config.color]}`;
  }

  function differingTokens(firstCode, secondCode) {
    const first = firstCode.split(";");
    const second = secondCode.split(";");
    const differences = [];
    const length = Math.max(first.length, second.length);
    for (let index = 0; index < length; index += 1) {
      if (first[index] !== second[index]) differences.push(index);
    }
    return differences;
  }

  function runSelfTests(presets = []) {
    const failures = [];
    const base = normalizeConfig(DEFAULT_CONFIG);
    const firstCode = serialize(base);

    if (firstCode !== serialize(base)) failures.push("deterministic-serialization");

    const changed = { ...base, innerLength: base.innerLength + 1 };
    const differences = differingTokens(firstCode, serialize(changed));
    if (differences.length !== 1 || firstCode.split(";")[differences[0] - 1] !== "0l") {
      failures.push("single-parameter-change");
    }

    presets.forEach((preset) => {
      const code = serialize(preset.config);
      if (!code || !isStructurallyValid(code)) failures.push(`invalid-preset:${preset.id || "unknown"}`);
      if (code !== serialize(normalizeConfig(preset.config))) failures.push(`preset-restore:${preset.id || "unknown"}`);
    });

    if (presets.length && presets.length !== 24) failures.push(`preset-count:${presets.length}`);
    return { passed: failures.length === 0, failures, checkedPresets: presets.length };
  }

  return Object.freeze({
    COLOR_CODES,
    COLOR_HEX,
    DEFAULT_CONFIG,
    normalizeConfig,
    normalizeHex,
    serialize,
    isStructurallyValid,
    getDisplayColor,
    runSelfTests
  });
});
