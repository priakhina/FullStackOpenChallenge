const Filter = ({ searchTerm, searchResult, handleSearchTermChange }) => {
    return (
        <div className="search-block">
            <div className="search-field">
                Search contacts by name:{" "}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
            </div>
            <div className="search-result">
                {searchResult.map((result) => (
                    <p key={result.id}>
                        {result.name} {result.phoneNumber}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Filter;
