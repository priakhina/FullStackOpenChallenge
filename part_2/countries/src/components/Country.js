const Country = ({ country, handleClick }) => {
    return (
        <li>
            {country.name.common}{" "}
            <button onClick={() => handleClick(country)}>show</button>
        </li>
    );
};

export default Country;
