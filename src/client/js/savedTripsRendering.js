// This function will check local storage for any saved trips
// Then render any trips to the UI using the renderHTMLTemplate function
const savedTripsRendering = () => {
  // Retrieve the object from storage
  const storedFavoriteTrips = JSON.parse(localStorage.getItem("favoriteTrips"));

  if (storedFavoriteTrips != null) {
    let documentFragment = new DocumentFragment();
    for (let localStorageFavoriteTrip of storedFavoriteTrips) {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card", "card--column");

      // Calcuate the number of days to go
      const daysUntil = Client.calculatedaysUntil(
        localStorageSavedTrip.dateToLeave
      );

      cardElement.innerHTML = Client.templateRendering(
        localStorageFavoriteTrip.pixabayData.webformatURL,
        localStorageFavoriteTrip.destination,
        daysUntil,
        localStorageFavoriteTrip.weatherData,
        localStorageFavoriteTrip.id,
        false
      );

      documentFragment.appendChild(cardElement);
    }
    tripsHistory.appendChild(documentFragment);
  }
};

export { savedTripsRendering };
