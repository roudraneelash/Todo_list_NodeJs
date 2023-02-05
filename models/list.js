const mongoose = require("mongoose"); // Import the mongoose library

// Create a new schema for the List model
const listSchema = new mongoose.Schema({
  task: {
    type: String, // The task field is a string type
    required: true, // The task field is required
  },
  date: {
    type: String, // The date field is a string type
    required: true, // The date field is required
  },
  catagory: {
    type: String,
    required: true,
  },
  check: {
    type: Boolean, // The check field is a boolean type
    required: true, // The check field is required
    default: false, // The check field has a default value of false
  },
});

const List = mongoose.model("List", listSchema); // Create the List model with the listSchema

module.exports = List; // Export the List model
