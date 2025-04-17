import {checkResponse} from "./api";

export const getWeather = ({latitude, longitude}, APIkey) => {

  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(checkResponse);
}

export const processWeatherData = (data) => {
  const currentTimeSeconds = Date.now() / 1000; // convert milliseconds to seconds
  let tempF = Math.round(data.main.temp);
  let tempC = Math.round((data.main.temp - 32) * 5/9);

  const result = {};

  result.type = getWeatherType(data.main.temp);
  result.city = data.name;
  result.temp = {F: tempF, C: tempC };
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, currentTimeSeconds);

  return result;
};

const isDay = ({sunrise, sunset }, now) => {
  return now >= sunrise && now <= sunset;
};

export const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
}