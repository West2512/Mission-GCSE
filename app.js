const STORAGE_KEY = "missionGCSEV2Progress";

const weeklyPlan = [
  {
    day: "Monday",
    shortDay: "Mon",
    missions: [
      {
        id: "monday-english",
        subject: "English",
        title: "Retrieving information",
        detail: "Read a short extract and record five clear facts.",
        duration: 20,
        xp: 10,
        marker: "EN"
      },
      {
        id: "monday-biology",
        subject: "Biology",
        title: "Cell structures",
        detail: "Recall the main cell structures and explain their functions.",
        duration: 20,
        xp: 10,
        marker: "BI"
      },
      {
        id: "monday-maths",
        subject: "Maths",
        title: "Fractions and percentages",
        detail: "Complete a short set of mixed conversion questions.",
        duration: 20,
        xp: 10,
        marker: "MA"
      }
    ]
  },
  {
    day: "Tuesday",
    shortDay: "Tue",
    missions: [
      {
        id: "tuesday-chemistry",
        subject: "Chemistry",
        title: "Atomic structure",
        detail: "Recall the charges and locations of subatomic particles.",
        duration: 20,
        xp: 10,
        marker: "CH"
      },
      {
        id: "tuesday-english",
        subject: "English",
        title: "Language techniques",
        detail: "Find three techniques and explain the effect of one.",
        duration: 20,
        xp: 10,
        marker: "EN"
      },
      {
        id: "tuesday-computing",
        subject: "Computer Science",
        title: "Networks recall",
        detail: "Review LANs, WANs and the role of common network devices.",
        duration: 20,
        xp: 10,
        marker: "CS"
      }
    ]
  },
  {
    day: "Wednesday",
    shortDay: "Wed",
    missions: [
      {
        id: "wednesday-maths",
        subject: "Maths",
        title: "Algebra foundations",
        detail: "Simplify expressions and solve short linear equations.",
        duration: 20,
        xp: 10,
        marker: "MA"
      },
      {
        id: "wednesday-physics",
        subject: "Physics",
        title: "Energy stores",
        detail: "Recall energy stores, transfers and key examples.",
        duration: 20,
        xp: 10,
        marker: "PH"
      },
      {
        id: "wednesday-english",
        subject: "English",
        title: "Building an explanation",
        detail: "Use a quotation to build one clear analytical paragraph.",
        duration: 20,
        xp: 10,
        marker: "EN"
      }
    ]
  },
  {
    day: "Thursday",
    shortDay: "Thu",
    missions: [
      {
        id: "thursday-biology",
        subject: "Biology",
        title: "Organisation",
        detail: "Put cells, tissues, organs and systems into the correct order.",
        duration: 20,
        xp: 10,
        marker: "BI"
      },
      {
        id: "thursday-electronics",
        subject: "Electronics",
        title: "Circuit components",
        detail: "Recall common component symbols and their purposes.",
        duration: 20,
        xp: 10,
        marker: "EL"
      },
      {
        id: "thursday-maths",
        subject: "Maths",
        title: "Ratio and proportion",
        detail: "Complete a focused set of ratio and scaling questions.",
        duration: 20,
        xp: 10,
        marker: "MA"
      }
    ]
  },
  {
    day: "Friday",
    shortDay: "Fri",
    missions: [
      {
        id: "friday-english",
        subject: "English",
        title: "Vocabulary upgrade",
        detail: "Improve five ordinary words with more precise alternatives.",
        duration: 20,
        xp: 10,
        marker: "EN"
      },
      {
        id: "friday-chemistry",
        subject: "Chemistry",
        title: "Periodic table",
        detail: "Recall the layout of the periodic table and key group patterns.",
        duration: 20,
        xp: 10,
        marker: "CH"
      },
      {
        id: "friday-computing",
        subject: "Computer Science",
        title: "Algorithms",
        detail: "Trace a simple algorithm and identify its final output.",
        duration: 20,
        xp: 10,
        marker: "CS"
      }
    ]
  },
  {
    day: "Saturday",
    shortDay: "Sat",
    rest: true,
    missions: []
  },
  {
    day: "Sunday",
    shortDay: "Sun",
    review: true,
    missions: [
      {
        id: "sunday-paper",
        subject: "Weekly Review",
        title: "Past-paper practice",
        detail: "Complete one timed section from a GCSE paper.",
        duration: 20,
        xp: 10,
        marker: "PP"
      },
      {
        id: "sunday-revisit",
        subject: "Weekly Review",
        title: "Revisit tricky areas",
        detail: "Return to two ideas that felt difficult during the week.",
        duration: 20,
        xp: 10,
        marker: "RV"
      },
      {
        id: "sunday-plan",
        subject: "Weekly Review",
        title: "Prepare for next week",
        detail: "Choose the first subjects and topics for Monday.",
        duration: 20,
        xp: 10,
        marker: "NX"
      }
    ]
  }
];

