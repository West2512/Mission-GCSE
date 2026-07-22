/* =========================================================
   MISSION GCSE — STORAGE
   ========================================================= */

"use strict";

function loadState() {
  try {
    const storedState = localStorage.getItem(STORAGE_KEY);

    if (!storedState) {
      return createDefaultState();
    }

    const parsedState = JSON.parse(storedState);

    return {
      ...createDefaultState(),
      ...parsedState,
      completedMissions:
        Array.isArray(parsedState.completedMissions)
          ? parsedState.completedMissions
          : [],
      completedActivities:
        Array.isArray(parsedState.completedActivities)
          ? parsedState.completedActivities
          : [],
      activeDates:
        Array.isArray(parsedState.activeDates)
          ? parsedState.activeDates
          : [],
      unlockedAchievements:
        Array.isArray(parsedState.unlockedAchievements)
          ? parsedState.unlockedAchievements
          : [],
      activityScores:
        parsedState.activityScores &&
        typeof parsedState.activityScores === "object"
          ? parsedState.activityScores
          : {}
    };
  } catch (error) {
    console.error("Could not load Mission GCSE progress.", error);

    return createDefaultState();
  }
}

function saveState() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(appState)
    );
  } catch (error) {
    console.error("Could not save Mission GCSE progress.", error);
  }
}