import "./Header.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import headerLogo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  weatherData,
  isLoggedIn,
  handleSignUpClick,
  handleLoginClick,
  handleAddClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { name, avatar } = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={headerLogo} alt="logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__button-container">
        <ToggleSwitch />
        {isLoggedIn ? (
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
        ) : (
          <>
            <button
              onClick={handleSignUpClick}
              type="button"
              className="header__sign-up-btn"
            >
              Sign Up
            </button>
            <button
              onClick={handleLoginClick}
              type="button"
              className="header__login-btn"
            >
              Log In
            </button>
          </>
        )}
      </div>
      {isLoggedIn && (
        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__username">{name}</p>
            <img className="header__avatar" src={avatar} alt={name} />
          </div>
        </Link>
      )}
    </header>
  );
}

export default Header;
