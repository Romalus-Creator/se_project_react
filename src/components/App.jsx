import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import ItemModal from "./ItemModal.jsx";
import { coordinates, APIkey } from "../utils/constants.js";
import { getWeather, filterWeatherData } from "../utils/weatherApi.js";
import Footer from "./Footer.jsx";
import CurrentTemperatureContext from "../contexts/CurrentTemperatureUnitContext.js";
import AddItemModal from "../components/AddItemModal.jsx";
import { defaultClothingItems } from "../utils/constants.js";
import Profile from "./Profile.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "warm",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

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

  const handleAddItemModalSubmit = ({ name, weather, imageUrl }) => {
    //TODO: Will need to remove newId once mock server is established on this project.
    const newId = Math.max(...clothingItems.map((item) => item._id)) + 1;
    //Using the formula with oldItems below prevents 'stale state values' from being used when adding new item.
    setClothingItems((oldItems) => {
      [{ _id: newId, name, weather, link: imageUrl }, ...oldItems];
    });
    closeModal();
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
    <CurrentTemperatureContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherData={weatherData}
                handleCardClick={handleCardClick}
                clothingItems={clothingItems}
              />
            }
          />
          <Route path="/profile" element={<Profile></Profile>}></Route>
        </Routes>
        <Footer />
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          handleCloseClick={closeModal}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        ></AddItemModal>
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          handleCloseClick={closeModal}
        />
      </div>
    </CurrentTemperatureContext.Provider>
  );
}

export default App;
