import "./LoginModal.css";
import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ onClose, isOpen, isLoading, onLoginModalSubmit }) {
  const { values, handleChange, setValues } = useForm({email: "", password: ""});

  useEffect(() => {
    setValues({email: "", password: ""});
  }, [isOpen, setValues]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onLoginModalSubmit(values);
  };

  return (
    <ModalWithForm
      title="Log in"
      buttonText= {isLoading? "Logging in..." : "Log in"}
      onClose={onClose}
      isOpen={isOpen}
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          required
          onChange={handleChange}
          value={values.email}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          name="password"
          className="modal__input"
          id="password"
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
