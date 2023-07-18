const CountryDescription = ({ country, weatherData }) => {
    return (
        <div className="country-description">
            <h2>{country.name.common}</h2>
            <div className="flag">
                <img src={country.flags.png} alt={country.flags.alt} />
            </div>
            <div className="capital">
                <strong>Capital:</strong> {country.capital.join(", ")}
            </div>
            <div className="area">
                <strong>Area:</strong> {country.area.toLocaleString("en-US")}{" "}
                km&sup2;
            </div>
            <div className="languages">
                <strong>Languages:</strong>
                <ul>
                    {Object.values(country.languages).map((language) => (
                        <li key={language}>{language}</li>
                    ))}
                </ul>
            </div>
            {/* Sometimes the city for which the weather data is fetched (i.e., weatherData.name) 
                does not match the capital city (i.e., country.capital[0]).
                
                This might be due to inaccuracies in geographical coordinates that OpenWeather API returns 
                for the given city (we provide the API with the name of the capital city and country code, 
                and it gives us coordinates, which we then use for fetching the weather data).
            */}
            {weatherData && (
                <div className="weather">
                    <h3>Weather in {weatherData.name}</h3>
                    <p>Temperature: {weatherData.main.temp}&deg; Celcius</p>
                    <img
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt={`Image of ${weatherData.weather[0].description}`}
                    />
                    <p>Wind: {weatherData.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default CountryDescription;