const subjects = [
  {
    code: "AQA",
    name: "English",
    description:
      "Language reading, creative writing, literature knowledge and analytical responses.",
    board: "AQA English",
    colour: "#78a9ff"
  },
  {
    code: "EDX",
    name: "Maths",
    description:
      "Number, algebra, ratio, geometry, probability and statistics.",
    board: "Edexcel Maths",
    colour: "#6ee7b7"
  },
  {
    code: "AQA",
    name: "Biology",
    description:
      "Cells, organisation, infection, bioenergetics, homeostasis and ecology.",
    board: "AQA Separate Science",
    colour: "#8fe388"
  },
  {
    code: "AQA",
    name: "Chemistry",
    description:
      "Atomic structure, bonding, calculations, reactions and organic chemistry.",
    board: "AQA Separate Science",
    colour: "#ad91ff"
  },
  {
    code: "AQA",
    name: "Physics",
    description:
      "Energy, electricity, forces, waves, magnetism and atomic physics.",
    board: "AQA Separate Science",
    colour: "#f6b86b"
  },
  {
    code: "OCR",
    name: "Computer Science",
    description:
      "Systems architecture, networks, algorithms, programming and data.",
    board: "OCR Computer Science",
    colour: "#ff8ea1"
  },
  {
    code: "EDU",
    name: "Electronics",
    description:
      "Circuit design, components, logic systems and programmable control.",
    board: "Eduqas Electronics",
    colour: "#67d9e8"
  },
  {
    code: "TBC",
    name: "Additional Maths",
    description:
      "Advanced algebra, functions, coordinate geometry and calculus foundations.",
    board: "Board to confirm",
    colour: "#d5a7ff"
  }
];

const achievementDefinitions = [
  {
    id: "first-step",
    icon: "01",
    title: "First Step",
    description: "Complete your first revision mission.",
    condition: progress => progress.completedMissions.length >= 1
  },
  {
    id: "three-blocks",
    icon: "03",
    title: "Full Session",
    description: "Complete three focused revision blocks.",
    condition: progress => progress.completedMissions.length >= 3
  },
  {
    id: "xp-50",
    icon: "50",
    title: "Rising",
    description: "Earn a total of 50 XP.",
    condition: progress => progress.xp >= 50
  },
  {
    id: "xp-100",
    icon: "100",
    title: "Century",
    description: "Earn a total of 100 XP.",
    condition: progress => progress.xp >= 100
  },
  {
    id: "active-three-days",
    icon: "3D",
    title: "Building Momentum",
    description: "Revise on three different days.",
    condition: progress => progress.activeDates.length >= 3
  },
  {
    id: "weekly-six",
    icon: "06",
    title: "Strong Week",
    description: "Complete six missions during the week.",
    condition: progress => progress.completedMissions.length >= 6
  }
];

const reminders = [
  "You don’t need to feel ready. Starting creates momentum.",
  "A focused twenty minutes is more useful than an hour of avoiding it.",
  "Progress is built through repetition, not perfection.",
  "Getting stuck is information. It shows you what to revisit.",
  "One completed block is always better than a perfect plan that never starts.",
  "Confidence usually arrives after you begin, not before."
];

const levels = [
  {
    name: "Rookie",
    minimum: 0,
    next: 50
  },
  {
    name: "Rising",
    minimum: 50,
    next: 150
  },
  {
    name: "Builder",
    minimum: 150,
    next: 300
  },
  {
    name: "Focused",
    minimum: 300,
    next: 500
  },
  {
    name: "Specialist",
    minimum: 500,
    next: 800
  },
  {
    name: "Mastery",
    minimum: 800,
    next: null
  }
];

function createDefaultProgress() {
  return {
    completedMissions: [],
    xp: 0,
    activeDates: []
  };
}

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return createDefaultProgress();
    }

    const parsed = JSON.parse(saved);

    return {
      completedMissions: Array.isArray(parsed.completedMissions)
        ? parsed.completedMissions
        : [],
      xp: Number.isFinite(parsed.xp) ? parsed.xp : 0,
      activeDates: Array.isArray(parsed.activeDates)
        ? parsed.activeDates
        : []
    };
  } catch (error) {
    console.error("Progress could not be loaded:", error);
    return createDefaultProgress();
  }
}

