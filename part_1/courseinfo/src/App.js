const App = () => {
    const course = "Half Stack application development";
    const part1 = {
        name: "Fundamentals of React",
        exercises: 10,
    };
    const part2 = {
        name: "Using props to pass data",
        exercises: 7,
    };
    const part3 = {
        name: "State of a component",
        exercises: 14,
    };

    return (
        <div>
            <Header courseName={course} />
            <Content part1={part1} part2={part2} part3={part3} />
            <Total
                totalNumberOfExercises={
                    part1.exercises + part2.exercises + part3.exercises
                }
            />
        </div>
    );
};

const Header = ({ courseName }) => {
    return <h1>{courseName}</h1>;
};

const Content = ({ part1, part2, part3 }) => {
    return (
        <div>
            <Part name={part1.name} numberOfExercises={part1.exercises} />
            <Part name={part2.name} numberOfExercises={part2.exercises} />
            <Part name={part3.name} numberOfExercises={part3.exercises} />
        </div>
    );
};

const Part = ({ name, numberOfExercises }) => {
    return (
        <p>
            {name} {numberOfExercises}
        </p>
    );
};

const Total = ({ totalNumberOfExercises }) => {
    return <p>Number of exercises {totalNumberOfExercises}</p>;
};

export default App;
