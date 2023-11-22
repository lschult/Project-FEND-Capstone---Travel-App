const dotenv = require("dotenv");
dotenv.config();

const USER_GEONAMES = process.env.USER_GEONAMES;
const APIKEY_WEATHERBIT = process.env.APIKEY_WEATHERBIT;
const APIKEY_PIXABAY = process.env.APIKEY_PIXABAY;
const axios = require("axios");

exports.homePage = (req, res) => {
  res.sendFile("./dist/index.html");
};

exports.locationsGeonames = async (req, res) => {
  const response = await axios.get(
    `${req.body.BASE_URL}&username=${USER_GEONAMES}`
  );
  res.send(response.data);
};

exports.weatherBitForecast = async (req, res) => {
  const response = await axios.get(
    `${req.body.BASE_URL}&key=${APIKEY_WEATHERBIT}`
  );
  res.send(response.data);
};

exports.pixabayImages = async (req, res) => {
  const response = await axios.get(
    `${req.body.BASE_URL}&key=${APIKEY_PIXABAY}`
  );
  res.send(response.data);
};
