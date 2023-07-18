import Country from "./Country";
import CountryDescription from "./CountryDescription";

const Countries = ({ countries, handleClick, weatherData }) => {
    if (countries.length > 10) {
        return (
            <div className="notification">{`Too many matches (${countries.length}). Please specify another query.`}</div>
        );
    } else if (countries.length > 1) {
        return (
            <div>
                <ul className="countries-list">
                    {countries.map((country) => (
                        <Country
                            key={country.name.common}
                            country={country}
                            handleClick={handleClick}
                        />
                    ))}
                </ul>
            </div>
        );
    } else if (countries.length === 1) {
        return (
            <CountryDescription
                country={countries[0]}
                weatherData={weatherData}
            />
        );
    } else {
        return <></>;
    }
};

export default Countries;
