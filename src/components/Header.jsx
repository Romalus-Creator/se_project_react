import Logo from "../assets/Logo.svg";
import ProfileImage from "../assets/profile-image.png";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <div className="header">
      <div className="header__left-container">
        <img src={Logo} alt="what to wear logo" />
        <h2 className="header__date-and-location">{currentDate}, City</h2>
      </div>
      <div className="header__right-container">
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <div className="header__profile">
          Roman Ehrhardt
          <img
            src={ProfileImage}
            alt="image of the current user"
            className="header__profile-image"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
