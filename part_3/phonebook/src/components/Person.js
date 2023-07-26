const Person = ({ person, handleDelete }) => (
    <li key={person.id}>
        <span>
            {person.name} {person.phoneNumber}
        </span>
        <button
            className="delete-contact-button"
            onClick={() => handleDelete(person.id)}
        >
            delete
        </button>
    </li>
);

export default Person;
