// All words
const words = [
  "Algorithm",
  "Array",
  "Boolean",
  "Bug",
  "Class",
  "Closure",
  "Code",
  "Compile",
  "Constant",
  "Constructor",
  "Data",
  "Database",
  "Debug",
  "Declaration",
  "Dependency",
  "Document",
  "Element",
  "Encapsulation",
  "Event",
  "Exception",
  "Expression",
  "Function",
  "Framework",
  "Frontend",
  "Git",
  "Hook",
  "HTML",
  "HTTP",
  "Inheritance",
  "Instance",
  "Interface",
  "Iteration",
  "JavaScript",
  "JSON",
  "Keyword",
  "Library",
  "Loop",
  "Method",
  "Module",
  "Mutation",
  "Node",
  "Null",
  "Object",
  "Operator",
  "Package",
  "Parameter",
  "Parse",
  "Patch",
  "Pointer",
  "Polymorphism",
  "Promise",
  "Property",
  "Prototype",
  "Query",
  "React",
  "Recursion",
  "Reference",
  "Refactor",
  "Repository",
  "Request",
  "Response",
  "Return",
  "Scope",
  "Script",
  "Server",
  "Session",
  "Singleton",
  "Source",
  "Stack",
  "Statement",
  "String",
  "Structure",
  "Syntax",
  "Test",
  "Thread",
  "Token",
  "Type",
  "UI",
  "Undefined",
  "Update",
  "URL",
  "User",
  "Utility",
  "Variable",
  "Version",
  "Virtual",
  "Vue",
  "Web",
  "While",
  "Yield",
  "Async",
  "Await",
  "Bind",
  "Cache",
  "Callback",
  "Component",
  "Context",
  "Cursor",
  "Deploy",
  "Directive",
];

// Levels
const levels = {
  Easy: 8,
  Normal: 6,
  Hard: 3,
};

// Select Elements
const startBtn = document.querySelector(".start");
const restartBtn = document.querySelector(".restart");
const levelSelect = document.getElementById("level-select");
const levelSpan = document.querySelector(".lvl");
const secondsSpan = document.querySelector(".seconds");
const timeSpan = document.querySelector(".time span");
const theWord = document.querySelector(".the-word");
const input = document.querySelector(".input");
const upcomingWords = document.querySelector(".upcoming-words");
const scoreGot = document.querySelector(".score .got");
const scoreTotal = document.querySelector(".score .total");
const finish = document.querySelector(".finish");
const progressFill = document.querySelector(".progress-fill");

// Variables
let currentLevel = levelSelect.value;
let timeLimit = levels[currentLevel];
let selectedWords = [];
let currentWord = "";
let interval;

// Disable paste
input.onpaste = () => false;

// Set level based on dropdown
levelSelect.onchange = function () {
  currentLevel = this.value;
  timeLimit = levels[currentLevel];
  levelSpan.textContent = currentLevel;
  secondsSpan.textContent = timeLimit;
  timeSpan.textContent = timeLimit;
};

// Shuffle and get 30 words
function getRandomWords() {
  return [...words].sort(() => Math.random() - 0.5).slice(0, 30);
}

// Start game
startBtn.onclick = function () {
  startBtn.style.display = "none";
  levelSelect.disabled = true;
  input.focus();
  selectedWords = getRandomWords();
  scoreGot.textContent = 0;
  scoreTotal.textContent = selectedWords.length;
  progressFill.style.width = "0%";
  generateWord();
};

// Restart game
restartBtn.onclick = function () {
  location.reload();
};

// Generate current + upcoming
function generateWord() {
  if (selectedWords.length === 0) return;

  const randomIndex = Math.floor(Math.random() * selectedWords.length);
  currentWord = selectedWords[randomIndex];
  selectedWords.splice(randomIndex, 1);

  theWord.textContent = currentWord;
  input.value = "";
  upcomingWords.innerHTML = "";
  selectedWords.forEach((word) => {
    const div = document.createElement("div");
    div.textContent = word;
    upcomingWords.appendChild(div);
  });

  startTimer();
}

// Timer + logic
function startTimer() {
  let time = timeLimit;
  timeSpan.textContent = time;

  clearInterval(interval);
  interval = setInterval(() => {
    time--;
    timeSpan.textContent = time;

    if (time === 0) {
      clearInterval(interval);
      checkWord();
    }
  }, 1000);
}

// Check word correctness
function checkWord() {
  if (input.value.toLowerCase() === currentWord.toLowerCase()) {
    scoreGot.textContent = +scoreGot.textContent + 1;
    updateProgress();

    if (selectedWords.length > 0) {
      generateWord();
    } else {
      showResult("You Win!", "good");
    }
  } else {
    showResult("Game Over!", "bad");
  }
}

// Show finish message
function showResult(message, className) {
  theWord.textContent = "";
  finish.innerHTML = `<span class="${className}">${message}</span>`;
  restartBtn.style.display = "block";
  input.disabled = true;
}

// Update progress bar
function updateProgress() {
  const total = +scoreTotal.textContent;
  const got = +scoreGot.textContent;
  const percent = (got / total) * 100;
  progressFill.style.width = `${percent}%`;
}
