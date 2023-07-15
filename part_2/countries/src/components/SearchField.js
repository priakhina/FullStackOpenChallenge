const SearchField = ({ query, handleQueryChange }) => {
    return (
        <div className="search-field">
            Find countries by name:{" "}
            <input type="text" value={query} onChange={handleQueryChange} />
        </div>
    );
};

export default SearchField;
