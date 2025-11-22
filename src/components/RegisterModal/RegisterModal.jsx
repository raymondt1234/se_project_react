import "./RegisterModal.css";
import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({
  onClose,
  isOpen,
  isLoading,
  onRegisterModalSubmit,
  onLoginClick,
  errorMessage,
  onClearErrorMessage,
}) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  useEffect(() => {
    setValues({ email: "", password: "", name: "", avatar: "" });
  }, [isOpen, setValues]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegisterModalSubmit(values);
  };

  const handleInput = (event) => {
    handleChange(event);
    onClearErrorMessage();
  };

  const toggleButton = { buttonText: "or Log in", onClick: onLoginClick };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText={isLoading ? "Registering ..." : "Sign up"}
      onClose={onClose}
      isOpen={isOpen}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      toggleButton={toggleButton}
      errorMessage={errorMessage}
    >
      <label htmlFor="register-email" className="modal__label">
        Email*{" "}
        <input
          name="email"
          className="modal__input"
          id="register-email"
          placeholder="Email"
          onChange={handleInput}
          value={values.email}
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password*{" "}
        <input
          name="password"
          className="modal__input"
          id="register-password"
          placeholder="Password"
          onChange={handleInput}
          value={values.password}
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name*{" "}
        <input
          name="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          onChange={handleInput}
          value={values.name}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL*{" "}
        <input
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

export default RegisterModal;
