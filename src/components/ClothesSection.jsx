import { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import CurrentUserContext from "../contexts/CurrentUserContext.jsx";
import ItemCard from "./ItemCard.jsx";

function ClothesSection({
  handleCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {}, [currentUser]);

  const userClothingItems = clothingItems.filter((item) => {
    return item.owner === currentUser._id;
  });

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__items">Your Items</p>
        <button className="clothes-section__button" onClick={handleAddClick}>
          + Add Items
        </button>
      </div>
      <ul className="cards__list">
        {userClothingItems
          .sort((a, b) => b._id - a._id)
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                handleCardClick={handleCardClick}
                onCardLike={onCardLike}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
