import "./ModalWithForm.css";
import closeGrey from "../../assets/close-x-grey.svg";

function ModalWithForm({
  children,
  title,
  buttonText,
  onClose,
  isOpen,
  onSubmit,
  toggleButton,
  errorMessage,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img
            className="modal__close_image"
            src={closeGrey}
            alt="close button"
          />
        </button>
        <form onSubmit={onSubmit} className="modal__form" noValidate>
          {children}

          {errorMessage && (<p className="modal__error-message">{errorMessage}</p>)}
          <div className="modal__button-container">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            {toggleButton && (
              <button
                onClick={toggleButton.onClick}
                type="button"
                className="modal__button"
              >
                {toggleButton.buttonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
