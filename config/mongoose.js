const mongoose = require("mongoose"); // Import the mongoose library

mongoose.connect("mongodb://127.0.0.1/todoList_db"); // Connect to the todoList_db database at localhost

const db = mongoose.connection; // Create a variable to store the connection to the database

db.on("error", () => console.log("error!")); // If there's an error connecting to the database, log an error message

db.once("open", (err) => {
  // Once the connection is open, run this function
  if (err) console.log("error"); // If there's an error, log an error message

  console.log("done successfully, connected to db"); // Log a success message if the connection is successful
});
