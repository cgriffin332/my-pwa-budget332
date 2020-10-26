let db;
// create a new db request for budget database.
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function(event) {
   // create object store called pending, set autoIncrement to true
  const db = event.target.result;
  db.createObjectStore("pending", { autoIncrement: true });
};



// listen for app coming back online
window.addEventListener("online", checkDatabase);