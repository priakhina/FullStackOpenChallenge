const PersonForm = ({
    name,
    phoneNumber,
    handleNameChange,
    handlePhoneNumberChange,
    handleFormSubmission,
}) => {
    return (
        <form onSubmit={handleFormSubmission}>
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
