import { useState, useEffect } from "react";
import countriesService from "./services/countries";

import SearchField from "./components/SearchField";
import Countries from "./components/Countries";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [query, setQuery] = useState("");
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        countriesService.getCountries().then((initialCountries) => {
            if (query.trim() === "") {
                setCountries([]);
            } else {
                const matchedCountries = initialCountries.filter((country) => {
                    const countryName = country.name.common;
                    return countryName
                        .toUpperCase()
                        .includes(query.trim().toUpperCase());
                });
                setCountries(matchedCountries);
            }
        });
    }, [query]);

    useEffect(() => {
        if (countries.length === 1) {
            const capital = countries[0].capital[0];
            const countryCode = countries[0].cca2;

            // First getting geographical coordinates (latitude, longitude) of the city
            // and then getting current weather data for that location
            countriesService
                .getGeoCoordinatesByCity(capital, countryCode)
                .then((coordinates) =>
                    countriesService.getWeatherData(
                        coordinates.lat,
                        coordinates.lon
                    )
                )
                .then((weatherData) => setWeatherData(weatherData));
        }
    }, [countries]);

    const handleQueryChange = (e) => setQuery(e.target.value);

    const handleClick = (country) => setCountries([{ ...country }]);

    return (
        <>
            <SearchField query={query} handleQueryChange={handleQueryChange} />
            <Countries
                countries={countries}
                handleClick={handleClick}
                weatherData={weatherData}
            />
        </>
    );
};

export default App;
