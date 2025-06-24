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
import { getItems, postItem, deleteItem } from "../utils/api.js";

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
  const [clothingItems, setClothingItems] = useState([]);

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

  //TODO: RESET NAME, IMAGE, AND RADIO BTN TO "" AFTER CLOSING MODAL.
  const closeModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, weather, imageUrl }) => {
    const newId = Math.max(...clothingItems.map((item) => item._id)) + 1;
    //Using the formula with oldItems below prevents 'stale state values' from being used when adding new item.
    postItem({ name, weather, imageUrl })
      .then(({ name, weather, imageUrl }) => {
        setClothingItems((oldItems) => {
          return [...oldItems, { _id: newId, name, weather, imageUrl }];
        });
      })
      .catch(console.error);

    closeModal();
  };

  const handleDeleteItemModalSubmit = (evt) => {
    const _id = evt.currentTarget.value;
    console.log(`before deleteItem: ${_id}`);
    clothingItems.pop();
    deleteItem({ _id })
      .then(() => {
        setClothingItems((clothingItems) => {
          return [...clothingItems];
        });
      })
      .catch(console.error);
    closeModal();
  };

  // POST Clothing Items API
  useEffect(() => {}, []);

  //Weather Data API
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  // GET Clothing Items API
  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
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
          <Route
            path="/profile"
            element={
              <Profile
                handleCardClick={handleCardClick}
                clothingItems={clothingItems}
              ></Profile>
            }
          ></Route>
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
          handleDeleteClick={handleDeleteItemModalSubmit}
        />
      </div>
    </CurrentTemperatureContext.Provider>
  );
}

export default App;
