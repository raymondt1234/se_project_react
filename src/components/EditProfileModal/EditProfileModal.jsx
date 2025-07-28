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
}) {
  const { name, avatar } = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({ name: "", avatar: "" });

  useEffect(() => {
    setValues({ name, avatar});
  }, [name, avatar, isOpen, setValues]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onEditProfileModalSubmit(values);
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText={isLoading ? "Saving changes ..." : "Save changes"}
      onClose={onClose}
      isOpen={isOpen}
      isLoading={isLoading}
      onSubmit={handleSubmit}
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
          required
          onChange={handleChange}
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
          required
          onChange={handleChange}
          value={values.avatar}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
