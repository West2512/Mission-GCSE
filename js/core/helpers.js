/* =========================================================
   MISSION GCSE — GENERAL HELPERS
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