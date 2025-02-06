const SIMPLE_NOTES_STORAGE_KEY = "simpleNotes";

const controller = (() => {
  function getAndClearInputNoteTitle() {
    const titleInput = document.getElementById("input-add-note-title");
    const value = titleInput.value.trim();
    titleInput.value = "";
    return value;
  }

  function getAndClearTextareaNoteText() {
    const textInput = document.getElementById("textarea-add-note-text");
    const value = textInput.value.trim();
    textInput.value = "";
    return value;
  }

  function createNote({ noteId, title, text }) {
    const existingNotes = document.getElementById("div-existing-notes");

    const noteItem = document.createElement("div");
    noteItem.className = "note-item";
    noteItem.setAttribute("id", `note-${noteId}`);
    noteItem.innerHTML = `
      <div>
        <strong>${title}</strong>
        <p>${text}</p>
      </div>
      <button class="delete-button" onclick="controller.deleteNote('${noteId}')">Löschen</button>
    `;

    existingNotes.appendChild(noteItem);
  }

  function addNoteToLocalStorage(note) {
    let notes = JSON.parse(localStorage.getItem(SIMPLE_NOTES_STORAGE_KEY)) || [];
    notes.push(note);
    localStorage.setItem(SIMPLE_NOTES_STORAGE_KEY, JSON.stringify(notes));
  }

  function deleteNoteFromLocalStorage(noteId) {
    let notes = JSON.parse(localStorage.getItem(SIMPLE_NOTES_STORAGE_KEY)) || [];
    notes = notes.filter(note => note.noteId !== noteId);
    localStorage.setItem(SIMPLE_NOTES_STORAGE_KEY, JSON.stringify(notes));
    loadNotes();
  }

  function addNote() {
    const title = getAndClearInputNoteTitle();
    const text = getAndClearTextareaNoteText();

    if (!title || !text) {
      alert("Bitte Titel und Text ausfüllen.");
      return;
    }

    const noteId = new Date().getTime().toString();
    const note = { noteId, title, text };

    addNoteToLocalStorage(note);
    closeModal();
    loadNotes();
  }

  function loadNotes() {
    const notes = JSON.parse(localStorage.getItem(SIMPLE_NOTES_STORAGE_KEY)) || [];
    const existingNotes = document.getElementById("div-existing-notes");
    existingNotes.innerHTML = "";
    notes.forEach(createNote);
  }

  function exportSelectedNotes() {
    const allNotes = JSON.parse(localStorage.getItem(SIMPLE_NOTES_STORAGE_KEY)) || [];
    if (allNotes.length === 0) {
      alert("Keine Notizen zum Exportieren vorhanden.");
      return;
    }

    const jsonString = JSON.stringify(allNotes, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "notes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function importNotes() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.onchange = (event) => {
      const file = event.target.files[0];
      if (!file) {
        alert("Keine Datei ausgewählt.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedNotes = JSON.parse(e.target.result);
          if (!Array.isArray(importedNotes)) {
            alert("Ungültiges Dateiformat.");
            return;
          }

          let existingNotes = JSON.parse(localStorage.getItem(SIMPLE_NOTES_STORAGE_KEY)) || [];
          existingNotes = [...existingNotes, ...importedNotes];
          localStorage.setItem(SIMPLE_NOTES_STORAGE_KEY, JSON.stringify(existingNotes));
          loadNotes();
          alert("Notizen erfolgreich importiert.");
        } catch (error) {
          alert("Fehler beim Importieren der Datei.");
        }
      };

      reader.readAsText(file);
    };

    input.click();
  }

  function showModal() {
    document.getElementById("note-modal").style.display = "block";
  }

  function closeModal() {
    document.getElementById("note-modal").style.display = "none";
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadNotes();

    document.getElementById("create-note-button").addEventListener("click", showModal);
    document.getElementById("save-note-button").addEventListener("click", addNote);
    document.getElementById("close-modal-button").onclick = function () {
      document.getElementById("note-modal").style.display = "none";
    };

    document.querySelector('.red-button[onclick="controller.importNotes()"]').onclick = importNotes;
    document.querySelector('.red-button[onclick="controller.exportSelectedNotes()"]').onclick = exportSelectedNotes;
  });

  return { deleteNote: deleteNoteFromLocalStorage };
})();
