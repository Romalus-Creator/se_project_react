import { useEffect, useState } from "react";
// import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import ModalWithForm from "./ModalWithForm.jsx";
import ItemModal from "./ItemModal.jsx";
import { coordinates, APIkey } from "../utils/constants.js";
import { getWeather, filterWeatherData } from "../utils/weatherApi.js";
import Footer from "./Footer.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "warm",
    temp: {},
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("isOpen");
  };

  const closeModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <Header handleAddClick={handleAddClick} weatherData={weatherData} />
      <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      <Footer />
      <ModalWithForm
        title="New garment"
        submitBtnText="Add garment"
        // isOpen={activeModal === "add-garment"}
        activeModal={activeModal}
        handleCloseClick={closeModal}
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
              type="radio"
              className="modal__radio-input"
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
              type="radio"
              className="modal__radio-input"
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
              type="radio"
              className="modal__radio-input"
            />
            cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        handleCloseClick={closeModal}
      />
    </div>
  );
}

export default App;
