function ItemModal({ activeModal, handleCloseClick, card }) {
  return (
    <div
      className={`modal modal__content_type_image ${
        activeModal === "preview" ? "modal_opened" : ""
      }`}
    >
      <button onClick={handleCloseClick} className="modal__close-btn">
        get icon
      </button>
      <img src={card.link} alt={card.name} className="modal__image" />
      <div className="modal__footer">
        <h2 className="modal__caption">{card.name}</h2>
        <p className="modal__weather">Weather: {card.weather}</p>
      </div>
    </div>
  );
}

export default ItemModal;
