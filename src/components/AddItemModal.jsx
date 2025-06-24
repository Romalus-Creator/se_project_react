import { useState } from "react";
import ModalWithForm from "../components/ModalWithForm";

function AddItemModal({ handleCloseClick, isOpen, onAddItemModalSubmit }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted!");
    //update clothingItems array & closeModal
    onAddItemModalSubmit({ name, weather, imageUrl });
    //reset the inputs
    handleNameChange(e);
    handleImageUrlChange(e);
  };
  return (
    <ModalWithForm
      title="New garment"
      submitBtnText="Add garment"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSubmit}
    >
      <div className="modal__label-container">
        <label
          htmlFor="Garment-Name"
          className="modal__label"
          placeholder="Name"
        >
          Name
        </label>
        <input
          id="Garment-Name"
          type="text"
          className="modal__input"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
        />
      </div>
      <div className="modal__label-container">
        <label
          htmlFor="Garment-image"
          className="modal__label"
          placeholder="Image URL"
        >
          Image
          <input
            id="Garment-image"
            type="URL"
            className="modal__input"
            placeholder="Image URL"
            onChange={handleImageUrlChange}
            value={imageUrl}
          />
        </label>
      </div>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <label
          name="add-garment"
          htmlFor="hot"
          className="modal__label modal__label_type_radio"
        >
          <input
            name="add-garment"
            id="hot"
            value="hot"
            type="radio"
            className="modal__radio-input"
            onChange={handleWeatherChange}
            checked={weather === "hot"}
          />
          hot
        </label>
        <label
          name="add-garment"
          htmlFor="warm"
          className="modal__label modal__label_type_radio"
        >
          <input
            name="add-garment"
            id="warm"
            value="warm"
            type="radio"
            className="modal__radio-input"
            onChange={handleWeatherChange}
            checked={weather === "warm"}
          />
          warm
        </label>
        <label
          name="add-garment"
          htmlFor="cold"
          className="modal__label modal__label_type_radio"
        >
          <input
            name="add-garment"
            id="cold"
            value="cold"
            type="radio"
            className="modal__radio-input"
            onChange={handleWeatherChange}
            checked={weather === "cold"}
          />
          cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
export default AddItemModal;
