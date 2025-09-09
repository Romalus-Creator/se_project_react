import { useContext } from "react";
import CurrentTemperatureContext from "../contexts/CurrentTemperatureUnitContext";
import sunnyDay from "../assets/sunnyDay.svg";
import "../blocks/WeatherCard.css";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureContext);
  return (
    <section className="weather-card">
      <p className="weather-card__temperature">
        {weatherData.temp[currentTemperatureUnit]}
        &deg;
        {currentTemperatureUnit}
      </p>
      <img
        src={sunnyDay}
        alt="A rectangular picture of blue skies and the sun."
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
