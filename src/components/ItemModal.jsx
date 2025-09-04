import { useContext } from "react";
import AppContext from "../contexts/AppContext";
import CurrentUserContext from "../contexts/CurrentUserContext.jsx";

function ItemModal({ activeModal, handleCloseClick, card, handleDeleteClick }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const itemDeleteButtonClassName = `modal__delete-item ${
    isOwn ? "" : "modal__delete-item_hidden"
  }`;

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__image-preview">
        <button
          onClick={handleCloseClick}
          className="modal__close-btn modal__close-btn_type_image-preview"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__text-container">
          <div className="modal__description">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            onClick={handleDeleteClick}
            value={card._id}
            className={itemDeleteButtonClassName}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
