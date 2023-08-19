import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote, createAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
	const anecdotes = useSelector((state) =>
		state.sort((a, b) => b.votes - a.votes)
	);
	const dispatch = useDispatch();

	const vote = (id) => dispatch(voteAnecdote(id));

	const addAnecdote = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = "";
		dispatch(createAnecdote(content));
	};

	return (
		<div>
			<h2>Anecdotes</h2>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}{" "}
						{anecdote.votes === 1 ? "vote" : "votes"}{" "}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
			<h2>Create new</h2>
			<form onSubmit={addAnecdote}>
				<div>
					<input
						name="anecdote"
						type="text"
						placeholder="Type your anecdote..."
					/>
				</div>
				<button type="submit">Create</button>
			</form>
		</div>
	);
};

export default App;
