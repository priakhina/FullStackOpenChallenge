import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newPhoneNumber, setNewPhoneNumber] = useState("");
    const [newSearchTerm, setNewSearchTerm] = useState("");
    const [newSearchResult, setNewSearchResult] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/persons").then((response) => {
            setPersons(response.data);
        });
    }, []);

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
            <Filter
                searchTerm={newSearchTerm}
                searchResult={newSearchResult}
                handleSearchTermChange={handleSearchTermChange}
            />
            <h3>Add a new contact</h3>
            <PersonForm
                name={newName}
                phoneNumber={newPhoneNumber}
                handleNameChange={handleNameChange}
                handlePhoneNumberChange={handlePhoneNumberChange}
                addPerson={addPerson}
            />
            <h3>Numbers</h3>
            <Persons persons={persons} />
        </div>
    );
};

export default App;
