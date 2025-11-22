import "./EditProfileModal.css";
import { useEffect } from "react";
import { useContext } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({
  onClose,
  isOpen,
  isLoading,
  onEditProfileModalSubmit,
  errorMessage,
  onClearErrorMessage,
}) {
  const { name, avatar } = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({ name: "", avatar: "" });

  useEffect(() => {
    setValues({ name, avatar: avatar || ""});
  }, [name, avatar, isOpen, setValues]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onEditProfileModalSubmit(values);
  };

  const handleInput = (event) => {
    handleChange(event);
    onClearErrorMessage();
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText={isLoading ? "Saving changes ..." : "Save changes"}
      onClose={onClose}
      isOpen={isOpen}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      errorMessage={errorMessage}
    >
      <label htmlFor="name" className="modal__label">
        Name*{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          minLength={1}
          maxLength={30}
          onChange={handleInput}
          value={values.name}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL*{" "}
        <input
          type="url"
          name="avatar"
          className="modal__input"
          id="avatar"
          placeholder="Avatar URL"
          onChange={handleInput}
          value={values.avatar}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
