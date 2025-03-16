import "./ModalWithForm.css";
import closeGrey from "../../assets/close-x-grey.svg";

function ModalWithForm({ children, title, buttonText, activeModal, onClose}) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img className="modal__close_image" src={closeGrey} alt="close button" />
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
