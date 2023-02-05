const express = require("express"); // including the express module
const port = 8000; // setting the localhost port
const path = require("path"); // including the path module

const app = express(); // creating an express app

// setting up the MongoDB connection
const db = require("./config/mongoose");
const List = require("./models/list"); // including the List model

// setting up the view engine template
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded()); // middleware to interpret form details
app.use(express.static("public")); // middleware to serve static files

//render tasks
app.get("/", (req, res) => {
  List.find({}, (err, task) => {
    if (err) {
      console.log("Error in db");
      return;
    }
    return res.render("index", {
      title: "Contacts Page",
      arr: task,
    });
  });
});

//to add task
app.post("/create-task", (req, res) => {
  // Format the date to the desired format
  let date = new Date(req.body.date);
  let date_format = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  req.body.date = date_format;

  // Create a new task using the List model
  List.create(
    {
      task: req.body.task,
      date: req.body.date,
      catagory: req.body.catagory,
    },
    (err, newTask) => {
      if (err) console.log(err); // If there's an error, log it

      //console.log(newTask); // Log the newly created task
    }
  );

  res.redirect("back"); // Redirect the user back to the previous page
});

//checkbox clicked
app.post("/toggle-check/", (req, res) => {
  let id = req.query.id;

  List.findById(id, (err, task) => {
    if (err) console.log(err);

    List.findByIdAndUpdate(
      id,
      { check: !task.check }, // The update operation to toggle the value of the check field
      (err, docs) => {
        if (err) console.log(err);

        // console.log("updated", docs);
      }
    );
  });

  res.redirect("back");
});

//delete all the checked tasks
app.get("/delete-task", (req, res) => {
  List.deleteMany({ check: true }, (err) => {
    if (err) console.log(err);

    console.log("Tasks deleted successfully");
  });

  return res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
