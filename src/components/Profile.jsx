import Sidebar from "./Sidebar.jsx";
import ClothesSection from "./ClothesSection.jsx";

function Profile({ handleCardClick, clothingItems, handleAddClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar></Sidebar>
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleAddClick={handleAddClick}
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
        ></ClothesSection>
      </section>
    </div>
  );
}
export default Profile;
