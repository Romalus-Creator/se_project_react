import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.jsx";

function Sidebar({ handleEditProfileClick, handleLogout }) {
  const { currentUser } = useContext(CurrentUserContext);
  const currentUserInitial = currentUser.name ? currentUser.name[0] : "";
  return (
    <div className="sidebar">
      <div className="sidebar__profile-section">
        {currentUser.avatar !== "" && currentUser.avatar !== "undefined" ? (
          <img
            src={currentUser.avatar}
            alt="The user's profile picture"
            className="sidebar__profile-image"
          />
        ) : (
          <div className="sidebar__profile-image-sub">{currentUserInitial}</div>
        )}
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__options-section">
        <button
          className="sidebar__option-btn"
          onClick={handleEditProfileClick}
        >
          Change profile data
        </button>
        <button className="sidebar__option-btn" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}
export default Sidebar;
