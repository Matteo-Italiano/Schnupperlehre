let playerlabel = document.getElementById("playerlabel");

// Funktion erstellen welche den Spielzug aufnimmt

// Funktion Erstellen Welche den Jetztigen Spieler wechselt

// Funktion erstellen welche das Spiel Zurücksetzt

// Funktion erstellen, welche den

function checkwinner() {
  let winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Horizontal
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Vertical
    [0, 4, 8],
    [2, 4, 6], // Diagonal
  ];

  for (let combination of winningCombinations) {
    let [a, b, c] = combination;

    let cellA = document.getElementById(a.toString()).innerText;
    let cellB = document.getElementById(b.toString()).innerText;
    let cellC = document.getElementById(c.toString()).innerText;

    if (cellA !== "" && cellA === cellB && cellA === cellC) {
    }
  }
}
