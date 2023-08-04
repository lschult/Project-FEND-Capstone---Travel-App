// Setup empty JS object to act as endpoint for all routes
let projectData = {};

const port = 8000;
// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//Path module set up to be used with the join() method in order to initiate the main project folder later on
const path = require("path");

// Start up an instance of app using express
const app = express();

// Configuration of express, utliizing body-parser as the middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cross origin allowance using Cors
app.use(cors());

// Main project folder initialized, using the join() method and path module
app.use("/app", express.static(path.join(__dirname, "app")));

// Get api data
app.get("/api/weather-journal", (req, res) => {
  console.log("get data");
  res.json(projectData);
});

// POST route to add entry in weather journal
app.post("/api/weather-journal", (req, res) => {
  console.log("post data");
  const data = req.body;

  const id = Object.keys(projectData).length + 1;
  const journalData = {
    ...data,
    id,
  };

  projectData[id] = journalData;
  // temperature, date, user response
  res.json(journalData);
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
