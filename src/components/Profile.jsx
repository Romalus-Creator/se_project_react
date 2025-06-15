import Sidebar from "./Sidebar.jsx";
import ClothesSection from "./ClothesSection.jsx";

function Profile() {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar></Sidebar>
      </section>
      <section className="profile__clothing-items">
        <ClothesSection></ClothesSection>
      </section>
    </div>
  );
}
export default Profile;
