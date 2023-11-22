# Weather-Journal App Project

## Overview

This project is part of the of the Udacity Nanodegree Front End Developer Program. It is based on the Web APIs and Asynchronous Applications course.

A starter file with HTML and CSS code, as well as a server.js file including some code and guiding comments, was provided by Udacity.

Slight modifications to the HTML/CSS files were made, the main part consited of creating the JS files in order to make the app usable, based on udate entered by the user, and data received from OpenWeatherMap API.

## Instructions

1.) Run npm intall command to install the dependencies of the project
2.) Run npm start to run application
3.) Access front end at http://127.0.0.1:8000/app/index.html

## Development

This project consists of 5 distinct files:

- server.js

- app/index.html

- app/index.js

- app/style.css

- README.md

The majority of work was performed on the JS files. This included:

1.) Installing Node and various packages to initiate the project (Express, Body-Parser, Cors, Path)
2.) Creating a GET and POST route to return projectData object within the code of the service, and to add any incoming new data to the projectData object, respectively.
3.) After signing up on OpenWeatherMap and acquiring API credentials, global variables were created and by using an async function using fetch(), a GET request was made to the OpenWeatherMap API server.
4.) Using eventListener for clicking the generate button, a callback function was created to be executed. Within this function, the async GET request was activated and called with the parameters URL, the city that is entered by the user, and the personal API key.
5.) POST request initiated (by chaining a promise and using an additional async function) to add the user and API data to the web app. A path (using the path module) and data object containing temperature, date, user input, was sent to the function.
6.) A final Promise was chained to dynamically update the UI. This included an async function which was called after the POST request finished, and it gathered the data from the app and updated the appropriate values (temperature, date, user input) of the relevant DOM elements.

## Contribute

Udacity