let progress = loadProgress();
let timerSeconds = 20 * 60;
let timerInterval = null;
let toastTimeout = null;

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function getTodayKey() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getCurrentPlanDay() {
  const dayIndex = new Date().getDay();

  const mappedIndex = dayIndex === 0 ? 6 : dayIndex - 1;

  return weeklyPlan[mappedIndex];
}

function getAllMissions() {
  return weeklyPlan.flatMap(day => day.missions);
}

function getCurrentLevelDetails() {
  return (
    [...levels]
      .reverse()
      .find(level => progress.xp >= level.minimum) || levels[0]
  );
}

function calculateStreak() {
  const uniqueDates = [...new Set(progress.activeDates)].sort();

  if (uniqueDates.length === 0) {
    return 0;
  }

  const dateSet = new Set(uniqueDates);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  let cursor;

  if (dateSet.has(formatDate(today))) {
    cursor = new Date(today);
  } else if (dateSet.has(formatDate(yesterday))) {
    cursor = new Date(yesterday);
  } else {
    return 0;
  }

  let streak = 0;

  while (dateSet.has(formatDate(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function renderDate() {
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date());

  document.getElementById("currentDate").textContent = formattedDate;
}

function renderReminder() {
  const dayNumber = new Date().getDate();
  const reminder = reminders[dayNumber % reminders.length];

  document.getElementById("dailyReminder").textContent = reminder;
}

function renderNavigation() {
  const navigationButtons = document.querySelectorAll(".nav-item");
  const views = document.querySelectorAll(".app-view");

  navigationButtons.forEach(button => {
    button.addEventListener("click", () => {
      const viewName = button.dataset.view;

      navigationButtons.forEach(item => {
        item.classList.remove("active");
      });

      views.forEach(view => {
        view.classList.remove("active-view");
      });

      button.classList.add("active");

      const selectedView = document.getElementById(`${viewName}View`);

      if (selectedView) {
        selectedView.classList.add("active-view");
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  });
}

function renderMissions() {
  const missionList = document.getElementById("missionList");
  const currentDay = getCurrentPlanDay();

  document.getElementById("todayName").textContent = currentDay.day;

  missionList.innerHTML = "";

  if (currentDay.rest) {
    missionList.innerHTML = `
      <article class="mission-card">
        <div class="mission-marker">OFF</div>

        <div>
          <div class="mission-subject">Saturday</div>
          <div class="mission-title">Rest and reset</div>
          <div class="mission-detail">
            No scheduled revision today. Rest is part of the programme.
          </div>
        </div>

        <button class="mission-action" disabled>
          Rest day
        </button>
      </article>
    `;

    document.getElementById("missionCount").textContent = "Rest day";
    return;
  }

  currentDay.missions.forEach(mission => {
    const completed = progress.completedMissions.includes(mission.id);

    const card = document.createElement("article");

    card.className = completed
      ? "mission-card completed"
      : "mission-card";

    card.innerHTML = `
      <div class="mission-marker">
        ${completed ? "✓" : mission.marker}
      </div>

      <div>
        <div class="mission-subject">${mission.subject}</div>
        <div class="mission-title">${mission.title}</div>
        <div class="mission-detail">${mission.detail}</div>

        <div class="mission-meta">
          <span>${mission.duration} minutes</span>
          <span>·</span>
          <span>+${mission.xp} XP</span>
        </div>
      </div>

      <button
        class="mission-action"
        data-mission-id="${mission.id}"
        ${completed ? "disabled" : ""}
      >
        ${completed ? "Complete" : "Mark complete"}
      </button>
    `;

    missionList.appendChild(card);
  });

  missionList
    .querySelectorAll("[data-mission-id]")
    .forEach(button => {
      button.addEventListener("click", () => {
        completeMission(button.dataset.missionId);
      });
    });
}

function completeMission(missionId) {
  if (progress.completedMissions.includes(missionId)) {
    return;
  }

  const mission = getAllMissions().find(item => item.id === missionId);

  if (!mission) {
    return;
  }

  progress.completedMissions.push(missionId);
  progress.xp += mission.xp;

  const todayKey = getTodayKey();

  if (!progress.activeDates.includes(todayKey)) {
    progress.activeDates.push(todayKey);
  }

  saveProgress();
  renderEverything();

  showToast(
    `+${mission.xp} XP earned`,
    `${mission.subject}: ${mission.title}`
  );
}

function renderDashboardProgress() {
  const currentDay = getCurrentPlanDay();

  const dailyMissions = currentDay.missions;
  const dailyCompleted = dailyMissions.filter(mission =>
    progress.completedMissions.includes(mission.id)
  ).length;

  const dailyTotal = dailyMissions.length;

  const dailyPercentage =
    dailyTotal === 0
      ? 0
      : Math.round((dailyCompleted / dailyTotal) * 100);

  const allMissions = getAllMissions();

  const weeklyCompleted = allMissions.filter(mission =>
    progress.completedMissions.includes(mission.id)
  ).length;

  const weeklyPercentage = Math.round(
    (weeklyCompleted / allMissions.length) * 100
  );

  document.getElementById("dailyProgressNumber").textContent =
    `${dailyPercentage}%`;

  document
    .getElementById("dailyProgressRing")
    .style.setProperty(
      "--progress",
      `${dailyPercentage * 3.6}deg`
    );

  document.getElementById("missionCount").textContent =
    currentDay.rest
      ? "Rest day"
      : `${dailyCompleted} of ${dailyTotal} complete`;

  document.getElementById("weeklyProgress").textContent =
    `${weeklyPercentage}%`;

  document.getElementById("weeklyBlocksText").textContent =
    `${weeklyCompleted} of ${allMissions.length} weekly blocks complete`;

  const progressMessage =
    currentDay.rest
      ? "Rest today. The next mission will be ready tomorrow."
      : dailyCompleted === 0
        ? "Complete your first mission to begin."
        : dailyCompleted === 1
          ? "Good start. Two focused blocks remain."
          : dailyCompleted === 2
            ? "Nearly there. One final block remains."
            : "Today’s plan is complete. Strong work.";

  document.getElementById("dailyProgressMessage").textContent =
    progressMessage;
}

function renderXpAndLevel() {
  const level = getCurrentLevelDetails();
  const levelNumber = levels.findIndex(item => item.name === level.name) + 1;

  document.getElementById("totalXp").textContent = progress.xp;
  document.getElementById("topbarXp").textContent = progress.xp;
  document.getElementById("currentLevel").textContent = level.name;
  document.getElementById("levelName").textContent = level.name;
  document.getElementById("sidebarLevel").textContent =
    `Level ${levelNumber} · ${level.name}`;

  if (level.next === null) {
    document.getElementById("levelProgressText").textContent =
      "Highest level reached";

    document.getElementById("levelXpLabel").textContent =
      `${progress.xp} XP`;

    document.getElementById("levelFill").style.width = "100%";

    document.getElementById("nextLevelMessage").textContent =
      "Mastery level unlocked. Keep strengthening your knowledge.";

    return;
  }

  const xpIntoLevel = progress.xp - level.minimum;
  const levelRange = level.next - level.minimum;
  const levelPercentage = Math.min(
    100,
    Math.round((xpIntoLevel / levelRange) * 100)
  );

  const xpRemaining = level.next - progress.xp;
  const nextLevel = levels.find(item => item.minimum === level.next);

  document.getElementById("levelProgressText").textContent =
    `${xpRemaining} XP until ${nextLevel.name}`;

  document.getElementById("levelXpLabel").textContent =
    `${progress.xp} / ${level.next} XP`;

  document.getElementById("levelFill").style.width =
    `${levelPercentage}%`;

  document.getElementById("nextLevelMessage").textContent =
    `Complete focused blocks to reach ${nextLevel.name}.`;
}

function renderStreak() {
  const streak = calculateStreak();

  document.getElementById("currentStreak").textContent = streak;
  document.getElementById("sidebarStreak").textContent = streak;
}

function renderWeeklyPlan() {
  const weeklyGrid = document.getElementById("weeklyGrid");

  weeklyGrid.innerHTML = "";

  weeklyPlan.forEach(day => {
    const completedCount = day.missions.filter(mission =>
      progress.completedMissions.includes(mission.id)
    ).length;

    const card = document.createElement("article");

    card.className = day.rest
      ? "day-card rest-day"
      : "day-card";

    if (day.rest) {
      card.innerHTML = `
        <div class="day-card-top">
          <h3>${day.day}</h3>
          <span class="day-progress">Rest</span>
        </div>

        <p>
          No scheduled revision. Switch off, recharge and enjoy the day.
        </p>

        <div class="day-missions">
          <div class="day-mission">
            <span>Rest and reset</span>
            <span>No blocks</span>
          </div>
        </div>
      `;
    } else {
      card.innerHTML = `
        <div class="day-card-top">
          <h3>${day.day}</h3>
          <span class="day-progress">
            ${completedCount}/${day.missions.length}
          </span>
        </div>

        <p>
          ${
            day.review
              ? "Past-paper practice and weekly review."
              : "Three focused twenty-minute revision blocks."
          }
        </p>

        <div class="day-missions">
          ${day.missions
            .map(mission => {
              const completed =
                progress.completedMissions.includes(mission.id);

              return `
                <div class="day-mission">
                  <span>${completed ? "✓ " : ""}${mission.subject}</span>
                  <span>${mission.duration} min</span>
                </div>
              `;
            })
            .join("")}
        </div>
      `;
    }

    weeklyGrid.appendChild(card);
  });
}

function renderSubjects() {
  const subjectGrid = document.getElementById("subjectGrid");

  subjectGrid.innerHTML = "";

  subjects.forEach(subject => {
    const card = document.createElement("article");

    card.className = "subject-card";
    card.style.setProperty("--subject-colour", subject.colour);

    card.innerHTML = `
      <span class="subject-code">${subject.code}</span>

      <h3>${subject.name}</h3>

      <p>${subject.description}</p>

      <span class="subject-board">${subject.board}</span>
    `;

    card.addEventListener("click", () => {
      showToast(
        `${subject.name} area`,
        "Interactive activities will be added in the next build."
      );
    });

    subjectGrid.appendChild(card);
  });
}

function renderAchievements() {
  const achievementGrid =
    document.getElementById("achievementGrid");

  achievementGrid.innerHTML = "";

  achievementDefinitions.forEach(achievement => {
    const unlocked = achievement.condition(progress);

    const card = document.createElement("article");

    card.className = unlocked
      ? "achievement-card"
      : "achievement-card locked";

    card.innerHTML = `
      <div class="achievement-icon">
        ${unlocked ? achievement.icon : "—"}
      </div>

      <div>
        <h3>${achievement.title}</h3>
        <p>${achievement.description}</p>

        <span class="achievement-state">
          ${unlocked ? "Unlocked" : "Locked"}
        </span>
      </div>
    `;

    achievementGrid.appendChild(card);
  });
}

function showToast(title, message) {
  const toast = document.getElementById("completionToast");

  document.getElementById("toastTitle").textContent = title;
  document.getElementById("toastMessage").textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

function renderEverything() {
  renderMissions();
  renderDashboardProgress();
  renderXpAndLevel();
  renderStreak();
  renderWeeklyPlan();
  renderAchievements();
}

function updateTimerDisplay() {
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;

  document.getElementById("timerDisplay").textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const totalSeconds = 20 * 60;
  const elapsedSeconds = totalSeconds - timerSeconds;
  const timerPercentage =
    (elapsedSeconds / totalSeconds) * 100;

  document.getElementById("timerProgressFill").style.width =
    `${timerPercentage}%`;
}

function startTimer() {
  if (timerInterval) {
    return;
  }

  document.getElementById("timerStatus").textContent = "Focused";

  timerInterval = setInterval(() => {
    if (timerSeconds > 0) {
      timerSeconds -= 1;
      updateTimerDisplay();
      return;
    }

    clearInterval(timerInterval);
    timerInterval = null;

    document.getElementById("timerStatus").textContent = "Complete";

    showToast(
      "Focus block complete",
      "Twenty focused minutes finished."
    );
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;

  document.getElementById("timerStatus").textContent = "Paused";
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerSeconds = 20 * 60;

  document.getElementById("timerStatus").textContent = "Ready";

  updateTimerDisplay();
}

function setupTimer() {
  document
    .getElementById("startTimer")
    .addEventListener("click", startTimer);

  document
    .getElementById("pauseTimer")
    .addEventListener("click", pauseTimer);

  document
    .getElementById("resetTimer")
    .addEventListener("click", resetTimer);

  updateTimerDisplay();
}

function setupContinueButton() {
  document
    .getElementById("continueButton")
    .addEventListener("click", () => {
      document
        .querySelector(".missions-panel")
        .scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
    });
}

function setupResetModal() {
  const modal = document.getElementById("resetModal");

  document
    .getElementById("resetProgressButton")
    .addEventListener("click", () => {
      modal.classList.add("show");
    });

  document
    .getElementById("cancelReset")
    .addEventListener("click", () => {
      modal.classList.remove("show");
    });

  document
    .getElementById("confirmReset")
    .addEventListener("click", () => {
      progress = createDefaultProgress();

      saveProgress();
      renderEverything();

      modal.classList.remove("show");

      showToast(
        "Progress reset",
        "Mission GCSE is ready for a fresh start."
      );
    });

  modal.addEventListener("click", event => {
    if (event.target === modal) {
      modal.classList.remove("show");
    }
  });
}

function initialiseApp() {
  renderDate();
  renderReminder();
  renderNavigation();
  renderSubjects();
  renderEverything();
  setupTimer();
  setupContinueButton();
  setupResetModal();
}

initialiseApp();