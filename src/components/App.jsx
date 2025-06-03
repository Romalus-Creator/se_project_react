import { useState } from "react";
import "../blocks/App.css";
// import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
// import ModalWithForm from "./ModalWithForm.jsx";
// import ItemModal from "./ItemModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main weatherData={weatherData} />
      </div>
    </div>
  );
}

export default App;
