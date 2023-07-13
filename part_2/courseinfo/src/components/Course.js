import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
    return (
        <>
            <Header text={course.name} />
            <Content parts={course.parts} />
            <Total
                sum={course.parts.reduce(
                    (total, part) => total + part.exercises,
                    0
                )}
            />
        </>
    );
};

export default Course;
