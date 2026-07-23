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
  },
    {
    type: "multipleChoice",
    prompt:
      "Why is the image of the serpent especially significant to a Jacobean audience?",
    support:
      "Think about the Bible.",
    options: [
      "It represents Scotland",
      "It symbolises temptation, deception and Satan",
      "It represents Macbeth's bravery",
      "It symbolises the king"
    ],
    answer: 1,
    explanation:
      "The serpent recalls Satan in the Garden of Eden, linking Lady Macbeth's plan with temptation and evil.",
    hint:
      "Think about Adam and Eve."
  },
  {
    type: "multipleChoice",
    prompt:
      "How does Lady Macbeth manipulate Macbeth?",
    support:
      "Think about how she attacks his identity.",
    options: [
      "She questions his intelligence",
      "She questions his masculinity",
      "She questions his loyalty to Scotland",
      "She questions his family"
    ],
    answer: 1,
    explanation:
      "Lady Macbeth questions Macbeth's masculinity to pressure him into murdering Duncan.",
    hint:
      "She repeatedly tells him what a 'real man' would do."
  },
  {
    type: "multipleChoice",
    prompt:
      "What does Macbeth mean when he says Lady Macbeth is 'too full o' the milk of human kindness'?",
    support:
      "Think about kindness rather than weakness.",
    options: [
      "She is too compassionate to act cruelly",
      "She drinks too much milk",
      "She is physically weak",
      "She is too young"
    ],
    answer: 0,
    explanation:
      "Macbeth believes kindness and compassion prevent someone from committing terrible crimes.",
    hint:
      "Focus on 'human kindness'."
  },
  {
    type: "multipleChoice",
    prompt:
      "What happens to Lady Macbeth after Duncan's murder?",
    support:
      "Compare her confidence at the beginning with later in the play.",
    options: [
      "She becomes more powerful",
      "She becomes overwhelmed by guilt",
      "She becomes Queen Regent",
      "She leaves Scotland"
    ],
    answer: 1,
    explanation:
      "Shakespeare gradually shows Lady Macbeth's confidence collapsing under the weight of guilt.",
    hint:
      "Think about the sleepwalking scene."
  },
  {
    type: "multipleChoice",
    prompt:
      "Which thesis would achieve the highest marks?",
    support:
      "Choose the answer that follows Lady Macbeth's development across the whole play.",
    options: [
      "Lady Macbeth is evil.",
      "Lady Macbeth wants Macbeth to become king.",
      "Shakespeare presents Lady Macbeth as a manipulative figure who rejects traditional femininity before showing guilt destroying her confidence.",
      "Lady Macbeth is Macbeth's wife."
    ],
    answer: 2,
    explanation:
      "This is a conceptual argument that covers the whole play rather than describing a single event.",
    hint:
      "The best thesis follows her journey from beginning to end."
  },
  {
    type: "multipleChoice",
    prompt:
      "What does Lady Macbeth mean when she tells Macbeth to 'look like the innocent flower'?",
    support:
      "Focus on how Macbeth should appear to other people.",
    options: [
      "He should behave kindly and hide his true intentions",
      "He should decorate the castle with flowers",
      "He should refuse to speak to Duncan",
      "He should leave Scotland immediately"
    ],
    answer: 0,
    explanation:
      "Lady Macbeth tells Macbeth to appear harmless and welcoming while secretly planning Duncan's murder.",
    hint:
      "Think about appearance versus reality."
  },
  {
    type: "multipleChoice",
    prompt:
      "What does the imperative verb 'look' show in Lady Macbeth's advice to Macbeth?",
    support:
      "An imperative is a command.",
    options: [
      "She is uncertain and nervous",
      "She is commanding and controlling",
      "She is asking Macbeth for permission",
      "She is apologising to Macbeth"
    ],
    answer: 1,
    explanation:
      "The imperative verb presents Lady Macbeth as dominant because she gives Macbeth direct instructions.",
    hint:
      "She is telling him what to do."
  },
  {
    type: "multipleChoice",
    prompt:
      "What does the word 'serpent' suggest about Lady Macbeth's plan?",
    support:
      "Think about the traditional associations of serpents.",
    options: [
      "It is innocent and natural",
      "It is deceptive, dangerous and evil",
      "It is brave and honourable",
      "It is peaceful and harmless"
    ],
    answer: 1,
    explanation:
      "The serpent suggests deception, danger and evil, linking Lady Macbeth's plan to temptation and moral corruption.",
    hint:
      "Think about Satan in the Garden of Eden."
  },
  {
    type: "multipleChoice",
    prompt:
      "Why is Lady Macbeth's use of imperatives important?",
    support:
      "Think about the power balance in her marriage.",
    options: [
      "They show that she is passive",
      "They show that Macbeth controls her",
      "They show that she takes control and directs Macbeth",
      "They show that she is confused"
    ],
    answer: 2,
    explanation:
      "Her repeated commands show that she initially dominates the relationship and drives the murder plot forward.",
    hint:
      "She gives orders rather than suggestions."
  },
  {
    type: "multipleChoice",
    prompt:
      "How does Shakespeare present Lady Macbeth's attitude towards femininity?",
    support:
      "Think about 'unsex me here'.",
    options: [
      "She fully accepts traditional feminine expectations",
      "She rejects qualities associated with femininity because she sees them as obstacles",
      "She wishes to become a mother",
      "She believes women should avoid power"
    ],
    answer: 1,
    explanation:
      "Lady Macbeth rejects compassion and tenderness because she believes these qualities will prevent her from committing violence.",
    hint:
      "She asks the spirits to remove them."
  },
  {
    type: "multipleChoice",
    prompt:
      "Why might Lady Macbeth have appeared threatening to a Jacobean audience?",
    support:
      "Think about expectations of women at the time.",
    options: [
      "She obeys her husband completely",
      "She remains silent throughout the play",
      "She challenges gender expectations and attempts to control her husband",
      "She refuses to become queen"
    ],
    answer: 2,
    explanation:
      "Her ambition, dominance and rejection of traditional femininity challenge Jacobean expectations of women as obedient and submissive.",
    hint:
      "She behaves in ways society did not expect from women."
  },
  {
    type: "multipleChoice",
    prompt:
      "What does Lady Macbeth's sleepwalking reveal?",
    support:
      "Think about the effect of guilt on her mind.",
    options: [
      "She has completely forgotten Duncan's murder",
      "She is secretly planning another murder",
      "Her guilt has become uncontrollable and damaged her psychologically",
      "She is pretending to be ill"
    ],
    answer: 2,
    explanation:
      "The sleepwalking scene shows that Lady Macbeth can no longer suppress her guilt, which has begun to destroy her mental stability.",
    hint:
      "Her mind reveals what she tried to hide."
  },
  {
    type: "multipleChoice",
    prompt:
      "How does Lady Macbeth change across the play?",
    support:
      "Compare her behaviour before and after Duncan's murder.",
    options: [
      "She begins weak and becomes more powerful",
      "She remains equally confident throughout",
      "She begins dominant and confident but becomes isolated and overwhelmed by guilt",
      "She becomes king after Macbeth dies"
    ],
    answer: 2,
    explanation:
      "Lady Macbeth initially appears forceful and controlled, but later guilt causes her confidence and mental stability to collapse.",
    hint:
      "Think about her journey from Act 1 to Act 5."
  },
  {
    type: "multipleChoice",
    prompt:
      "What does Lady Macbeth's decline suggest about ambition?",
    support:
      "Think about Shakespeare's wider message.",
    options: [
      "Ambition always leads to happiness",
      "Ambition is harmless when kept secret",
      "Ambition without morality can lead to guilt and destruction",
      "Ambition only affects men"
    ],
    answer: 2,
    explanation:
      "Through Lady Macbeth's decline, Shakespeare suggests that uncontrolled ambition and immoral actions bring psychological punishment.",
    hint:
      "Her success does not bring peace."
  },
  {
    type: "multipleChoice",
    prompt:
      "Which interpretation of Lady Macbeth is the most sophisticated?",
    support:
      "Choose the answer that explores complexity and change.",
    options: [
      "Lady Macbeth is simply evil from beginning to end.",
      "Lady Macbeth is powerful because she tells Macbeth what to do.",
      "Lady Macbeth initially appears powerful, but Shakespeare gradually reveals that her power depends on suppressing human emotion, which ultimately destroys her.",
      "Lady Macbeth is important because she is married to Macbeth."
    ],
    answer: 2,
    explanation:
      "This interpretation is sophisticated because it explores Lady Macbeth's apparent power, its limitations and her development across the play.",
    hint:
      "The strongest answer shows complexity rather than giving a simple label."
  },
  {
      type: "multipleChoice",
    prompt:
      "Which quotation shows Lady Macbeth rejecting traditional femininity?",
    support:
      "Think about one of her most famous soliloquies.",
    options: [
      "'Out, damned spot!'",
      "'Unsex me here'",
      "'Look like the innocent flower'",
      "'What's done is done'"
    ],
    answer: 1,
    explanation:
      "'Unsex me here' shows Lady Macbeth asking to be stripped of qualities she associates with femininity.",
    hint:
      "It begins with 'Un...'"
  },
  {
    type: "multipleChoice",
    prompt:
      "Which technique is used in 'Look like the innocent flower, but be the serpent under't'?",
    support:
      "Two contrasting images are placed together.",
    options: [
      "Simile",
      "Contrast",
      "Pathetic fallacy",
      "Hyperbole"
    ],
    answer: 1,
    explanation:
      "Shakespeare contrasts innocence with evil to emphasise deception.",
    hint:
      "Flower vs serpent."
  },
  {
    type: "multipleChoice",
    prompt:
      "What does the adjective 'innocent' suggest?",
    support:
      "Think about first impressions.",
    options: [
      "Violence",
      "Trustworthiness and purity",
      "Power",
      "Revenge"
    ],
    answer: 1,
    explanation:
      "Lady Macbeth wants Macbeth to appear completely harmless so no one suspects him.",
    hint:
      "Someone without guilt."
  },
  {
    type: "multipleChoice",
    prompt:
      "Which quotation best shows Lady Macbeth manipulating Macbeth?",
    support:
      "Think about masculinity.",
    options: [
      "'When you durst do it, then you were a man'",
      "'Fair is foul'",
      "'Is this a dagger...?'",
      "'None of woman born...'"
    ],
    answer: 0,
    explanation:
      "She attacks Macbeth's masculinity to pressure him into murdering Duncan.",
    hint:
      "It contains the word 'man'."
  },
  {
    type: "multipleChoice",
    prompt:
      "What is Lady Macbeth's greatest strength at the start of the play?",
    support:
      "Think about her personality.",
    options: [
      "Her physical strength",
      "Her determination",
      "Her kindness",
      "Her honesty"
    ],
    answer: 1,
    explanation:
      "Her determination drives the murder plot before guilt begins to weaken her.",
    hint:
      "She never gives up in Act 1."
  },
  {
    type: "multipleChoice",
    prompt:
      "Which quotation best shows Lady Macbeth's guilt?",
    support:
      "Think about the sleepwalking scene.",
    options: [
      "'Out, damned spot!'",
      "'Stars, hide your fires'",
      "'If chance will have me king'",
      "'Lesser than Macbeth'"
    ],
    answer: 0,
    explanation:
      "She imagines blood on her hands that she cannot remove, showing overwhelming guilt.",
    hint:
      "It mentions a spot."
  },
  {
    type: "multipleChoice",
    prompt:
      "Why is blood an important symbol for Lady Macbeth?",
    support:
      "Think beyond literal blood.",
    options: [
      "It symbolises guilt that cannot be escaped",
      "It symbolises wealth",
      "It symbolises nature",
      "It symbolises friendship"
    ],
    answer: 0,
    explanation:
      "Blood becomes a symbol of guilt and the lasting consequences of murder.",
    hint:
      "It stays with her."
  },
  {
    type: "multipleChoice",
    prompt:
      "Which statement best describes Lady Macbeth by the end of the play?",
    support:
      "Think about Act 5.",
    options: [
      "Confident and ambitious",
      "Powerful and respected",
      "Mentally broken by guilt",
      "Celebrated as Scotland's greatest queen"
    ],
    answer: 2,
    explanation:
      "Lady Macbeth's ambition has given way to overwhelming guilt and psychological collapse.",
    hint:
      "Compare her with Act 1."
  },
  {
    type: "multipleChoice",
    prompt:
      "Why is Lady Macbeth considered a tragic character?",
    support:
      "Think about how she changes.",
    options: [
      "She never changes.",
      "She causes her own downfall through ambition and guilt.",
      "She wins everything she wants.",
      "She is always innocent."
    ],
    answer: 1,
    explanation:
      "Although she begins as a powerful manipulator, her ambition ultimately contributes to her tragic downfall.",
    hint:
      "Think about the consequences of her choices."
  },
  {
    type: "multipleChoice",
    prompt:
      "Which conclusion would earn the highest marks?",
    support:
      "Choose the most conceptual answer.",
    options: [
      "Lady Macbeth is evil.",
      "Lady Macbeth changes.",
      "Through Lady Macbeth, Shakespeare warns that unchecked ambition and the rejection of morality ultimately destroy both power and peace of mind.",
      "Lady Macbeth is married to Macbeth."
    ],
    answer: 2,
    explanation:
      "This links character, theme and Shakespeare's message, creating a conceptual conclusion.",
    hint:
      "Look for the answer that explains Shakespeare's overall purpose."
  },
  {
  type: "multipleChoice",
  prompt: "What does Lady Macbeth believe will stop Macbeth from becoming king?",
  support: "Think about what she believes is his weakness.",
  options: [
    "His lack of intelligence",
    "His kindness and morality",
    "His age",
    "His loyalty to Banquo"
  ],
  answer: 1,
  explanation: "She believes Macbeth is 'too full o' the milk of human kindness' to murder Duncan.",
  hint: "She criticises his character."
},

