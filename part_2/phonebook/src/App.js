import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook";

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
        phonebookService.getAll().then((initialPersons) => {
            setPersons(initialPersons);
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
            }; // the id property is intentionally omitted (it's better to let the server generate ids for the resources)

            // Since the data we send in the POST request is a JavaScript object, axios automatically
            // sets the appropriate application/json value for the Content-Type header (which is required by json-server).
            phonebookService.create(newPerson).then((returnedPerson) => {
                setPersons(persons.concat(returnedPerson));
                setNewName("");
                setNewPhoneNumber("");
            }); // returnedPerson (the data the server responded with) contains the new person object's data with generated id
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
