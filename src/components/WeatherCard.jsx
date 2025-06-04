import sunnyDay from "../assets/sunnyDay.svg";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temperature">{weatherData.temp.F}&deg; F</p>
      <img src={sunnyDay} alt="" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
