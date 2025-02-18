// script.js
const quoteDisplay = document.getElementById('quoteDisplay');
const quoteInput = document.getElementById('quoteInput');
const timer = document.getElementById('timer');
const speed = document.getElementById('speed');
const accuracy = document.getElementById('accuracy');
const resetButton = document.getElementById('resetButton');

let startTime, endTime;

// Sample quotes
const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Programming is the art of telling another human what one wants the computer to do.",
  "Coding is fun and challenging at the same time.",
  "Practice makes perfect.",
  "Keep calm and code on."
];

// Load a random quote
function loadQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = quotes[randomIndex];
}

// Start the timer
function startTimer() {
  startTime = new Date();
  setInterval(updateTimer, 1000);
}

// Update the timer
function updateTimer() {
  const currentTime = new Date();
  const timeElapsed = Math.floor((currentTime - startTime) / 1000);
  timer.textContent = timeElapsed;
}

// Calculate typing speed (WPM)
function calculateSpeed() {
  const words = quoteInput.value.trim().split(/\s+/).length;
  const timeInMinutes = (new Date() - startTime) / 60000;
  const wpm = Math.floor(words / timeInMinutes);
  speed.textContent = wpm;
}

// Calculate typing accuracy
function calculateAccuracy() {
  const typedText = quoteInput.value;
  const originalText = quoteDisplay.textContent;
  let correctChars = 0;

  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === originalText[i]) {
      correctChars++;
    }
  }

  const acc = (correctChars / originalText.length) * 100;
  accuracy.textContent = acc.toFixed(2);
}

// Reset the game
function resetGame() {
  quoteInput.value = '';
  timer.textContent = 0;
  speed.textContent = 0;
  accuracy.textContent = 0;
  loadQuote();
  startTimer();
}

// Event listeners
quoteInput.addEventListener('input', () => {
  if (!startTime) {
    startTimer();
  }
  calculateSpeed();
  calculateAccuracy();

  if (quoteInput.value === quoteDisplay.textContent) {
    alert(`Congratulations! Your typing speed is ${speed.textContent} WPM with ${accuracy.textContent}% accuracy.`);
    resetGame();
  }
});

resetButton.addEventListener('click', resetGame);

// Initialize the game
loadQuote();
