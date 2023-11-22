const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

const projectController = require("../controllers/projectController");

const app = express();
const port = 8081;

// The trip the user search for
let projectData = {};

// An array that will contain saved trips as objects
let favoriteTrips = [];

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

app.get("/", projectController.homePage);
app.post("/geonames-places", projectController.geoNameLocations);
app.post("/future-weather", projectController.weatherBitForecast);
app.post("/pixabay-photos", projectController.pixabayImages);

app.post("/add-search-favorite", (req, res) => {
  projectData = req.body;
  res.send(projectData);
});

app.get("/result-of-search", (req, res) => {
  res.json(projectData);
});

app.post("/favorite-trip", (req, res) => {
  const trip = { ...req.body };
  favoriteTrips.push(trip);
  res.send(trip);
});

app.get("/see-trips-history", (req, res) => {
  res.json(favoriteTrips);
});

app.post("/delete-trip", (req, res) => {
  const tripId = req.body.id;

  favoriteTrips = favoriteTrips.filter((savedTrip) => {
    return savedTrip.id != tripId;
  });

  res.json(favoriteTrips);
});

module.exports = app;
