const fetchGeonamesData = async (destination) => {
  const requestBody = {
    BASE_URL: `http://api.geonames.org/searchJSON?formatted=true&q=${destination}`,
  };

  const responseGeonames = await fetch("/geo-name-locations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  const dataGeonames = await responseGeonames.json();
  return dataGeonames;
};

export { fetchGeonamesData };
