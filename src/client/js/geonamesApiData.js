async function fetchGeonamesData(destination) {
  try {
    const requestBody = {
      BASE_URL: `http://api.geonames.org/searchJSON?formatted=true&q=${destination}`,
    };

    const responseGeonames = await fetch("/geonames-places", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const dataGeonames = await responseGeonames.json();
    return dataGeonames;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { fetchGeonamesData };
