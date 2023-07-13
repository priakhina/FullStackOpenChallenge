import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", phoneNumber: "040-1234567" },
    ]);
    const [newName, setNewName] = useState("");
    const [newPhoneNumber, setNewPhoneNumber] = useState("");

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
            };

            setPersons(persons.concat(newPerson));
            setNewName("");
            setNewPhoneNumber("");
        }
    };

    const handleNameChange = (e) => setNewName(e.target.value);

    const handlePhoneNumberChange = (e) => setNewPhoneNumber(e.target.value);

    return (
        <div>
            <h2>Phonebook</h2>
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
            <h2>Numbers</h2>
            <div>
                {persons.map((person) => (
                    <p key={person.name}>
                        {person.name} {person.phoneNumber}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default App;
