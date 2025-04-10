import "./ItemModal.css";
import closeWhite from "../../assets/close-x-white.svg";

function ItemModal({ activeModal, onClose, card, openConfirmationModal }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img
            className="modal__close_image"
            src={closeWhite}
            alt="close button"
          />
        </button>
        <img
          src={card.imageUrl}
          alt={`image of a ${card.name}`}
          className="modal__image"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            className="modal__delete-item-btn"
            onClick={openConfirmationModal}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
