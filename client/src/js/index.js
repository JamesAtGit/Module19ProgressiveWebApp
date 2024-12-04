// Initialize IndexedDB
const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('jate', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('notes')) {
        db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (error) => {
      reject(error);
    };
  });
};

// Save note to IndexedDB
const saveNote = (noteContent) => {
  initDB().then((db) => {
    const transaction = db.transaction(['notes'], 'readwrite');
    const objectStore = transaction.objectStore('notes');
    objectStore.add({ content: noteContent });

    transaction.oncomplete = () => {
      console.log('Note saved');
    };
    transaction.onerror = () => {
      console.log('Error saving note');
    };
  });
};

// Retrieve notes from IndexedDB
const getNotes = () => {
  initDB().then((db) => {
    const transaction = db.transaction(['notes'], 'readonly');
    const objectStore = transaction.objectStore('notes');
    const request = objectStore.getAll();

    request.onsuccess = () => {
      console.log('Notes retrieved:', request.result);
    };
  });
};

// Example: Save content when user types
document.getElementById('textEditor').addEventListener('input', (event) => {
  saveNote(event.target.value);
});

// Fetch stored notes when needed
getNotes();
