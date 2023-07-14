const Person = ({ person, handleDelete }) => (
    <p key={person.id}>
        {person.name} {person.phoneNumber}{" "}
        <button onClick={() => handleDelete(person.id)}>delete</button>
    </p>
);

export default Person;
