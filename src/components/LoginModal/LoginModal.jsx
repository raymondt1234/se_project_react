import "./LoginModal.css";
import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ onClose, isOpen, isLoading, onLoginModalSubmit, onSignUpClick }) {
  const { values, handleChange, setValues } = useForm({email: "", password: ""});

  useEffect(() => {
    setValues({email: "", password: ""});
  }, [isOpen, setValues]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onLoginModalSubmit(values);
  };

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
    >
      <label htmlFor="login-email" className="modal__label">
        Email{" "}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="login-email"
          placeholder="Email"
          required
          onChange={handleChange}
          value={values.email}
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password{" "}
        <input
          type="password"
          name="password"
          className="modal__input"
          id="login-password"
          placeholder="Password"
          required
          onChange={handleChange}
          value={values.password}
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
