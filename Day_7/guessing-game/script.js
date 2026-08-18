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