{
  type: "multipleChoice",
  prompt: "Why does Lady Macbeth ask the spirits to 'unsex me here'?",
  support: "Think about gender expectations.",
  options: [
    "She wants to become physically male.",
    "She wants to remove feminine weakness.",
    "She wants to disguise herself.",
    "She wants to frighten Macbeth."
  ],
  answer: 1,
  explanation: "She rejects traditional femininity because she believes it prevents cruelty.",
  hint: "She wants to become ruthless."
},

{
  type: "multipleChoice",
  prompt: "What emotion dominates Lady Macbeth after Duncan's murder?",
  support: "Think about Act 2.",
  options: [
    "Joy",
    "Fear",
    "Calm determination",
    "Excitement"
  ],
  answer: 2,
  explanation: "She remains calm while Macbeth begins to panic.",
  hint: "She takes control."
},

{
  type: "multipleChoice",
  prompt: "Which quotation best shows Lady Macbeth manipulating Macbeth?",
  support: "Choose the strongest example.",
  options: [
    "Out, damned spot!",
    "When you durst do it, then you were a man.",
    "Tomorrow and tomorrow and tomorrow.",
    "Lay on, Macduff."
  ],
  answer: 1,
  explanation: "She attacks his masculinity to pressure him into murder.",
  hint: "She questions his courage."
},

