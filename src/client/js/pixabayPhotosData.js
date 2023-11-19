const fetchPixabayPhotos = async (
  photoType,
  category,
  isSafeSearch,
  orderBy,
  imageFormat,
  destination
) => {
  // spaces in the string "destination" should be replaced with "+"
  const destinationPixabay = destination.split(" ").join("+");

  // https://pixabay.com/api/docs/
  const requestBodyPixabay = {
    BASE_URL: `https://pixabay.com/api/?q=${destinationPixabay}&image_type=${photoType}&category=${category}&safesearch=${isSafeSearch}&order=${orderBy}&orientation=${imageFormat}`,
  };

  const pixabayResponse = await fetch("/pixabay-photos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBodyPixabay),
  });

  const dataPixabay = await pixabayResponse.json();
  return dataPixabay;
};

export { fetchPixabayPhotos };
