const savedTripsSection = document.getElementById("savedTripsSection");

// Render saved trips, wait for the content to be loaded, otherwise Client is not defined
document.addEventListener("DOMContentLoaded", () => {
  Client.renderSavedTrips();
});

const handleSubmit = async (event) => {
  event.preventDefault();

  // Get destination and leaving date formsFields
  const destination = document.getElementById("destination");
  const departureDate = document.getElementById("departureDate");

  // Validate the form
  const formElements = [destination, departureDate];
  const isFormValid = Client.userInputValidation(formElements)s;
  if (!isFormValid) return;

  const tripInfo = document.getElementById("tripInfo");

  let dataGeonames;
  let weatherData;
  let dataPixabay;

  try {
    // Get location details from GeoNamesData
    dataGeonames = await Client.fetchGeonamesData(destination.value);
    // If there are no results from the fetchGeonamesData, do not continue as the other API calls rely on the results from fetchGeonamesData
    // This could be improved in the future by giving some feedback to the user in the UI
    if (dataGeonames.geonames.length === 0) return;

    // Set latitude and longitude co-ords for the destination
    const lat = dataGeonames.geonames[0].lat;
    const lon = dataGeonames.geonames[0].lng;

    // Calculate the number of days until the trip
    const daysUntil = Client.calculateDaysUntildaysUntil(departureDate.value);

    // Get weather forecast from WeatherBit
    weatherData = await Client.fetchWeatherbitData(daysUntil, lat, lon);

    // Get images from pixababy, the parameters below I have set as default, perhaps this could be improved in the future as well, with Galleries and experiment with different parameters
    dataPixabay = await Client.fetchPixabayPhotos(
      "photo",
      "travel",
      true,
      "popular",
      "horizontal",
      destination.value
    );

    // Save the search results to an object ready to be posted to the Express server
    const projectData = {
      id: dataGeonames.geonames[0].geonameId,
      departureDate: departureDate.value,
      destination: destination.value,
      leavingDate: departureDate.value,
      dataGeonames: { ...dataGeonames.geonames[0] },
      weatherData: [...weatherData.data],
      dataPixabay: { ...dataPixabay.hits[0] },
    };

    // Post the search results back to the Express server
    postProjectdata("/save-search-result", projectData).then(
      // Then render the returned result in the UI
      async (searchResult) => {
        // Set a default placeholder image
        let destinationImage = "images/placeholder.jpg";

        // If we have an image from Pixabay then set this as the destinationImage instead
        if (searchResult.dataPixabay.webformatURL) {
          destinationImage = searchResult.dataPixabay.webformatURL;
        }

        // Pass the search results to the render function, this will render them in the UI in a card style component
        const innerCard = Client.renderHTMLTemplate(
          searchResult.dataPixabay.webformatURL,
          searchResult.destination,
          daysUntil,
          searchResult.weatherData,
          searchResult.id
        );

        // Update the UI
        tripInfo.innerHTML = `
                    <div class="card">
                        ${innerCard}
                    </div>
                `;
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const saveTrip = async () => {
  let savedTrips = await getSavedTrips();
  const searchResult = await getSearchResult();

  // Check if the trip has alread been saved
  if (isTripSaved(searchResult.id, savedTrips)) {
    return;
  }

  // I think I need to wait for the response here...?
  postProjectdata("/save-trip", searchResult).then(async (savedTrip) => {
    // Put the object into storage
    savedTrips = await getSavedTrips();
    localStorage.setItem("savedTrips", JSON.stringify(savedTrips));
    // Now we have all of the data, set the HTML
    const daysUntil = Client.calculateDaysUntildaysUntil(
      savedTrip.departureDate
    );
    let destinationImage = savedTrip.dataPixabay.webformatURL;
    if (!destinationImage) destinationImage = "images/placeholder.jpg";

    const cardElement = document.createElement("div");
    cardElement.classList.add("card", "card--column");

    cardElement.innerHTML = Client.renderHTMLTemplate(
      destinationImage,
      savedTrip.destination,
      daysUntil,
      savedTrip.weatherData,
      savedTrip.id,
      false
    );

    savedTripsSection.prepend(cardElement);
  });
};

const removeTrip = async (url = "/remove-saved-trip", data = {}) => {
  const parentCardElelement = event.target.closest(".card");
  // Could I update this to take advantage of event bubbling? I could convert the trip HTML to a list of cards, perhaps more semantic as well...
  const tripId = event.target.dataset.tripId;
  data = { id: tripId };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const savedTrips = await response.json();

  // Update local storage
  localStorage.setItem("savedTrips", JSON.stringify(savedTrips));

  parentCardElelement.remove();
};

const getSearchResult = async () => {
  const response = await fetch("/get-search-result");
  const searchResult = await response.json();
  return searchResult;
};

const getSavedTrips = async () => {
  const response = await fetch("/get-saved-trips");
  const savedTrips = await response.json();
  return savedTrips;
};

const postProjectdata = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const isTripSaved = (tripToSaveID, savedTrips) => {
  if (savedTrips.length !== 0) {
    for (let trip of savedTrips) {
      if (trip.dataGeonames.geonameId === tripToSaveID) {
        return true;
      }
    }
    return false;
  }
};

export { handleSubmit, saveTrip, removeTrip };
