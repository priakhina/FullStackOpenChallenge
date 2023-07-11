import { useState } from "react";

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
            <h2>give feedback</h2>
            <button onClick={rateGood}>good</button>
            <button onClick={rateNeutral}>neutral</button>
            <button onClick={rateBad}>bad</button>
            <h2>statistics</h2>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {all}</p>
            <p>average {average}</p>
            <p>positive {positive} %</p>
        </div>
    );
};

export default App;
