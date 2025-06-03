import sunnyDay from "../assets/sunnyDay.svg";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temperature">75 &deg; F</p>
      <img src={sunnyDay} alt="" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
