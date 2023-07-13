const PersonForm = ({
    name,
    phoneNumber,
    handleNameChange,
    handlePhoneNumberChange,
    addPerson,
}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name:{" "}
                <input type="text" value={name} onChange={handleNameChange} />
            </div>
            <div>
                number:{" "}
                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

export default PersonForm;
