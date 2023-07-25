// Setup empty JS object to act as endpoint for all routes
let projectData = {};

const port = 8000;
// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Start up an instance of app
const app = express();

/* Middleware*/
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use("/app", express.static(path.join(__dirname, "app")));

// Get route to return all entries
app.get("/api/weather-journal", (req, res) => {
  console.log("get data");
  res.json(projectData);
});

// app.get("/api/weather-journal/latest", (req, res) => {
//   console.log("get latest value");

//   const ids = Object.keys(projectData);
//   const maxId = Math.max(...ids);

//   res.json(projectData[maxId]);
// });

// POST route to add entry in weather journal
app.post("/api/weather-journal", (req, res) => {
  console.log("post data");
  const data = req.body;
  // TODO: validate data - error response

  const id = Object.keys(projectData).length + 1;
  const journalData = {
    ...data,
    id,
  };

  projectData[id] = journalData;

  //   res.send(projectData);
  // temperature, date, user resposne
  res.json(journalData);
});

// function tempValid(tem) {
//   // is it a number? range of numbers
// }

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
