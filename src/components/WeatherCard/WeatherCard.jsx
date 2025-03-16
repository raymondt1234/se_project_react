import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData}) {
  const filteredOption = weatherOptions.filter((option) => {
    return (
      option.isDay === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const timeOfDay = weatherData?.isDay ? "day" : "night";
  let weatherOptionUrl;

  if (filteredOption.length === 0) {
    weatherOptionUrl = defaultWeatherOptions[timeOfDay].url;
  } else {
    weatherOptionUrl = filteredOption[0]?.url;
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}&deg; F</p>
      <img
        className="weather-card__image"
        src={weatherOptionUrl}
        alt={`Card showing ${timeOfDay}time ${weatherData.condition}`}
      />
    </section>
  );
}

export default WeatherCard;
