const Filter = ({ searchTerm, searchResult, handleSearchTermChange }) => {
    return (
        <div>
            Search contacts by name:{" "}
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchTermChange}
            />
            <div>
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
