import ProfileImage from "../assets/profile-image.png";
function Sidebar() {
  return (
    <div className="sidebar">
      <img
        src={ProfileImage}
        alt="The user's profile picture"
        className="sidebar__profile-image"
      />
      <p className="sidebar__username">Username</p>
    </div>
  );
}
export default Sidebar;
