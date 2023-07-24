import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newPhoneNumber, setNewPhoneNumber] = useState("");
    const [newSearchTerm, setNewSearchTerm] = useState("");
    const [newSearchResult, setNewSearchResult] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState(null);

    useEffect(() => {
        phonebookService.getAll().then((initialPersons) => {
            setPersons(initialPersons);
        });
    }, []);

    const submitForm = (e) => {
        e.preventDefault();

        const matchedPerson =
            newName.trim() === ""
                ? null
                : persons.find((person) => person.name === newName.trim());

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
        // returnedPerson (the data the server responded with) contains the new person object's data with generated id.
        phonebookService
            .create(newPerson)
            .then((returnedPerson) => {
                setPersons(persons.concat(returnedPerson));
                setNewName("");
                setNewPhoneNumber("");

                setNotificationMessage({
                    type: "success",
                    message: `Added ${returnedPerson.name}`,
                });
                setTimeout(() => {
                    setNotificationMessage(null);
                }, 5000);
            })
            .catch((error) => {
                const errorMessage = error.response.data.error;

                setNotificationMessage({
                    type: "failure",
                    message: errorMessage,
                });
                setTimeout(() => {
                    setNotificationMessage(null);
                }, 5000);
            });
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

                setNotificationMessage({
                    type: "success",
                    message: `Updated ${returnedPerson.name}'s phone number to ${returnedPerson.phoneNumber}`,
                });
                setTimeout(() => {
                    setNotificationMessage(null);
                }, 5000);
            })
            .catch((error) => {
                setNotificationMessage({
                    type: "failure",
                    message: `${matchedPerson.name}'s contact info has already been removed from server`,
                });
                setTimeout(() => {
                    setNotificationMessage(null);
                }, 5000);

                // Removing an already deleted note from the application's state (which causes the component to re-render)
                setPersons(
                    persons.filter((person) => person.id !== matchedPerson.id)
                );
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
            <Notification
                message={
                    notificationMessage ? notificationMessage.message : null
                }
                type={notificationMessage ? notificationMessage.type : null}
            />
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
