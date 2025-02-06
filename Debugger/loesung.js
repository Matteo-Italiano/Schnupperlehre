// Fehler 1 behoben: Richtige Schreibweise von `addEventListener`
document.getElementById("clickButton").addEventListener("click", function() {
    // Fehler 2 behoben: Richtige Zuweisung mit `let` und korrekter String-Syntax
    let message = "Hallo! Willkommen zum Debugging-Training!";

    // Fehler 3 behoben: Fehlendes Anführungszeichen hinzugefügt
    userName = prompt("Wie heißt du?");  // Fehler 6 behoben: userName wurde global deklariert
    let fullMessage = "Hallo, " + userName + "! Willkommen"; 

    // Fehler 4 behoben: Existierendes Element `output` verwendet
    document.getElementById("output").innerText = fullMessage;

    // Fehler 10 behoben: Richtiger Vergleichsoperator `===` statt `=`
    if (userName === "Admin") {
        console.log("Willkommen, Admin!");
    }
});

// Fehler 5 behoben: Semikolon hinzugefügt
let zahl = 10;

// Fehler 6 behoben: `x` vorher deklariert
let x = 5;
console.log(x);

// Fehler 7 behoben: Division durch 0 vermeiden
let ergebnis = 5 / 1; // Statt durch 0 zu teilen
console.log("Ergebnis: " + ergebnis);

// Fehler 8 behoben: Funktion tatsächlich aufrufen
function WichtigeFunktion() {
    console.log("Diese Nachricht sollte erscheinen.");
}
WichtigeFunktion();

// Fehler 9 behoben: Richtige Schreibweise von `console.log`
console.log("Testnachricht");
