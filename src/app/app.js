/* Global Variables */
const weatherKey = "b122a4f05f463e875757670cc3174f1a";
const weatherAPI = "https://api.openweathermap.org/data/2.5/weather";
const journalAPI = "http://localhost:8000/api/weather-journal";

// eventlistener when user clicks button
const button = document.getElementById("generate");
button.addEventListener("click", submitJournalEntry);

// get input values from user
// used city name instead of zip code for easier usability

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

// save user input and api data
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

// get weather data from open weather api server using url
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

// save data to weather journal
async function saveDataToWeatherJournal(data) {
  try {
    const response = await fetch(journalAPI, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    throw new Error("cannot save entry in your journal. please try again");
  }
}

// function to make date readable
function readableDate(date) {
  const newDate = new Date(date).toLocaleDateString();
  return newDate;
}

// dynamically update entry with new input/data
function updateRecentEntry(data) {
  document.getElementById(
    "temp"
  ).innerHTML = `Temperature: ${data.temp} &#8451;`;
  document.getElementById("date").textContent = `Date: ${readableDate(
    data.date
  )}`;
  document.getElementById("content").textContent = `Feeling: ${data.feeling}`;
}
