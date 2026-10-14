const screens = {
  welcome: document.querySelector("#welcome-screen"),
  mode: document.querySelector("#mode-screen"),
  quiz: document.querySelector("#quiz-screen"),
  results: document.querySelector("#results-screen"),
};

const subjectNames = { web: "Web Development", ml: "Machine Learning" };
const modeNames = { identification: "Identification", multiple: "Multiple choice" };
const state = {
  subject: null,
  mode: null,
  questions: [],
  results: [],
  roundQuestions: [],
  skippedQuestions: new Set(),
  answered: false,
};

function setTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  const toggle = document.querySelector("#theme-toggle");
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";
  toggle.setAttribute("aria-label", label);
  toggle.setAttribute("title", label);
  toggle.setAttribute("aria-pressed", String(isDark));
  document.querySelector("#theme-icon").textContent = isDark ? "☀" : "☾";
  toggle.querySelector(".theme-toggle-label").textContent = isDark ? "Light mode" : "Dark mode";
}

function loadTheme() {
  try {
    return localStorage.getItem("webelect-theme") === "dark" ? "dark" : "light";
  } catch (error) {
    console.warn("Could not load the saved WebElect theme preference.", error);
    return "light";
  }
}

setTheme(loadTheme());
const allQuestions = Object.values(window.quizQuestions ?? {}).flatMap(
  (subject) => subject.multiple ?? [],
);
document.querySelector("#total-question-count").textContent = String(allQuestions.length);
document.querySelector("#study-topic-count").textContent = String(
  new Set(allQuestions.map((question) => question.category)).size,
);
document.querySelector("#theme-toggle").addEventListener("click", () => {
  const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(theme);
  try {
    localStorage.setItem("webelect-theme", theme);
  } catch (error) {
    console.warn("Could not save the WebElect theme preference.", error);
  }
});

