import { useState, useEffect } from "react";
import countriesService from "./services/countries";

import SearchField from "./components/SearchField";
import Countries from "./components/Countries";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        countriesService.getAll().then((initialCountries) => {
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

    const handleQueryChange = (e) => setQuery(e.target.value);

    return (
        <>
            <SearchField query={query} handleQueryChange={handleQueryChange} />
            <Countries countries={countries} />
        </>
    );
};

export default App;
