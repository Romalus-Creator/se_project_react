import ItemCard from "./ItemCard.jsx";
import { defaultClothingItems } from "../utils/constants.js";

function ClothesSection({ handleCardClick, clothingItems }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__items">Your Items</p>
        <button className="clothes-section__button">+ Add Items</button>
      </div>
      <ul className="cards__list">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              //TODO: pass as prop
              handleCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
