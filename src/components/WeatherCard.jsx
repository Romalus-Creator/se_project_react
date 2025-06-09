import sunnyDay from "../assets/sunnyDay.svg";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temperature">{weatherData.temp.F}&deg; F</p>
      <img
        src={sunnyDay}
        alt="A rectangular picture of blue skies and the sun."
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
