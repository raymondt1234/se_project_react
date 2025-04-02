import "./WeatherCard.css";
import { useContext } from "react";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

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
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]}&deg;{currentTemperatureUnit}
      </p>
      <img
        className="weather-card__image"
        src={weatherOptionUrl}
        alt={`Card showing ${timeOfDay}time ${weatherData.condition}`}
      />
    </section>
  );
}

export default WeatherCard;
