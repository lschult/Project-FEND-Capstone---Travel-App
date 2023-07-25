/* Global Variables */
const weatherKey = "b122a4f05f463e875757670cc3174f1a";
const weatherAPI = "https://api.openweathermap.org/data/2.5/weather";
const journalAPI = "http://localhost:8000/api/weather-journal";

const button = document.getElementById("generate");
button.addEventListener("click", submitJournalEntry);

function submitJournalEntry() {
  const city = getInputValueById("city");
  const feelings = getInputValueById("feelings");
  saveJournalEntry(city, feelings);
}

function getInputValueById(id) {
  const inputElement = document.getElementById(id);
  const value = inputElement.value;
  return value;
}

async function saveJournalEntry(city, feeling) {
  try {
    const weatherData = await getWeatherData(city);

    const data = {
      ...weatherData,
      date: Date.now(),
      feeling,
      city,
    };

    const journalData = await saveDataToWeatherJournal(data);
    updateRecentEntry(journalData);
    console.log(journalData);
  } catch (error) {
    console.log("Error:", error);
    console.log("pop up notification");
  }
}

async function getWeatherData(city) {
  const metrics = "metric";
  const url = `${weatherAPI}?q=${city}&units=${metrics}&APPID=${weatherKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    const { main } = data;

    return {
      temp: main.temp,
      humidity: main.humidity,
    };
  } catch (error) {
    throw new Error(`cannot get weather info for city ${city}`);
  }
}

async function saveDataToWeatherJournal(data) {
  try {
    const response = await fetch(journalAPI, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json();
  } catch (error) {
    throw new Error("cannot save entry in your journal. please try again");
  }
}

function readableDate(date) {
  const newDate = new Date(date).toLocaleDateString();

  return newDate;
}

function updateRecentEntry(data) {
  document.getElementById(
    "temp"
  ).innerHTML = `Temperature: ${data.temp} &#8451;`;
  document.getElementById("date").textContent = `Date: ${readableDate(
    data.date
  )}`;
  document.getElementById("content").textContent = `Feeling: ${data.feeling}`;
}

/**
 * this function can be used to fetch all the records
 */
// async function getWeatherJournalData(data) {
//   const response = await fetch(journalAPI, {
//     mode: "cors", // no-cors, *cors, same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, *same-origin, omit
//     headers: {
//       "Content-Type": "application/json",
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
//   });
//   return response.json();
// }
