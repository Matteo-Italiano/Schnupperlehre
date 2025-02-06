const SIMPLE_NOTES_STORAGE_KEY = "simpleNotes";

const controller = (() => {
  let selectedNoteIndex = null;

  document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const collapseButton = document.getElementById("collapse-button");
    const collapseContainer = document.getElementById("collapse-container");

    collapseButton.addEventListener("click", () => {
      const isOpen = collapseButton.getAttribute("status") === "Open";

      if (isOpen) {
        collapseButton.setAttribute("status", "Closed");
        sidebar.style.transform = "translateX(-100%)";
        collapseContainer.style.left = "15px";
        collapseButton.style.transform = "rotate(180deg)"; 
      } else {
        collapseButton.setAttribute("status", "Open");
        sidebar.style.transform = "translateX(0)";
        collapseContainer.style.left = "350px";
        collapseButton.style.transform = "rotate(0deg)"; 
      }
    });
  });

  function formatDate(date) {
    const d = new Date(date);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return d.toLocaleDateString("en-US", options);
  }

  function loadNotes() {
    const notesList = document.getElementById("notes-list");
    const noteDisplay = document.getElementById("note-display");
    const allNotes = JSON.parse(localStorage.getItem(SIMPLE_NOTES_STORAGE_KEY)) || [];
    notesList.innerHTML = "";

    if (allNotes.length === 0) {
      selectedNoteIndex = null;
      noteDisplay.style.display = "none";
      document.body.style.backgroundColor = "#fff";
      return;
    }

    document.body.style.backgroundColor = "";
    noteDisplay.style.display = "block";

    allNotes.forEach((note, index) => {
      const noteDiv = document.createElement("div");
      noteDiv.classList.add("note-sidebar-item");
      noteDiv.innerHTML = `
        <h2 class="note-title-sidebar">${note.title}</h2>
        <p class="note-description-sidebar">${note.text.substring(0, 50)}...</p>
        <span class="note-date-sidebar">${note.date}</span>
      `;
      noteDiv.onclick = () => displayNote(index);

      if (selectedNoteIndex === index) {
        noteDiv.classList.add("active");
      } else {
        noteDiv.classList.remove("active");
      }

      notesList.appendChild(noteDiv);
    });

    if (selectedNoteIndex === null && allNotes.length > 0) {
      displayNote(0);
    }
  }

  function displayNote(index) {
    const allNotes = JSON.parse(localStorage.getItem(SIMPLE_NOTES_STORAGE_KEY)) || [];
    const note = allNotes[index];
    selectedNoteIndex = index;

    document.getElementById("note-title-display").textContent = note.title;
    document.getElementById("note-date-display").textContent = note.date;
    document.getElementById("note-content-display").innerHTML = note.text;

    loadNotes();
  }

  function addNote() {
    const title = "Neue Notiz";
    const text = "Notizinhalt hier einfügen...";
    const date = formatDate(new Date());
  
    const allNotes = JSON.parse(localStorage.getItem(SIMPLE_NOTES_STORAGE_KEY)) || [];
    allNotes.unshift({ title, text, date });
    localStorage.setItem(SIMPLE_NOTES_STORAGE_KEY, JSON.stringify(allNotes));
  
    loadNotes();
    displayNote(0);
  }

  function deleteNote() {
    const allNotes = JSON.parse(localStorage.getItem(SIMPLE_NOTES_STORAGE_KEY)) || [];
    if (selectedNoteIndex !== null) {
      allNotes.splice(selectedNoteIndex, 1);
      localStorage.setItem(SIMPLE_NOTES_STORAGE_KEY, JSON.stringify(allNotes));

      if (allNotes.length > 0) {
        selectedNoteIndex = 0;
        displayNote(0);
      } else {
        selectedNoteIndex = null;
        document.getElementById("note-display").style.display = "none";
        document.body.style.backgroundColor = "#fff";
      }
      loadNotes();
    }
  }

  function filterNotes() {
    const searchInput = document.querySelector(".search-bar input").value.toLowerCase();
    const allNotes = JSON.parse(localStorage.getItem(SIMPLE_NOTES_STORAGE_KEY)) || [];
    const notesList = document.getElementById("notes-list");

    notesList.innerHTML = "";

    allNotes.forEach((note, index) => {
      const titleMatch = note.title.toLowerCase().includes(searchInput);
      const textMatch = note.text.toLowerCase().includes(searchInput);

      if (titleMatch || textMatch) {
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note-sidebar-item");
        if (selectedNoteIndex === index) noteDiv.classList.add("active");

        noteDiv.innerHTML = `
          <h2 class="note-title-sidebar">${note.title}</h2>
          <p class="note-description-sidebar">${note.text.substring(0, 50)}...</p>
          <span class="note-date-sidebar">${note.date}</span>
        `;

        noteDiv.onclick = () => displayNote(index);
        notesList.appendChild(noteDiv);
      }
    });
  }

  function saveNote() {
    const allNotes = JSON.parse(localStorage.getItem(SIMPLE_NOTES_STORAGE_KEY)) || [];
    const updatedTitle = document.getElementById("note-title-display").textContent.trim();
    const updatedText = document.getElementById("note-content-display").innerHTML.trim();
  
    if (selectedNoteIndex !== null) {
      allNotes[selectedNoteIndex].title = updatedTitle || "Neue Notiz";
      allNotes[selectedNoteIndex].text = updatedText || "Notizinhalt hier einfügen...";
      allNotes[selectedNoteIndex].date = formatDate(new Date());
  
      const updatedNote = allNotes.splice(selectedNoteIndex, 1)[0];
      allNotes.unshift(updatedNote);
      localStorage.setItem(SIMPLE_NOTES_STORAGE_KEY, JSON.stringify(allNotes));
  
      selectedNoteIndex = 0;
      loadNotes();
      displayNote(0);
    }
  }
  
  document.querySelector(".search-bar input").addEventListener("input", filterNotes);
  document.getElementById("open-modal-button").addEventListener("click", addNote);
  document.getElementById("delete-button").addEventListener("click", deleteNote);
  document.getElementById("save-note-button").addEventListener("click", saveNote);
  document.addEventListener("DOMContentLoaded", loadNotes);
})();
