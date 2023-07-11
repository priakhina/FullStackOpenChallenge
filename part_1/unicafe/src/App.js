import { useState } from "react";

const Header = () => <h2>give feedback</h2>;

const Button = ({ handleClick, text }) => {
    return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
    return (
        <>
            <h2>statistics</h2>

            {all === 0 ? (
                <div>No feedback given</div>
            ) : (
                <div>
                    <StatisticLine text="good" value={good} />
                    <StatisticLine text="neutral" value={neutral} />
                    <StatisticLine text="bad" value={bad} />
                    <StatisticLine text="all" value={all} />
                    <StatisticLine text="average" value={average} />
                    <StatisticLine text="positive" value={positive + " %"} />
                </div>
            )}
        </>
    );
};

const StatisticLine = ({ text, value }) => {
    return (
        <div>
            {text} {value}
        </div>
    );
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const all = good + neutral + bad;
    const average = all === 0 ? 0 : (good - bad) / all;
    const positive = all === 0 ? 0 : (good * 100) / all;

    const rateGood = () => setGood(good + 1);
    const rateNeutral = () => setNeutral(neutral + 1);
    const rateBad = () => setBad(bad + 1);

    return (
        <div>
            <Header />
            <Button handleClick={rateGood} text="good" />
            <Button handleClick={rateNeutral} text="neutral" />
            <Button handleClick={rateBad} text="bad" />
            <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                all={all}
                average={average}
                positive={positive}
            />
        </div>
    );
};

export default App;
