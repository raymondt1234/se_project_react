import "./AddItemModal.css";
import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({
  onClose,
  isOpen,
  isLoading,
  onAddItemModalSubmit,
  errorMessage,
  onClearErrorMessage,
}) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  useEffect(() => {
    setValues({ name: "", imageUrl: "", weather: "" });
  }, [isOpen, setValues]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddItemModalSubmit(values);
  };

  const handleInput = (event) => {
    handleChange(event);
    onClearErrorMessage();
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText={isLoading ? "Adding garment..." : "Add garment"}
      onClose={onClose}
      isOpen={isOpen}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      errorMessage={errorMessage}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          onChange={handleInput}
          value={values.name}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          name="imageUrl"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          onChange={handleInput}
          value={values.imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="hot"
            type="radio"
            className="modal__radio-input"
            onChange={handleInput}
            value="hot"
            checked={values.weather === "hot"}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="warm"
            type="radio"
            className="modal__radio-input"
            onChange={handleInput}
            value="warm"
            checked={values.weather === "warm"}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="cold"
            type="radio"
            className="modal__radio-input"
            onChange={handleInput}
            value="cold"
            checked={values.weather === "cold"}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
