const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

const storeController = require("../controllers/storeController");

const app = express();
const port = 8081;

// The trip the user search for
let projectData = {};

// An array that will contain saved trips as objects
let savedTrips = [];

app.use(cors());
// to use json
app.use(bodyParser.json());
// to use url encoded values
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("dist"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  if (!process.env.GEONAMES_USERNAME) {
    console.error("GEONAMES_USERNAME required");
  }
  if (!process.env.WEATHERBIT_API_KEY) {
    console.error("WEATHERBIT_API_KEY required");
  }
  if (!process.env.PIXABAY_API_KEY) {
    console.error("PIXABAY_API_KEY required");
  }
});

app.get("/", storeController.homePage);
app.post("/geonames-places", storeController.geoNameLocations);
app.post("/future-weather", storeController.weatherBitForecast);
app.post("/pixabay-photos", storeController.pixabayImages);

app.post("/add-search-favorite", (req, res) => {
  projectData = req.body;
  res.send(projectData);
});

app.get("/result-of-search", (req, res) => {
  res.json(projectData);
});

app.post("/save-trip", (req, res) => {
  const trip = { ...req.body };
  savedTrips.push(trip);
  res.send(trip);
});

app.get("/trips-history", (req, res) => {
  res.json(savedTrips);
});

app.post("/delete-trip", (req, res) => {
  const tripId = req.body.id;

  savedTrips = savedTrips.filter((savedTrip) => {
    return savedTrip.id != tripId;
  });

  res.json(savedTrips);
});

module.exports = app;
