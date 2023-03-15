// import weather from "../data/current-weather.js";
//weather.name
import { formatDate, formatTemp } from "./utils/format-data.js";
import { weatherConditionsCodes } from "./constants.js";
import { getLatLon } from "./geolocation.js";
import { getCurrentWeather } from "./services/weather.js";
/* en esta parte, importo con el nombre de la funcion entre llaves, porque
solo estoy importando esa funcion */

/* weather.main.temp ahí esta la temperatura*/

/*weather.main.temp  aquí veo la temperatura del API q nos dió descargado para el ejemplo*/

/* weatherConditionscodes["3"]  aquí se muestra un clima determinado del diccionario
que creamos, lo llamo como string porq así se muestra el elemento del objeto, no es un array*/

/* String(weather.weather[0].id).charAt(0)  es la ubicación donde esta el elemento a usar para el
ejemplo, lo convertimos en string para q haga match con el método a usar (arriba),
una propiedad de los strings es el charAt() que sirve para ubicar el caracter de lo buscado*/

/* Ahora lo reemplazo:
weatherConditionscodes[String(weather.weather[0].id).charAt(0)]
 */

/* UNA FORMA:
function configCurrentWeather(weather) {
  //loader
  // date
  // city
  const $currentWeatherCity = document.querySelector("#current-weather-city");
  debugger;  sirve para parar la ejecución y verificar mi código
  $currentWeatherCity.textContent = weather.name;
  //temp
  // background
}
*/

/* OTRA FORMA*/

function solarStatus(sunsetTime, sunriseTime) {
  const currentHours = new Date().getHours();
  const sunsetHours = sunsetTime.getHours();
  const sunriseHours = sunriseTime.getHours();

  if (currentHours > sunsetHours || currentHours < sunriseHours) {
    return "night";
  }
  return "morning";
}

function setBackground($el, conditionCode, solarStatus) {
  const weatherType = weatherConditionsCodes[conditionCode];
  /* Obtengo solo el string que necesito del diccionario,para ello debo hacer match con lo q está en mi diccionario*/
  const size = window.matchMedia("(-webkit-min-device-pixel-ratio: 2)").matches
    ? "@2x"
    : "";
  /* true: ? '@2x' : '' */
  // let = size;
  // if (window.matchMedia("(-webkit-min-device-pixel-ratio: 2)").matches) {
  //   size = '@2x'
  // }

  $el.style.backgroundImage = `url(./images/${solarStatus}-${weatherType}.jpg)`;
  /* $el.style.backgroundImage = `url(./images/morning-drizzle.jpg)`;  reemplazando*/
}

function setCurrentTemp($el, temp) {
  $el.textContent = formatTemp(temp);
}

function setCurrentDate($el) {
  const date = new Date();
  const formattedDate = formatDate();
  $el.textContent = formattedDate;
}

function setCurrentCity($el, city) {
  $el.textContent = city;
}

function showCurrentWeather($app, $loader) {
  $app.hidden = false;
  $loader.hidden = true;
}

function configCurrentWeather(weather) {
  const $app = document.querySelector("#app");
  const $loading = document.querySelector("#loading");
  //loader
  showCurrentWeather($app, $loading);
  // date
  const $currentWeatherDate = document.querySelector("#current-weather-date");
  setCurrentDate($currentWeatherDate);
  // city
  const $currentWeatherCity = document.querySelector("#current-weather-city");
  const city = weather.name;
  setCurrentCity($currentWeatherCity, city);
  //temp
  const $currentWeatherTemp = document.querySelector("#current-weather-temp");
  const temp = weather.main.temp;
  setCurrentTemp($currentWeatherTemp, temp);
  // background
  const sunriseTime = new Date(weather.sys.sunrise * 1000);
  const sunsetTime = new Date(weather.sys.sunset * 1000);
  const conditionCode = String(weather.weather[0].id).charAt(0);
  /*le creo una const, el procedimiento se encuentra al inicio de la página*/
  setBackground($app, conditionCode, solarStatus(sunriseTime, sunsetTime));
}

/*
export default function currentWeather() {
  // GEO // API - weather // Config
  console.log("esto pasa antes de getCurrentPosition");
  // const latlon = getCurrentPosition();
  getCurrentPosition()
    .then((data) => {
      console.log("hemos triunfado", data);
    })
    .catch((message) => {
      console.log(message);
    });
  console.log("esto pasa despues de getCurrentPosition");
  configCurrentWeather(weather);
  console.log(weather);
}
*/

/* con FUNCION ASINCRONA */

export default async function currentWeather() {
  // GEO // API - weather // Config
  // console.log("esto pasa antes de getCurrentPosition");

  const { lat, lon, isError } = await getLatLon();
  if (isError) console.log("Ah ocurrido un error ubicandote");
  console.log(lat, lon);

  const { isError: currentWeatherError, data: weather } =
    await getCurrentWeather(lat, lon);
  if (currentWeatherError) return console.log("Oh!!, ocurrió un error ");
  configCurrentWeather(weather);
  // console.log(weather);
}