function showScreen(name) {
  Object.entries(screens).forEach(([screenName, screen]) => {
    screen.hidden = screenName !== name;
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function normalizeAnswer(answer) {
  return answer.trim().toLocaleLowerCase().replace(/\s+/g, " ");
}

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function populateTopicFilter(subject) {
  const topicFilter = document.querySelector("#topic-filter");
  const questions = window.quizQuestions?.[subject]?.multiple ?? [];
  const topicCounts = new Map();
  questions.forEach((question) => {
    topicCounts.set(question.category, (topicCounts.get(question.category) ?? 0) + 1);
  });

  topicFilter.replaceChildren();
  const allTopicsOption = document.createElement("option");
  allTopicsOption.value = "";
  allTopicsOption.textContent = `All topics (${questions.length} questions)`;
  topicFilter.append(allTopicsOption);
  topicCounts.forEach((count, category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = `${category} (${count} questions)`;
    topicFilter.append(option);
  });
  updateTopicQuestionCount();
}

function updateTopicQuestionCount() {
  const topic = document.querySelector("#topic-filter").value;
  const questions = window.quizQuestions?.[state.subject]?.multiple ?? [];
  const count = topic
    ? questions.filter((question) => question.category === topic).length
    : questions.length;
  document.querySelector("#topic-question-count").textContent =
    `${count} ${count === 1 ? "question" : "questions"} in this round`;
}

function updateRoundStatus() {
  const correctCount = state.results.filter((result) => result.isCorrect).length;
  const reviewCount = state.results.length - correctCount;
  const skippedCount = state.skippedQuestions.size;
  document.querySelector("#round-status").textContent =
    `${correctCount} correct · ${reviewCount} to review · ${skippedCount} skipped`;
}

function startQuiz(mode, questionSet = null) {
  const availableQuestions = window.quizQuestions?.[state.subject]?.[mode] ?? [];
  const selectedTopic = document.querySelector("#topic-filter").value;
  const topicQuestions = selectedTopic
    ? availableQuestions.filter((question) => question.category === selectedTopic)
    : availableQuestions;
  const questions = questionSet ?? topicQuestions;
  if (!Array.isArray(questions) || questions.length === 0) {
    const availability = document.querySelector("#identification-availability");
    availability.hidden = false;
    return;
  }

  state.mode = mode;
  state.roundQuestions = [...questions];
  state.questions = shuffle(questions);
  state.results = [];
  state.skippedQuestions = new Set();
  state.answered = false;
  document.querySelector("#quiz-subject").textContent = subjectNames[state.subject];
  document.querySelector("#quiz-mode").textContent = modeNames[mode];
  document.querySelector("#question-total").textContent = String(state.questions.length);
  updateRoundStatus();
  showScreen("quiz");
  renderQuestion();
}

function renderQuestion() {
  const question = state.questions[0];
  const form = document.querySelector("#answer-form");
  const feedback = document.querySelector("#answer-feedback");
  const inputArea = document.querySelector("#answer-input");
  const progress = document.querySelector(".progress-track");
  const progressValue = Math.round((state.results.length / state.roundQuestions.length) * 100);

  state.answered = false;
  document.querySelector("#question-current").textContent = String(state.results.length);
  document.querySelector("#question-text").textContent = question.question;
  document.querySelector("#question-category").textContent = question.category ?? "";
  const visual = document.querySelector("#question-visual");
  if (question.image) {
    visual.innerHTML = `
      <span class="visual-label">CODE EXAMPLE</span>
      <img src="${escapeAttribute(question.image)}" alt="${escapeAttribute(question.imageAlt)}" />`;
    visual.hidden = false;
  } else {
    visual.hidden = true;
    visual.replaceChildren();
  }
  progress.setAttribute("aria-valuenow", String(progressValue));
  progress.querySelector(".progress-fill").style.width = `${progressValue}%`;
  feedback.hidden = true;
  feedback.textContent = "";
  document.querySelector("#answer-button").hidden = false;
  document.querySelector("#next-button").hidden = true;
  const skipButton = document.querySelector("#skip-button");
  skipButton.hidden = state.questions.length <= 1;
  skipButton.disabled = false;
  if (state.skippedQuestions.has(question)) {
    feedback.className = "answer-feedback is-reminder";
    feedback.textContent = "Skipped earlier—give it a try before you finish this round.";
    feedback.hidden = false;
  }

  if (state.mode === "identification") {
    inputArea.innerHTML = `
      <label class="answer-label" for="identification-answer">YOUR ANSWER</label>
      <input class="text-answer" id="identification-answer" name="answer" type="text"
        placeholder="Type what you remember..." autocomplete="off" required />
      <p class="input-hint">${
        question.requireOneSentence
          ? "Name one principle and explain it in exactly one sentence."
          : "Spelling counts, but capitalization doesn’t."
      }</p>`;
    inputArea.querySelector("input").focus();
  } else {
    const choices = shuffle(question.choices);
    inputArea.innerHTML = `<fieldset class="choice-list">
      <legend class="answer-label">CHOOSE ONE</legend>
      ${choices
        .map(
          (choice, index) => `
            <label class="choice-option">
              <input type="radio" name="answer" value="${escapeAttribute(choice)}" required />
              <span class="choice-letter">${String.fromCharCode(65 + index)}</span>
              <span class="choice-text">${escapeHTML(choice)}</span>
              <span class="choice-check" aria-hidden="true">✓</span>
            </label>`,
        )
        .join("")}
    </fieldset>`;
  }

  form.setAttribute("aria-label", `${modeNames[state.mode]} answer`);
}

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return entities[character];
  });
}

function escapeAttribute(value) {
  return escapeHTML(value);
}

