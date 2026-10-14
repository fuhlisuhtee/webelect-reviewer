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
  currentIndex: 0,
  results: [],
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

function startQuiz(mode) {
  const questions = window.quizQuestions?.[state.subject]?.[mode];
  if (!Array.isArray(questions) || questions.length === 0) {
    const availability = document.querySelector("#identification-availability");
    availability.hidden = false;
    return;
  }

  state.mode = mode;
  state.questions = questions;
  state.currentIndex = 0;
  state.results = [];
  state.answered = false;
  document.querySelector("#quiz-subject").textContent = subjectNames[state.subject];
  document.querySelector("#quiz-mode").textContent = modeNames[mode];
  document.querySelector("#question-total").textContent = String(questions.length);
  showScreen("quiz");
  renderQuestion();
}

function renderQuestion() {
  const question = state.questions[state.currentIndex];
  const form = document.querySelector("#answer-form");
  const feedback = document.querySelector("#answer-feedback");
  const inputArea = document.querySelector("#answer-input");
  const progress = document.querySelector(".progress-track");
  const progressValue = Math.round((state.currentIndex / state.questions.length) * 100);

  state.answered = false;
  document.querySelector("#question-current").textContent = String(state.currentIndex + 1);
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
    inputArea.innerHTML = `<fieldset class="choice-list">
      <legend class="answer-label">CHOOSE ONE</legend>
      ${question.choices
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

  const question = state.questions[state.currentIndex];
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
    answer,
    correctAnswers: reviewAnswers,
    acceptedAnswers: correctAnswers,
    requireOneSentence: Boolean(question.requireOneSentence),
    isCorrect,
  });
  state.answered = true;
  form.querySelectorAll("input").forEach((input) => {
    input.disabled = true;
  });

  const feedback = document.querySelector("#answer-feedback");
  feedback.className = `answer-feedback ${isCorrect ? "is-correct" : "is-incorrect"}`;
  feedback.innerHTML = isCorrect
    ? `<strong>That’s right!</strong> ${escapeHTML(question.hint)}`
    : question.requireOneSentence
      ? `<strong>Not quite—and that’s okay.</strong> Include one of these principles: ${correctAnswers
          .map(escapeHTML)
          .join(", ")}. Explain it in one sentence ending with a period.`
      : `<strong>Not quite—and that’s okay.</strong> The answer is <b>${escapeHTML(correctAnswers[0])}</b>. ${escapeHTML(question.hint)}`;
  feedback.hidden = false;
  document.querySelector("#answer-button").hidden = true;
  document.querySelector("#next-button").hidden = false;
  document.querySelector("#next-button").focus();
}

function showNextQuestion() {
  if (state.currentIndex + 1 < state.questions.length) {
    state.currentIndex += 1;
    renderQuestion();
    if (state.mode === "multiple") {
      document.querySelector(".choice-option input")?.focus();
    }
    return;
  }
  showResults();
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
    percent === 100 ? "Perfect sprint!" : percent >= 60 ? "Look at you go!" : "Good first step!";
  document.querySelector("#results-subtitle").textContent =
    `${subjectNames[state.subject]} · ${modeNames[state.mode]}. Every round helps it stick.`;
  document.querySelector("#score-message").textContent =
    missedCount === 0
      ? "You got every question right. Amazing!"
      : `${missedCount} ${missedCount === 1 ? "answer" : "answers"} to revisit—now you know what to review.`;
  document.querySelector("#review-count").textContent = `${missedCount} TO REVIEW`;
  document.querySelector("#answer-review").innerHTML = state.results
    .map(
      (result, index) => `
        <article class="review-item ${result.isCorrect ? "review-correct" : "review-incorrect"}">
          <span class="review-mark" aria-hidden="true">${result.isCorrect ? "✓" : "×"}</span>
          <div class="review-copy">
            <span class="review-question-number">QUESTION ${String(index + 1).padStart(2, "0")}</span>
            <h3>${escapeHTML(result.question)}</h3>
            <p>Your answer: <strong>${escapeHTML(result.answer)}</strong></p>
            ${
              result.isCorrect
                ? ""
                : result.requireOneSentence
                  ? `<p class="correct-answer">Possible examples: <strong>${result.acceptedAnswers.map(escapeHTML).join(", ")}</strong></p>`
                  : `<p class="correct-answer">Correct answer: <strong>${escapeHTML(result.correctAnswers[0])}</strong></p>`
            }
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
  showScreen("welcome");
}

document.querySelectorAll("[data-subject]").forEach((button) => {
  button.addEventListener("click", () => {
    state.subject = button.dataset.subject;
    document.querySelector("#selected-subject-label").textContent = subjectNames[state.subject].toUpperCase();
    const identificationAvailable =
      (window.quizQuestions?.[state.subject]?.identification?.length ?? 0) > 0;
    const identificationButton = document.querySelector('[data-mode="identification"]');
    identificationButton.disabled = !identificationAvailable;
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
document.querySelector("[data-retry]").addEventListener("click", () => startQuiz(state.mode));
