import "./App.css";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, processWeatherData } from "../../utils/weatherApi";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import AddItemModal from "../AddItemModal/AddItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    setClothingItems((prevItems) => [
      ...prevItems,
      { name, link: imageUrl, weather },
    ]);
    closeActiveModal();
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const processedData = processWeatherData(data);
        setWeatherData(processedData);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header weatherData={weatherData} handleAddClick={handleAddClick} />
          <Main
            weatherData={weatherData}
            handleCardClick={handleCardClick}
            clothingItems={clothingItems}
          />
          <Footer />
        </div>
        <AddItemModal
          onClose={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        />
        <ItemModal
          activeModal={activeModal}
          onClose={closeActiveModal}
          card={selectedCard}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
