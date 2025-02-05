// Interaktives Mini-Quiz: Errate die geheime Zahl!

// 1. getElementById: Zugriff auf HTML-Elemente
const output = document.getElementById("output");
const input = document.getElementById("input");
const button = document.getElementById("guessButton");

// 2. Variable und Funktionen mit Parametern
let secretNumber = Math.floor(Math.random() * 10) + 1; // Zufallszahl zwischen 1 und 10
let attempts = 0;

function checkGuess(number) {
  attempts++;
  if (number == secretNumber) {
    output.innerText = `Glückwunsch! Du hast die Zahl ${secretNumber} nach ${attempts} Versuchen erraten!`;
    button.disabled = true; // Verhindert weitere Versuche
  } else if (number < secretNumber) {
    output.innerText = "Zu niedrig! Versuche es nochmal.";
  } else {
    output.innerText = "Zu hoch! Versuche es nochmal.";
  }
}

// 3. Eventlistener für Button-Klick
button.addEventListener("click", function () {
  let guess = parseInt(input.value);
  if (!isNaN(guess) && guess >= 1 && guess <= 10) {
    checkGuess(guess);
  } else {
    output.innerText = "Bitte gib eine Zahl zwischen 1 und 10 ein.";
  }
});

// 4. For-Loop: Zeigt Zahlen von 1 bis 10 auf der Konsole
console.log("Hier sind alle möglichen Zahlen zum Raten:");
for (let i = 1; i <= 10; i++) {
  console.log(i);
}

// 5. While-Loop: Zählt von 1 bis zur geheimen Zahl
let counter = 1;
console.log("Ich zähle bis zur geheimen Zahl...");
while (counter <= secretNumber) {
  console.log(counter);
  counter++;
}
