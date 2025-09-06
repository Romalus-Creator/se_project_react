import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import AppContext from "../contexts/AppContext";

function ItemCard({ item, handleCardClick, onCardLike }) {
  const { token, currentUser } = useContext(CurrentUserContext);
  const { isLoggedIn } = useContext(AppContext);

  useEffect(() => {}, [currentUser]);
  const _id = item._id;
  const isLiked = item.likes.some((_id) => _id === currentUser._id);
  const itemLikeButtonClassName = isLiked
    ? "card__like-btn_clicked"
    : "card__like-btn";

  const onCardClick = () => {
    handleCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ _id, isLiked, token });
  };
  return (
    <li className="card">
      <div className="card__name-section">
        <h2 className="card__name">{item.name}</h2>
        <button
          className={itemLikeButtonClassName}
          onClick={handleLike}
        ></button>
      </div>
      <img
        onClick={onCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
