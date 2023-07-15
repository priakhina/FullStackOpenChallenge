const CountryDescription = ({ country }) => {
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
        </div>
    );
};

export default CountryDescription;
