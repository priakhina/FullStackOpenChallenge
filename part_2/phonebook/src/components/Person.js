const Person = ({ person }) => (
    <p key={person.id}>
        {person.name} {person.phoneNumber}
    </p>
);

export default Person;
