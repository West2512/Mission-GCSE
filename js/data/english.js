/* =========================================================
   ENGLISH PATHWAY
   ========================================================= */

function openPathway(pathwayId) {
  const pathway = findPathway(pathwayId);

  if (!pathway) {
    return;
  }

  currentPathwayId = pathwayId;

  const progress = getPathwayCompletion(pathway);

  const totalXp =
    pathway.activities.reduce(
      (sum, activity) => sum + activity.xp,
      0
    );

  document
    .getElementById("englishPathwayView")
    .style.setProperty(
      "--active-pathway-colour",
      pathway.colour
    );

  elements.pathwayEyebrow.textContent =
    `${pathway.code} · English pathway`;

  elements.pathwayTitle.textContent =
    pathway.title;

  elements.pathwayDescription.textContent =
    pathway.description;

  elements.pathwayActivityCount.textContent =
    `${pathway.activities.length} activities`;

  elements.pathwayXpReward.textContent =
    `${totalXp} XP available`;

  elements.pathwayProgressPercent.textContent =
    `${progress.percent}%`;

  elements.pathwayProgressFill.style.width =
    `${progress.percent}%`;

  elements.pathwayProgressText.textContent =
    `${progress.completed} of ${progress.total} complete`;

  renderPathwayActivities(pathway);

  showView("englishPathway");
}

function renderPathwayActivities(pathway) {
  elements.pathwayActivityGrid.innerHTML =
    pathway.activities.map((activity, index) => {
      const complete =
        appState.completedActivities.includes(activity.id);

      const previousActivity =
        pathway.activities[index - 1];

      const locked =
        index > 0 &&
        !appState.completedActivities.includes(
          previousActivity.id
        );

      const bestScore =
        appState.activityScores[activity.id];

      let status = "Ready";

      if (complete) {
        status = "Complete";
      } else if (locked) {
        status = "Locked";
      }

      return `
        <article
          class="activity-card
          ${complete ? "completed" : ""}
          ${locked ? "locked" : ""}"
          data-activity-id="${activity.id}"
          data-locked="${locked}"
        >
          <div class="activity-card-top">
            <span class="activity-type">
              ${activity.type}
            </span>

            <span class="activity-status">
              ${status}
            </span>
          </div>

          <h3>${activity.title}</h3>

          <p>${activity.description}</p>

          <div class="activity-card-footer">
            <span>
              ${
                typeof bestScore === "number"
                  ? `Best score ${bestScore}/${activity.questions.length}`
                  : `${activity.questions.length} questions`
              }
            </span>

            <strong>+${activity.xp} XP</strong>
          </div>
        </article>
      `;
    }).join("");

  document
    .querySelectorAll(".activity-card")
    .forEach(card => {
      card.addEventListener("click", () => {
        const locked =
          card.dataset.locked === "true";

        if (locked) {
          showToast(
            "Activity locked",
            "Complete the previous activity first."
          );

          return;
        }

        openActivity(
          pathway.id,
          card.dataset.activityId
        );
      });
    });
}