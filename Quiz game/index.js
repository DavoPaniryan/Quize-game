const dom = {
  title: document.getElementById("title"),
  progress: {
    progressFill: document.getElementById("progress-fill"),
    questionNumber: document.getElementById("question-number"),
    totalQuestions: document.getElementById("total-questions"),
  },
  questionWrap: document.getElementById("question-wrap"),
  step: {
    question: document.getElementById("question"),
    questionPosition: document.getElementById("question-position"),
  },
  answers: document.getElementById("answers"),
  next: document.getElementById("next"),
  result: {
    resultBlock: document.getElementById("result"),
    validAnswers: document.getElementById("valid-answers"),
    questionsCount: document.getElementById("result-total-questions"),
  },
};
dom.title.innerHTML = data.title;

let totalSteps = data.questions.length;
let step = 0;
let validAnswersCount = 0;
dom.next.onclick = () => {
  step = step < totalSteps ? step + 1 : step;
  rennderQuize(totalSteps, step);
};

function rennderQuize(total, step) {
  renderprogress(total, step);
  if (step + 1 == total) {
    changeButtonOnResult();
  }
  if (step < total) {
    const answers = data.questions[step].answers;
    const answersHTML = buildAnswersHtml(answers);
    renderquestion(step);
    renderAnswers(answersHTML);
    isDisableButton(true);
  } else if (step == total) {
    renderResults();
  }
}
rennderQuize(totalSteps, step);

function renderprogress(total, step) {
  const progressPercent = (100 / total) * step;
  dom.progress.questionNumber.innerHTML = step;
  dom.progress.totalQuestions.innerHTML = total;
  dom.progress.progressFill.style.width = `${progressPercent}%`;
}

renderprogress(totalSteps, step);

function renderquestion(step) {
  dom.step.questionPosition.innerHTML = step + 1 + ".";
  dom.step.question.innerHTML = data.questions[step].question;
}
renderquestion(step);

function buildAnswersHtml(answers) {
  const answersHtml = [];

  answers.forEach((answer, idx) => {
    const html = `<div class="quiz_answer" data-id = "${
      idx + 1
    }">${answer}</div>`;
    answersHtml.push(html);
  });
  return answersHtml.join("");
}
const answersHTML = buildAnswersHtml(data.questions[0].answers);

function renderAnswers(htmlString) {
  dom.answers.innerHTML = htmlString;
}
renderAnswers(answersHTML);

dom.answers.onclick = (event) => {
  const target = event.target;
  if (target.classList.contains("quiz_answer")) {
    const answerNumber = target.dataset.id;
    const isValid = checkAnswer(step, answerNumber);
    const answerClass = isValid ? "quiz_answer_valid" : "quiz_answer_invalid";
    target.classList.add(answerClass);
    isDisableButton(false);
    validAnswersCount = isValid ? validAnswersCount + 1 : validAnswersCount;
  }
};

function checkAnswer(step, answer) {
  const validAnswer = data.questions[step].validAnwer;
  return validAnswer == answer;
}

function isDisableButton(isDisable) {
  if (isDisable) {
    dom.next.classList.add("quiz_btn_disable");
  } else {
    dom.next.classList.remove("quiz_btn_disable");
  }
}

function changeButtonOnResult() {
  dom.next.innerText = "Посмотреть результат";
  dom.next.dataset.result = "result";
}
function renderResults() {
  dom.answers.style.display = "none";
  dom.next.style.display = "none";
  dom.questionWrap.style.display = "none";

  dom.result.resultBlock.style.display = "block";
  dom.result.validAnswers.innerHTML = validAnswersCount;
  dom.result.questionsCount.innerHTML = totalSteps;
}
