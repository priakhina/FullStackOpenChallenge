const App = () => {
    const course = "Half Stack application development";
    const parts = [
        {
            name: "Fundamentals of React",
            exercises: 10,
        },
        {
            name: "Using props to pass data",
            exercises: 7,
        },
        {
            name: "State of a component",
            exercises: 14,
        },
    ];

    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    );
};

const Header = ({ course }) => {
    return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
    return (
        <div>
            <Part name={parts[0].name} numberOfExercises={parts[0].exercises} />
            <Part name={parts[1].name} numberOfExercises={parts[1].exercises} />
            <Part name={parts[2].name} numberOfExercises={parts[2].exercises} />
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

const Total = ({ parts }) => {
    return (
        <p>
            Number of exercises{" "}
            {parts[0].exercises + parts[1].exercises + parts[2].exercises}
        </p>
    );
};

export default App;
