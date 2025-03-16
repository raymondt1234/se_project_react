import "./Header.css";
import headerLogo from "../../assets/logo.svg";
import avatarImage from "../../assets/avatar.svg";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="logo" />
      <p className="header__date-and-location">{currentDate}, {weatherData.city}</p>
      <button onClick={handleAddClick} type="button" className="header__add-clothes-btn">+ Add clothes</button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img
          className="header__avatar"
          src={avatarImage}
          alt="Terrence Tegegne"
        />
      </div>
    </header>
  );
}

export default Header;
