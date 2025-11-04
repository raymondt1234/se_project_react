export const weatherOptions = [
  {
    isDay: true,
    condition : "clear",
    url: new URL("../assets/day/clear.png", import.meta.url).href,
  },
  {
    isDay: true,
    condition : "cloudy",
    url: new URL("../assets/day/cloudy.png", import.meta.url).href,
  },
  {
    isDay: true,
    condition : "rain",
    url: new URL("../assets/day/rain.png", import.meta.url).href,
  },
  {
    isDay: true,
    condition : "storm",
    url: new URL("../assets/day/storm.png", import.meta.url).href,
  },
  {
    isDay: true,
    condition : "snow",
    url: new URL("../assets/day/snow.png", import.meta.url).href,
  },
  {
    isDay: true,
    condition : "fog",
    url: new URL("../assets/day/fog.png", import.meta.url).href,
  },
  {
    isDay: false,
    condition : "clear",
    url: new URL("../assets/night/clear.png", import.meta.url).href,
  },
  {
    isDay: false,
    condition : "cloudy",
    url: new URL("../assets/night/cloudy.png", import.meta.url).href,
  },
  {
    isDay: false,
    condition : "rain",
    url: new URL("../assets/night/rain.png", import.meta.url).href,
  },
  {
    isDay: false,
    condition : "storm",
    url: new URL("../assets/night/storm.png", import.meta.url).href,
  },
  {
    isDay: false,
    condition : "snow",
    url: new URL("../assets/night/snow.png", import.meta.url).href,
  },
  {
    isDay: false,
    condition : "fog",
    url: new URL("../assets/night/fog.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day : {
    url: new URL("../assets/day/default.png", import.meta.url).href,
  },
  night : {
    url: new URL("../assets/night/default.png", import.meta.url).href,
  },
};

export const coordinates = {
  latitude: 33.055809,
  longitude: -112.045723,
};

export const APIkey = "d981ad53218f8f462d803f9f7863709e";

export const baseUrl = process.env.NODE_ENV === "production"
  ? "https://api.raymondterryswtwr.crabdance.com"
  : "http://localhost:3001";
