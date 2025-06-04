function ModalWithForm({
  children,
  title,
  submitBtnText,
  activeModal,
  handleCloseClick,
}) {
  return (
    <div
      className={`modal ${activeModal === "add-garment" ? "modal_opened" : ""}`}
    >
      <form action="" className="modal__form">
        <div className="modal__title">
          <h2 className="modal__header">{title}</h2>
          <button onClick={handleCloseClick} className="modal__close-btn">
            get icon
          </button>
        </div>
        {children}
        <button type="submit" className="modal__submit-btn">
          {submitBtnText}
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;
