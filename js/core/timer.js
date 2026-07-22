/* =========================================================
   MISSION GCSE — TIMER
   ========================================================= */

"use strict";

function renderTimer() {
  const minutes =
    Math.floor(timerSeconds / 60);

  const seconds =
    timerSeconds % 60;

  elements.timerDisplay.textContent =
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;

  const totalSeconds = 20 * 60;

  const elapsed =
    totalSeconds - timerSeconds;

  const percent =
    (elapsed / totalSeconds) * 100;

  elements.timerProgressFill.style.width =
    `${percent}%`;
}

function startTimer() {
  if (timerRunning) {
    return;
  }

  timerRunning = true;

  elements.timerStatus.textContent = "Focusing";

  timerInterval = window.setInterval(() => {
    timerSeconds -= 1;

    renderTimer();

    if (timerSeconds <= 0) {
      window.clearInterval(timerInterval);

      timerInterval = null;
      timerRunning = false;
      timerSeconds = 0;

      elements.timerStatus.textContent = "Complete";

      showToast(
        "Focus block complete",
        "Twenty focused minutes finished."
      );
    }
  }, 1000);
}

function pauseTimer() {
  if (!timerRunning) {
    return;
  }

  window.clearInterval(timerInterval);

  timerInterval = null;
  timerRunning = false;

  elements.timerStatus.textContent = "Paused";
}

function resetTimer() {
  window.clearInterval(timerInterval);

  timerInterval = null;
  timerRunning = false;
  timerSeconds = 20 * 60;

  elements.timerStatus.textContent = "Ready";

  renderTimer();
}