import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { getWeather, processWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { signup, signin, validateToken } from "../../utils/auth";
import {
  getItems,
  addItem,
  likeItem,
  dislikeItem,
  editProfile,
  deleteItem,
} from "../../utils/api";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    avatar: "",
    _id: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    setActiveModal("sign-up");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

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

  const login = (email, password) => {
    signin(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        localStorage.setItem("jwt", res.token);
        closeActiveModal();
        setCurrentUser(res.user);
        navigate("/profile");
      })
      .catch(console.error);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    setCurrentUser({
      name: "",
      email: "",
      avatar: "",
      _id: "",
    });
    navigate("/");
  };

  const handleRegisterModalSubmit = ({ email, password, name, avatar }) => {
    setIsLoading(true);
    signup(email, password, name, avatar)
      .then(() => {
        login(email, password);
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEditProfileModalSubmit = ({ name, avatar }) => {
    setIsLoading(true);
    editProfile(name, avatar)
      .then(() => {
        setCurrentUser((updatedUser) => ({ ...updatedUser, name, avatar }));
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLoginModalSubmit = ({ email, password }) => {
    login(email, password);
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    setIsLoading(true);
    addItem(name, imageUrl, weather)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardLike = ({ _id }, isLiked) => {
    !isLiked
      ? likeItem(_id)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : dislikeItem(_id)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        removeItem(id);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const openConfirmationModal = () => {
    setActiveModal("confirm-delete");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const removeItem = (id) => {
    setClothingItems(clothingItems.filter((item) => item._id !== id));
  };

  const loadItems = () => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const processedData = processWeatherData(data);
        setWeatherData(processedData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    validateToken(localStorage.jwt)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, []);

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleSignUpClick={handleSignUpClick}
              handleLoginClick={handleLoginClick}
              handleAddClick={handleAddClick}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    isLoggedIn={isLoggedIn}
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    isLoggedIn={isLoggedIn}
                    handleLogout={logout}
                    handleAddClick={handleAddClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onEditProfileClick={handleEditProfileClick}
                    clothingItems={clothingItems}
                  />
                }
              />
            </Routes>

            <Footer />
          </div>
          <RegisterModal
            onClose={closeActiveModal}
            isOpen={activeModal === "sign-up"}
            isLoading={isLoading}
            onLoginClick={handleLoginClick}
            onRegisterModalSubmit={handleRegisterModalSubmit}
          />
          <LoginModal
            onClose={closeActiveModal}
            isOpen={activeModal === "login"}
            isLoading={isLoading}
            onSignUpClick={handleSignUpClick}
            onLoginModalSubmit={handleLoginModalSubmit}
          />
          <EditProfileModal
            onClose={closeActiveModal}
            isOpen={activeModal === "edit-profile"}
            isLoading={isLoading}
            onEditProfileModalSubmit={handleEditProfileModalSubmit}
          />
          <AddItemModal
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            isLoading={isLoading}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            card={selectedCard}
            openConfirmationModal={openConfirmationModal}
          />
          <DeleteConfirmationModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            card={selectedCard}
            onDeleteItem={handleDeleteItem}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
