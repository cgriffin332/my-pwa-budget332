let db;
// create a new db request for budget database.
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function(event) {
   // create object store called pending, set autoIncrement to true
  const db = event.target.result;
  db.createObjectStore("pending", { autoIncrement: true });
};

request.onsuccess = function(event) {
    db = event.target.result;
  
    // make sure app is online before reading from db
    if (navigator.onLine) {
      checkDatabase();
    }
  };
  
  request.onerror = function(event) {
    console.log("Woops! " + event.target.errorCode);
  };
  
  function saveRecord(record) {
    // create a transaction on the pending db with readwrite access
    const transaction = db.transaction(["pending"], "readwrite");
  
    // access pending object store
    const store = transaction.objectStore("pending");
  
    // add record to store with add method.
    store.add(record);
  }
  
  


// listen for app coming back online
window.addEventListener("online", checkDatabase);