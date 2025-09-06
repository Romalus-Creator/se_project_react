import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import Logo from "../assets/Logo.svg";
import ProfileImage from "../assets/RomanSmallCircleImage.gif";
import ToggleSwitch from "./ToggleSwitch";
import CurrentUserContext from "../contexts/CurrentUserContext.jsx";

function Header({
  handleAddClick,
  handleLoginClick,
  handleRegisterClick,
  weatherData,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { isLoggedIn } = useContext(AppContext);
  const { currentUser } = useContext(CurrentUserContext);

  const currentUserInitial = currentUser.name ? currentUser.name[0] : "";

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

      {/*The header's right-container if the user is logged in. */}

      {isLoggedIn ? (
        <div className="header__right-container">
          <ToggleSwitch />
          <button
            onClick={handleAddClick}
            type="button"
            className="header__btn"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__profile">
              {currentUser.name}
              {currentUser.avatar !== "" && currentUser.avatar !== undefined ? (
                <img
                  src={currentUser.avatar}
                  alt="image of the current user"
                  className="header__profile-image"
                />
              ) : (
                <div className="header__profile-image-sub">
                  {currentUserInitial}
                </div>
              )}
            </div>
          </Link>
        </div>
      ) : (
        <div className="header__right-container">
          <ToggleSwitch />
          {/*IF STATEMENT TO CHECK IF LOGGED IN. TRUE = ADD CLOTHES AND PROFILE INFO. FALSE = SIGNUP & LOGIN BTNS*/}

          <button
            onClick={handleRegisterClick}
            type="button"
            className="header__btn"
          >
            Sign Up
          </button>
          <button
            onClick={handleLoginClick}
            type="button"
            className="header__btn"
          >
            Log In
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
