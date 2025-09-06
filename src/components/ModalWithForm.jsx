function ModalWithForm({
  children,
  title,
  submitBtnText,
  isOpen,
  handleCloseClick,
  onSubmit,
  onClick,
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
        {/*check for Login buttons in the Modal first, then register(signup) modal, second, then return a regular submit button last.*/}
        {submitBtnText === "Log in" ? (
          <div className="modal__submit-btn-with-redirect">
            <button type="submit" className="modal__submit-btn">
              {submitBtnText}
            </button>
            <button
              onClick={onClick}
              type="button"
              className="modal__redirect-btn"
            >
              or Sign Up
            </button>
          </div>
        ) : submitBtnText === "Sign Up" ? (
          <div className="modal__submit-btn-with-redirect">
            <button type="submit" className="modal__submit-btn">
              {submitBtnText}
            </button>
            <button
              onClick={onClick}
              type="button"
              className="modal__redirect-btn"
            >
              or Log In
            </button>
          </div>
        ) : (
          <button type="submit" className="modal__submit-btn">
            {submitBtnText}
          </button>
        )}
      </form>
    </div>
  );
}

export default ModalWithForm;
