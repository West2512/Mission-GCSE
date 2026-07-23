/* =========================================================
   MISSION GCSE
   Complete application logic
   ========================================================= */

"use strict";

/* =========================================================
   APP DATA
   ========================================================= */

const STORAGE_KEY = "missionGCSEV2Progress";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const LEVELS = [
  {
    name: "Rookie",
    minXp: 0,
    nextXp: 50
  },
  {
    name: "Rising",
    minXp: 50,
    nextXp: 150
  },
  {
    name: "Focused",
    minXp: 150,
    nextXp: 300
  },
  {
    name: "Determined",
    minXp: 300,
    nextXp: 500
  },
  {
    name: "Unstoppable",
    minXp: 500,
    nextXp: 800
  },
  {
    name: "GCSE Legend",
    minXp: 800,
    nextXp: null
  }
];

const REMINDERS = [
  "Starting creates momentum.",
  "Twenty focused minutes can change a whole topic.",
  "Retrieval practice beats rereading.",
  "Progress counts, even when it feels small.",
  "Do the next useful thing.",
  "Confidence is built through repetition.",
  "A difficult question is a chance to learn.",
  "You do not need to feel ready to begin."
];

const WEEKLY_PLAN = {
  Monday: [
    {
      id: "mon-english",
      subject: "English",
      topic: "Quotation retrieval",
      duration: 20,
      xp: 15
    },
    {
      id: "mon-biology",
      subject: "Biology",
      topic: "Cell biology",
      duration: 20,
      xp: 15
    },
    {
      id: "mon-maths",
      subject: "Maths",
      topic: "Algebra fluency",
      duration: 20,
      xp: 15
    }
  ],

  Tuesday: [
    {
      id: "tue-chemistry",
      subject: "Chemistry",
      topic: "Atomic structure",
      duration: 20,
      xp: 15
    },
    {
      id: "tue-english",
      subject: "English",
      topic: "Language analysis",
      duration: 20,
      xp: 15
    },
    {
      id: "tue-computing",
      subject: "Computer Science",
      topic: "Algorithms",
      duration: 20,
      xp: 15
    }
  ],

  Wednesday: [
    {
      id: "wed-physics",
      subject: "Physics",
      topic: "Forces and motion",
      duration: 20,
      xp: 15
    },
    {
      id: "wed-maths",
      subject: "Maths",
      topic: "Geometry",
      duration: 20,
      xp: 15
    },
    {
      id: "wed-english",
      subject: "English",
      topic: "Macbeth retrieval",
      duration: 20,
      xp: 15
    }
  ],

  Thursday: [
    {
      id: "thu-biology",
      subject: "Biology",
      topic: "Organisation",
      duration: 20,
      xp: 15
    },
    {
      id: "thu-electronics",
      subject: "Electronics",
      topic: "Circuit components",
      duration: 20,
      xp: 15
    },
    {
      id: "thu-english",
      subject: "English",
      topic: "Poetry comparison",
      duration: 20,
      xp: 15
    }
  ],

  Friday: [
    {
      id: "fri-maths",
      subject: "Maths",
      topic: "Mixed problem solving",
      duration: 20,
      xp: 15
    },
    {
      id: "fri-chemistry",
      subject: "Chemistry",
      topic: "Bonding",
      duration: 20,
      xp: 15
    },
    {
      id: "fri-english",
      subject: "English",
      topic: "Exam paragraph",
      duration: 20,
      xp: 15
    }
  ],

  Saturday: [],

  Sunday: [
    {
      id: "sun-review-1",
      subject: "Weekly Review",
      topic: "Review weakest topic",
      duration: 20,
      xp: 20
    },
    {
      id: "sun-review-2",
      subject: "Weekly Review",
      topic: "Mixed retrieval quiz",
      duration: 20,
      xp: 20
    },
    {
      id: "sun-review-3",
      subject: "Weekly Review",
      topic: "Plan the week ahead",
      duration: 20,
      xp: 20
    }
  ]
};

const SUBJECTS = [
  {
    id: "english",
    name: "English",
    code: "ENG",
    description:
      "Language, literature, quotations, analysis and exam writing.",
    colour: "#78a9ff",
    available: true
  },
  {
    id: "maths",
    name: "Maths",
    code: "MAT",
    description:
      "Number, algebra, geometry, statistics and problem solving.",
    colour: "#6ee7b7",
    available: false
  },
  {
    id: "biology",
    name: "Biology",
    code: "BIO",
    description:
      "Cells, organisation, infection, ecology and inheritance.",
    colour: "#74d68c",
    available: false
  },
  {
    id: "chemistry",
    name: "Chemistry",
    code: "CHE",
    description:
      "Atoms, bonding, reactions, energy and chemical analysis.",
    colour: "#c4a7ff",
    available: false
  },
  {
    id: "physics",
    name: "Physics",
    code: "PHY",
    description:
      "Energy, forces, electricity, waves and atomic physics.",
    colour: "#f6b86b",
    available: false
  },
  {
    id: "computer-science",
    name: "Computer Science",
    code: "CS",
    description:
      "Algorithms, programming, networks and computer systems.",
    colour: "#ff9090",
    available: false
  },
  {
    id: "electronics",
    name: "Electronics",
    code: "ELE",
    description:
      "Components, circuits, logic systems and programmable control.",
    colour: "#ffd166",
    available: false
  }
];