function submitAnswer(event) {
  event.preventDefault();
  if (state.answered) return;

  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const question = state.questions[0];
  const formData = new FormData(form);
  const answer = String(formData.get("answer") ?? "").trim();
  const correctAnswers = state.mode === "identification" ? question.answers : [question.answer];
  const normalizedAnswer = normalizeAnswer(answer);
  const matchedAnswer = correctAnswers.find((correct) => {
    const normalizedCorrect = normalizeAnswer(correct);
    return question.requireOneSentence
      ? normalizedAnswer.includes(normalizedCorrect)
      : normalizedCorrect === normalizedAnswer;
  });
  const sentenceCount = answer.split(/[.!?]+/).filter((sentence) => sentence.trim()).length;
  const hasSentenceEnding = /[.!?]["')\]]*$/.test(answer);
  const wordCount = answer.split(/\s+/).filter(Boolean).length;
  const isOneSentence =
    !question.requireOneSentence ||
    (sentenceCount === 1 && hasSentenceEnding && wordCount >= question.minimumWords);
  const isCorrect = Boolean(matchedAnswer) && isOneSentence;
  const reviewAnswers = question.requireOneSentence ? [matchedAnswer ?? correctAnswers[0]] : correctAnswers;

  state.results.push({
    question: question.question,
    category: question.category ?? "",
    answer,
    correctAnswers: reviewAnswers,
    acceptedAnswers: correctAnswers,
    requireOneSentence: Boolean(question.requireOneSentence),
    isCorrect,
    questionData: question,
  });
  state.skippedQuestions.delete(question);
  state.answered = true;
  document.querySelector("#question-current").textContent = String(state.results.length);
  form.querySelectorAll("input").forEach((input) => {
    input.disabled = true;
  });

  const feedback = document.querySelector("#answer-feedback");
  feedback.className = `answer-feedback ${isCorrect ? "is-correct" : "is-incorrect"}`;
  feedback.innerHTML = isCorrect
    ? `<strong>That’s right!</strong> ${question.hint ? escapeHTML(question.hint) : "You recognized the key idea. Keep going!"}`
    : question.requireOneSentence
      ? `<strong>Not quite—and that’s okay.</strong> Include one of these principles: ${correctAnswers
          .map(escapeHTML)
          .join(", ")}. Explain it in one sentence ending with a period.`
      : `<strong>Not quite—and that’s okay.</strong> The correct answer is <b>${escapeHTML(correctAnswers[0])}</b>. ${
          question.hint
            ? escapeHTML(question.hint)
            : `Review this ${escapeHTML(question.category ?? "topic")} concept, then try it again.`
        }`;
  feedback.hidden = false;
  updateRoundStatus();
  document.querySelector("#answer-button").hidden = true;
  document.querySelector("#next-button").hidden = false;
  document.querySelector("#skip-button").hidden = true;
  document.querySelector("#next-button").focus();
}

function showNextQuestion() {
  if (!state.answered) return;
  state.questions.shift();
  if (state.questions.length > 0) {
    renderQuestion();
    if (state.mode === "multiple") {
      document.querySelector(".choice-option input")?.focus();
    }
    return;
  }
  showResults();
}

function skipQuestion() {
  if (state.answered || state.questions.length <= 1) return;
  const question = state.questions.shift();
  state.questions.push(question);
  state.skippedQuestions.add(question);
  renderQuestion();
  if (state.mode === "multiple") {
    document.querySelector(".choice-option input")?.focus();
  }
}

function showResults() {
  const correctCount = state.results.filter((result) => result.isCorrect).length;
  const total = state.results.length;
  const percent = Math.round((correctCount / total) * 100);
  const missedCount = total - correctCount;

  document.querySelector("#score-percent").textContent = `${percent}%`;
  document.querySelector("#score-fraction").textContent = `${correctCount} / ${total} correct`;
  document.querySelector("#score-ring").style.setProperty("--score", `${percent}%`);
  document.querySelector("#results-title").textContent =
    percent === 100
      ? "Perfect sprint!"
      : percent >= 80
        ? "Look at you go!"
        : percent >= 60
          ? "You’re building momentum!"
          : "Good first step!";
  document.querySelector("#results-subtitle").textContent =
    `${subjectNames[state.subject]} · ${modeNames[state.mode]}. Every round helps it stick.`;
  document.querySelector("#score-message").textContent =
    missedCount === 0
      ? "You got every question right. Try another topic to keep learning."
      : `${missedCount} ${missedCount === 1 ? "question" : "questions"} to revisit. Focus on those topics in your next round.`;
  document.querySelector("#review-count").textContent = `${missedCount} TO REVIEW`;
  const missedTopics = [...new Set(
    state.results.filter((result) => !result.isCorrect).map((result) => result.category),
  )];
  const topicReview = document.querySelector("#topic-review");
  topicReview.hidden = missedTopics.length === 0;
  topicReview.innerHTML = missedTopics.length
    ? `<strong>Topics to revisit</strong><span>${missedTopics.map(escapeHTML).join("</span><span>")}</span>`
    : "";
  document.querySelector("[data-retry-missed]").hidden = missedCount === 0;
  document.querySelector("#answer-review").innerHTML = state.results
    .map(
      (result, index) => `
        <article class="review-item ${result.isCorrect ? "review-correct" : "review-incorrect"}">
          <span class="review-mark" aria-hidden="true">${result.isCorrect ? "✓" : "×"}</span>
          <div class="review-copy">
            <span class="review-question-number">QUESTION ${String(index + 1).padStart(2, "0")}</span>
            ${result.category ? `<span class="review-category">${escapeHTML(result.category)}</span>` : ""}
            <h3>${escapeHTML(result.question)}</h3>
            <p>Your answer: <strong>${escapeHTML(result.answer)}</strong></p>
            <p class="correct-answer">${result.isCorrect ? "Answer" : "Correct answer"}: <strong>${
              result.requireOneSentence
                ? result.acceptedAnswers.map(escapeHTML).join(", ")
                : escapeHTML(result.correctAnswers[0])
            }</strong></p>
            ${result.questionData.hint ? `<p class="review-explanation">${escapeHTML(result.questionData.hint)}</p>` : ""}
          </div>
          <span class="review-result">${result.isCorrect ? "CORRECT" : "REVIEW"}</span>
        </article>`,
    )
    .join("");
  showScreen("results");
}

function returnHome() {
  state.subject = null;
  state.mode = null;
  state.questions = [];
  state.roundQuestions = [];
  state.results = [];
  state.skippedQuestions.clear();
  showScreen("welcome");
}

document.querySelectorAll("[data-subject]").forEach((button) => {
  button.addEventListener("click", () => {
    state.subject = button.dataset.subject;
    document.querySelector("#selected-subject-label").textContent = subjectNames[state.subject].toUpperCase();
    populateTopicFilter(state.subject);
    const identificationAvailable =
      (window.quizQuestions?.[state.subject]?.identification?.length ?? 0) > 0;
    const identificationButton = document.querySelector('[data-mode="identification"]');
    identificationButton.disabled = !identificationAvailable;
    identificationButton.hidden = !identificationAvailable;
    document.querySelector(".mode-grid").classList.toggle("single-mode", !identificationAvailable);
    document.querySelector("#identification-availability").hidden = identificationAvailable;
    showScreen("mode");
  });
});

document.querySelectorAll("[data-mode]").forEach((button) => {
  button.addEventListener("click", () => startQuiz(button.dataset.mode));
});

document.querySelectorAll('[data-go="welcome"], [data-home]').forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    returnHome();
  });
});

document.querySelector('[data-go="mode"]').addEventListener("click", () => showScreen("mode"));
document.querySelector("#answer-form").addEventListener("submit", submitAnswer);
document.querySelector("#next-button").addEventListener("click", showNextQuestion);
document.querySelector("#skip-button").addEventListener("click", skipQuestion);
document.querySelector("[data-retry]").addEventListener("click", () =>
  startQuiz(state.mode, state.roundQuestions),
);
document.querySelector("[data-retry-missed]").addEventListener("click", () => {
  const missedQuestions = state.results
    .filter((result) => !result.isCorrect)
    .map((result) => result.questionData);
  startQuiz(state.mode, missedQuestions);
});
document.querySelector("#topic-filter").addEventListener("change", updateTopicQuestionCount);
