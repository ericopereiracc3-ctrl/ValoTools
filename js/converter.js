const sourceSens = document.getElementById("sourceSens");
const targetGame = document.getElementById("targetGame");
const convertGameBtn = document.getElementById("convertGameBtn");
const gameConvertedValue = document.getElementById("gameConvertedValue");

function convertSensitivity() {
  const valorantSens = parseFloat(sourceSens.value);

  if (!valorantSens || valorantSens <= 0) {
    gameConvertedValue.textContent = "—";
    return;
  }

  let convertedSens;

  if (targetGame.value === "cs2") {
    convertedSens = valorantSens * 3.181818;
  }

  gameConvertedValue.textContent = convertedSens.toFixed(3);
}

convertGameBtn.addEventListener("click", convertSensitivity);

sourceSens.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    convertSensitivity();
  }
});