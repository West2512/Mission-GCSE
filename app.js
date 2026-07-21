const missionList = document.getElementById("missionList");
const timerDisplay = document.getElementById("timerDisplay");

let timerSeconds = 20 * 60;
let timerInterval = null;

const savedProgress = JSON.parse(localStorage.getItem("missionGCSEProgress")) || {
  completedMissions: [],
  xp: 0
};

function saveProgress() {
  localStorage.setItem(
    "missionGCSEProgress",
    JSON.stringify(savedProgress)
  );
}

function renderDate() {
  const date = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(new Date());

  document.getElementById("currentDate").textContent = date;
}

function getLevel() {
  if (savedProgress.xp >= 300) return "Focused";
  if (savedProgress.xp >= 150) return "Builder";
  if (savedProgress.xp >= 50) return "Rising";
  return "Starter";
}

function updateDashboard() {
  const completed = savedProgress.completedMissions.length;
  const total = todaysMissions.length;
  const percentage = Math.round((completed / total) * 100);

  const statValues = document.querySelectorAll(".stat-value");

  statValues[0].textContent = savedProgress.xp;
  statValues[1].textContent = completed;
  statValues[2].textContent = getLevel();
  statValues[3].textContent =
    savedProgress.xp < 50 ? "50 XP" :
    savedProgress.xp < 150 ? "150 XP" :
    savedProgress.xp < 300 ? "300 XP" :
    "Unlocked";

  document.querySelector(".profile-level").textContent =
    `${getLevel()} level`;

  document.querySelector(".progress-number").textContent =
    `${percentage}%`;

  document.querySelector(".progress-card").style.background = `
    radial-gradient(circle, var(--surface) 61%, transparent 62%),
    conic-gradient(
      var(--accent) ${percentage * 3.6}deg,
      rgba(255, 255, 255, 0.08) 0deg
    )
  `;
}

function completeMission(index) {
  if (savedProgress.completedMissions.includes(index)) return;

  savedProgress.completedMissions.push(index);
  savedProgress.xp += 10;

  saveProgress();
  renderMissions();
  updateDashboard();
}

function renderMissions() {
  missionList.innerHTML = "";

  todaysMissions.forEach((mission, index) => {
    const completed =
      savedProgress.completedMissions.includes(index);

    const card = document.createElement("article");
    card.className =
      completed ? "mission-card completed" : "mission-card";

    card.innerHTML = `
      <div class="mission-icon">${mission.letter}</div>

      <div>
        <div class="mission-subject">${mission.subject}</div>
        <div class="mission-title">${mission.title}</div>
        <div class="mission-detail">${mission.detail}</div>
      </div>

      <button
        class="mission-button"
        data-index="${index}"
        ${completed ? "disabled" : ""}
      >
        ${completed ? "Complete" : "Mark complete"}
      </button>
    `;

    missionList.appendChild(card);
  });

  document.querySelectorAll(".mission-button").forEach(button => {
    button.addEventListener("click", event => {
      const index = Number(event.target.dataset.index);
      completeMission(index);
    });
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
updateDashboard();
updateTimerDisplay();