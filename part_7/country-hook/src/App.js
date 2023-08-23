import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
	const [value, setValue] = useState("");

	const onChange = (event) => {
		setValue(event.target.value);
	};

	return {
		type,
		value,
		onChange,
	};
};

const useCountry = (name) => {
	const [country, setCountry] = useState(null);
	const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

	useEffect(() => {
		const countryName = name.toLowerCase().trim();

		if (countryName) {
			axios
				.get(`${baseUrl}/name/${countryName}`)
				.then((response) => {
					setCountry({ ...response.data, found: true });
				})
				.catch((error) => {
					console.error(error);
					setCountry({ name: name.trim(), found: false });
				});
		} else {
			setCountry(null);
		}
	}, [name]);

	return country;
};

const Country = ({ country }) => {
	if (!country) {
		return null;
	}

	if (!country.found) {
		return <div>Country "{country.name}" is not found...</div>;
	}

	return (
		<div>
			<h3>{country.name.common}</h3>
			<div>Capital: {country.capital}</div>
			<div>Population: {country.population.toLocaleString("en-US")}</div>
			<img src={country.flags.png} height="100" alt={country.flags.alt} />
		</div>
	);
};

const App = () => {
	const nameInput = useField("text");
	const [name, setName] = useState("");
	const country = useCountry(name);

	const fetch = (e) => {
		e.preventDefault();
		setName(nameInput.value);
	};

	return (
		<div>
			<form onSubmit={fetch}>
				<input {...nameInput} /> <button>Find</button>
			</form>
			<Country country={country} />
		</div>
	);
};

export default App;
