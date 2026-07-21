const missionList = document.getElementById("missionList");
const timerDisplay = document.getElementById("timerDisplay");

let timerSeconds = 20 * 60;
let timerInterval = null;

function renderDate() {
  const date = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(new Date());

  document.getElementById("currentDate").textContent = date;
}

function renderMissions() {
  missionList.innerHTML = "";

  todaysMissions.forEach(mission => {
    const card = document.createElement("article");
    card.className = "mission-card";

    card.innerHTML = `
      <div class="mission-icon">${mission.letter}</div>

      <div>
        <div class="mission-subject">${mission.subject}</div>
        <div class="mission-title">${mission.title}</div>
        <div class="mission-detail">${mission.detail}</div>
      </div>

      <button class="mission-button">Start</button>
    `;

    missionList.appendChild(card);
  });
}

function updateTimerDisplay() {
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;

  timerDisplay.textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

document.getElementById("startTimer").addEventListener("click", () => {
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    if (timerSeconds > 0) {
      timerSeconds--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      alert("Focus block complete.");
    }
  }, 1000);
});

document.getElementById("pauseTimer").addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
});

document.getElementById("resetTimer").addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timerSeconds = 20 * 60;
  updateTimerDisplay();
});

renderDate();
renderMissions();
updateTimerDisplay();