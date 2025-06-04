import { useEffect, useState } from "react";
import "../blocks/App.css";
// import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import ModalWithForm from "./ModalWithForm.jsx";
import ItemModal from "./ItemModal.jsx";
import { coordinates, APIkey } from "../utils/constants.js";
import { getWeather, filterWeatherData } from "../utils/weatherApi.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        console.log(data);
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      </div>
      <ModalWithForm
        title="New garment"
        submitBtnText="+ Add garment"
        activeModal={activeModal}
        handleCloseClick={closeModal}
      >
        <label htmlFor="" className="modal__label" placeholder="Name">
          Name <input type="text" className="modal__input" />
        </label>
        <label htmlFor="" className="modal__label" placeholder="Image URL">
          Image <input type="URL" className="modal__input" />
        </label>
        <fieldset className="modal__radio-btns">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            hot
            <input id="hot" type="radio" className="modal__radio-input" />
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            warm
            <input id="warm" type="radio" className="modal__radio-input" />
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            cold
            <input id="cold" type="radio" className="modal__radio-input" />
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
