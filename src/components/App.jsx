import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import ItemModal from "./ItemModal.jsx";
import { coordinates, APIkey } from "../utils/constants.js";
import { getWeather, filterWeatherData } from "../utils/weatherApi.js";
import Footer from "./Footer.jsx";
import CurrentTemperatureContext from "../contexts/CurrentTemperatureUnitContext.js";
import AddItemModal from "../components/AddItemModal.jsx";
import RegisterModal from "../components/RegisterModal.jsx";
import LoginModal from "../components/LoginModal.jsx";
import { defaultClothingItems } from "../utils/constants.js";
import AppContext from "../contexts/AppContext";
import CurrentUserContext from "../contexts/CurrentUserContext.jsx";
import ProtectedRoute from "./ProtectedRoute";
import { setToken, getToken, removeToken } from "../utils/token";
import Profile from "./Profile.jsx";
import { getItems, postItem, deleteItem } from "../utils/api.js";
import * as api from "../utils/api";
import * as auth from "../utils/auth";
import EditProfileModal from "./EditProfileModal.jsx";
import "../blocks/App.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 0, C: 0 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  // User data for registration and logins
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [token, setJwt] = useState(getToken());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    avatar: "",
    _id: "",
  });

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

  const handleAddItemModalSubmit = ({ name, weather, imageUrl, token }) => {
    //Using the formula with oldItems below prevents 'stale state values' from being used when adding new item.
    api
      .postItem({ name, weather, imageUrl, token })
      .then((newItem) => {
        setClothingItems((oldItems) => [newItem, ...oldItems]);
        closeModal();
      })
      .catch(console.error);
  };

  const handleDeleteItemModalSubmit = (evt) => {
    const _id = evt.currentTarget.value;
    api
      .deleteItem({ _id, token })
      .then(() => {
        setClothingItems((clothingItems) => {
          return clothingItems.filter((item) => item._id !== _id);
        });
        closeModal();
      })
      .catch(console.error);
  };

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
    api
      .getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  //-----------------------------------------------------------------------------------------------------------------------------------------
  // For RegisterModal.jsx. To create a user for future logins.
  const handleRegisterModalSubmit = ({ name, avatar, email, password }) => {
    auth
      .register(name, avatar, email, password)
      .then(() => {
        handleLoginModalSubmit({ email, password });
        closeModal();
      })
      .catch(console.error);
  };

  const handleLoginModalSubmit = ({ email, password }) => {
    if (!email || !password) {
      return console.log(
        `email or password is wrong in handleLoginModalSubmit.`
      );
    }
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          setIsLoggedIn(true);
          setUserData(data.name, data.email);
          setJwt(data.token);
          setToken(data.token);
          closeModal();
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
  };

  const handleEditProfileModalSubmit = ({ name, avatar }) => {
    api
      .updateUserInfo({ name, avatar, token })
      .then(({ name, avatar }) => {
        setCurrentUser({ name, avatar }, currentUser.email, currentUser._id);
        setUserData({ name });
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
  };

  //Checks if the user is logged in.
  useEffect(() => {
    if (!token) {
      return;
    }
    api
      .getUserInfo(token)
      .then(({ name, email, avatar, _id }) => {
        setIsLoggedIn(true);
        setUserData({ name, email });
        setCurrentUser({ name, avatar, email, _id });
      })
      .catch(console.error);
  }, [token]);

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleEditProfileClick = () => {
    setActiveModal("editProfile");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser("");
    removeToken();
    setJwt("");
  };

  const handleCardLike = ({ _id, isLiked, token }) => {
    // Check if this card is not currently liked
    isLoggedIn === true
      ? !isLiked
        ? // if so, send a request to add the user's owner to the card's likes array
          api
            // the first argument is the card's owner
            .likeItem({ _id, token })
            .then((updatedCard) => {
              setClothingItems((cards) =>
                cards.map((item) => (item._id === _id ? updatedCard : item))
              );
            })
            .catch((err) => console.log(err))
        : // if not, send a request to remove the user's id from the card's likes array
          api
            // the first argument is the card's id
            .dislikeItem({ _id, token })
            .then((updatedCard) => {
              setClothingItems((cards) =>
                cards.map((item) => (item._id === _id ? updatedCard : item))
              );
            })
            .catch((err) => console.log(err))
      : false;
  };
  return (
    <CurrentUserContext.Provider value={{ currentUser, token }}>
      <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <CurrentTemperatureContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page">
            <Header
              handleAddClick={handleAddClick}
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
              weatherData={weatherData}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleAddClick={handleAddClick}
                      handleEditProfileClick={handleEditProfileClick}
                      handleLogout={handleLogout}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onCardLike={handleCardLike}
                    ></Profile>
                  </ProtectedRoute>
                }
              ></Route>
              <Route path="*" element={<Navigate to="/" />} />
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
            <RegisterModal
              isOpen={activeModal === "register"}
              handleCloseClick={closeModal}
              onRegisterModalSubmit={handleRegisterModalSubmit}
              onLoginClick={handleLoginClick}
            ></RegisterModal>
            <LoginModal
              isOpen={activeModal === "login"}
              handleCloseClick={closeModal}
              onLoginModalSubmit={handleLoginModalSubmit}
              onRegisterClick={handleRegisterClick}
            ></LoginModal>
            <EditProfileModal
              isOpen={activeModal === "editProfile"}
              handleCloseClick={closeModal}
              onEditProfileModalSubmit={handleEditProfileModalSubmit}
            ></EditProfileModal>
          </div>
        </CurrentTemperatureContext.Provider>
      </AppContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
