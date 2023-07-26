import Person from "./Person";

const Persons = ({ persons, handleDelete }) => {
    return (
        <div className="numbers-block">
            <h3>Numbers</h3>
            <ul>
                {persons.map((person) => (
                    <Person
                        key={person.id}
                        person={person}
                        handleDelete={handleDelete}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Persons;
