const maxAttempts = 10;
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let hasWon = false;
let gameOver = false;

const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const messageEl = document.getElementById("message");
const attemptsEl = document.getElementById("attemptsLeft");
const statusEl = document.getElementById("status");
const historyEl = document.getElementById("history");
const againBtn = document.getElementById("againBtn");

function setMessage(text, className) {
  messageEl.textContent = text;
  messageEl.className = "message " + className;
}

function addHistoryEntry(guess, result) {
  const li = document.createElement("li");
  li.innerHTML = `<span>#${attempts}</span> guessed ${guess} — ${result}`;
  historyEl.prepend(li);
}

function endGame(won) {
  gameOver = true;
  hasWon = won;
  guessInput.disabled = true;
  guessBtn.disabled = true;
  statusEl.textContent = won ? "Status: Cracked" : "Status: Locked out";
  againBtn.style.display = "block";
}

function checkGuess() {
  if (gameOver) return;

  const rawValue = guessInput.value;
  const userGuess = Number(rawValue);

  if (rawValue.trim() === "" || isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    setMessage("Enter a whole number between 1 and 100.", "error");
    return;
  }

    attempts++;
  attemptsEl.textContent = `Attempts left: ${maxAttempts - attempts}`;

  if (userGuess === secretNumber) {
    setMessage(`Correct! The code was ${secretNumber}. Cracked in ${attempts} attempts.`, "correct");
    addHistoryEntry(userGuess, "correct");
    endGame(true);
  } else if (userGuess > secretNumber) {
    setMessage("Too high. Try a lower number.", "too-high");
    addHistoryEntry(userGuess, "too high");
  } else {
    setMessage("Too low. Try a higher number.", "too-low");
    addHistoryEntry(userGuess, "too low");
  }

    if (!hasWon && attempts >= maxAttempts) {
    setMessage(`Out of attempts. The code was ${secretNumber}.`, "lost");
    endGame(false);
  }

  guessInput.value = "";
  guessInput.focus();
}

guessBtn.addEventListener("click", checkGuess);
guessInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") checkGuess();
});

againBtn.addEventListener("click", function () {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  hasWon = false;
  gameOver = false;
  guessInput.disabled = false;
  guessBtn.disabled = false;
  guessInput.value = "";
  attemptsEl.textContent = `Attempts left: ${maxAttempts}`;
  statusEl.textContent = "Status: Active";
  setMessage("New code generated. Good luck.", "");
  historyEl.innerHTML = "";
  againBtn.style.display = "none";
  guessInput.focus();
});