{
  type: "multipleChoice",
  prompt: "Lady Macbeth's sleepwalking symbolises...",
  support: "Think beyond the literal action.",
  options: [
    "Physical illness",
    "Hidden guilt overwhelming her mind",
    "Old age",
    "A curse from the witches"
  ],
  answer: 1,
  explanation: "Her subconscious reveals the guilt she tried to suppress.",
  hint: "She cannot escape her conscience."
},

{
  type: "multipleChoice",
  prompt: "Why is Lady Macbeth's decline surprising?",
  support: "Compare her at the beginning and end.",
  options: [
    "She becomes kinder than Duncan.",
    "She changes from powerful to broken.",
    "She leaves Scotland.",
    "She joins Malcolm."
  ],
  answer: 1,
  explanation: "Shakespeare contrasts her early confidence with complete psychological collapse.",
  hint: "Think character development."
},

{
  type: "multipleChoice",
  prompt: "What is Shakespeare suggesting through Lady Macbeth's downfall?",
  support: "Think about the play's moral message.",
  options: [
    "Crime has lasting psychological consequences.",
    "Women should rule Scotland.",
    "Kings are always weak.",
    "Magic always wins."
  ],
  answer: 0,
  explanation: "Her guilt demonstrates that evil actions destroy the mind.",
  hint: "Actions have consequences."
},

