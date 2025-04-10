import "./DeleteConfirmationModal.css";
import closeGrey from "../../assets/close-x-grey.svg";

function DeleteConfirmationModal({
  activeModal,
  onClose,
  onDeleteItem,
  card,
}) {
  return (
    <div
      className={`modal ${activeModal === "confirm-delete" && "modal_opened"}`}
    >
      <div className="modal__content modal__content_type_confirm">
        <button onClick={onClose} type="button" className="modal__close">
          <img
            className="modal__close_image"
            src={closeGrey}
            alt="close button"
          />
        </button>
        <div className="modal__confirmation-modal-messages">
          <p className="modal__confirmation-msg">
            Are you sure you want to delete this item?
          </p>
          <p className="modal__confirmation-msg">
            This action is irreversible.
          </p>
        </div>
        <div className="modal__confirmation-modal-buttons">
          <button
            onClick={() => {
              onDeleteItem(card._id);
              onClose();
            }}
            className="modal__confirmation-btn"
          >
            Yes, delete item
          </button>
          <button
            onClick={onClose}
            className="modal__confirmation-btn modal__cancel-btn"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
