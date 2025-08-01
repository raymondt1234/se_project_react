import "./RegisterModal.css";
import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ onClose, isOpen, isLoading, onRegisterModalSubmit, onLoginClick}) {
  const { values, handleChange, setValues } = useForm({email: "", password: "", name: "", avatar: ""});

  useEffect(() => {
    setValues({email: "", password: "", name: "", avatar: ""});
  }, [isOpen, setValues]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegisterModalSubmit(values);
  };

  const toggleButton = {buttonText: "or Log in", onClick: onLoginClick}

  return (
    <ModalWithForm
      title="Sign up"
      buttonText= {isLoading? "Registering ..." : "Sign up"}
      onClose={onClose}
      isOpen={isOpen}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      toggleButton={toggleButton}
    >
      <label htmlFor="register-email" className="modal__label">
        Email*{" "}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="register-email"
          placeholder="Email"
          required
          onChange={handleChange}
          value={values.email}
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password*{" "}
        <input
          type="password"
          name="password"
          className="modal__input"
          id="register-password"
          placeholder="Password"
          minLength={8}
          maxLength={30}
          required
          onChange={handleChange}
          value={values.password}
        />
      </label>
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

export default RegisterModal;
