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

    const submitForm = (e) => {
        e.preventDefault();

        if (newName.trim() === "") return;

        const matchedPerson = persons.find(
            (person) => person.name === newName.trim()
        );

        if (matchedPerson) {
            const shouldUpdate = window.confirm(
                `${newName.trim()} is already added to the phonebook. Replace the old number with a new one?`
            );
            if (shouldUpdate) {
                updatePhoneNumber(matchedPerson);
            }
        } else {
            addPerson();
        }
    };

    const addPerson = () => {
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
    };

    const updatePhoneNumber = (matchedPerson) => {
        const updatedPerson = {
            ...matchedPerson,
            phoneNumber: newPhoneNumber,
        };

        phonebookService
            .update(matchedPerson.id, updatedPerson)
            .then((returnedPerson) => {
                setPersons(
                    persons.map((person) =>
                        person.id !== returnedPerson.id
                            ? person
                            : returnedPerson
                    )
                );
                setNewName("");
                setNewPhoneNumber("");
            });
    };

    const deletePerson = (id) => {
        const personToDelete = persons.find((person) => person.id === id);
        const shouldDelete = window.confirm(
            `Are you sure you want to delete ${personToDelete.name}?`
        );

        if (shouldDelete) {
            phonebookService.remove(id).then(() => {
                const updatedPersons = persons.filter(
                    (person) => person.id !== id
                );
                setPersons(updatedPersons);
                setNewSearchTerm("");
                setNewSearchResult([]);
            });
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
                handleFormSubmission={submitForm}
            />
            <h3>Numbers</h3>
            <Persons persons={persons} handleDelete={deletePerson} />
        </div>
    );
};

export default App;
