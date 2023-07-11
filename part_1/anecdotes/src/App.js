import { useState } from "react";

const Header = ({ text }) => <h2>{text}</h2>;

const Anecdote = ({ text, votes }) => {
    return (
        <p>
            {text}
            <br />
            has {votes} {votes === 1 ? "vote" : "votes"}
        </p>
    );
};

const Button = ({ handleClick, text }) => {
    return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
    const anecdotes = [
        "If it hurts, do it more often.",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
        "The only way to go fast, is to go well.",
    ];

    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

    const highestVotes = Math.max(...votes);
    const anecdoteWithHighestVotes = anecdotes[votes.indexOf(highestVotes)];

    const voteForAnecdote = () => {
        const votesCopy = [...votes];
        votesCopy[selected]++;
        setVotes(votesCopy);
    };

    const generateRandomIndex = () =>
        Math.floor(Math.random() * anecdotes.length);

    const displayRandomAnecdote = () => {
        let anecdoteIndex = generateRandomIndex();
        while (anecdoteIndex === selected) {
            anecdoteIndex = generateRandomIndex();
        }
        setSelected(anecdoteIndex);
    };

    return (
        <>
            <div>
                <Header text="Anecdote of the day" />
                <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
                <Button handleClick={voteForAnecdote} text="vote" />
                <Button
                    handleClick={displayRandomAnecdote}
                    text="next anecdote"
                />
            </div>
            <div>
                <Header text="Anecdote with most votes" />
                <Anecdote
                    text={anecdoteWithHighestVotes}
                    votes={highestVotes}
                />
            </div>
        </>
    );
};

export default App;
