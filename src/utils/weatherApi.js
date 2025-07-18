import { checkResponse } from "./api";

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    return checkResponse(res);
  });
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round((data.main.temp - 32) / 1.8),
  };
  result.type = getWeatherType(result.temp.F);
  return result;
};

const getWeatherType = (weatherTemperature) => {
  if (weatherTemperature >= 76) {
    return "hot";
  } else if (weatherTemperature >= 45) {
    return "warm";
  } else {
    return "cold";
  }
};
