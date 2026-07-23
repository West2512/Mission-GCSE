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
const ENGLISH_PATHWAYS = [
  {
    id: "language-paper-1",
    code: "LP1",
    title: "Language Paper 1",
    description:
      "Explore fiction extracts, analyse language and structure, and practise creative writing.",
    colour: "#78a9ff",
    activities: [
      {
        id: "lp1-language-techniques",
        type: "Retrieval",
        title: "Language Techniques",
        description:
          "Recognise common methods used by writers and explain their effects.",
        xp: 20,
        questions: [
          {
            type: "multipleChoice",
            prompt:
              "Which technique compares two things using the words ‘like’ or ‘as’?",
            support:
              "Choose the most accurate language technique.",
            options: [
              "Metaphor",
              "Simile",
              "Personification",
              "Alliteration"
            ],
            answer: 1,
            explanation:
              "A simile compares two things using ‘like’ or ‘as’.",
            hint:
              "Look for the technique that makes an explicit comparison."
          },
          {
            type: "multipleChoice",
            prompt:
              "Which technique gives human qualities to something non-human?",
            support:
              "Think about descriptions such as ‘the wind whispered’.",
            options: [
              "Personification",
              "Onomatopoeia",
              "Repetition",
              "Hyperbole"
            ],
            answer: 0,
            explanation:
              "Personification gives human actions or qualities to non-human things.",
            hint:
              "The clue is in the word ‘person’."
          },
          {
            type: "multipleChoice",
            prompt:
              "What is the effect of a semantic field?",
            support:
              "A semantic field is a group of related words.",
            options: [
              "It removes all imagery",
              "It creates a connected mood or idea",
              "It always makes the writing humorous",
              "It shortens the sentence"
            ],
            answer: 1,
            explanation:
              "A semantic field builds a connected mood, idea or atmosphere.",
            hint:
              "Think about what happens when several words relate to the same topic."
          },
          {
            type: "multipleChoice",
            prompt:
              "Which phrase contains alliteration?",
            support:
              "Alliteration repeats the same starting sound.",
            options: [
              "The cold rain fell",
              "Wild winds whipped",
              "The moon was a coin",
              "The leaves danced"
            ],
            answer: 1,
            explanation:
              "‘Wild winds whipped’ repeats the ‘w’ sound.",
            hint:
              "Listen for repeated sounds at the beginning of nearby words."
          },
          {
            type: "multipleChoice",
            prompt:
              "Which sentence uses a metaphor?",
            support:
              "A metaphor states that one thing is another.",
            options: [
              "The classroom was like a zoo",
              "The classroom was a zoo",
              "The classroom became noisy",
              "The classroom sounded busy"
            ],
            answer: 1,
            explanation:
              "‘The classroom was a zoo’ directly states that one thing is another.",
            hint:
              "The answer will not use ‘like’ or ‘as’."
          }
        ]
      },
      {
        id: "lp1-structure",
        type: "Analysis",
        title: "Structure Detective",
        description:
          "Identify shifts in focus, pace and perspective within fiction extracts.",
        xp: 25,
        questions: [
          {
            type: "multipleChoice",
            prompt:
              "Why might a writer begin with a wide description of the setting?",
            support:
              "Think about what the reader understands before meeting a character.",
            options: [
              "To establish the atmosphere",
              "To reveal the ending",
              "To remove tension",
              "To avoid description"
            ],
            answer: 0,
            explanation:
              "A wide setting description can establish atmosphere and orientate the reader.",
            hint:
              "Think about the mood created at the beginning."
          },
          {
            type: "multipleChoice",
            prompt:
              "What is a shift in focus?",
            support:
              "This is a structural change in what the text concentrates on.",
            options: [
              "A spelling correction",
              "A movement from one subject or detail to another",
              "A repeated adjective",
              "A type of punctuation"
            ],
            answer: 1,
            explanation:
              "A shift in focus moves the reader’s attention to a different subject or detail.",
            hint:
              "Imagine the camera moving to something else."
          },
          {
            type: "multipleChoice",
            prompt:
              "Short sentences often increase which effect?",
            support:
              "Consider how quickly the reader moves through them.",
            options: [
              "Pace and tension",
              "Background information",
              "Calm explanation",
              "Detailed comparison"
            ],
            answer: 0,
            explanation:
              "Short sentences can quicken the pace and create tension or urgency.",
            hint:
              "Think about how fast they are to read."
          },
          {
            type: "multipleChoice",
            prompt:
              "A repeated image at the beginning and end of a text creates:",
            support:
              "The structure returns to where it started.",
            options: [
              "A circular structure",
              "A flashback",
              "Dialogue",
              "A cliffhanger"
            ],
            answer: 0,
            explanation:
              "Returning to an earlier image or idea creates a circular structure.",
            hint:
              "The ending loops back to the beginning."
          },
          {
            type: "multipleChoice",
            prompt:
              "Why might a writer end on a cliffhanger?",
            support:
              "Think about the reader’s reaction.",
            options: [
              "To create suspense",
              "To explain every detail",
              "To slow the pace completely",
              "To introduce the setting"
            ],
            answer: 0,
            explanation:
              "A cliffhanger creates suspense and leaves the reader wanting more.",
            hint:
              "It leaves something unresolved."
          }
        ]
      },
      {
        id: "lp1-creative-writing",
        type: "Writing",
        title: "Creative Writing Builder",
        description:
          "Develop controlled description using precise vocabulary and varied sentences.",
        xp: 30,
        questions: [
          {
            type: "multipleChoice",
            prompt:
              "Which opening creates the strongest atmosphere?",
            support:
              "Choose the sentence with the most deliberate imagery.",
            options: [
              "It was raining outside.",
              "Rain clawed at the window, demanding to be let in.",
              "The weather was not very good.",
              "There was some rain and wind."
            ],
            answer: 1,
            explanation:
              "The personification and precise verb create a vivid, threatening atmosphere.",
            hint:
              "Look for deliberate imagery rather than a plain statement."
          },
          {
            type: "multipleChoice",
            prompt:
              "Which sentence uses sensory description most effectively?",
            support:
              "Sensory description appeals to sight, sound, smell, taste or touch.",
            options: [
              "The kitchen was nice.",
              "The sharp scent of lemon stung her nose.",
              "There were things in the kitchen.",
              "She walked into the room."
            ],
            answer: 1,
            explanation:
              "The sentence uses smell and physical sensation to make the description vivid.",
            hint:
              "Which sentence helps you experience the setting?"
          },
          {
            type: "multipleChoice",
            prompt:
              "What is the best reason to vary sentence lengths?",
            support:
              "Think about control and effect.",
            options: [
              "To avoid using paragraphs",
              "To control pace and emphasis",
              "To make every sentence complicated",
              "To use more words"
            ],
            answer: 1,
            explanation:
              "Varied sentence lengths allow a writer to control pace, rhythm and emphasis.",
            hint:
              "Different lengths affect how quickly the reader moves."
          },
          {
            type: "multipleChoice",
            prompt:
              "Which verb is the most precise?",
            support:
              "Choose the verb that gives the clearest picture.",
            options: [
              "Went",
              "Moved",
              "Staggered",
              "Did"
            ],
            answer: 2,
            explanation:
              "‘Staggered’ gives a precise sense of unsteady movement.",
            hint:
              "Which verb tells you exactly how the person moved?"
          },
          {
            type: "multipleChoice",
            prompt:
              "Which ending is most effective for a tense description?",
            support:
              "Think about leaving the reader with a controlled final image.",
            options: [
              "Then everything was fine.",
              "He went home and ate dinner.",
              "Behind him, the handle began to turn.",
              "That is the end of the story."
            ],
            answer: 2,
            explanation:
              "The final image creates suspense and leaves the danger unresolved.",
            hint:
              "Choose the ending that leaves a lasting feeling of tension."
          }
        ]
      }
    ]
  },

  {
    id: "language-paper-2",
    code: "LP2",
    title: "Language Paper 2",
    description:
      "Compare viewpoints, analyse non-fiction and develop persuasive writing.",
    colour: "#6ee7b7",
    activities: [
      {
        id: "lp2-viewpoints",
        type: "Retrieval",
        title: "Viewpoint Finder",
        description:
          "Identify attitudes and viewpoints in non-fiction texts.",
        xp: 20,
        questions: [
          {
            type: "multipleChoice",
            prompt:
              "What is a viewpoint?",
            support:
              "Choose the clearest definition.",
            options: [
              "The writer’s attitude or perspective",
              "The length of the text",
              "The title of the article",
              "The number of paragraphs"
            ],
            answer: 0,
            explanation:
              "A viewpoint is the writer’s attitude, opinion or perspective.",
            hint:
              "Think about what the writer thinks or feels."
          },
          {
            type: "multipleChoice",
            prompt:
              "Which phrase suggests a negative viewpoint?",
            support:
              "Look closely at the connotations.",
            options: [
              "A valuable opportunity",
              "A disastrous decision",
              "A promising beginning",
              "A welcome change"
            ],
            answer: 1,
            explanation:
              "‘Disastrous decision’ clearly communicates a negative attitude.",
            hint:
              "Which phrase contains strongly critical language?"
          },
          {
            type: "multipleChoice",
            prompt:
              "What should you compare in Question 4?",
            support:
              "Think about both ideas and methods.",
            options: [
              "Only punctuation",
              "Only the dates of the texts",
              "The writers’ attitudes and how they present them",
              "The number of words"
            ],
            answer: 2,
            explanation:
              "You should compare viewpoints and the methods used to convey them.",
            hint:
              "You need both what they think and how they communicate it."
          },
          {
            type: "multipleChoice",
            prompt:
              "Which connective is useful for comparison?",
            support:
              "Choose the option that clearly introduces a difference.",
            options: [
              "Similarly",
              "However",
              "Because",
              "Therefore"
            ],
            answer: 1,
            explanation:
              "‘However’ clearly signals a contrast between viewpoints.",
            hint:
              "Look for the word that means ‘on the other hand’."
          },
          {
            type: "multipleChoice",
            prompt:
              "Why should quotations be kept short?",
            support:
              "Think about focused analysis.",
            options: [
              "To avoid reading the text",
              "To allow precise analysis",
              "To remove all context",
              "To use fewer paragraphs"
            ],
            answer: 1,
            explanation:
              "Short quotations help you focus closely on specific language choices.",
            hint:
              "A smaller quotation is easier to zoom in on."
          }
        ]
      },
      {
        id: "lp2-persuasive-writing",
        type: "Writing",
        title: "Persuasion Toolkit",
        description:
          "Use deliberate structure and persuasive methods for transactional writing.",
        xp: 25,
        questions: [
          {
            type: "multipleChoice",
            prompt:
              "Which opening directly engages an audience?",
            support:
              "Choose the sentence that immediately addresses the reader.",
            options: [
              "There are many issues.",
              "Have you ever wondered why our town has no youth centre?",
              "This essay is about youth centres.",
              "I am writing some words."
            ],
            answer: 1,
            explanation:
              "The rhetorical question directly addresses and engages the audience.",
            hint:
              "Which sentence invites the reader to think?"
          },
          {
            type: "multipleChoice",
            prompt:
              "What is the purpose of a rhetorical question?",
            support:
              "It does not usually require an answer.",
            options: [
              "To confuse the reader",
              "To make the reader consider an idea",
              "To provide statistics",
              "To end every paragraph"
            ],
            answer: 1,
            explanation:
              "A rhetorical question encourages the audience to reflect on an idea.",
            hint:
              "It places a thought directly into the reader’s mind."
          },
          {
            type: "multipleChoice",
            prompt:
              "Which phrase uses direct address?",
            support:
              "Direct address speaks to the audience.",
            options: [
              "People might believe",
              "You deserve better",
              "The council decided",
              "Many years ago"
            ],
            answer: 1,
            explanation:
              "The pronoun ‘you’ directly addresses the audience.",
            hint:
              "Look for a second-person pronoun."
          },
          {
            type: "multipleChoice",
            prompt:
              "Why use statistics in persuasive writing?",
            support:
              "Think about authority and evidence.",
            options: [
              "To make the writing look longer",
              "To provide convincing evidence",
              "To avoid a clear viewpoint",
              "To remove emotion"
            ],
            answer: 1,
            explanation:
              "Statistics can make an argument appear informed and convincing.",
            hint:
              "Numbers can support a claim with evidence."
          },
          {
            type: "multipleChoice",
            prompt:
              "Which ending is most persuasive?",
            support:
              "Choose the one with a clear final call to action.",
            options: [
              "That is everything I know.",
              "Perhaps something could happen.",
              "Act now, speak up and demand the change our community deserves.",
              "Thank you for reading these sentences."
            ],
            answer: 2,
            explanation:
              "The imperatives and triplet create a strong call to action.",
            hint:
              "Choose the ending that tells the audience exactly what to do."
          }
        ]
      }
    ]
  },

  {
    id: "macbeth",
    code: "MAC",
    title: "Macbeth",
    description:
      "Master characters, themes, quotations, context and exam responses.",
    colour: "#ff8f8f",
    activities: [
      {
        id: "macbeth-characters",
        type: "Mission 1 · Retrieval",
        title: "The Brave Soldier",
        description:
          "Explore how Shakespeare establishes Macbeth as a celebrated warrior before his tragic decline.",
        xp: 40,
        learningCards: [
          {
            eyebrow: "Character",
            title: "Macbeth begins as a hero",
            body: "Before Macbeth appears on stage, the wounded Captain describes him as Scotland’s fearless defender. Shakespeare gives him an honourable starting point so that his later fall feels genuinely tragic."
          },
          {
            eyebrow: "Key quotation",
            title: "“For brave Macbeth — well he deserves that name”",
            body: "The adjective “brave” presents Macbeth as courageous, loyal and respected. The Captain’s extra comment — “well he deserves that name” — makes the praise sound certain and earned."
          },
          {
            eyebrow: "Writer’s method",
            title: "“Disdaining fortune, with his brandished steel”",
            body: "“Disdaining” suggests proud contempt. Macbeth seems so fearless that he rejects the danger and uncertainty personified by Fortune. His “brandished steel” creates a vivid image of energetic, decisive action."
          },
          {
            eyebrow: "Deeper interpretation",
            title: "Heroic violence can become destructive",
            body: "Images such as “smoked with bloody execution” and “unseam’d him” celebrate Macbeth’s success in battle, but they also reveal his capacity for extreme violence. Shakespeare plants the seeds of the tyrant inside the admired soldier."
          },
          {
            eyebrow: "Context",
            title: "Duncan’s trust makes the betrayal worse",
            body: "Duncan rewards Macbeth with the title Thane of Cawdor. A Jacobean audience would also connect kingship with the Divine Right of Kings, so Macbeth’s later regicide breaks personal loyalty, political order and sacred order."
          },
          {
            eyebrow: "Exam-ready thesis",
            title: "A strong whole-play argument",
            body: "Shakespeare presents Macbeth as a celebrated warrior whose courage becomes dangerous when ambition removes his moral restraint. This contrast makes his transformation into a tyrant both shocking and tragic."
          }
        ],
        questions: [
          {
            type: "multipleChoice",
            prompt:
              "Who gives Duncan the first detailed account of Macbeth's actions in battle?",
            support:
              "The speaker is wounded and reports what happened against Macdonwald.",
            options: [
              "Ross",
              "The Captain",
              "Banquo",
              "Malcolm"
            ],
            answer: 1,
            explanation:
              "The wounded Captain reports Macbeth's courage. Shakespeare therefore establishes Macbeth's heroic reputation before Macbeth first appears on stage.",
            hint:
              "He is described as bleeding when Malcolm introduces him."
          },
          {
            type: "multipleChoice",
            prompt:
              "Why is the description ‘brave Macbeth’ dramatically important?",
            support:
              "Think beyond the simple fact that Macbeth is courageous.",
            options: [
              "It proves Macbeth has always wanted to murder Duncan",
              "It creates a heroic starting point from which Macbeth can tragically fall",
              "It shows Macbeth is physically stronger than every other character",
              "It tells the audience that Macbeth will remain loyal throughout the play"
            ],
            answer: 1,
            explanation:
              "Shakespeare presents Macbeth as admired and honourable at the beginning, making his later transformation into a tyrant more shocking and tragic.",
            hint:
              "Consider the contrast between Macbeth at the beginning and at the end."
          },
          {
            type: "multipleChoice",
            prompt:
              "What does the adjective ‘brave’ initially suggest about Macbeth?",
            support:
              "Choose the interpretation most firmly supported by the battlefield report.",
            options: [
              "He is loyal, courageous and respected",
              "He is secretly frightened of Duncan",
              "He is already cruel to innocent people",
              "He is unwilling to fight for Scotland"
            ],
            answer: 0,
            explanation:
              "The adjective presents Macbeth as courageous and worthy of admiration. At this point, his violence is used in loyal service to Scotland.",
            hint:
              "Duncan rewards him after hearing the report."
          },
          {
            type: "multipleChoice",
            prompt:
              "In the image ‘Disdaining fortune, with his brandished steel’, what does Macbeth appear to reject?",
            support:
              "Focus on the verb ‘disdaining’ and the personification of Fortune.",
            options: [
              "The authority of King Duncan",
              "The danger and uncertainty of the battle",
              "The witches' supernatural power",
              "Lady Macbeth's influence"
            ],
            answer: 1,
            explanation:
              "‘Disdaining’ suggests proud contempt. Macbeth seems fearless enough to reject the danger and uncertainty represented by Fortune.",
            hint:
              "He behaves as though chance cannot control or frighten him."
          },
          {
            type: "multipleChoice",
            prompt:
              "Which interpretation of ‘smoked with bloody execution’ is strongest?",
            support:
              "A strong AO2 response considers both Macbeth's effectiveness and the disturbing imagery.",
            options: [
              "Macbeth's sword is ineffective because it is hidden by smoke",
              "Macbeth is presented as an efficient warrior, but the violent imagery foreshadows his capacity for brutality",
              "Macbeth refuses to participate in the battle",
              "The quotation proves the battle takes place inside Macbeth's castle"
            ],
            answer: 1,
            explanation:
              "The image celebrates Macbeth's success in battle while also associating him with blood and ruthless violence, qualities that later become destructive.",
            hint:
              "Look for an answer that recognises two possible effects."
          },
          {
            type: "multipleChoice",
            prompt:
              "What does the Captain's description of Macbeth ‘unseam[ing]’ Macdonwald suggest?",
            support:
              "Consider the precision and extremity of the verb.",
            options: [
              "Macbeth defeats him with controlled but exceptionally brutal violence",
              "Macbeth repairs Macdonwald's armour",
              "Macbeth allows Macdonwald to escape",
              "Macbeth persuades Macdonwald to surrender peacefully"
            ],
            answer: 0,
            explanation:
              "The verb makes Macbeth's violence sound precise and horrifying. In battle it is praised, but it also foreshadows how readily he can use extreme violence.",
            hint:
              "The image suggests splitting something along a seam."
          },
          {
            type: "multipleChoice",
            prompt:
              "How does Duncan respond to the reports of Macbeth's loyalty?",
            support:
              "Recall the title taken from the former traitor.",
            options: [
              "He arrests Macbeth",
              "He names Macbeth Prince of Cumberland",
              "He rewards Macbeth with the title Thane of Cawdor",
              "He sends Macbeth into exile"
            ],
            answer: 2,
            explanation:
              "Duncan gives Macbeth the title Thane of Cawdor. The reward establishes Duncan's trust and makes Macbeth's later betrayal especially serious.",
            hint:
              "The witches have already used this title in their greeting."
          },
          {
            type: "multipleChoice",
            prompt:
              "Why would Macbeth's later murder of Duncan be especially shocking to a Jacobean audience?",
            support:
              "Use relevant context rather than a vague statement about people being religious.",
            options: [
              "A king was believed to rule with God's authority, so regicide violated divine and political order",
              "Soldiers were legally forbidden from entering castles",
              "Jacobean audiences believed every nobleman should become king",
              "Duncan was historically Shakespeare's patron"
            ],
            answer: 0,
            explanation:
              "Belief in the Divine Right of Kings meant that killing an anointed monarch could be viewed as an offence against God and the natural order.",
            hint:
              "Think about the religious and political status of a king."
          },
          {
            type: "multipleChoice",
            prompt:
              "Which statement best connects Macbeth's heroic beginning to his tragic development?",
            support:
              "Choose the response that offers a clear interpretation of Shakespeare's whole-play method.",
            options: [
              "Macbeth never changes because he remains brave in every situation",
              "Shakespeare shows that qualities admired in war can become destructive when ambition removes moral restraint",
              "Macbeth becomes evil only because Duncan refuses to reward him",
              "Shakespeare presents all forms of courage as morally wrong"
            ],
            answer: 1,
            explanation:
              "Macbeth's courage and capacity for violence initially protect Scotland. Once directed by unchecked ambition, those same qualities contribute to tyranny and destruction.",
            hint:
              "Think about how the same quality can be used for good or evil."
          },
          {
            type: "multipleChoice",
            prompt:
              "Which thesis would best answer ‘How does Shakespeare present Macbeth as a hero at the beginning of the play?’",
            support:
              "A strong thesis should make a conceptual argument and acknowledge Shakespeare's wider design.",
            options: [
              "Macbeth is a character in a play written by Shakespeare.",
              "Macbeth is brave because the Captain calls him brave.",
              "Shakespeare initially constructs Macbeth as Scotland's fearless defender, while planting disturbing images of violence that foreshadow the hero's tragic corruption.",
              "Macbeth fights in a battle and then meets three witches."
            ],
            answer: 2,
            explanation:
              "This thesis is conceptual, directly answers the question and links Macbeth's heroic presentation to Shakespeare's foreshadowing of his later decline.",
            hint:
              "Choose the answer that combines AO1 interpretation with AO2 method."
          }
        ]
       },
       {
  id: "macbeth-lady-macbeth",
  type: "Mission 2 · Retrieval",
  title: "The Mastermind",
  description:
    "Explore how Lady Macbeth uses ambition, manipulation and deception before guilt destroys her confidence.",
  xp: 40,
 learningCards: [
  {
    eyebrow: "Character",
    title: "Lady Macbeth drives the murder plot",
    body: "After reading Macbeth’s letter, Lady Macbeth immediately begins planning Duncan’s murder. While Macbeth hesitates, she becomes the driving force behind the crime."
  },
  {
    eyebrow: "Key quotation",
    title: "“Unsex me here”",
    body: "Lady Macbeth asks the spirits to remove the qualities traditionally associated with femininity. She believes compassion will prevent her from carrying out the cruelty needed to gain power."
  },
  {
    eyebrow: "Writer’s method",
    title: "“Look like the innocent flower, but be the serpent under’t”",
    body: "The contrast between the innocent flower and the dangerous serpent presents deception as central to Lady Macbeth’s plan. The serpent also suggests temptation and evil."
  },
  {
    eyebrow: "Manipulation",
    title: "“When you durst do it, then you were a man”",
    body: "Lady Macbeth attacks Macbeth’s masculinity when he considers abandoning the murder. She manipulates his pride by linking courage and manhood with violence."
  },
  {
    eyebrow: "Deeper interpretation",
    title: "Her power is temporary",
    body: "Lady Macbeth appears commanding before Duncan’s murder, but she cannot control its psychological consequences. Macbeth becomes more independent and violent while she becomes isolated and overwhelmed by guilt."
  },
  {
    eyebrow: "Context",
    title: "She challenges Jacobean expectations",
    body: "Women were generally expected to be obedient, gentle and submissive. Lady Macbeth’s rejection of femininity and dominance over her husband may therefore have appeared deeply unnatural and threatening."
  },
  {
    eyebrow: "Exam-ready thesis",
    title: "A strong whole-play argument",
    body: "Shakespeare initially presents Lady Macbeth as an intelligent and manipulative woman who rejects traditional femininity in pursuit of power, before revealing that ambition without morality leads to guilt and psychological destruction."
  }
],
questions: [
  {
    type: "multipleChoice",
    prompt:
      "What is Lady Macbeth’s immediate reaction after reading Macbeth’s letter?",
    support:
      "Think about how quickly she begins considering Duncan’s death.",
    options: [
      "She warns Macbeth to ignore the witches",
      "She begins planning how Macbeth can become king",
      "She decides to confess everything to Duncan",
      "She asks Banquo for advice"
    ],
    answer: 1,
    explanation:
      "Lady Macbeth immediately begins planning how Macbeth can gain the crown and prepares herself for Duncan’s murder.",
    hint:
      "She wants the prophecy to become reality."
  },
  {
    type: "multipleChoice",
    prompt:
      "Why does Lady Macbeth ask the spirits to 'unsex me here'?",
    support:
      "Think about what she believes compassion will stop her doing.",
    options: [
      "She wants to become a soldier",
      "She believes feminine qualities will prevent her committing cruelty",
      "She wants magical powers",
      "She wishes to become queen immediately"
    ],
    answer: 1,
    explanation:
      "Lady Macbeth believes compassion and tenderness will stop her carrying out murder, so she asks for those qualities to be removed.",
    hint:
      "She wants to remove pity."
  },
  {
    type: "multipleChoice",
    prompt:
      "Which theme is most clearly shown by 'Look like the innocent flower, but be the serpent under’t'?",
    support:
      "Think about hiding true intentions.",
    options: [
      "Appearance versus reality",
      "Friendship",
      "Nature",
      "Justice"
    ],
    answer: 0,
    explanation:
      "Lady Macbeth tells Macbeth to appear innocent while secretly planning murder. Shakespeare develops the theme of appearance versus reality.",
    hint:
      "Outside and inside are completely different."
  }
]
},
      {
        id: "macbeth-quotes",
        type: "Quote Challenge",
        title: "Complete the Quote",
        description:
          "Type the missing words from ten essential Macbeth quotations.",
        xp: 35,
        questions: [
          {
            type: "quoteInput",
            prompt: "Fair is foul, and foul is ____.",
            support: "The witches establish a world where appearances cannot be trusted.",
            answerText: "fair",
            acceptedAnswers: ["fair"],
            fullQuote: "Fair is foul, and foul is fair.",
            explanation: "The paradox blurs the boundary between good and evil and introduces the theme of deception.",
            hint: "The final word repeats one of the two opposites already used."
          },
          {
            type: "quoteInput",
            prompt: "For brave Macbeth — well he deserves that ____.",
            support: "The Captain praises Macbeth before his tragic decline begins.",
            answerText: "name",
            acceptedAnswers: ["name"],
            fullQuote: "For brave Macbeth — well he deserves that name.",
            explanation: "The adjective ‘brave’ establishes Macbeth as a celebrated warrior, making his later corruption more tragic.",
            hint: "What does Macbeth deserve because of his bravery?"
          },
          {
            type: "quoteInput",
            prompt: "Stars, hide your ____; let not light see my black and deep desires.",
            support: "Macbeth attempts to conceal his ambition after Malcolm is named heir.",
            answerText: "fires",
            acceptedAnswers: ["fires", "fire"],
            fullQuote: "Stars, hide your fires; let not light see my black and deep desires.",
            explanation: "The light and darkness imagery reveals that Macbeth already recognises the evil of his secret ambition.",
            hint: "Stars give off these."
          },
          {
            type: "quoteInput",
            prompt: "Look like the innocent flower, but be the ____ under’t.",
            support: "Lady Macbeth instructs Macbeth to disguise his murderous intentions.",
            answerText: "serpent",
            acceptedAnswers: ["serpent", "the serpent"],
            fullQuote: "Look like the innocent flower, but be the serpent under’t.",
            explanation: "The biblical image of the serpent presents deception as dangerous, sinful and deliberately tempting.",
            hint: "Think of the creature associated with temptation in the Garden of Eden."
          },
          {
            type: "quoteInput",
            prompt: "Is this a ____ which I see before me, the handle toward my hand?",
            support: "Macbeth hallucinates immediately before Duncan’s murder.",
            answerText: "dagger",
            acceptedAnswers: ["dagger", "a dagger"],
            fullQuote: "Is this a dagger which I see before me, the handle toward my hand?",
            explanation: "The hallucinated weapon externalises Macbeth’s violent intention and his disturbed state of mind.",
            hint: "It is the weapon Macbeth imagines reaching towards."
          },
          {
            type: "quoteInput",
            prompt: "Will all great Neptune’s ocean wash this ____ clean from my hand?",
            support: "Macbeth reacts to Duncan’s murder with immediate horror and guilt.",
            answerText: "blood",
            acceptedAnswers: ["blood", "the blood"],
            fullQuote: "Will all great Neptune’s ocean wash this blood clean from my hand?",
            explanation: "The hyperbole suggests Macbeth believes his guilt is so immense that even an ocean cannot cleanse it.",
            hint: "What physical stain symbolises Macbeth’s guilt?"
          },
          {
            type: "quoteInput",
            prompt: "O, full of ____ is my mind, dear wife!",
            support: "Macbeth reveals his fear of Banquo after becoming king.",
            answerText: "scorpions",
            acceptedAnswers: ["scorpions", "scorpion"],
            fullQuote: "O, full of scorpions is my mind, dear wife!",
            explanation: "The metaphor conveys a mind poisoned by painful, aggressive thoughts and growing paranoia.",
            hint: "These venomous creatures suggest painful thoughts attacking his mind."
          },
          {
            type: "quoteInput",
            prompt: "Out, damned ____! Out, I say!",
            support: "Lady Macbeth sleepwalks while imagining Duncan’s blood on her hands.",
            answerText: "spot",
            acceptedAnswers: ["spot", "the spot"],
            fullQuote: "Out, damned spot! Out, I say!",
            explanation: "The imagined spot shows that guilt has overwhelmed the woman who once dismissed blood as easily washable.",
            hint: "She imagines a small mark on her hand."
          },
          {
            type: "quoteInput",
            prompt: "I am in blood stepped in so ____.",
            support: "Macbeth decides that continuing violence is easier than turning back.",
            answerText: "far",
            acceptedAnswers: ["far", "so far"],
            fullQuote: "I am in blood stepped in so far.",
            explanation: "The metaphor presents Macbeth as trapped by the consequences of his own repeated violence.",
            hint: "He believes he has travelled too great a distance to return."
          },
          {
            type: "quoteInput",
            prompt: "Life’s but a walking ____.",
            support: "Macbeth responds to Lady Macbeth’s death with bleak nihilism.",
            answerText: "shadow",
            acceptedAnswers: ["shadow", "a shadow"],
            fullQuote: "Life’s but a walking shadow.",
            explanation: "The metaphor reduces life to something insubstantial and temporary, revealing the emptiness of Macbeth’s achievements.",
            hint: "It follows a person but has no substance of its own."
          }
        ]
      },
      {
        id: "macbeth-themes",
        type: "Analysis",
        title: "Theme Mastery",
        description:
          "Connect quotations to ambition, guilt, power and the supernatural.",
        xp: 30,
        questions: [
          {
            type: "multipleChoice",
            prompt:
              "Which quotation most clearly reveals Macbeth’s ambition?",
            support:
              "Choose the quotation in which Macbeth admits his driving motivation.",
            options: [
              "I have no spur / To prick the sides of my intent, but only / Vaulting ambition",
              "Out, damned spot!",
              "Fair is foul",
              "What, all my pretty chickens?"
            ],
            answer: 0,
            explanation:
              "Macbeth recognises that ambition is the main force pushing him towards murder.",
            hint:
              "The correct answer names the theme directly."
          },
          {
            type: "multipleChoice",
            prompt:
              "How is guilt presented through Lady Macbeth?",
            support:
              "Think about her imagined bloodstain.",
            options: [
              "As something easily forgotten",
              "As a psychological burden she cannot escape",
              "As a source of humour",
              "As proof of physical injury"
            ],
            answer: 1,
            explanation:
              "Her sleepwalking and imagined blood show guilt overwhelming her mind.",
            hint:
              "The blood is not really there, but she still sees it."
          },
          {
            type: "multipleChoice",
            prompt:
              "What do the witches mainly represent?",
            support:
              "Think about uncertainty, temptation and unnatural forces.",
            options: [
              "Order and justice",
              "The supernatural and dangerous temptation",
              "Family loyalty",
              "Religious forgiveness"
            ],
            answer: 1,
            explanation:
              "The witches embody supernatural disorder and tempt Macbeth with ambiguous predictions.",
            hint:
              "They challenge the natural order."
          },
          {
            type: "multipleChoice",
            prompt:
              "Why is Duncan’s murder presented as unnatural?",
            support:
              "Think about beliefs surrounding kingship.",
            options: [
              "Duncan is Macbeth’s servant",
              "A king was believed to be chosen by God",
              "Duncan is a soldier",
              "Macbeth is older than Duncan"
            ],
            answer: 1,
            explanation:
              "Jacobean audiences often believed in the Divine Right of Kings.",
            hint:
              "The murder attacks both political and religious order."
          },
          {
            type: "multipleChoice",
            prompt:
              "What is Shakespeare’s warning about unchecked ambition?",
            support:
              "Think about Macbeth’s final outcome.",
            options: [
              "It guarantees success",
              "It can destroy morality, relationships and identity",
              "It always improves leadership",
              "It has no consequences"
            ],
            answer: 1,
            explanation:
              "Macbeth’s ambition leads to violence, isolation and self-destruction.",
            hint:
              "Consider everything Macbeth loses."
          }
        ]
      },
      {
        id: "macbeth-boss",
        type: "Boss Battle",
        title: "Defeat Macbeth",
        description:
          "Combine character, quotation and theme knowledge in the final challenge.",
        xp: 50,
        questions: [
          {
            type: "multipleChoice",
            prompt:
              "Which description best fits Macbeth at the beginning of the play?",
            support:
              "Choose the most precise answer.",
            options: [
              "A loyal and respected warrior",
              "A cruel king",
              "A comic servant",
              "An exiled prince"
            ],
            answer: 0,
            explanation:
              "Macbeth initially appears brave, loyal and respected.",
            hint:
              "Think about the Captain’s report."
          },
          {
            type: "multipleChoice",
            prompt:
              "Who says ‘When you durst do it, then you were a man’?",
            support:
              "This character questions Macbeth’s masculinity.",
            options: [
              "Banquo",
              "Lady Macbeth",
              "Macduff",
              "Malcolm"
            ],
            answer: 1,
            explanation:
              "Lady Macbeth manipulates Macbeth by attacking his sense of masculinity.",
            hint:
              "This person is trying to persuade him to kill Duncan."
          },
          {
            type: "multipleChoice",
            prompt:
              "Which symbol repeatedly represents guilt?",
            support:
              "It appears after several murders.",
            options: [
              "Blood",
              "Gold",
              "Crowns",
              "Flowers"
            ],
            answer: 0,
            explanation:
              "Blood becomes a recurring symbol of guilt and violence.",
            hint:
              "Macbeth and Lady Macbeth both imagine it on their hands."
          },
          {
            type: "multipleChoice",
            prompt:
              "Why is Banquo suspicious of Macbeth?",
            support:
              "Think about Duncan’s death and the witches’ prophecy.",
            options: [
              "He believes Macbeth played most foully for the crown",
              "He wants to leave Scotland",
              "He dislikes Lady Macbeth",
              "He witnessed the murder directly"
            ],
            answer: 0,
            explanation:
              "Banquo suspects Macbeth may have acted dishonestly to fulfil the prophecy.",
            hint:
              "Banquo says Macbeth may have ‘played’ something to gain the crown."
          },
          {
            type: "multipleChoice",
            prompt:
              "What causes Lady Macbeth’s downfall?",
            support:
              "Choose the most accurate interpretation.",
            options: [
              "Her guilt overwhelms her",
              "She loses a battle",
              "She is imprisoned by Malcolm",
              "She is attacked by the witches"
            ],
            answer: 0,
            explanation:
              "Her repressed guilt emerges through sleepwalking and psychological collapse.",
            hint:
              "Her mind cannot contain what she has done."
          },
          {
            type: "multipleChoice",
            prompt:
              "What does ‘Macbeth shall never vanquished be until Great Birnam Wood…’ demonstrate?",
            support:
              "Think about how the prophecy misleads Macbeth.",
            options: [
              "Dramatic irony and equivocation",
              "Romantic imagery",
              "Comic relief",
              "A flashback"
            ],
            answer: 0,
            explanation:
              "The prophecy is technically true but deliberately misleading.",
            hint:
              "The witches use language with more than one possible meaning."
          },
          {
            type: "multipleChoice",
            prompt:
              "Why does Macbeth continue fighting at the end?",
            support:
              "Think about pride and warrior identity.",
            options: [
              "He believes Duncan will return",
              "He refuses to surrender despite knowing he is doomed",
              "He wants to protect Lady Macbeth",
              "He is unaware Malcolm has arrived"
            ],
            answer: 1,
            explanation:
              "Macbeth clings to his warrior identity and refuses to yield.",
            hint:
              "He chooses to fight even when the prophecies collapse."
          },
          {
            type: "multipleChoice",
            prompt:
              "Which theme is central to ‘False face must hide what the false heart doth know’?",
            support:
              "Macbeth plans to hide his true intentions.",
            options: [
              "Appearance versus reality",
              "Nature",
              "Friendship",
              "Education"
            ],
            answer: 0,
            explanation:
              "The quotation shows the contrast between outward appearance and hidden intention.",
            hint:
              "His face and heart communicate different things."
          },
          {
            type: "multipleChoice",
            prompt:
              "What does Malcolm’s victory restore?",
            support:
              "Think about the condition of Scotland under Macbeth.",
            options: [
              "Natural and political order",
              "The witches’ power",
              "Macbeth’s reputation",
              "Lady Macbeth’s influence"
            ],
            answer: 0,
            explanation:
              "Malcolm’s victory removes the tyrant and restores legitimate rule.",
            hint:
              "Scotland moves away from chaos."
          },
          {
            type: "multipleChoice",
            prompt:
              "Which is the strongest overall message of Macbeth?",
            support:
              "Choose the interpretation supported across the whole play.",
            options: [
              "Power gained through immoral action leads to destruction",
              "Violence always creates peace",
              "Prophecies should always be trusted",
              "Kingship is unimportant"
            ],
            answer: 0,
            explanation:
              "Macbeth shows how immoral ambition and abused power lead to destruction.",
            hint:
              "Think about Macbeth’s rise and collapse."
          }
        ]
      }
    ]
  },

  {
    id: "christmas-carol",
    code: "ACC",
    title: "A Christmas Carol",
    description:
      "Revise Scrooge, responsibility, poverty, redemption and Dickens’ message.",
    colour: "#f6b86b",
    activities: [
      {
        id: "acc-character",
        type: "Retrieval",
        title: "Scrooge’s Journey",
        description:
          "Track how Scrooge changes from isolation to generosity.",
        xp: 20,
        questions: [
          {
            type: "multipleChoice",
            prompt:
              "How is Scrooge described at the beginning of the novella?",
            support:
              "Choose the phrase that best captures his personality.",
            options: [
              "Solitary as an oyster",
              "As good as gold",
              "Radiant and cheerful",
              "Gentle and forgiving"
            ],
            answer: 0,
            explanation:
              "The simile ‘solitary as an oyster’ presents Scrooge as isolated and closed.",
            hint:
              "The image suggests something shut tightly."
          },
          {
            type: "multipleChoice",
            prompt:
              "Who first warns Scrooge to change?",
            support:
              "This visitor carries a heavy chain.",
            options: [
              "Fred",
              "Marley’s Ghost",
              "Tiny Tim",
              "Fezziwig"
            ],
            answer: 1,
            explanation:
              "Marley’s Ghost warns Scrooge that he is creating his own chain.",
            hint:
              "He was Scrooge’s former business partner."
          },
          {
            type: "multipleChoice",
            prompt:
              "What does the Ghost of Christmas Past show Scrooge?",
            support:
              "Think about his earlier experiences.",
            options: [
              "His childhood and lost relationships",
              "Only his future death",
              "The Cratchits’ Christmas",
              "Marley’s funeral"
            ],
            answer: 0,
            explanation:
              "The spirit shows Scrooge moments from his childhood and early adulthood.",
            hint:
              "These scenes help explain how Scrooge became isolated."
          },
          {
            type: "multipleChoice",
            prompt:
              "What does Tiny Tim represent?",
            support:
              "Think about innocence and social responsibility.",
            options: [
              "The consequences of poverty on the innocent",
              "Industrial wealth",
              "Political power",
              "Scrooge’s childhood"
            ],
            answer: 0,
            explanation:
              "Tiny Tim highlights the suffering of innocent children living in poverty.",
            hint:
              "His health is affected by the family’s lack of money."
          },
          {
            type: "multipleChoice",
            prompt:
              "How is Scrooge presented at the end?",
            support:
              "Choose the clearest description.",
            options: [
              "Generous and socially connected",
              "More isolated than before",
              "Unchanged",
              "Still obsessed with profit"
            ],
            answer: 0,
            explanation:
              "Scrooge becomes generous, joyful and connected to his community.",
            hint:
              "He celebrates Christmas and supports the Cratchits."
          }
        ]
      },
      {
        id: "acc-quotes",
        type: "Quote Challenge",
        title: "Essential Quotations",
        description:
          "Recall key quotations and connect them to Dickens’ ideas.",
        xp: 25,
        questions: [
          {
            type: "multipleChoice",
            prompt:
              "Complete the quotation: ‘Are there no prisons? Are there no…’",
            support:
              "Scrooge dismisses charity collectors.",
            options: [
              "schools",
              "workhouses",
              "hospitals",
              "churches"
            ],
            answer: 1,
            explanation:
              "Scrooge asks, ‘Are there no prisons? Are there no workhouses?’",
            hint:
              "This institution was feared by the Victorian poor."
          },
          {
            type: "multipleChoice",
            prompt:
              "Complete the quotation: ‘Mankind was my…’",
            support:
              "Marley regrets his priorities in life.",
            options: [
              "business",
              "enemy",
              "fortune",
              "burden"
            ],
            answer: 0,
            explanation:
              "Marley says, ‘Mankind was my business.’",
            hint:
              "He realises people mattered more than profit."
          },
          {
            type: "multipleChoice",
            prompt:
              "Complete the quotation: ‘This boy is Ignorance. This girl is…’",
            support:
              "The Ghost of Christmas Present reveals two symbolic children.",
            options: [
              "Poverty",
              "Want",
              "Fear",
              "Hunger"
            ],
            answer: 1,
            explanation:
              "The spirit names the children Ignorance and Want.",
            hint:
              "The missing word means extreme need."
          },
          {
            type: "multipleChoice",
            prompt:
              "Complete the quotation: ‘I will honour Christmas in my…’",
            support:
              "Scrooge promises to change.",
            options: [
              "home",
              "heart",
              "future",
              "family"
            ],
            answer: 1,
            explanation:
              "Scrooge vows, ‘I will honour Christmas in my heart.’",
            hint:
              "He wants the values of Christmas to become part of him."
          },
          {
            type: "multipleChoice",
            prompt:
              "Complete the quotation: ‘God bless us, every…’",
            support:
              "Tiny Tim speaks these words.",
            options: [
              "Christmas",
              "one",
              "family",
              "child"
            ],
            answer: 1,
            explanation:
              "Tiny Tim says, ‘God bless us, every one!’",
            hint:
              "The quotation includes everyone."
          }
        ]
      }
    ]
  },

  {
    id: "poetry",
    code: "POE",
    title: "Power and Conflict Poetry",
    description:
      "Build quotation knowledge and compare ideas across the anthology.",
    colour: "#c4a7ff",
    activities: [
      {
        id: "poetry-poems",
        type: "Retrieval",
        title: "Poem Finder",
        description:
          "Match quotations and ideas to the correct anthology poem.",
        xp: 20,
        questions: [
          {
            type: "multipleChoice",
            prompt:
              "Which poem includes the phrase ‘colossal wreck’?",
            support:
              "Think about ruined power in the desert.",
            options: [
              "Ozymandias",
              "London",
              "Exposure",
              "Kamikaze"
            ],
            answer: 0,
            explanation:
              "‘Colossal wreck’ appears in Shelley’s ‘Ozymandias’.",
            hint:
              "The poem describes a broken statue."
          },
          {
            type: "multipleChoice",
            prompt:
              "Which poem presents soldiers suffering in freezing weather?",
            support:
              "The enemy seems less dangerous than the conditions.",
            options: [
              "Bayonet Charge",
              "Exposure",
              "Charge of the Light Brigade",
              "Remains"
            ],
            answer: 1,
            explanation:
              "‘Exposure’ presents soldiers enduring brutal cold and waiting.",
            hint:
              "The repeated phrase ‘But nothing happens’ appears in this poem."
          },
          {
            type: "multipleChoice",
            prompt:
              "Which poem explores the lasting psychological effect of killing?",
            support:
              "The speaker recalls shooting a looter.",
            options: [
              "Remains",
              "Storm on the Island",
              "The Prelude",
              "Tissue"
            ],
            answer: 0,
            explanation:
              "‘Remains’ explores trauma and guilt after conflict.",
            hint:
              "The title suggests something that does not go away."
          },
          {
            type: "multipleChoice",
            prompt:
              "Which poem criticises institutional control in a city?",
            support:
              "The speaker notices ‘mind-forged manacles’.",
            options: [
              "London",
              "Checking Out Me History",
              "Poppies",
              "War Photographer"
            ],
            answer: 0,
            explanation:
              "Blake’s ‘London’ criticises oppression and institutional power.",
            hint:
              "The poem repeatedly uses the word ‘chartered’."
          },
          {
            type: "multipleChoice",
            prompt:
              "Which poem explores identity through rejected colonial history?",
            support:
              "The speaker challenges the history he was taught.",
            options: [
              "Checking Out Me History",
              "The Emigrée",
              "Kamikaze",
              "Tissue"
            ],
            answer: 0,
            explanation:
              "Agard’s ‘Checking Out Me History’ challenges colonial control of education.",
            hint:
              "The speaker repeats ‘Dem tell me’."
          }
        ]
      },
      {
        id: "poetry-comparison",
        type: "Comparison",
        title: "Comparison Builder",
        description:
          "Choose effective comparison points across power and conflict poems.",
        xp: 30,
        questions: [
          {
            type: "multipleChoice",
            prompt:
              "Which poem pairs effectively with ‘Ozymandias’ for the theme of power?",
            support:
              "Choose the poem that also questions human control.",
            options: [
              "Storm on the Island",
              "Poppies",
              "Kamikaze",
              "War Photographer"
            ],
            answer: 0,
            explanation:
              "Both poems explore the limits of human power against larger forces.",
            hint:
              "One poem focuses on the power of nature."
          },
          {
            type: "multipleChoice",
            prompt:
              "Which comparison sentence is strongest?",
            support:
              "Choose the sentence that compares both meaning and method.",
            options: [
              "Both poems are about power.",
              "Ozymandias is better than London.",
              "Both poets criticise power, but Shelley uses ruined imagery while Blake presents repeated urban oppression.",
              "The poems have words in them."
            ],
            answer: 2,
            explanation:
              "The sentence gives a clear conceptual comparison and refers to methods.",
            hint:
              "The best comparison includes what and how."
          },
          {
            type: "multipleChoice",
            prompt:
              "What should a comparison paragraph do?",
            support:
              "Choose the most complete answer.",
            options: [
              "Analyse only one poem",
              "Move between both poems around a shared idea",
              "List quotations without analysis",
              "Retell each poem"
            ],
            answer: 1,
            explanation:
              "A strong comparison paragraph links both poems through a shared idea.",
            hint:
              "Both poems should remain part of the discussion."
          },
          {
            type: "multipleChoice",
            prompt:
              "Which pair could be compared through memory and loss?",
            support:
              "Think about personal effects of conflict.",
            options: [
              "Poppies and Remains",
              "Ozymandias and London",
              "Exposure and Storm on the Island",
              "Tissue and The Prelude"
            ],
            answer: 0,
            explanation:
              "Both ‘Poppies’ and ‘Remains’ explore painful memories caused by conflict.",
            hint:
              "One centres on a mother; the other on a soldier."
          },
          {
            type: "multipleChoice",
            prompt:
              "Why is it useful to compare differences as well as similarities?",
            support:
              "Think about developing a thoughtful argument.",
            options: [
              "It creates a more precise and developed interpretation",
              "It avoids analysing language",
              "It reduces the number of ideas",
              "It guarantees full marks"
            ],
            answer: 0,
            explanation:
              "Differences allow you to develop a more nuanced comparison.",
            hint:
              "Strong arguments recognise that poems may approach a theme differently."
          }
        ]
      }
    ]
  },

  {
    id: "unseen-poetry",
    code: "UNS",
    title: "Unseen Poetry",
    description:
      "Build a reliable method for analysing unfamiliar poems under timed conditions.",
    colour: "#74d68c",
    activities: [
      {
        id: "unseen-method",
        type: "Method",
        title: "Unseen Poetry Method",
        description:
          "Practise a clear sequence for reading and analysing an unfamiliar poem.",
        xp: 20,
        questions: [
          {
            type: "multipleChoice",
            prompt:
              "What should you identify first when reading an unseen poem?",
            support:
              "Choose the most useful starting point.",
            options: [
              "The overall subject and message",
              "Every language technique",
              "The poet’s biography",
              "The rhyme scheme only"
            ],
            answer: 0,
            explanation:
              "Begin by understanding what the poem is about and what it may be saying.",
            hint:
              "Start with the big picture."
          },
          {
            type: "multipleChoice",
            prompt:
              "Why should you track changes across the poem?",
            support:
              "Think about tone, perspective and emotion.",
            options: [
              "To identify development and shifts",
              "To count every line",
              "To avoid discussing structure",
              "To find spelling mistakes"
            ],
            answer: 0,
            explanation:
              "Changes can reveal how ideas or emotions develop.",
            hint:
              "The speaker may not feel the same at the end."
          },
          {
            type: "multipleChoice",
            prompt:
              "Which quotation is best for close analysis?",
            support:
              "Choose the most manageable evidence.",
            options: [
              "A whole stanza",
              "A short, precise phrase",
              "The title only",
              "Every line in the poem"
            ],
            answer: 1,
            explanation:
              "A short quotation allows precise analysis of individual words.",
            hint:
              "Choose evidence you can zoom in on."
          },
          {
            type: "multipleChoice",
            prompt:
              "What does ‘zoom in’ mean in poetry analysis?",
            support:
              "Think about individual word choices.",
            options: [
              "Analyse the effect of a specific word or phrase",
              "Make the text larger",
              "Retell the whole poem",
              "Copy a longer quotation"
            ],
            answer: 0,
            explanation:
              "Zooming in means exploring the connotations and effects of precise language.",
            hint:
              "Focus closely on one detail."
          },
          {
            type: "multipleChoice",
            prompt:
              "What should your conclusion do?",
            support:
              "Choose the strongest approach.",
            options: [
              "Repeat the introduction exactly",
              "Summarise the poet’s overall message",
              "Introduce a completely new poem",
              "List techniques"
            ],
            answer: 1,
            explanation:
              "A conclusion should reinforce your interpretation of the poem’s overall message.",
             hint:
              "Return to the big idea."
          }
        ]
      }
    ]
  }
];