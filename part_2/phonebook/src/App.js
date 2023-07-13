import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", phoneNumber: "040-123456", id: 1 },
        { name: "Ada Lovelace", phoneNumber: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", phoneNumber: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", phoneNumber: "39-23-6423122", id: 4 },
    ]);
    const [newName, setNewName] = useState("");
    const [newPhoneNumber, setNewPhoneNumber] = useState("");
    const [newSearchTerm, setNewSearchTerm] = useState("");
    const [newSearchResult, setNewSearchResult] = useState([]);

    const addPerson = (e) => {
        e.preventDefault();

        const containsName = persons.some(
            (person) => person.name === newName.trim()
        );

        if (containsName) {
            alert(`${newName.trim()} is already added to the phonebook`);
        } else {
            const newPerson = {
                name: newName.trim(),
                phoneNumber: newPhoneNumber.trim(),
                id: persons.length + 1,
            };

            setPersons(persons.concat(newPerson));
            setNewName("");
            setNewPhoneNumber("");
        }
    };

    const handleNameChange = (e) => setNewName(e.target.value);

    const handlePhoneNumberChange = (e) => setNewPhoneNumber(e.target.value);

    const handleSearchTermChange = (e) => {
        setNewSearchTerm(e.target.value);

        let searchResult = [];
        if (e.target.value !== "") {
            searchResult = persons.filter((person) =>
                person.name.toUpperCase().includes(e.target.value.toUpperCase())
            ); // includes() method is utilized for comparison to allow searching by both first name and last name
        }
        setNewSearchResult(searchResult);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                Search contacts by name:{" "}
                <input
                    type="text"
                    value={newSearchTerm}
                    onChange={handleSearchTermChange}
                />
                <div>
                    {newSearchResult.map((result) => (
                        <p key={result.id}>
                            {result.name} {result.phoneNumber}
                        </p>
                    ))}
                </div>
            </div>
            <h3>Add a new contact</h3>
            <form onSubmit={addPerson}>
                <div>
                    name:{" "}
                    <input
                        type="text"
                        value={newName}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    number:{" "}
                    <input
                        type="tel"
                        value={newPhoneNumber}
                        onChange={handlePhoneNumberChange}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h3>Numbers</h3>
            <div>
                {persons.map((person) => (
                    <p key={person.id}>
                        {person.name} {person.phoneNumber}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default App;
