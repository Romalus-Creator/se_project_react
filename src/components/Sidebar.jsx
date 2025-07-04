import ProfileImage from "../assets/RomanSmallCircleImage.gif";
function Sidebar() {
  return (
    <div className="sidebar">
      <img
        src={ProfileImage}
        alt="The user's profile picture"
        className="sidebar__profile-image"
      />
      <p className="sidebar__username">Roman Ehrhardt</p>
    </div>
  );
}
export default Sidebar;