{
  type: "multipleChoice",
  prompt: "Which theme is MOST closely linked to Lady Macbeth?",
  support: "Choose the best answer.",
  options: [
    "Love",
    "Ambition",
    "Nature",
    "Comedy"
  ],
  answer: 1,
  explanation: "Her ambition drives the plot and influences Macbeth's decisions.",
  hint: "It's one of the play's biggest ideas."
},

{
  type: "multipleChoice",
  prompt: "How would a Jacobean audience most likely react to Lady Macbeth?",
  support: "Think about beliefs in 1606.",
  options: [
    "They would admire her independence.",
    "They would see her as dangerous and unnatural.",
    "They would pity her immediately.",
    "They would find her funny."
  ],
  answer: 1,
  explanation: "A woman rejecting traditional gender roles would appear deeply threatening.",
  hint: "Consider Jacobean expectations."
},

{
  type: "multipleChoice",
  prompt: "Which Grade 9 idea best explains Lady Macbeth's character?",
  support: "Choose the most sophisticated interpretation.",
  options: [
    "She is simply evil.",
    "She represents how unchecked ambition destroys humanity.",
    "She only follows Macbeth.",
    "She enjoys being queen."
  ],
  answer: 1,
  explanation: "A top-grade response recognises that Shakespeare uses Lady Macbeth to explore ambition, power and moral corruption.",
  hint: "Think beyond 'good' or 'bad'."
}
]
},
      {
          id: "macbeth-quotes",
  type: "Quote Challenge",
  title: "Complete the Quote",
  description: "Complete key quotations from Macbeth.",
  questionsPerAttempt: 10,
        xp: 35,
        questions: [
            //Question 1
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

          //Question 2
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

          //Question 3
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

          //Question 4
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

          //Question 5
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

          //Question 6
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

          //Question 7
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

          //Question 8
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

          //Question 9
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

          //Question 10
          {
            type: "quoteInput",
            prompt: "Life’s but a walking ____.",
            support: "Macbeth responds to Lady Macbeth’s death with bleak nihilism.",
            answerText: "shadow",
            acceptedAnswers: ["shadow", "a shadow"],
            fullQuote: "Life’s but a walking shadow.",
            explanation: "The metaphor reduces life to something insubstantial and temporary, revealing the emptiness of Macbeth’s achievements.",
            hint: "It follows a person but has no substance of its own."
          },

          //Question 11
          {
  type: "quoteInput",
  prompt: "When you durst do it, then you were a ____.",
  support: "Lady Macbeth attacks Macbeth’s masculinity to pressure him into murdering Duncan.",
  answerText: "man",
  acceptedAnswers: ["man", "a man"],
  fullQuote: "When you durst do it, then you were a man.",
  explanation: "Lady Macbeth manipulates Macbeth by linking masculinity with violence and courage.",
  hint: "She questions whether Macbeth is truly masculine."
},

//Question 12
{
  type: "quoteInput",
  prompt: "False face must hide what the false ____ doth know.",
  support: "Macbeth resolves to disguise his true intentions after deciding to murder Duncan.",
  answerText: "heart",
  acceptedAnswers: ["heart", "the heart"],
  fullQuote: "False face must hide what the false heart doth know.",
  explanation: "The repetition of 'false' emphasises deception and the split between Macbeth's outward appearance and inner thoughts.",
  hint: "Which part of the body represents his true feelings?"
},

//Question 13
{
  type: "quoteInput",
  prompt: "None of woman born shall ____ Macbeth.",
  support: "The witches' prophecy gives Macbeth false confidence before the final battle.",
  answerText: "harm",
  acceptedAnswers: ["harm"],
  fullQuote: "None of woman born shall harm Macbeth.",
  explanation: "Macbeth misunderstands the prophecy, believing himself to be invincible.",
  hint: "The prophecy suggests nobody can do this to Macbeth."
},

//Question 14
{
  type: "quoteInput",
  prompt: "Out, out, brief ____!",
  support: "Macbeth reflects on the meaninglessness of life after Lady Macbeth's death.",
  answerText: "candle",
  acceptedAnswers: ["candle", "the candle"],
  fullQuote: "Out, out, brief candle!",
  explanation: "The candle symbolises the fragility and shortness of life.",
  hint: "Think of something small that gives light."
},

//Question 15
{
  type: "quoteInput",
  prompt: "By the pricking of my ____, something wicked this way comes.",
  support: "The Second Witch senses Macbeth approaching after his transformation into a tyrant.",
  answerText: "thumbs",
  acceptedAnswers: ["thumbs", "thumb"],
  fullQuote: "By the pricking of my thumbs, something wicked this way comes.",
  explanation: "The witches now describe Macbeth himself as 'wicked', showing how completely he has changed.",
  hint: "It's part of the hand."
},

//Question 16
{
  type: "quoteInput",
  prompt: "Tomorrow, and tomorrow, and ____.",
  support: "Macbeth laments the repetitive, empty nature of life near the end of the play.",
  answerText: "tomorrow",
  acceptedAnswers: ["tomorrow"],
  fullQuote: "Tomorrow, and tomorrow, and tomorrow.",
  explanation: "The repetition creates a slow, monotonous rhythm that reflects Macbeth's despair and hopelessness.",
  hint: "The same word is repeated three times."
},

//Question 17
{
  type: "quoteInput",
  prompt: "Sleep no more! Macbeth does murder ____.",
  support: "After killing Duncan, Macbeth believes he has destroyed his own peace forever.",
  answerText: "sleep",
  acceptedAnswers: ["sleep"],
  fullQuote: "Sleep no more! Macbeth does murder sleep.",
  explanation: "Sleep symbolises innocence and peace. Macbeth realises that guilt will haunt him for the rest of his life.",
  hint: "What peaceful human activity has Macbeth destroyed?"
},

//Question 18
{
  type: "quoteInput",
  prompt: "Methought I heard a voice cry, 'Sleep no more! Macbeth does murder ____.'",
  support: "Macbeth hears an imagined voice immediately after Duncan's murder.",
  answerText: "sleep",
  acceptedAnswers: ["sleep"],
  fullQuote: "Sleep no more! Macbeth does murder sleep.",
  explanation: "The repeated image reinforces Shakespeare's idea that guilt destroys inner peace.",
  hint: "Same missing word as Question 17."
},

//Question 19
{
  type: "quoteInput",
  prompt: "A little ____ clears us of this deed.",
  support: "Lady Macbeth believes guilt can simply be washed away.",
  answerText: "water",
  acceptedAnswers: ["water"],
  fullQuote: "A little water clears us of this deed.",
  explanation: "Lady Macbeth underestimates the psychological effects of guilt, making her later breakdown even more tragic.",
  hint: "What does she think will remove the evidence?"
},

//Question 20
{
  type: "quoteInput",
  prompt: "What's done cannot be ____.",
  support: "Lady Macbeth sleepwalks, haunted by memories of Duncan's murder.",
  answerText: "undone",
  acceptedAnswers: ["undone"],
  fullQuote: "What's done cannot be undone.",
  explanation: "Lady Macbeth finally accepts that actions have permanent consequences.",
  hint: "She realises there is no way to reverse the past."
},

//Question 21
{
  type: "quoteInput",
  prompt: "I have no spur to prick the sides of my intent, but only vaulting ____.",
  support: "Macbeth admits he has no good reason to murder Duncan.",
  answerText: "ambition",
  acceptedAnswers: ["ambition"],
  fullQuote: "I have no spur to prick the sides of my intent, but only vaulting ambition.",
  explanation: "Shakespeare identifies unchecked ambition as Macbeth's fatal flaw.",
  hint: "It's the play's central tragic flaw."
},

//Question 22
{
  type: "quoteInput",
  prompt: "Come, you spirits... unsex me ____.",
  support: "Lady Macbeth calls upon evil spirits to remove her compassion.",
  answerText: "here",
  acceptedAnswers: ["here"],
  fullQuote: "Come, you spirits... unsex me here.",
  explanation: "Lady Macbeth rejects traditional femininity in pursuit of power.",
  hint: "One short word completes the famous quotation."
},

//Question 23
{
  type: "quoteInput",
  prompt: "Come, thick ____.",
  support: "Lady Macbeth calls for darkness to hide the murder she is planning.",
  answerText: "night",
  acceptedAnswers: ["night"],
  fullQuote: "Come, thick night.",
  explanation: "Darkness symbolises evil, secrecy and the concealment of sin.",
  hint: "She wants darkness to fall."
},

//Question 24
{
  type: "quoteInput",
  prompt: "Upon my head they placed a fruitless ____.",
  support: "Macbeth reflects that he has no heir to inherit his throne.",
  answerText: "crown",
  acceptedAnswers: ["crown"],
  fullQuote: "Upon my head they placed a fruitless crown.",
  explanation: "The image highlights Macbeth's insecurity and fear that Banquo's descendants will become kings.",
  hint: "What symbol of kingship is 'fruitless'?"
},

//Question 25
{
  type: "quoteInput",
  prompt: "And put a barren ____ in my gripe.",
  support: "Macbeth continues his complaint about having no dynasty.",
  answerText: "sceptre",
  acceptedAnswers: ["sceptre", "scepter"],
  fullQuote: "And put a barren sceptre in my gripe.",
  explanation: "The barren sceptre symbolises a kingship that will not continue through Macbeth's family.",
  hint: "It is the ceremonial staff carried by a monarch."
},

//Question 26
{
  type: "quoteInput",
  prompt: "Macbeth shall never vanquished be until Great Birnam Wood to high Dunsinane Hill shall come against ____.",
  support: "The witches give Macbeth another misleading prophecy.",
  answerText: "him",
  acceptedAnswers: ["him"],
  fullQuote: "Macbeth shall never vanquished be until Great Birnam Wood to high Dunsinane Hill shall come against him.",
  explanation: "Macbeth wrongly believes this prophecy is impossible, making him dangerously overconfident.",
  hint: "The prophecy says the forest will come against who?"
},

//Question 27
{
  type: "quoteInput",
  prompt: "The instruments of darkness tell us ____.",
  support: "Banquo warns Macbeth not to trust the witches completely.",
  answerText: "truths",
  acceptedAnswers: ["truths", "the truth", "truth"],
  fullQuote: "The instruments of darkness tell us truths.",
  explanation: "Banquo recognises that evil can mix truth with lies in order to tempt people towards destruction.",
  hint: "What do the witches sometimes tell?"
},

//Question 28
{
  type: "quoteInput",
  prompt: "To betray's in deepest consequence our ____.",
  support: "Macbeth reflects on why Duncan should not be murdered.",
  answerText: "judgement",
  acceptedAnswers: ["judgement", "judgment"],
  fullQuote: "To betray's in deepest consequence our judgement.",
  explanation: "Macbeth knows that committing evil brings moral consequences.",
  hint: "Think about morality and consequences."
},

//Question 29
{
  type: "quoteInput",
  prompt: "There's no art to find the mind's construction in the ____.",
  support: "Duncan explains how difficult it is to judge a person's true character.",
  answerText: "face",
  acceptedAnswers: ["face", "the face"],
  fullQuote: "There's no art to find the mind's construction in the face.",
  explanation: "Shakespeare introduces the theme of appearance versus reality long before Duncan is murdered.",
  hint: "What part of a person can be deceptive?"
},

//Question 30
{
  type: "quoteInput",
  prompt: "Be innocent of the knowledge, dearest ____.",
  support: "Macbeth hides his plans to murder Banquo from Lady Macbeth.",
  answerText: "chuck",
  acceptedAnswers: ["chuck"],
  fullQuote: "Be innocent of the knowledge, dearest chuck.",
  explanation: "Macbeth has become independent and secretive, reversing the power dynamic in their relationship.",
  hint: "It's an affectionate nickname."
},

//Question 31
{
  type: "quoteInput",
  prompt: "Cabined, cribbed, confined, ____.",
  support: "Macbeth feels trapped by fear after becoming king.",
  answerText: "bound",
  acceptedAnswers: ["bound"],
  fullQuote: "Cabined, cribbed, confined, bound.",
  explanation: "The list of restrictive words reflects Macbeth's growing paranoia.",
  hint: "The final word also suggests being unable to escape."
},

//Question 32
{
  type: "quoteInput",
  prompt: "Bleed, bleed, poor ____!",
  support: "Macduff mourns for Scotland under Macbeth's rule.",
  answerText: "country",
  acceptedAnswers: ["country", "scotland"],
  fullQuote: "Bleed, bleed, poor country!",
  explanation: "Macduff personifies Scotland as a wounded victim suffering under tyranny.",
  hint: "Who is suffering because of Macbeth?"
},

//Question 33
{
  type: "quoteInput",
  prompt: "Front to front bring thou this fiend of Scotland and ____.",
  support: "Macduff prepares to confront Macbeth in the final battle.",
  answerText: "myself",
  acceptedAnswers: ["myself"],
  fullQuote: "Front to front bring thou this fiend of Scotland and myself.",
  explanation: "Macduff sees Macbeth as evil itself and accepts responsibility for defeating him.",
  hint: "Who does Macduff want brought face to face with Macbeth?"
},

//Question 34
{
  type: "quoteInput",
  prompt: "Macduff was from his mother's womb untimely ____.",
  support: "Macduff reveals why the witches' prophecy does not protect Macbeth.",
  answerText: "ripped",
  acceptedAnswers: ["ripped"],
  fullQuote: "Macduff was from his mother's womb untimely ripped.",
  explanation: "The final prophecy is fulfilled through careful wording rather than supernatural impossibility.",
  hint: "How was Macduff born?"
},

//Question 35
{
  type: "quoteInput",
  prompt: "Turn, hell-hound, ____!",
  support: "Macduff challenges Macbeth during their final confrontation.",
  answerText: "turn",
  acceptedAnswers: ["turn"],
  fullQuote: "Turn, hell-hound, turn!",
  explanation: "Macduff compares Macbeth to a creature from Hell, emphasising how far he has fallen.",
  hint: "The same word appears twice."
},

//Question 36
{
  type: "quoteInput",
  prompt: "This dead butcher and his fiend-like ____.",
  support: "Malcolm judges Macbeth and Lady Macbeth after their deaths.",
  answerText: "queen",
  acceptedAnswers: ["queen"],
  fullQuote: "This dead butcher and his fiend-like queen.",
  explanation: "Malcolm's final judgement sums up Shakespeare's moral message about tyranny and evil.",
  hint: "Who is described as fiend-like?"
},

//Question 37
{
  type: "quoteInput",
  prompt: "If chance will have me king, why, chance may ____ me.",
  support: "Macbeth initially considers letting fate take its course.",
  answerText: "crown",
  acceptedAnswers: ["crown"],
  fullQuote: "If chance will have me king, why, chance may crown me.",
  explanation: "At first Macbeth is prepared to let fate decide, showing how his ambition develops over time.",
  hint: "What might fate do to Macbeth?"
},

//Question 38
{
  type: "quoteInput",
  prompt: "Nothing is but what is not.",
  support: "Macbeth struggles to distinguish reality from imagination after hearing the witches.",
  answerText: "not",
  acceptedAnswers: ["not"],
  fullQuote: "Nothing is but what is not.",
  explanation: "The paradox reflects Macbeth's confused state of mind and the play's theme of appearance versus reality.",
  hint: "The missing word is repeated."
},

//Question 39
{
  type: "quoteInput",
  prompt: "Yet do I fear thy nature; it is too full o' the milk of human ____.",
  support: "Lady Macbeth doubts Macbeth's ruthlessness.",
  answerText: "kindness",
  acceptedAnswers: ["kindness"],
  fullQuote: "Yet do I fear thy nature; it is too full o' the milk of human kindness.",
  explanation: "Lady Macbeth believes compassion is a weakness that will stop Macbeth seizing power.",
  hint: "What quality does Lady Macbeth think Macbeth has too much of?"
},

//Question 40
{
  type: "quoteInput",
  prompt: "Come to my woman's breasts, and take my ____ for gall.",
  support: "Lady Macbeth rejects her femininity to gain cruelty.",
  answerText: "milk",
  acceptedAnswers: ["milk"],
  fullQuote: "Come to my woman's breasts, and take my milk for gall.",
  explanation: "Milk symbolises nurture, which Lady Macbeth wishes to replace with bitterness and cruelty.",
  hint: "What normally comes from a mother's breast?"
},

//Question 41
{
  type: "quoteInput",
  prompt: "Screw your courage to the sticking-place, and we'll not ____.",
  support: "Lady Macbeth persuades Macbeth to kill Duncan.",
  answerText: "fail",
  acceptedAnswers: ["fail"],
  fullQuote: "Screw your courage to the sticking-place, and we'll not fail.",
  explanation: "Lady Macbeth appears confident and determined, contrasting Macbeth's hesitation.",
  hint: "What does Lady Macbeth insist won't happen?"
},

//Question 42
{
  type: "quoteInput",
  prompt: "Had he not resembled my father as he slept, I had done ____.",
  support: "Lady Macbeth admits she could not kill Duncan herself.",
  answerText: "it",
  acceptedAnswers: ["it"],
  fullQuote: "Had he not resembled my father as he slept, I had done it.",
  explanation: "This brief moment reveals Lady Macbeth's remaining humanity.",
  hint: "A tiny one-word answer."
},

//Question 43
{
  type: "quoteInput",
  prompt: "O, horror, horror, horror! Tongue nor heart cannot conceive nor ____ thee!",
  support: "Macduff discovers Duncan's body.",
  answerText: "name",
  acceptedAnswers: ["name"],
  fullQuote: "O, horror, horror, horror! Tongue nor heart cannot conceive nor name thee!",
  explanation: "Macduff's repetition conveys genuine shock and the scale of Duncan's murder.",
  hint: "He cannot even describe it."
},

//Question 44
{
  type: "quoteInput",
  prompt: "There's daggers in men's ____.",
  support: "Donalbain fears betrayal after Duncan's murder.",
  answerText: "smiles",
  acceptedAnswers: ["smiles", "smile"],
  fullQuote: "There's daggers in men's smiles.",
  explanation: "The metaphor reinforces the theme that appearances can hide deadly intentions.",
  hint: "Think of a facial expression."
},

//Question 45
{
  type: "quoteInput",
  prompt: "Be bloody, bold, and resolute; laugh to scorn the power of ____.",
  support: "The witches' apparition encourages Macbeth's false confidence.",
  answerText: "man",
  acceptedAnswers: ["man"],
  fullQuote: "Be bloody, bold, and resolute; laugh to scorn the power of man.",
  explanation: "The prophecy manipulates Macbeth into believing no ordinary person can defeat him.",
  hint: "Who does Macbeth think cannot harm him?"
},

//Question 46
{
  type: "quoteInput",
  prompt: "The castle of Macduff I will surprise... give to the edge o' the sword his wife, his babes, and all unfortunate ____.",
  support: "Macbeth orders the slaughter of Macduff's family.",
  answerText: "souls",
  acceptedAnswers: ["souls", "soul"],
  fullQuote: "Give to the edge o' the sword his wife, his babes, and all unfortunate souls.",
  explanation: "This order demonstrates Macbeth's complete descent into tyranny.",
  hint: "A word referring to people or spirits."
},

//Question 47
{
  type: "quoteInput",
  prompt: "All the perfumes of ____ will not sweeten this little hand.",
  support: "Lady Macbeth's guilt overwhelms her during the sleepwalking scene.",
  answerText: "Arabia",
  acceptedAnswers: ["arabia"],
  fullQuote: "All the perfumes of Arabia will not sweeten this little hand.",
  explanation: "The hyperbole shows that nothing can erase Lady Macbeth's guilt.",
  hint: "A famous region associated with spices and perfumes."
},

//Question 48
{
  type: "quoteInput",
  prompt: "Lay on, Macduff, and damned be him that first cries, 'Hold, enough!'",
  support: "Macbeth refuses to surrender in the final battle.",
  answerText: "Hold",
  acceptedAnswers: ["hold"],
  fullQuote: "Lay on, Macduff, and damned be him that first cries, 'Hold, enough!'",
  explanation: "Even at the end, Macbeth clings to his warrior identity.",
  hint: "It's the first word inside the quotation marks."
},

//Question 49
{
  type: "quoteInput",
  prompt: "Angels are bright still, though the brightest fell.",
  support: "Malcolm warns Macduff that appearances can deceive.",
  answerText: "fell",
  acceptedAnswers: ["fell", "fallen"],
  fullQuote: "Angels are bright still, though the brightest fell.",
  explanation: "The allusion to Lucifer reinforces the theme that evil can hide behind beauty.",
  hint: "What happened to the brightest angel?"
},

//Question 50
{
  type: "quoteInput",
  prompt: "This tyrant, whose sole name blisters our ____.",
  support: "Malcolm describes the fear Macbeth has created across Scotland.",
  answerText: "tongues",
  acceptedAnswers: ["tongues", "tongue"],
  fullQuote: "This tyrant, whose sole name blisters our tongues.",
  explanation: "Malcolm shows that Macbeth has become so feared that even speaking his name is painful.",
  hint: "What do we use to speak?"
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
            //Question 11
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

          //Question 12
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

          //Question 13
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

          //Question 14
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

          //Question 15
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
            //Question 16
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

          //Question 17
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

          //Question 18
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

          //Question 19
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

          //Question 20
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

          //Question 21
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

          //Question 22
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

          //Question23
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

          //Question 24
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

          //Question 25
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

            //Question 26
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

          //Question 27
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

          //Question 28
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

          //Question 29
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

          //Question 30
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
            //Question 31
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

          //Question 32
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

          //Question 33
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

          //Question 34
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

          //Question 35
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
            //Question 36
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

          //Question 37
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

          //Question 38
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

          //Question 39
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

          //Question 1
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