const QUICK_CHALLENGES = [
  {
    pathwayId: "macbeth",
    activityId: "macbeth-quotes",
    code: "QTE",
    title: "Quote Sprint",
    description:
      "Complete essential Macbeth quotations."
  },
  {
    pathwayId: "language-paper-1",
    activityId: "lp1-language-techniques",
    code: "AO2",
    title: "Technique Check",
    description:
      "Identify language methods and their effects."
  },
  {
    pathwayId: "poetry",
    activityId: "poetry-poems",
    code: "POE",
    title: "Poem Finder",
    description:
      "Match ideas and quotations to anthology poems."
  }
];

const ACHIEVEMENTS = [
  {
    id: "first-mission",
    title: "First Mission",
    description:
      "Complete your first revision mission.",
    condition:
      state => state.completedMissions.length >= 1
  },
  {
    id: "xp-100",
    title: "100 XP Club",
    description:
      "Earn 100 total XP.",
    condition:
      state => state.totalXp >= 100
  },
  {
    id: "english-starter",
    title: "English Starter",
    description:
      "Complete your first English activity.",
    condition:
      state => state.completedActivities.length >= 1
  },
  {
    id: "english-five",
    title: "English Explorer",
    description:
      "Complete five English activities.",
    condition:
      state => state.completedActivities.length >= 5
  },
  {
    id: "macbeth-master",
    title: "Macbeth Master",
    description:
      "Complete every Macbeth activity.",
    condition:
      state => {
        const pathway = findPathway("macbeth");

        return pathway.activities.every(activity =>
          state.completedActivities.includes(activity.id)
        );
      }
  },
  {
    id: "streak-three",
    title: "Three Day Streak",
    description:
      "Revise on three consecutive days.",
    condition:
      state => calculateStreak(state.activeDates) >= 3
  }
];

/* =========================================================
   DEFAULT STATE
   ========================================================= */

function createDefaultState() {
  return {
    completedMissions: [],
    completedActivities: [],
    activityScores: {},
    totalXp: 0,
    englishXp: 0,
    activeDates: [],
    unlockedAchievements: []
  };
}

let appState = loadState();

let currentView = "dashboard";
let currentPathwayId = null;
let currentActivityId = null;

let activityQuestionIndex = 0;
let activityScore = 0;
let activityAnswered = false;
let activityAwarded = false;
let activityStudyMode = false;
let activeActivityQuestions = [];

/* =========================================================
   DOM REFERENCES
   ========================================================= */

const elements = {
  currentDate: document.getElementById("currentDate"),
  topbarGreeting: document.getElementById("topbarGreeting"),
  topbarXp: document.getElementById("topbarXp"),

  sidebarStreak: document.getElementById("sidebarStreak"),
  sidebarLevel: document.getElementById("sidebarLevel"),

  totalXp: document.getElementById("totalXp"),
  currentStreak: document.getElementById("currentStreak"),
  currentLevel: document.getElementById("currentLevel"),
  weeklyProgress: document.getElementById("weeklyProgress"),
  weeklyBlocksText: document.getElementById("weeklyBlocksText"),

  dailyProgressRing: document.getElementById("dailyProgressRing"),
  dailyProgressNumber: document.getElementById("dailyProgressNumber"),
  dailyProgressMessage: document.getElementById("dailyProgressMessage"),

  todayName: document.getElementById("todayName"),
  missionCount: document.getElementById("missionCount"),
  missionList: document.getElementById("missionList"),

  weeklyGrid: document.getElementById("weeklyGrid"),
  subjectGrid: document.getElementById("subjectGrid"),
  achievementGrid: document.getElementById("achievementGrid"),

  levelName: document.getElementById("levelName"),
  levelProgressText: document.getElementById("levelProgressText"),
  levelFill: document.getElementById("levelFill"),
  levelXpLabel: document.getElementById("levelXpLabel"),
  nextLevelMessage: document.getElementById("nextLevelMessage"),

  dailyReminder: document.getElementById("dailyReminder"),

  timerDisplay: document.getElementById("timerDisplay"),
  timerStatus: document.getElementById("timerStatus"),
  timerProgressFill: document.getElementById("timerProgressFill"),

  englishPathwayGrid:
    document.getElementById("englishPathwayGrid"),

  quickChallengeGrid:
    document.getElementById("quickChallengeGrid"),

  englishXp:
    document.getElementById("englishXp"),

  englishCompletedCount:
    document.getElementById("englishCompletedCount"),

  englishMastery:
    document.getElementById("englishMastery"),

  englishProgressPercent:
    document.getElementById("englishProgressPercent"),

  englishHeroProgress:
    document.getElementById("englishHeroProgress"),

  pathwayEyebrow:
    document.getElementById("pathwayEyebrow"),

  pathwayTitle:
    document.getElementById("pathwayTitle"),

  pathwayDescription:
    document.getElementById("pathwayDescription"),

  pathwayActivityCount:
    document.getElementById("pathwayActivityCount"),

  pathwayXpReward:
    document.getElementById("pathwayXpReward"),

  pathwayProgressPercent:
    document.getElementById("pathwayProgressPercent"),

  pathwayProgressFill:
    document.getElementById("pathwayProgressFill"),

  pathwayProgressText:
    document.getElementById("pathwayProgressText"),

  pathwayActivityGrid:
    document.getElementById("pathwayActivityGrid"),

  activitySubjectLabel:
    document.getElementById("activitySubjectLabel"),

  activityTitle:
    document.getElementById("activityTitle"),

  activityQuestionNumber:
    document.getElementById("activityQuestionNumber"),

  activityScore:
    document.getElementById("activityScore"),

  activityReward:
    document.getElementById("activityReward"),

  activityProgressFill:
    document.getElementById("activityProgressFill"),

  activityQuestionArea:
    document.getElementById("activityQuestionArea"),

  activityFeedback:
    document.getElementById("activityFeedback"),

  activityHintButton:
    document.getElementById("activityHintButton"),

  activityNextButton:
    document.getElementById("activityNextButton"),

  completionToast:
    document.getElementById("completionToast"),

  toastTitle:
    document.getElementById("toastTitle"),

  toastMessage:
    document.getElementById("toastMessage"),

  resetModal:
    document.getElementById("resetModal")
};

