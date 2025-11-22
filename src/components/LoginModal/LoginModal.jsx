import "./LoginModal.css";
import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ onClose, isOpen, isLoading, onLoginModalSubmit, onSignUpClick, errorMessage, onClearErrorMessage }) {
  const { values, handleChange, setValues } = useForm({email: "", password: ""});

  useEffect(() => {
    setValues({email: "", password: ""});
  }, [isOpen, setValues]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onLoginModalSubmit(values);
  };

  const handleInput = (event) => {
    handleChange(event);
    onClearErrorMessage();
  }

  const toggleButton = {buttonText: "or Sign up", onClick: onSignUpClick}

  return (
    <ModalWithForm
      title="Log in"
      buttonText= {isLoading? "Logging in..." : "Log in"}
      onClose={onClose}
      isOpen={isOpen}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      toggleButton={toggleButton}
      errorMessage={errorMessage}
    >
      <label htmlFor="login-email" className="modal__label">
        Email{" "}
        <input
          name="email"
          className="modal__input"
          id="login-email"
          placeholder="Email"
          onChange={handleInput}
          value={values.email}
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password{" "}
        <input
          name="password"
          type="password"
          className="modal__input"
          id="login-password"
          placeholder="Password"
          onChange={handleInput}
          value={values.password}
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
