import ItemCard from "./ItemCard.jsx";

function ClothesSection({ handleCardClick, clothingItems, handleAddClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__items">Your Items</p>
        <button className="clothes-section__button" onClick={handleAddClick}>
          + Add Items
        </button>
      </div>
      <ul className="cards__list">
        {clothingItems
          .sort((a, b) => b._id - a._id)
          .map((item) => {
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
