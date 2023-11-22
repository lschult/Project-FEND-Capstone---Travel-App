import { userInputValidation } from "./js/userInputValidation";
import { calculateDaysUntil } from "./js/calculateDaysUntil";
import { templateRendering } from "./js/templateRendering";
import { savedTripsRendering } from "./js/savedTripsRendering";
import { handleSubmit, saveTrip, removeTrip } from "./js/formHandler";
import { geonamesApiData } from "./js/geonamesApiData";
import { weatherbitApiData } from "./js/weatherbitApiData";
import { pixabayPhotosData } from "./js/pixabayPhotosData";

import "./styles/index.scss";

export {
  userInputValidation,
  calculateDaysUntil,
  templateRendering,
  savedTripsRendering,
  handleSubmit,
  saveTrip,
  removeTrip,
  weatherbitApiData,
  geonamesApiData,
  pixabayPhotosData,
};
