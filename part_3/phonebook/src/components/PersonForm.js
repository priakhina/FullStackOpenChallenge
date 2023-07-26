const PersonForm = ({
    name,
    phoneNumber,
    handleNameChange,
    handlePhoneNumberChange,
    handleFormSubmission,
}) => {
    return (
        <div className="add-new-contact-block">
            <h3>Add a new contact</h3>
            <form id="add-new-contact-form" onSubmit={handleFormSubmission}>
                <div>
                    Name:{" "}
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    Number:{" "}
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                    />
                </div>
                <button className="add-new-contact-button" type="submit">
                    add
                </button>
            </form>
        </div>
    );
};

export default PersonForm;