/* =========================================================
   GENERAL HELPERS
   ========================================================= */

function getTodayName() {
  return DAYS[new Date().getDay()];
}

function getDateKey(date = new Date()) {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function recordActiveDate() {
  const todayKey = getDateKey();

  if (!appState.activeDates.includes(todayKey)) {
    appState.activeDates.push(todayKey);
  }
}

function calculateStreak(activeDates) {
  if (!activeDates.length) {
    return 0;
  }

  const uniqueDates = [...new Set(activeDates)].sort();

  let streak = 0;

  const cursor = new Date();

  const todayKey = getDateKey(cursor);

  const yesterday = new Date(cursor);

  yesterday.setDate(yesterday.getDate() - 1);

  const yesterdayKey = getDateKey(yesterday);

  if (
    !uniqueDates.includes(todayKey) &&
    !uniqueDates.includes(yesterdayKey)
  ) {
    return 0;
  }

  if (!uniqueDates.includes(todayKey)) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (uniqueDates.includes(getDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function getCurrentLevel() {
  let currentLevel = LEVELS[0];

  LEVELS.forEach(level => {
    if (appState.totalXp >= level.minXp) {
      currentLevel = level;
    }
  });

  return currentLevel;
}

function getNextLevel() {
  const currentLevel = getCurrentLevel();

  if (currentLevel.nextXp === null) {
    return null;
  }

  return LEVELS.find(
    level => level.minXp === currentLevel.nextXp
  );
}

function addXp(amount, category = "general") {
  appState.totalXp += amount;

  if (category === "english") {
    appState.englishXp += amount;
  }

  recordActiveDate();
  checkAchievements();
  saveState();
}

function findPathway(pathwayId) {
  return ENGLISH_PATHWAYS.find(
    pathway => pathway.id === pathwayId
  );
}

function findActivity(pathwayId, activityId) {
  const pathway = findPathway(pathwayId);

  if (!pathway) {
    return null;
  }

  return pathway.activities.find(
    activity => activity.id === activityId
  );
}

function getAllEnglishActivities() {
  return ENGLISH_PATHWAYS.flatMap(
    pathway => pathway.activities
  );
}

function getPathwayCompletion(pathway) {
  const total = pathway.activities.length;

  const completed = pathway.activities.filter(
    activity =>
      appState.completedActivities.includes(activity.id)
  ).length;

  const percent =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  return {
    total,
    completed,
    percent
  };
}

function getEnglishCompletion() {
  const activities = getAllEnglishActivities();

  const completed = activities.filter(
    activity =>
      appState.completedActivities.includes(activity.id)
  ).length;

  const percent =
    activities.length === 0
      ? 0
      : Math.round(
          (completed / activities.length) * 100
        );

  return {
    total: activities.length,
    completed,
    percent
  };
}

/* =========================================================
   NAVIGATION
   ========================================================= */

function showView(viewName) {
  currentView = viewName;

  document.querySelectorAll(".app-view").forEach(view => {
    view.classList.remove("active-view");
  });

  const targetView =
    document.getElementById(`${viewName}View`);

  if (targetView) {
    targetView.classList.add("active-view");
  }

  document.querySelectorAll(".nav-item").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.view === viewName
    );
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* =========================================================
   DATE AND GREETING
   ========================================================= */

function renderDateAndGreeting() {
  const now = new Date();

  const formattedDate =
    `${DAYS[now.getDay()]}, ` +
    `${now.getDate()} ${MONTHS[now.getMonth()]} ` +
    `${now.getFullYear()}`;

  elements.currentDate.textContent = formattedDate;

  const hour = now.getHours();

  let greeting = "Good evening";

  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  }

  elements.topbarGreeting.textContent =
    `${greeting}, Alfie`;
}

/* =========================================================
   DASHBOARD
   ========================================================= */

function renderDashboard() {
  renderStats();
  renderTodayMissions();
  renderLevelPanel();
  renderReminder();
}

function renderStats() {
  const today = getTodayName();

  const todayMissions = WEEKLY_PLAN[today] || [];

  const completedToday =
    todayMissions.filter(
      mission =>
        appState.completedMissions.includes(mission.id)
    ).length;

  const dailyPercent =
    todayMissions.length === 0
      ? 0
      : Math.round(
          (completedToday / todayMissions.length) * 100
        );

  const weeklyMissions =
    Object.values(WEEKLY_PLAN).flat();

  const completedWeekly =
    weeklyMissions.filter(
      mission =>
        appState.completedMissions.includes(mission.id)
    ).length;

  const weeklyPercent =
    weeklyMissions.length === 0
      ? 0
      : Math.round(
          (completedWeekly / weeklyMissions.length) * 100
        );

  const streak = calculateStreak(appState.activeDates);

  const level = getCurrentLevel();

  elements.totalXp.textContent = appState.totalXp;
  elements.topbarXp.textContent = appState.totalXp;

  elements.currentStreak.textContent = streak;
  elements.sidebarStreak.textContent = streak;

  elements.currentLevel.textContent = level.name;

  elements.sidebarLevel.textContent =
    `Level ${LEVELS.indexOf(level) + 1} · ${level.name}`;

  elements.weeklyProgress.textContent =
    `${weeklyPercent}%`;

  elements.weeklyBlocksText.textContent =
    `${completedWeekly} of ${weeklyMissions.length} weekly blocks complete`;

  elements.dailyProgressNumber.textContent =
    `${dailyPercent}%`;

  elements.dailyProgressRing.style.setProperty(
    "--progress",
    `${dailyPercent * 3.6}deg`
  );

  if (todayMissions.length === 0) {
    elements.dailyProgressMessage.textContent =
      "Today is a rest day. Recharge without losing momentum.";
  } else if (dailyPercent === 100) {
    elements.dailyProgressMessage.textContent =
      "Today’s mission is complete. Nicely done.";
  } else if (completedToday === 0) {
    elements.dailyProgressMessage.textContent =
      "Complete your first mission to begin.";
  } else {
    elements.dailyProgressMessage.textContent =
      `${todayMissions.length - completedToday} mission blocks remaining today.`;
  }
}

function renderTodayMissions() {
  const today = getTodayName();

  const missions = WEEKLY_PLAN[today] || [];

  elements.todayName.textContent = today;

  const completedCount =
    missions.filter(
      mission =>
        appState.completedMissions.includes(mission.id)
    ).length;

  elements.missionCount.textContent =
    `${completedCount} of ${missions.length} complete`;

  if (!missions.length) {
    elements.missionList.innerHTML = `
      <article class="mission-item">
        <div class="mission-number">REST</div>

        <div class="mission-copy">
          <strong>Recovery day</strong>
          <span>
            No planned blocks today. Rest, reset and get ready
            for the next mission.
          </span>
        </div>
      </article>
    `;

    return;
  }

  elements.missionList.innerHTML =
    missions.map((mission, index) => {
      const complete =
        appState.completedMissions.includes(mission.id);

      return `
        <article
          class="mission-item ${complete ? "completed" : ""}"
        >
          <div class="mission-number">
            ${String(index + 1).padStart(2, "0")}
          </div>

          <div class="mission-copy">
            <strong>${mission.subject}</strong>

            <span>
              ${mission.topic} · ${mission.duration} minutes
            </span>
          </div>

          <div class="mission-reward">
            +${mission.xp} XP
          </div>

          <button
            class="mission-complete-button"
            type="button"
            data-mission-id="${mission.id}"
            ${complete ? "disabled" : ""}
          >
            ${complete ? "Complete" : "Mark complete"}
          </button>
        </article>
      `;
    }).join("");

  document
    .querySelectorAll(".mission-complete-button")
    .forEach(button => {
      button.addEventListener("click", () => {
        completeMission(button.dataset.missionId);
      });
    });
}

function completeMission(missionId) {
  if (appState.completedMissions.includes(missionId)) {
    return;
  }

  const mission =
    Object.values(WEEKLY_PLAN)
      .flat()
      .find(item => item.id === missionId);

  if (!mission) {
    return;
  }

  appState.completedMissions.push(missionId);

  addXp(mission.xp);

  saveState();

  renderAll();

  showToast(
    "Mission complete",
    `You earned ${mission.xp} XP.`
  );
}

function renderLevelPanel() {
  const currentLevel = getCurrentLevel();

  const nextLevel = getNextLevel();

  elements.levelName.textContent = currentLevel.name;

  if (!nextLevel) {
    elements.levelProgressText.textContent =
      "Highest rank achieved";

    elements.levelFill.style.width = "100%";

    elements.levelXpLabel.textContent =
      `${appState.totalXp} XP`;

    elements.nextLevelMessage.textContent =
      "You have reached GCSE Legend status.";

    return;
  }

  const levelRange =
    nextLevel.minXp - currentLevel.minXp;

  const progressInLevel =
    appState.totalXp - currentLevel.minXp;

  const levelPercent =
    Math.max(
      0,
      Math.min(
        100,
        Math.round(
          (progressInLevel / levelRange) * 100
        )
      )
    );

  const remaining =
    nextLevel.minXp - appState.totalXp;

  elements.levelProgressText.textContent =
    `${remaining} XP until ${nextLevel.name}`;

  elements.levelFill.style.width =
    `${levelPercent}%`;

  elements.levelXpLabel.textContent =
    `${progressInLevel} / ${levelRange} XP`;

  elements.nextLevelMessage.textContent =
    `Complete focused blocks to reach ${nextLevel.name}.`;
}

function renderReminder() {
  const todayIndex = new Date().getDate();

  const reminder =
    REMINDERS[todayIndex % REMINDERS.length];

  elements.dailyReminder.textContent = reminder;
}

/* =========================================================
   WEEKLY PLAN
   ========================================================= */

function renderWeeklyPlan() {
  const dayOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  const today = getTodayName();

  elements.weeklyGrid.innerHTML =
    dayOrder.map(day => {
      const missions = WEEKLY_PLAN[day];

      const completed =
        missions.filter(
          mission =>
            appState.completedMissions.includes(mission.id)
        ).length;

      return `
        <article
          class="week-day-card ${day === today ? "current-day" : ""}"
        >
          <div class="week-day-heading">
            <div>
              <span>${day === today ? "Today" : "Mission day"}</span>
              <h3>${day}</h3>
            </div>

            <strong>
              ${completed}/${missions.length}
            </strong>
          </div>

          <div class="week-day-missions">
            ${
              missions.length
                ? missions.map(mission => {
                    const complete =
                      appState.completedMissions.includes(
                        mission.id
                      );

                    return `
                      <div class="week-mini-mission ${complete ? "complete" : ""}">
                        <span>${mission.subject}</span>
                        <small>${mission.topic}</small>
                      </div>
                    `;
                  }).join("")
                : `
                  <div class="week-mini-mission rest">
                    <span>Rest day</span>
                    <small>Recover and reset.</small>
                  </div>
                `
            }
          </div>
        </article>
      `;
    }).join("");
}

/* =========================================================
   SUBJECTS
   ========================================================= */

function renderSubjects() {
  elements.subjectGrid.innerHTML =
    SUBJECTS.map(subject => {
      return `
        <article
          class="subject-card ${subject.available ? "" : "coming-soon"}"
          style="--subject-colour: ${subject.colour};"
          data-subject-id="${subject.id}"
        >
          <div class="subject-card-top">
            <span class="subject-code">${subject.code}</span>

            <span class="subject-status">
              ${subject.available ? "Open" : "Coming soon"}
            </span>
          </div>

          <h3>${subject.name}</h3>

          <p>${subject.description}</p>

          <div class="subject-card-footer">
            <span>
              ${subject.available ? "Begin subject" : "In development"}
            </span>

            <strong>
              ${subject.available ? "→" : "LOCKED"}
            </strong>
          </div>
        </article>
      `;
    }).join("");

  document
    .querySelectorAll(".subject-card")
    .forEach(card => {
      card.addEventListener("click", () => {
        const subject =
          SUBJECTS.find(
            item => item.id === card.dataset.subjectId
          );

        if (!subject) {
          return;
        }

        if (!subject.available) {
          showToast(
            `${subject.name} is coming soon`,
            "English is the first complete subject pathway."
          );

          return;
        }

        if (subject.id === "english") {
          renderEnglishHub();
          showView("english");
        }
      });
    });
}

/* =========================================================
   ENGLISH HUB
   ========================================================= */

function renderEnglishHub() {
  const completion = getEnglishCompletion();

  elements.englishXp.textContent = appState.englishXp;

  elements.englishCompletedCount.textContent =
    completion.completed;

  elements.englishProgressPercent.textContent =
    `${completion.percent}%`;

  elements.englishHeroProgress.textContent =
    `${completion.completed} of ${completion.total} activities complete`;

  let mastery = "Starting";

  if (completion.percent >= 75) {
    mastery = "Mastering";
  } else if (completion.percent >= 40) {
    mastery = "Developing";
  } else if (completion.percent >= 10) {
    mastery = "Building";
  }

  elements.englishMastery.textContent = mastery;

  elements.englishPathwayGrid.innerHTML =
    ENGLISH_PATHWAYS.map(pathway => {
      const progress = getPathwayCompletion(pathway);

      const totalXp =
        pathway.activities.reduce(
          (sum, activity) => sum + activity.xp,
          0
        );

      return `
        <article
          class="english-pathway-card"
          data-pathway-id="${pathway.id}"
          style="--pathway-colour: ${pathway.colour};"
        >
          <div class="pathway-card-top">
            <span class="pathway-card-code">
              ${pathway.code}
            </span>

            <span class="pathway-card-progress">
              ${progress.percent}%
            </span>
          </div>

          <h3>${pathway.title}</h3>

          <p>${pathway.description}</p>

          <div class="pathway-mini-track">
            <div
              class="pathway-mini-fill"
              style="width: ${progress.percent}%;"
            ></div>
          </div>

          <div class="pathway-card-footer">
            <span>
              ${progress.completed}/${progress.total} activities
            </span>

            <strong>${totalXp} XP</strong>
          </div>
        </article>
      `;
    }).join("");

  document
    .querySelectorAll(".english-pathway-card")
    .forEach(card => {
      card.addEventListener("click", () => {
        openPathway(card.dataset.pathwayId);
      });
    });

  elements.quickChallengeGrid.innerHTML =
    QUICK_CHALLENGES.map(challenge => {
      const complete =
        appState.completedActivities.includes(
          challenge.activityId
        );

      return `
        <article
          class="quick-challenge-card"
          data-pathway-id="${challenge.pathwayId}"
          data-activity-id="${challenge.activityId}"
        >
          <span class="quick-challenge-icon">
            ${challenge.code}
          </span>

          <div>
            <h3>${challenge.title}</h3>

            <p>
              ${
                complete
                  ? "Completed — replay whenever you like."
                  : challenge.description
              }
            </p>
          </div>

          <span class="quick-challenge-arrow">
            →
          </span>
        </article>
      `;
    }).join("");

  document
    .querySelectorAll(".quick-challenge-card")
    .forEach(card => {
      card.addEventListener("click", () => {
        openActivity(
          card.dataset.pathwayId,
          card.dataset.activityId
        );
      });
    });
}

/* =========================================================
   ENGLISH ACTIVITY
   ========================================================= */

function openActivity(pathwayId, activityId) {
  const pathway = findPathway(pathwayId);

  const activity =
    findActivity(pathwayId, activityId);

  if (!pathway || !activity) {
    return;
  }

  currentPathwayId = pathwayId;
  currentActivityId = activityId;

  activityQuestionIndex = 0;
  activityScore = 0;
  activityAnswered = false;
  activityAwarded = false;
  activityStudyMode = Array.isArray(activity.learningCards) &&
    activity.learningCards.length > 0;

    activeActivityQuestions = [...activity.questions];

  elements.activityHintButton.style.display = "";
  elements.activityNextButton.style.display = "";

  elements.activitySubjectLabel.textContent =
    pathway.title;

  elements.activityTitle.textContent =
    activity.title;

  elements.activityReward.textContent =
    `+${activity.xp} XP`;

  renderActivityQuestion();

  showView("activity");
}

function renderActivityQuestion() {
  const activity =
    findActivity(
      currentPathwayId,
      currentActivityId
    );

  if (!activity) {
    return;
  }

  if (activityStudyMode) {
    renderLearningCards(activity);
    return;
  }

  if (
    activityQuestionIndex >= activeActivityQuestions.length
  ) {
    completeActivityScreen(activity);
    return;
  }

  const question =
    activeActivityQuestions[activityQuestionIndex];

  activityAnswered = false;

  elements.activityQuestionNumber.textContent =
    `${activityQuestionIndex + 1} / ${activeActivityQuestions.length}`;

  elements.activityScore.textContent =
    activityScore;

  const progress =
    Math.round(
      (activityQuestionIndex /
        activeActivityQuestions.length) *
        100
    );

  elements.activityProgressFill.style.width =
    `${progress}%`;

  elements.activityFeedback.innerHTML = "";

  elements.activityNextButton.disabled = true;

  elements.activityNextButton.textContent =
    activityQuestionIndex ===
    activeActivityQuestions.length - 1
      ? "Finish activity"
      : "Next question";

  elements.activityHintButton.disabled = false;

  if (question.type === "multipleChoice") {
    renderMultipleChoiceQuestion(question);
  } else if (question.type === "quoteInput") {
    renderQuoteInputQuestion(question);
  }
}

function renderLearningCards(activity) {
  elements.activityQuestionNumber.textContent =
    "Learn";

  elements.activityScore.textContent =
    activityScore;

  elements.activityProgressFill.style.width =
    "8%";

  elements.activityFeedback.innerHTML = "";

  elements.activityHintButton.style.display =
    "none";

  elements.activityNextButton.style.display =
    "";

  elements.activityNextButton.disabled = false;
  elements.activityNextButton.textContent =
    "Start the questions";

  elements.activityQuestionArea.innerHTML = `
    <span class="question-type-label">
      Mission briefing
    </span>

    <h2>Learn the essentials first</h2>

    <p class="question-support">
      Read the six cards, then test what you can remember.
    </p>

    <div class="learning-card-grid">
      ${activity.learningCards.map((card, index) => {
        return `
          <article class="learning-card">
            <div class="learning-card-topline">
              <span>${card.eyebrow}</span>
              <strong>${String(index + 1).padStart(2, "0")}</strong>
            </div>

            <h3>${card.title}</h3>
            <p>${card.body}</p>
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function renderMultipleChoiceQuestion(question) {
  elements.activityQuestionArea.innerHTML = `
    <span class="question-type-label">
      Choose one answer
    </span>

    <h2>${question.prompt}</h2>

    <p class="question-support">
      ${question.support}
    </p>

    <div class="answer-options">
      ${question.options.map((option, index) => {
        return `
          <button
            class="answer-option"
            type="button"
            data-answer-index="${index}"
          >
            <span class="option-letter">
              ${String.fromCharCode(65 + index)}
            </span>

            <span>${option}</span>
          </button>
        `;
      }).join("")}
    </div>
  `;

  document
    .querySelectorAll(".answer-option")
    .forEach(button => {
      button.addEventListener("click", () => {
        answerMultipleChoice(
          Number(button.dataset.answerIndex),
          question
        );
      });
    });
}

function renderQuoteInputQuestion(question) {
  elements.activityQuestionArea.innerHTML = `
    <span class="question-type-label quote-label">
      Quote challenge
    </span>

    <h2 class="quote-prompt">${question.prompt}</h2>

    <p class="question-support">
      ${question.support}
    </p>

    <form class="quote-answer-form" id="quote-answer-form">
      <label for="quote-answer-input">Type the missing word or words</label>
      <div class="quote-input-row">
        <input
          id="quote-answer-input"
          class="quote-answer-input"
          type="text"
          autocomplete="off"
          spellcheck="false"
          placeholder="Your answer..."
          aria-label="Missing words"
        >
        <button class="quote-submit-button" type="submit">Check answer</button>
      </div>
    </form>
  `;

  const form = document.getElementById("quote-answer-form");
  const input = document.getElementById("quote-answer-input");

  form.addEventListener("submit", event => {
    event.preventDefault();
    answerQuoteInput(input.value, question);
  });

  input.focus();
}

function normaliseQuoteAnswer(value) {
  return value
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function quoteAnswerDistance(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const matrix = Array.from(
    { length: b.length + 1 },
    (_, row) => [row]
  );

  for (let column = 0; column <= a.length; column += 1) {
    matrix[0][column] = column;
  }

  for (let row = 1; row <= b.length; row += 1) {
    for (let column = 1; column <= a.length; column += 1) {
      const cost = b[row - 1] === a[column - 1] ? 0 : 1;
      matrix[row][column] = Math.min(
        matrix[row - 1][column] + 1,
        matrix[row][column - 1] + 1,
        matrix[row - 1][column - 1] + cost
      );
    }
  }

  return matrix[b.length][a.length];
}

function answerQuoteInput(value, question) {
  if (activityAnswered) return;

  const submitted = normaliseQuoteAnswer(value);
  const accepted = question.acceptedAnswers.map(normaliseQuoteAnswer);
  const correct = accepted.includes(submitted);
  const closestDistance = submitted
    ? Math.min(...accepted.map(answer => quoteAnswerDistance(submitted, answer)))
    : 99;
  const almost = !correct && closestDistance <= 1;

  if (!submitted) {
    elements.activityFeedback.innerHTML = `
      <div class="feedback-box hint">
        <strong>Have a go first.</strong>
        Type the missing word, then check your answer.
      </div>
    `;
    return;
  }

  activityAnswered = true;

  const input = document.getElementById("quote-answer-input");
  const submitButton = document.querySelector(".quote-submit-button");
  input.disabled = true;
  submitButton.disabled = true;

  if (correct) {
    activityScore += 1;
    input.classList.add("correct");
    elements.activityFeedback.innerHTML = `
      <div class="feedback-box correct quote-feedback">
        <strong>Quote secured.</strong>
        <span class="full-quote">“${question.fullQuote}”</span>
        ${question.explanation}
      </div>
    `;
  } else {
    input.classList.add(almost ? "almost" : "incorrect");
    elements.activityFeedback.innerHTML = `
      <div class="feedback-box ${almost ? "hint" : "incorrect"} quote-feedback">
        <strong>${almost ? "Almost — tiny spelling slip." : "Not quite."}</strong>
        <span class="full-quote">“${question.fullQuote}”</span>
        ${question.explanation}
      </div>
    `;
  }

  elements.activityScore.textContent = activityScore;
  elements.activityNextButton.disabled = false;
  elements.activityHintButton.disabled = true;
}

function answerMultipleChoice(selectedIndex, question) {
  if (activityAnswered) {
    return;
  }

  activityAnswered = true;

  const correct =
    selectedIndex === question.answer;

  const answerButtons =
    document.querySelectorAll(".answer-option");

  answerButtons.forEach((button, index) => {
    button.disabled = true;

    if (index === question.answer) {
      button.classList.add("correct");
    }

    if (
      index === selectedIndex &&
      selectedIndex !== question.answer
    ) {
      button.classList.add("incorrect");
    }
  });

  if (correct) {
    activityScore += 1;

    elements.activityFeedback.innerHTML = `
      <div class="feedback-box correct">
        <strong>Correct.</strong>
        ${question.explanation}
      </div>
    `;
  } else {
    elements.activityFeedback.innerHTML = `
      <div class="feedback-box incorrect">
        <strong>Not quite.</strong>
        ${question.explanation}
      </div>
    `;
  }

  elements.activityScore.textContent =
    activityScore;

  elements.activityNextButton.disabled = false;

  elements.activityHintButton.disabled = true;
}

function showActivityHint() {
  const activity =
    findActivity(
      currentPathwayId,
      currentActivityId
    );

  if (!activity) {
    return;
  }

  const question =
    activity.questions[activityQuestionIndex];

  if (!question || activityAnswered) {
    return;
  }

  elements.activityFeedback.innerHTML = `
    <div class="feedback-box hint">
      <strong>Hint:</strong>
      ${question.hint}
    </div>
  `;
}

function moveToNextQuestion() {
  if (activityStudyMode) {
    activityStudyMode = false;
    elements.activityHintButton.style.display = "";
    renderActivityQuestion();
    return;
  }

  if (!activityAnswered) {
    return;
  }

  activityQuestionIndex += 1;

  renderActivityQuestion();
}

function completeActivityScreen(activity) {
  const pathway =
    findPathway(currentPathwayId);

  const totalQuestions =
    activity.questions.length;

  const scorePercent =
    Math.round(
      (activityScore / totalQuestions) * 100
    );

  elements.activityProgressFill.style.width = "100%";

  elements.activityQuestionNumber.textContent =
    `${totalQuestions} / ${totalQuestions}`;

  elements.activityScore.textContent =
    activityScore;

  elements.activityHintButton.style.display = "none";

  elements.activityNextButton.style.display = "none";

  const alreadyCompleted =
    appState.completedActivities.includes(activity.id);

  if (!alreadyCompleted && !activityAwarded) {
    appState.completedActivities.push(activity.id);

    appState.activityScores[activity.id] =
      activityScore;

    addXp(activity.xp, "english");

    activityAwarded = true;

    showToast(
      "English activity complete",
      `You earned ${activity.xp} XP.`
    );
  } else {
    const previousBest =
      appState.activityScores[activity.id] || 0;

    if (activityScore > previousBest) {
      appState.activityScores[activity.id] =
        activityScore;

      saveState();
    }
  }

  let resultMessage =
    "Good work. Every completed retrieval cycle strengthens recall.";

  if (scorePercent === 100) {
    resultMessage =
      "Perfect score. That knowledge is looking sharp.";
  } else if (scorePercent >= 80) {
    resultMessage =
      "Excellent result. You have a strong grasp of this topic.";
  } else if (scorePercent >= 60) {
    resultMessage =
      "Solid progress. Replay the activity later to strengthen the gaps.";
  }

  elements.activityQuestionArea.innerHTML = `
    <div class="activity-complete-card">
      <div class="activity-complete-symbol">
        ✓
      </div>

      <h2>Mission complete</h2>

      <p>${resultMessage}</p>

      <div class="activity-result-score">
        ${activityScore}
        <span>/ ${totalQuestions}</span>
      </div>

      <div class="activity-complete-actions">
        <button
          class="secondary-button"
          id="replayActivityButton"
          type="button"
        >
          Replay activity
        </button>

        <button
          class="primary-button"
          id="returnToPathwayButton"
          type="button"
        >
          Continue pathway
        </button>
      </div>
    </div>
  `;

  elements.activityFeedback.innerHTML = "";

  document
    .getElementById("replayActivityButton")
    .addEventListener("click", () => {
      openActivity(
        currentPathwayId,
        currentActivityId
      );
    });

  document
    .getElementById("returnToPathwayButton")
    .addEventListener("click", () => {
      openPathway(currentPathwayId);
    });

  saveState();
  renderAll();

  elements.activitySubjectLabel.textContent =
    pathway ? pathway.title : "English";

  elements.activityTitle.textContent =
    activity.title;
}

/* =========================================================
   ACHIEVEMENTS
   ========================================================= */

function checkAchievements() {
  ACHIEVEMENTS.forEach(achievement => {
    const alreadyUnlocked =
      appState.unlockedAchievements.includes(
        achievement.id
      );

    if (
      !alreadyUnlocked &&
      achievement.condition(appState)
    ) {
      appState.unlockedAchievements.push(
        achievement.id
      );

      setTimeout(() => {
        showToast(
          "Achievement unlocked",
          achievement.title
        );
      }, 450);
    }
  });
}

function renderAchievements() {
  checkAchievements();

  elements.achievementGrid.innerHTML =
    ACHIEVEMENTS.map(achievement => {
      const unlocked =
        appState.unlockedAchievements.includes(
          achievement.id
        );

      return `
        <article
          class="achievement-card ${unlocked ? "unlocked" : ""}"
        >
          <div class="achievement-symbol">
            ${unlocked ? "✓" : "LOCK"}
          </div>

          <div>
            <span>
              ${unlocked ? "Unlocked" : "Locked"}
            </span>

            <h3>${achievement.title}</h3>

            <p>${achievement.description}</p>
          </div>
        </article>
      `;
    }).join("");
}

/* =========================================================
   RESET
   ========================================================= */

function openResetModal() {
  elements.resetModal.classList.add("visible");
}

function closeResetModal() {
  elements.resetModal.classList.remove("visible");
}

function resetEverything() {
  appState = createDefaultState();

  saveState();

  closeResetModal();

  renderAll();

  showView("dashboard");

  showToast(
    "Progress reset",
    "Mission GCSE is ready for a fresh start."
  );
}

/* =========================================================
   CONTINUE BUTTONS
   ========================================================= */

function continueMission() {
  const today = getTodayName();

  const missions = WEEKLY_PLAN[today] || [];

  const nextMission =
    missions.find(
      mission =>
        !appState.completedMissions.includes(mission.id)
    );

  if (!nextMission) {
    showToast(
      "Today is complete",
      "All planned missions are finished."
    );

    return;
  }

  elements.missionList.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

function continueEnglish() {
  const firstIncompletePathway =
    ENGLISH_PATHWAYS.find(pathway =>
      pathway.activities.some(
        activity =>
          !appState.completedActivities.includes(
            activity.id
          )
      )
    );

  if (!firstIncompletePathway) {
    openPathway("macbeth");
    return;
  }

  const firstIncompleteActivity =
    firstIncompletePathway.activities.find(
      activity =>
        !appState.completedActivities.includes(
          activity.id
        )
    );

  if (!firstIncompleteActivity) {
    openPathway(firstIncompletePathway.id);
    return;
  }

  openActivity(
    firstIncompletePathway.id,
    firstIncompleteActivity.id
  );
}

/* =========================================================
   EVENT LISTENERS
   ========================================================= */

function attachEventListeners() {
  document
    .querySelectorAll(".nav-item")
    .forEach(button => {
      button.addEventListener("click", () => {
        const view = button.dataset.view;

        if (view === "dashboard") {
          renderDashboard();
        }

        if (view === "plan") {
          renderWeeklyPlan();
        }

        if (view === "subjects") {
          renderSubjects();
        }

        if (view === "achievements") {
          renderAchievements();
        }

        showView(view);
      });
    });

  document
    .getElementById("continueButton")
    .addEventListener("click", continueMission);

  document
    .getElementById("continueEnglishButton")
    .addEventListener("click", continueEnglish);

  document
    .getElementById("backToSubjects")
    .addEventListener("click", () => {
      renderSubjects();
      showView("subjects");
    });

  document
    .getElementById("backToEnglishHub")
    .addEventListener("click", () => {
      renderEnglishHub();
      showView("english");
    });

  document
    .getElementById("backToPathway")
    .addEventListener("click", () => {
      if (currentPathwayId) {
        openPathway(currentPathwayId);
      } else {
        renderEnglishHub();
        showView("english");
      }
    });

  elements.activityHintButton.addEventListener(
    "click",
    showActivityHint
  );

  elements.activityNextButton.addEventListener(
    "click",
    moveToNextQuestion
  );

  document
    .getElementById("startTimer")
    .addEventListener("click", startTimer);

  document
    .getElementById("pauseTimer")
    .addEventListener("click", pauseTimer);

  document
    .getElementById("resetTimer")
    .addEventListener("click", resetTimer);

  document
    .getElementById("resetProgressButton")
    .addEventListener("click", openResetModal);

  document
    .getElementById("cancelReset")
    .addEventListener("click", closeResetModal);

  document
    .getElementById("confirmReset")
    .addEventListener("click", resetEverything);

  elements.resetModal.addEventListener(
    "click",
    event => {
      if (event.target === elements.resetModal) {
        closeResetModal();
      }
    }
  );

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeResetModal();
    }
  });
}

/* =========================================================
   MASTER RENDER
   ========================================================= */

function renderAll() {
  renderDateAndGreeting();
  renderDashboard();
  renderWeeklyPlan();
  renderSubjects();
  renderEnglishHub();
  renderAchievements();
  renderTimer();

  if (currentPathwayId) {
    const pathway = findPathway(currentPathwayId);

    if (
      pathway &&
      currentView === "englishPathway"
    ) {
      openPathway(currentPathwayId);
    }
  }
}

/* =========================================================
   INITIALISE
   ========================================================= */

function initialiseApp() {
  attachEventListeners();
  checkAchievements();
  renderAll();
  showView("dashboard");
}

initialiseApp();