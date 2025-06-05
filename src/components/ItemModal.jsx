function ItemModal({ activeModal, handleCloseClick, card }) {
  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__image-preview">
        <button
          onClick={handleCloseClick}
          className="modal__close-btn modal__close-btn_type_image-preview"
        ></button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <h2 className="modal__caption">{card.name}</h2>
        <p className="modal__weather">Weather: {card.weather}</p>
      </div>
    </div>
  );
}

export default ItemModal;
