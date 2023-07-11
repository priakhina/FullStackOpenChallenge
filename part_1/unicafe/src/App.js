import { useState } from "react";

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

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
        </div>
    );
};

export default App;
