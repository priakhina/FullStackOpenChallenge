const App = () => {
    const course = "Half Stack application development";
    const part1 = "Fundamentals of React";
    const exercises1 = 10;
    const part2 = "Using props to pass data";
    const exercises2 = 7;
    const part3 = "State of a component";
    const exercises3 = 14;

    return (
        <div>
            <Header courseTitle={course} />
            <Content
                courseParts={[
                    { id: 0, title: part1, numberOfExercises: exercises1 },
                    { id: 1, title: part2, numberOfExercises: exercises2 },
                    { id: 2, title: part3, numberOfExercises: exercises3 },
                ]}
            />
            <Total
                totalNumberOfExercises={exercises1 + exercises2 + exercises3}
            />
        </div>
    );
};

const Header = ({ courseTitle }) => {
    return <h1>{courseTitle}</h1>;
};

const Content = ({ courseParts }) => {
    return (
        <div>
            <Part
                title={courseParts[0].title}
                numberOfExercises={courseParts[0].numberOfExercises}
            />
            <Part
                title={courseParts[1].title}
                numberOfExercises={courseParts[1].numberOfExercises}
            />
            <Part
                title={courseParts[2].title}
                numberOfExercises={courseParts[2].numberOfExercises}
            />
        </div>
    );
};

const Part = ({ title, numberOfExercises }) => {
    return (
        <p>
            {title} {numberOfExercises}
        </p>
    );
};

const Total = ({ totalNumberOfExercises }) => {
    return <p>Number of exercises {totalNumberOfExercises}</p>;
};

export default App;
