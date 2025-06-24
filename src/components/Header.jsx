import { Link } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import ProfileImage from "../assets/profile-image.png";
import ToggleSwitch from "./ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <div className="header">
      <div className="header__left-container">
        <Link to="/">
          <img className="header__image" src={Logo} alt="what to wear logo" />
        </Link>
        <h2 className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </h2>
      </div>
      <div className="header__right-container">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <Link to="/profile" className="header__link">
          <div className="header__profile">
            Roman Ehrhardt
            <img
              src={ProfileImage}
              alt="image of the current user"
              className="header__profile-image"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
