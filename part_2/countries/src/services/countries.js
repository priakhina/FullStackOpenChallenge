import axios from "axios";

const COUNTRIES_BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api";
const WEATHER_BASE_URL = "https://api.openweathermap.org";
const API_KEY = process.env.REACT_APP_API_KEY;

const getCountries = () => {
    const request = axios.get(`${COUNTRIES_BASE_URL}/all`);
    return request.then((response) => response.data);
};

const getWeatherData = (latitude, longitude) => {
    const request = axios.get(
        `${WEATHER_BASE_URL}/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    );
    return request.then((response) => response.data);
};

const getGeoCoordinatesByCity = (cityName, countryCode) => {
    const request = axios.get(
        `${WEATHER_BASE_URL}/geo/1.0/direct?q=${cityName},${countryCode}&limit=1&appid=${API_KEY}`
    );
    return request.then((response) => response.data[0]);
};

export default {
    getCountries,
    getWeatherData,
    getGeoCoordinatesByCity,
};
