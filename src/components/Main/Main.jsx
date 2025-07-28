import "./Main.css";
import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";

function Main({
  isLoggedIn,
  weatherData,
  onCardClick,
  onCardLike,
  clothingItems,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]}&deg;
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <li key={item._id}>
                  <ItemCard
                    isLoggedIn={isLoggedIn}
                    item={item}
                    onCardClick={onCardClick}
                    onCardLike={onCardLike}
                  />
                </li>
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
