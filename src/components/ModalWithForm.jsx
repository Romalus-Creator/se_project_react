function ModalWithForm({
  children,
  title,
  submitBtnText,
  isOpen,
  handleCloseClick,
  onSubmit,
  isComplete,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <form onSubmit={onSubmit} action="" className="modal__form">
        <div className="modal__title">
          <h2 className="modal__header">{title}</h2>
          <button
            type="button"
            onClick={handleCloseClick}
            className="modal__close-btn"
          />
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
