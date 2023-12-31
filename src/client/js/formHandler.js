const tripsHistory = document.getElementById("tripsHistory");

// Render saved trips, wait for the content to be loaded, otherwise Client is not defined
document.addEventListener("DOMContentLoaded", () => {
  Client.renderSavedTrips();
});

const handleSubmit = async (event) => {
  event.preventDefault();

  // Get destination and leaving date formsFields

  const destination = document.getElementById("destination");
  const dateToLeave = document.getElementById("Day Leaving");

  // Validate the form
  const formElements = [destination, dateToLeave];
  const isFormValid = Client.userInputValidation(formElements);
  if (!isFormValid) return;

  const tripDetails = document.getElementById("tripDetails");

  try {
    // Get location details from GeoNamesData
    const dataGeonames = await Client.fetchGeonamesData(destination.value);
    // If there are no results from the fetchGeonamesData, do not continue as the other API calls rely on the results from fetchGeonamesData
    if (dataGeonames.geonames.length === 0) return;

    // Set latitude and longitude co-ords for the destination
    const lat = dataGeonames.geonames[0].lat;
    const lon = dataGeonames.geonames[0].lng;
    // Calculate the number of days until the trip
    const daysUntil = Client.calculateDaysUntil(dateToLeave.value);
    // Get weather forecast from WeatherBit
    const weatherData = await Client.fetchWeatherbitData(daysUntil, lat, lon);
    // Get images from pixababy, the parameters below I have set as default, perhaps this could be improved in the future as well, with Galleries and experiment with different parameters
    const dataPixabay = await Client.fetchPixabayPhotos(
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
      dateToLeave: dateToLeave.value,
      destination: destination.value,
      leavingDate: dateToLeave.value,
      dataGeonames: { ...dataGeonames.geonames[0] },
      weatherData: [...weatherData.data],
      dataPixabay: { ...dataPixabay.hits[0] },
    };

    // Post the search results back to the Express server
    const searchOutcome = await postProjectData(
      "/add-search-favorite",
      projectData
    );
    //  render the returned result in the UI
    //  placeholder image
    let locationImage = "/media/travelpic.jpg"; //add placeholder Image
    // If we have an image from Pixabay then set this as the locationImage instead
    if (searchOutcome.dataPixabay.webformatURL) {
      locationImage = searchOutcome.dataPixabay.webformatURL;
    }
    // Pass the search results to the render function, this will render them in the UI in a card style component
    const innerCard = Client.templateRendering(
      searchOutcome.dataPixabay.webformatURL,
      searchOutcome.destination,
      daysUntil,
      searchOutcome.weatherData,
      searchOutcome.id
    );
    // Update the UI
    tripDetails.innerHTML = `
        <div class="card">
          ${innerCard}
        </div>
      `;
  } catch (error) {
    console.error(error);
  }
};

async function addFavoriteTrip() {
  try {
    const favoriteTrips = await getFavoriteTrips();
    const searchOutcome = await getsearchOutcome();
    // Check if the trip has alread been saved
    const isTripAlreadySaved = isTripSaved(searchOutcome.id, savedTrips);

    if (!isTripAlreadySaved) {
      const favoriteTrip = await postProjectdata(
        "/favorite-trip",
        searchOutcome
      );
      // Put the object into storage
      const updatedFavoriteTrips = await getFavoriteTrips();
      localStorage.setItem(
        "favoriteTrips",
        JSON.stringify(updatedFavoriteTrips)
      );

      // Set the HTML
      const daysUntil = Client.calculateDaysUntil(
        favoriteTrip.date - to - leave
      );
      const locationImage = favoriteTrip.dataPixabay.webformatURL || ""; //add placeholder image

      const cardElement = document.createElement("div");
      cardElement.classList.add("card", "card--column");

      cardElement.innerHTML = Client.templateRendering(
        locationImage,
        favoriteTrip.destination,
        daysUntil,
        favoriteTrip.weatherData,
        favoriteTrip.id,
        false
      );

      tripsHistory.prepend(cardElement);
    }
  } catch (error) {
    console.error(error);
  }
}

async function deleteTrip(event) {
  try {
    const tripCard = event.target.closest(".card");
    const tripId = tripCard.dataset.tripId;

    await deleteTrip(`/remove-saved-trip/${tripId}`);

    tripCard.remove();

    const favoriteTrips = await getFavoriteTrips();

    // Update local storage
    localStorage.setItem("favoriteTrips", JSON.stringify(favoriteTrips));
  } catch (error) {
    console.error(error);
  }
}

const getsearchOutcome = async () => {
  try {
    const response = await fetch("/result-of-search");
    const searchOutcome = await response.json();
    return searchOutcome;
  } catch (error) {
    console.error(error);
  }
};

async function getFavoriteTrips() {
  try {
    const response = await fetch("/see-trips-history");
    const favoriteTrips = await response.json();
    return favoriteTrips;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const postProjectData = async (url = "", data = {}) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const isTripSaved = (tripToSaveID, favoriteTrips) => {
  if (favoriteTrips.length !== 0) {
    for (let trip of s) {
      if (trip.dataGeonames.geonameId === tripToSaveID) {
        return true;
      }
    }
    return false;
  }
};

export { handleSubmit, addFavoriteTrip, deleteTrip };
