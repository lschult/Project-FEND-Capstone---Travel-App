const fetchWeatherbitData = async (daysUntil, lat, lon) => {
  let formatOfForecast = "hourly";
  if (daysUntil > 7) formatOfForecast = "daily";

  const weatherPostRequestBody = {
    BASE_URL: `https://api.weatherbit.io/v2.0/forecast/${formatOfForecast}?lat=${lat}&lon=${lon}`,
  };

  const weatherResponse = await fetch("/weather-bit-forecast", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(weatherPostRequestBody),
  });

  const weatherData = await weatherResponse.json();
  return weatherData;
};

export { fetchWeatherbitData };
